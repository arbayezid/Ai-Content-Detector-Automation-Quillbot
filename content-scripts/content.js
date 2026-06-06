var content=function(){"use strict";var Tt=Object.defineProperty;var St=(ne,M,re)=>M in ne?Tt(ne,M,{enumerable:!0,configurable:!0,writable:!0,value:re}):ne[M]=re;var Y=(ne,M,re)=>St(ne,typeof M!="symbol"?M+"":M,re);var $e,ke;const M=(ke=($e=globalThis.browser)==null?void 0:$e.runtime)!=null&&ke.id?globalThis.browser:globalThis.chrome;function re(y){return y}function Ye(y){return y&&y.__esModule&&Object.prototype.hasOwnProperty.call(y,"default")?y.default:y}var Ce={exports:{}};/*!
 * Sizzle CSS Selector Engine v2.3.10
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://js.foundation/
 *
 * Date: 2023-02-14
 */var Be;function Xe(){return Be||(Be=1,function(y){(function(a){var c,s,f,N,P,x,D,V,Q,F,R,B,v,$,H,I,X,he,ae,T="sizzle"+1*new Date,_=a.document,j=0,it=0,ze=be(),Fe=be(),He=be(),ge=be(),Ie=function(e,t){return e===t&&(R=!0),0},ot={}.hasOwnProperty,J=[],at=J.pop,ut=J.push,W=J.push,Oe=J.slice,Z=function(e,t){for(var n=0,i=e.length;n<i;n++)if(e[n]===t)return n;return-1},De="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",m="[\\x20\\t\\r\\n\\f]",ee="(?:\\\\[\\da-fA-F]{1,6}"+m+"?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",_e="\\["+m+"*("+ee+")(?:"+m+"*([*^$|!~]?=)"+m+`*(?:'((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)"|(`+ee+"))|)"+m+"*\\]",Ae=":("+ee+`)(?:\\((('((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\\]]|`+_e+")*)|.*)\\)|)",st=new RegExp(m+"+","g"),we=new RegExp("^"+m+"+|((?:^|[^\\\\])(?:\\\\.)*)"+m+"+$","g"),lt=new RegExp("^"+m+"*,"+m+"*"),Ue=new RegExp("^"+m+"*([>+~]|"+m+")"+m+"*"),ct=new RegExp(m+"|>"),dt=new RegExp(Ae),ft=new RegExp("^"+ee+"$"),ye={ID:new RegExp("^#("+ee+")"),CLASS:new RegExp("^\\.("+ee+")"),TAG:new RegExp("^("+ee+"|[*])"),ATTR:new RegExp("^"+_e),PSEUDO:new RegExp("^"+Ae),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+m+"*(even|odd|(([+-]|)(\\d*)n|)"+m+"*(?:([+-]|)"+m+"*(\\d+)|))"+m+"*\\)|)","i"),bool:new RegExp("^(?:"+De+")$","i"),needsContext:new RegExp("^"+m+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+m+"*((?:-\\d)?\\d*)"+m+"*\\)|)(?=[^-]|$)","i")},pt=/HTML$/i,ht=/^(?:input|select|textarea|button)$/i,gt=/^h\d$/i,ue=/^[^{]+\{\s*\[native \w/,wt=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,xe=/[+~]/,G=new RegExp("\\\\[\\da-fA-F]{1,6}"+m+"?|\\\\([^\\r\\n\\f])","g"),K=function(e,t){var n="0x"+e.slice(1)-65536;return t||(n<0?String.fromCharCode(n+65536):String.fromCharCode(n>>10|55296,n&1023|56320))},Ve=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,je=function(e,t){return t?e==="\0"?"�":e.slice(0,-1)+"\\"+e.charCodeAt(e.length-1).toString(16)+" ":"\\"+e},Ge=function(){B()},yt=Ee(function(e){return e.disabled===!0&&e.nodeName.toLowerCase()==="fieldset"},{dir:"parentNode",next:"legend"});try{W.apply(J=Oe.call(_.childNodes),_.childNodes),J[_.childNodes.length].nodeType}catch{W={apply:J.length?function(t,n){ut.apply(t,Oe.call(n))}:function(t,n){for(var i=t.length,r=0;t[i++]=n[r++];);t.length=i-1}}}function E(e,t,n,i){var r,o,u,l,d,h,p,w=t&&t.ownerDocument,b=t?t.nodeType:9;if(n=n||[],typeof e!="string"||!e||b!==1&&b!==9&&b!==11)return n;if(!i&&(B(t),t=t||v,H)){if(b!==11&&(d=wt.exec(e)))if(r=d[1]){if(b===9)if(u=t.getElementById(r)){if(u.id===r)return n.push(u),n}else return n;else if(w&&(u=w.getElementById(r))&&ae(t,u)&&u.id===r)return n.push(u),n}else{if(d[2])return W.apply(n,t.getElementsByTagName(e)),n;if((r=d[3])&&s.getElementsByClassName&&t.getElementsByClassName)return W.apply(n,t.getElementsByClassName(r)),n}if(s.qsa&&!ge[e+" "]&&(!I||!I.test(e))&&(b!==1||t.nodeName.toLowerCase()!=="object")){if(p=e,w=t,b===1&&(ct.test(e)||Ue.test(e))){for(w=xe.test(e)&&Me(t.parentNode)||t,(w!==t||!s.scope)&&((l=t.getAttribute("id"))?l=l.replace(Ve,je):t.setAttribute("id",l=T)),h=x(e),o=h.length;o--;)h[o]=(l?"#"+l:":scope")+" "+ve(h[o]);p=h.join(",")}try{return W.apply(n,w.querySelectorAll(p)),n}catch{ge(e,!0)}finally{l===T&&t.removeAttribute("id")}}}return V(e.replace(we,"$1"),t,n,i)}function be(){var e=[];function t(n,i){return e.push(n+" ")>f.cacheLength&&delete t[e.shift()],t[n+" "]=i}return t}function U(e){return e[T]=!0,e}function O(e){var t=v.createElement("fieldset");try{return!!e(t)}catch{return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function Le(e,t){for(var n=e.split("|"),i=n.length;i--;)f.attrHandle[n[i]]=t}function Ke(e,t){var n=t&&e,i=n&&e.nodeType===1&&t.nodeType===1&&e.sourceIndex-t.sourceIndex;if(i)return i;if(n){for(;n=n.nextSibling;)if(n===t)return-1}return e?1:-1}function bt(e){return function(t){var n=t.nodeName.toLowerCase();return n==="input"&&t.type===e}}function vt(e){return function(t){var n=t.nodeName.toLowerCase();return(n==="input"||n==="button")&&t.type===e}}function Qe(e){return function(t){return"form"in t?t.parentNode&&t.disabled===!1?"label"in t?"label"in t.parentNode?t.parentNode.disabled===e:t.disabled===e:t.isDisabled===e||t.isDisabled!==!e&&yt(t)===e:t.disabled===e:"label"in t?t.disabled===e:!1}}function te(e){return U(function(t){return t=+t,U(function(n,i){for(var r,o=e([],n.length,t),u=o.length;u--;)n[r=o[u]]&&(n[r]=!(i[r]=n[r]))})})}function Me(e){return e&&typeof e.getElementsByTagName<"u"&&e}s=E.support={},P=E.isXML=function(e){var t=e&&e.namespaceURI,n=e&&(e.ownerDocument||e).documentElement;return!pt.test(t||n&&n.nodeName||"HTML")},B=E.setDocument=function(e){var t,n,i=e?e.ownerDocument||e:_;return i==v||i.nodeType!==9||!i.documentElement||(v=i,$=v.documentElement,H=!P(v),_!=v&&(n=v.defaultView)&&n.top!==n&&(n.addEventListener?n.addEventListener("unload",Ge,!1):n.attachEvent&&n.attachEvent("onunload",Ge)),s.scope=O(function(r){return $.appendChild(r).appendChild(v.createElement("div")),typeof r.querySelectorAll<"u"&&!r.querySelectorAll(":scope fieldset div").length}),s.cssHas=O(function(){try{return v.querySelector(":has(*,:jqfake)"),!1}catch{return!0}}),s.attributes=O(function(r){return r.className="i",!r.getAttribute("className")}),s.getElementsByTagName=O(function(r){return r.appendChild(v.createComment("")),!r.getElementsByTagName("*").length}),s.getElementsByClassName=ue.test(v.getElementsByClassName),s.getById=O(function(r){return $.appendChild(r).id=T,!v.getElementsByName||!v.getElementsByName(T).length}),s.getById?(f.filter.ID=function(r){var o=r.replace(G,K);return function(u){return u.getAttribute("id")===o}},f.find.ID=function(r,o){if(typeof o.getElementById<"u"&&H){var u=o.getElementById(r);return u?[u]:[]}}):(f.filter.ID=function(r){var o=r.replace(G,K);return function(u){var l=typeof u.getAttributeNode<"u"&&u.getAttributeNode("id");return l&&l.value===o}},f.find.ID=function(r,o){if(typeof o.getElementById<"u"&&H){var u,l,d,h=o.getElementById(r);if(h){if(u=h.getAttributeNode("id"),u&&u.value===r)return[h];for(d=o.getElementsByName(r),l=0;h=d[l++];)if(u=h.getAttributeNode("id"),u&&u.value===r)return[h]}return[]}}),f.find.TAG=s.getElementsByTagName?function(r,o){if(typeof o.getElementsByTagName<"u")return o.getElementsByTagName(r);if(s.qsa)return o.querySelectorAll(r)}:function(r,o){var u,l=[],d=0,h=o.getElementsByTagName(r);if(r==="*"){for(;u=h[d++];)u.nodeType===1&&l.push(u);return l}return h},f.find.CLASS=s.getElementsByClassName&&function(r,o){if(typeof o.getElementsByClassName<"u"&&H)return o.getElementsByClassName(r)},X=[],I=[],(s.qsa=ue.test(v.querySelectorAll))&&(O(function(r){var o;$.appendChild(r).innerHTML="<a id='"+T+"'></a><select id='"+T+"-\r\\' msallowcapture=''><option selected=''></option></select>",r.querySelectorAll("[msallowcapture^='']").length&&I.push("[*^$]="+m+`*(?:''|"")`),r.querySelectorAll("[selected]").length||I.push("\\["+m+"*(?:value|"+De+")"),r.querySelectorAll("[id~="+T+"-]").length||I.push("~="),o=v.createElement("input"),o.setAttribute("name",""),r.appendChild(o),r.querySelectorAll("[name='']").length||I.push("\\["+m+"*name"+m+"*="+m+`*(?:''|"")`),r.querySelectorAll(":checked").length||I.push(":checked"),r.querySelectorAll("a#"+T+"+*").length||I.push(".#.+[+~]"),r.querySelectorAll("\\\f"),I.push("[\\r\\n\\f]")}),O(function(r){r.innerHTML="<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";var o=v.createElement("input");o.setAttribute("type","hidden"),r.appendChild(o).setAttribute("name","D"),r.querySelectorAll("[name=d]").length&&I.push("name"+m+"*[*^$|!~]?="),r.querySelectorAll(":enabled").length!==2&&I.push(":enabled",":disabled"),$.appendChild(r).disabled=!0,r.querySelectorAll(":disabled").length!==2&&I.push(":enabled",":disabled"),r.querySelectorAll("*,:x"),I.push(",.*:")})),(s.matchesSelector=ue.test(he=$.matches||$.webkitMatchesSelector||$.mozMatchesSelector||$.oMatchesSelector||$.msMatchesSelector))&&O(function(r){s.disconnectedMatch=he.call(r,"*"),he.call(r,"[s!='']:x"),X.push("!=",Ae)}),s.cssHas||I.push(":has"),I=I.length&&new RegExp(I.join("|")),X=X.length&&new RegExp(X.join("|")),t=ue.test($.compareDocumentPosition),ae=t||ue.test($.contains)?function(r,o){var u=r.nodeType===9&&r.documentElement||r,l=o&&o.parentNode;return r===l||!!(l&&l.nodeType===1&&(u.contains?u.contains(l):r.compareDocumentPosition&&r.compareDocumentPosition(l)&16))}:function(r,o){if(o){for(;o=o.parentNode;)if(o===r)return!0}return!1},Ie=t?function(r,o){if(r===o)return R=!0,0;var u=!r.compareDocumentPosition-!o.compareDocumentPosition;return u||(u=(r.ownerDocument||r)==(o.ownerDocument||o)?r.compareDocumentPosition(o):1,u&1||!s.sortDetached&&o.compareDocumentPosition(r)===u?r==v||r.ownerDocument==_&&ae(_,r)?-1:o==v||o.ownerDocument==_&&ae(_,o)?1:F?Z(F,r)-Z(F,o):0:u&4?-1:1)}:function(r,o){if(r===o)return R=!0,0;var u,l=0,d=r.parentNode,h=o.parentNode,p=[r],w=[o];if(!d||!h)return r==v?-1:o==v?1:d?-1:h?1:F?Z(F,r)-Z(F,o):0;if(d===h)return Ke(r,o);for(u=r;u=u.parentNode;)p.unshift(u);for(u=o;u=u.parentNode;)w.unshift(u);for(;p[l]===w[l];)l++;return l?Ke(p[l],w[l]):p[l]==_?-1:w[l]==_?1:0}),v},E.matches=function(e,t){return E(e,null,null,t)},E.matchesSelector=function(e,t){if(B(e),s.matchesSelector&&H&&!ge[t+" "]&&(!X||!X.test(t))&&(!I||!I.test(t)))try{var n=he.call(e,t);if(n||s.disconnectedMatch||e.document&&e.document.nodeType!==11)return n}catch{ge(t,!0)}return E(t,v,null,[e]).length>0},E.contains=function(e,t){return(e.ownerDocument||e)!=v&&B(e),ae(e,t)},E.attr=function(e,t){(e.ownerDocument||e)!=v&&B(e);var n=f.attrHandle[t.toLowerCase()],i=n&&ot.call(f.attrHandle,t.toLowerCase())?n(e,t,!H):void 0;return i!==void 0?i:s.attributes||!H?e.getAttribute(t):(i=e.getAttributeNode(t))&&i.specified?i.value:null},E.escape=function(e){return(e+"").replace(Ve,je)},E.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},E.uniqueSort=function(e){var t,n=[],i=0,r=0;if(R=!s.detectDuplicates,F=!s.sortStable&&e.slice(0),e.sort(Ie),R){for(;t=e[r++];)t===e[r]&&(i=n.push(r));for(;i--;)e.splice(n[i],1)}return F=null,e},N=E.getText=function(e){var t,n="",i=0,r=e.nodeType;if(r){if(r===1||r===9||r===11){if(typeof e.textContent=="string")return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=N(e)}else if(r===3||r===4)return e.nodeValue}else for(;t=e[i++];)n+=N(t);return n},f=E.selectors={cacheLength:50,createPseudo:U,match:ye,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(G,K),e[3]=(e[3]||e[4]||e[5]||"").replace(G,K),e[2]==="~="&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),e[1].slice(0,3)==="nth"?(e[3]||E.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*(e[3]==="even"||e[3]==="odd")),e[5]=+(e[7]+e[8]||e[3]==="odd")):e[3]&&E.error(e[0]),e},PSEUDO:function(e){var t,n=!e[6]&&e[2];return ye.CHILD.test(e[0])?null:(e[3]?e[2]=e[4]||e[5]||"":n&&dt.test(n)&&(t=x(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(G,K).toLowerCase();return e==="*"?function(){return!0}:function(n){return n.nodeName&&n.nodeName.toLowerCase()===t}},CLASS:function(e){var t=ze[e+" "];return t||(t=new RegExp("(^|"+m+")"+e+"("+m+"|$)"))&&ze(e,function(n){return t.test(typeof n.className=="string"&&n.className||typeof n.getAttribute<"u"&&n.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(i){var r=E.attr(i,e);return r==null?t==="!=":t?(r+="",t==="="?r===n:t==="!="?r!==n:t==="^="?n&&r.indexOf(n)===0:t==="*="?n&&r.indexOf(n)>-1:t==="$="?n&&r.slice(-n.length)===n:t==="~="?(" "+r.replace(st," ")+" ").indexOf(n)>-1:t==="|="?r===n||r.slice(0,n.length+1)===n+"-":!1):!0}},CHILD:function(e,t,n,i,r){var o=e.slice(0,3)!=="nth",u=e.slice(-4)!=="last",l=t==="of-type";return i===1&&r===0?function(d){return!!d.parentNode}:function(d,h,p){var w,b,C,g,A,L,k=o!==u?"nextSibling":"previousSibling",S=d.parentNode,se=l&&d.nodeName.toLowerCase(),le=!p&&!l,z=!1;if(S){if(o){for(;k;){for(g=d;g=g[k];)if(l?g.nodeName.toLowerCase()===se:g.nodeType===1)return!1;L=k=e==="only"&&!L&&"nextSibling"}return!0}if(L=[u?S.firstChild:S.lastChild],u&&le){for(g=S,C=g[T]||(g[T]={}),b=C[g.uniqueID]||(C[g.uniqueID]={}),w=b[e]||[],A=w[0]===j&&w[1],z=A&&w[2],g=A&&S.childNodes[A];g=++A&&g&&g[k]||(z=A=0)||L.pop();)if(g.nodeType===1&&++z&&g===d){b[e]=[j,A,z];break}}else if(le&&(g=d,C=g[T]||(g[T]={}),b=C[g.uniqueID]||(C[g.uniqueID]={}),w=b[e]||[],A=w[0]===j&&w[1],z=A),z===!1)for(;(g=++A&&g&&g[k]||(z=A=0)||L.pop())&&!((l?g.nodeName.toLowerCase()===se:g.nodeType===1)&&++z&&(le&&(C=g[T]||(g[T]={}),b=C[g.uniqueID]||(C[g.uniqueID]={}),b[e]=[j,z]),g===d)););return z-=r,z===i||z%i===0&&z/i>=0}}},PSEUDO:function(e,t){var n,i=f.pseudos[e]||f.setFilters[e.toLowerCase()]||E.error("unsupported pseudo: "+e);return i[T]?i(t):i.length>1?(n=[e,e,"",t],f.setFilters.hasOwnProperty(e.toLowerCase())?U(function(r,o){for(var u,l=i(r,t),d=l.length;d--;)u=Z(r,l[d]),r[u]=!(o[u]=l[d])}):function(r){return i(r,0,n)}):i}},pseudos:{not:U(function(e){var t=[],n=[],i=D(e.replace(we,"$1"));return i[T]?U(function(r,o,u,l){for(var d,h=i(r,null,l,[]),p=r.length;p--;)(d=h[p])&&(r[p]=!(o[p]=d))}):function(r,o,u){return t[0]=r,i(t,null,u,n),t[0]=null,!n.pop()}}),has:U(function(e){return function(t){return E(e,t).length>0}}),contains:U(function(e){return e=e.replace(G,K),function(t){return(t.textContent||N(t)).indexOf(e)>-1}}),lang:U(function(e){return ft.test(e||"")||E.error("unsupported lang: "+e),e=e.replace(G,K).toLowerCase(),function(t){var n;do if(n=H?t.lang:t.getAttribute("xml:lang")||t.getAttribute("lang"))return n=n.toLowerCase(),n===e||n.indexOf(e+"-")===0;while((t=t.parentNode)&&t.nodeType===1);return!1}}),target:function(e){var t=a.location&&a.location.hash;return t&&t.slice(1)===e.id},root:function(e){return e===$},focus:function(e){return e===v.activeElement&&(!v.hasFocus||v.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:Qe(!1),disabled:Qe(!0),checked:function(e){var t=e.nodeName.toLowerCase();return t==="input"&&!!e.checked||t==="option"&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeType<6)return!1;return!0},parent:function(e){return!f.pseudos.empty(e)},header:function(e){return gt.test(e.nodeName)},input:function(e){return ht.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return t==="input"&&e.type==="button"||t==="button"},text:function(e){var t;return e.nodeName.toLowerCase()==="input"&&e.type==="text"&&((t=e.getAttribute("type"))==null||t.toLowerCase()==="text")},first:te(function(){return[0]}),last:te(function(e,t){return[t-1]}),eq:te(function(e,t,n){return[n<0?n+t:n]}),even:te(function(e,t){for(var n=0;n<t;n+=2)e.push(n);return e}),odd:te(function(e,t){for(var n=1;n<t;n+=2)e.push(n);return e}),lt:te(function(e,t,n){for(var i=n<0?n+t:n>t?t:n;--i>=0;)e.push(i);return e}),gt:te(function(e,t,n){for(var i=n<0?n+t:n;++i<t;)e.push(i);return e})}},f.pseudos.nth=f.pseudos.eq;for(c in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})f.pseudos[c]=bt(c);for(c in{submit:!0,reset:!0})f.pseudos[c]=vt(c);function We(){}We.prototype=f.filters=f.pseudos,f.setFilters=new We,x=E.tokenize=function(e,t){var n,i,r,o,u,l,d,h=Fe[e+" "];if(h)return t?0:h.slice(0);for(u=e,l=[],d=f.preFilter;u;){(!n||(i=lt.exec(u)))&&(i&&(u=u.slice(i[0].length)||u),l.push(r=[])),n=!1,(i=Ue.exec(u))&&(n=i.shift(),r.push({value:n,type:i[0].replace(we," ")}),u=u.slice(n.length));for(o in f.filter)(i=ye[o].exec(u))&&(!d[o]||(i=d[o](i)))&&(n=i.shift(),r.push({value:n,type:o,matches:i}),u=u.slice(n.length));if(!n)break}return t?u.length:u?E.error(e):Fe(e,l).slice(0)};function ve(e){for(var t=0,n=e.length,i="";t<n;t++)i+=e[t].value;return i}function Ee(e,t,n){var i=t.dir,r=t.next,o=r||i,u=n&&o==="parentNode",l=it++;return t.first?function(d,h,p){for(;d=d[i];)if(d.nodeType===1||u)return e(d,h,p);return!1}:function(d,h,p){var w,b,C,g=[j,l];if(p){for(;d=d[i];)if((d.nodeType===1||u)&&e(d,h,p))return!0}else for(;d=d[i];)if(d.nodeType===1||u)if(C=d[T]||(d[T]={}),b=C[d.uniqueID]||(C[d.uniqueID]={}),r&&r===d.nodeName.toLowerCase())d=d[i]||d;else{if((w=b[o])&&w[0]===j&&w[1]===l)return g[2]=w[2];if(b[o]=g,g[2]=e(d,h,p))return!0}return!1}}function qe(e){return e.length>1?function(t,n,i){for(var r=e.length;r--;)if(!e[r](t,n,i))return!1;return!0}:e[0]}function Et(e,t,n){for(var i=0,r=t.length;i<r;i++)E(e,t[i],n);return n}function me(e,t,n,i,r){for(var o,u=[],l=0,d=e.length,h=t!=null;l<d;l++)(o=e[l])&&(!n||n(o,i,r))&&(u.push(o),h&&t.push(l));return u}function Pe(e,t,n,i,r,o){return i&&!i[T]&&(i=Pe(i)),r&&!r[T]&&(r=Pe(r,o)),U(function(u,l,d,h){var p,w,b,C=[],g=[],A=l.length,L=u||Et(t||"*",d.nodeType?[d]:d,[]),k=e&&(u||!t)?me(L,C,e,d,h):L,S=n?r||(u?e:A||i)?[]:l:k;if(n&&n(k,S,d,h),i)for(p=me(S,g),i(p,[],d,h),w=p.length;w--;)(b=p[w])&&(S[g[w]]=!(k[g[w]]=b));if(u){if(r||e){if(r){for(p=[],w=S.length;w--;)(b=S[w])&&p.push(k[w]=b);r(null,S=[],p,h)}for(w=S.length;w--;)(b=S[w])&&(p=r?Z(u,b):C[w])>-1&&(u[p]=!(l[p]=b))}}else S=me(S===l?S.splice(A,S.length):S),r?r(null,l,S,h):W.apply(l,S)})}function Re(e){for(var t,n,i,r=e.length,o=f.relative[e[0].type],u=o||f.relative[" "],l=o?1:0,d=Ee(function(w){return w===t},u,!0),h=Ee(function(w){return Z(t,w)>-1},u,!0),p=[function(w,b,C){var g=!o&&(C||b!==Q)||((t=b).nodeType?d(w,b,C):h(w,b,C));return t=null,g}];l<r;l++)if(n=f.relative[e[l].type])p=[Ee(qe(p),n)];else{if(n=f.filter[e[l].type].apply(null,e[l].matches),n[T]){for(i=++l;i<r&&!f.relative[e[i].type];i++);return Pe(l>1&&qe(p),l>1&&ve(e.slice(0,l-1).concat({value:e[l-2].type===" "?"*":""})).replace(we,"$1"),n,l<i&&Re(e.slice(l,i)),i<r&&Re(e=e.slice(i)),i<r&&ve(e))}p.push(n)}return qe(p)}function mt(e,t){var n=t.length>0,i=e.length>0,r=function(o,u,l,d,h){var p,w,b,C=0,g="0",A=o&&[],L=[],k=Q,S=o||i&&f.find.TAG("*",h),se=j+=k==null?1:Math.random()||.1,le=S.length;for(h&&(Q=u==v||u||h);g!==le&&(p=S[g])!=null;g++){if(i&&p){for(w=0,!u&&p.ownerDocument!=v&&(B(p),l=!H);b=e[w++];)if(b(p,u||v,l)){d.push(p);break}h&&(j=se)}n&&((p=!b&&p)&&C--,o&&A.push(p))}if(C+=g,n&&g!==C){for(w=0;b=t[w++];)b(A,L,u,l);if(o){if(C>0)for(;g--;)A[g]||L[g]||(L[g]=at.call(d));L=me(L)}W.apply(d,L),h&&!o&&L.length>0&&C+t.length>1&&E.uniqueSort(d)}return h&&(j=se,Q=k),A};return n?U(r):r}D=E.compile=function(e,t){var n,i=[],r=[],o=He[e+" "];if(!o){for(t||(t=x(e)),n=t.length;n--;)o=Re(t[n]),o[T]?i.push(o):r.push(o);o=He(e,mt(r,i)),o.selector=e}return o},V=E.select=function(e,t,n,i){var r,o,u,l,d,h=typeof e=="function"&&e,p=!i&&x(e=h.selector||e);if(n=n||[],p.length===1){if(o=p[0]=p[0].slice(0),o.length>2&&(u=o[0]).type==="ID"&&t.nodeType===9&&H&&f.relative[o[1].type]){if(t=(f.find.ID(u.matches[0].replace(G,K),t)||[])[0],t)h&&(t=t.parentNode);else return n;e=e.slice(o.shift().value.length)}for(r=ye.needsContext.test(e)?0:o.length;r--&&(u=o[r],!f.relative[l=u.type]);)if((d=f.find[l])&&(i=d(u.matches[0].replace(G,K),xe.test(o[0].type)&&Me(t.parentNode)||t))){if(o.splice(r,1),e=i.length&&ve(o),!e)return W.apply(n,i),n;break}}return(h||D(e,p))(i,t,!H,n,!t||xe.test(e)&&Me(t.parentNode)||t),n},s.sortStable=T.split("").sort(Ie).join("")===T,s.detectDuplicates=!!R,B(),s.sortDetached=O(function(e){return e.compareDocumentPosition(v.createElement("fieldset"))&1}),O(function(e){return e.innerHTML="<a href='#'></a>",e.firstChild.getAttribute("href")==="#"})||Le("type|href|height|width",function(e,t,n){if(!n)return e.getAttribute(t,t.toLowerCase()==="type"?1:2)}),(!s.attributes||!O(function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),e.firstChild.getAttribute("value")===""}))&&Le("value",function(e,t,n){if(!n&&e.nodeName.toLowerCase()==="input")return e.defaultValue}),O(function(e){return e.getAttribute("disabled")==null})||Le(De,function(e,t,n){var i;if(!n)return e[t]===!0?t.toLowerCase():(i=e.getAttributeNode(t))&&i.specified?i.value:null});var Ct=a.Sizzle;E.noConflict=function(){return a.Sizzle===E&&(a.Sizzle=Ct),E},y.exports?y.exports=E:a.Sizzle=E})(window)}(Ce)),Ce.exports}var Je=Xe();const ce=Ye(Je),ie={inputArea:['div[data-testid="aidr-input-editor"]','div[id="aidr-input-editor"]','div[role="textbox"][contenteditable="true"][id="aidr-input-editor"]','div[role="textbox"][contenteditable="true"][aria-label*="analyze text"]','div[role="textbox"][contenteditable="true"][placeholder*="analyze text"]'],detectButton:['button[data-testid="aidr-primary-cta"]','button:contains("Detect AI")','span[aria-label*="Detect AI"] button','button:contains("Detect")'],statsPercentage:['[data-testid="aidr-ai-score-percentage"] > div','[data-testid="aidr-ai-score-percentage"]','div:has(+sup:contains("%"))',"div:has(+sup)"],clearButton:['span[aria-label*="Delete all text"] button[type="button"]','button[type="button"]:has( svg[aria-hidden="true"][type="delete"])']};ce.selectors.pseudos.containsInnerText=ce.selectors.createPseudo(y=>a=>("innerText"in a?a.innerText:"").indexOf(y)>-1),window.Sizzle=ce;class q{static findElement(a,c=document){for(const s of a)try{const f=ce(s,c);if(f.length>0)return f[0]}catch(f){console.warn(`Selector failed: ${s}`,f);continue}return null}static async waitForElement(a,c=1e4,s=100,f=document){const N=Date.now();return new Promise((P,x)=>{const D=()=>{const V=this.findElement(a,f);if(V){P(V);return}if(Date.now()-N>=c){x(new Error(`Element not found within ${c}ms. Selectors: ${a.join(", ")}`));return}setTimeout(D,s)};D()})}static async waitForElementVisible(a,c=1e4,s=document){const f=await this.waitForElement(a,c,100,s);if(!f)return null;const N=Date.now();return new Promise((P,x)=>{const D=()=>{const V=f.getBoundingClientRect(),Q=V.width>0&&V.height>0,F=!f.hasAttribute("disabled");if(Q&&F){P(f);return}if(Date.now()-N>=c){x(new Error(`Element not visible within ${c}ms. Selectors: ${a.join(", ")}`));return}setTimeout(D,100)};D()})}static async clickElement(a){if(a instanceof HTMLElement){a.scrollIntoView({behavior:"smooth",block:"center"}),await this.delay(200);try{a.click()}catch{const s=new MouseEvent("click",{bubbles:!0,cancelable:!0,view:window});a.dispatchEvent(s)}}}static async clearContentEditableElement(a){if(a instanceof HTMLElement){a.focus(),await this.delay(100);try{document.execCommand&&(document.execCommand("selectAll"),document.execCommand("delete"))}catch{console.warn("execCommand failed, trying alternative")}try{const s=window.getSelection();if(s){const f=document.createRange();f.selectNodeContents(a),s.removeAllRanges(),s.addRange(f);const N=new KeyboardEvent("keydown",{key:"Delete",code:"Delete",bubbles:!0,cancelable:!0});a.dispatchEvent(N)}}catch{console.warn("Selection API failed")}a.innerHTML="",a.textContent="";const c=[new Event("input",{bubbles:!0,cancelable:!0}),new Event("change",{bubbles:!0,cancelable:!0}),new KeyboardEvent("keyup",{bubbles:!0,cancelable:!0})];for(const s of c)a.dispatchEvent(s);await this.delay(200)}}static async simulateTyping(a,c,s={}){const{delay:f=10,realistic:N=!1}=s;if(!(a instanceof HTMLElement))throw new Error("Element is not an HTMLElement");a.focus(),a.click(),await this.clearContentEditableElement(a);
// Use ClipboardEvent paste — triggers Quill's native paste handler and updates React state/word count
a.focus();
console.log("[CONTENT] Attempting clipboard paste, text length:", c.length);
try {
  const _dt = new DataTransfer();
  _dt.setData('text/plain', c);
  // Convert \n\n → <p> blocks and \n → <br> so Quill respects paragraph structure
  const _html = '<p>' + c.split('\n\n').map(para => para.replace(/\n/g, '<br>')).join('</p><p>') + '</p>';
  _dt.setData('text/html', _html);
  const _pasteEvt = new ClipboardEvent('paste', { bubbles: true, cancelable: true, clipboardData: _dt });
  a.dispatchEvent(_pasteEvt);
  console.log("[CONTENT] ClipboardEvent paste dispatched");
  await this.delay(600);
  const _inserted = a.textContent || '';
  if (_inserted.trim().length > 0) {
    console.log("[CONTENT] Clipboard paste succeeded, text length:", _inserted.length);
  } else {
    console.warn("[CONTENT] Clipboard paste produced no text, trying execCommand fallback");
    const _s=window.getSelection();if(_s){const _r=document.createRange();try{_r.setStart(a,0);_r.collapse(!0);_s.removeAllRanges();_s.addRange(_r);}catch(_e){console.warn("[CONTENT] cursor err:",_e)}}
    if(document.execCommand&&document.execCommand("insertText",!1,c)){console.log("[CONTENT] execCommand fallback succeeded")}else{a.textContent=c;[new InputEvent("input",{bubbles:!0,cancelable:!0,inputType:"insertText",data:c}),new Event("input",{bubbles:!0,cancelable:!0})].forEach(_ev=>{a.dispatchEvent(_ev)});}
  }
} catch(_pasteErr) {
  console.warn("[CONTENT] ClipboardEvent paste threw:", _pasteErr);
  a.textContent = c;
  a.dispatchEvent(new InputEvent("input",{bubbles:!0,cancelable:!0,inputType:"insertText",data:c}));
}
const P=[new InputEvent("input",{bubbles:!0,cancelable:!0,inputType:"insertText",data:c}),new Event("input",{bubbles:!0,cancelable:!0}),new Event("change",{bubbles:!0,cancelable:!0})];for(const x of P)a.dispatchEvent(x),await this.delay(50)}static async setTextContent(a,c){if(!c||c.trim()===""){await this.clearContentEditableElement(a);return}await this.simulateTyping(a,c,{delay:5,realistic:!1})}static extractPercentage(a){const c=a.match(/(\d+(?:\.\d+)?)\s*%/);if(c)return parseFloat(c[1]);const s=a.match(/(\d+(?:\.\d+)?)/);if(s){const f=parseFloat(s[1]);if(f>=0&&f<=100)return f}return null}static delay(a){return new Promise(c=>setTimeout(c,a))}static isQuillBotDetectorPage(){return window.location.href.includes("quillbot.com/ai-content-detector")}}class Ze{constructor(){Y(this,"isProcessing",!1)}async init(){q.isQuillBotDetectorPage()&&(console.log("QuillBot AI Detector content script loaded"),M.runtime.onMessage.addListener((a,c,s)=>(this.handleMessage(a,c,s),!0)))}async handleMessage(a,c,s){var f;try{switch(a.type){case"PROCESS_ITEM":await this.processItem(a.payload),s({success:!0});break;default:s({success:!1,error:"Unknown message type"})}}catch(N){console.error("Error handling message:",N);const P=N instanceof Error?N.message:"Unknown error";s({success:!1,error:P}),M.runtime.sendMessage({type:"ITEM_ERROR",payload:{id:((f=a.payload)==null?void 0:f.id)||"unknown",error:P}})}}async processItem(a){if(this.isProcessing)throw new Error("Already processing an item");this.isProcessing=!0;const _wl=a.wordLimit||1300;let _text=a.response||"";
// Runtime JSON fallback: if stored text is still raw JSON, parse it now
{const _trimmed=_text.trim();if(_trimmed.startsWith('{')||_trimmed.startsWith('[')){console.log("[CONTENT] Text looks like JSON, attempting runtime parse...");try{// Sanitize literal newlines inside JSON string values before parsing
const _sanitized=_trimmed.replace(/"((?:[^"\\]|\\.)*)"/g,(m)=>m.replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/\t/g,"\\t"));const _data=JSON.parse(_sanitized);const _parts=[];const _extract=(_node)=>{if(_node===null||_node===undefined)return;if(typeof _node==="string"){const _c=_node.replace(/<br\s*\/?>/gi,"\n").replace(/<\/p>/gi,"\n").replace(/<\/div>/gi,"\n").replace(/<\/h[1-6]>/gi,"\n").replace(/<[^>]+>/g,"").replace(/[ \t]+/g," ").trim();if(_c.length>=4&&!(/^[a-z0-9][a-z0-9-]*[a-z0-9]$/.test(_c)&&_c.includes("-"))&&!/^\s*[\{\[]\s*[\}\]]\s*$/.test(_c))_parts.push(_c);}else if(Array.isArray(_node)){for(const _i of _node)_extract(_i);}else if(typeof _node==="object"){for(const _k of Object.keys(_node))_extract(_node[_k]);}};_extract(_data);if(_parts.length>0){_text=_parts.join("\n\n");console.log(`[CONTENT] Runtime JSON parse produced ${_parts.length} parts, ${_text.length} chars`);}else{console.warn("[CONTENT] Runtime JSON parse extracted 0 parts, using raw text");}}catch(_e){console.warn("[CONTENT] Runtime JSON parse failed:",_e.message);}}}
{// Truncate to word limit while preserving newlines and paragraph structure
const _src=_text;const _allWords=[..._src.matchAll(/\S+/g)];if(_allWords.length>_wl){const _lastMatch=_allWords[_wl-1];_text=_src.slice(0,_lastMatch.index+_lastMatch[0].length);}console.log(`[CONTENT] Processing item ${a.id} | words: ${_allWords.length} → capped at ${_wl} = ${Math.min(_allWords.length,_wl)} words`);};try{await this.clearInput(),await this.inputText(_text),await this.clickDetectButton();const c=await this.extractDetectionPercentage();const _chunks=await this.extractAiChunks();console.log(`[CONTENT] Extracted ${_chunks.length} AI chunks`);await this.clearInput(),M.runtime.sendMessage({type:"ITEM_COMPLETED",payload:{id:a.id,aiDetectionPercentage:c,aiChunks:_chunks}}),console.log(`Item ${a.id} completed with ${c}% AI detection`)}catch(_err){if(_err&&_err.message==="NOT_ENOUGH_TEXT"){console.warn(`[CONTENT] Item ${a.id}: not enough text, marking completed with 0%`);try{await this.clearInput();}catch{}M.runtime.sendMessage({type:"ITEM_COMPLETED",payload:{id:a.id,aiDetectionPercentage:0,aiChunks:[]}});}else{throw _err;}}finally{this.isProcessing=!1}}async clearInput(){console.log("Clearing input...");try{const c=q.findElement(ie.clearButton);if(c){await q.clickElement(c),await q.delay(800);const modal=q.findElement(['div[role="dialog"]','div[class*="modal"]','div[class*="Modal"]']);if(modal){console.log("[CONTENT] Confirmation modal detected, clicking Continue...");const continueBtn=q.findElement(['button:contains("Continue")','div[role="dialog"] button:last-of-type','div[class*="modal"] button:last-of-type'],modal)||q.findElement(['button:contains("Continue")']);if(continueBtn){await q.clickElement(continueBtn),await q.delay(500),console.log("[CONTENT] Modal dismissed")}else{console.warn("[CONTENT] Could not find Continue button in modal")}}console.log("Input cleared using clear button");return}}catch(e){console.warn("Clear button not found, trying manual clear",e)}const a=await q.waitForElementVisible(ie.inputArea,5e3);if(!a)throw new Error("Input area not found");await q.clearContentEditableElement(a),console.log("Input cleared manually"),await q.delay(500)}async inputText(a){console.log("Inputting text...",a.substring(0,50)+"...");const c=await q.waitForElementVisible(ie.inputArea,5e3);if(!c)throw new Error("Input area not found");await q.simulateTyping(c,a,{delay:0,realistic:!1}),console.log("Text input completed, waiting for processing..."),await q.delay(1500);const s=c.textContent||(c instanceof HTMLElement?c.innerText:"")||"";if(s.trim().length===0)throw console.error("Text insertion failed - no content detected"),new Error("Text insertion failed - content not detected in editor");console.log(`Text verification successful: ${s.length} characters detected`)}async clickDetectButton(){console.log("[CONTENT] Looking for Detect AI button...");const a=await q.waitForElementVisible(ie.detectButton,1e4);if(!a){const found=q.findElement(ie.detectButton);console.error("[CONTENT] Detect button not found. Found (disabled?):",found,found&&found.hasAttribute("disabled"));throw new Error("Detect button not found or still disabled after 10s")}console.log("[CONTENT] Detect button found:",a.getAttribute("data-testid")||a.className.substring(0,40));await q.clickElement(a),console.log("[CONTENT] Detect AI button clicked")}async extractDetectionPercentage(){console.log("Extracting detection percentage...");const a=await q.waitForElementVisible(ie.statsPercentage,2e4);if(!a)throw new Error("Stats percentage element not found");// Poll until we get a valid number (element shows "--" while processing)
for(let _attempt=0;_attempt<60;_attempt++){// Check for "not enough text" alert first
if(document.querySelector('[data-testid="alert-min-input"]')){console.warn("[CONTENT] QuillBot: not enough text to analyze — skipping item");throw new Error("NOT_ENOUGH_TEXT");}const _liveEl=q.findElement(ie.statsPercentage);const _txt=_liveEl&&document.contains(_liveEl)?_liveEl.textContent||"":a&&document.contains(a)?a.textContent||"":"";const _pct=q.extractPercentage(_txt);if(_pct!==null){console.log(`Extracted percentage: ${_pct}% (after ${_attempt+1} polls)`);return _pct;}if(_attempt%10===0)console.log(`[CONTENT] Waiting for percentage... currently "${_txt}" (poll ${_attempt+1}/60)`);await q.delay(1000);}const _lastEl=q.findElement(ie.statsPercentage);const c=_lastEl&&document.contains(_lastEl)?_lastEl.textContent||"":a&&document.contains(a)?a.textContent||"":"";throw new Error(`Could not extract percentage after 60s, last text: "${c}"`)}
async extractAiChunks(){
console.log("[CONTENT] extractAiChunks: starting...");
// Diagnostic: check for iframes that might contain the results
const _iframes=document.querySelectorAll('iframe');
console.log("[CONTENT] Found",_iframes.length,"iframes on page");
for(const _ifr of _iframes){
  try{
    const _iDoc=_ifr.contentDocument||_ifr.contentWindow.document;
    const _iCards=_iDoc.querySelectorAll('[data-testid*="contributor"]');
    console.log("[CONTENT] iframe",_ifr.src||_ifr.id,": contributor elements=",_iCards.length);
  }catch(e){console.log("[CONTENT] iframe cross-origin, cannot access:",_ifr.src);}
}
// Step 1: scroll page down to ensure results section is rendered
window.scrollTo({top:document.body.scrollHeight,behavior:"instant"});
await q.delay(800);
// Step 2: broad search — find any element with "contributor" or "card" in data-testid
let cards=[];
for(let _i=0;_i<15;_i++){
  // Try exact match first
  cards=Array.from(document.querySelectorAll('[data-testid="main-ai-contributor-card"]'));
  if(cards.length===0){
    // Try partial match
    cards=Array.from(document.querySelectorAll('[data-testid*="contributor-card"]'));
  }
  if(cards.length===0){
    // Try even broader — any element with "contributor" in testid
    const _contribs=Array.from(document.querySelectorAll('[data-testid*="contributor"]'));
    if(_contribs.length>0){
      console.log("[CONTENT] Poll",_i+1,"/15: no card match but found contributor elements:", _contribs.map(el=>el.getAttribute('data-testid')).join(', '));
    }
  }
  if(cards.length>0){console.log("[CONTENT] Poll",_i+1,"/15: found",cards.length,"cards!");break;}
  if(_i===0){
    console.log("[CONTENT] Poll 1: dumping DOM structure around results...");
    // Find percentage element (we know it exists since we just extracted it) and look at siblings
    const _pctEl=document.querySelector('[data-testid="aidr-ai-score-percentage"]');
    if(_pctEl){
      let _parent=_pctEl.parentElement;
      for(let _p=0;_p<5&&_parent;_p++){_parent=_parent.parentElement;}
      if(_parent){
        const _testIds=Array.from(_parent.querySelectorAll('[data-testid]')).map(el=>el.getAttribute('data-testid'));
        console.log("[CONTENT] Ancestor (5 levels up from pct) testids:",_testIds.join(', '));
      }
    }
  }
  if(_i===7){
    // After 8 attempts: dump ALL data-testid values in full page
    const _allTestIds=Array.from(document.querySelectorAll('[data-testid]')).map(el=>el.getAttribute('data-testid')).filter((v,i,a)=>a.indexOf(v)===i);
    console.log("[CONTENT] ALL data-testid values in page (",_allTestIds.length,"):", _allTestIds.join(', '));
  }
  await q.delay(1000);
}
if(cards.length===0){
  console.warn("[CONTENT] No AI contributor cards found after 15s");
  // Final dump of full page structure
  const _allTestIds=Array.from(document.querySelectorAll('[data-testid]')).map(el=>el.getAttribute('data-testid')).filter((v,i,a)=>a.indexOf(v)===i);
  console.log("[CONTENT] FINAL: All data-testid values (",_allTestIds.length,"):", _allTestIds.join(', '));
  // Also try finding by text content patterns like "High" or "Low" confidence
  const _allSpans=Array.from(document.querySelectorAll('span,p,div')).filter(el=>{const t=el.textContent.trim();return t==='High'||t==='Low'||t==='Moderate';});
  console.log("[CONTENT] Elements with confidence text (High/Low/Moderate):",_allSpans.length);
  _allSpans.forEach(el=>console.log("[CONTENT]  -",el.tagName,el.className.substring(0,60),el.parentElement?.getAttribute('data-testid')||'no-testid'));
  return[];
}
const chunks=[];
for(const card of cards){
  const textEl=card.querySelector('[data-testid="main-ai-contributor-text-preview"] p')||card.querySelector('[data-testid*="text-preview"] p')||card.querySelector('p');
  const confEl=card.querySelector('[data-testid="main-ai-contributor-confidence-label"]')||card.querySelector('[data-testid*="confidence"]')||card.querySelector('span');
  const text=(textEl?textEl.textContent:"").trim();
  const confidence=(confEl?confEl.textContent:"").trim();
  console.log("[CONTENT] Card: confidence=",confidence,"| text preview=",text.substring(0,60));
  if(text)chunks.push({text,confidence});
}
console.log("[CONTENT] Extracted",chunks.length,"chunks from",cards.length,"cards");
return chunks;}}const et={matches:["*://quillbot.com/ai-content-detector*"],main(){new Ze().init()}};function de(y,...a){}const tt={debug:(...y)=>de(console.debug,...y),log:(...y)=>de(console.log,...y),warn:(...y)=>de(console.warn,...y),error:(...y)=>de(console.error,...y)},pe=class pe extends Event{constructor(a,c){super(pe.EVENT_NAME,{}),this.newUrl=a,this.oldUrl=c}};Y(pe,"EVENT_NAME",Se("wxt:locationchange"));let Te=pe;function Se(y){var a;return`${(a=M==null?void 0:M.runtime)==null?void 0:a.id}:content:${y}`}function nt(y){let a,c;return{run(){a==null&&(c=new URL(location.href),a=y.setInterval(()=>{let s=new URL(location.href);s.href!==c.href&&(window.dispatchEvent(new Te(s,c)),c=s)},1e3))}}}const oe=class oe{constructor(a,c){Y(this,"isTopFrame",window.self===window.top);Y(this,"abortController");Y(this,"locationWatcher",nt(this));Y(this,"receivedMessageIds",new Set);this.contentScriptName=a,this.options=c,this.abortController=new AbortController,this.isTopFrame?(this.listenForNewerScripts({ignoreFirstEvent:!0}),this.stopOldScripts()):this.listenForNewerScripts()}get signal(){return this.abortController.signal}abort(a){return this.abortController.abort(a)}get isInvalid(){return M.runtime.id==null&&this.notifyInvalidated(),this.signal.aborted}get isValid(){return!this.isInvalid}onInvalidated(a){return this.signal.addEventListener("abort",a),()=>this.signal.removeEventListener("abort",a)}block(){return new Promise(()=>{})}setInterval(a,c){const s=setInterval(()=>{this.isValid&&a()},c);return this.onInvalidated(()=>clearInterval(s)),s}setTimeout(a,c){const s=setTimeout(()=>{this.isValid&&a()},c);return this.onInvalidated(()=>clearTimeout(s)),s}requestAnimationFrame(a){const c=requestAnimationFrame((...s)=>{this.isValid&&a(...s)});return this.onInvalidated(()=>cancelAnimationFrame(c)),c}requestIdleCallback(a,c){const s=requestIdleCallback((...f)=>{this.signal.aborted||a(...f)},c);return this.onInvalidated(()=>cancelIdleCallback(s)),s}addEventListener(a,c,s,f){var N;c==="wxt:locationchange"&&this.isValid&&this.locationWatcher.run(),(N=a.addEventListener)==null||N.call(a,c.startsWith("wxt:")?Se(c):c,s,{...f,signal:this.signal})}notifyInvalidated(){this.abort("Content script context invalidated"),tt.debug(`Content script "${this.contentScriptName}" context invalidated`)}stopOldScripts(){window.postMessage({type:oe.SCRIPT_STARTED_MESSAGE_TYPE,contentScriptName:this.contentScriptName,messageId:Math.random().toString(36).slice(2)},"*")}verifyScriptStartedEvent(a){var N,P,x;const c=((N=a.data)==null?void 0:N.type)===oe.SCRIPT_STARTED_MESSAGE_TYPE,s=((P=a.data)==null?void 0:P.contentScriptName)===this.contentScriptName,f=!this.receivedMessageIds.has((x=a.data)==null?void 0:x.messageId);return c&&s&&f}listenForNewerScripts(a){let c=!0;const s=f=>{if(this.verifyScriptStartedEvent(f)){this.receivedMessageIds.add(f.data.messageId);const N=c;if(c=!1,N&&(a!=null&&a.ignoreFirstEvent))return;this.notifyInvalidated()}};addEventListener("message",s),this.onInvalidated(()=>removeEventListener("message",s))}};Y(oe,"SCRIPT_STARTED_MESSAGE_TYPE",Se("wxt:content-script-started"));let Ne=oe;function Nt(){}function fe(y,...a){}const rt={debug:(...y)=>fe(console.debug,...y),log:(...y)=>fe(console.log,...y),warn:(...y)=>fe(console.warn,...y),error:(...y)=>fe(console.error,...y)};return(async()=>{try{const{main:y,...a}=et,c=new Ne("content",a);return await y(c)}catch(y){throw rt.error('The content script "content" crashed on startup!',y),y}})()}();

// ── Content-script readiness handshake ──────────────────────────────────────
// The WXT-compiled IIFE above only handles PROCESS_ITEM.
// We add a separate listener here so the background can PING us and know
// the content script is alive before sending PROCESS_ITEM.
(function() {
  if (typeof chrome === 'undefined' || !chrome.runtime) return;

  // Respond to PING — background polls this to confirm CS is ready
  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.type === 'PING') {
      console.log('[CONTENT] PING received — content script is ready');
      sendResponse({ ready: true });
      return true;
    }
  });

  // Also notify background proactively when page is fully loaded
  function notifyReady() {
    try {
      chrome.runtime.sendMessage({ type: 'CONTENT_SCRIPT_READY' }, function() {
        if (chrome.runtime.lastError) {
          // background may not be listening yet — PING polling will catch it
        } else {
          console.log('[CONTENT] CONTENT_SCRIPT_READY sent to background');
        }
      });
    } catch(e) {}
  }

  if (document.readyState === 'complete') {
    notifyReady();
  } else {
    window.addEventListener('load', notifyReady);
  }
})();
// ────────────────────────────────────────────────────────────────────────────

// Inject stats panel into page header
(function() {
  'use strict';

  let statsPanel = null;
  let currentStats = { total: 0, pending: 0, completed: 0, errors: 0 };

  const EXTENSION_TAB_MARKER_PARAM = 'aidr_ext';

  function isExtensionOpenedTab() {
    try {
      return new URL(window.location.href).searchParams.get(EXTENSION_TAB_MARKER_PARAM) === '1';
    } catch {
      return false;
    }
  }

  function hideElement(element) {
    if (!(element instanceof HTMLElement)) return;
    element.style.setProperty('display', 'none', 'important');
    element.style.setProperty('visibility', 'hidden', 'important');
    element.style.setProperty('pointer-events', 'none', 'important');
  }

  function findPinnedSidebarRoot(startElement, side) {
    let node = startElement instanceof HTMLElement ? startElement : null;
    let best = null;

    while (node && node !== document.body && node !== document.documentElement) {
      const rect = node.getBoundingClientRect();
      const style = window.getComputedStyle(node);

      const positionOk = style.position === 'fixed' || style.position === 'sticky';
      const tallOk = rect.height >= window.innerHeight * 0.6;
      const widthOk = rect.width >= 50 && rect.width <= 320;
      const sideOk =
        side === 'left' ? rect.left <= 2 : rect.right >= window.innerWidth - 2;

      if (positionOk && tallOk && widthOk && sideOk) best = node;
      node = node.parentElement;
    }

    return best;
  }

  function applyExtensionOpenedTabUiOverrides() {
    if (!isExtensionOpenedTab()) return;

    document.documentElement.classList.add('aidr-ext-tab');

    const tryApply = () => {
      const topBanner = document.querySelector(
        '[data-testid="humanizer-chrome-extension-upsell-aidr"]'
      );
      if (topBanner) hideElement(topBanner);

      const sideDrawer =
        document.querySelector('[data-testid="pphr-view-side-drawer-box"]') ||
        document
          .querySelector('[data-testid="aidr-feedback-button"]')
          ?.closest('[data-testid="pphr-view-side-drawer-box"]');
      if (sideDrawer) hideElement(sideDrawer);

      const sideNavAnchor =
        document.querySelector('[data-testid="sidenav-ai-detector"]') ||
        document.querySelector('[data-testid^="sidenav-"]');
      if (sideNavAnchor) {
        const leftSidebar = findPinnedSidebarRoot(sideNavAnchor, 'left');
        if (leftSidebar) hideElement(leftSidebar);
      }

      const bottomSection = document.querySelector(
        '[data-testid="PageQAIDetectorBTF"]'
      );
      if (bottomSection) hideElement(bottomSection);

      const footer = document.getElementById('qb-footer');
      if (footer) {
        hideElement(footer);
        const footerSection = footer.closest('section[data-hydration-on-demand="true"]');
        if (footerSection) hideElement(footerSection);
      }
    };

    tryApply();

    const observer = new MutationObserver(() => tryApply());
    observer.observe(document.documentElement, { childList: true, subtree: true });
    setTimeout(() => observer.disconnect(), 60000);
  }

  function createStatsPanel() {
    if (statsPanel) return;

    // Create the stats container
    statsPanel = document.createElement('div');
    statsPanel.id = 'ai-detector-stats-panel';
    statsPanel.innerHTML = `
      <style>
        #ai-detector-stats-panel {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 16px;
          background: linear-gradient(135deg, #1a1f2e 0%, #0d1117 100%);
          border-radius: 12px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-size: 13px;
          color: #fff;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          margin-right: 16px;
          border: 1px solid rgba(255,255,255,0.1);
        }
        #ai-detector-stats-panel .stat-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 50px;
          padding: 4px 8px;
          background: rgba(255,255,255,0.05);
          border-radius: 8px;
        }
        #ai-detector-stats-panel .stat-label {
          font-size: 10px;
          color: #8b949e;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        #ai-detector-stats-panel .stat-value {
          font-size: 16px;
          font-weight: 600;
          margin-top: 2px;
        }
        #ai-detector-stats-panel .stat-value.total { color: #58a6ff; }
        #ai-detector-stats-panel .stat-value.pending { color: #f0883e; }
        #ai-detector-stats-panel .stat-value.completed { color: #3fb950; }
        #ai-detector-stats-panel .stat-value.errors { color: #f85149; }
        #ai-detector-stats-panel .download-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 12px;
          background: linear-gradient(135deg, #238636 0%, #2ea043 100%);
          border: none;
          border-radius: 8px;
          color: #fff;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        #ai-detector-stats-panel .download-btn:hover {
          background: linear-gradient(135deg, #2ea043 0%, #3fb950 100%);
          transform: translateY(-1px);
        }
        #ai-detector-stats-panel .download-btn svg {
          width: 14px;
          height: 14px;
        }
      </style>
      <div class="stat-box">
        <span class="stat-label">Total</span>
        <span class="stat-value total" id="ai-stats-total">0</span>
      </div>
      <div class="stat-box">
        <span class="stat-label">Pending</span>
        <span class="stat-value pending" id="ai-stats-pending">0/0</span>
      </div>
      <div class="stat-box">
        <span class="stat-label">Done</span>
        <span class="stat-value completed" id="ai-stats-completed">0</span>
      </div>
      <div class="stat-box">
        <span class="stat-label">Errors</span>
        <span class="stat-value errors" id="ai-stats-errors">0</span>
      </div>
      <button class="download-btn" id="ai-stats-download">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
        Download
      </button>
    `;

    // Try to find the header area
    function insertPanel() {
      // Look for the MUI header area mentioned by user
      const targetSelectors = [
        '.MuiBox-root.css-7zrlf9',
        '.MuiGrid-root.MuiGrid-item.css-1dc8izx .MuiBox-root.css-36qfiv',
        '.MuiBox-root.css-36qfiv',
        'header',
        '[class*="header"]',
        '.MuiAppBar-root',
        '[class*="MuiToolbar"]'
      ];

      for (const selector of targetSelectors) {
        const target = document.querySelector(selector);
        if (target) {
          // Insert before the target or as first child
          if (target.parentNode) {
            target.parentNode.insertBefore(statsPanel, target);
            console.log('AI Detector stats panel injected into:', selector);
            return true;
          }
        }
      }

      // Fallback: create floating panel at top
      statsPanel.style.cssText += `
        position: fixed;
        top: 10px;
        right: 10px;
        z-index: 10000;
      `;
      document.body.appendChild(statsPanel);
      console.log('AI Detector stats panel created as floating element');
      return true;
    }

    // Wait for page to load, then insert
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => setTimeout(insertPanel, 1000));
    } else {
      setTimeout(insertPanel, 1000);
    }

    // Add download button handler
    setTimeout(() => {
      const downloadBtn = document.getElementById('ai-stats-download');
      if (downloadBtn) {
        downloadBtn.addEventListener('click', downloadResults);
      }
    }, 1500);
  }

  function updateStats(stats) {
    currentStats = stats;
    const totalEl = document.getElementById('ai-stats-total');
    const pendingEl = document.getElementById('ai-stats-pending');
    const completedEl = document.getElementById('ai-stats-completed');
    const errorsEl = document.getElementById('ai-stats-errors');

    if (totalEl) totalEl.textContent = stats.total || 0;
    if (pendingEl) pendingEl.textContent = `${stats.completed || 0}/${stats.total || 0}`;
    if (completedEl) completedEl.textContent = stats.completed || 0;
    if (errorsEl) errorsEl.textContent = stats.errors || 0;
  }

  function downloadResults() {
    // Request download from background
    chrome.runtime.sendMessage({ type: 'GET_DATA' }, (response) => {
      if (chrome.runtime.lastError) {
        alert('Error fetching data: ' + chrome.runtime.lastError.message);
        return;
      }

      if (!response || !response.success) {
        alert('Error fetching data: ' + (response?.error || 'Unknown error'));
        return;
      }

      const data = response.data;
      if (!data || data.length === 0) {
        alert('No data available to download');
        return;
      }

      const csvRows = [];
      csvRows.push(['id', 'response', 'status', 'ai_detection_percentage', 'ai_chunks'].join(','));

      for (const item of data) {
        const id = escapeCSV(item.originalId || item.id || '');
        const resp = escapeCSV(item.rawResponse || item.response || '');
        const status = escapeCSV(item.status || '');
        const aiPct = item.aiDetectionPercentage !== undefined && item.aiDetectionPercentage !== null
          ? item.aiDetectionPercentage
          : '';
        const aiChunks = escapeCSV(item.aiChunks ? JSON.stringify(item.aiChunks) : '');
        csvRows.push([id, resp, status, aiPct, aiChunks].join(','));
      }

      const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `ai_detection_results_${new Date().toISOString().slice(0,10)}.csv`);
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
    if (str.includes(',') || str.includes('\n') || str.includes('\r') || str.includes('"')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  }

  // Auto-confirm "Delete all text" dialog by ticking "Don't show again" then clicking "Continue".
  function setupAutoConfirmDeleteAllTextDialog() {
    const HANDLED_ATTR = 'data-ai-content-ext-auto-delete-handled';

    function findDialog() {
      const candidates = document.querySelectorAll('[role="dialog"], .MuiDialog-root, .MuiModal-root');
      for (const el of candidates) {
        const text = (el.textContent || '').replace(/\s+/g, ' ').trim();
        if (text.includes('Delete all text') && (text.includes("Don't show again") || text.includes('Dont show again'))) {
          return el;
        }
      }
      return null;
    }

    function handleDialog(dialog) {
      if (!dialog || dialog.getAttribute(HANDLED_ATTR) === 'true') return;
      dialog.setAttribute(HANDLED_ATTR, 'true');

      const checkboxInput =
        dialog.querySelector('input[type="checkbox"][value="dontShowAgain"], input[type="checkbox"][name="dontShowAgain"]') ||
        document.querySelector('input[type="checkbox"][value="dontShowAgain"], input[type="checkbox"][name="dontShowAgain"]');

      const clickContinue = () => {
        const buttons = Array.from(dialog.querySelectorAll('button'));
        const continueButton =
          buttons.find((b) => (b.textContent || '').trim().toLowerCase() === 'continue') ||
          buttons.find((b) => (b.textContent || '').trim().toLowerCase().includes('continue'));
        if (continueButton) continueButton.click();
      };

      if (checkboxInput && !checkboxInput.checked) {
        checkboxInput.click();
        setTimeout(clickContinue, 50);
      } else {
        clickContinue();
      }
    }

    const tryHandle = () => handleDialog(findDialog());

    // Handle if already present, then watch for dialog insertion.
    tryHandle();
    const observer = new MutationObserver(() => tryHandle());
    if (document.body) observer.observe(document.body, { childList: true, subtree: true });
  }

  // Listen for state updates from background
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'STATE_UPDATE') {
      const state = message.payload;
      updateStats({
        total: state.totalItems,
        pending: Math.max(0, state.totalItems - state.completedItems - state.errorItems),
        completed: state.completedItems,
        errors: state.errorItems
      });
    }
  });

  // Initialize stats panel and fetch initial state
  function init() {
    applyExtensionOpenedTabUiOverrides();
    createStatsPanel();
    setupAutoConfirmDeleteAllTextDialog();

    // Get initial state
    setTimeout(() => {
      chrome.runtime.sendMessage({ type: 'GET_STATE' }, (response) => {
        if (response && response.success && response.data) {
          const state = response.data;
          updateStats({
            total: state.totalItems,
            pending: Math.max(0, state.totalItems - state.completedItems - state.errorItems),
            completed: state.completedItems,
            errors: state.errorItems
          });
        }
      });
    }, 2000);
  }

  // Check if on QuillBot AI detector page
  if (window.location.href.includes('quillbot.com/ai-content-detector')) {
    init();
  }
})();
content;
