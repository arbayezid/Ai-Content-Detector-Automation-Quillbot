var background=function(){"use strict";var ft=Object.defineProperty;var pt=(re,U,ne)=>U in re?ft(re,U,{enumerable:!0,configurable:!0,writable:!0,value:ne}):re[U]=ne;var ae=(re,U,ne)=>pt(re,typeof U!="symbol"?U+"":U,ne);var Fe,Be;const U=(Be=(Fe=globalThis.browser)==null?void 0:Fe.runtime)!=null&&Be.id?globalThis.browser:globalThis.chrome;function ne(n){return n==null||typeof n=="function"?{main:n}:n}function We(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var de={exports:{}};/* @license
Papa Parse
v5.5.3
https://github.com/mholt/PapaParse
License: MIT
*/var Ke=de.exports,De;function Ve(){return De||(De=1,function(n,r){((i,o)=>{n.exports=o()})(Ke,function i(){var o=typeof self<"u"?self:typeof window<"u"?window:o!==void 0?o:{},b,v=!o.document&&!!o.postMessage,k=o.IS_PAPA_WORKER||!1,q={},M=0,h={};function Z(e){this._handle=null,this._finished=!1,this._completed=!1,this._halted=!1,this._input=null,this._baseIndex=0,this._partialLine="",this._rowCount=0,this._start=0,this._nextChunk=null,this.isFirstChunk=!0,this._completeResults={data:[],errors:[],meta:{}},(function(t){var s=ve(t);s.chunkSize=parseInt(s.chunkSize),t.step||t.chunk||(s.chunkSize=null),this._handle=new je(s),(this._handle.streamer=this)._config=s}).call(this,e),this.parseChunk=function(t,s){var c=parseInt(this._config.skipFirstNLines)||0;if(this.isFirstChunk&&0<c){let g=this._config.newline;g||(a=this._config.quoteChar||'"',g=this._handle.guessLineEndings(t,a)),t=[...t.split(g).slice(c)].join(g)}this.isFirstChunk&&R(this._config.beforeFirstChunk)&&(a=this._config.beforeFirstChunk(t))!==void 0&&(t=a),this.isFirstChunk=!1,this._halted=!1;var c=this._partialLine+t,a=(this._partialLine="",this._handle.parse(c,this._baseIndex,!this._finished));if(!this._handle.paused()&&!this._handle.aborted()){if(t=a.meta.cursor,c=(this._finished||(this._partialLine=c.substring(t-this._baseIndex),this._baseIndex=t),a&&a.data&&(this._rowCount+=a.data.length),this._finished||this._config.preview&&this._rowCount>=this._config.preview),k)o.postMessage({results:a,workerId:h.WORKER_ID,finished:c});else if(R(this._config.chunk)&&!s){if(this._config.chunk(a,this._handle),this._handle.paused()||this._handle.aborted())return void(this._halted=!0);this._completeResults=a=void 0}return this._config.step||this._config.chunk||(this._completeResults.data=this._completeResults.data.concat(a.data),this._completeResults.errors=this._completeResults.errors.concat(a.errors),this._completeResults.meta=a.meta),this._completed||!c||!R(this._config.complete)||a&&a.meta.aborted||(this._config.complete(this._completeResults,this._input),this._completed=!0),c||a&&a.meta.paused||this._nextChunk(),a}this._halted=!0},this._sendError=function(t){R(this._config.error)?this._config.error(t):k&&this._config.error&&o.postMessage({workerId:h.WORKER_ID,error:t,finished:!1})}}function pe(e){var t;(e=e||{}).chunkSize||(e.chunkSize=h.RemoteChunkSize),Z.call(this,e),this._nextChunk=v?function(){this._readChunk(),this._chunkLoaded()}:function(){this._readChunk()},this.stream=function(s){this._input=s,this._nextChunk()},this._readChunk=function(){if(this._finished)this._chunkLoaded();else{if(t=new XMLHttpRequest,this._config.withCredentials&&(t.withCredentials=this._config.withCredentials),v||(t.onload=X(this._chunkLoaded,this),t.onerror=X(this._chunkError,this)),t.open(this._config.downloadRequestBody?"POST":"GET",this._input,!v),this._config.downloadRequestHeaders){var s,c=this._config.downloadRequestHeaders;for(s in c)t.setRequestHeader(s,c[s])}var a;this._config.chunkSize&&(a=this._start+this._config.chunkSize-1,t.setRequestHeader("Range","bytes="+this._start+"-"+a));try{t.send(this._config.downloadRequestBody)}catch(g){this._chunkError(g.message)}v&&t.status===0&&this._chunkError()}},this._chunkLoaded=function(){t.readyState===4&&(t.status<200||400<=t.status?this._chunkError():(this._start+=this._config.chunkSize||t.responseText.length,this._finished=!this._config.chunkSize||this._start>=(s=>(s=s.getResponseHeader("Content-Range"))!==null?parseInt(s.substring(s.lastIndexOf("/")+1)):-1)(t),this.parseChunk(t.responseText)))},this._chunkError=function(s){s=t.statusText||s,this._sendError(new Error(s))}}function ge(e){(e=e||{}).chunkSize||(e.chunkSize=h.LocalChunkSize),Z.call(this,e);var t,s,c=typeof FileReader<"u";this.stream=function(a){this._input=a,s=a.slice||a.webkitSlice||a.mozSlice,c?((t=new FileReader).onload=X(this._chunkLoaded,this),t.onerror=X(this._chunkError,this)):t=new FileReaderSync,this._nextChunk()},this._nextChunk=function(){this._finished||this._config.preview&&!(this._rowCount<this._config.preview)||this._readChunk()},this._readChunk=function(){var a=this._input,g=(this._config.chunkSize&&(g=Math.min(this._start+this._config.chunkSize,this._input.size),a=s.call(a,this._start,g)),t.readAsText(a,this._config.encoding));c||this._chunkLoaded({target:{result:g}})},this._chunkLoaded=function(a){this._start+=this._config.chunkSize,this._finished=!this._config.chunkSize||this._start>=this._input.size,this.parseChunk(a.target.result)},this._chunkError=function(){this._sendError(t.error)}}function oe(e){var t;Z.call(this,e=e||{}),this.stream=function(s){return t=s,this._nextChunk()},this._nextChunk=function(){var s,c;if(!this._finished)return s=this._config.chunkSize,t=s?(c=t.substring(0,s),t.substring(s)):(c=t,""),this._finished=!t,this.parseChunk(c)}}function me(e){Z.call(this,e=e||{});var t=[],s=!0,c=!1;this.pause=function(){Z.prototype.pause.apply(this,arguments),this._input.pause()},this.resume=function(){Z.prototype.resume.apply(this,arguments),this._input.resume()},this.stream=function(a){this._input=a,this._input.on("data",this._streamData),this._input.on("end",this._streamEnd),this._input.on("error",this._streamError)},this._checkIsFinished=function(){c&&t.length===1&&(this._finished=!0)},this._nextChunk=function(){this._checkIsFinished(),t.length?this.parseChunk(t.shift()):s=!0},this._streamData=X(function(a){try{t.push(typeof a=="string"?a:a.toString(this._config.encoding)),s&&(s=!1,this._checkIsFinished(),this.parseChunk(t.shift()))}catch(g){this._streamError(g)}},this),this._streamError=X(function(a){this._streamCleanUp(),this._sendError(a)},this),this._streamEnd=X(function(){this._streamCleanUp(),c=!0,this._streamData("")},this),this._streamCleanUp=X(function(){this._input.removeListener("data",this._streamData),this._input.removeListener("end",this._streamEnd),this._input.removeListener("error",this._streamError)},this)}function je(e){var t,s,c,a,g=Math.pow(2,53),A=-g,W=/^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/,K=/^((\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)))$/,m=this,D=0,d=0,j=!1,f=!1,_=[],u={data:[],errors:[],meta:{}};function P(w){return e.skipEmptyLines==="greedy"?w.join("").trim()==="":w.length===1&&w[0].length===0}function O(){if(u&&c&&(V("Delimiter","UndetectableDelimiter","Unable to auto-detect delimiting character; defaulted to '"+h.DefaultDelimiter+"'"),c=!1),e.skipEmptyLines&&(u.data=u.data.filter(function(l){return!P(l)})),B()){let l=function(T,L){R(e.transformHeader)&&(T=e.transformHeader(T,L)),_.push(T)};if(u)if(Array.isArray(u.data[0])){for(var w=0;B()&&w<u.data.length;w++)u.data[w].forEach(l);u.data.splice(0,1)}else u.data.forEach(l)}function E(l,T){for(var L=e.header?{}:[],S=0;S<l.length;S++){var I=S,y=l[S],y=(($,p)=>(C=>(e.dynamicTypingFunction&&e.dynamicTyping[C]===void 0&&(e.dynamicTyping[C]=e.dynamicTypingFunction(C)),(e.dynamicTyping[C]||e.dynamicTyping)===!0))($)?p==="true"||p==="TRUE"||p!=="false"&&p!=="FALSE"&&((C=>{if(W.test(C)&&(C=parseFloat(C),A<C&&C<g))return 1})(p)?parseFloat(p):K.test(p)?new Date(p):p===""?null:p):p)(I=e.header?S>=_.length?"__parsed_extra":_[S]:I,y=e.transform?e.transform(y,I):y);I==="__parsed_extra"?(L[I]=L[I]||[],L[I].push(y)):L[I]=y}return e.header&&(S>_.length?V("FieldMismatch","TooManyFields","Too many fields: expected "+_.length+" fields but parsed "+S,d+T):S<_.length&&V("FieldMismatch","TooFewFields","Too few fields: expected "+_.length+" fields but parsed "+S,d+T)),L}var x;u&&(e.header||e.dynamicTyping||e.transform)&&(x=1,!u.data.length||Array.isArray(u.data[0])?(u.data=u.data.map(E),x=u.data.length):u.data=E(u.data,0),e.header&&u.meta&&(u.meta.fields=_),d+=x)}function B(){return e.header&&_.length===0}function V(w,E,x,l){w={type:w,code:E,message:x},l!==void 0&&(w.row=l),u.errors.push(w)}R(e.step)&&(a=e.step,e.step=function(w){u=w,B()?O():(O(),u.data.length!==0&&(D+=w.data.length,e.preview&&D>e.preview?s.abort():(u.data=u.data[0],a(u,m))))}),this.parse=function(w,E,x){var l=e.quoteChar||'"',l=(e.newline||(e.newline=this.guessLineEndings(w,l)),c=!1,e.delimiter?R(e.delimiter)&&(e.delimiter=e.delimiter(w),u.meta.delimiter=e.delimiter):((l=((T,L,S,I,y)=>{var $,p,C,ee;y=y||[",","	","|",";",h.RECORD_SEP,h.UNIT_SEP];for(var se=0;se<y.length;se++){for(var Q,ue=y[se],z=0,G=0,F=0,N=(C=void 0,new Ie({comments:I,delimiter:ue,newline:L,preview:10}).parse(T)),Y=0;Y<N.data.length;Y++)S&&P(N.data[Y])?F++:(Q=N.data[Y].length,G+=Q,C===void 0?C=Q:0<Q&&(z+=Math.abs(Q-C),C=Q));0<N.data.length&&(G/=N.data.length-F),(p===void 0||z<=p)&&(ee===void 0||ee<G)&&1.99<G&&(p=z,$=ue,ee=G)}return{successful:!!(e.delimiter=$),bestDelimiter:$}})(w,e.newline,e.skipEmptyLines,e.comments,e.delimitersToGuess)).successful?e.delimiter=l.bestDelimiter:(c=!0,e.delimiter=h.DefaultDelimiter),u.meta.delimiter=e.delimiter),ve(e));return e.preview&&e.header&&l.preview++,t=w,s=new Ie(l),u=s.parse(t,E,x),O(),j?{meta:{paused:!0}}:u||{meta:{paused:!1}}},this.paused=function(){return j},this.pause=function(){j=!0,s.abort(),t=R(e.chunk)?"":t.substring(s.getCharIndex())},this.resume=function(){m.streamer._halted?(j=!1,m.streamer.parseChunk(t,!0)):setTimeout(m.resume,3)},this.aborted=function(){return f},this.abort=function(){f=!0,s.abort(),u.meta.aborted=!0,R(e.complete)&&e.complete(u),t=""},this.guessLineEndings=function(T,l){T=T.substring(0,1048576);var l=new RegExp(ce(l)+"([^]*?)"+ce(l),"gm"),x=(T=T.replace(l,"")).split("\r"),l=T.split(`
`),T=1<l.length&&l[0].length<x[0].length;if(x.length===1||T)return`
`;for(var L=0,S=0;S<x.length;S++)x[S][0]===`
`&&L++;return L>=x.length/2?`\r
`:"\r"}}function ce(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Ie(e){var t=(e=e||{}).delimiter,s=e.newline,c=e.comments,a=e.step,g=e.preview,A=e.fastMode,W=null,K=!1,m=e.quoteChar==null?'"':e.quoteChar,D=m;if(e.escapeChar!==void 0&&(D=e.escapeChar),(typeof t!="string"||-1<h.BAD_DELIMITERS.indexOf(t))&&(t=","),c===t)throw new Error("Comment character same as delimiter");c===!0?c="#":(typeof c!="string"||-1<h.BAD_DELIMITERS.indexOf(c))&&(c=!1),s!==`
`&&s!=="\r"&&s!==`\r
`&&(s=`
`);var d=0,j=!1;this.parse=function(f,_,u){if(typeof f!="string")throw new Error("Input must be a string");var P=f.length,O=t.length,B=s.length,V=c.length,w=R(a),E=[],x=[],l=[],T=d=0;if(!f)return z();if(A||A!==!1&&f.indexOf(m)===-1){for(var L=f.split(s),S=0;S<L.length;S++){if(l=L[S],d+=l.length,S!==L.length-1)d+=s.length;else if(u)return z();if(!c||l.substring(0,V)!==c){if(w){if(E=[],ee(l.split(t)),G(),j)return z()}else ee(l.split(t));if(g&&g<=S)return E=E.slice(0,g),z(!0)}}return z()}for(var I=f.indexOf(t,d),y=f.indexOf(s,d),$=new RegExp(ce(D)+ce(m),"g"),p=f.indexOf(m,d);;)if(f[d]===m)for(p=d,d++;;){if((p=f.indexOf(m,p+1))===-1)return u||x.push({type:"Quotes",code:"MissingQuotes",message:"Quoted field unterminated",row:E.length,index:d}),Q();if(p===P-1)return Q(f.substring(d,p).replace($,m));if(m===D&&f[p+1]===D)p++;else if(m===D||p===0||f[p-1]!==D){I!==-1&&I<p+1&&(I=f.indexOf(t,p+1));var C=se((y=y!==-1&&y<p+1?f.indexOf(s,p+1):y)===-1?I:Math.min(I,y));if(f.substr(p+1+C,O)===t){l.push(f.substring(d,p).replace($,m)),f[d=p+1+C+O]!==m&&(p=f.indexOf(m,d)),I=f.indexOf(t,d),y=f.indexOf(s,d);break}if(C=se(y),f.substring(p+1+C,p+1+C+B)===s){if(l.push(f.substring(d,p).replace($,m)),ue(p+1+C+B),I=f.indexOf(t,d),p=f.indexOf(m,d),w&&(G(),j))return z();if(g&&E.length>=g)return z(!0);break}x.push({type:"Quotes",code:"InvalidQuotes",message:"Trailing quote on quoted field is malformed",row:E.length,index:d}),p++}}else if(c&&l.length===0&&f.substring(d,d+V)===c){if(y===-1)return z();d=y+B,y=f.indexOf(s,d),I=f.indexOf(t,d)}else if(I!==-1&&(I<y||y===-1))l.push(f.substring(d,I)),d=I+O,I=f.indexOf(t,d);else{if(y===-1)break;if(l.push(f.substring(d,y)),ue(y+B),w&&(G(),j))return z();if(g&&E.length>=g)return z(!0)}return Q();function ee(F){E.push(F),T=d}function se(F){var N=0;return N=F!==-1&&(F=f.substring(p+1,F))&&F.trim()===""?F.length:N}function Q(F){return u||(F===void 0&&(F=f.substring(d)),l.push(F),d=P,ee(l),w&&G()),z()}function ue(F){d=F,ee(l),l=[],y=f.indexOf(s,d)}function z(F){if(e.header&&!_&&E.length&&!K){var N=E[0],Y=Object.create(null),Ce=new Set(N);let Ne=!1;for(let ie=0;ie<N.length;ie++){let J=N[ie];if(Y[J=R(e.transformHeader)?e.transformHeader(J,ie):J]){let he,qe=Y[J];for(;he=J+"_"+qe,qe++,Ce.has(he););Ce.add(he),N[ie]=he,Y[J]++,Ne=!0,(W=W===null?{}:W)[he]=J}else Y[J]=1,N[ie]=J;Ce.add(J)}Ne&&console.warn("Duplicate headers found and renamed."),K=!0}return{data:E,errors:x,meta:{delimiter:t,linebreak:s,aborted:j,truncated:!!F,cursor:T+(_||0),renamedHeaders:W}}}function G(){a(z()),E=[],x=[]}},this.abort=function(){j=!0},this.getCharIndex=function(){return d}}function lt(e){var t=e.data,s=q[t.workerId],c=!1;if(t.error)s.userError(t.error,t.file);else if(t.results&&t.results.data){var a={abort:function(){c=!0,ze(t.workerId,{data:[],errors:[],meta:{aborted:!0}})},pause:Ue,resume:Ue};if(R(s.userStep)){for(var g=0;g<t.results.data.length&&(s.userStep({data:t.results.data[g],errors:t.results.errors,meta:t.results.meta},a),!c);g++);delete t.results}else R(s.userChunk)&&(s.userChunk(t.results,a,t.file),delete t.results)}t.finished&&!c&&ze(t.workerId,t.results)}function ze(e,t){var s=q[e];R(s.userComplete)&&s.userComplete(t),s.terminate(),delete q[e]}function Ue(){throw new Error("Not implemented.")}function ve(e){if(typeof e!="object"||e===null)return e;var t,s=Array.isArray(e)?[]:{};for(t in e)s[t]=ve(e[t]);return s}function X(e,t){return function(){e.apply(t,arguments)}}function R(e){return typeof e=="function"}return h.parse=function(e,t){var s=(t=t||{}).dynamicTyping||!1;if(R(s)&&(t.dynamicTypingFunction=s,s={}),t.dynamicTyping=s,t.transform=!!R(t.transform)&&t.transform,!t.worker||!h.WORKERS_SUPPORTED)return s=null,h.NODE_STREAM_INPUT,typeof e=="string"?(e=(c=>c.charCodeAt(0)!==65279?c:c.slice(1))(e),s=new(t.download?pe:oe)(t)):e.readable===!0&&R(e.read)&&R(e.on)?s=new me(t):(o.File&&e instanceof File||e instanceof Object)&&(s=new ge(t)),s.stream(e);(s=(()=>{var c;return!!h.WORKERS_SUPPORTED&&(c=(()=>{var a=o.URL||o.webkitURL||null,g=i.toString();return h.BLOB_URL||(h.BLOB_URL=a.createObjectURL(new Blob(["var global = (function() { if (typeof self !== 'undefined') { return self; } if (typeof window !== 'undefined') { return window; } if (typeof global !== 'undefined') { return global; } return {}; })(); global.IS_PAPA_WORKER=true; ","(",g,")();"],{type:"text/javascript"})))})(),(c=new o.Worker(c)).onmessage=lt,c.id=M++,q[c.id]=c)})()).userStep=t.step,s.userChunk=t.chunk,s.userComplete=t.complete,s.userError=t.error,t.step=R(t.step),t.chunk=R(t.chunk),t.complete=R(t.complete),t.error=R(t.error),delete t.worker,s.postMessage({input:e,config:t,workerId:s.id})},h.unparse=function(e,t){var s=!1,c=!0,a=",",g=`\r
`,A='"',W=A+A,K=!1,m=null,D=!1,d=((()=>{if(typeof t=="object"){if(typeof t.delimiter!="string"||h.BAD_DELIMITERS.filter(function(_){return t.delimiter.indexOf(_)!==-1}).length||(a=t.delimiter),typeof t.quotes!="boolean"&&typeof t.quotes!="function"&&!Array.isArray(t.quotes)||(s=t.quotes),typeof t.skipEmptyLines!="boolean"&&typeof t.skipEmptyLines!="string"||(K=t.skipEmptyLines),typeof t.newline=="string"&&(g=t.newline),typeof t.quoteChar=="string"&&(A=t.quoteChar),typeof t.header=="boolean"&&(c=t.header),Array.isArray(t.columns)){if(t.columns.length===0)throw new Error("Option columns is empty");m=t.columns}t.escapeChar!==void 0&&(W=t.escapeChar+A),t.escapeFormulae instanceof RegExp?D=t.escapeFormulae:typeof t.escapeFormulae=="boolean"&&t.escapeFormulae&&(D=/^[=+\-@\t\r].*$/)}})(),new RegExp(ce(A),"g"));if(typeof e=="string"&&(e=JSON.parse(e)),Array.isArray(e)){if(!e.length||Array.isArray(e[0]))return j(null,e,K);if(typeof e[0]=="object")return j(m||Object.keys(e[0]),e,K)}else if(typeof e=="object")return typeof e.data=="string"&&(e.data=JSON.parse(e.data)),Array.isArray(e.data)&&(e.fields||(e.fields=e.meta&&e.meta.fields||m),e.fields||(e.fields=Array.isArray(e.data[0])?e.fields:typeof e.data[0]=="object"?Object.keys(e.data[0]):[]),Array.isArray(e.data[0])||typeof e.data[0]=="object"||(e.data=[e.data])),j(e.fields||[],e.data||[],K);throw new Error("Unable to serialize unrecognized input");function j(_,u,P){var O="",B=(typeof _=="string"&&(_=JSON.parse(_)),typeof u=="string"&&(u=JSON.parse(u)),Array.isArray(_)&&0<_.length),V=!Array.isArray(u[0]);if(B&&c){for(var w=0;w<_.length;w++)0<w&&(O+=a),O+=f(_[w],w);0<u.length&&(O+=g)}for(var E=0;E<u.length;E++){var x=(B?_:u[E]).length,l=!1,T=B?Object.keys(u[E]).length===0:u[E].length===0;if(P&&!B&&(l=P==="greedy"?u[E].join("").trim()==="":u[E].length===1&&u[E][0].length===0),P==="greedy"&&B){for(var L=[],S=0;S<x;S++){var I=V?_[S]:S;L.push(u[E][I])}l=L.join("").trim()===""}if(!l){for(var y=0;y<x;y++){0<y&&!T&&(O+=a);var $=B&&V?_[y]:y;O+=f(u[E][$],y)}E<u.length-1&&(!P||0<x&&!T)&&(O+=g)}}return O}function f(_,u){var P,O;return _==null?"":_.constructor===Date?JSON.stringify(_).slice(1,25):(O=!1,D&&typeof _=="string"&&D.test(_)&&(_="'"+_,O=!0),P=_.toString().replace(d,W),(O=O||s===!0||typeof s=="function"&&s(_,u)||Array.isArray(s)&&s[u]||((B,V)=>{for(var w=0;w<V.length;w++)if(-1<B.indexOf(V[w]))return!0;return!1})(P,h.BAD_DELIMITERS)||-1<P.indexOf(a)||P.charAt(0)===" "||P.charAt(P.length-1)===" ")?A+P+A:P)}},h.RECORD_SEP="",h.UNIT_SEP="",h.BYTE_ORDER_MARK="\uFEFF",h.BAD_DELIMITERS=["\r",`
`,'"',h.BYTE_ORDER_MARK],h.WORKERS_SUPPORTED=!v&&!!o.Worker,h.NODE_STREAM_INPUT=1,h.LocalChunkSize=10485760,h.RemoteChunkSize=5242880,h.DefaultDelimiter=",",h.Parser=Ie,h.ParserHandle=je,h.NetworkStreamer=pe,h.FileStreamer=ge,h.StringStreamer=oe,h.ReadableStreamStreamer=me,o.jQuery&&((b=o.jQuery).fn.parse=function(e){var t=e.config||{},s=[];return this.each(function(g){if(!(b(this).prop("tagName").toUpperCase()==="INPUT"&&b(this).attr("type").toLowerCase()==="file"&&o.FileReader)||!this.files||this.files.length===0)return!0;for(var A=0;A<this.files.length;A++)s.push({file:this.files[A],inputElem:this,instanceConfig:b.extend({},t)})}),c(),this;function c(){if(s.length===0)R(e.complete)&&e.complete();else{var g,A,W,K,m=s[0];if(R(e.before)){var D=e.before(m.file,m.inputElem);if(typeof D=="object"){if(D.action==="abort")return g="AbortError",A=m.file,W=m.inputElem,K=D.reason,void(R(e.error)&&e.error({name:g},A,W,K));if(D.action==="skip")return void a();typeof D.config=="object"&&(m.instanceConfig=b.extend(m.instanceConfig,D.config))}else if(D==="skip")return void a()}var d=m.instanceConfig.complete;m.instanceConfig.complete=function(j){R(d)&&d(j,m.file,m.inputElem),a()},h.parse(m.file,m.instanceConfig)}}function a(){s.splice(0,1),c()}}),k&&(o.onmessage=function(e){e=e.data,h.WORKER_ID===void 0&&e&&(h.WORKER_ID=e.workerId),typeof e.input=="string"?o.postMessage({workerId:h.WORKER_ID,results:h.parse(e.input,e.config),finished:!0}):(o.File&&e.input instanceof File||e.input instanceof Object)&&(e=h.parse(e.input,e.config))&&o.postMessage({workerId:h.WORKER_ID,results:e,finished:!0})}),(pe.prototype=Object.create(Z.prototype)).constructor=pe,(ge.prototype=Object.create(Z.prototype)).constructor=ge,(oe.prototype=Object.create(oe.prototype)).constructor=oe,(me.prototype=Object.create(Z.prototype)).constructor=me,h})}(de)),de.exports}var $e=Ve();const He=We($e),_e=(n,r)=>r.some(i=>n instanceof i);let xe,Te;function Qe(){return xe||(xe=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Ge(){return Te||(Te=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const we=new WeakMap,ye=new WeakMap,le=new WeakMap;function Je(n){const r=new Promise((i,o)=>{const b=()=>{n.removeEventListener("success",v),n.removeEventListener("error",k)},v=()=>{i(te(n.result)),b()},k=()=>{o(n.error),b()};n.addEventListener("success",v),n.addEventListener("error",k)});return le.set(r,n),r}function Ze(n){if(we.has(n))return;const r=new Promise((i,o)=>{const b=()=>{n.removeEventListener("complete",v),n.removeEventListener("error",k),n.removeEventListener("abort",k)},v=()=>{i(),b()},k=()=>{o(n.error||new DOMException("AbortError","AbortError")),b()};n.addEventListener("complete",v),n.addEventListener("error",k),n.addEventListener("abort",k)});we.set(n,r)}let be={get(n,r,i){if(n instanceof IDBTransaction){if(r==="done")return we.get(n);if(r==="store")return i.objectStoreNames[1]?void 0:i.objectStore(i.objectStoreNames[0])}return te(n[r])},set(n,r,i){return n[r]=i,!0},has(n,r){return n instanceof IDBTransaction&&(r==="done"||r==="store")?!0:r in n}};function Oe(n){be=n(be)}function Ye(n){return Ge().includes(n)?function(...r){return n.apply(Ee(this),r),te(this.request)}:function(...r){return te(n.apply(Ee(this),r))}}function Xe(n){return typeof n=="function"?Ye(n):(n instanceof IDBTransaction&&Ze(n),_e(n,Qe())?new Proxy(n,be):n)}function te(n){if(n instanceof IDBRequest)return Je(n);if(ye.has(n))return ye.get(n);const r=Xe(n);return r!==n&&(ye.set(n,r),le.set(r,n)),r}const Ee=n=>le.get(n);function et(n,r,{blocked:i,upgrade:o,blocking:b,terminated:v}={}){const k=indexedDB.open(n,r),q=te(k);return o&&k.addEventListener("upgradeneeded",M=>{o(te(k.result),M.oldVersion,M.newVersion,te(k.transaction),M)}),i&&k.addEventListener("blocked",M=>i(M.oldVersion,M.newVersion,M)),q.then(M=>{v&&M.addEventListener("close",()=>v()),b&&M.addEventListener("versionchange",h=>b(h.oldVersion,h.newVersion,h))}).catch(()=>{}),q}const tt=["get","getKey","getAll","getAllKeys","count"],rt=["put","add","delete","clear"],ke=new Map;function Ae(n,r){if(!(n instanceof IDBDatabase&&!(r in n)&&typeof r=="string"))return;if(ke.get(r))return ke.get(r);const i=r.replace(/FromIndex$/,""),o=r!==i,b=rt.includes(i);if(!(i in(o?IDBIndex:IDBObjectStore).prototype)||!(b||tt.includes(i)))return;const v=async function(k,...q){const M=this.transaction(k,b?"readwrite":"readonly");let h=M.store;return o&&(h=h.index(q.shift())),(await Promise.all([h[i](...q),b&&M.done]))[0]};return ke.set(r,v),v}Oe(n=>({...n,get:(r,i,o)=>Ae(r,i)||n.get(r,i,o),has:(r,i)=>!!Ae(r,i)||n.has(r,i)}));const nt=["continue","continuePrimaryKey","advance"],Pe={},Se=new WeakMap,Le=new WeakMap,st={get(n,r){if(!nt.includes(r))return n[r];let i=Pe[r];return i||(i=Pe[r]=function(...o){Se.set(this,Le.get(this)[r](...o))}),i}};async function*it(...n){let r=this;if(r instanceof IDBCursor||(r=await r.openCursor(...n)),!r)return;r=r;const i=new Proxy(r,st);for(Le.set(i,r),le.set(i,Ee(r));r;)yield i,r=await(Se.get(i)||r.continue()),Se.delete(i)}function Me(n,r){return r===Symbol.asyncIterator&&_e(n,[IDBIndex,IDBObjectStore,IDBCursor])||r==="iterate"&&_e(n,[IDBIndex,IDBObjectStore])}Oe(n=>({...n,get(r,i,o){return Me(r,i)?it:n.get(r,i,o)},has(r,i){return Me(r,i)||n.has(r,i)}}));class at{constructor(){ae(this,"db",null);ae(this,"dbName","ai-detector-db");ae(this,"version",1)}async init(){this.db||(this.db=await et(this.dbName,this.version,{upgrade(r){r.objectStoreNames.contains("responses")||r.createObjectStore("responses",{keyPath:"id"})}}))}async getAllResponses(){if(await this.init(),!this.db)throw new Error("Database not initialized");return this.db.getAll("responses")}async getResponse(r){if(await this.init(),!this.db)throw new Error("Database not initialized");return this.db.get("responses",r)}async saveResponse(r){if(await this.init(),!this.db)throw new Error("Database not initialized");await this.db.put("responses",r)}async saveResponses(r){if(await this.init(),!this.db)throw new Error("Database not initialized");const i=this.db.transaction("responses","readwrite");await Promise.all([...r.map(o=>i.store.put(o)),i.done])}async updateResponseStatus(r,i,o){const b=await this.getResponse(r);if(!b)throw new Error(`Response with id ${r} not found`);const v={...b,status:i,...o,processedAt:i==="completed"?new Date:b.processedAt};await this.saveResponse(v)}async getPendingResponses(){return(await this.getAllResponses()).filter(i=>i.status==="pending")}async getCompletedResponses(){return(await this.getAllResponses()).filter(i=>i.status==="completed")}async clearAll(){if(await this.init(),!this.db)throw new Error("Database not initialized");await this.db.clear("responses")}async getStats(){const r=await this.getAllResponses();return{total:r.length,pending:r.filter(i=>i.status==="pending").length,completed:r.filter(i=>i.status==="completed").length,error:r.filter(i=>i.status==="error").length}}}const H=new at;class ot{async loadAndParseCSV(){try{const r=U.runtime.getURL("/data.csv"),o=await(await fetch(r)).text();return new Promise((b,v)=>{He.parse(o,{header:!0,skipEmptyLines:!0,transformHeader:k=>k.trim(),transform:k=>k.trim(),complete:k=>{if(k.errors.length>0){console.error("CSV parsing errors:",k.errors),v(new Error("Failed to parse CSV"));return}const q=k.data.map(M=>({id:M.id,response:M.response,status:"pending"}));b(q)},error:k=>{console.error("Papa Parse error:",k),v(k)}})})}catch(r){throw console.error("Error loading CSV:",r),r}}async initializeData(){try{if((await H.getAllResponses()).length>0){console.log("Data already exists in storage, skipping CSV load");return}const i=await this.loadAndParseCSV();await H.saveResponses(i),console.log(`Loaded ${i.length} responses from CSV`)}catch(r){throw console.error("Failed to initialize data:",r),r}}async refreshData(){try{await H.clearAll(),await this.initializeData(),console.log("Data refreshed from CSV")}catch(r){throw console.error("Failed to refresh data:",r),r}}}const ct=new ot;class ut{constructor(){ae(this,"processingState",{isRunning:!1,totalItems:0,completedItems:0,errorItems:0});ae(this,"currentTabId",null);ae(this,"tabOpenedTime",null)}async init(){console.log("Background script initialized"),U.runtime.onMessage.addListener((r,i,o)=>(this.handleMessage(r,i,o),!0)),U.tabs.onUpdated.addListener((r,i,o)=>{var b;i.status==="complete"&&((b=o.url)!=null&&b.includes("quillbot.com/ai-content-detector"))&&console.log("QuillBot AI detector page detected")})}async handleMessage(r,i,o){console.log("[BG] handleMessage received:",r.type,r.payload?JSON.stringify(r.payload).substring(0,80):"");try{switch(r.type){case"GET_STATE":const b=await this.getState();console.log("[BG] GET_STATE response:",JSON.stringify(b));o({success:!0,data:b});break;case"GET_DATA":const v=await H.getAllResponses();console.log("[BG] GET_DATA: returning",v.length,"items");o({success:!0,data:v});break;case"START_PROCESSING":if(this.processingState.isRunning||this.processingState.isStarting){console.log("[BG] START_PROCESSING ignored; already running or starting"),o({success:!0});break}this.processingState.isStarting=!0;try{console.log("[BG] START_PROCESSING received");{const wl=r&&r.payload&&r.payload.wordLimit;this.processingState.wordLimit=wl>0?wl:1300;console.log("[BG] Word limit set to:",this.processingState.wordLimit)}await this.startProcessing(),o({success:!0})}finally{this.processingState.isStarting=!1}break;case"STOP_PROCESSING":console.log("[BG] STOP_PROCESSING received");await this.stopProcessing(),o({success:!0});break;case"ITEM_COMPLETED":console.log("[BG] ITEM_COMPLETED for id:",r.payload&&r.payload.id);await this.handleItemCompleted(r.payload),o({success:!0});break;case"ITEM_ERROR":console.log("[BG] ITEM_ERROR for id:",r.payload&&r.payload.id,"error:",r.payload&&r.payload.error);await this.handleItemError(r.payload),o({success:!0});break;case"CONTENT_SCRIPT_READY":console.log("[BG] CONTENT_SCRIPT_READY received from tab",i&&i.tab&&i.tab.id);o({success:!0});break;case"PING":o({success:!0,ready:!0});break;default:console.warn("[BG] Unknown message type:",r.type);o({success:!1,error:"Unknown message type"})}}catch(b){console.error("[BG] handleMessage ERROR for type",r.type,":",b),o({success:!1,error:b instanceof Error?b.message:"Unknown error"})}}async getState(){const r=await H.getStats();return this.processingState.totalItems=r.total,this.processingState.completedItems=r.completed,this.processingState.errorItems=r.error,{...this.processingState,tabOpenedTime:this.tabOpenedTime}}async startProcessing(){if(this.processingState.isRunning){console.log("Processing already running");return}const existingTabs=await U.tabs.query({url:"*://quillbot.com/ai-content-detector*"});console.log("[BG] startProcessing: found",existingTabs.length,"existing QuillBot tab(s), closing them...");for(const t of existingTabs){try{await U.tabs.remove(t.id);console.log("[BG] Closed tab:",t.id)}catch(e){console.warn("[BG] Could not close tab:",t.id,e)}}console.log("[BG] Creating fresh QuillBot tab...");const freshTab=await U.tabs.create({url:"https://quillbot.com/ai-content-detector?aidr_ext=1"});console.log("[BG] Fresh tab created, id:",freshTab.id,", waiting for load...");await new Promise(rs=>{const lsnr=(tid,info)=>{if(tid===freshTab.id&&info.status==="complete"){U.tabs.onUpdated.removeListener(lsnr);console.log("[BG] Tab load complete, tab id:",freshTab.id);rs()}};U.tabs.onUpdated.addListener(lsnr)});console.log("[BG] Polling content script PING (max 20s)...");for(let _pi=0;_pi<20;_pi++){try{await U.tabs.sendMessage(freshTab.id,{type:"PING"});console.log("[BG] Content script ready after",(_pi+1),"attempt(s)");break;}catch(e){console.log("[BG] PING attempt",(_pi+1),"failed:",e.message);if(_pi<19){await new Promise(rs=>setTimeout(rs,1000));}else{console.warn("[BG] Content script not responding after 20s, proceeding anyway");}}}this.currentTabId=freshTab.id,this.tabOpenedTime=Date.now(),this.processingState.isRunning=!0;console.log("[BG] Tab ready. Checking for stuck 'running' items...");const stuckItems=await H.getAllResponses();const stuckCount=stuckItems.filter(i=>i.status==="running").length;console.log("[BG] Found",stuckCount,"stuck running items, resetting to pending...");for(const si of stuckItems.filter(i=>i.status==="running")){await H.saveResponse({...si,status:"pending"})}const i=await H.getPendingResponses();console.log("[BG] Pending items to process:",i.length);if(i.length===0)throw new Error("No pending items to process");console.log(`Starting processing of ${i.length} items`),await this.broadcastStateUpdate(),await this.processNextItem()}async stopProcessing(){this.processingState.isRunning=!1,this.processingState.currentId=void 0,this.currentTabId=null,console.log("Processing stopped"),this.broadcastStateUpdate()}async processNextItem(){if(!this.processingState.isRunning)return;const r=await H.getPendingResponses();console.log("[BG] processNextItem: pending count =",r.length);if(r.length===0){await this.stopProcessing(),console.log("[BG] All items processed");return}const i=r[0];console.log("[BG] Processing item:",i.id,"| text preview:",i.response&&i.response.substring(0,60));if(this.processingState.currentId=i.id,await H.updateResponseStatus(i.id,"running"),this.broadcastStateUpdate(),this.currentTabId)try{console.log("[BG] Sending PROCESS_ITEM to tab",this.currentTabId,"for item:",i.id,"wordLimit:",this.processingState.wordLimit);await U.tabs.sendMessage(this.currentTabId,{type:"PROCESS_ITEM",payload:{...i,wordLimit:this.processingState.wordLimit||1300}})}catch(o){console.error("Failed to send message to content script:",o);if(o instanceof Error&&o.message.includes("Could not establish connection")){console.log("Content script unavailable, reloading tab...");await H.saveResponse({...i,status:"pending"});try{let rt;if(this.currentTabId){await U.tabs.reload(this.currentTabId);rt=await U.tabs.get(this.currentTabId)}else rt=await U.tabs.create({url:"https://quillbot.com/ai-content-detector?aidr_ext=1"});await new Promise(rs=>{const lsnr=(tid,info)=>{if(tid===rt.id&&info.status==="complete"){U.tabs.onUpdated.removeListener(lsnr);rs()}};U.tabs.onUpdated.addListener(lsnr)});console.log("[BG] Polling PING on recreated tab...");for(let _pi=0;_pi<20;_pi++){try{await U.tabs.sendMessage(rt.id,{type:"PING"});console.log("[BG] Recreated tab CS ready after",(_pi+1),"attempt(s)");break;}catch(e){console.log("[BG] Recreated tab PING",(_pi+1),"failed:",e.message);if(_pi<19){await new Promise(rs=>setTimeout(rs,1000));}else{console.warn("[BG] Recreated tab CS not responding after 20s, proceeding");}}}this.currentTabId=rt.id}catch(e){console.error("Failed to recreate tab:",e)}this.tabOpenedTime=Date.now();setTimeout(()=>{this.processNextItem()},500)}else{await this.handleItemError({id:i.id,error:o instanceof Error?o.message:"Unknown error"})}}}async _openFreshTab(){console.log("[BG] Opening fresh QuillBot tab...");const _t=await U.tabs.create({url:"https://quillbot.com/ai-content-detector?aidr_ext=1"});await new Promise(rs=>{const lsnr=(tid,info)=>{if(tid===_t.id&&info.status==="complete"){U.tabs.onUpdated.removeListener(lsnr);rs()}};U.tabs.onUpdated.addListener(lsnr);});console.log("[BG] Tab load complete, polling PING...");for(let _pi=0;_pi<25;_pi++){try{await U.tabs.sendMessage(_t.id,{type:"PING"});console.log("[BG] CS ready after",(_pi+1),"ping(s)");break;}catch(e){if(_pi<24){await new Promise(rs=>setTimeout(rs,1000));}else{console.warn("[BG] CS not responding after 25s, proceeding");}}}return _t.id;}async handleItemCompleted(r){await H.updateResponseStatus(r.id,"completed",{aiDetectionPercentage:r.aiDetectionPercentage,aiChunks:r.aiChunks||[]}),console.log(`Item ${r.id} completed with ${r.aiDetectionPercentage}% AI detection, ${(r.aiChunks||[]).length} chunks`);if(this.tabOpenedTime&&Date.now()-this.tabOpenedTime>=300000){console.log("[BG] 5 minutes passed, refreshing tab...");// Reset timer immediately so a throw below doesn't cause repeat refresh attempts
this.tabOpenedTime=Date.now();try{const tabId=this.currentTabId;if(tabId){await new Promise((rs,rj)=>{let done=!1;const cleanup=()=>{if(done)return;done=!0;clearTimeout(timer);U.tabs.onUpdated.removeListener(lsnr)};const lsnr=(tid,info)=>{if(tid===tabId&&info.status==="complete"){cleanup();rs()}};const timer=setTimeout(()=>{cleanup();rs()},45000);U.tabs.onUpdated.addListener(lsnr);U.tabs.reload(tabId).catch(e=>{cleanup();rj(e)})});for(let _pi=0;_pi<25;_pi++){try{await U.tabs.sendMessage(tabId,{type:"PING"});break}catch(e){if(_pi<24)await new Promise(rs=>setTimeout(rs,1000));else throw new Error("Content script did not become ready after tab reload")}}this.currentTabId=tabId}else this.currentTabId=await this._openFreshTab();this.tabOpenedTime=Date.now();console.log("[BG] Tab refreshed, id:",this.currentTabId)}catch(e){console.error("[BG] Tab refresh failed, will retry with existing tab or recreate on next send:",e.message);}}setTimeout(()=>{this.processNextItem();},1500);this.broadcastStateUpdate();}async handleItemError(r){const maxRetries=3;if(!this.retryCount)this.retryCount={};const currentRetries=(this.retryCount[r.id]||0)+1;this.retryCount[r.id]=currentRetries;if(currentRetries<maxRetries){console.warn(`Item ${r.id} failed (attempt ${currentRetries}/${maxRetries}), retrying...`);await H.updateResponseStatus(r.id,"pending");setTimeout(()=>{this.processNextItem()},2e3)}else{await H.updateResponseStatus(r.id,"error",{error:r.error});console.error(`Item ${r.id} failed after ${maxRetries} attempts:`,r.error);delete this.retryCount[r.id];setTimeout(()=>{this.processNextItem()},1e3)}this.broadcastStateUpdate()}async broadcastStateUpdate(){const r=await H.getStats();this.processingState.totalItems=r.total;this.processingState.completedItems=r.completed;this.processingState.errorItems=r.error;console.log("[BG] broadcastStateUpdate:",JSON.stringify({isRunning:this.processingState.isRunning,total:r.total,completed:r.completed,error:r.error,pending:r.pending}));U.runtime.sendMessage({type:"STATE_UPDATE",payload:this.processingState}).catch(()=>{});if(this.currentTabId){U.tabs.sendMessage(this.currentTabId,{type:"STATE_UPDATE",payload:this.processingState}).catch(()=>{})}}}const ht=ne(async()=>{await new ut().init()});function gt(){}function fe(n,...r){}const dt={debug:(...n)=>fe(console.debug,...n),log:(...n)=>fe(console.log,...n),warn:(...n)=>fe(console.warn,...n),error:(...n)=>fe(console.error,...n)};let Re;try{Re=ht.main(),Re instanceof Promise&&console.warn("The background's main() function return a promise, but it must be synchronous")}catch(n){throw dt.error("The background crashed on startup!"),n}return Re}();
background;

// Recovery supervisor for MV3 service-worker sleeps/restarts.
// The bundled queue above keeps run state in memory. If Chrome suspends that
// worker between items, this supervisor advances the next pending item after a
// short grace period and uses alarms as the durable backup.
(function aidrRecoverySupervisor() {
  "use strict";
  return;

  const api = (globalThis.browser && globalThis.browser.runtime && globalThis.browser.runtime.id)
    ? globalThis.browser
    : globalThis.chrome;
  if (!api || !api.runtime || !api.tabs || !api.storage) return;

  const DB_NAME = "ai-detector-db";
  const STORE_NAME = "responses";
  const STATE_KEY = "aidrRecoveryState";
  const NEXT_ALARM = "aidrRecoveryNext";
  const WATCHDOG_ALARM = "aidrRecoveryWatchdog";
  const DETECTOR_URL = "https://quillbot.com/ai-content-detector?aidr_ext=1";
  const DETECTOR_TAB_MATCH = "*://quillbot.com/ai-content-detector*";
  const RUNNING_TIMEOUT_MS = 180000;
  const REFRESH_TAB_MS = 300000;

  const storageArea = api.storage.session || api.storage.local;
  let nextTimer = null;

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function openDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, 1);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: "id" });
        }
      };
    });
  }

  async function getAllResponses() {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
      tx.oncomplete = () => db.close();
      tx.onerror = () => {
        db.close();
        reject(tx.error);
      };
    });
  }

  async function saveResponse(item) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      tx.objectStore(STORE_NAME).put(item);
      tx.oncomplete = () => {
        db.close();
        resolve();
      };
      tx.onerror = () => {
        db.close();
        reject(tx.error);
      };
    });
  }

  async function getState() {
    const data = await storageArea.get(STATE_KEY);
    return data[STATE_KEY] || {
      isRunning: false,
      tabId: null,
      tabOpenedAt: null,
      wordLimit: 1300,
      activeItemId: null,
      activeStartedAt: null,
      lastActivityAt: 0
    };
  }

  async function saveState(state) {
    await storageArea.set({ [STATE_KEY]: state });
  }

  async function clearState() {
    await storageArea.remove(STATE_KEY);
  }

  function scheduleNext(ms) {
    if (nextTimer) clearTimeout(nextTimer);
    nextTimer = setTimeout(() => runSupervisor("timer").catch((error) => {
      console.error("[AIDR supervisor] timer failed:", error);
    }), ms);
    if (api.alarms) {
      api.alarms.create(NEXT_ALARM, { when: Date.now() + ms });
    }
  }

  function scheduleWatchdog() {
    if (api.alarms) {
      api.alarms.create(WATCHDOG_ALARM, { periodInMinutes: 1 });
    }
  }

  async function clearSchedules() {
    if (nextTimer) clearTimeout(nextTimer);
    nextTimer = null;
    if (api.alarms) {
      await api.alarms.clear(NEXT_ALARM);
      await api.alarms.clear(WATCHDOG_ALARM);
    }
  }

  async function waitForTabComplete(tabId, timeoutMs) {
    try {
      const tab = await api.tabs.get(tabId);
      if (tab && tab.status === "complete") return;
    } catch {
      return;
    }

    await new Promise((resolve) => {
      let finished = false;
      const done = () => {
        if (finished) return;
        finished = true;
        clearTimeout(timer);
        api.tabs.onUpdated.removeListener(listener);
        resolve();
      };
      const listener = (updatedTabId, info) => {
        if (updatedTabId === tabId && info.status === "complete") done();
      };
      const timer = setTimeout(done, timeoutMs);
      api.tabs.onUpdated.addListener(listener);
    });
  }

  async function pingContentScript(tabId, attempts) {
    for (let i = 0; i < attempts; i += 1) {
      try {
        await api.tabs.sendMessage(tabId, { type: "PING" });
        return true;
      } catch {
        await delay(1000);
      }
    }
    return false;
  }

  async function ensureDetectorTab(state) {
    if (state.forceFreshTab) {
      const existingTabs = await api.tabs.query({ url: DETECTOR_TAB_MATCH });
      for (const tab of existingTabs) {
        if (tab.id) {
          try {
            await api.tabs.remove(tab.id);
          } catch (error) {
            console.warn("[AIDR supervisor] detector tab close failed:", error && error.message ? error.message : error);
          }
        }
      }
      state.tabId = null;
      state.tabOpenedAt = null;
      state.forceFreshTab = false;
      await delay(500);
    }

    const shouldRefresh = state.tabOpenedAt && Date.now() - state.tabOpenedAt >= REFRESH_TAB_MS;
    if (shouldRefresh && state.tabId) {
      try {
        await api.tabs.remove(state.tabId);
      } catch (error) {
        console.warn("[AIDR supervisor] old refresh tab close failed:", error && error.message ? error.message : error);
      }
      state.tabId = null;
      state.tabOpenedAt = null;
    }

    if (state.tabId) {
      try {
        const tab = await api.tabs.get(state.tabId);
        if (tab && tab.url && tab.url.includes("quillbot.com/ai-content-detector")) {
          if (await pingContentScript(state.tabId, 3)) return state.tabId;
        }
      } catch {
        state.tabId = null;
      }
    }

    const tabs = await api.tabs.query({ url: DETECTOR_TAB_MATCH });
    for (const tab of tabs) {
      if (tab.id && await pingContentScript(tab.id, 2)) {
        state.tabId = tab.id;
        state.tabOpenedAt = state.tabOpenedAt || Date.now();
        return tab.id;
      }
    }

    const freshTab = await api.tabs.create({ url: DETECTOR_URL });
    state.tabId = freshTab.id;
    state.tabOpenedAt = Date.now();
    await waitForTabComplete(freshTab.id, 45000);
    if (!await pingContentScript(freshTab.id, 25)) {
      throw new Error("Content script did not become ready in refreshed detector tab");
    }
    return freshTab.id;
  }

  async function broadcastState(state, items) {
    const total = items.length;
    const completed = items.filter((item) => item.status === "completed").length;
    const error = items.filter((item) => item.status === "error").length;
    const payload = {
      isRunning: state.isRunning,
      totalItems: total,
      completedItems: completed,
      errorItems: error,
      currentId: state.activeItemId || undefined,
      tabOpenedTime: state.tabOpenedAt || null,
      wordLimit: state.wordLimit || 1300
    };
    api.runtime.sendMessage({ type: "STATE_UPDATE", payload }).catch(() => {});
    if (state.tabId) {
      api.tabs.sendMessage(state.tabId, { type: "STATE_UPDATE", payload }).catch(() => {});
    }
  }

  async function sendPendingItem(state, pendingItem, allItems) {
    const now = Date.now();
    state.tabId = await ensureDetectorTab(state);
    const runningItem = { ...pendingItem, status: "running", startedAt: now };
    await saveResponse(runningItem);

    state.isRunning = true;
    state.activeItemId = runningItem.id;
    state.activeStartedAt = now;
    state.lastActivityAt = now;
    await saveState(state);
    await broadcastState(state, allItems.map((item) => item.id === runningItem.id ? runningItem : item));

    api.tabs.sendMessage(state.tabId, {
      type: "PROCESS_ITEM",
      payload: { ...runningItem, wordLimit: state.wordLimit || 1300 }
    }).catch(async (error) => {
      console.error("[AIDR supervisor] PROCESS_ITEM send failed:", error);
      await saveResponse({ ...runningItem, status: "pending", startedAt: null });
      const latestState = await getState();
      latestState.tabId = null;
      latestState.activeItemId = null;
      latestState.activeStartedAt = null;
      latestState.lastActivityAt = Date.now();
      await saveState(latestState);
      scheduleNext(5000);
    });
  }

  async function recoverStaleRunning(state, items) {
    const running = items.filter((item) => item.status === "running");
    if (running.length === 0) return false;

    const now = Date.now();
    const stale = running.filter((item) => {
      const startedAt = item.startedAt || (item.id === state.activeItemId ? state.activeStartedAt : null);
      return startedAt ? now - startedAt > RUNNING_TIMEOUT_MS : state.lastActivityAt && now - state.lastActivityAt > RUNNING_TIMEOUT_MS;
    });

    if (stale.length === 0) return true;

    console.warn("[AIDR supervisor] resetting stale running item(s):", stale.map((item) => item.id).join(", "));
    for (const item of stale) {
      await saveResponse({ ...item, status: "pending", startedAt: null });
    }
    state.activeItemId = null;
    state.activeStartedAt = null;
    state.tabId = null;
    state.lastActivityAt = now;
    await saveState(state);
    return false;
  }

  async function runSupervisor(reason) {
    const state = await getState();
    if (!state.isRunning) return;

    const items = await getAllResponses();
    if (items.length === 0) return;

    const hasActiveRunning = await recoverStaleRunning(state, items);
    if (hasActiveRunning) return;

    const refreshedItems = await getAllResponses();
    const pending = refreshedItems.filter((item) => item.status === "pending");
    if (pending.length === 0) {
      const running = refreshedItems.filter((item) => item.status === "running");
      if (running.length === 0) {
        state.isRunning = false;
        state.activeItemId = null;
        state.activeStartedAt = null;
        await saveState(state);
        await clearSchedules();
        await broadcastState(state, refreshedItems);
      }
      return;
    }

    console.log("[AIDR supervisor] advancing queue after", reason, "pending:", pending.length);
    state.forceFreshTab = true;
    await sendPendingItem(state, pending[0], refreshedItems);
    scheduleWatchdog();
  }

  api.runtime.onMessage.addListener((message) => {
    if (!message || !message.type) return false;
    if (message.type === "START_PROCESSING") {
      getState().then(async (state) => {
        state.isRunning = true;
        state.wordLimit = message.payload && message.payload.wordLimit > 0 ? message.payload.wordLimit : state.wordLimit || 1300;
        state.lastActivityAt = Date.now();
        await saveState(state);
        scheduleWatchdog();
        scheduleNext(60000);
      }).catch((error) => console.error("[AIDR supervisor] START observe failed:", error));
    }
    if (message.type === "STOP_PROCESSING") {
      clearState().then(clearSchedules).catch((error) => console.error("[AIDR supervisor] STOP observe failed:", error));
    }
    if (message.type === "ITEM_COMPLETED" || message.type === "ITEM_ERROR") {
      getState().then(async (state) => {
        if (!state.isRunning) return;
        state.activeItemId = null;
        state.activeStartedAt = null;
        state.lastActivityAt = Date.now();
        await saveState(state);
        scheduleNext(60000);
      }).catch((error) => console.error("[AIDR supervisor] item observe failed:", error));
    }
    return false;
  });

  if (api.alarms) {
    api.alarms.onAlarm.addListener((alarm) => {
      if (!alarm || (alarm.name !== NEXT_ALARM && alarm.name !== WATCHDOG_ALARM)) return;
      runSupervisor(alarm.name).catch((error) => console.error("[AIDR supervisor] alarm failed:", error));
    });
  }

  getState().then((state) => {
    if (state.isRunning) {
      scheduleWatchdog();
      scheduleNext(5000);
    }
  }).catch((error) => console.error("[AIDR supervisor] restore failed:", error));
})();
