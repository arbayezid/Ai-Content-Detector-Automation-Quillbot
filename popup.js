document.addEventListener('DOMContentLoaded', async () => {
  console.log('[POPUP] DOMContentLoaded — initializing popup');
  const startBtn = document.getElementById('start-btn');
  const stopBtn = document.getElementById('stop-btn');
  const downloadBtn = document.getElementById('download-btn');
  const clearBtn = document.getElementById('clear-btn');
  const reloadBtn = document.getElementById('reload-btn');
  const statusEl = document.getElementById('status-text');
  const progressBar = document.getElementById('item-progress');
  const statsTotal = document.getElementById('stats-total');
  const statsCompleted = document.getElementById('stats-completed');
  const statsErrors = document.getElementById('stats-errors');
  const statsPending = document.getElementById('stats-pending');
  const jsonParseToggle = document.getElementById('json-parse-toggle');
  const wordLimitInput = document.getElementById('word-limit-input');
  const startRowInput = document.getElementById('start-row');
  const endRowInput = document.getElementById('end-row');
  const xlsxFileInput = document.getElementById('xlsx-file-input');
  const selectedFileStatus = document.getElementById('selected-file-status');
  const xlsxSelectors = document.getElementById('xlsx-selectors');
  const sheetSelect = document.getElementById('sheet-select');
  const inputColumnSelect = document.getElementById('input-column-select');
  const timerSection = document.getElementById('timer-section');
  const timerCountdown = document.getElementById('timer-countdown');
  let timerInterval = null;
  let uploadedWorkbook = null;
  let uploadedFileName = '';
  let uploadedArrayBuffer = null; // kept for re-saving when selections change

  const themeToggle = document.getElementById('theme-toggle');
  const themeIconMoon = document.getElementById('theme-icon-moon');
  const themeIconSun = document.getElementById('theme-icon-sun');

  // Load and apply theme
  let currentTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  themeToggle.addEventListener('click', () => {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
  });

  function updateThemeIcon(theme) {
    if (theme === 'dark') {
      themeIconMoon.style.display = 'none';
      themeIconSun.style.display = 'block';
    } else {
      themeIconMoon.style.display = 'block';
      themeIconSun.style.display = 'none';
    }
  }

  // Load saved JSON parse setting
  const savedJsonParseSetting = localStorage.getItem('jsonParseEnabled');
  jsonParseToggle.checked = savedJsonParseSetting === 'true';
  console.log('[POPUP] JSON parse setting loaded:', jsonParseToggle.checked);

  // Load saved word limit (default 1300)
  const savedWordLimit = localStorage.getItem('wordLimit');
  wordLimitInput.value = savedWordLimit !== null ? savedWordLimit : '1300';
  console.log('[POPUP] Word limit loaded:', wordLimitInput.value);

  // Load saved row range settings
  const savedStartRow = localStorage.getItem('startRow');
  const savedEndRow = localStorage.getItem('endRow');
  if (savedStartRow) startRowInput.value = savedStartRow;
  if (savedEndRow) endRowInput.value = savedEndRow;
  console.log('[POPUP] Row range loaded from localStorage:', { startRow: savedStartRow, endRow: savedEndRow });

  // Save JSON parse setting when changed
  jsonParseToggle.addEventListener('change', () => {
    localStorage.setItem('jsonParseEnabled', jsonParseToggle.checked);
    console.log('[POPUP] JSON parse toggled:', jsonParseToggle.checked ? 'enabled' : 'disabled');
  });

  // Save word limit when changed
  wordLimitInput.addEventListener('change', () => {
    const val = parseInt(wordLimitInput.value, 10);
    if (val > 0) {
      localStorage.setItem('wordLimit', val);
      console.log('[POPUP] Word limit set to:', val);
    }
  });

  // Save row range settings when changed
  startRowInput.addEventListener('change', () => {
    localStorage.setItem('startRow', startRowInput.value);
    console.log('[POPUP] Start row changed:', startRowInput.value || '(empty = default 1)');
  });

  endRowInput.addEventListener('change', () => {
    localStorage.setItem('endRow', endRowInput.value);
    console.log('[POPUP] End row changed:', endRowInput.value || '(empty = all)');
  });

  xlsxFileInput.addEventListener('change', handleXlsxFileUpload);
  sheetSelect.addEventListener('change', () => {
    console.log('[POPUP] Sheet selection changed to:', sheetSelect.value);
    populateColumnSelect(sheetSelect.value);
    refreshTotalXlsxRows();
    persistUploadedFileSelection();
  });
  inputColumnSelect.addEventListener('change', () => {
    console.log('[POPUP] Input column changed to:', inputColumnSelect.value);
    localStorage.setItem('inputColumn', inputColumnSelect.value);
    persistUploadedFileSelection();
  });

  // Initialize UI state
  updateUI({ isRunning: false, totalItems: 0, completedItems: 0, errorItems: 0 });

  // Restore previously uploaded file (persisted across popup open/close)
  console.log('[POPUP] Attempting to restore previously uploaded file...');
  tryRestoreUploadedFile();

  // Track if we were processing (to detect completion)
  let wasProcessing = false;
  let lastCompletedCount = 0;
  let pollInterval = null;

  // Get initial state and refresh stats from database
  console.log('[POPUP] Fetching initial state from background...');
  refreshStats();

  // Listen for updates
  chrome.runtime.onMessage.addListener((message) => {
    if (message.type === 'STATE_UPDATE') {
      console.log('[POPUP] STATE_UPDATE received from background:', message.payload);
      handleStateUpdate(message.payload);
    }
  });

  function handleStateUpdate(state) {
    const { isRunning, totalItems, completedItems, errorItems } = state;
    const pendingItems = Math.max(0, totalItems - completedItems - errorItems);

    console.log('[POPUP] handleStateUpdate:', { isRunning, totalItems, completedItems, errorItems, pendingItems });

    // Auto-download when processing completes (was running, now stopped, no pending items)
    if (wasProcessing && !isRunning && pendingItems === 0 && totalItems > 0) {
      console.log('Processing complete! Auto-downloading results...');
      stopPolling();
      setTimeout(() => {
        autoDownloadResults();
      }, 1000);
    }

    // Start/stop polling based on running state
    if (isRunning && !pollInterval) {
      startPolling();
    } else if (!isRunning && pollInterval) {
      stopPolling();
    }

    // Update tracking
    wasProcessing = isRunning;
    lastCompletedCount = completedItems;

    updateUI(state);
  }

  function startPolling() {
    if (pollInterval) return;
    console.log('[POPUP] Starting polling every 2s...');
    pollInterval = setInterval(() => { refreshStats(); }, 2000);
  }

  function stopPolling() {
    if (pollInterval) {
      console.log('[POPUP] Stopping polling');
      clearInterval(pollInterval);
      pollInterval = null;
    }
  }

  function autoDownloadResults() {
    // Direct download from IndexedDB instead of using message
    const dbName = 'ai-detector-db';
    const request = indexedDB.open(dbName);

    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction(['responses'], 'readonly');
      const store = transaction.objectStore('responses');
      const getAllRequest = store.getAll();

      getAllRequest.onsuccess = () => {
        const data = getAllRequest.result;
        if (!data || data.length === 0) {
          console.log('No data to download');
          return;
        }

        // Create CSV content
        const csvRows = [];
        csvRows.push(['id', 'response', 'status', 'ai_detection_percentage', 'ai_chunks'].join(','));

        for (const item of data) {
          // Use originalId if available (for duplicate ID support), fallback to id
          const id = escapeCSV(item.originalId || item.id || '');
          const response = escapeCSV(item.rawResponse || item.response || '');
          const status = escapeCSV(item.status || '');
          const aiPercentage = item.aiDetectionPercentage !== undefined && item.aiDetectionPercentage !== null
            ? item.aiDetectionPercentage
            : '';
          const aiChunks = escapeCSV(item.aiChunks ? JSON.stringify(item.aiChunks) : '');
          csvRows.push([id, response, status, aiPercentage, aiChunks].join(','));
        }

        const csvContent = csvRows.join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);

        const startRow = startRowInput.value || '1';
        const endRow = endRowInput.value || 'end';
        const rangeStr = `${startRow}-${endRow}`;
        const dateStr = new Date().toISOString().slice(0, 10);
        link.setAttribute('download', `ai_detection_results_${rangeStr}_${dateStr}.csv`);

        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        console.log('Auto-download completed!');
      };

      getAllRequest.onerror = () => {
        console.error('Failed to get data for auto-download');
      };

      transaction.oncomplete = () => db.close();
    };

    request.onerror = () => {
      console.error('Failed to open database for auto-download');
    };
  }

  startBtn.addEventListener('click', async () => {
    const startRow = parseInt(startRowInput.value) || null;
    const endRow = parseInt(endRowInput.value) || null;
    console.log('[POPUP] Start button clicked:', { startRow, endRow, hasWorkbook: !!uploadedWorkbook, fileName: uploadedFileName, sheet: sheetSelect.value, column: inputColumnSelect.value, parseJson: jsonParseToggle.checked });

    if (startRow && endRow && startRow > endRow) {
      console.warn('[POPUP] Invalid row range: start > end');
      alert('Start row cannot be greater than end row');
      return;
    }

    if (!uploadedWorkbook) {
      alert('Please upload an XLSX file first.');
      return;
    }

    console.log('[POPUP] Resetting stuck "running" items before start...');
    await resetRunningItems();

    // Check if DB has pending items; if not, auto-reload from XLSX first
    const hasPending = await checkHasPendingItems();
    console.log('[POPUP] Has pending items in DB:', hasPending);
    if (!hasPending) {
      console.log('[POPUP] No pending items — auto-loading from XLSX before starting...');

      // Warn if data looks like JSON but toggle is off
      if (!jsonParseToggle.checked) {
        try {
          const firstRows = XlsxLoader.getSheetRows(uploadedWorkbook, sheetSelect.value);
          const firstVal = String((firstRows[0] || {})[inputColumnSelect.value] || '').trim();
          if (firstVal.startsWith('{') || firstVal.startsWith('[')) {
            const proceed = confirm('The data looks like JSON but "Parse JSON to Text" is OFF.\n\nTurn it ON to extract clean text, or click Cancel and enable it manually.\n\nContinue WITHOUT JSON parsing?');
            if (!proceed) return;
          }
        } catch(e) { /* ignore check errors */ }
      }

      startBtn.disabled = true;
      startBtn.textContent = 'Loading...';
      const parseJson = jsonParseToggle.checked;
      const loadOptions = {
        workbook: uploadedWorkbook,
        sheetName: sheetSelect.value,
        inputColumn: inputColumnSelect.value,
      };
      const result = await XlsxLoader.reloadData(parseJson, startRow, endRow, loadOptions);
      startBtn.disabled = false;
      startBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg> Start`;
      if (!result.success) {
        console.error('[POPUP] Auto-load failed:', result.error);
        alert('Failed to load XLSX data: ' + result.error);
        return;
      }
      console.log(`[POPUP] Auto-loaded ${result.count} items from XLSX`);
      refreshStats();
    }

    const wordLimit = parseInt(wordLimitInput.value, 10) || 1300;
    console.log('[POPUP] Sending START_PROCESSING to background, wordLimit:', wordLimit);
    chrome.runtime.sendMessage({
      type: 'START_PROCESSING',
      startRow: startRow,
      endRow: endRow,
      payload: { wordLimit }
    }, (response) => {
      if (chrome.runtime.lastError) {
        console.error('[POPUP] START_PROCESSING sendMessage error:', chrome.runtime.lastError);
        alert('Error communicating with background: ' + chrome.runtime.lastError.message);
        return;
      }
      console.log('[POPUP] START_PROCESSING response:', response);
      if (!response.success && response.error) {
        console.error('[POPUP] START_PROCESSING failed:', response.error);
        alert('Error: ' + response.error);
      }
    });
  });

  stopBtn.addEventListener('click', () => {
    console.log('[POPUP] Stop button clicked');
    chrome.runtime.sendMessage({ type: 'STOP_PROCESSING' }, (response) => {
      console.log('[POPUP] STOP_PROCESSING response:', response);
    });
  });

  downloadBtn.addEventListener('click', () => {
    console.log('[POPUP] Download CSV button clicked');
    downloadResultsCSV();
  });

  clearBtn.addEventListener('click', () => {
    console.log('[POPUP] Clear data button clicked');
    clearAllData();
  });

  reloadBtn.addEventListener('click', () => {
    console.log('[POPUP] Reload from XLSX button clicked');
    reloadFromXlsx();
  });

  function refreshStats() {
    chrome.runtime.sendMessage({ type: 'GET_STATE' }, (response) => {
      if (chrome.runtime.lastError) {
        console.warn('[POPUP] GET_STATE error:', chrome.runtime.lastError.message);
        return;
      }
      if (response && response.success) {
        console.log('[POPUP] GET_STATE response:', response.data);
        handleStateUpdate(response.data);
      } else {
        console.warn('[POPUP] GET_STATE failed:', response);
      }
    });
  }

  function refreshTotalXlsxRows() {
    try {
      if (uploadedWorkbook) {
        const totalRows = XlsxLoader.getSheetRows(uploadedWorkbook, sheetSelect.value).length;
        statsTotal.textContent = totalRows;
      }
    } catch (error) {
      console.error('Error getting total xlsx rows:', error);
    }
  }

  function updateUI(state) {
    const { isRunning, totalItems, completedItems, errorItems, tabOpenedTime } = state;
    const pendingItems = Math.max(0, totalItems - completedItems - errorItems);

    // Update buttons
    startBtn.disabled = isRunning;
    stopBtn.disabled = !isRunning;

    statusEl.textContent = isRunning ? 'Processing running...' : 'Idle';
    statusEl.className = isRunning ? 'status-running' : 'status-idle';

    // Total = DB item count (reflects actual loaded data, updates when cleared)
    statsTotal.textContent = totalItems;
    statsCompleted.textContent = completedItems;
    statsErrors.textContent = errorItems;

    // Show progress as "completed/total" format
    statsPending.textContent = `${completedItems}/${totalItems}`;

    // Update progress bar
    const processed = completedItems + errorItems;
    const progress = totalItems > 0 ? (processed / totalItems) * 100 : 0;
    progressBar.style.width = `${progress}%`;

    // Update timer
    updateTimer(isRunning, tabOpenedTime);
  }

  function updateTimer(isRunning, tabOpenedTime) {
    if (!isRunning || !tabOpenedTime) {
      timerSection.style.display = 'none';
      if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
      }
      return;
    }

    timerSection.style.display = 'flex';

    // Clear existing interval
    if (timerInterval) {
      clearInterval(timerInterval);
    }

    // Update countdown every second
    const updateCountdown = () => {
      const elapsed = Date.now() - tabOpenedTime;
      const remaining = Math.max(0, 300000 - elapsed); // 5 minutes = 300000ms

      const minutes = Math.floor(remaining / 60000);
      const seconds = Math.floor((remaining % 60000) / 1000);

      timerCountdown.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;

      if (remaining <= 0) {
        timerCountdown.textContent = 'Refreshing...';
      }
    };

    updateCountdown();
    timerInterval = setInterval(updateCountdown, 1000);
  }

  function downloadResultsCSV() {
    chrome.runtime.sendMessage({ type: 'GET_DATA' }, (response) => {
      if (!response || !response.success) {
        alert('Error fetching data: ' + (response?.error || 'Unknown error'));
        return;
      }

      const data = response.data;
      if (!data || data.length === 0) {
        alert('No data available to download');
        return;
      }

      // Create CSV content with id, response, status, ai_detection_percentage, ai_chunks
      const csvRows = [];

      // Header row
      csvRows.push(['id', 'response', 'status', 'ai_detection_percentage', 'ai_chunks'].join(','));

      // Data rows
      for (const item of data) {
        // Use originalId if available (for duplicate ID support), fallback to id
        const id = escapeCSV(item.originalId || item.id || '');
        // Use rawResponse (original JSON before parsing) if available
        const response = escapeCSV(item.rawResponse || item.response || '');
        const status = escapeCSV(item.status || '');
        const aiPercentage = item.aiDetectionPercentage !== undefined && item.aiDetectionPercentage !== null
          ? item.aiDetectionPercentage
          : '';
        const aiChunks = escapeCSV(item.aiChunks ? JSON.stringify(item.aiChunks) : '');

        csvRows.push([id, response, status, aiPercentage, aiChunks].join(','));
      }

      const csvContent = csvRows.join('\n');

      // Create and download the file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);

      // Build filename with row range
      const startRow = startRowInput.value || '1';
      const endRow = endRowInput.value || 'end';
      const rangeStr = `${startRow}-${endRow}`;
      const dateStr = new Date().toISOString().slice(0, 10);
      link.setAttribute('download', `ai_detection_results_${rangeStr}_${dateStr}.csv`);

      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    });
  }

  function escapeCSV(str) {
    if (str === null || str === undefined) return '';
    str = String(str);
    // If the string contains comma, newline, or double quote, wrap it in quotes
    if (str.includes(',') || str.includes('\n') || str.includes('\r') || str.includes('"')) {
      // Escape double quotes by doubling them
      str = str.replace(/"/g, '""');
      return `"${str}"`;
    }
    return str;
  }

  async function handleXlsxFileUpload() {
    const file = xlsxFileInput.files && xlsxFileInput.files[0];
    console.log('[POPUP] handleXlsxFileUpload triggered, file:', file ? file.name : 'none');

    if (!file) {
      console.log('[POPUP] No file selected, resetting workbook');
      resetUploadedWorkbook();
      return;
    }

    if (!file.name.toLowerCase().endsWith('.xlsx')) {
      console.warn('[POPUP] Invalid file type:', file.name);
      alert('Please choose an XLSX file.');
      xlsxFileInput.value = '';
      resetUploadedWorkbook();
      return;
    }

    console.log(`[POPUP] Reading file: "${file.name}" (${file.size} bytes)`);
    try {
      const arrayBuffer = await file.arrayBuffer();
      console.log('[POPUP] ArrayBuffer loaded, parsing XLSX...');
      uploadedWorkbook = XLSX.read(arrayBuffer, { type: 'array' });
      uploadedFileName = file.name;
      uploadedArrayBuffer = arrayBuffer;

      if (!uploadedWorkbook.SheetNames || uploadedWorkbook.SheetNames.length === 0) {
        throw new Error('No sheets found in the uploaded XLSX file');
      }

      console.log('[POPUP] XLSX parsed. Sheets:', uploadedWorkbook.SheetNames);
      populateSheetSelect();
      xlsxSelectors.style.display = 'flex';
      selectedFileStatus.textContent = `Using uploaded file: ${uploadedFileName}`;
      refreshTotalXlsxRows();
      persistUploadedFileSelection();
      console.log('[POPUP] File upload complete:', uploadedFileName);
    } catch (error) {
      console.error('[POPUP] Error reading XLSX file:', error);
      alert('Error reading XLSX file: ' + error.message);
      xlsxFileInput.value = '';
      resetUploadedWorkbook();
    }
  }

  function resetUploadedWorkbook() {
    console.log('[POPUP] Resetting uploaded workbook state');
    uploadedWorkbook = null;
    uploadedFileName = '';
    uploadedArrayBuffer = null;
    sheetSelect.innerHTML = '';
    inputColumnSelect.innerHTML = '';
    xlsxSelectors.style.display = 'none';
    selectedFileStatus.textContent = 'No file selected';
    refreshTotalXlsxRows();
    XlsxLoader.clearUploadedFileData().catch(e => console.warn('[POPUP] clearUploadedFileData error:', e));
  }

  function populateSheetSelect() {
    console.log('[POPUP] Populating sheet select with sheets:', uploadedWorkbook.SheetNames);
    sheetSelect.innerHTML = '';

    uploadedWorkbook.SheetNames.forEach((sheetName) => {
      const option = document.createElement('option');
      option.value = sheetName;
      option.textContent = sheetName;
      sheetSelect.appendChild(option);
    });

    const savedSheet = localStorage.getItem('sheetName');
    if (savedSheet && uploadedWorkbook.Sheets[savedSheet]) {
      sheetSelect.value = savedSheet;
      console.log('[POPUP] Restored saved sheet selection:', savedSheet);
    }

    console.log('[POPUP] Active sheet:', sheetSelect.value);
    populateColumnSelect(sheetSelect.value);
  }

  function populateColumnSelect(sheetName) {
    console.log('[POPUP] Populating column select for sheet:', sheetName);
    inputColumnSelect.innerHTML = '';
    localStorage.setItem('sheetName', sheetName);

    const rows = XlsxLoader.getSheetRows(uploadedWorkbook, sheetName);
    const columns = Object.keys(rows[0] || {});
    console.log('[POPUP] Available columns:', columns);

    if (columns.length === 0) {
      console.warn('[POPUP] No columns found in sheet:', sheetName);
      selectedFileStatus.textContent = `Using uploaded file: ${uploadedFileName} (no columns found)`;
      return;
    }

    columns.forEach((columnName) => {
      const option = document.createElement('option');
      option.value = columnName;
      option.textContent = columnName;
      inputColumnSelect.appendChild(option);
    });

    const savedColumn = localStorage.getItem('inputColumn');
    const defaultColumn =
      columns.find((columnName) => ['response', 'Response', 'RESPONSE'].includes(columnName)) ||
      columns[0];

    inputColumnSelect.value = columns.includes(savedColumn) ? savedColumn : defaultColumn;
    localStorage.setItem('inputColumn', inputColumnSelect.value);
    console.log('[POPUP] Selected input column:', inputColumnSelect.value, savedColumn && columns.includes(savedColumn) ? '(restored from localStorage)' : '(default)');
  }

  function clearAllData() {
    if (!confirm('Clear ALL data? This removes all items (pending, completed, errors) and resets the counter to 0.')) {
      console.log('[POPUP] clearAllData: cancelled by user');
      return;
    }

    console.log('[POPUP] clearAllData: clearing entire DB...');
    const dbName = 'ai-detector-db';
    const request = indexedDB.open(dbName);

    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction(['responses'], 'readwrite');
      const store = transaction.objectStore('responses');

      const countReq = store.count();
      countReq.onsuccess = () => {
        const total = countReq.result;
        console.log(`[POPUP] clearAllData: clearing ${total} items`);
        store.clear();
        transaction.oncomplete = () => {
          console.log('[POPUP] clearAllData: done, DB is now empty');
          db.close();
          refreshStats();
        };
      };

      transaction.onerror = (event) => {
        console.error('[POPUP] clearAllData: transaction error:', event.target.error);
        db.close();
        alert('Error clearing data: ' + event.target.error);
      };
    };

    request.onerror = (event) => {
      console.error('[POPUP] clearAllData: DB open error:', event.target.error);
      alert('Error opening database: ' + event.target.error);
    };
  }

  // ── Helpers for file persistence ─────────────────────────────────────────

  function persistUploadedFileSelection() {
    if (!uploadedWorkbook || !uploadedArrayBuffer) {
      console.log('[POPUP] persistUploadedFileSelection: skipped (no workbook/buffer)');
      return;
    }
    console.log(`[POPUP] Persisting file selection: file="${uploadedFileName}", sheet="${sheetSelect.value}", column="${inputColumnSelect.value}"`);
    XlsxLoader.saveUploadedFileData(
      uploadedArrayBuffer,
      uploadedFileName,
      sheetSelect.value,
      inputColumnSelect.value
    ).catch(e => console.warn('[POPUP] persistUploadedFileSelection error:', e));
  }

  async function tryRestoreUploadedFile() {
    console.log('[POPUP] tryRestoreUploadedFile: checking IndexedDB for saved file...');
    try {
      const saved = await XlsxLoader.loadUploadedFileData();
      if (!saved || !saved.arrayBuffer) {
        console.log('[POPUP] tryRestoreUploadedFile: no saved file found');
        return;
      }

      console.log(`[POPUP] tryRestoreUploadedFile: restoring "${saved.fileName}", sheet="${saved.sheetName}", column="${saved.inputColumn}"`);
      uploadedArrayBuffer = saved.arrayBuffer;
      uploadedWorkbook = XLSX.read(saved.arrayBuffer, { type: 'array' });
      uploadedFileName = saved.fileName || 'uploaded.xlsx';

      if (!uploadedWorkbook.SheetNames || uploadedWorkbook.SheetNames.length === 0) {
        console.warn('[POPUP] tryRestoreUploadedFile: workbook has no sheets, aborting restore');
        return;
      }

      console.log('[POPUP] tryRestoreUploadedFile: workbook sheets:', uploadedWorkbook.SheetNames);
      populateSheetSelect();
      xlsxSelectors.style.display = 'flex';
      selectedFileStatus.textContent = `Using uploaded file: ${uploadedFileName}`;

      if (saved.sheetName && uploadedWorkbook.Sheets[saved.sheetName]) {
        sheetSelect.value = saved.sheetName;
        populateColumnSelect(saved.sheetName);
      }
      if (saved.inputColumn && Array.from(inputColumnSelect.options).some(o => o.value === saved.inputColumn)) {
        inputColumnSelect.value = saved.inputColumn;
        console.log('[POPUP] tryRestoreUploadedFile: column restored to:', saved.inputColumn);
      } else {
        console.warn('[POPUP] tryRestoreUploadedFile: saved column not found in options:', saved.inputColumn);
      }
      refreshTotalXlsxRows();
      console.log('[POPUP] tryRestoreUploadedFile: restore complete');
    } catch (error) {
      console.warn('[POPUP] tryRestoreUploadedFile error:', error);
    }
  }

  // ── Helper to check if DB has any pending items ──────────────────────────

  async function checkHasPendingItems() {
    return new Promise((resolve) => {
      const request = indexedDB.open('ai-detector-db');
      request.onsuccess = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains('responses')) { db.close(); resolve(false); return; }
        const tx = db.transaction(['responses'], 'readonly');
        const store = tx.objectStore('responses');
        const getAllReq = store.getAll();
        getAllReq.onsuccess = () => {
          const items = getAllReq.result || [];
          const pending = items.filter(i => i.status === 'pending').length;
          console.log(`[POPUP] checkHasPendingItems: ${pending} pending out of ${items.length} total`);
          db.close();
          resolve(pending > 0);
        };
        getAllReq.onerror = () => { db.close(); resolve(false); };
      };
      request.onerror = () => resolve(false);
    });
  }

  // ── Helper to reset stuck 'running' items back to 'pending' ──────────────

  async function resetRunningItems() {
    console.log('[POPUP] resetRunningItems: checking for stuck "running" items...');
    return new Promise((resolve) => {
      const request = indexedDB.open('ai-detector-db');
      request.onsuccess = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains('responses')) {
          console.log('[POPUP] resetRunningItems: DB has no responses store, skipping');
          db.close(); resolve(); return;
        }
        const tx = db.transaction(['responses'], 'readwrite');
        const store = tx.objectStore('responses');
        const getAllReq = store.getAll();
        getAllReq.onsuccess = () => {
          const items = getAllReq.result || [];
          const runningItems = items.filter(i => i.status === 'running');
          console.log(`[POPUP] resetRunningItems: found ${runningItems.length} stuck "running" items out of ${items.length} total`);
          runningItems.forEach(item => {
            console.log(`[POPUP] resetRunningItems: resetting item "${item.id}" from "running" to "pending"`);
            store.put({ ...item, status: 'pending' });
          });
          tx.oncomplete = () => { db.close(); console.log('[POPUP] resetRunningItems: done'); resolve(); };
          tx.onerror = () => { console.error('[POPUP] resetRunningItems: transaction error'); db.close(); resolve(); };
        };
        getAllReq.onerror = () => { console.error('[POPUP] resetRunningItems: getAll error'); db.close(); resolve(); };
      };
      request.onerror = (e) => { console.error('[POPUP] resetRunningItems: DB open error:', e); resolve(); };
    });
  }

  // ─────────────────────────────────────────────────────────────────────────

  async function reloadFromXlsx() {
    console.log('[POPUP] reloadFromXlsx called');
    if (typeof XlsxLoader === 'undefined') {
      console.error('[POPUP] XlsxLoader not available!');
      alert('XLSX loader not available. Please refresh the extension.');
      return;
    }

    reloadBtn.disabled = true;
    reloadBtn.textContent = 'Loading...';

    const parseJson = jsonParseToggle.checked;
    const startRow = parseInt(startRowInput.value) || null;
    const endRow = parseInt(endRowInput.value) || null;
    console.log('[POPUP] reloadFromXlsx params:', { parseJson, startRow, endRow, hasWorkbook: !!uploadedWorkbook, fileName: uploadedFileName, sheet: sheetSelect.value, column: inputColumnSelect.value });

    // Validate row range
    if (startRow && endRow && startRow > endRow) {
      alert('Start row cannot be greater than end row');
      reloadBtn.disabled = false;
      reloadBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="23 4 23 10 17 10"></polyline>
          <polyline points="1 20 1 14 7 14"></polyline>
          <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
        </svg>
        Reload from XLSX
      `;
      return;
    }

    if (!uploadedWorkbook) {
      alert('Please upload an XLSX file first.');
      reloadBtn.disabled = false;
      reloadBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="23 4 23 10 17 10"></polyline>
          <polyline points="1 20 1 14 7 14"></polyline>
          <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
        </svg>
        Reload from XLSX
      `;
      return;
    }

    if (!inputColumnSelect.value) {
      alert('Please select an input column.');
      reloadBtn.disabled = false;
      reloadBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="23 4 23 10 17 10"></polyline>
          <polyline points="1 20 1 14 7 14"></polyline>
          <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
        </svg>
        Reload from XLSX
      `;
      return;
    }

    try {
      const loadOptions = {
        workbook: uploadedWorkbook,
        sheetName: sheetSelect.value,
        inputColumn: inputColumnSelect.value,
      };
      console.log('[POPUP] Calling XlsxLoader.reloadData...');
      const result = await XlsxLoader.reloadData(parseJson, startRow, endRow, loadOptions);
      console.log('[POPUP] reloadData result:', result);

      if (result.success) {
        const rangeInfo = startRow || endRow ? ` (rows ${startRow || 1}-${endRow || 'end'})` : '';
        const sourceInfo = `${uploadedFileName}, sheet "${sheetSelect.value}", column "${inputColumnSelect.value}"`;
        console.log(`[POPUP] Load SUCCESS: ${result.count} items from ${sourceInfo}${rangeInfo}`);
        alert(`Successfully loaded ${result.count} items from ${sourceInfo}${rangeInfo}${parseJson ? ' (JSON parsed)' : ''}`);
        refreshStats();
      } else {
        console.error('[POPUP] Load FAILED:', result.error);
        alert('Error loading data: ' + result.error);
      }
    } catch (error) {
      console.error('[POPUP] reloadFromXlsx caught exception:', error);
      alert('Error loading data: ' + error.message);
    } finally {
      reloadBtn.disabled = false;
      reloadBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="23 4 23 10 17 10"></polyline>
          <polyline points="1 20 1 14 7 14"></polyline>
          <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
        </svg>
        Reload from XLSX
      `;
    }
  }
  // Tab switching logic
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons and contents
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      // Add active class to clicked button and target content
      btn.classList.add('active');
      const targetId = btn.getAttribute('data-target');
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });
});
