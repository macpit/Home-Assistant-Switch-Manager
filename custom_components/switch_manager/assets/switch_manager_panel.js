/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$3=globalThis,e$6=t$3.ShadowRoot&&(void 0===t$3.ShadyCSS||t$3.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$2=Symbol(),o$4=new WeakMap;let n$3 = class n{constructor(t,e,o){if(this._$cssResult$=true,o!==s$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$6&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$4.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$4.set(s,t));}return t}toString(){return this.cssText}};const r$4=t=>new n$3("string"==typeof t?t:t+"",void 0,s$2),i$4=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,s,o)=>e+(t=>{if(true===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1],t[0]);return new n$3(o,t,s$2)},S$1=(s,o)=>{if(e$6)s.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of o){const o=document.createElement("style"),n=t$3.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$2=e$6?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$4(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i$3,defineProperty:e$5,getOwnPropertyDescriptor:h$1,getOwnPropertyNames:r$3,getOwnPropertySymbols:o$3,getPrototypeOf:n$2}=Object,a$1=globalThis,c$1=a$1.trustedTypes,l$1=c$1?c$1.emptyScript:"",p$1=a$1.reactiveElementPolyfillSupport,d$1=(t,s)=>t,u$1={toAttribute(t,s){switch(s){case Boolean:t=t?l$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$1=(t,s)=>!i$3(t,s),b$1={attribute:true,type:String,converter:u$1,reflect:false,useDefault:false,hasChanged:f$1};Symbol.metadata??=Symbol("metadata"),a$1.litPropertyMetadata??=new WeakMap;let y$1 = class y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=b$1){if(s.state&&(s.attribute=false),this._$Ei(),this.prototype.hasOwnProperty(t)&&((s=Object.create(s)).wrapped=true),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),h=this.getPropertyDescriptor(t,i,s);void 0!==h&&e$5(this.prototype,t,h);}}static getPropertyDescriptor(t,s,i){const{get:e,set:r}=h$1(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get:e,set(s){const h=e?.call(this);r?.call(this,s),this.requestUpdate(t,h,i);},configurable:true,enumerable:true}}static getPropertyOptions(t){return this.elementProperties.get(t)??b$1}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const t=n$2(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const t=this.properties,s=[...r$3(t),...o$3(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$2(s));}else void 0!==s&&i.push(c$2(s));return i}static _$Eu(t,s){const i=s.attribute;return  false===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this));}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach(t=>t.hostConnected?.());}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.());}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$ET(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&true===i.reflect){const h=(void 0!==i.converter?.toAttribute?i.converter:u$1).toAttribute(s,i.type);this._$Em=t,null==h?this.removeAttribute(e):this.setAttribute(e,h),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u$1;this._$Em=e;const r=h.fromAttribute(s,t.type);this[e]=r??this._$Ej?.get(e)??r,this._$Em=null;}}requestUpdate(t,s,i,e=false,h){if(void 0!==t){const r=this.constructor;if(false===e&&(h=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??f$1)(h,s)||i.useDefault&&i.reflect&&h===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,s,i);} false===this.isUpdatePending&&(this._$ES=this._$EP());}C(t,s,{useDefault:i,reflect:e,wrapped:h},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??s??this[t]),true!==h||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(s=void 0),this._$AL.set(t,s)),true===e&&this._$Em!==t&&(this._$Eq??=new Set).add(t));}async _$EP(){this.isUpdatePending=true;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t){const{wrapped:t}=i,e=this[s];true!==t||this._$AL.has(s)||void 0===e||this.C(s,void 0,i,e);}}let t=false;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(s)):this._$EM();}catch(s){throw t=false,this._$EM(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(t)),this.updated(t);}_$EM(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return  true}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM();}updated(t){}firstUpdated(t){}};y$1.elementStyles=[],y$1.shadowRootOptions={mode:"open"},y$1[d$1("elementProperties")]=new Map,y$1[d$1("finalized")]=new Map,p$1?.({ReactiveElement:y$1}),(a$1.reactiveElementVersions??=[]).push("2.1.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2=globalThis,i$2=t=>t,s$1=t$2.trustedTypes,e$4=s$1?s$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,h="$lit$",o$2=`lit$${Math.random().toFixed(9).slice(2)}$`,n$1="?"+o$2,r$2=`<${n$1}>`,l=document,c=()=>l.createComment(""),a=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u=Array.isArray,d=t=>u(t)||"function"==typeof t?.[Symbol.iterator],f="[ \t\n\f\r]",v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,p=RegExp(`>|${f}(?:([^\\s"'>=/]+)(${f}*=${f}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,x=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),b=x(1),E=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),C=new WeakMap,P=l.createTreeWalker(l,129);function V(t,i){if(!u(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e$4?e$4.createHTML(i):i}const N=(t,i)=>{const s=t.length-1,e=[];let n,l=2===i?"<svg>":3===i?"<math>":"",c=v;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,f=0;for(;f<s.length&&(c.lastIndex=f,u=c.exec(s),null!==u);)f=c.lastIndex,c===v?"!--"===u[1]?c=_:void 0!==u[1]?c=m:void 0!==u[2]?(y.test(u[2])&&(n=RegExp("</"+u[2],"g")),c=p):void 0!==u[3]&&(c=p):c===p?">"===u[0]?(c=n??v,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?p:'"'===u[3]?$:g):c===$||c===g?c=p:c===_||c===m?c=v:(c=p,n=void 0);const x=c===p&&t[i+1].startsWith("/>")?" ":"";l+=c===v?s+r$2:d>=0?(e.push(a),s.slice(0,d)+h+s.slice(d)+o$2+x):s+o$2+(-2===d?i:x);}return [V(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),e]};class S{constructor({strings:t,_$litType$:i},e){let r;this.parts=[];let l=0,a=0;const u=t.length-1,d=this.parts,[f,v]=N(t,i);if(this.el=S.createElement(f,e),P.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=P.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(h)){const i=v[a++],s=r.getAttribute(t).split(o$2),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:l,name:e[2],strings:s,ctor:"."===e[1]?I:"?"===e[1]?L:"@"===e[1]?z:H}),r.removeAttribute(t);}else t.startsWith(o$2)&&(d.push({type:6,index:l}),r.removeAttribute(t));if(y.test(r.tagName)){const t=r.textContent.split(o$2),i=t.length-1;if(i>0){r.textContent=s$1?s$1.emptyScript:"";for(let s=0;s<i;s++)r.append(t[s],c()),P.nextNode(),d.push({type:2,index:++l});r.append(t[i],c());}}}else if(8===r.nodeType)if(r.data===n$1)d.push({type:2,index:l});else {let t=-1;for(;-1!==(t=r.data.indexOf(o$2,t+1));)d.push({type:7,index:l}),t+=o$2.length-1;}l++;}}static createElement(t,i){const s=l.createElement("template");return s.innerHTML=t,s}}function M(t,i,s=t,e){if(i===E)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=a(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(false),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=M(t,h._$AS(t,i.values),h,e)),i}class R{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??l).importNode(i,true);P.currentNode=e;let h=P.nextNode(),o=0,n=0,r=s[0];for(;void 0!==r;){if(o===r.index){let i;2===r.type?i=new k(h,h.nextSibling,this,t):1===r.type?i=new r.ctor(h,r.name,r.strings,this,t):6===r.type&&(i=new Z(h,this,t)),this._$AV.push(i),r=s[++n];}o!==r?.index&&(h=P.nextNode(),o++);}return P.currentNode=l,e}p(t){let i=0;for(const s of this._$AV) void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??true;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=M(this,t,i),a(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==E&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):d(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==A&&a(this._$AH)?this._$AA.nextSibling.data=t:this.T(l.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=S.createElement(V(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new R(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=C.get(t.strings);return void 0===i&&C.set(t.strings,i=new S(t)),i}k(t){u(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new k(this.O(c()),this.O(c()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,s){for(this._$AP?.(false,true,s);t!==this._$AB;){const s=i$2(t).nextSibling;i$2(t).remove(),t=s;}}setConnected(t){ void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A;}_$AI(t,i=this,s,e){const h=this.strings;let o=false;if(void 0===h)t=M(this,t,i,0),o=!a(t)||t!==this._$AH&&t!==E,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=M(this,e[s+n],i,n),r===E&&(r=this._$AH[n]),o||=!a(r)||r!==this._$AH[n],r===A?t=A:t!==A&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class I extends H{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A?void 0:t;}}class L extends H{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==A);}}class z extends H{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=M(this,t,i,0)??A)===E)return;const s=this._$AH,e=t===A&&s!==A||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==A&&(s===A||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){M(this,t);}}const B=t$2.litHtmlPolyfillSupport;B?.(S,k),(t$2.litHtmlVersions??=[]).push("3.3.2");const D=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new k(i.insertBefore(c(),t),t,void 0,s??{});}return h._$AI(t),h};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s=globalThis;let i$1 = class i extends y$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=D(r,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(true);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(false);}render(){return E}};i$1._$litElement$=true,i$1["finalized"]=true,s.litElementHydrateSupport?.({LitElement:i$1});const o$1=s.litElementPolyfillSupport;o$1?.({LitElement:i$1});(s.litElementVersions??=[]).push("4.2.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=t=>(e,o)=>{ void 0!==o?o.addInitializer(()=>{customElements.define(t,e);}):customElements.define(t,e);};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o={attribute:true,type:String,converter:u$1,reflect:false,hasChanged:f$1},r$1=(t=o,e,r)=>{const{kind:n,metadata:i}=r;let s=globalThis.litPropertyMetadata.get(i);if(void 0===s&&globalThis.litPropertyMetadata.set(i,s=new Map),"setter"===n&&((t=Object.create(t)).wrapped=true),s.set(r.name,t),"accessor"===n){const{name:o}=r;return {set(r){const n=e.get.call(this);e.set.call(this,r),this.requestUpdate(o,n,t,true,r);},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===n){const{name:o}=r;return function(r){const n=this[o];e.call(this,r),this.requestUpdate(o,n,t,true,r);}}throw Error("Unsupported decorator location: "+n)};function n(t){return (e,o)=>"object"==typeof o?r$1(t,e,o):((t,e,o)=>{const r=e.hasOwnProperty(o);return e.constructor.createProperty(o,t),r?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function r(r){return n({...r,state:true,attribute:false})}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e$3=(e,t,c)=>(c.configurable=true,c.enumerable=true,Reflect.decorate&&"object"!=typeof t&&Object.defineProperty(e,t,c),c);

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function e$2(e,r){return (n,s,i)=>{const o=t=>t.renderRoot?.querySelector(e)??null;if(r){const{get:e,set:r}="object"==typeof s?n:i??(()=>{const t=Symbol();return {get(){return this[t]},set(e){this[t]=e;}}})();return e$3(n,s,{get(){let t=e.call(this);return void 0===t&&(t=o(this),(null!==t||this.hasUpdated)&&r.call(this,t)),t}})}return e$3(n,s,{get(){return o(this)}})}}

/**
 * Utility function to asynchronously load Home Assistant form components
 * if they are not already registered in the custom elements registry.
 *
 * @param components - Optional array of component names to load. If not provided, defaults to a predefined list.
 * @returns Promise that resolves when all required components are loaded
 */
// Define the default list of required components
const DEFAULT_HA_COMPONENTS = [
    'ha-form',
    'ha-icon',
    'ha-icon-button',
    'ha-selector',
    'ha-textfield',
    'ha-icon-picker',
    'ha-icon-button',
    'ha-entity-picker',
    'ha-select',
    'ha-dialog',
    'ha-sortable',
    'ha-svg-icon',
    'ha-alert',
    'ha-button',
    'ha-color-picker',
    'ha-badge',
    'ha-sankey-chart',
    'mwc-button'
];
const loadHaComponents = async (components) => {
    // Use provided components or default to the predefined list
    const componentsToLoad = components || DEFAULT_HA_COMPONENTS;
    try {
        // Check if all required custom elements are already defined
        if (componentsToLoad.every(component => customElements.get(component))) {
            return;
        }
        // Wait for the partial-panel-resolver to be defined with timeout
        await Promise.race([
            customElements.whenDefined('partial-panel-resolver'),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout waiting for partial-panel-resolver')), 10000))
        ]);
        // Create and configure the panel resolver with proper typing
        const ppr = document.createElement('partial-panel-resolver');
        // Check if the element was created successfully
        if (!ppr) {
            throw new Error('Failed to create partial-panel-resolver element');
        }
        ppr.hass = {
            panels: [
                {
                    url_path: 'tmp',
                    component_name: 'config',
                },
            ],
        };
        // Check if _updateRoutes method exists
        if (typeof ppr._updateRoutes !== 'function') {
            throw new Error('partial-panel-resolver does not have _updateRoutes method');
        }
        ppr._updateRoutes();
        // Check if routes were created
        if (!ppr.routerOptions?.routes?.tmp?.load) {
            throw new Error('Failed to create tmp route in partial-panel-resolver');
        }
        // Load the temporary route with timeout
        await Promise.race([
            ppr.routerOptions.routes.tmp.load(),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout loading tmp route')), 10000))
        ]);
        // Wait for the config panel to be defined with timeout
        await Promise.race([
            customElements.whenDefined('ha-panel-config'),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout waiting for ha-panel-config')), 10000))
        ]);
        // Create the config panel and load automation components with proper typing
        const cpr = document.createElement('ha-panel-config');
        // Check if the element was created successfully
        if (!cpr) {
            throw new Error('Failed to create ha-panel-config element');
        }
        // Check if automation route exists
        if (!cpr.routerOptions?.routes?.automation?.load) {
            throw new Error('ha-panel-config does not have automation route');
        }
        // Load automation components with timeout
        await Promise.race([
            cpr.routerOptions.routes.automation.load(),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout loading automation components')), 10000))
        ]);
        // Final verification that components were loaded
        const missingComponents = componentsToLoad.filter(component => !customElements.get(component));
        if (missingComponents.length > 0) {
            throw new Error(`Failed to load components: ${missingComponents.join(', ')}`);
        }
    }
    catch (error) {
        // Log the error but don't throw to prevent breaking the card
        console.error('Error loading Home Assistant form components:', error);
        // Attempt to use a fallback approach if available
        try {
            // Try to load components directly from Home Assistant frontend if available
            if (window.customElements && window.customElements.get('home-assistant')) {
                console.log('Attempting fallback loading method for HA components');
                // This is a fallback approach that might work in some environments
                const event = new CustomEvent('ha-request-load-components', {
                    detail: {
                        components: componentsToLoad
                    },
                    bubbles: true,
                    composed: true
                });
                document.dispatchEvent(event);
            }
        }
        catch (fallbackError) {
            console.error('Fallback loading method failed:', fallbackError);
        }
    }
};

const DOMAIN = "switch_manager";
const SCRIPT_MODES = ["single", "restart", "queued", "parallel"];
function navigateTo(path) {
    return path ? `/${DOMAIN}/${path}` : `/${DOMAIN}`;
}
function assetUrl(file) {
    return `/assets/${DOMAIN}/${file}`;
}
function wsType(type) {
    return `${DOMAIN}/${type}`;
}
function navigate(path) {
    history.pushState(null, "", path);
    const event = new Event("location-changed");
    window.dispatchEvent(event);
}
function createEmptyConfig(blueprint) {
    const config = {
        id: null,
        name: "New Switch",
        enabled: true,
        identifier: "",
        blueprint: blueprint,
        valid_blueprint: true,
        custom_image: "",
        buttons: [],
        is_mismatch: false,
        rotate: 0,
    };
    blueprint.buttons.forEach((btn, btnIdx) => {
        config.buttons[btnIdx] = { actions: [] };
        btn.actions.forEach((_action, actIdx) => {
            config.buttons[btnIdx].actions[actIdx] = {
                mode: SCRIPT_MODES[0],
                sequence: [],
            };
        });
    });
    return config;
}
function fireEvent(node, type, detail) {
    const event = new CustomEvent(type, {
        bubbles: true,
        composed: true,
        detail,
    });
    node.dispatchEvent(event);
}
function showToast(node, message) {
    fireEvent(node, "hass-notification", { message });
}
function showDialog(node, dialogTag, dialogImport, dialogParams) {
    fireEvent(node, "show-dialog", {
        dialogTag,
        dialogImport,
        dialogParams,
    });
}

const mdiClose = "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z";
let SwitchManagerDialog = class SwitchManagerDialog extends i$1 {
    constructor() {
        super(...arguments);
        this.heading = "";
        this._onKeydown = (e) => {
            if (e.key === "Escape")
                this._close();
        };
    }
    connectedCallback() {
        super.connectedCallback();
        document.addEventListener("keydown", this._onKeydown);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        document.removeEventListener("keydown", this._onKeydown);
    }
    render() {
        return b `
      <div class="backdrop" @click=${this._close}>
        <div class="surface" @click=${this._stop}>
          <div class="header">
            <span class="title">${this.heading}</span>
            <ha-icon-button
              .path=${mdiClose}
              label="Close"
              @click=${this._close}
            ></ha-icon-button>
          </div>
          <div class="content"><slot></slot></div>
          <div class="actions"><slot name="actions"></slot></div>
        </div>
      </div>
    `;
    }
    _stop(e) {
        e.stopPropagation();
    }
    _close() {
        this.dispatchEvent(new CustomEvent("closed"));
    }
    static { this.styles = i$4 `
    .backdrop {
      position: fixed;
      inset: 0;
      z-index: 10;
      background: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .surface {
      background: var(--card-background-color, #1c1c1c);
      color: var(--primary-text-color);
      border-radius: 12px;
      min-width: 300px;
      max-width: 90vw;
      max-height: 90vh;
      display: flex;
      flex-direction: column;
      box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2),
        0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12);
    }
    .header {
      display: flex;
      align-items: center;
      padding: 12px 12px 0 24px;
    }
    .title {
      flex: 1;
      font-size: 1.25rem;
      font-weight: 500;
    }
    .content {
      padding: 8px 24px 16px;
      overflow-y: auto;
    }
    .actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      padding: 8px 16px 16px;
    }
    ::slotted(button) {
      background: none;
      border: none;
      cursor: pointer;
      font: inherit;
      text-transform: uppercase;
      font-weight: 500;
      color: var(--primary-color);
      padding: 8px 12px;
      border-radius: 4px;
    }
    ::slotted(button:hover) {
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.1));
    }
    ::slotted(button.destructive) {
      color: var(--error-color, #db4437);
    }
  `; }
};
__decorate([
    n()
], SwitchManagerDialog.prototype, "heading", void 0);
SwitchManagerDialog = __decorate([
    t$1("switch-manager-dialog")
], SwitchManagerDialog);

let SwitchManagerDialogBlueprintSelector = class SwitchManagerDialogBlueprintSelector extends i$1 {
    constructor() {
        super(...arguments);
        this._blueprints = [];
        this._filter = "";
        this._protocol = "";
    }
    showDialog(params) {
        this._params = params;
        this.hass = this.parentElement?.hass || document.querySelector("home-assistant")?.hass;
        this._loadBlueprints();
    }
    closeDialog() {
        this._params = undefined;
        this._blueprints = [];
        this._filter = "";
        this._protocol = "";
    }
    _protoKey(bp) {
        // Event-entity blueprints share one generic event_type, so the integration
        // they belong to (Matter, Hue, ...) comes from the service field instead.
        if (bp.event_type === "event_entity") {
            return (bp.service || "").toLowerCase();
        }
        return (bp.event_type || "").split(/[._]/)[0];
    }
    async _loadBlueprints() {
        const res = await this.hass.callWS({
            type: wsType("blueprints"),
        });
        this._blueprints = Object.values(res.blueprints);
    }
    render() {
        if (!this._params)
            return b ``;
        const counts = new Map();
        for (const bp of this._blueprints) {
            const k = this._protoKey(bp);
            if (k)
                counts.set(k, (counts.get(k) || 0) + 1);
        }
        const options = [...counts.entries()].sort((a, b) => b[1] - a[1]);
        const filtered = this._blueprints.filter((bp) => {
            const matchText = !this._filter ||
                bp.name.toLowerCase().includes(this._filter.toLowerCase()) ||
                bp.service.toLowerCase().includes(this._filter.toLowerCase());
            const matchProto = !this._protocol || this._protoKey(bp) === this._protocol;
            return matchText && matchProto;
        });
        return b `
      <switch-manager-dialog @closed=${this.closeDialog} heading="Select Blueprint">
        <input
          class="search"
          type="text"
          placeholder="Search"
          .value=${this._filter}
          @input=${(e) => (this._filter = e.target.value)}
        />
        <select
          class="protocol"
          .value=${this._protocol}
          @change=${(e) => (this._protocol = e.target.value)}
        >
          <option value="">All (${this._blueprints.length})</option>
          ${options.map(([key, count]) => b `<option value=${key}>${key} (${count})</option>`)}
        </select>
        <div class="blueprints">
          ${filtered.map((bp) => b `
              <ha-card
                outlined
                class="blueprint-item"
                @click=${() => this._selectBlueprint(bp)}
              >
                <div class="card-content">
                  <div class="image">
                    ${bp.has_image
            ? b `<img src="${assetUrl(bp.id + ".png")}" />`
            : b `<ha-svg-icon
                          .path=${"M13 5C15.21 5 17 6.79 17 9C17 10.5 16.2 11.77 15 12.46V11.24C15.61 10.69 16 9.89 16 9C16 7.34 14.66 6 13 6S10 7.34 10 9C10 9.89 10.39 10.69 11 11.24V12.46C9.8 11.77 9 10.5 9 9C9 6.79 10.79 5 13 5M20 20.5C19.97 21.32 19.32 21.97 18.5 22H13C12.62 22 12.26 21.85 12 21.57L8 17.37L8.74 16.6C8.93 16.39 9.2 16.28 9.5 16.28H9.7L12 18V9C12 8.45 12.45 8 13 8S14 8.45 14 9V13.47L15.21 13.6L19.15 15.79C19.68 16.03 20 16.56 20 17.14V20.5M20 2H4C2.9 2 2 2.9 2 4V12C2 13.11 2.9 14 4 14H8V12L4 12L4 4H20L20 12H18V14H20V13.96L20.04 14C21.13 14 22 13.09 22 12V4C22 2.9 21.11 2 20 2Z"}
                        ></ha-svg-icon>`}
                  </div>
                  <div class="info">
                    <div class="name">${bp.name}</div>
                    <div class="service">${bp.service}</div>
                  </div>
                </div>
              </ha-card>
            `)}
        </div>
        <button slot="actions" @click=${this.closeDialog}>Cancel</button>
      </switch-manager-dialog>
    `;
    }
    _selectBlueprint(bp) {
        this.closeDialog();
        navigate(navigateTo(`new/${bp.id}`));
    }
    static { this.styles = i$4 `
    .blueprints {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 8px;
      padding: 8px 0;
      max-height: 60vh;
      overflow-y: auto;
    }
    .blueprint-item {
      cursor: pointer;
    }
    .blueprint-item:hover {
      background: var(--secondary-background-color);
    }
    .card-content {
      text-align: center;
      padding: 8px;
    }
    .image {
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .image img {
      max-width: 100%;
      max-height: 80px;
    }
    .image ha-svg-icon {
      fill: var(--primary-color);
      width: 60px;
      height: 60px;
    }
    .name {
      font-weight: 500;
      margin-top: 8px;
    }
    .service {
      color: var(--secondary-text-color);
      font-size: 0.85em;
    }
    .search,
    .protocol {
      display: block;
      width: 100%;
      box-sizing: border-box;
      margin-bottom: 8px;
      padding: 8px 12px;
      border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.3));
      border-radius: 6px;
      background: var(--secondary-background-color, transparent);
      color: var(--primary-text-color);
      font: inherit;
    }
  `; }
};
__decorate([
    r()
], SwitchManagerDialogBlueprintSelector.prototype, "_params", void 0);
__decorate([
    r()
], SwitchManagerDialogBlueprintSelector.prototype, "_blueprints", void 0);
__decorate([
    r()
], SwitchManagerDialogBlueprintSelector.prototype, "_filter", void 0);
__decorate([
    r()
], SwitchManagerDialogBlueprintSelector.prototype, "_protocol", void 0);
SwitchManagerDialogBlueprintSelector = __decorate([
    t$1("switch-manager-dialog-blueprint-selector")
], SwitchManagerDialogBlueprintSelector);

var blueprintSelector = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get SwitchManagerDialogBlueprintSelector () { return SwitchManagerDialogBlueprintSelector; }
});

const mdiDotsVertical = "M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z";
let SwitchManagerMenu = class SwitchManagerMenu extends i$1 {
    constructor() {
        super(...arguments);
        this.path = mdiDotsVertical;
        this.label = "Menu";
        /** "left" aligns the surface to the trigger's right edge (default), "right" to the left edge */
        this.align = "left";
        this._open = false;
        this._onDocClick = (e) => {
            if (!e.composedPath().includes(this))
                this._open = false;
        };
    }
    connectedCallback() {
        super.connectedCallback();
        document.addEventListener("click", this._onDocClick);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        document.removeEventListener("click", this._onDocClick);
    }
    render() {
        return b `
      <ha-icon-button
        .path=${this.path}
        .label=${this.label}
        @click=${this._toggle}
      ></ha-icon-button>
      <div
        class="surface ${this.align}"
        ?hidden=${!this._open}
        @click=${this._onSurfaceClick}
      >
        <slot></slot>
      </div>
    `;
    }
    _toggle(e) {
        e.stopPropagation();
        this._open = !this._open;
    }
    _onSurfaceClick(e) {
        // Close after an item is chosen, unless the clicked item is disabled.
        const item = e.target.closest(".menu-item");
        if (item && item.hasAttribute("disabled")) {
            e.stopPropagation();
            return;
        }
        this._open = false;
    }
    static { this.styles = i$4 `
    :host {
      position: relative;
      display: inline-flex;
    }
    .surface {
      position: absolute;
      top: 100%;
      z-index: 9;
      min-width: 200px;
      padding: 8px 0;
      background: var(--card-background-color, var(--paper-card-background-color, #1c1c1c));
      border-radius: 8px;
      box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2),
        0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);
      color: var(--primary-text-color);
    }
    .surface.left {
      right: 0;
    }
    .surface.right {
      left: 0;
    }
    .surface[hidden] {
      display: none;
    }
    ::slotted(.menu-item) {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 0 16px;
      height: 48px;
      cursor: pointer;
      white-space: nowrap;
      box-sizing: border-box;
    }
    ::slotted(.menu-item:hover) {
      background: var(--secondary-background-color, rgba(255, 255, 255, 0.05));
    }
    ::slotted(.menu-item[disabled]) {
      opacity: 0.5;
      pointer-events: none;
    }
    ::slotted(.menu-divider) {
      height: 1px;
      margin: 8px 0;
      background: var(--divider-color, rgba(255, 255, 255, 0.12));
    }
    ::slotted(.menu-item.warning) {
      color: var(--error-color, #db4437);
    }
  `; }
};
__decorate([
    n()
], SwitchManagerMenu.prototype, "path", void 0);
__decorate([
    n()
], SwitchManagerMenu.prototype, "label", void 0);
__decorate([
    n()
], SwitchManagerMenu.prototype, "align", void 0);
__decorate([
    r()
], SwitchManagerMenu.prototype, "_open", void 0);
SwitchManagerMenu = __decorate([
    t$1("switch-manager-menu")
], SwitchManagerMenu);

// MDI icon paths
const mdiPlus = "M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z";
const mdiStop = "M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4M9,9V15H15V9";
const mdiPlay = "M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M10,16.5L16,12L10,7.5V16.5Z";
const mdiDelete$1 = "M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z";
const mdiGestureTapButton = "M13 5C15.21 5 17 6.79 17 9C17 10.5 16.2 11.77 15 12.46V11.24C15.61 10.69 16 9.89 16 9C16 7.34 14.66 6 13 6S10 7.34 10 9C10 9.89 10.39 10.69 11 11.24V12.46C9.8 11.77 9 10.5 9 9C9 6.79 10.79 5 13 5M20 20.5C19.97 21.32 19.32 21.97 18.5 22H13C12.62 22 12.26 21.85 12 21.57L8 17.37L8.74 16.6C8.93 16.39 9.2 16.28 9.5 16.28H9.7L12 18V9C12 8.45 12.45 8 13 8S14 8.45 14 9V13.47L15.21 13.6L19.15 15.79C19.68 16.03 20 16.56 20 17.14V20.5M20 2H4C2.9 2 2 2.9 2 4V12C2 13.11 2.9 14 4 14H8V12L4 12L4 4H20L20 12H18V14H20V13.96L20.04 14C21.13 14 22 13.09 22 12V4C22 2.9 21.11 2 20 2Z";
const mdiArrowUp = "M7,15L12,10L17,15H7Z";
const mdiArrowDown = "M7,10L12,15L17,10H7Z";
const mdiContentCopy = "M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z";
const mdiMagnify = "M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z";
const mdiCamera = "M4,4H7L9,2H15L17,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9Z";
const mdiImageFrage = "M10,14.29L6.5,19H17.46L14.75,15.46L12.78,17.8L10,14.29M5,21V7H18.96V21H5M12,2.4L14.61,5.03H9.37L12,2.4M5,5.03C4.5,5.03 4,5.22 3.61,5.61C3.2,6 3,6.46 3,7V21C3,21.5 3.2,22 3.61,22.39C4,22.8 4.5,23 5,23H18.96C19.5,23 19.96,22.8 20.37,22.39C20.77,22 21,21.5 21,21V7C21,6.46 20.77,6 20.37,5.61C19.96,5.22 19.5,5.03 18.96,5.03H16L12,1L7.96,5.03H5Z";
let SwitchManagerIndex = class SwitchManagerIndex extends i$1 {
    constructor() {
        super(...arguments);
        this.narrow = false;
        this._data = [];
        this._filter = "";
        this._sortColumn = "name";
        this._sortDirection = "asc";
    }
    connectedCallback() {
        super.connectedCallback();
        try {
            const saved = JSON.parse(localStorage.getItem("switchManagerSort") || "{}");
            if (saved.column)
                this._sortColumn = saved.column;
            if (saved.direction)
                this._sortDirection = saved.direction;
        }
        catch { }
        this._populateSwitches();
    }
    get _filteredSortedData() {
        let items = this._data;
        if (this._filter) {
            const f = this._filter.toLowerCase();
            items = items.filter((item) => item.name.toLowerCase().includes(f) ||
                item.service.toLowerCase().includes(f) ||
                item.type.toLowerCase().includes(f));
        }
        const col = this._sortColumn;
        const dir = this._sortDirection === "asc" ? 1 : -1;
        return [...items].sort((a, b) => {
            if (col === "enabled") {
                return ((a.enabled ? 1 : 0) - (b.enabled ? 1 : 0)) * dir;
            }
            const aVal = String(a[col] || "").toLowerCase();
            const bVal = String(b[col] || "").toLowerCase();
            return aVal.localeCompare(bVal) * dir;
        });
    }
    _toggleSort(column) {
        if (this._sortColumn === column) {
            this._sortDirection = this._sortDirection === "asc" ? "desc" : "asc";
        }
        else {
            this._sortColumn = column;
            this._sortDirection = "asc";
        }
        localStorage.setItem("switchManagerSort", JSON.stringify({
            column: this._sortColumn,
            direction: this._sortDirection,
        }));
    }
    _sortIcon(column) {
        if (this._sortColumn !== column)
            return A;
        return b `<ha-svg-icon
      .path=${this._sortDirection === "asc" ? mdiArrowUp : mdiArrowDown}
    ></ha-svg-icon>`;
    }
    _getOverflowItems(item) {
        return [
            {
                path: mdiCamera,
                label: "Set custom Image",
                action: () => this._uploadEncodedImage(item),
            },
            {
                path: mdiImageFrage,
                label: "Use Default Image",
                action: () => this._removeCustomImage(item),
            },
            {
                path: item.enabled ? mdiStop : mdiPlay,
                label: item.enabled ? "Disable" : "Enable",
                action: () => this._toggleEnabled(item.switch_id, item.enabled),
            },
            {
                path: mdiContentCopy,
                label: "Duplicate",
                action: () => this._duplicate(item.switch_id),
            },
            {
                path: mdiDelete$1,
                label: "Delete",
                action: () => this._deleteConfirm(item),
                warning: true,
            },
        ];
    }
    render() {
        const data = this._filteredSortedData;
        return b `
      <div class="toolbar">
        <ha-menu-button
          .hass=${this.hass}
          .narrow=${this.narrow}
        ></ha-menu-button>
        <div class="main-title">Switch Manager</div>
        <div class="version">v${this.panel.config.version}</div>
      </div>
      <div class="view">
          <div class="content">
            <div class="search-bar">
              <ha-svg-icon .path=${mdiMagnify}></ha-svg-icon>
              <input
                type="text"
                placeholder="Search"
                .value=${this._filter}
                @input=${(e) => {
            this._filter = e.target.value;
        }}
              />
            </div>
            <div class="table">
              <div class="thead">
                <div class="tr">
                  <div class="th col-image"></div>
                  <div
                    class="th col-name sortable"
                    @click=${() => this._toggleSort("name")}
                  >
                    Name ${this._sortIcon("name")}
                  </div>
                  ${!this.narrow
            ? b `
                        <div
                          class="th col-service sortable"
                          @click=${() => this._toggleSort("service")}
                        >
                          Service ${this._sortIcon("service")}
                        </div>
                        <div
                          class="th col-type sortable"
                          @click=${() => this._toggleSort("type")}
                        >
                          Type ${this._sortIcon("type")}
                        </div>
                      `
            : A}
                  <div class="th col-actions"></div>
                </div>
              </div>
              <div class="tbody">
                ${data.length === 0
            ? b `<div class="empty">
                      ${this._data.length === 0
                ? "No Switches configured"
                : "No matches found"}
                    </div>`
            : data.map((item) => b `
                        <div
                          class="tr row-item"
                          @click=${() => this._editSwitch(item.switch_id)}
                        >
                          <div class="td col-image">
                            ${this._getImageSrcData(item)
                ? b `<img src="${this._getImageSrcData(item)}">`
                : b `<ha-svg-icon .path=${mdiGestureTapButton}>`}
                          </div>
                          <div class="td col-name">
                            <span class="name-text">
                              ${item.error
                ? b `<span class="error"
                                    >${item.name} (${item.error})</span
                                  >`
                : item.name}
                            </span>
                            ${!item.enabled
                ? b `<span class="disabled-badge"
                                  >Disabled</span
                                >`
                : A}
                          </div>
                          ${!this.narrow
                ? b `
                                <div class="td col-service">
                                  ${item.service}
                                </div>
                                <div class="td col-type">${item.type}</div>
                              `
                : A}
                          <div class="td col-actions" @click=${(e) => e.stopPropagation()}>
                            <switch-manager-menu align="left">
                              ${this._getOverflowItems(item).map((mi) => b `
                                  <div
                                    class="menu-item ${mi.warning ? "warning" : ""}"
                                    @click=${mi.action}
                                  >
                                    <ha-svg-icon .path=${mi.path}></ha-svg-icon>
                                    ${mi.label}
                                  </div>
                                `)}
                            </switch-manager-menu>
                          </div>
                        </div>
                      `)}
              </div>
            </div>
            <div class="fab-container">
              <ha-fab
                slot="fab"
                .label=${"Add Switch"}
                extended
                @click=${this._showBlueprintDialog}
              >
                <ha-svg-icon slot="icon" .path=${mdiPlus}></ha-svg-icon>
              </ha-fab>
            </div>
          </div>
      </div>
    `;
    }
    _populateSwitches() {
        this.hass
            .callWS({ type: wsType("configs") })
            .then((res) => {
            const items = [];
            Object.values(res.configs).forEach((sw) => {
                const bp = sw.valid_blueprint
                    ? sw.blueprint
                    : { id: sw.blueprint, service: "", name: "" };
                items.push({
                    switch: sw,
                    blueprint_id: bp.id,
                    switch_id: sw.id,
                    error: sw._error,
                    enabled: sw.enabled,
                    name: sw.name,
                    service: bp.service || "",
                    type: bp.name || "",
                    actions: sw.id,
                });
            });
            this._data = items;
        });
    }
    _editSwitch(id) {
        navigate(navigateTo(`edit/${id}`));
    }
    _getImageSrcData(item) {
        if (item.switch.custom_image !== "") {
            return item.switch.custom_image;
        }
        if (item.switch.valid_blueprint && item.switch.blueprint.has_image) {
            return assetUrl(item.blueprint_id + ".png");
        }
        return null;
    }
    async _toggleEnabled(switchId, currentEnabled) {
        try {
            const res = await this.hass.callWS({
                type: wsType("config/enabled"),
                enabled: !currentEnabled,
                config_id: switchId,
            });
            this._populateSwitches();
            showToast(this, `Switch ${res.enabled ? "Enabled" : "Disabled"}`);
        }
        catch (e) {
            showToast(this, e.message);
        }
    }
    async _uploadEncodedImage(item) {
        try {
            const imageInput = document.createElement("input");
            imageInput.type = "file";
            imageInput?.addEventListener("change", () => {
                const file = imageInput.files?.[0];
                if (!file)
                    return;
                showToast(this, `Selected file: ${file.name}`);
                const reader = new FileReader();
                reader.onload = async () => {
                    item.switch.custom_image = reader.result;
                    try {
                        await this.hass.callWS({
                            type: wsType("config/save"),
                            config: { ...item.switch, blueprint: item.switch.blueprint.id },
                            fix_mismatch: true,
                        });
                        this._populateSwitches();
                    }
                    catch (e) {
                        showToast(this, e.message);
                    }
                };
                reader.readAsDataURL(file);
            });
            imageInput.click();
        }
        catch (e) {
            showToast(this, e.message);
        }
    }
    async _removeCustomImage(item) {
        try {
            item.switch.custom_image = "";
            await this.hass.callWS({
                type: wsType("config/save"),
                config: { ...item.switch, blueprint: item.switch.blueprint.id },
                fix_mismatch: true,
            });
        }
        catch (e) {
            showToast(this, e.message);
        }
    }
    async _duplicate(switchId) {
        try {
            const res = await this.hass.callWS({
                type: wsType("config/duplicate"),
                config_id: switchId,
            });
            showToast(this, "Switch Duplicated");
            navigate(navigateTo(`edit/${res.config_id}`));
        }
        catch (e) {
            showToast(this, e.message);
        }
    }
    async _deleteConfirm(item) {
        showDialog(this, "switch-manager-dialog-confirm", () => Promise.resolve().then(function () { return confirm; }), {
            title: "Delete switch?",
            text: `${item.name} will be permanently deleted.`,
            confirmText: "Delete",
            dismissText: "Cancel",
            confirm: () => this._delete(item.switch_id),
            confirmation: true,
            destructive: true,
        });
    }
    async _delete(switchId) {
        try {
            await this.hass.callWS({
                type: wsType("config/delete"),
                config_id: switchId.toString(),
            });
            this._populateSwitches();
            showToast(this, "Switch Deleted");
        }
        catch (e) {
            showToast(this, e.message);
        }
    }
    _showBlueprintDialog() {
        showDialog(this, "switch-manager-dialog-blueprint-selector", () => Promise.resolve().then(function () { return blueprintSelector; }), {});
    }
    static { this.styles = i$4 `
    :host {
      display: block;
    }
    .view {
      display: block;
      height: calc(100vh - var(--header-height, 56px));
      overflow-y: auto;
    }
    .toolbar {
      display: flex;
      align-items: center;
      height: var(--header-height, 56px);
      box-sizing: border-box;
      padding: 0 12px;
      background-color: var(
        --app-header-background-color,
        var(--primary-color)
      );
      color: var(--app-header-text-color, var(--text-primary-color, #fff));
      font-size: 20px;
      font-weight: 400;
    }
    .toolbar .main-title {
      flex: 1;
      margin: 0 16px;
    }
    .toolbar .version {
      font-size: 14px;
      opacity: 0.8;
    }
    .menu-item ha-svg-icon {
      color: var(--secondary-text-color);
    }
    .menu-item.warning,
    .menu-item.warning ha-svg-icon {
      color: var(--error-color, #db4437);
    }
    .content {
      padding: 0;
    }

    /* Search */
    .search-bar {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 16px;
      background: var(--card-background-color, var(--ha-card-background, var(--secondary-background-color)));
      border-bottom: 1px solid var(--divider-color);
      color: var(--secondary-text-color);
    }
    .search-bar ha-svg-icon {
      flex-shrink: 0;
      --mdc-icon-size: 24px;
    }
    .search-bar input {
      flex: 1;
      background: none;
      border: none;
      outline: none;
      font-size: 1em;
      color: var(--primary-text-color);
      font-family: inherit;
    }
    .search-bar input::placeholder {
      color: var(--secondary-text-color);
    }

    /* Table */
    .table {
      width: 100%;
    }
    .thead {
      border-bottom: 1px solid var(--divider-color);
    }
    .tr {
      display: flex;
      align-items: center;
    }
    .th {
      font-size: 0.75rem;
      font-weight: 500;
      color: var(--primary-text-color);
      padding: 8px 16px;
      user-select: none;
    }
    .th.sortable {
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .th.sortable:hover {
      color: var(--primary-color);
    }
    .th ha-svg-icon {
      width: 16px;
      height: 16px;
    }
    .row-item {
      border-bottom: 1px solid var(--divider-color);
      cursor: pointer;
    }
    .row-item:hover {
      background: var(--secondary-background-color);
    }
    .td {
      padding: 0 16px;
    }

    /* Columns */
    .col-image {
      width: 90px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .col-image img {
      max-width: 100%;
      max-height: 48px;
      display: block;
    }
    .col-image ha-svg-icon {
      color: var(--primary-color);
      width: 40px;
      height: 40px;
    }
    .col-name {
      flex: 1;
      min-width: 0;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .name-text {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .disabled-badge {
      flex-shrink: 0;
      font-size: 0.75rem;
      padding: 2px 8px;
      border-radius: 12px;
      border: 1px solid var(--divider-color);
      color: var(--secondary-text-color);
      white-space: nowrap;
    }
    .col-service {
      width: 15%;
      flex-shrink: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .col-type {
      width: 15%;
      flex-shrink: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .col-actions {
      width: 48px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: visible;
    }

    .error {
      color: var(--error-color, red);
    }
    .warning {
      color: var(--error-color);
    }
    .empty {
      text-align: center;
      padding: 32px;
      color: var(--secondary-text-color);
      font-size: 1.2em;
    }
    .fab-container {
      position: fixed;
      right: 0;
      bottom: 0;
      padding: 1.2em;
      z-index: 1;
    }
  `; }
};
__decorate([
    n({ attribute: false })
], SwitchManagerIndex.prototype, "hass", void 0);
__decorate([
    n({ type: Boolean })
], SwitchManagerIndex.prototype, "narrow", void 0);
__decorate([
    n({ attribute: false })
], SwitchManagerIndex.prototype, "panel", void 0);
__decorate([
    n({ attribute: false })
], SwitchManagerIndex.prototype, "route", void 0);
__decorate([
    r()
], SwitchManagerIndex.prototype, "_data", void 0);
__decorate([
    r()
], SwitchManagerIndex.prototype, "_filter", void 0);
__decorate([
    r()
], SwitchManagerIndex.prototype, "_sortColumn", void 0);
__decorate([
    r()
], SwitchManagerIndex.prototype, "_sortDirection", void 0);
SwitchManagerIndex = __decorate([
    t$1("switch-manager-index")
], SwitchManagerIndex);

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t={ATTRIBUTE:1},e$1=t=>(...e)=>({_$litDirective$:t,values:e});class i{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i;}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const e=e$1(class extends i{constructor(t$1){if(super(t$1),t$1.type!==t.ATTRIBUTE||"class"!==t$1.name||t$1.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return " "+Object.keys(t).filter(s=>t[s]).join(" ")+" "}update(s,[i]){if(void 0===this.st){this.st=new Set,void 0!==s.strings&&(this.nt=new Set(s.strings.join(" ").split(/\s/).filter(t=>""!==t)));for(const t in i)i[t]&&!this.nt?.has(t)&&this.st.add(t);return this.render(i)}const r=s.element.classList;for(const t of this.st)t in i||(r.remove(t),this.st.delete(t));for(const t in i){const s=!!i[t];s===this.st.has(t)||this.nt?.has(t)||(s?(r.add(t),this.st.add(t)):(r.remove(t),this.st.delete(t)));}return E}});

// Custom tab strip — replaces HA's legacy paper-tabs/paper-tab, which current HA
// no longer auto-loads. Plain buttons + CSS, so it never drifts with HA.
let SwitchManagerButtonActions = class SwitchManagerButtonActions extends i$1 {
    constructor() {
        super(...arguments);
        this.index = 0;
    }
    render() {
        if (!this.blueprint_actions || this.blueprint_actions.length <= 1) {
            return b ``;
        }
        return b `
      <div class="tabs" role="tablist">
        ${this.blueprint_actions.map((action, idx) => {
            const seqLen = this.config_actions?.[idx]?.sequence?.length || 0;
            return b `
            <button
              class="tab ${idx === this.index ? "selected" : ""}"
              role="tab"
              index="${idx}"
              @click=${() => this._select(idx)}
            >
              <span class="title">${action.title}</span>
              ${seqLen ? b `<span class="chip">${seqLen}</span>` : ""}
              ${action.title === "init"
                ? b `<ha-svg-icon
                    class="init-icon"
                    .path=${"M7,8L2.5,12L7,16V8M17,8V16L21.5,12L17,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10Z"}
                  ></ha-svg-icon>`
                : ""}
            </button>
          `;
        })}
      </div>
    `;
    }
    flash(index) {
        const tab = this.tabs?.querySelector(`[index="${index}"]`);
        if (tab) {
            tab.removeAttribute("feedback");
            tab.setAttribute("feedback", "");
            setTimeout(() => tab.removeAttribute("feedback"), 1000);
        }
    }
    _select(idx) {
        this.dispatchEvent(new CustomEvent("changed", { detail: { index: idx } }));
    }
    static { this.styles = i$4 `
    @keyframes feedback {
      to {
        border-color: #00e903;
        color: #00e903;
      }
    }
    :host {
      display: flex;
      justify-content: center;
    }
    .tabs {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 4px;
      max-width: 100%;
      overflow-x: auto;
      margin: 0 10px;
    }
    .tab {
      position: relative;
      background: none;
      border: none;
      border-bottom: 2px solid transparent;
      color: var(--secondary-text-color);
      font: inherit;
      text-transform: uppercase;
      padding: 12px 32px;
      cursor: pointer;
      white-space: nowrap;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
    .tab.selected {
      border-bottom-color: var(--primary-color);
      color: var(--primary-color);
    }
    .tab[feedback] {
      animation: 0.4s feedback;
      animation-iteration-count: 2;
      animation-direction: alternate;
    }
    .chip {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 20px;
      height: 20px;
      padding: 0 6px;
      border-radius: 10px;
      font-size: 12px;
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
    }
    .init-icon {
      --mdc-icon-size: 18px;
    }
  `; }
};
__decorate([
    n({ attribute: false })
], SwitchManagerButtonActions.prototype, "hass", void 0);
__decorate([
    n({ attribute: false })
], SwitchManagerButtonActions.prototype, "blueprint_actions", void 0);
__decorate([
    n({ attribute: false })
], SwitchManagerButtonActions.prototype, "config_actions", void 0);
__decorate([
    n({ type: Number, reflect: true })
], SwitchManagerButtonActions.prototype, "index", void 0);
__decorate([
    e$2(".tabs", true)
], SwitchManagerButtonActions.prototype, "tabs", void 0);
SwitchManagerButtonActions = __decorate([
    t$1("switch-manager-button-actions")
], SwitchManagerButtonActions);

// MDI icon paths
const mdiArrowLeft = "M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z";
const mdiIdentifier = "M10 7V9H9V15H10V17H6V15H7V9H6V7H10M16 7C17.11 7 18 7.9 18 9V15C18 16.11 17.11 17 16 17H12V7M16 9H14V15H16V9Z";
const mdiRename = "M18,17H10.5L12.5,15H18M6,17V14.5L13.88,6.65C14.07,6.45 14.39,6.45 14.59,6.65L16.35,8.41C16.55,8.61 16.55,8.92 16.35,9.12L8.47,17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z";
const mdiRotate = "M16.89,15.5L18.31,16.89C19.21,15.73 19.76,14.39 19.93,13H17.91C17.77,13.87 17.43,14.72 16.89,15.5M13,17.9V19.92C14.39,19.75 15.74,19.21 16.9,18.31L15.46,16.87C14.71,17.41 13.87,17.76 13,17.9M19.93,11C19.76,9.61 19.21,8.27 18.31,7.11L16.89,8.53C17.43,9.28 17.77,10.13 17.91,11M15.55,5.55L11,1V4.07C7.06,4.56 4,7.92 4,12C4,16.08 7.05,19.44 11,19.93V17.91C8.16,17.43 6,14.97 6,12C6,9.03 8.16,6.57 11,6.09V10L15.55,5.55Z";
const mdiVariables = "M8,3A2,2 0 0,0 6,5V9A2,2 0 0,1 4,11H3V13H4A2,2 0 0,1 6,15V19A2,2 0 0,0 8,21H10V19H8V14A2,2 0 0,0 6,12A2,2 0 0,0 8,10V5H10V3M16,3A2,2 0 0,1 18,5V9A2,2 0 0,0 20,11H21V13H20A2,2 0 0,0 18,15V19A2,2 0 0,1 16,21H14V19H16V14A2,2 0 0,1 18,12A2,2 0 0,1 16,10V5H14V3H16Z";
const mdiCopy = "M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z";
const mdiDelete = "M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z";
const mdiSave = "M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z";
const mdiSwitchIcon = "M13 5C15.21 5 17 6.79 17 9C17 10.5 16.2 11.77 15 12.46V11.24C15.61 10.69 16 9.89 16 9C16 7.34 14.66 6 13 6S10 7.34 10 9C10 9.89 10.39 10.69 11 11.24V12.46C9.8 11.77 9 10.5 9 9C9 6.79 10.79 5 13 5M20 20.5C19.97 21.32 19.32 21.97 18.5 22H13C12.62 22 12.26 21.85 12 21.57L8 17.37L8.74 16.6C8.93 16.39 9.2 16.28 9.5 16.28H9.7L12 18V9C12 8.45 12.45 8 13 8S14 8.45 14 9V13.47L15.21 13.6L19.15 15.79C19.68 16.03 20 16.56 20 17.14V20.5M20 2H4C2.9 2 2 2.9 2 4V12C2 13.11 2.9 14 4 14H8V12L4 12L4 4H20L20 12H18V14H20V13.96L20.04 14C21.13 14 22 13.09 22 12V4C22 2.9 21.11 2 20 2Z";
let SwitchManagerSwitchEditor = class SwitchManagerSwitchEditor extends i$1 {
    constructor() {
        super(...arguments);
        this.narrow = false;
        this.disabled = false;
        this.sequence = [];
        this.button_index = 0;
        this.action_index = 0;
        this.is_new = true;
        this._is_yaml = false;
        this._dirty = false;
        this._debug = false;
        this._block_save = false;
    }
    render() {
        if (!this.config)
            return b ``;
        const hasError = !!this.config._error;
        return b `
      <div class="toolbar">
        <ha-menu-button
          .hass=${this.hass}
          .narrow=${this.narrow}
        ></ha-menu-button>
        <ha-icon-button
          .path=${mdiArrowLeft}
          @click=${this._backTapped}
        ></ha-icon-button>
        <div class="main-title">Switch Manager - ${this.config?.name}</div>
        <switch-manager-menu align="left">
          <div
            class="menu-item"
            ?disabled=${!this.config || hasError}
            @click=${this._showIdentifierAutoDiscoveryDialog}
          >
            <ha-svg-icon .path=${mdiIdentifier}></ha-svg-icon>
            Identifier
          </div>
          <div class="menu-item" @click=${this._showRenameDialog}>
            <ha-svg-icon .path=${mdiRename}></ha-svg-icon>
            Rename
          </div>
          <div class="menu-item" @click=${this._rotate}>
            <ha-svg-icon .path=${mdiRotate}></ha-svg-icon>
            Rotate
          </div>
          <div
            class="menu-item"
            ?disabled=${!this.config || hasError}
            @click=${this._showVariablesEditorDialog}
          >
            <ha-svg-icon .path=${mdiVariables}></ha-svg-icon>
            Variables
          </div>
          <div
            class="menu-item"
            ?disabled=${!this.config || hasError}
            @click=${this._showCopyFromDialog}
          >
            <ha-svg-icon .path=${mdiCopy}></ha-svg-icon>
            Copy From
          </div>
          <div
            class="menu-item"
            ?disabled=${!this.config || this.is_new || hasError}
            @click=${this._toggleEnabled}
          >
            <ha-svg-icon .path=${"M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4M9,9V15H15V9"}></ha-svg-icon>
            ${this.config?.enabled ? "Disable" : "Enable"}
          </div>
          <div class="menu-divider"></div>
          <div
            class="menu-item"
            ?disabled=${!this.config || this.is_new || hasError}
            @click=${this._toggleDebug}
          >
            <ha-svg-icon .path=${"M14,12H10V10H14M14,16H10V14H14M20,8H17.19C16.74,7.22 16.12,6.55 15.37,6.04L17,4.41L15.59,3L13.42,5.17C12.96,5.06 12.5,5 12,5C11.5,5 11.04,5.06 10.59,5.17L8.41,3L7,4.41L8.62,6.04C7.88,6.55 7.26,7.22 6.81,8H4V10H6.09C6.04,10.33 6,10.66 6,11V12H4V14H6V15C6,15.34 6.04,15.67 6.09,16H4V18H6.81C7.85,19.79 9.78,21 12,21C14.22,21 16.15,19.79 17.19,18H20V16H17.91C17.96,15.67 18,15.34 18,15V14H20V12H18V11C18,10.66 17.96,10.33 17.91,10H20V8Z"}></ha-svg-icon>
            Debug
          </div>
          <div class="menu-divider"></div>
          <div
            class="menu-item ${e({ warning: !this.is_new })}"
            ?disabled=${this.is_new}
            @click=${this._deleteConfirm}
          >
            <ha-svg-icon .path=${mdiDelete}></ha-svg-icon>
            Delete
          </div>
        </switch-manager-menu>
      </div>

      <div class="view">
        <div>
          ${this.config.custom_image === "" ? A : b `<img src="${this.config.custom_image}" id="custom-image">`}
          ${hasError ? A : b `<h3 id="blueprint-name">${this.blueprint?.service} / ${this.blueprint?.name}</h3>`}
        </div>

        <div id="switch-image" rotate="${this.config.rotate}">
          ${!this.blueprint || this.blueprint?.has_image
            ? b `<svg id="switch-svg"></svg>`
            : b `<ha-svg-icon .path=${mdiSwitchIcon}></ha-svg-icon>`}
        </div>

          ${hasError ? A : b `
            <switch-manager-button-actions
              .hass=${this.hass}
              .blueprint_actions=${this.blueprint?.buttons[this.button_index]?.actions}
              .config_actions=${this.config.buttons[this.button_index]?.actions}
              .index=${this.action_index}
              @changed=${this._actionChanged}
            ></switch-manager-button-actions>
          `}

          <ha-card outlined>
            <div class="card-content">
              ${this._errors
            ? b `
                    <ha-alert alert-type="error">
                      ${this._errors}
                      ${this.config.is_mismatch
                ? b `<button slot="action" class="alert-action" @click=${this._fixMismatch}>Fix</button>`
                : ""}
                    </ha-alert>
                  `
            : ""}
              ${this.config && !this.config.enabled
            ? b `
                    <ha-alert alert-type="info">
                      Switch is disabled
                      <button slot="action" class="alert-action" @click=${this._toggleEnabled}>Enable</button>
                    </ha-alert>
                  `
            : ""}
              ${hasError ? A : b `
                <div id="sequence-container">
                  <div class="header">
                    <h2 id="sequence-heading" class="name">
                      Sequence
                      <ha-selector-select
                        id="mode-selector"
                        .hass=${this.hass}
                        .value=${this.config?.buttons[this.button_index]?.actions[this.action_index]?.mode}
                        label="Mode"
                        .selector=${{
            select: {
                mode: "dropdown",
                options: SCRIPT_MODES.map((m) => ({
                    label: m.charAt(0).toUpperCase() + m.slice(1),
                    value: m,
                })),
            },
        }}
                        @value-changed=${this._modeValueChanged}
                      ></ha-selector-select>
                    </h2>
                    <switch-manager-menu align="left">
                      <div class="menu-item" @click=${this._toggleYaml}>
                        <ha-svg-icon .path=${this._is_yaml
            ? "M21 13.1C20.9 13.1 20.7 13.2 20.6 13.3L19.6 14.3L21.7 16.4L22.7 15.4C22.9 15.2 22.9 14.8 22.7 14.6L21.4 13.3C21.3 13.2 21.2 13.1 21 13.1M19.1 14.9L13 20.9V23H15.1L21.2 16.9L19.1 14.9M21 3H13V9H21V3M19 7H15V5H19V7M13 18.06V11H21V11.1C20.24 11.1 19.57 11.5 19.19 11.89L18.07 13H15V16.07L13 18.06M11 3H3V13H11V3M9 11H5V5H9V11M11 20.06V15H3V21H11V20.06M9 19H5V17H9V19Z"
            : "M8,12H16V14H8V12M10,20H6V4H13V9H18V12.1L20,10.1V8L14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H10V20M8,18H12.1L13,17.1V16H8V18M20.2,13C20.3,13 20.5,13.1 20.6,13.2L21.9,14.5C22.1,14.7 22.1,15.1 21.9,15.3L20.9,16.3L18.8,14.2L19.8,13.2C19.9,13.1 20,13 20.2,13M20.2,16.9L14.1,23H12V20.9L18.1,14.8L20.2,16.9Z"}></ha-svg-icon>
                        ${this._is_yaml ? "Visual Editor" : "Yaml Editor"}
                      </div>
                    </switch-manager-menu>
                  </div>
                  ${this._is_yaml
            ? b `<ha-yaml-editor
                        .hass=${this.hass}
                        .value=${this.sequence}
                        @value-changed=${this._configSequenceChanged}
                      ></ha-yaml-editor>`
            : b `<ha-automation-action
                        .hass=${this.hass}
                        role="region"
                        aria-labelledby="sequence-heading"
                        .actions=${this.sequence}
                        @value-changed=${this._configSequenceChanged}
                        .narrow=${this.narrow}
                        .disabled=${this.disabled}
                      ></ha-automation-action>`}
                </div>
              `}
            </div>
          </ha-card>

          ${hasError ? A : b `
            <div class="fab-container">
              <ha-fab
                slot="fab"
                .label=${"Save"}
                extended
                collapse
                @click=${this._save}
                class=${e({ dirty: this._dirty, blocked: this._block_save })}
              >
                <ha-svg-icon slot="icon" .path=${mdiSave}></ha-svg-icon>
              </ha-fab>
            </div>
          `}
        </div>
    `;
    }
    connectedCallback() {
        super.connectedCallback();
        this._loadConfig();
        this._startListeners();
    }
    disconnectedCallback() {
        this._killListener("_reloadListener");
        this._killListener("_subscribedMonitor");
        super.disconnectedCallback();
    }
    _killListener(name) {
        if (this[name]) {
            this[name]();
            this[name] = undefined;
            return true;
        }
        return false;
    }
    async _startListeners() {
        this._reloadListener = await this.hass.connection.subscribeEvents((event) => {
            if (event.data.domain === "switch_manager" &&
                event.data.service === "reload") {
                this._loadConfig();
            }
        }, "call_service");
    }
    _loadConfig() {
        if ("id" in this.params) {
            this.is_new = false;
            this.hass
                .callWS({
                type: wsType("configs"),
                config_id: this.params.id,
            })
                .then((res) => this._setConfig(res.config));
        }
        else {
            this.is_new = true;
            this._dirty = true;
            if ("blueprint" in this.params) {
                this._loadBlueprint(this.params.blueprint).then((res) => {
                    this._setConfig(createEmptyConfig(res.blueprint));
                    this._showRenameDialog();
                });
            }
        }
    }
    _loadBlueprint(id) {
        return this.hass.callWS({
            type: wsType("blueprints"),
            blueprint_id: id,
        });
    }
    _setConfig(config) {
        this.config = config;
        if (config._error) {
            this._errors = config._error;
            this._block_save = true;
            return;
        }
        this._setBlueprint(config.blueprint);
        this._updateSequence();
        this._monitor();
    }
    async _monitor() {
        if (this.is_new)
            return;
        this._killListener("_subscribedMonitor");
        this._subscribedMonitor = await this.hass.connection.subscribeMessage((msg) => {
            if (msg.event === "action_triggered") {
                if (!this.config?.identifier)
                    return;
                if (msg.button === this.button_index &&
                    (this.blueprint?.buttons[this.button_index]?.actions.length ?? 0) >
                        1) {
                    this.button_actions.flash(msg.action);
                }
                if (this.blueprint?.buttons?.length === 1) {
                    showToast(this, "Button Pressed");
                    return;
                }
                const rect = this.svg?.querySelector(`[index="${msg.button}"]`);
                if (rect) {
                    rect.removeAttribute("pressed");
                    rect.setAttribute("pressed", "");
                    setTimeout(() => rect.removeAttribute("pressed"), 1000);
                }
            }
            if ((msg.event === "incoming" || msg.event === "action_triggered") &&
                this._debug) {
                console.log(msg);
            }
        }, { type: wsType("config/monitor"), config_id: this.config.id });
    }
    _setBlueprint(blueprint) {
        this.blueprint = blueprint;
        this.requestUpdate();
        this._drawSVG();
    }
    async _drawSVG() {
        if (!this.blueprint?.has_image)
            return;
        await this.updateComplete;
        // Reset SVG
        const oldSvg = this.svg;
        if (oldSvg) {
            const newSvg = oldSvg.cloneNode(false);
            oldSvg.parentNode.replaceChild(newSvg, oldSvg);
        }
        const img = new Image();
        img.src = assetUrl(`${this.blueprint.id}.png`);
        img.onload = () => {
            const svg = this.svg;
            if (!svg)
                return;
            svg.setAttributeNS(null, "viewBox", `0 0 ${img.width} ${img.height}`);
            const svgImg = document.createElementNS("http://www.w3.org/2000/svg", "image");
            svgImg.setAttributeNS(null, "x", "0");
            svgImg.setAttributeNS(null, "y", "0");
            svgImg.setAttributeNS(null, "width", img.width.toString());
            svgImg.setAttributeNS(null, "height", img.height.toString());
            svgImg.setAttributeNS("http://www.w3.org/1999/xlink", "href", img.src);
            svgImg.setAttributeNS(null, "visibility", "visible");
            svg.prepend(svgImg);
        };
        if (this.blueprint.buttons.length > 1) {
            this.blueprint.buttons.forEach((btn, idx) => {
                let el;
                if (btn.x > -1 && btn.y > -1 && btn.width > 0 && btn.height > 0) {
                    el = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                    el.setAttributeNS(null, "x", btn.x.toString());
                    el.setAttributeNS(null, "y", btn.y.toString());
                    el.setAttributeNS(null, "width", btn.width.toString());
                    el.setAttributeNS(null, "height", btn.height.toString());
                }
                else if (btn.x > -1 && btn.y > -1 && btn.width > 0) {
                    el = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                    el.setAttributeNS(null, "cx", btn.x.toString());
                    el.setAttributeNS(null, "cy", btn.y.toString());
                    el.setAttributeNS(null, "r", btn.width.toString());
                }
                else if (btn.d) {
                    el = document.createElementNS("http://www.w3.org/2000/svg", "path");
                    el.setAttributeNS(null, "d", btn.d.toString());
                }
                else {
                    return;
                }
                el.setAttribute("class", "button");
                el.setAttribute("index", idx.toString());
                if (this.button_index === idx)
                    el.setAttribute("selected", "");
                if (!this._buttonTotalSequence(this.config.buttons[idx])) {
                    el.setAttribute("empty", "");
                }
                el.addEventListener("click", (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this._setButtonIndex(parseInt(e.target.getAttribute("index")));
                });
                this.svg?.append(el);
            });
        }
    }
    _buttonTotalSequence(button) {
        let total = 0;
        button.actions.forEach((a) => (total += a.sequence.length));
        return total;
    }
    _updateSequence(newSequence) {
        if (newSequence) {
            this.config.buttons[this.button_index].actions[this.action_index].sequence = newSequence;
        }
        this.sequence = [
            ...(this.config?.buttons[this.button_index]?.actions[this.action_index]
                ?.sequence || []),
        ];
    }
    _validate() {
        this._errors = undefined;
        if (!this.config?.identifier) {
            // Opened from the save flow: once an identifier is set, continue the
            // interrupted save so it is actually persisted (fixes the popup
            // re-appearing on every save when the stored identifier is empty).
            this._showIdentifierAutoDiscoveryDialog(true);
            return false;
        }
        return true;
    }
    _save() {
        if (this._block_save || !this._validate() || !this.config || this.config._error)
            return;
        this._block_save = true;
        this._dirty = false;
        this.hass
            .callWS({
            type: wsType("config/save"),
            config: {
                ...this.config,
                blueprint: this.config.blueprint.id,
            },
        })
            .then((res) => {
            if (this.is_new) {
                this.is_new = false;
                this.config.id = res.config_id;
                navigate(navigateTo(`edit/${res.config_id}`));
                this._monitor();
            }
            showToast(this, "Switch Saved");
        })
            .catch((err) => {
            showToast(this, err.message);
            this._errors = err.message;
            this._dirty = true;
        })
            .finally(() => (this._block_save = false));
    }
    _backTapped() {
        navigate(navigateTo());
    }
    _actionChanged(e) {
        this._setActionIndex(e.detail.index);
    }
    _setButtonIndex(idx) {
        if (idx !== this.button_index) {
            this.button_index = idx;
            this.svg?.querySelector("[selected]")?.removeAttribute("selected");
            this.svg?.querySelector(`[index="${idx}"]`)?.setAttribute("selected", "");
            this._setActionIndex(0);
        }
    }
    _setActionIndex(idx) {
        this.action_index = idx;
        this._updateSequence();
        if (this._is_yaml)
            this._yamlEditor?.setValue(this.sequence);
    }
    _configSequenceChanged(e) {
        let value = e.detail.value;
        if (this._is_yaml && (!value || !Array.isArray(value))) {
            value = [];
        }
        this.requestUpdate("config");
        this._updateSequence(value);
        this._errors = undefined;
        this._dirty = true;
    }
    _rotate() {
        this.config.rotate = this.config.rotate >= 3 ? 0 : this.config.rotate + 1;
        this.requestUpdate("config");
        this._dirty = true;
    }
    _toggleDebug() {
        this._debug = !this._debug;
        showToast(this, `Debug ${this._debug ? "Enabled. View dev console" : "Disabled"}`);
    }
    _toggleYaml() {
        this._is_yaml = !this._is_yaml;
        this.updateComplete.then(() => {
            if (this._is_yaml)
                this._yamlEditor?.setValue(this.sequence);
        });
    }
    _modeValueChanged(e) {
        const current = this.config?.buttons[this.button_index]?.actions[this.action_index]?.mode;
        if (current !== e.detail.value) {
            this.config.buttons[this.button_index].actions[this.action_index].mode = e.detail.value;
            this.requestUpdate("config");
            this._dirty = true;
        }
    }
    _toggleEnabled() {
        if (!this.config || this.is_new)
            return;
        this.config.enabled = !this.config.enabled;
        this.hass.callWS({
            type: wsType("config/enabled"),
            enabled: this.config.enabled,
            config_id: this.config.id,
        });
        this.requestUpdate("config");
    }
    _fixMismatch() {
        if (!this.config)
            return;
        this.hass
            .callWS({
            type: wsType("config/save"),
            config: { ...this.config, blueprint: this.config.blueprint.id },
            fix_mismatch: true,
        })
            .then((res) => {
            // The backend reshapes the buttons to the blueprint, so adopt the config it
            // returns instead of keeping the mismatched one around - otherwise the editor
            // stays blank and the error comes back on the next load.
            this._errors = undefined;
            this._block_save = false;
            this.button_index = 0;
            this.action_index = 0;
            this._setConfig(res.config);
            showToast(this, "Mismatch Fixed");
        })
            .catch((err) => {
            this._errors = err.message;
            showToast(this, err.message);
        });
    }
    _deleteConfirm() {
        if (this.is_new)
            return;
        showDialog(this, "switch-manager-dialog-confirm", () => Promise.resolve().then(function () { return confirm; }), {
            title: "Delete switch?",
            text: `${this.config?.name} will be permanently deleted.`,
            confirmText: "Delete",
            dismissText: "Cancel",
            confirm: () => {
                this.hass
                    .callWS({ type: wsType("config/delete"), config_id: this.config.id.toString() })
                    .then(() => navigate(navigateTo()));
            },
            confirmation: true,
            destructive: true,
        });
    }
    _showIdentifierAutoDiscoveryDialog(continueSave = false) {
        showDialog(this, "switch-manager-dialog-identifier-auto-discovery", () => Promise.resolve().then(function () { return identifierAutoDiscovery; }), {
            switch_id: this.config?.id,
            identifier: this.config?.identifier,
            blueprint: this.blueprint,
            update: (data) => {
                this.config.identifier = data.identifier;
                this._dirty = true;
                this.requestUpdate();
                // When the dialog interrupted a save (missing identifier), persist
                // immediately instead of forcing the user to press Save again.
                if (continueSave && data.identifier)
                    this._save();
            },
            onClose: () => { },
        });
    }
    _showRenameDialog() {
        showDialog(this, "switch-manager-dialog-rename-switch", () => Promise.resolve().then(function () { return renameSwitch; }), {
            config: this.config,
            update: (data) => {
                this.config.name = data.name;
                this._dirty = true;
                this.requestUpdate();
            },
            onClose: () => {
                if (this.is_new)
                    this._showIdentifierAutoDiscoveryDialog();
            },
        });
    }
    _showCopyFromDialog() {
        showDialog(this, "switch-manager-dialog-copy-from", () => Promise.resolve().then(function () { return copyFrom; }), {
            blueprint_id: this.config?.blueprint?.id,
            current_switch_id: this.config?.id,
            update: (data) => {
                this.config.buttons = data.buttons;
                if (data.variables !== false)
                    this.config.variables = data.variables;
                this._dirty = true;
                this._updateSequence();
                this._drawSVG();
            },
            onClose: () => { },
        });
    }
    _showVariablesEditorDialog() {
        showDialog(this, "switch-manager-dialog-variables-editor", () => Promise.resolve().then(function () { return variablesEditor; }), {
            config: this.config,
            update: (data) => {
                this.config.variables = data.variables;
                this._dirty = true;
                this.requestUpdate();
            },
            onClose: () => { },
        });
    }
    static { this.styles = i$4 `
    @keyframes pressed {
      to {
        fill: #3ff17975;
        stroke: #00e903;
      }
    }
    :host {
      --max-width: 1040px;
    }
    .toolbar {
      display: flex;
      align-items: center;
      height: var(--header-height, 56px);
      box-sizing: border-box;
      padding: 0 12px;
      background-color: var(
        --app-header-background-color,
        var(--app-header-background-color, var(--primary-color))
      );
      color: var(--app-header-text-color, var(--text-primary-color, #fff));
      font-size: 20px;
      font-weight: 400;
      position: sticky;
      top: 0;
      z-index: 5;
    }
    .toolbar .main-title {
      flex: 1;
      margin: 0 16px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .menu-item ha-svg-icon {
      color: var(--secondary-text-color);
    }
    .menu-item.warning,
    .menu-item.warning ha-svg-icon {
      color: var(--error-color, #db4437);
    }
    .alert-action {
      background: none;
      border: none;
      cursor: pointer;
      font: inherit;
      text-transform: uppercase;
      font-weight: 500;
      color: var(--primary-color);
      padding: 8px 12px;
    }
    ha-card {
      margin: 0 auto;
      max-width: var(--max-width);
      --mdc-select-fill-color: transparent;
    }
    switch-manager-button-actions {
      max-width: var(--max-width);
      margin: 0 auto;
    }
    h3 {
      padding-left: 25px;
    }
    .view {
      height: calc(100vh - var(--header-height, 56px));
      display: block;
      overflow-y: auto;
      padding-bottom: 3em;
      box-sizing: border-box;
    }
    .header {
      display: flex;
      align-items: center;
    }
    .header:first-child {
      margin-top: -16px;
    }
    .header .name {
      font-size: 20px;
      font-weight: 400;
      flex: 1;
      margin-top: 0;
    }
    #switch-image {
      max-height: 380px;
      display: flex;
      margin: 1em;
      justify-content: center;
    }
    #switch-image[rotate="1"] svg {
      rotate: 90deg;
      max-width: 380px;
    }
    #switch-image[rotate="2"] svg {
      rotate: 180deg;
    }
    #switch-image[rotate="3"] svg {
      rotate: 270deg;
      max-width: 380px;
    }
    #sequence-container {
      padding: 28px 20px 0;
    }
    #mode-selector {
      display: inline-block;
      margin-left: 20px;
    }
    #switch-image > svg {
      overflow: visible;
      max-width: 800px;
    }
    #switch-image ha-svg-icon {
      fill: var(--primary-color);
      width: 260px;
      height: 260px;
    }
    #switch-image svg image {
      filter: drop-shadow(0px 0px 8px #00000033);
    }
    #switch-image svg .button {
      fill: #00000000;
      stroke: #00adff3d;
      stroke-width: 3;
      cursor: pointer;
    }
    #switch-image svg .button[empty] {
      fill: #cfcfcf66;
    }
    #switch-image svg .button[selected] {
      fill: #6bd3ff75;
      stroke: #0082e9;
    }
    #switch-image svg .button[pressed] {
      animation: 0.4s pressed;
      animation-iteration-count: 2;
      animation-direction: alternate;
    }
    .warning {
      color: var(--error-color);
    }
    .fab-container {
      position: fixed;
      right: 0;
      bottom: 0;
      overflow: hidden;
      padding: 1.2em;
      z-index: 1;
    }
    ha-fab {
      position: relative;
    }
    ha-fab[collapse] {
      bottom: calc(-80px - env(safe-area-inset-bottom));
      transition: bottom 0.3s;
    }
    ha-fab.dirty {
      bottom: 0;
    }
    ha-fab.blocked {
      bottom: calc(-80px - env(safe-area-inset-bottom));
    }
    
    #custom-image {
      object-fit: cover;
      float: left;
      padding: 12px;
      vertical-align: middle;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      margin-right: 16px;
    }
  `; }
};
__decorate([
    n({ attribute: false })
], SwitchManagerSwitchEditor.prototype, "hass", void 0);
__decorate([
    n({ type: Boolean })
], SwitchManagerSwitchEditor.prototype, "narrow", void 0);
__decorate([
    n({ attribute: false })
], SwitchManagerSwitchEditor.prototype, "panel", void 0);
__decorate([
    n({ attribute: false })
], SwitchManagerSwitchEditor.prototype, "route", void 0);
__decorate([
    n({ attribute: false })
], SwitchManagerSwitchEditor.prototype, "params", void 0);
__decorate([
    n({ attribute: false })
], SwitchManagerSwitchEditor.prototype, "blueprint", void 0);
__decorate([
    n({ attribute: false })
], SwitchManagerSwitchEditor.prototype, "config", void 0);
__decorate([
    n({ type: Boolean })
], SwitchManagerSwitchEditor.prototype, "disabled", void 0);
__decorate([
    r()
], SwitchManagerSwitchEditor.prototype, "_subscribedMonitor", void 0);
__decorate([
    r()
], SwitchManagerSwitchEditor.prototype, "_reloadListener", void 0);
__decorate([
    r()
], SwitchManagerSwitchEditor.prototype, "sequence", void 0);
__decorate([
    r()
], SwitchManagerSwitchEditor.prototype, "button_index", void 0);
__decorate([
    r()
], SwitchManagerSwitchEditor.prototype, "action_index", void 0);
__decorate([
    r()
], SwitchManagerSwitchEditor.prototype, "is_new", void 0);
__decorate([
    r()
], SwitchManagerSwitchEditor.prototype, "_is_yaml", void 0);
__decorate([
    r()
], SwitchManagerSwitchEditor.prototype, "_dirty", void 0);
__decorate([
    r()
], SwitchManagerSwitchEditor.prototype, "_debug", void 0);
__decorate([
    r()
], SwitchManagerSwitchEditor.prototype, "_block_save", void 0);
__decorate([
    r()
], SwitchManagerSwitchEditor.prototype, "_errors", void 0);
__decorate([
    e$2("#switch-svg")
], SwitchManagerSwitchEditor.prototype, "svg", void 0);
__decorate([
    e$2("switch-manager-button-actions")
], SwitchManagerSwitchEditor.prototype, "button_actions", void 0);
__decorate([
    e$2("ha-yaml-editor")
], SwitchManagerSwitchEditor.prototype, "_yamlEditor", void 0);
SwitchManagerSwitchEditor = __decorate([
    t$1("switch-manager-switch-editor")
], SwitchManagerSwitchEditor);

// HA runtime components the panel + action editor depend on. loadHaComponents()
// drives HA's config/automation route loader, which transitively registers the
// whole selector/service-control tree the editor needs (so they match the live
// hass instead of being frozen in our bundle).
const HA_COMPONENTS = [
    "ha-automation-action",
    "ha-service-control",
    "ha-selector",
    "ha-yaml-editor",
    "ha-card",
    "ha-fab",
    "ha-alert",
    "ha-svg-icon",
    "ha-icon-button",
    "ha-menu-button",
];
let SwitchManagerPanel = class SwitchManagerPanel extends i$1 {
    constructor() {
        super(...arguments);
        this.narrow = false;
        this._params = {};
        this._componentsLoaded = false;
    }
    set route(route) {
        this._route = route;
        const parts = route.path.split("/");
        if (parts[1] === "new") {
            this._params = { action: "new", blueprint: parts[2] };
        }
        else if (parts[1] === "edit") {
            this._params = { action: "edit", id: parts[2] };
        }
        else {
            this._params = {};
        }
    }
    get route() {
        return this._route;
    }
    render() {
        if (!this._componentsLoaded) {
            return b `<div class="loading">Loading…</div>`;
        }
        if ("action" in this._params) {
            return b `
        <switch-manager-switch-editor
          .hass=${this.hass}
          .narrow=${this.narrow}
          .route=${this._route}
          .panel=${this.panel}
          .params=${this._params}
        ></switch-manager-switch-editor>
      `;
        }
        return b `
      <switch-manager-index
        .hass=${this.hass}
        .narrow=${this.narrow}
        .route=${this._route}
        .panel=${this.panel}
      ></switch-manager-index>
    `;
    }
    async firstUpdated() {
        this.hass.loadFragmentTranslation("config");
        this.hass.loadBackendTranslation("title");
        this.hass.loadBackendTranslation("device_automation");
        this.hass.loadBackendTranslation("config");
        // Backend translations the selector/service-control tree needs to resolve
        // entity states, services and selector labels (without these the Option
        // dropdown and Targets stay empty).
        this.hass.loadBackendTranslation("services");
        this.hass.loadBackendTranslation("selector");
        this.hass.loadBackendTranslation("entity_component");
        this._applyTheme();
        try {
            await loadHaComponents(HA_COMPONENTS);
        }
        catch (err) {
            // Non-fatal: log and continue so the panel still renders.
            console.error("switch_manager: loadHaComponents failed", err);
        }
        this._componentsLoaded = true;
    }
    updated(changedProps) {
        super.updated(changedProps);
        const oldHass = changedProps.get("hass");
        if (oldHass && oldHass.themes !== this.hass.themes) {
            this._applyTheme();
        }
    }
    provideHass(el) {
        el.hass = this.hass;
    }
    _applyTheme() {
        this.style.backgroundColor = "var(--primary-background-color)";
        this.style.color = "var(--primary-text-color)";
        this.style.fontFamily =
            "var(--mdc-typography-headline6-font-family, var(--mdc-typography-font-family, Roboto, sans-serif))";
    }
    static { this.styles = i$4 `
    :host {
      display: block;
    }
    .loading {
      padding: 24px;
      color: var(--secondary-text-color);
    }
  `; }
};
__decorate([
    n({ attribute: false })
], SwitchManagerPanel.prototype, "hass", void 0);
__decorate([
    n({ type: Boolean })
], SwitchManagerPanel.prototype, "narrow", void 0);
__decorate([
    n({ attribute: false })
], SwitchManagerPanel.prototype, "panel", void 0);
__decorate([
    r()
], SwitchManagerPanel.prototype, "_params", void 0);
__decorate([
    r()
], SwitchManagerPanel.prototype, "_componentsLoaded", void 0);
__decorate([
    n({ attribute: false })
], SwitchManagerPanel.prototype, "route", null);
SwitchManagerPanel = __decorate([
    t$1("switch-manager-panel")
], SwitchManagerPanel);

let SwitchManagerDialogConfirm = class SwitchManagerDialogConfirm extends i$1 {
    showDialog(params) {
        this._params = params;
    }
    closeDialog() {
        this._params = undefined;
    }
    render() {
        if (!this._params)
            return b ``;
        return b `
      <switch-manager-dialog
        @closed=${this._dismiss}
        .heading=${this._params.title || "Confirm"}
      >
        <div>${this._params.text || ""}</div>
        ${this._params.prompt
            ? b `<input
              id="prompt-input"
              class="text-input"
              type="text"
              .value=${this._params.promptValue || ""}
            />`
            : ""}
        <button slot="actions" @click=${this._dismiss}>
          ${this._params.dismissText || "Cancel"}
        </button>
        <button
          slot="actions"
          @click=${this._confirm}
          class=${this._params.destructive ? "destructive" : ""}
        >
          ${this._params.confirmText || "OK"}
        </button>
      </switch-manager-dialog>
    `;
    }
    _dismiss() {
        this._params?.cancel?.();
        this.closeDialog();
    }
    _confirm() {
        this._params?.confirm?.();
        this.closeDialog();
    }
    static { this.styles = i$4 `
    .text-input {
      width: 100%;
      box-sizing: border-box;
      margin-top: 8px;
      padding: 10px 12px;
      border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.3));
      border-radius: 6px;
      background: var(--secondary-background-color, transparent);
      color: var(--primary-text-color);
      font: inherit;
    }
  `; }
};
__decorate([
    r()
], SwitchManagerDialogConfirm.prototype, "_params", void 0);
SwitchManagerDialogConfirm = __decorate([
    t$1("switch-manager-dialog-confirm")
], SwitchManagerDialogConfirm);

var confirm = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get SwitchManagerDialogConfirm () { return SwitchManagerDialogConfirm; }
});

let SwitchManagerDialogIdentifierAutoDiscovery = class SwitchManagerDialogIdentifierAutoDiscovery extends i$1 {
    constructor() {
        super(...arguments);
        this._identifier = "";
        this._discovered = [];
        this._listening = false;
    }
    showDialog(params) {
        this._params = params;
        this._identifier = params.identifier || "";
        this._discovered = [];
        this.hass =
            this.parentElement?.hass ||
                document.querySelector("home-assistant")?.hass;
        this._startDiscovery();
    }
    closeDialog() {
        this._stopDiscovery();
        this._params?.onClose?.();
        this._params = undefined;
    }
    async _startDiscovery() {
        const blueprint = this._params.blueprint;
        if (!blueprint)
            return;
        this._listening = true;
        try {
            this._unsubscribe = await this.hass.connection.subscribeMessage((msg) => {
                if (msg.identifier &&
                    !this._discovered.some((d) => d.identifier === msg.identifier)) {
                    this._discovered = [
                        ...this._discovered,
                        { identifier: msg.identifier, name: msg.name },
                    ];
                }
            }, {
                type: wsType("blueprints/auto_discovery"),
                blueprint_id: blueprint.id,
            });
        }
        catch {
            this._listening = false;
        }
    }
    _stopDiscovery() {
        this._unsubscribe?.();
        this._unsubscribe = undefined;
        this._listening = false;
    }
    render() {
        if (!this._params)
            return b ``;
        return b `
      <switch-manager-dialog
        @closed=${this.closeDialog}
        heading="Switch Identifier"
      >
        <div class="content">
          <input
            class="text-input"
            type="text"
            placeholder="Identifier"
            .value=${this._identifier}
            @input=${(e) => (this._identifier = e.target.value)}
          />

          ${this._params.blueprint?.event_type === "event_entity"
            ? b `<div class="identifier-ref">
                Identifier is the Home Assistant <b>device id</b> of the remote;
                its <code>event.*</code> entities are used.
                |
                <a href="/config/devices/dashboard" target="_blank" rel="noreferrer"
                  >Devices</a
                >
              </div>`
            : this._params.blueprint?.mqtt_topic_format
                ? b `<div class="identifier-ref">
                MQTT Discovery Topic:
                <b>${this._params.blueprint.mqtt_topic_format}</b>
                |
                <a href="/config/mqtt" target="_blank" rel="noreferrer"
                  >MQTT Tool</a
                >
              </div>`
                : this._params.blueprint?.event_type
                    ? b `<div class="identifier-ref">
                Event Type: <b>${this._params.blueprint.event_type}</b>
                |
                <a href="/developer-tools/event" target="_blank" rel="noreferrer"
                  >Event Tool</a
                >
              </div>`
                    : ""}

          ${this._listening
            ? b `
                <div class="discovery">
                  <p>
                    Press a button on your switch to auto-discover its
                    identifier...
                  </p>
                  <div class="spinner"></div>
                  ${this._discovered.length
                ? b `
                        <div class="discovered-list">
                          ${this._discovered.map((d) => b `
                              <div
                                class="list-item"
                                @click=${() => this._selectIdentifier(d.identifier)}
                              >
                                ${d.name
                    ? b `<b>${d.name}</b>
                                      <span class="list-item-sub">${d.identifier}</span>`
                    : d.identifier}
                              </div>
                            `)}
                        </div>
                      `
                : ""}
                </div>
              `
            : ""}
        </div>
        <button slot="actions" @click=${this.closeDialog}>Cancel</button>
        <button slot="actions" @click=${this._save}>Save</button>
      </switch-manager-dialog>
    `;
    }
    _selectIdentifier(id) {
        this._identifier = id;
    }
    _save() {
        this._params?.update?.({ identifier: this._identifier });
        this.closeDialog();
    }
    static { this.styles = i$4 `
    .content {
      min-width: 300px;
    }
    .text-input {
      width: 100%;
      box-sizing: border-box;
      padding: 10px 12px;
      border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.3));
      border-radius: 6px;
      background: var(--secondary-background-color, transparent);
      color: var(--primary-text-color);
      font: inherit;
    }
    .text-input:focus {
      outline: none;
      border-color: var(--primary-color);
    }
    .identifier-ref {
      margin-top: 16px;
      font-size: 0.9em;
      color: var(--secondary-text-color);
    }
    .identifier-ref a {
      color: var(--primary-color);
    }
    .discovery {
      margin-top: 16px;
      text-align: center;
    }
    .discovered-list {
      margin-top: 8px;
      text-align: left;
    }
    .list-item {
      cursor: pointer;
      padding: 12px 8px;
      border-radius: 4px;
    }
    .list-item-sub {
      display: block;
      font-size: 0.8em;
      color: var(--secondary-text-color);
      word-break: break-all;
    }
    .list-item:hover {
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.1));
    }
    .spinner {
      width: 32px;
      height: 32px;
      margin: 12px auto;
      border: 3px solid var(--divider-color, rgba(127, 127, 127, 0.3));
      border-top-color: var(--primary-color);
      border-radius: 50%;
      animation: spin 0.9s linear infinite;
    }
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `; }
};
__decorate([
    r()
], SwitchManagerDialogIdentifierAutoDiscovery.prototype, "_params", void 0);
__decorate([
    r()
], SwitchManagerDialogIdentifierAutoDiscovery.prototype, "_identifier", void 0);
__decorate([
    r()
], SwitchManagerDialogIdentifierAutoDiscovery.prototype, "_discovered", void 0);
__decorate([
    r()
], SwitchManagerDialogIdentifierAutoDiscovery.prototype, "_listening", void 0);
SwitchManagerDialogIdentifierAutoDiscovery = __decorate([
    t$1("switch-manager-dialog-identifier-auto-discovery")
], SwitchManagerDialogIdentifierAutoDiscovery);

var identifierAutoDiscovery = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get SwitchManagerDialogIdentifierAutoDiscovery () { return SwitchManagerDialogIdentifierAutoDiscovery; }
});

let SwitchManagerDialogRenameSwitch = class SwitchManagerDialogRenameSwitch extends i$1 {
    constructor() {
        super(...arguments);
        this._name = "";
    }
    showDialog(params) {
        this._params = params;
        this._name = params.config?.name || "";
    }
    closeDialog() {
        this._params?.onClose?.();
        this._params = undefined;
    }
    render() {
        if (!this._params)
            return b ``;
        return b `
      <switch-manager-dialog @closed=${this.closeDialog} heading="Rename Switch">
        <input
          class="text-input"
          type="text"
          placeholder="Name"
          .value=${this._name}
          autofocus
          @input=${(e) => (this._name = e.target.value)}
        />
        <button slot="actions" @click=${this.closeDialog}>Cancel</button>
        <button slot="actions" @click=${this._save}>Save</button>
      </switch-manager-dialog>
    `;
    }
    _save() {
        if (this._name.trim()) {
            this._params?.update?.({ name: this._name.trim() });
        }
        this.closeDialog();
    }
    static { this.styles = i$4 `
    .text-input {
      width: 100%;
      box-sizing: border-box;
      padding: 10px 12px;
      border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.3));
      border-radius: 6px;
      background: var(--secondary-background-color, transparent);
      color: var(--primary-text-color);
      font: inherit;
    }
    .text-input:focus {
      outline: none;
      border-color: var(--primary-color);
    }
  `; }
};
__decorate([
    r()
], SwitchManagerDialogRenameSwitch.prototype, "_params", void 0);
__decorate([
    r()
], SwitchManagerDialogRenameSwitch.prototype, "_name", void 0);
SwitchManagerDialogRenameSwitch = __decorate([
    t$1("switch-manager-dialog-rename-switch")
], SwitchManagerDialogRenameSwitch);

var renameSwitch = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get SwitchManagerDialogRenameSwitch () { return SwitchManagerDialogRenameSwitch; }
});

let SwitchManagerDialogCopyFrom = class SwitchManagerDialogCopyFrom extends i$1 {
    constructor() {
        super(...arguments);
        this._switches = [];
        this._copyVariables = true;
    }
    showDialog(params) {
        this._params = params;
        this.hass =
            this.parentElement?.hass ||
                document.querySelector("home-assistant")?.hass;
        this._loadSwitches();
    }
    closeDialog() {
        this._params?.onClose?.();
        this._params = undefined;
        this._switches = [];
    }
    async _loadSwitches() {
        const res = await this.hass.callWS({
            type: wsType("copy_from_list"),
            blueprint_id: this._params.blueprint_id,
            skip_config_id: this._params.current_switch_id || "",
        });
        this._switches = res.switches;
    }
    render() {
        if (!this._params)
            return b ``;
        return b `
      <switch-manager-dialog @closed=${this.closeDialog} heading="Copy From">
        <div class="content">
          ${this._switches.length === 0
            ? b `<p>No other switches with this blueprint found.</p>`
            : b `
                <label class="checkbox">
                  <input
                    type="checkbox"
                    .checked=${this._copyVariables}
                    @change=${(e) => (this._copyVariables = e.target.checked)}
                  />
                  Copy variables
                </label>
                <div class="switch-list">
                  ${this._switches.map((sw) => b `
                      <div
                        class="list-item"
                        @click=${() => this._selectSwitch(sw)}
                      >
                        ${sw.name}
                      </div>
                    `)}
                </div>
              `}
        </div>
        <button slot="actions" @click=${this.closeDialog}>Cancel</button>
      </switch-manager-dialog>
    `;
    }
    _selectSwitch(sw) {
        this._params?.update?.({
            buttons: JSON.parse(JSON.stringify(sw.buttons)),
            variables: this._copyVariables
                ? JSON.parse(JSON.stringify(sw.variables || {}))
                : false,
        });
        this.closeDialog();
    }
    static { this.styles = i$4 `
    .content {
      min-width: 300px;
    }
    .switch-list {
      margin-top: 8px;
    }
    .list-item {
      cursor: pointer;
      padding: 12px 8px;
      border-radius: 4px;
    }
    .list-item:hover {
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.1));
    }
    .checkbox {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
      cursor: pointer;
    }
  `; }
};
__decorate([
    r()
], SwitchManagerDialogCopyFrom.prototype, "_params", void 0);
__decorate([
    r()
], SwitchManagerDialogCopyFrom.prototype, "_switches", void 0);
__decorate([
    r()
], SwitchManagerDialogCopyFrom.prototype, "_copyVariables", void 0);
SwitchManagerDialogCopyFrom = __decorate([
    t$1("switch-manager-dialog-copy-from")
], SwitchManagerDialogCopyFrom);

var copyFrom = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get SwitchManagerDialogCopyFrom () { return SwitchManagerDialogCopyFrom; }
});

let SwitchManagerDialogVariablesEditor = class SwitchManagerDialogVariablesEditor extends i$1 {
    constructor() {
        super(...arguments);
        this._variables = {};
    }
    showDialog(params) {
        this._params = params;
        this._variables = JSON.parse(JSON.stringify(params.config?.variables || {}));
        // ha-yaml-editor only picks up `value` on its own when auto-update is set, and the
        // dialog element is reused for every switch, so push the variables in by hand each
        // time it opens - otherwise the box stays empty (#57).
        this.updateComplete.then(() => this._yamlEditor?.setValue(this._variables));
    }
    closeDialog() {
        this._params?.onClose?.();
        this._params = undefined;
    }
    render() {
        if (!this._params)
            return b ``;
        return b `
      <switch-manager-dialog @closed=${this.closeDialog} heading="Variables">
        <div class="content">
          <ha-yaml-editor
            .defaultValue=${this._variables}
            @value-changed=${(e) => (this._variables = e.detail.value)}
          ></ha-yaml-editor>
        </div>
        <button slot="actions" @click=${this.closeDialog}>Cancel</button>
        <button slot="actions" @click=${this._save}>Save</button>
      </switch-manager-dialog>
    `;
    }
    _save() {
        this._params?.update?.({ variables: this._variables });
        this.closeDialog();
    }
    static { this.styles = i$4 `
    .content {
      min-width: 400px;
    }
  `; }
};
__decorate([
    r()
], SwitchManagerDialogVariablesEditor.prototype, "_params", void 0);
__decorate([
    r()
], SwitchManagerDialogVariablesEditor.prototype, "_variables", void 0);
__decorate([
    e$2("ha-yaml-editor")
], SwitchManagerDialogVariablesEditor.prototype, "_yamlEditor", void 0);
SwitchManagerDialogVariablesEditor = __decorate([
    t$1("switch-manager-dialog-variables-editor")
], SwitchManagerDialogVariablesEditor);

var variablesEditor = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get SwitchManagerDialogVariablesEditor () { return SwitchManagerDialogVariablesEditor; }
});

export { SwitchManagerPanel };
//# sourceMappingURL=switch_manager_panel.js.map
