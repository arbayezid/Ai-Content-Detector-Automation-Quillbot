// XLSX Data Loader - Loads data from data.xlsx and stores in IndexedDB
const XlsxLoader = {
  dbName: "ai-detector-db",
  storeName: "responses",

  // Strip HTML tags, converting block elements to newlines to preserve paragraph structure
  stripHtmlTags(text) {
    if (!text) return "";
    let clean = text
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/p>/gi, "\n")
      .replace(/<\/div>/gi, "\n")
      .replace(/<\/li>/gi, "\n")
      .replace(/<\/h[1-6]>/gi, "\n");
    clean = clean.replace(/<[^>]+>/g, "");
    // Normalize spaces/tabs but preserve newlines
    clean = clean.replace(/[ \t]+/g, " ");
    clean = clean.replace(/\n[ \t]+/g, "\n");
    clean = clean.replace(/[ \t]+\n/g, "\n");
    clean = clean.replace(/\n{3,}/g, "\n\n");
    return clean.trim();
  },

  // Returns true for strings that are noise: slugs, empty JSON, IDs, very short values
  _isNoise(str) {
    // Never filter Arabic text (can be short single words)
    if (/[\u0600-\u06FF]/.test(str)) return false;
    if (str.length < 4) return true;
    // looks like a slug: only lowercase letters, digits, hyphens
    if (/^[a-z0-9][a-z0-9-]*[a-z0-9]$/.test(str) && str.includes("-")) return true;
    // empty or trivial JSON literals
    if (/^\s*[\{\[]\s*[\}\]]\s*$/.test(str)) return true;
    return false;
  },

  // Returns true if a string is purely Arabic text (words + diacritics + punctuation only)
  _isArabicFragment(str) {
    return /^[\u0600-\u06FF\u064B-\u065F\u0610-\u061A\s،؟.،؛:]+$/.test(str.trim());
  },

  // Merge consecutive Arabic word fragments in the parts array into single strings
  _mergeArabicFragments(parts) {
    const merged = [];
    let arabicBuf = [];
    for (const part of parts) {
      if (this._isArabicFragment(part)) {
        arabicBuf.push(part.trim());
      } else {
        if (arabicBuf.length > 0) {
          merged.push(arabicBuf.join(" "));
          arabicBuf = [];
        }
        merged.push(part);
      }
    }
    if (arabicBuf.length > 0) merged.push(arabicBuf.join(" "));
    return merged;
  },

  // Add line breaks at natural structural boundaries in a wall-of-text string
  formatExtractedText(text) {
    let t = text;

    // Arabic blocks on their own paragraph — only trigger at Latin↔Arabic boundary
    // (not within Arabic text itself where spaces separate words)
    t = t.replace(/([A-Za-z0-9.!?,;'"])\s*([\u0600-\u06FF])/g, "$1\n\n$2");
    t = t.replace(/([\u0600-\u06FF،؟])\s*([A-Za-z])/g, "$1\n\n$2");

    // Numbered list items after a sentence end: "lips.1. Title" → "lips.\n\n1. Title"
    t = t.replace(/([.!?])\s*(\d{1,2}\.\s+[A-Z])/g, "$1\n\n$2");

    // "Label:" directly followed by a capital letter (no space) → add newline
    t = t.replace(/([a-zA-Z])(:)([A-Z])/g, "$1$2\n$3");

    // Sentences running together: "word.NextSentence" → "word.\n\nNextSentence"
    t = t.replace(/([a-z'"])\.([A-Z][a-z])/g, "$1.\n\n$2");

    // Clean up
    t = t.replace(/\n{3,}/g, "\n\n");
    t = t.replace(/[ \t]+/g, " ");

    return t.trim();
  },

  // Recursively extract all string values from any JSON structure (format-agnostic)
  // Escape literal control characters inside JSON string values so JSON.parse doesn't choke
  _sanitizeJson(str) {
    // Match each quoted JSON string token (handles \" escapes correctly) and
    // replace any literal newline/carriage-return/tab inside it with their escape sequences
    return str.replace(/"((?:[^"\\]|\\.)*)"/g, (match) =>
      match.replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t")
    );
  },

  jsonToNormalText(jsonStr) {
    try {
      // Strip BOM, zero-width spaces, and trim whitespace that Excel sometimes adds
      let cleaned = jsonStr.replace(/^\uFEFF/, "").replace(/[\u200B-\u200D\uFEFF]/g, "").trim();
      // Sanitize literal newlines inside string values (common when Excel stores JSON with real newlines)
      cleaned = this._sanitizeJson(cleaned);
      const data = JSON.parse(cleaned);
      const parts = [];

      const extract = (node) => {
        if (node === null || node === undefined) return;
        if (typeof node === "string") {
          const cleaned = this.stripHtmlTags(node).trim();
          if (cleaned.length > 0 && !this._isNoise(cleaned)) parts.push(cleaned);
        } else if (typeof node === "number" || typeof node === "boolean") {
          // skip numeric/boolean leaf values (IDs, flags, counts)
        } else if (Array.isArray(node)) {
          for (const item of node) extract(item);
        } else if (typeof node === "object") {
          for (const key of Object.keys(node)) extract(node[key]);
        }
      };

      extract(data);

      if (parts.length === 0) {
        console.warn("[LOADER] jsonToNormalText: JSON parsed OK but extracted 0 text parts. JSON keys:", typeof data === "object" && data !== null ? Object.keys(data).join(", ") : typeof data);
        // If parsed is a primitive string itself, return it
        if (typeof data === "string") return this.stripHtmlTags(data).trim();
        return "";
      }

      const mergedParts = this._mergeArabicFragments(parts);
      const raw = mergedParts.join("\n\n");
      const formatted = this.formatExtractedText(raw);
      console.log(`[LOADER] jsonToNormalText: ${parts.length} raw parts → ${mergedParts.length} after Arabic merge → ${formatted.split("\n").length} lines`);
      return formatted;
    } catch (e) {
      console.warn("[LOADER] Failed to parse JSON:", e.message, "| First 100 chars:", jsonStr.substring(0, 100));
      return "";
    }
  },

  async openDB() {
    console.log("[LOADER] Opening IndexedDB:", this.dbName);
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);
      request.onerror = () => { console.error("[LOADER] Failed to open DB:", request.error); reject(request.error); };
      request.onsuccess = () => { console.log("[LOADER] DB opened successfully"); resolve(request.result); };
      request.onupgradeneeded = (event) => {
        console.log("[LOADER] DB upgrade needed, creating object store");
        const db = event.target.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName, { keyPath: "id" });
          console.log("[LOADER] Object store created:", this.storeName);
        }
      };
    });
  },

  async clearAllData() {
    console.log("[LOADER] Clearing all data from DB...");
    const db = await this.openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, "readwrite");
      const store = transaction.objectStore(this.storeName);
      const request = store.clear();
      request.onsuccess = () => console.log("[LOADER] DB cleared successfully");
      request.onerror = () => { console.error("[LOADER] Failed to clear DB:", request.error); reject(request.error); };
      transaction.oncomplete = () => { db.close(); resolve(); };
    });
  },

  async saveResponses(responses) {
    console.log(`[LOADER] Saving ${responses.length} responses to DB...`);
    const db = await this.openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, "readwrite");
      const store = transaction.objectStore(this.storeName);
      responses.forEach((item) => { store.put(item); });
      transaction.oncomplete = () => {
        db.close();
        console.log(`[LOADER] Successfully saved ${responses.length} responses`);
        resolve();
      };
      transaction.onerror = () => {
        db.close();
        console.error("[LOADER] Failed to save responses:", transaction.error);
        reject(transaction.error);
      };
    });
  },

  async getStats() {
    const db = await this.openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, "readonly");
      const store = transaction.objectStore(this.storeName);
      const request = store.getAll();
      request.onsuccess = () => {
        const data = request.result;
        const stats = {
          total: data.length,
          pending: data.filter((i) => i.status === "pending").length,
          completed: data.filter((i) => i.status === "completed").length,
          error: data.filter((i) => i.status === "error").length,
        };
        console.log("[LOADER] getStats result:", stats);
        resolve(stats);
      };
      request.onerror = () => { console.error("[LOADER] getStats failed:", request.error); reject(request.error); };
      transaction.oncomplete = () => db.close();
    });
  },

  getSheetRows(workbook, sheetName) {
    if (!workbook || !workbook.Sheets) {
      throw new Error("Workbook is not available");
    }
    const selectedSheetName = sheetName || workbook.SheetNames[0];
    console.log(`[LOADER] getSheetRows: sheet="${selectedSheetName}", available sheets:`, workbook.SheetNames);
    const worksheet = workbook.Sheets[selectedSheetName];
    if (!worksheet) {
      throw new Error(`Sheet not found: ${selectedSheetName}`);
    }
    const rows = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
    console.log(`[LOADER] getSheetRows: ${rows.length} rows found`);
    return rows;
  },

  findIdColumn(row) {
    if (!row) return null;
    const found = Object.keys(row).find((key) => ["id", "ID", "Id"].includes(key)) || null;
    console.log("[LOADER] findIdColumn:", found, "| Available columns:", Object.keys(row));
    return found;
  },

  findDefaultInputColumn(row) {
    if (!row) return null;
    const found = Object.keys(row).find((key) => ["response", "Response", "RESPONSE"].includes(key)) || null;
    console.log("[LOADER] findDefaultInputColumn:", found);
    return found;
  },

  async loadFromXlsx(parseJson = false, startRow = null, endRow = null, options = {}) {
    console.log("[LOADER] loadFromXlsx called:", { parseJson, startRow, endRow, hasWorkbook: !!options.workbook, sheetName: options.sheetName, inputColumn: options.inputColumn });
    try {
      const workbook = options.workbook;
      if (!workbook) throw new Error("No XLSX file loaded. Please upload an XLSX file first.");

      const sheetName = options.sheetName || workbook.SheetNames[0];
      console.log(`[LOADER] Using sheet: "${sheetName}"`);
      let jsonData = this.getSheetRows(workbook, sheetName);
      console.log(`[LOADER] Total rows in sheet (before range filter): ${jsonData.length}`);
      const sourceStartRow = startRow || 1;

      if (startRow !== null || endRow !== null) {
        const start = startRow ? startRow - 1 : 0;
        const end = endRow ? endRow : jsonData.length;
        jsonData = jsonData.slice(start, end);
        console.log(`[LOADER] Row range filter applied: rows ${startRow || 1} to ${endRow || "end"} → ${jsonData.length} rows`);
      }

      if (jsonData.length === 0) {
        throw new Error("No rows found in the selected range");
      }

      const firstRow = jsonData[0] || {};
      console.log("[LOADER] First row sample:", Object.keys(firstRow));
      const idColumn = this.findIdColumn(firstRow);
      const inputColumn = options.inputColumn || this.findDefaultInputColumn(firstRow);
      console.log(`[LOADER] Using idColumn="${idColumn}", inputColumn="${inputColumn}"`);

      if (!inputColumn) {
        console.error("[LOADER] No input column found! Available columns:", Object.keys(firstRow));
        throw new Error("No input column selected");
      }

      let emptyResponseCount = 0;
      const responses = jsonData
        .map((row, index) => {
          const sourceRowNumber = sourceStartRow + index;
          const originalId = String(idColumn && row[idColumn] ? row[idColumn] : sourceRowNumber);
          let responseText = String(row[inputColumn] || "");

          if (!responseText.trim()) emptyResponseCount++;

          const rawResponse = responseText;

          if (parseJson && responseText) {
            const parsedText = this.jsonToNormalText(responseText);
            if (parsedText) {
              responseText = parsedText;
            } else {
              console.warn(`[LOADER] Row ${sourceRowNumber}: JSON parse produced empty text, keeping original`);
            }
          }

          const uniqueId = `${originalId}_row${sourceRowNumber}`;
          return { id: uniqueId, originalId, response: responseText, rawResponse, status: "pending" };
        })
        .filter((item) => item.originalId && item.response);

      console.log(`[LOADER] loadFromXlsx complete: ${responses.length} valid items (${emptyResponseCount} empty responses skipped)`);
      if (responses.length > 0) {
        console.log("[LOADER] Sample first item:", { id: responses[0].id, originalId: responses[0].originalId, textLength: responses[0].response.length, preview: responses[0].response.substring(0, 80) });
      }
      return responses;
    } catch (error) {
      console.error("[LOADER] loadFromXlsx ERROR:", error.message, error);
      throw error;
    }
  },

  // ── Uploaded file persistence (IndexedDB) ──────────────────────────────
  openUploadedFileDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("ai-detector-uploaded-file", 1);
      request.onerror = () => { console.error("[LOADER] Failed to open uploaded-file DB:", request.error); reject(request.error); };
      request.onsuccess = () => resolve(request.result);
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains("file")) {
          db.createObjectStore("file", { keyPath: "key" });
        }
      };
    });
  },

  async saveUploadedFileData(arrayBuffer, fileName, sheetName, inputColumn) {
    console.log(`[LOADER] Persisting uploaded file: "${fileName}", sheet="${sheetName}", column="${inputColumn}"`);
    try {
      const db = await this.openUploadedFileDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction("file", "readwrite");
        const store = tx.objectStore("file");
        store.put({ key: "current", arrayBuffer, fileName, sheetName, inputColumn, savedAt: Date.now() });
        tx.oncomplete = () => { db.close(); console.log("[LOADER] Uploaded file data saved to IndexedDB"); resolve(); };
        tx.onerror = () => { db.close(); console.error("[LOADER] Failed to save uploaded file data:", tx.error); reject(tx.error); };
      });
    } catch (e) {
      console.warn("[LOADER] Could not save uploaded file data:", e);
    }
  },

  async loadUploadedFileData() {
    console.log("[LOADER] Loading persisted uploaded file from IndexedDB...");
    try {
      const db = await this.openUploadedFileDB();
      return new Promise((resolve) => {
        const tx = db.transaction("file", "readonly");
        const store = tx.objectStore("file");
        const req = store.get("current");
        req.onsuccess = () => {
          if (req.result) {
            console.log(`[LOADER] Found persisted file: "${req.result.fileName}", sheet="${req.result.sheetName}", column="${req.result.inputColumn}", savedAt=${new Date(req.result.savedAt).toISOString()}`);
          } else {
            console.log("[LOADER] No persisted uploaded file found");
          }
          resolve(req.result || null);
        };
        req.onerror = () => { console.warn("[LOADER] Error reading persisted file"); resolve(null); };
        tx.oncomplete = () => db.close();
      });
    } catch (e) {
      console.warn("[LOADER] loadUploadedFileData error:", e);
      return null;
    }
  },

  async clearUploadedFileData() {
    console.log("[LOADER] Clearing persisted uploaded file data...");
    try {
      const db = await this.openUploadedFileDB();
      return new Promise((resolve) => {
        const tx = db.transaction("file", "readwrite");
        const store = tx.objectStore("file");
        store.delete("current");
        tx.oncomplete = () => { db.close(); console.log("[LOADER] Persisted file data cleared"); resolve(); };
        tx.onerror = () => { db.close(); resolve(); };
      });
    } catch {
      // ignore
    }
  },
  // ────────────────────────────────────────────────────────────────────────

  async reloadData(parseJson = false, startRow = null, endRow = null, options = {}) {
    console.log("[LOADER] reloadData called:", { parseJson, startRow, endRow, hasWorkbook: !!options.workbook });
    try {
      const responses = await this.loadFromXlsx(parseJson, startRow, endRow, options);

      if (responses.length === 0) {
        throw new Error("No valid data found in the selected XLSX data");
      }

      console.log("[LOADER] Clearing old DB data...");
      await this.clearAllData();

      console.log(`[LOADER] Saving ${responses.length} new items to DB...`);
      await this.saveResponses(responses);

      const rangeInfo = startRow || endRow ? ` (rows ${startRow || 1}-${endRow || "end"})` : "";
      console.log(`[LOADER] reloadData SUCCESS: ${responses.length} items loaded${rangeInfo} (JSON parse: ${parseJson})`);

      return { success: true, count: responses.length };
    } catch (error) {
      console.error("[LOADER] reloadData ERROR:", error.message, error);
      return { success: false, error: error.message };
    }
  },
};
