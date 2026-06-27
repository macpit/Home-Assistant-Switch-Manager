function t(t,e,i,s){var o,r=arguments.length,n=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(r<3?o(n):r>3?o(e,i,n):o(e,i))||n);return r>3&&n&&Object.defineProperty(e,i,n),n}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),o=new WeakMap;let r=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new r(i,t,s)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:c,defineProperty:h,getOwnPropertyDescriptor:l,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,g=globalThis,_=g.trustedTypes,m=_?_.emptyScript:"",v=g.reactiveElementPolyfillSupport,b=(t,e)=>t,f={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},y=(t,e)=>!c(t,e),x={attribute:!0,type:String,converter:f,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=x){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&h(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:o}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const r=s?.call(this);o?.call(this,e),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??x}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const t=this.properties,e=[...d(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),o=e.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:f).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:f;this._$Em=s;const r=o.fromAttribute(e,t.type);this[s]=r??this._$Ej?.get(s)??r,this._$Em=null}}requestUpdate(t,e,i,s=!1,o){if(void 0!==t){const r=this.constructor;if(!1===s&&(o=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??y)(o,e)||i.useDefault&&i.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:o},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==o||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[b("elementProperties")]=new Map,w[b("finalized")]=new Map,v?.({ReactiveElement:w}),(g.reactiveElementVersions??=[]).push("2.1.2");const $=globalThis,C=t=>t,S=$.trustedTypes,A=S?S.createPolicy("lit-html",{createHTML:t=>t}):void 0,k="$lit$",H=`lit$${Math.random().toFixed(9).slice(2)}$`,E="?"+H,V=`<${E}>`,M=document,L=()=>M.createComment(""),D=t=>null===t||"object"!=typeof t&&"function"!=typeof t,T=Array.isArray,P="[ \t\n\f\r]",B=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,U=/-->/g,q=/>/g,N=RegExp(`>|${P}(?:([^\\s"'>=/]+)(${P}*=${P}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),O=/'/g,z=/"/g,R=/^(?:script|style|textarea|title)$/i,F=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),j=F(1),I=F(2),Z=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),K=new WeakMap,J=M.createTreeWalker(M,129);function G(t,e){if(!T(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(e):e}const Q=(t,e)=>{const i=t.length-1,s=[];let o,r=2===e?"<svg>":3===e?"<math>":"",n=B;for(let e=0;e<i;e++){const i=t[e];let a,c,h=-1,l=0;for(;l<i.length&&(n.lastIndex=l,c=n.exec(i),null!==c);)l=n.lastIndex,n===B?"!--"===c[1]?n=U:void 0!==c[1]?n=q:void 0!==c[2]?(R.test(c[2])&&(o=RegExp("</"+c[2],"g")),n=N):void 0!==c[3]&&(n=N):n===N?">"===c[0]?(n=o??B,h=-1):void 0===c[1]?h=-2:(h=n.lastIndex-c[2].length,a=c[1],n=void 0===c[3]?N:'"'===c[3]?z:O):n===z||n===O?n=N:n===U||n===q?n=B:(n=N,o=void 0);const d=n===N&&t[e+1].startsWith("/>")?" ":"";r+=n===B?i+V:h>=0?(s.push(a),i.slice(0,h)+k+i.slice(h)+H+d):i+H+(-2===h?e:d)}return[G(t,r+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class Y{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,r=0;const n=t.length-1,a=this.parts,[c,h]=Q(t,e);if(this.el=Y.createElement(c,i),J.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=J.nextNode())&&a.length<n;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(k)){const e=h[r++],i=s.getAttribute(t).split(H),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:o,name:n[2],strings:i,ctor:"."===n[1]?st:"?"===n[1]?ot:"@"===n[1]?rt:it}),s.removeAttribute(t)}else t.startsWith(H)&&(a.push({type:6,index:o}),s.removeAttribute(t));if(R.test(s.tagName)){const t=s.textContent.split(H),e=t.length-1;if(e>0){s.textContent=S?S.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],L()),J.nextNode(),a.push({type:2,index:++o});s.append(t[e],L())}}}else if(8===s.nodeType)if(s.data===E)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(H,t+1));)a.push({type:7,index:o}),t+=H.length-1}o++}}static createElement(t,e){const i=M.createElement("template");return i.innerHTML=t,i}}function X(t,e,i=t,s){if(e===Z)return e;let o=void 0!==s?i._$Co?.[s]:i._$Cl;const r=D(e)?void 0:e._$litDirective$;return o?.constructor!==r&&(o?._$AO?.(!1),void 0===r?o=void 0:(o=new r(t),o._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=o:i._$Cl=o),void 0!==o&&(e=X(t,o._$AS(t,e.values),o,s)),e}class tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??M).importNode(e,!0);J.currentNode=s;let o=J.nextNode(),r=0,n=0,a=i[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new et(o,o.nextSibling,this,t):1===a.type?e=new a.ctor(o,a.name,a.strings,this,t):6===a.type&&(e=new nt(o,this,t)),this._$AV.push(e),a=i[++n]}r!==a?.index&&(o=J.nextNode(),r++)}return J.currentNode=M,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class et{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=X(this,t,e),D(t)?t===W||null==t||""===t?(this._$AH!==W&&this._$AR(),this._$AH=W):t!==this._$AH&&t!==Z&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>T(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==W&&D(this._$AH)?this._$AA.nextSibling.data=t:this.T(M.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Y.createElement(G(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new tt(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=K.get(t.strings);return void 0===e&&K.set(t.strings,e=new Y(t)),e}k(t){T(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new et(this.O(L()),this.O(L()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=C(t).nextSibling;C(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class it{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,o){this.type=1,this._$AH=W,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(t,e=this,i,s){const o=this.strings;let r=!1;if(void 0===o)t=X(this,t,e,0),r=!D(t)||t!==this._$AH&&t!==Z,r&&(this._$AH=t);else{const s=t;let n,a;for(t=o[0],n=0;n<o.length-1;n++)a=X(this,s[i+n],e,n),a===Z&&(a=this._$AH[n]),r||=!D(a)||a!==this._$AH[n],a===W?t=W:t!==W&&(t+=(a??"")+o[n+1]),this._$AH[n]=a}r&&!s&&this.j(t)}j(t){t===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class st extends it{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===W?void 0:t}}class ot extends it{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==W)}}class rt extends it{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){if((t=X(this,t,e,0)??W)===Z)return;const i=this._$AH,s=t===W&&i!==W||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==W&&(i===W||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){X(this,t)}}const at=$.litHtmlPolyfillSupport;at?.(Y,et),($.litHtmlVersions??=[]).push("3.3.2");const ct=globalThis;let ht=class extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let o=s._$litPart$;if(void 0===o){const t=i?.renderBefore??null;s._$litPart$=o=new et(e.insertBefore(L(),t),t,void 0,i??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Z}};ht._$litElement$=!0,ht.finalized=!0,ct.litElementHydrateSupport?.({LitElement:ht});const lt=ct.litElementPolyfillSupport;lt?.({LitElement:ht}),(ct.litElementVersions??=[]).push("4.2.2");const dt=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},pt={attribute:!0,type:String,converter:f,reflect:!1,hasChanged:y},ut=(t=pt,e,i)=>{const{kind:s,metadata:o}=i;let r=globalThis.litPropertyMetadata.get(o);if(void 0===r&&globalThis.litPropertyMetadata.set(o,r=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),r.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const o=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,o,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const o=this[s];e.call(this,i),this.requestUpdate(s,o,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function gt(t){return(e,i)=>"object"==typeof i?ut(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function _t(t){return gt({...t,state:!0,attribute:!1})}const mt=(t,e,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,i),i);function vt(t,e){return(i,s,o)=>{const r=e=>e.renderRoot?.querySelector(t)??null;if(e){const{get:t,set:e}="object"==typeof s?i:o??(()=>{const t=Symbol();return{get(){return this[t]},set(e){this[t]=e}}})();return mt(i,s,{get(){let i=t.call(this);return void 0===i&&(i=r(this),(null!==i||this.hasUpdated)&&e.call(this,i)),i}})}return mt(i,s,{get(){return r(this)}})}}const bt=["ha-form","ha-icon","ha-icon-button","ha-selector","ha-textfield","ha-icon-picker","ha-icon-button","ha-entity-picker","ha-select","ha-dialog","ha-sortable","ha-svg-icon","ha-alert","ha-button","ha-color-picker","ha-badge","ha-sankey-chart","mwc-button"],ft="switch_manager",yt=["single","restart","queued","parallel"];function xt(t){return t?`/${ft}/${t}`:`/${ft}`}function wt(t){return`/assets/${ft}/${t}`}function $t(t){return`${ft}/${t}`}function Ct(t){history.pushState(null,"",t);const e=new Event("location-changed");window.dispatchEvent(e)}function St(t,e,i){const s=new CustomEvent(e,{bubbles:!0,composed:!0,detail:i});t.dispatchEvent(s)}function At(t,e){St(t,"hass-notification",{message:e})}function kt(t,e,i,s){St(t,"show-dialog",{dialogTag:e,dialogImport:i,dialogParams:s})}let Ht=class extends ht{constructor(){super(...arguments),this.heading="",this._onKeydown=t=>{"Escape"===t.key&&this._close()}}connectedCallback(){super.connectedCallback(),document.addEventListener("keydown",this._onKeydown)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",this._onKeydown)}render(){return j`
      <div class="backdrop" @click=${this._close}>
        <div class="surface" @click=${this._stop}>
          <div class="header">
            <span class="title">${this.heading}</span>
            <ha-icon-button
              .path=${"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"}
              label="Close"
              @click=${this._close}
            ></ha-icon-button>
          </div>
          <div class="content"><slot></slot></div>
          <div class="actions"><slot name="actions"></slot></div>
        </div>
      </div>
    `}_stop(t){t.stopPropagation()}_close(){this.dispatchEvent(new CustomEvent("closed"))}static{this.styles=n`
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
  `}};t([gt()],Ht.prototype,"heading",void 0),Ht=t([dt("switch-manager-dialog")],Ht);let Et=class extends ht{constructor(){super(...arguments),this._blueprints=[],this._filter=""}showDialog(t){this._params=t,this.hass=this.parentElement?.hass||document.querySelector("home-assistant")?.hass,this._loadBlueprints()}closeDialog(){this._params=void 0,this._blueprints=[],this._filter=""}async _loadBlueprints(){const t=await this.hass.callWS({type:$t("blueprints")});this._blueprints=Object.values(t.blueprints)}render(){if(!this._params)return j``;const t=this._filter?this._blueprints.filter(t=>t.name.toLowerCase().includes(this._filter.toLowerCase())||t.service.toLowerCase().includes(this._filter.toLowerCase())):this._blueprints;return j`
      <switch-manager-dialog @closed=${this.closeDialog} heading="Select Blueprint">
        <input
          class="search"
          type="text"
          placeholder="Search"
          .value=${this._filter}
          @input=${t=>this._filter=t.target.value}
        />
        <div class="blueprints">
          ${t.map(t=>j`
              <ha-card
                outlined
                class="blueprint-item"
                @click=${()=>this._selectBlueprint(t)}
              >
                <div class="card-content">
                  ${t.editable?j`
                        <button
                          class="edit-btn"
                          title="Edit blueprint"
                          @click=${e=>this._editBlueprint(e,t)}
                        >
                          <ha-svg-icon .path=${"M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"}></ha-svg-icon>
                        </button>
                      `:W}
                  <div class="image">
                    ${t.has_image?j`<img src="${wt(t.id+".png")}" />`:j`<ha-svg-icon
                          .path=${"M13 5C15.21 5 17 6.79 17 9C17 10.5 16.2 11.77 15 12.46V11.24C15.61 10.69 16 9.89 16 9C16 7.34 14.66 6 13 6S10 7.34 10 9C10 9.89 10.39 10.69 11 11.24V12.46C9.8 11.77 9 10.5 9 9C9 6.79 10.79 5 13 5M20 20.5C19.97 21.32 19.32 21.97 18.5 22H13C12.62 22 12.26 21.85 12 21.57L8 17.37L8.74 16.6C8.93 16.39 9.2 16.28 9.5 16.28H9.7L12 18V9C12 8.45 12.45 8 13 8S14 8.45 14 9V13.47L15.21 13.6L19.15 15.79C19.68 16.03 20 16.56 20 17.14V20.5M20 2H4C2.9 2 2 2.9 2 4V12C2 13.11 2.9 14 4 14H8V12L4 12L4 4H20L20 12H18V14H20V13.96L20.04 14C21.13 14 22 13.09 22 12V4C22 2.9 21.11 2 20 2Z"}
                        ></ha-svg-icon>`}
                  </div>
                  <div class="info">
                    <div class="name">${t.name}</div>
                    <div class="service">${t.service}</div>
                  </div>
                </div>
              </ha-card>
            `)}
        </div>
        <button slot="actions" @click=${this._createBlueprint}>Create Blueprint</button>
        <button slot="actions" @click=${this.closeDialog}>Cancel</button>
      </switch-manager-dialog>
    `}_selectBlueprint(t){this.closeDialog(),Ct(xt(`new/${t.id}`))}_createBlueprint(){this.closeDialog(),Ct(xt("blueprint/new"))}_editBlueprint(t,e){t.preventDefault(),t.stopPropagation(),this.closeDialog(),Ct(xt(`blueprint/edit/${e.id}`))}static{this.styles=n`
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
      position: relative;
    }
    .edit-btn {
      position: absolute;
      top: 4px;
      right: 4px;
      border: none;
      background: var(--secondary-background-color);
      border-radius: 50%;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      padding: 0;
      z-index: 1;
    }
    .edit-btn:hover {
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
    }
    .edit-btn ha-svg-icon {
      width: 18px;
      height: 18px;
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
    .search {
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
  `}};t([_t()],Et.prototype,"_params",void 0),t([_t()],Et.prototype,"_blueprints",void 0),t([_t()],Et.prototype,"_filter",void 0),Et=t([dt("switch-manager-dialog-blueprint-selector")],Et);var Vt=Object.freeze({__proto__:null,get SwitchManagerDialogBlueprintSelector(){return Et}});let Mt=class extends ht{constructor(){super(...arguments),this.path="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z",this.label="Menu",this.align="left",this._open=!1,this._onDocClick=t=>{t.composedPath().includes(this)||(this._open=!1)}}connectedCallback(){super.connectedCallback(),document.addEventListener("click",this._onDocClick)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._onDocClick)}render(){return j`
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
    `}_toggle(t){t.stopPropagation(),this._open=!this._open}_onSurfaceClick(t){const e=t.target.closest(".menu-item");e&&e.hasAttribute("disabled")?t.stopPropagation():this._open=!1}static{this.styles=n`
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
  `}};t([gt()],Mt.prototype,"path",void 0),t([gt()],Mt.prototype,"label",void 0),t([gt()],Mt.prototype,"align",void 0),t([_t()],Mt.prototype,"_open",void 0),Mt=t([dt("switch-manager-menu")],Mt);let Lt=class extends ht{constructor(){super(...arguments),this.narrow=!1,this._data=[],this._filter="",this._sortColumn="name",this._sortDirection="asc"}connectedCallback(){super.connectedCallback();try{const t=JSON.parse(localStorage.getItem("switchManagerSort")||"{}");t.column&&(this._sortColumn=t.column),t.direction&&(this._sortDirection=t.direction)}catch{}this._populateSwitches()}get _filteredSortedData(){let t=this._data;if(this._filter){const e=this._filter.toLowerCase();t=t.filter(t=>t.name.toLowerCase().includes(e)||t.service.toLowerCase().includes(e)||t.type.toLowerCase().includes(e))}const e=this._sortColumn,i="asc"===this._sortDirection?1:-1;return[...t].sort((t,s)=>{if("enabled"===e)return((t.enabled?1:0)-(s.enabled?1:0))*i;const o=String(t[e]||"").toLowerCase(),r=String(s[e]||"").toLowerCase();return o.localeCompare(r)*i})}_toggleSort(t){this._sortColumn===t?this._sortDirection="asc"===this._sortDirection?"desc":"asc":(this._sortColumn=t,this._sortDirection="asc"),localStorage.setItem("switchManagerSort",JSON.stringify({column:this._sortColumn,direction:this._sortDirection}))}_sortIcon(t){return this._sortColumn!==t?W:j`<ha-svg-icon
      .path=${"asc"===this._sortDirection?"M7,15L12,10L17,15H7Z":"M7,10L12,15L17,10H7Z"}
    ></ha-svg-icon>`}_getOverflowItems(t){return[{path:t.enabled?"M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4M9,9V15H15V9":"M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M10,16.5L16,12L10,7.5V16.5Z",label:t.enabled?"Disable":"Enable",action:()=>this._toggleEnabled(t.switch_id,t.enabled)},{path:"M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z",label:"Duplicate",action:()=>this._duplicate(t.switch_id)},{path:"M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z",label:"Delete",action:()=>this._deleteConfirm(t),warning:!0}]}render(){const t=this._filteredSortedData;return j`
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
              <ha-svg-icon .path=${"M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"}></ha-svg-icon>
              <input
                type="text"
                placeholder="Search"
                .value=${this._filter}
                @input=${t=>{this._filter=t.target.value}}
              />
            </div>
            <div class="table">
              <div class="thead">
                <div class="tr">
                  <div class="th col-image"></div>
                  <div
                    class="th col-name sortable"
                    @click=${()=>this._toggleSort("name")}
                  >
                    Name ${this._sortIcon("name")}
                  </div>
                  ${this.narrow?W:j`
                        <div
                          class="th col-service sortable"
                          @click=${()=>this._toggleSort("service")}
                        >
                          Service ${this._sortIcon("service")}
                        </div>
                        <div
                          class="th col-type sortable"
                          @click=${()=>this._toggleSort("type")}
                        >
                          Type ${this._sortIcon("type")}
                        </div>
                      `}
                  <div class="th col-actions"></div>
                </div>
              </div>
              <div class="tbody">
                ${0===t.length?j`<div class="empty">
                      ${0===this._data.length?"No Switches configured":"No matches found"}
                    </div>`:t.map(t=>j`
                        <div
                          class="tr row-item"
                          @click=${()=>this._editSwitch(t.switch_id)}
                        >
                          <div class="td col-image">
                            ${t.switch.valid_blueprint&&t.switch.blueprint.has_image?j`<img
                                  src="${wt(t.blueprint_id+".png")}"
                                />`:j`<ha-svg-icon
                                  .path=${"M13 5C15.21 5 17 6.79 17 9C17 10.5 16.2 11.77 15 12.46V11.24C15.61 10.69 16 9.89 16 9C16 7.34 14.66 6 13 6S10 7.34 10 9C10 9.89 10.39 10.69 11 11.24V12.46C9.8 11.77 9 10.5 9 9C9 6.79 10.79 5 13 5M20 20.5C19.97 21.32 19.32 21.97 18.5 22H13C12.62 22 12.26 21.85 12 21.57L8 17.37L8.74 16.6C8.93 16.39 9.2 16.28 9.5 16.28H9.7L12 18V9C12 8.45 12.45 8 13 8S14 8.45 14 9V13.47L15.21 13.6L19.15 15.79C19.68 16.03 20 16.56 20 17.14V20.5M20 2H4C2.9 2 2 2.9 2 4V12C2 13.11 2.9 14 4 14H8V12L4 12L4 4H20L20 12H18V14H20V13.96L20.04 14C21.13 14 22 13.09 22 12V4C22 2.9 21.11 2 20 2Z"}
                                ></ha-svg-icon>`}
                          </div>
                          <div class="td col-name">
                            <span class="name-text">
                              ${t.error?j`<span class="error"
                                    >${t.name} (${t.error})</span
                                  >`:t.name}
                            </span>
                            ${t.enabled?W:j`<span class="disabled-badge"
                                  >Disabled</span
                                >`}
                          </div>
                          ${this.narrow?W:j`
                                <div class="td col-service">
                                  ${t.service}
                                </div>
                                <div class="td col-type">${t.type}</div>
                              `}
                          <div class="td col-actions" @click=${t=>t.stopPropagation()}>
                            <switch-manager-menu align="left">
                              ${this._getOverflowItems(t).map(t=>j`
                                  <div
                                    class="menu-item ${t.warning?"warning":""}"
                                    @click=${t.action}
                                  >
                                    <ha-svg-icon .path=${t.path}></ha-svg-icon>
                                    ${t.label}
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
                <ha-svg-icon slot="icon" .path=${"M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"}></ha-svg-icon>
              </ha-fab>
            </div>
          </div>
      </div>
    `}_populateSwitches(){this.hass.callWS({type:$t("configs")}).then(t=>{const e=[];Object.values(t.configs).forEach(t=>{const i=t.valid_blueprint?t.blueprint:{id:t.blueprint,service:"",name:""};e.push({switch:t,blueprint_id:i.id,switch_id:t.id,error:t._error,enabled:t.enabled,name:t.name,service:i.service||"",type:i.name||"",actions:t.id})}),this._data=e})}_editSwitch(t){Ct(xt(`edit/${t}`))}async _toggleEnabled(t,e){try{const i=await this.hass.callWS({type:$t("config/enabled"),enabled:!e,config_id:t});this._populateSwitches(),At(this,"Switch "+(i.enabled?"Enabled":"Disabled"))}catch(t){At(this,t.message)}}async _duplicate(t){try{const e=await this.hass.callWS({type:$t("config/duplicate"),config_id:t});At(this,"Switch Duplicated"),Ct(xt(`edit/${e.config_id}`))}catch(t){At(this,t.message)}}async _deleteConfirm(t){kt(this,"switch-manager-dialog-confirm",()=>Promise.resolve().then(function(){return jt}),{title:"Delete switch?",text:`${t.name} will be permanently deleted.`,confirmText:"Delete",dismissText:"Cancel",confirm:()=>this._delete(t.switch_id),confirmation:!0,destructive:!0})}async _delete(t){try{await this.hass.callWS({type:$t("config/delete"),config_id:t.toString()}),this._populateSwitches(),At(this,"Switch Deleted")}catch(t){At(this,t.message)}}_showBlueprintDialog(){kt(this,"switch-manager-dialog-blueprint-selector",()=>Promise.resolve().then(function(){return Vt}),{})}static{this.styles=n`
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
  `}};t([gt({attribute:!1})],Lt.prototype,"hass",void 0),t([gt({type:Boolean})],Lt.prototype,"narrow",void 0),t([gt({attribute:!1})],Lt.prototype,"panel",void 0),t([gt({attribute:!1})],Lt.prototype,"route",void 0),t([_t()],Lt.prototype,"_data",void 0),t([_t()],Lt.prototype,"_filter",void 0),t([_t()],Lt.prototype,"_sortColumn",void 0),t([_t()],Lt.prototype,"_sortDirection",void 0),Lt=t([dt("switch-manager-index")],Lt);const Dt=1;class Tt{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}const Pt=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends Tt{constructor(t){if(super(t),t.type!==Dt||"class"!==t.name||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){if(void 0===this.st){this.st=new Set,void 0!==t.strings&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(t=>""!==t)));for(const t in e)e[t]&&!this.nt?.has(t)&&this.st.add(t);return this.render(e)}const i=t.element.classList;for(const t of this.st)t in e||(i.remove(t),this.st.delete(t));for(const t in e){const s=!!e[t];s===this.st.has(t)||this.nt?.has(t)||(s?(i.add(t),this.st.add(t)):(i.remove(t),this.st.delete(t)))}return Z}});let Bt=class extends ht{constructor(){super(...arguments),this.index=0}render(){return!this.blueprint_actions||this.blueprint_actions.length<=1?j``:j`
      <div class="tabs" role="tablist">
        ${this.blueprint_actions.map((t,e)=>{const i=this.config_actions?.[e]?.sequence?.length||0;return j`
            <button
              class="tab ${e===this.index?"selected":""}"
              role="tab"
              index="${e}"
              @click=${()=>this._select(e)}
            >
              <span class="title">${t.title}</span>
              ${i?j`<span class="chip">${i}</span>`:""}
              ${"init"===t.title?j`<ha-svg-icon
                    class="init-icon"
                    .path=${"M7,8L2.5,12L7,16V8M17,8V16L21.5,12L17,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10Z"}
                  ></ha-svg-icon>`:""}
            </button>
          `})}
      </div>
    `}flash(t){const e=this.tabs?.querySelector(`[index="${t}"]`);e&&(e.removeAttribute("feedback"),e.setAttribute("feedback",""),setTimeout(()=>e.removeAttribute("feedback"),1e3))}_select(t){this.dispatchEvent(new CustomEvent("changed",{detail:{index:t}}))}static{this.styles=n`
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
  `}};t([gt({attribute:!1})],Bt.prototype,"hass",void 0),t([gt({attribute:!1})],Bt.prototype,"blueprint_actions",void 0),t([gt({attribute:!1})],Bt.prototype,"config_actions",void 0),t([gt({type:Number,reflect:!0})],Bt.prototype,"index",void 0),t([vt(".tabs",!0)],Bt.prototype,"tabs",void 0),Bt=t([dt("switch-manager-button-actions")],Bt);let Ut=class extends ht{constructor(){super(...arguments),this.narrow=!1,this.disabled=!1,this.sequence=[],this.button_index=0,this.action_index=0,this.is_new=!0,this._is_yaml=!1,this._dirty=!1,this._debug=!1,this._block_save=!1}render(){if(!this.config)return j``;const t=!!this.config._error;return j`
      <div class="toolbar">
        <ha-menu-button
          .hass=${this.hass}
          .narrow=${this.narrow}
        ></ha-menu-button>
        <ha-icon-button
          .path=${"M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"}
          @click=${this._backTapped}
        ></ha-icon-button>
        <div class="main-title">Switch Manager - ${this.config?.name}</div>
        <switch-manager-menu align="left">
          <div
            class="menu-item"
            ?disabled=${!this.config||t}
            @click=${this._showIdentifierAutoDiscoveryDialog}
          >
            <ha-svg-icon .path=${"M10 7V9H9V15H10V17H6V15H7V9H6V7H10M16 7C17.11 7 18 7.9 18 9V15C18 16.11 17.11 17 16 17H12V7M16 9H14V15H16V9Z"}></ha-svg-icon>
            Identifier
          </div>
          <div class="menu-item" @click=${this._showRenameDialog}>
            <ha-svg-icon .path=${"M18,17H10.5L12.5,15H18M6,17V14.5L13.88,6.65C14.07,6.45 14.39,6.45 14.59,6.65L16.35,8.41C16.55,8.61 16.55,8.92 16.35,9.12L8.47,17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z"}></ha-svg-icon>
            Rename
          </div>
          <div class="menu-item" @click=${this._rotate}>
            <ha-svg-icon .path=${"M16.89,15.5L18.31,16.89C19.21,15.73 19.76,14.39 19.93,13H17.91C17.77,13.87 17.43,14.72 16.89,15.5M13,17.9V19.92C14.39,19.75 15.74,19.21 16.9,18.31L15.46,16.87C14.71,17.41 13.87,17.76 13,17.9M19.93,11C19.76,9.61 19.21,8.27 18.31,7.11L16.89,8.53C17.43,9.28 17.77,10.13 17.91,11M15.55,5.55L11,1V4.07C7.06,4.56 4,7.92 4,12C4,16.08 7.05,19.44 11,19.93V17.91C8.16,17.43 6,14.97 6,12C6,9.03 8.16,6.57 11,6.09V10L15.55,5.55Z"}></ha-svg-icon>
            Rotate
          </div>
          <div
            class="menu-item"
            ?disabled=${!this.config||t}
            @click=${this._showVariablesEditorDialog}
          >
            <ha-svg-icon .path=${"M8,3A2,2 0 0,0 6,5V9A2,2 0 0,1 4,11H3V13H4A2,2 0 0,1 6,15V19A2,2 0 0,0 8,21H10V19H8V14A2,2 0 0,0 6,12A2,2 0 0,0 8,10V5H10V3M16,3A2,2 0 0,1 18,5V9A2,2 0 0,0 20,11H21V13H20A2,2 0 0,0 18,15V19A2,2 0 0,1 16,21H14V19H16V14A2,2 0 0,1 18,12A2,2 0 0,1 16,10V5H14V3H16Z"}></ha-svg-icon>
            Variables
          </div>
          <div
            class="menu-item"
            ?disabled=${!this.config||t}
            @click=${this._showCopyFromDialog}
          >
            <ha-svg-icon .path=${"M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"}></ha-svg-icon>
            Copy From
          </div>
          <div
            class="menu-item"
            ?disabled=${!this.config||this.is_new||t}
            @click=${this._toggleEnabled}
          >
            <ha-svg-icon .path=${"M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4M9,9V15H15V9"}></ha-svg-icon>
            ${this.config?.enabled?"Disable":"Enable"}
          </div>
          <div class="menu-divider"></div>
          <div
            class="menu-item"
            ?disabled=${!this.config||this.is_new||t}
            @click=${this._toggleDebug}
          >
            <ha-svg-icon .path=${"M14,12H10V10H14M14,16H10V14H14M20,8H17.19C16.74,7.22 16.12,6.55 15.37,6.04L17,4.41L15.59,3L13.42,5.17C12.96,5.06 12.5,5 12,5C11.5,5 11.04,5.06 10.59,5.17L8.41,3L7,4.41L8.62,6.04C7.88,6.55 7.26,7.22 6.81,8H4V10H6.09C6.04,10.33 6,10.66 6,11V12H4V14H6V15C6,15.34 6.04,15.67 6.09,16H4V18H6.81C7.85,19.79 9.78,21 12,21C14.22,21 16.15,19.79 17.19,18H20V16H17.91C17.96,15.67 18,15.34 18,15V14H20V12H18V11C18,10.66 17.96,10.33 17.91,10H20V8Z"}></ha-svg-icon>
            Debug
          </div>
          <div class="menu-divider"></div>
          <div
            class="menu-item ${Pt({warning:!this.is_new})}"
            ?disabled=${this.is_new}
            @click=${this._deleteConfirm}
          >
            <ha-svg-icon .path=${"M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"}></ha-svg-icon>
            Delete
          </div>
        </switch-manager-menu>
      </div>

      <div class="view">
          ${t?W:j`<h3 id="blueprint-name">${this.blueprint?.service} / ${this.blueprint?.name}</h3>`}

          <div id="switch-image" rotate="${this.config.rotate}">
            ${!this.blueprint||this.blueprint?.has_image?j`<svg id="switch-svg"></svg>`:j`<ha-svg-icon .path=${"M13 5C15.21 5 17 6.79 17 9C17 10.5 16.2 11.77 15 12.46V11.24C15.61 10.69 16 9.89 16 9C16 7.34 14.66 6 13 6S10 7.34 10 9C10 9.89 10.39 10.69 11 11.24V12.46C9.8 11.77 9 10.5 9 9C9 6.79 10.79 5 13 5M20 20.5C19.97 21.32 19.32 21.97 18.5 22H13C12.62 22 12.26 21.85 12 21.57L8 17.37L8.74 16.6C8.93 16.39 9.2 16.28 9.5 16.28H9.7L12 18V9C12 8.45 12.45 8 13 8S14 8.45 14 9V13.47L15.21 13.6L19.15 15.79C19.68 16.03 20 16.56 20 17.14V20.5M20 2H4C2.9 2 2 2.9 2 4V12C2 13.11 2.9 14 4 14H8V12L4 12L4 4H20L20 12H18V14H20V13.96L20.04 14C21.13 14 22 13.09 22 12V4C22 2.9 21.11 2 20 2Z"}></ha-svg-icon>`}
          </div>

          ${t?W:j`
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
              ${this._errors?j`
                    <ha-alert alert-type="error">
                      ${this._errors}
                      ${this.config.is_mismatch?j`<button slot="action" class="alert-action" @click=${this._fixMismatch}>Fix</button>`:""}
                    </ha-alert>
                  `:""}
              ${this.config&&!this.config.enabled?j`
                    <ha-alert alert-type="info">
                      Switch is disabled
                      <button slot="action" class="alert-action" @click=${this._toggleEnabled}>Enable</button>
                    </ha-alert>
                  `:""}
              ${t?W:j`
                <div id="sequence-container">
                  <div class="header">
                    <h2 id="sequence-heading" class="name">
                      Sequence
                      <ha-selector-select
                        id="mode-selector"
                        .hass=${this.hass}
                        .value=${this.config?.buttons[this.button_index]?.actions[this.action_index]?.mode}
                        label="Mode"
                        .selector=${{select:{mode:"dropdown",options:yt.map(t=>({label:t.charAt(0).toUpperCase()+t.slice(1),value:t}))}}}
                        @value-changed=${this._modeValueChanged}
                      ></ha-selector-select>
                    </h2>
                    <switch-manager-menu align="left">
                      <div class="menu-item" @click=${this._toggleYaml}>
                        <ha-svg-icon .path=${this._is_yaml?"M21 13.1C20.9 13.1 20.7 13.2 20.6 13.3L19.6 14.3L21.7 16.4L22.7 15.4C22.9 15.2 22.9 14.8 22.7 14.6L21.4 13.3C21.3 13.2 21.2 13.1 21 13.1M19.1 14.9L13 20.9V23H15.1L21.2 16.9L19.1 14.9M21 3H13V9H21V3M19 7H15V5H19V7M13 18.06V11H21V11.1C20.24 11.1 19.57 11.5 19.19 11.89L18.07 13H15V16.07L13 18.06M11 3H3V13H11V3M9 11H5V5H9V11M11 20.06V15H3V21H11V20.06M9 19H5V17H9V19Z":"M8,12H16V14H8V12M10,20H6V4H13V9H18V12.1L20,10.1V8L14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H10V20M8,18H12.1L13,17.1V16H8V18M20.2,13C20.3,13 20.5,13.1 20.6,13.2L21.9,14.5C22.1,14.7 22.1,15.1 21.9,15.3L20.9,16.3L18.8,14.2L19.8,13.2C19.9,13.1 20,13 20.2,13M20.2,16.9L14.1,23H12V20.9L18.1,14.8L20.2,16.9Z"}></ha-svg-icon>
                        ${this._is_yaml?"Visual Editor":"Yaml Editor"}
                      </div>
                    </switch-manager-menu>
                  </div>
                  ${this._is_yaml?j`<ha-yaml-editor
                        .hass=${this.hass}
                        .value=${this.sequence}
                        @value-changed=${this._configSequenceChanged}
                      ></ha-yaml-editor>`:j`<ha-automation-action
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

          ${t?W:j`
            <div class="fab-container">
              <ha-fab
                slot="fab"
                .label=${"Save"}
                extended
                collapse
                @click=${this._save}
                class=${Pt({dirty:this._dirty,blocked:this._block_save})}
              >
                <ha-svg-icon slot="icon" .path=${"M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z"}></ha-svg-icon>
              </ha-fab>
            </div>
          `}
        </div>
    `}connectedCallback(){super.connectedCallback(),this._loadConfig(),this._startListeners()}disconnectedCallback(){this._killListener("_reloadListener"),this._killListener("_subscribedMonitor"),super.disconnectedCallback()}_killListener(t){return!!this[t]&&(this[t](),this[t]=void 0,!0)}async _startListeners(){this._reloadListener=await this.hass.connection.subscribeEvents(t=>{"switch_manager"===t.data.domain&&"reload"===t.data.service&&this._loadConfig()},"call_service")}_loadConfig(){"id"in this.params?(this.is_new=!1,this.hass.callWS({type:$t("configs"),config_id:this.params.id}).then(t=>this._setConfig(t.config))):(this.is_new=!0,this._dirty=!0,"blueprint"in this.params&&this._loadBlueprint(this.params.blueprint).then(t=>{this._setConfig(function(t){const e={id:null,name:"New Switch",enabled:!0,identifier:"",blueprint:t,valid_blueprint:!0,buttons:[],is_mismatch:!1,rotate:0};return t.buttons.forEach((t,i)=>{e.buttons[i]={actions:[]},t.actions.forEach((t,s)=>{e.buttons[i].actions[s]={mode:yt[0],sequence:[]}})}),e}(t.blueprint)),this._showRenameDialog()}))}_loadBlueprint(t){return this.hass.callWS({type:$t("blueprints"),blueprint_id:t})}_setConfig(t){if(this.config=t,t._error)return this._errors=t._error,void(this._block_save=!0);this._setBlueprint(t.blueprint),this._updateSequence(),this._monitor()}async _monitor(){this.is_new||(this._killListener("_subscribedMonitor"),this._subscribedMonitor=await this.hass.connection.subscribeMessage(t=>{if("action_triggered"===t.event){if(!this.config?.identifier)return;if(t.button===this.button_index&&(this.blueprint?.buttons[this.button_index]?.actions.length??0)>1&&this.button_actions.flash(t.action),1===this.blueprint?.buttons?.length)return void At(this,"Button Pressed");const e=this.svg?.querySelector(`[index="${t.button}"]`);e&&(e.removeAttribute("pressed"),e.setAttribute("pressed",""),setTimeout(()=>e.removeAttribute("pressed"),1e3))}"incoming"!==t.event&&"action_triggered"!==t.event||!this._debug||console.log(t)},{type:$t("config/monitor"),config_id:this.config.id}))}_setBlueprint(t){this.blueprint=t,this.requestUpdate(),this._drawSVG()}async _drawSVG(){if(!this.blueprint?.has_image)return;await this.updateComplete;const t=this.svg;if(t){const e=t.cloneNode(!1);t.parentNode.replaceChild(e,t)}const e=new Image;e.src=wt(`${this.blueprint.id}.png`),e.onload=()=>{const t=this.svg;if(!t)return;t.setAttributeNS(null,"viewBox",`0 0 ${e.width} ${e.height}`);const i=document.createElementNS("http://www.w3.org/2000/svg","image");i.setAttributeNS(null,"x","0"),i.setAttributeNS(null,"y","0"),i.setAttributeNS(null,"width",e.width.toString()),i.setAttributeNS(null,"height",e.height.toString()),i.setAttributeNS("http://www.w3.org/1999/xlink","href",e.src),i.setAttributeNS(null,"visibility","visible"),t.prepend(i)},this.blueprint.buttons.length>1&&this.blueprint.buttons.forEach((t,e)=>{let i;if(t.x>-1&&t.y>-1&&t.width>0&&t.height>0)i=document.createElementNS("http://www.w3.org/2000/svg","rect"),i.setAttributeNS(null,"x",t.x.toString()),i.setAttributeNS(null,"y",t.y.toString()),i.setAttributeNS(null,"width",t.width.toString()),i.setAttributeNS(null,"height",t.height.toString());else if(t.x>-1&&t.y>-1&&t.width>0)i=document.createElementNS("http://www.w3.org/2000/svg","circle"),i.setAttributeNS(null,"cx",t.x.toString()),i.setAttributeNS(null,"cy",t.y.toString()),i.setAttributeNS(null,"r",t.width.toString());else{if(!t.d)return;i=document.createElementNS("http://www.w3.org/2000/svg","path"),i.setAttributeNS(null,"d",t.d.toString())}i.setAttribute("class","button"),i.setAttribute("index",e.toString()),this.button_index===e&&i.setAttribute("selected",""),this._buttonTotalSequence(this.config.buttons[e])||i.setAttribute("empty",""),i.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation(),this._setButtonIndex(parseInt(t.target.getAttribute("index")))}),this.svg?.append(i)})}_buttonTotalSequence(t){let e=0;return t.actions.forEach(t=>e+=t.sequence.length),e}_updateSequence(t){t&&(this.config.buttons[this.button_index].actions[this.action_index].sequence=t),this.sequence=[...this.config?.buttons[this.button_index]?.actions[this.action_index]?.sequence||[]]}_validate(){return this._errors=void 0,!!this.config?.identifier||(this._showIdentifierAutoDiscoveryDialog(!0),!1)}_save(){!this._block_save&&this._validate()&&this.config&&!this.config._error&&(this._block_save=!0,this._dirty=!1,this.hass.callWS({type:$t("config/save"),config:{...this.config,blueprint:this.config.blueprint.id}}).then(t=>{this.is_new&&(this.is_new=!1,this.config.id=t.config_id,Ct(xt(`edit/${t.config_id}`)),this._monitor()),At(this,"Switch Saved")}).catch(t=>{At(this,t.message),this._errors=t.message,this._dirty=!0}).finally(()=>this._block_save=!1))}_backTapped(){Ct(xt())}_actionChanged(t){this._setActionIndex(t.detail.index)}_setButtonIndex(t){t!==this.button_index&&(this.button_index=t,this.svg?.querySelector("[selected]")?.removeAttribute("selected"),this.svg?.querySelector(`[index="${t}"]`)?.setAttribute("selected",""),this._setActionIndex(0))}_setActionIndex(t){this.action_index=t,this._updateSequence(),this._is_yaml&&this._yamlEditor?.setValue(this.sequence)}_configSequenceChanged(t){let e=t.detail.value;!this._is_yaml||e&&Array.isArray(e)||(e=[]),this.requestUpdate("config"),this._updateSequence(e),this._errors=void 0,this._dirty=!0}_rotate(){this.config.rotate=this.config.rotate>=3?0:this.config.rotate+1,this.requestUpdate("config"),this._dirty=!0}_toggleDebug(){this._debug=!this._debug,At(this,"Debug "+(this._debug?"Enabled. View dev console":"Disabled"))}_toggleYaml(){this._is_yaml=!this._is_yaml,this.updateComplete.then(()=>{this._is_yaml&&this._yamlEditor?.setValue(this.sequence)})}_modeValueChanged(t){const e=this.config?.buttons[this.button_index]?.actions[this.action_index]?.mode;e!==t.detail.value&&(this.config.buttons[this.button_index].actions[this.action_index].mode=t.detail.value,this.requestUpdate("config"),this._dirty=!0)}_toggleEnabled(){this.config&&!this.is_new&&(this.config.enabled=!this.config.enabled,this.hass.callWS({type:$t("config/enabled"),enabled:this.config.enabled,config_id:this.config.id}),this.requestUpdate("config"))}_fixMismatch(){this.config&&this.hass.callWS({type:$t("config/save"),config:{...this.config,blueprint:this.config.blueprint.id},fix_mismatch:!0}).then(()=>{this._errors=void 0,this.config.is_mismatch=!1,this.requestUpdate(),At(this,"Mismatch Fixed")})}_deleteConfirm(){this.is_new||kt(this,"switch-manager-dialog-confirm",()=>Promise.resolve().then(function(){return jt}),{title:"Delete switch?",text:`${this.config?.name} will be permanently deleted.`,confirmText:"Delete",dismissText:"Cancel",confirm:()=>{this.hass.callWS({type:$t("config/delete"),config_id:this.config.id.toString()}).then(()=>Ct(xt()))},confirmation:!0,destructive:!0})}_showIdentifierAutoDiscoveryDialog(t=!1){kt(this,"switch-manager-dialog-identifier-auto-discovery",()=>Promise.resolve().then(function(){return Zt}),{switch_id:this.config?.id,identifier:this.config?.identifier,blueprint:this.blueprint,update:e=>{this.config.identifier=e.identifier,this._dirty=!0,this.requestUpdate(),t&&e.identifier&&this._save()},onClose:()=>{}})}_showRenameDialog(){kt(this,"switch-manager-dialog-rename-switch",()=>Promise.resolve().then(function(){return Kt}),{config:this.config,update:t=>{this.config.name=t.name,this._dirty=!0,this.requestUpdate()},onClose:()=>{this.is_new&&this._showIdentifierAutoDiscoveryDialog()}})}_showCopyFromDialog(){kt(this,"switch-manager-dialog-copy-from",()=>Promise.resolve().then(function(){return Gt}),{blueprint_id:this.config?.blueprint?.id,current_switch_id:this.config?.id,update:t=>{this.config.buttons=t.buttons,!1!==t.variables&&(this.config.variables=t.variables),this._dirty=!0,this._updateSequence(),this._drawSVG()},onClose:()=>{}})}_showVariablesEditorDialog(){kt(this,"switch-manager-dialog-variables-editor",()=>Promise.resolve().then(function(){return Yt}),{config:this.config,update:t=>{this.config.variables=t.variables,this._dirty=!0,this.requestUpdate()},onClose:()=>{}})}static{this.styles=n`
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
  `}};t([gt({attribute:!1})],Ut.prototype,"hass",void 0),t([gt({type:Boolean})],Ut.prototype,"narrow",void 0),t([gt({attribute:!1})],Ut.prototype,"panel",void 0),t([gt({attribute:!1})],Ut.prototype,"route",void 0),t([gt({attribute:!1})],Ut.prototype,"params",void 0),t([gt({attribute:!1})],Ut.prototype,"blueprint",void 0),t([gt({attribute:!1})],Ut.prototype,"config",void 0),t([gt({type:Boolean})],Ut.prototype,"disabled",void 0),t([_t()],Ut.prototype,"_subscribedMonitor",void 0),t([_t()],Ut.prototype,"_reloadListener",void 0),t([_t()],Ut.prototype,"sequence",void 0),t([_t()],Ut.prototype,"button_index",void 0),t([_t()],Ut.prototype,"action_index",void 0),t([_t()],Ut.prototype,"is_new",void 0),t([_t()],Ut.prototype,"_is_yaml",void 0),t([_t()],Ut.prototype,"_dirty",void 0),t([_t()],Ut.prototype,"_debug",void 0),t([_t()],Ut.prototype,"_block_save",void 0),t([_t()],Ut.prototype,"_errors",void 0),t([vt("#switch-svg")],Ut.prototype,"svg",void 0),t([vt("switch-manager-button-actions")],Ut.prototype,"button_actions",void 0),t([vt("ha-yaml-editor")],Ut.prototype,"_yamlEditor",void 0),Ut=t([dt("switch-manager-switch-editor")],Ut);const qt="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z",Nt="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z";let Ot=class extends ht{constructor(){super(...arguments),this.narrow=!1,this.params={},this._id="custom-remote",this._name="Custom Remote",this._service="Zigbee2MQTT",this._eventType="mqtt",this._identifierKey="",this._mqttTopicFormat="zigbee2mqtt/+/action",this._mqttSubTopics=!1,this._imageWidth=0,this._imageHeight=0,this._imageChanged=!1,this._buttons=[],this._selectedButton=0,this._saving=!1,this._loading=!1,this._isEdit=!1,this._canUndo=!1,this._canRedo=!1,this._dirty=!1,this._undoStack=[],this._redoStack=[],this._restoringHistory=!1,this._textHistoryPending=!1,this._leavePath="",this._boundPointerMove=t=>this._onPointerMove(t),this._boundPointerUp=()=>this._onPointerUp(),this._boundBeforeUnload=t=>this._onBeforeUnload(t),this._boundPopState=()=>this._onPopState(),this._boundKeyDown=t=>this._onKeyDown(t)}connectedCallback(){super.connectedCallback(),this._leavePath=window.location.pathname,window.addEventListener("pointermove",this._boundPointerMove),window.addEventListener("pointerup",this._boundPointerUp),window.addEventListener("beforeunload",this._boundBeforeUnload),window.addEventListener("popstate",this._boundPopState),window.addEventListener("keydown",this._boundKeyDown),"blueprint-edit"===this.params?.action&&this.params.id?(this._isEdit=!0,this._loadForEdit(this.params.id)):this._baselineSnapshot=this._snapshot()}disconnectedCallback(){window.removeEventListener("pointermove",this._boundPointerMove),window.removeEventListener("pointerup",this._boundPointerUp),window.removeEventListener("beforeunload",this._boundBeforeUnload),window.removeEventListener("popstate",this._boundPopState),window.removeEventListener("keydown",this._boundKeyDown),this._historyDebounce&&clearTimeout(this._historyDebounce),super.disconnectedCallback()}render(){if(this._loading)return j`<div class="loading">Loading blueprint…</div>`;const t=this._buttons[this._selectedButton];return j`
      <div class="toolbar">
        <ha-icon-button .path=${"M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"} @click=${this._back}></ha-icon-button>
        <div class="main-title">${this._isEdit?"Edit Blueprint":"Create Blueprint"}</div>
        <div class="toolbar-actions">
          <ha-icon-button
            .path=${"M12.5,8C9.85,8 7.45,9 5.6,10.6L2,7V16H11L7.38,12.38C8.77,11.22 10.54,10.5 12.5,10.5C16.04,10.5 19.05,12.81 20.1,16L22.47,15.22C21.08,11.03 17.15,8 12.5,8Z"}
            ?disabled=${!this._canUndo}
            @click=${this._undo}
            title="Undo (Ctrl+Z)"
          ></ha-icon-button>
          <ha-icon-button
            .path=${"M18.4,10.6C16.55,9 14.15,8 11.5,8C6.85,8 2.92,11.03 1.54,15.22L3.9,16C4.95,12.81 7.95,10.5 11.5,10.5C13.46,10.5 15.23,11.22 16.62,12.38L13,16H22V7L18.4,10.6Z"}
            ?disabled=${!this._canRedo}
            @click=${this._redo}
            title="Redo (Ctrl+Y)"
          ></ha-icon-button>
        </div>
        <div class="version">v${this.panel.config.version}</div>
      </div>
      <div class="view">
        <div class="grid">
          <section class="card preview-card">
            <h2>Remote Preview</h2>
            <p class="hint">
              Drag buttons to move them. Use the handle on the selected button to resize.
            </p>
            <label class="file-picker">
              <input type="file" accept="image/*" @change=${this._imageSelected} />
              ${this._isEdit?"Replace remote image":"Upload remote image"}
            </label>
            ${this._imageDataUrl?j`
                  <div class="preview">
                    <svg viewBox="0 0 ${this._imageWidth} ${this._imageHeight}">
                      <image
                        x="0"
                        y="0"
                        width=${this._imageWidth}
                        height=${this._imageHeight}
                        href=${this._imageDataUrl}
                      ></image>
                      ${this._buttons.map((t,e)=>this._renderButtonShape(t,e))}
                    </svg>
                  </div>
                  <div class="dimensions">
                    ${this._imageWidth}px x ${this._imageHeight}px
                  </div>
                `:j`<div class="empty-preview">Upload an image to start.</div>`}
          </section>

          <section class="card form-card">
            <h2>Blueprint Details</h2>
            ${this._error?j`<ha-alert alert-type="error">${this._error}</ha-alert>`:W}
            <div class="fields two">
              ${this._isEdit?j`
                    <label>
                      File id
                      <input .value=${this._id} disabled />
                    </label>
                  `:this._textField("File id",this._id,t=>this._id=this._slug(t))}
              ${this._textField("Name",this._name,t=>{this._name=t,this._isEdit||this._id&&"custom-remote"!==this._id||(this._id=this._slug(t))})}
              ${this._textField("Service",this._service,t=>this._service=t)}
              <label>
                Event type
                <select
                  .value=${this._eventType}
                  @change=${t=>{this._recordHistory(),this._eventType=t.target.value}}
                >
                  <option value="mqtt">MQTT</option>
                  <option value="zha_event">ZHA event</option>
                  <option value="deconz_event">deCONZ event</option>
                  <option value="zwave_js_value_notification">Z-Wave JS notification</option>
                </select>
              </label>
              ${"mqtt"===this._eventType?j`
                    ${this._textField("MQTT topic format",this._mqttTopicFormat,t=>this._mqttTopicFormat=t)}
                    <label class="checkbox">
                      <input
                        type="checkbox"
                        .checked=${this._mqttSubTopics}
                        @change=${t=>{this._recordHistory(),this._mqttSubTopics=t.target.checked}}
                      />
                      Include sub topics
                    </label>
                  `:this._textField("Identifier key",this._identifierKey,t=>this._identifierKey=t)}
            </div>

            <div class="section-header">
              <h2>Buttons</h2>
              <div class="header-actions">
                <button ?disabled=${0===this._buttons.length} @click=${this._copyPreviousButton}>
                  <ha-svg-icon .path=${"M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"}></ha-svg-icon>
                  Copy previous
                </button>
                <button @click=${this._addButton}>
                  <ha-svg-icon .path=${Nt}></ha-svg-icon>
                  Add Button
                </button>
              </div>
            </div>

            ${this._buttons.length?j`
                  <div class="button-tabs">
                    ${this._buttons.map((t,e)=>j`
                        <button
                          class=${e===this._selectedButton?"selected":""}
                          @click=${()=>this._selectedButton=e}
                        >
                          Button ${e+1}
                        </button>
                      `)}
                  </div>
                  ${t?this._renderButtonEditor(t,this._selectedButton):W}
                `:j`<p class="hint">Add buttons after uploading an image.</p>`}

            <div class="actions">
              <button @click=${this._back}>Cancel</button>
              <button class="primary" ?disabled=${this._saving} @click=${this._save}>
                <ha-svg-icon .path=${"M17,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3M12,19A2,2 0 1,1 14,17A2,2 0 0,1 12,19M6,5H15V9H6V5Z"}></ha-svg-icon>
                ${this._saving?"Saving...":this._isEdit?"Update Blueprint":"Save Blueprint"}
              </button>
            </div>
          </section>
        </div>
      </div>
    `}_renderButtonShape(t,e){const i=e===this._selectedButton,s=i?"button selected":"button";if("path"===t.shape)return t.d&&this._isValidPath(t.d)?I`
        <path
          class=${s}
          d=${t.d}
          @pointerdown=${t=>this._startDrag(t,e,"move")}
        ></path>
      `:W;if("circle"===t.shape)return I`
        <circle
          class=${s}
          cx=${t.x}
          cy=${t.y}
          r=${t.width}
          @pointerdown=${t=>this._startDrag(t,e,"move")}
        ></circle>
        ${i?I`
              <circle
                class="resize-handle"
                cx=${t.x+t.width}
                cy=${t.y}
                r="8"
                @pointerdown=${t=>this._startDrag(t,e,"resize")}
              ></circle>
            `:W}
      `;const o=t.height||t.width;return I`
      <rect
        class=${s}
        x=${t.x}
        y=${t.y}
        width=${t.width}
        height=${o}
        @pointerdown=${t=>this._startDrag(t,e,"move")}
      ></rect>
      ${i?I`
            <rect
              class="resize-handle"
              x=${t.x+t.width-8}
              y=${t.y+o-8}
              width="16"
              height="16"
              @pointerdown=${t=>this._startDrag(t,e,"resize")}
            ></rect>
          `:W}
    `}_renderButtonEditor(t,e){return j`
      <div class="button-editor">
        <div class="section-header compact">
          <h3>Button ${e+1}</h3>
          <button class="danger" @click=${()=>this._removeButton(e)}>
            <ha-svg-icon .path=${qt}></ha-svg-icon>
            Remove
          </button>
        </div>
        <div class="fields two">
          <label>
            Shape
            <select .value=${t.shape} @change=${t=>this._changeShape(e,t.target.value)}>
              <option value="rectangle">Rectangle</option>
              <option value="circle">Circle</option>
              <option value="path">Custom path (SVG)</option>
            </select>
          </label>
          ${"path"===t.shape?W:j`
                ${this._numberField("X",t.x,t=>this._updateButton(e,{x:t}))}
                ${this._numberField("Y",t.y,t=>this._updateButton(e,{y:t}))}
                ${this._numberField("circle"===t.shape?"Radius":"Width",t.width,t=>this._updateButton(e,{width:t}))}
                ${"rectangle"===t.shape?this._numberField("Height",t.height||t.width,t=>this._updateButton(e,{height:t})):W}
              `}
        </div>
        ${"path"===t.shape?j`
              <label class="path-field">
                Custom SVG path (d attribute)
                <textarea
                  rows="4"
                  spellcheck="false"
                  .value=${t.d||""}
                  @input=${t=>{this._recordHistoryForText(),this._updateButton(e,{d:t.target.value})}}
                ></textarea>
              </label>
              ${t.d&&!this._isValidPath(t.d)?j`<p class="path-error">This path is not valid SVG. It must start with M/m and contain only path commands and numbers.</p>`:j`<p class="hint">Drag the shape in the preview to move it. Coordinates use the image's pixel space.</p>`}
            `:W}

        <h3>Button Conditions</h3>
        ${this._renderConditions(t.conditions,t=>this._updateButton(e,{conditions:t}))}

        <div class="section-header compact">
          <h3>Actions</h3>
          <button @click=${()=>this._addAction(e)}>
            <ha-svg-icon .path=${Nt}></ha-svg-icon>
            Add Action
          </button>
        </div>
        ${t.actions.map((t,i)=>this._renderActionEditor(e,t,i))}
      </div>
    `}_renderActionEditor(t,e,i){return j`
      <div class="action-editor">
        <div class="section-header compact">
          ${this._textField("Action title",e.title,e=>this._updateAction(t,i,{title:e}))}
          <button class="danger" @click=${()=>this._removeAction(t,i)}>
            <ha-svg-icon .path=${qt}></ha-svg-icon>
          </button>
        </div>
        ${this._renderConditions(e.conditions,e=>this._updateAction(t,i,{conditions:e}))}
      </div>
    `}_renderConditions(t,e){return j`
      <div class="conditions">
        ${t.map((i,s)=>j`
            <div class="condition">
              ${this._textField("Key",i.key,o=>{const r=[...t];r[s]={...i,key:o},e(r)})}
              ${this._textField("Value",i.value,o=>{const r=[...t];r[s]={...i,value:o},e(r)})}
              <button class="danger icon-only" @click=${()=>{this._recordHistory(),e(t.filter((t,e)=>e!==s))}}>
                <ha-svg-icon .path=${qt}></ha-svg-icon>
              </button>
            </div>
          `)}
        <button @click=${()=>{this._recordHistory(),e([...t,{key:"",value:""}])}}>
          <ha-svg-icon .path=${Nt}></ha-svg-icon>
          Add Condition
        </button>
      </div>
    `}_textField(t,e,i){return j`
      <label>
        ${t}
        <input
          .value=${e||""}
          @input=${t=>{this._recordHistoryForText(),i(t.target.value)}}
        />
      </label>
    `}_numberField(t,e,i){return j`
      <label>
        ${t}
        <input
          type="number"
          min="0"
          .value=${String(e||0)}
          @input=${t=>{this._recordHistoryForText(),i(Math.max(0,parseInt(t.target.value||"0",10)))}}
        />
      </label>
    `}async _loadForEdit(t){this._loading=!0,this._error=void 0;try{const e=(await this.hass.callWS({type:$t("blueprints"),blueprint_id:t})).blueprint;if(!e)throw new Error("Blueprint not found");if(!e.editable)throw new Error("Bundled blueprints cannot be edited");if(this._id=e.id,this._name=e.name,this._service=e.service,this._eventType=e.event_type,this._identifierKey=e.identifier_key||"",this._mqttTopicFormat=e.mqtt_topic_format||"",this._mqttSubTopics=!!e.mqtt_sub_topics,this._buttons=e.buttons.map(t=>this._buttonFromBlueprint(t)),e.has_image){const t=await this._fetchImageAsDataUrl(wt(`${e.id}.png`)),i=await this._loadImage(t);this._imageDataUrl=t,this._imageWidth=i.width,this._imageHeight=i.height,this._imageChanged=!1}this._baselineSnapshot=this._snapshot(),this._clearHistory()}catch(t){this._error=t.message||"Unable to load blueprint."}finally{this._loading=!1}}_buttonFromBlueprint(t){const e=!!t.d,i=!e&&null!=t.height&&t.height>0,s=!e&&!i&&(t.width??0)>0;return{shape:e?"path":s?"circle":"rectangle",x:t.x??0,y:t.y??0,width:t.width??30,height:i?t.height:t.width??30,d:e?t.d:void 0,conditions:this._conditionsFromBlueprint(t.conditions),actions:t.actions.map(t=>({title:t.title,conditions:this._conditionsFromBlueprint(t.conditions)}))}}_conditionsFromBlueprint(t){return Array.isArray(t)?t.filter(t=>!!t&&"object"==typeof t&&"key"in t).map(t=>({key:String(t.key),value:String(t.value)})):[]}async _fetchImageAsDataUrl(t){const e=await fetch(t);if(!e.ok)throw new Error("Unable to load blueprint image");const i=await e.blob();return new Promise((t,e)=>{const s=new FileReader;s.onload=()=>t(String(s.result)),s.onerror=()=>e(s.error),s.readAsDataURL(i)})}async _imageSelected(t){const e=t.target.files?.[0];if(e){this._recordHistory();try{const t=await this._readFile(e),i=await this._loadImage(t),s=800,o=500,r=Math.min(1,s/i.width,o/i.height),n=Math.max(1,Math.round(i.width*r)),a=Math.max(1,Math.round(i.height*r)),c=document.createElement("canvas");c.width=n,c.height=a,c.getContext("2d").drawImage(i,0,0,n,a),this._imageDataUrl=c.toDataURL("image/png"),this._imageWidth=n,this._imageHeight=a,this._imageChanged=!0,this._buttons.length||this._addButton()}catch(t){At(this,t.message||"Unable to load image")}}}_readFile(t){return new Promise((e,i)=>{const s=new FileReader;s.onload=()=>e(String(s.result)),s.onerror=()=>i(s.error),s.readAsDataURL(t)})}_loadImage(t){return new Promise((e,i)=>{const s=new Image;s.onload=()=>e(s),s.onerror=()=>i(new Error("Unable to read image")),s.src=t})}_svgPoint(t,e,i){const s=t.createSVGPoint();s.x=e,s.y=i;const o=t.getScreenCTM();if(!o)return{x:0,y:0};const r=s.matrixTransform(o.inverse());return{x:r.x,y:r.y}}_startDrag(t,e,i){t.preventDefault(),t.stopPropagation(),this._recordHistory(),this._selectedButton=e;const s=t.currentTarget.ownerSVGElement;if(!s)return;t.currentTarget.setPointerCapture?.(t.pointerId);const o=this._svgPoint(s,t.clientX,t.clientY);this._drag={idx:e,mode:i,start:o,origin:{...this._buttons[e],actions:this._buttons[e].actions.map(t=>({...t,conditions:[...t.conditions]})),conditions:[...this._buttons[e].conditions]}}}_onPointerMove(t){if(!this._drag)return;const e=this.renderRoot.querySelector(".preview svg");if(!e)return;const i=this._svgPoint(e,t.clientX,t.clientY),{idx:s,mode:o,start:r,origin:n}=this._drag,a=i.x-r.x,c=i.y-r.y;if("move"!==o){if("circle"===n.shape){const t=Math.max(8,Math.round(n.width+a));this._updateButton(s,{width:t})}else if("rectangle"===n.shape){const t=n.height||n.width;this._updateButton(s,{width:Math.max(10,Math.round(n.width+a)),height:Math.max(10,Math.round(t+c))})}}else"path"===n.shape?n.d&&this._updateButton(s,{d:this._translatePath(n.d,a,c)}):this._updateButton(s,{x:Math.max(0,Math.round(n.x+a)),y:Math.max(0,Math.round(n.y+c))})}_translatePath(t,e,i){const s=/([MmLlHhVvCcSsQqTtAaZz])([^MmLlHhVvCcSsQqTtAaZz]*)/g,o=/-?\d*\.?\d+(?:[eE][-+]?\d+)?/g,r={M:["x","y"],L:["x","y"],T:["x","y"],H:["x"],V:["y"],C:["x","y","x","y","x","y"],S:["x","y","x","y"],Q:["x","y","x","y"],A:["o","o","o","o","o","x","y"],Z:[]};let n,a="",c=!0;for(;n=s.exec(t);){const t=n[1],s=t.toUpperCase(),h=t===s,l=r[s]||[],d=(n[2].match(o)||[]).map(Number);if(0===l.length)a+=t+" ";else{const o=d.map((t,o)=>{const r=l[o%l.length];if(h||c&&"M"===s&&o<2){if("x"===r)return t+e;if("y"===r)return t+i}return t});a+=t+o.join(" ")+" "}c=!1}return a.trim()}_isValidPath(t){return!(!t||!t.trim())&&(!!/^\s*[Mm]/.test(t)&&/^[MmLlHhVvCcSsQqTtAaZz0-9eE,.\s+-]+$/.test(t))}_changeShape(t,e){this._recordHistory();const i=this._buttons[t],s={shape:e};if("path"===e&&!i.d){const t=i.x||Math.round(this._imageWidth/2),e=i.y||Math.round(this._imageHeight/2),o=i.width||15;s.d=`M ${t},${e} m -${o},0 a ${o},${o} 0 1,0 ${2*o},0 a ${o},${o} 0 1,0 -${2*o},0`}this._updateButton(t,s)}_onPointerUp(){this._drag=void 0}_cloneButton(t,e=20){return{shape:t.shape,x:t.x+e,y:t.y+e,width:t.width,height:t.height,d:t.d&&"path"===t.shape?this._translatePath(t.d,e,e):t.d,conditions:t.conditions.map(t=>({...t})),actions:t.actions.map(t=>({title:t.title,conditions:t.conditions.map(t=>({...t}))}))}}_addButton(){this._recordHistory();const t=Math.max(30,Math.round(Math.min(this._imageWidth||120,this._imageHeight||120)/8)),e={shape:"rectangle",x:Math.max(0,Math.round((this._imageWidth-t)/2)),y:Math.max(0,Math.round((this._imageHeight-t)/2)),width:t,height:t,conditions:[],actions:[{title:"press",conditions:[]}]};this._buttons=[...this._buttons,e],this._selectedButton=this._buttons.length-1}_copyPreviousButton(){this._recordHistory();const t=this._selectedButton>0?this._selectedButton-1:this._buttons.length-1;if(t<0||!this._buttons[t])return void At(this,"No previous button to copy");const e=this._cloneButton(this._buttons[t]);this._buttons=[...this._buttons,e],this._selectedButton=this._buttons.length-1,At(this,`Copied button ${t+1}`)}_removeButton(t){this._recordHistory(),this._buttons=this._buttons.filter((e,i)=>i!==t),this._selectedButton=Math.max(0,Math.min(this._selectedButton,this._buttons.length-1))}_updateButton(t,e){this._buttons=this._buttons.map((i,s)=>s===t?{...i,...e}:i)}_addAction(t){this._recordHistory();const e=this._buttons[t];this._updateButton(t,{actions:[...e.actions,{title:"press",conditions:[]}]})}_removeAction(t,e){this._recordHistory();const i=this._buttons[t];this._updateButton(t,{actions:i.actions.filter((t,i)=>i!==e)})}_updateAction(t,e,i){const s=this._buttons[t];this._updateButton(t,{actions:s.actions.map((t,s)=>s===e?{...t,...i}:t)})}_buildBlueprint(){const t=this._buttons.map(t=>{const e={conditions:this._cleanConditions(t.conditions),actions:t.actions.map(t=>({title:t.title.trim(),conditions:this._cleanConditions(t.conditions)}))};return this._buttons.length>1&&("path"===t.shape?t.d&&(e.d=t.d.trim()):(e.x=t.x,e.y=t.y,e.width=t.width,"rectangle"===t.shape&&(e.height=t.height||t.width))),e}),e={name:this._name.trim(),service:this._service.trim(),event_type:this._eventType.trim(),buttons:t};return"mqtt"===this._eventType?(this._mqttTopicFormat.trim()&&(e.mqtt_topic_format=this._mqttTopicFormat.trim()),this._mqttSubTopics&&(e.mqtt_sub_topics=!0)):e.identifier_key=this._identifierKey.trim(),e}_cleanConditions(t){return t.filter(t=>t.key.trim()&&t.value.trim()).map(t=>({key:t.key.trim(),value:t.value.trim()}))}async _save(){if(this._error=void 0,this._imageDataUrl)if(this._buttons.length)if(this._buttons.some(t=>!t.actions.length||t.actions.some(t=>!t.title.trim())))this._error="Each button needs at least one titled action.";else if(this._buttons.some(t=>!("path"!==t.shape||t.d&&this._isValidPath(t.d))))this._error="One or more custom path buttons have an invalid SVG path.";else{this._saving=!0;try{const t={id:this._id,blueprint:this._buildBlueprint(),overwrite:this._isEdit};this._isEdit&&!this._imageChanged||(t.image=this._imageDataUrl);const e=await this.hass.callWS({type:$t("blueprint/save"),payload:t});At(this,this._isEdit?"Blueprint Updated":"Blueprint Saved"),this._baselineSnapshot=this._snapshot(),this._clearHistory(),Ct(xt(`new/${e.blueprint_id}`))}catch(t){this._error=t.message||"Unable to save blueprint."}finally{this._saving=!1}}else this._error="Add at least one button before saving.";else this._error="Upload a remote image before saving."}_snapshot(){return{id:this._id,name:this._name,service:this._service,eventType:this._eventType,identifierKey:this._identifierKey,mqttTopicFormat:this._mqttTopicFormat,mqttSubTopics:this._mqttSubTopics,imageDataUrl:this._imageDataUrl,imageWidth:this._imageWidth,imageHeight:this._imageHeight,imageChanged:this._imageChanged,buttons:JSON.parse(JSON.stringify(this._buttons)),selectedButton:this._selectedButton}}_restoreSnapshot(t){this._restoringHistory=!0,this._id=t.id,this._name=t.name,this._service=t.service,this._eventType=t.eventType,this._identifierKey=t.identifierKey,this._mqttTopicFormat=t.mqttTopicFormat,this._mqttSubTopics=t.mqttSubTopics,this._imageDataUrl=t.imageDataUrl,this._imageWidth=t.imageWidth,this._imageHeight=t.imageHeight,this._imageChanged=t.imageChanged,this._buttons=JSON.parse(JSON.stringify(t.buttons)),this._selectedButton=t.selectedButton,this._restoringHistory=!1}_syncHistoryFlags(){this._canUndo=this._undoStack.length>0,this._canRedo=this._redoStack.length>0}_clearHistory(){this._undoStack=[],this._redoStack=[],this._syncHistoryFlags(),this._updateDirty()}_updateDirty(){this._dirty=JSON.stringify(this._snapshot())!==JSON.stringify(this._baselineSnapshot)}_recordHistory(){this._restoringHistory||this._drag||(this._undoStack.push(this._snapshot()),this._undoStack.length>50&&this._undoStack.shift(),this._redoStack=[],this._updateDirty(),this._syncHistoryFlags())}_recordHistoryForText(){this._textHistoryPending||(this._recordHistory(),this._textHistoryPending=!0),this._historyDebounce&&clearTimeout(this._historyDebounce),this._historyDebounce=setTimeout(()=>{this._textHistoryPending=!1},800)}_undo(){if(!this._undoStack.length)return;this._redoStack.push(this._snapshot());const t=this._undoStack.pop();this._restoreSnapshot(t),this._updateDirty(),this._syncHistoryFlags()}_redo(){if(!this._redoStack.length)return;this._undoStack.push(this._snapshot());const t=this._redoStack.pop();this._restoreSnapshot(t),this._updateDirty(),this._syncHistoryFlags()}_onBeforeUnload(t){this._dirty&&(t.preventDefault(),t.returnValue="")}_onPopState(){this._dirty&&(history.pushState(null,"",this._leavePath),this._confirmDiscard(()=>Ct(xt())))}_onKeyDown(t){if(!t.ctrlKey&&!t.metaKey)return;const e=t.target;"INPUT"!==e.tagName&&"TEXTAREA"!==e.tagName&&"SELECT"!==e.tagName&&("z"===t.key||"Z"===t.key?(t.preventDefault(),t.shiftKey?this._redo():this._undo()):"y"!==t.key&&"Y"!==t.key||(t.preventDefault(),this._redo()))}_confirmDiscard(t){this._dirty?kt(this,"switch-manager-dialog-confirm",()=>Promise.resolve().then(function(){return jt}),{title:"Discard unsaved changes?",text:"Your blueprint changes will be lost if you leave without saving.",confirmText:"Discard",dismissText:"Stay",destructive:!0,confirm:()=>{this._clearHistory(),t()}}):t()}_slug(t){return t.toLowerCase().trim().replace(/[^a-z0-9_-]+/g,"-").replace(/^-+|-+$/g,"").slice(0,80)}_back(){this._confirmDiscard(()=>Ct(xt()))}static{this.styles=n`
    :host {
      display: block;
    }
    .loading {
      padding: 24px;
      color: var(--secondary-text-color);
    }
    .toolbar {
      display: flex;
      align-items: center;
      height: var(--header-height, 56px);
      box-sizing: border-box;
      padding: 0 12px;
      background-color: var(--app-header-background-color, var(--primary-color));
      color: var(--app-header-text-color, var(--text-primary-color, #fff));
      font-size: 20px;
      font-weight: 400;
    }
    .main-title {
      flex: 1;
      margin: 0 16px;
    }
    .toolbar-actions {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .version {
      font-size: 14px;
      opacity: 0.8;
    }
    .view {
      display: block;
      height: calc(100vh - var(--header-height, 56px));
      overflow-y: auto;
    }
    .grid {
      display: grid;
      grid-template-columns: minmax(280px, 1fr) minmax(320px, 520px);
      gap: 16px;
      padding: 16px;
    }
    .card {
      background: var(--card-background-color, var(--ha-card-background, var(--secondary-background-color)));
      border: 1px solid var(--divider-color);
      border-radius: 12px;
      padding: 16px;
      box-sizing: border-box;
    }
    h2, h3 {
      margin: 0 0 12px;
      font-weight: 500;
    }
    .hint, .dimensions {
      color: var(--secondary-text-color);
      font-size: 0.9rem;
    }
    .file-picker {
      display: inline-block;
      margin: 8px 0 16px;
      cursor: pointer;
    }
    .preview {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 320px;
      touch-action: none;
    }
    svg {
      max-width: 100%;
      max-height: 520px;
      overflow: visible;
      user-select: none;
    }
    svg image {
      filter: drop-shadow(0px 0px 8px #00000033);
      pointer-events: none;
    }
    svg .button {
      fill: #00000000;
      stroke: #00adff80;
      stroke-width: 3;
      cursor: grab;
      touch-action: none;
    }
    svg .button.selected {
      fill: #6bd3ff75;
      stroke: #0082e9;
      cursor: grabbing;
    }
    svg .resize-handle {
      fill: #0082e9;
      stroke: #fff;
      stroke-width: 2;
      cursor: nwse-resize;
      touch-action: none;
    }
    .empty-preview {
      min-height: 320px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--secondary-text-color);
      border: 1px dashed var(--divider-color);
      border-radius: 10px;
    }
    .fields {
      display: grid;
      gap: 12px;
    }
    .fields.two {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    label {
      display: flex;
      flex-direction: column;
      gap: 4px;
      color: var(--secondary-text-color);
      font-size: 0.9rem;
    }
    label.checkbox {
      flex-direction: row;
      align-items: center;
      color: var(--primary-text-color);
    }
    input, select, textarea {
      box-sizing: border-box;
      width: 100%;
      border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.3));
      border-radius: 6px;
      background: var(--primary-background-color);
      color: var(--primary-text-color);
      font: inherit;
      padding: 8px;
    }
    textarea {
      font-family: var(--code-font-family, monospace);
      font-size: 0.85rem;
      resize: vertical;
    }
    .path-field {
      margin-top: 12px;
    }
    .path-error {
      color: var(--error-color);
      font-size: 0.85rem;
      margin: 4px 0 0;
    }
    input:disabled {
      opacity: 0.7;
    }
    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-top: 20px;
    }
    .section-header.compact {
      margin: 12px 0;
    }
    .header-actions {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    .button-tabs {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin: 12px 0;
    }
    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      border: 1px solid var(--divider-color);
      border-radius: 6px;
      background: var(--secondary-background-color);
      color: var(--primary-text-color);
      padding: 8px 12px;
      font: inherit;
      cursor: pointer;
    }
    button.selected, button.primary {
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
      border-color: var(--primary-color);
    }
    button.danger {
      color: var(--error-color);
    }
    button.icon-only {
      padding: 8px;
    }
    button:disabled {
      opacity: 0.6;
      cursor: default;
    }
    .conditions {
      display: grid;
      gap: 8px;
      margin-bottom: 12px;
    }
    .condition {
      display: grid;
      grid-template-columns: 1fr 1fr auto;
      gap: 8px;
      align-items: end;
    }
    .action-editor {
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      padding: 12px;
      margin: 8px 0;
    }
    .actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      margin-top: 24px;
    }
    ha-alert {
      display: block;
      margin: 0 0 12px;
    }
    ha-svg-icon {
      width: 18px;
      height: 18px;
    }
    @media (max-width: 900px) {
      .grid {
        grid-template-columns: 1fr;
      }
      .fields.two, .condition {
        grid-template-columns: 1fr;
      }
    }
  `}};t([gt({attribute:!1})],Ot.prototype,"hass",void 0),t([gt({type:Boolean})],Ot.prototype,"narrow",void 0),t([gt({attribute:!1})],Ot.prototype,"panel",void 0),t([gt({attribute:!1})],Ot.prototype,"route",void 0),t([gt({attribute:!1})],Ot.prototype,"params",void 0),t([_t()],Ot.prototype,"_id",void 0),t([_t()],Ot.prototype,"_name",void 0),t([_t()],Ot.prototype,"_service",void 0),t([_t()],Ot.prototype,"_eventType",void 0),t([_t()],Ot.prototype,"_identifierKey",void 0),t([_t()],Ot.prototype,"_mqttTopicFormat",void 0),t([_t()],Ot.prototype,"_mqttSubTopics",void 0),t([_t()],Ot.prototype,"_imageDataUrl",void 0),t([_t()],Ot.prototype,"_imageWidth",void 0),t([_t()],Ot.prototype,"_imageHeight",void 0),t([_t()],Ot.prototype,"_imageChanged",void 0),t([_t()],Ot.prototype,"_buttons",void 0),t([_t()],Ot.prototype,"_selectedButton",void 0),t([_t()],Ot.prototype,"_saving",void 0),t([_t()],Ot.prototype,"_loading",void 0),t([_t()],Ot.prototype,"_error",void 0),t([_t()],Ot.prototype,"_isEdit",void 0),t([_t()],Ot.prototype,"_canUndo",void 0),t([_t()],Ot.prototype,"_canRedo",void 0),Ot=t([dt("switch-manager-blueprint-editor")],Ot);const zt=["ha-automation-action","ha-service-control","ha-selector","ha-yaml-editor","ha-card","ha-fab","ha-alert","ha-svg-icon","ha-icon-button","ha-menu-button"];let Rt=class extends ht{constructor(){super(...arguments),this.narrow=!1,this._params={},this._componentsLoaded=!1}set route(t){this._route=t;const e=t.path.split("/");"new"===e[1]?this._params={action:"new",blueprint:e[2]}:"edit"===e[1]?this._params={action:"edit",id:e[2]}:"blueprint"===e[1]&&"new"===e[2]?this._params={action:"blueprint-new"}:"blueprint"===e[1]&&"edit"===e[2]&&e[3]?this._params={action:"blueprint-edit",id:e[3]}:this._params={}}get route(){return this._route}render(){return this._componentsLoaded?"blueprint-new"===this._params.action||"blueprint-edit"===this._params.action?j`
        <switch-manager-blueprint-editor
          .hass=${this.hass}
          .narrow=${this.narrow}
          .route=${this._route}
          .panel=${this.panel}
          .params=${this._params}
        ></switch-manager-blueprint-editor>
      `:"action"in this._params?j`
        <switch-manager-switch-editor
          .hass=${this.hass}
          .narrow=${this.narrow}
          .route=${this._route}
          .panel=${this.panel}
          .params=${this._params}
        ></switch-manager-switch-editor>
      `:j`
      <switch-manager-index
        .hass=${this.hass}
        .narrow=${this.narrow}
        .route=${this._route}
        .panel=${this.panel}
      ></switch-manager-index>
    `:j`<div class="loading">Loading…</div>`}async firstUpdated(){this.hass.loadFragmentTranslation("config"),this.hass.loadBackendTranslation("title"),this.hass.loadBackendTranslation("device_automation"),this.hass.loadBackendTranslation("config"),this.hass.loadBackendTranslation("services"),this.hass.loadBackendTranslation("selector"),this.hass.loadBackendTranslation("entity_component"),this._applyTheme();try{await(async t=>{const e=t||bt;try{if(e.every(t=>customElements.get(t)))return;await Promise.race([customElements.whenDefined("partial-panel-resolver"),new Promise((t,e)=>setTimeout(()=>e(new Error("Timeout waiting for partial-panel-resolver")),1e4))]);const t=document.createElement("partial-panel-resolver");if(!t)throw new Error("Failed to create partial-panel-resolver element");if(t.hass={panels:[{url_path:"tmp",component_name:"config"}]},"function"!=typeof t._updateRoutes)throw new Error("partial-panel-resolver does not have _updateRoutes method");if(t._updateRoutes(),!t.routerOptions?.routes?.tmp?.load)throw new Error("Failed to create tmp route in partial-panel-resolver");await Promise.race([t.routerOptions.routes.tmp.load(),new Promise((t,e)=>setTimeout(()=>e(new Error("Timeout loading tmp route")),1e4))]),await Promise.race([customElements.whenDefined("ha-panel-config"),new Promise((t,e)=>setTimeout(()=>e(new Error("Timeout waiting for ha-panel-config")),1e4))]);const i=document.createElement("ha-panel-config");if(!i)throw new Error("Failed to create ha-panel-config element");if(!i.routerOptions?.routes?.automation?.load)throw new Error("ha-panel-config does not have automation route");await Promise.race([i.routerOptions.routes.automation.load(),new Promise((t,e)=>setTimeout(()=>e(new Error("Timeout loading automation components")),1e4))]);const s=e.filter(t=>!customElements.get(t));if(s.length>0)throw new Error(`Failed to load components: ${s.join(", ")}`)}catch(t){console.error("Error loading Home Assistant form components:",t);try{if(window.customElements&&window.customElements.get("home-assistant")){console.log("Attempting fallback loading method for HA components");const t=new CustomEvent("ha-request-load-components",{detail:{components:e},bubbles:!0,composed:!0});document.dispatchEvent(t)}}catch(t){console.error("Fallback loading method failed:",t)}}})(zt)}catch(t){console.error("switch_manager: loadHaComponents failed",t)}this._componentsLoaded=!0}updated(t){super.updated(t);const e=t.get("hass");e&&e.themes!==this.hass.themes&&this._applyTheme()}provideHass(t){t.hass=this.hass}_applyTheme(){this.style.backgroundColor="var(--primary-background-color)",this.style.color="var(--primary-text-color)",this.style.fontFamily="var(--mdc-typography-headline6-font-family, var(--mdc-typography-font-family, Roboto, sans-serif))"}static{this.styles=n`
    :host {
      display: block;
    }
    .loading {
      padding: 24px;
      color: var(--secondary-text-color);
    }
  `}};t([gt({attribute:!1})],Rt.prototype,"hass",void 0),t([gt({type:Boolean})],Rt.prototype,"narrow",void 0),t([gt({attribute:!1})],Rt.prototype,"panel",void 0),t([_t()],Rt.prototype,"_params",void 0),t([_t()],Rt.prototype,"_componentsLoaded",void 0),t([gt({attribute:!1})],Rt.prototype,"route",null),Rt=t([dt("switch-manager-panel")],Rt);let Ft=class extends ht{showDialog(t){this._params=t}closeDialog(){this._params=void 0}render(){return this._params?j`
      <switch-manager-dialog
        @closed=${this._dismiss}
        .heading=${this._params.title||"Confirm"}
      >
        <div>${this._params.text||""}</div>
        ${this._params.prompt?j`<input
              id="prompt-input"
              class="text-input"
              type="text"
              .value=${this._params.promptValue||""}
            />`:""}
        <button slot="actions" @click=${this._dismiss}>
          ${this._params.dismissText||"Cancel"}
        </button>
        <button
          slot="actions"
          @click=${this._confirm}
          class=${this._params.destructive?"destructive":""}
        >
          ${this._params.confirmText||"OK"}
        </button>
      </switch-manager-dialog>
    `:j``}_dismiss(){this._params?.cancel?.(),this.closeDialog()}_confirm(){this._params?.confirm?.(),this.closeDialog()}static{this.styles=n`
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
  `}};t([_t()],Ft.prototype,"_params",void 0),Ft=t([dt("switch-manager-dialog-confirm")],Ft);var jt=Object.freeze({__proto__:null,get SwitchManagerDialogConfirm(){return Ft}});let It=class extends ht{constructor(){super(...arguments),this._identifier="",this._discovered=[],this._listening=!1}showDialog(t){this._params=t,this._identifier=t.identifier||"",this._discovered=[],this.hass=this.parentElement?.hass||document.querySelector("home-assistant")?.hass,this._startDiscovery()}closeDialog(){this._stopDiscovery(),this._params?.onClose?.(),this._params=void 0}async _startDiscovery(){const t=this._params.blueprint;if(t){this._listening=!0;try{this._unsubscribe=await this.hass.connection.subscribeMessage(t=>{t.identifier&&!this._discovered.includes(t.identifier)&&(this._discovered=[...this._discovered,t.identifier])},{type:$t("blueprints/auto_discovery"),blueprint_id:t.id})}catch{this._listening=!1}}}_stopDiscovery(){this._unsubscribe?.(),this._unsubscribe=void 0,this._listening=!1}render(){return this._params?j`
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
            @input=${t=>this._identifier=t.target.value}
          />

          ${this._params.blueprint?.mqtt_topic_format?j`<div class="identifier-ref">
                MQTT Discovery Topic:
                <b>${this._params.blueprint.mqtt_topic_format}</b>
                |
                <a href="/config/mqtt" target="_blank" rel="noreferrer"
                  >MQTT Tool</a
                >
              </div>`:this._params.blueprint?.event_type?j`<div class="identifier-ref">
                Event Type: <b>${this._params.blueprint.event_type}</b>
                |
                <a href="/developer-tools/event" target="_blank" rel="noreferrer"
                  >Event Tool</a
                >
              </div>`:""}

          ${this._listening?j`
                <div class="discovery">
                  <p>
                    Press a button on your switch to auto-discover its
                    identifier...
                  </p>
                  <div class="spinner"></div>
                  ${this._discovered.length?j`
                        <div class="discovered-list">
                          ${this._discovered.map(t=>j`
                              <div
                                class="list-item"
                                @click=${()=>this._selectIdentifier(t)}
                              >
                                ${t}
                              </div>
                            `)}
                        </div>
                      `:""}
                </div>
              `:""}
        </div>
        <button slot="actions" @click=${this.closeDialog}>Cancel</button>
        <button slot="actions" @click=${this._save}>Save</button>
      </switch-manager-dialog>
    `:j``}_selectIdentifier(t){this._identifier=t}_save(){this._params?.update?.({identifier:this._identifier}),this.closeDialog()}static{this.styles=n`
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
  `}};t([_t()],It.prototype,"_params",void 0),t([_t()],It.prototype,"_identifier",void 0),t([_t()],It.prototype,"_discovered",void 0),t([_t()],It.prototype,"_listening",void 0),It=t([dt("switch-manager-dialog-identifier-auto-discovery")],It);var Zt=Object.freeze({__proto__:null,get SwitchManagerDialogIdentifierAutoDiscovery(){return It}});let Wt=class extends ht{constructor(){super(...arguments),this._name=""}showDialog(t){this._params=t,this._name=t.config?.name||""}closeDialog(){this._params?.onClose?.(),this._params=void 0}render(){return this._params?j`
      <switch-manager-dialog @closed=${this.closeDialog} heading="Rename Switch">
        <input
          class="text-input"
          type="text"
          placeholder="Name"
          .value=${this._name}
          autofocus
          @input=${t=>this._name=t.target.value}
        />
        <button slot="actions" @click=${this.closeDialog}>Cancel</button>
        <button slot="actions" @click=${this._save}>Save</button>
      </switch-manager-dialog>
    `:j``}_save(){this._name.trim()&&this._params?.update?.({name:this._name.trim()}),this.closeDialog()}static{this.styles=n`
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
  `}};t([_t()],Wt.prototype,"_params",void 0),t([_t()],Wt.prototype,"_name",void 0),Wt=t([dt("switch-manager-dialog-rename-switch")],Wt);var Kt=Object.freeze({__proto__:null,get SwitchManagerDialogRenameSwitch(){return Wt}});let Jt=class extends ht{constructor(){super(...arguments),this._switches=[],this._copyVariables=!0}showDialog(t){this._params=t,this.hass=this.parentElement?.hass||document.querySelector("home-assistant")?.hass,this._loadSwitches()}closeDialog(){this._params?.onClose?.(),this._params=void 0,this._switches=[]}async _loadSwitches(){const t=await this.hass.callWS({type:$t("copy_from_list"),blueprint_id:this._params.blueprint_id,skip_config_id:this._params.current_switch_id||""});this._switches=t.switches}render(){return this._params?j`
      <switch-manager-dialog @closed=${this.closeDialog} heading="Copy From">
        <div class="content">
          ${0===this._switches.length?j`<p>No other switches with this blueprint found.</p>`:j`
                <label class="checkbox">
                  <input
                    type="checkbox"
                    .checked=${this._copyVariables}
                    @change=${t=>this._copyVariables=t.target.checked}
                  />
                  Copy variables
                </label>
                <div class="switch-list">
                  ${this._switches.map(t=>j`
                      <div
                        class="list-item"
                        @click=${()=>this._selectSwitch(t)}
                      >
                        ${t.name}
                      </div>
                    `)}
                </div>
              `}
        </div>
        <button slot="actions" @click=${this.closeDialog}>Cancel</button>
      </switch-manager-dialog>
    `:j``}_selectSwitch(t){this._params?.update?.({buttons:JSON.parse(JSON.stringify(t.buttons)),variables:!!this._copyVariables&&JSON.parse(JSON.stringify(t.variables||{}))}),this.closeDialog()}static{this.styles=n`
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
  `}};t([_t()],Jt.prototype,"_params",void 0),t([_t()],Jt.prototype,"_switches",void 0),t([_t()],Jt.prototype,"_copyVariables",void 0),Jt=t([dt("switch-manager-dialog-copy-from")],Jt);var Gt=Object.freeze({__proto__:null,get SwitchManagerDialogCopyFrom(){return Jt}});let Qt=class extends ht{constructor(){super(...arguments),this._variables={}}showDialog(t){this._params=t,this._variables=JSON.parse(JSON.stringify(t.config?.variables||{}))}closeDialog(){this._params?.onClose?.(),this._params=void 0}render(){return this._params?j`
      <switch-manager-dialog @closed=${this.closeDialog} heading="Variables">
        <div class="content">
          <ha-yaml-editor
            .value=${this._variables}
            @value-changed=${t=>this._variables=t.detail.value}
          ></ha-yaml-editor>
        </div>
        <button slot="actions" @click=${this.closeDialog}>Cancel</button>
        <button slot="actions" @click=${this._save}>Save</button>
      </switch-manager-dialog>
    `:j``}_save(){this._params?.update?.({variables:this._variables}),this.closeDialog()}static{this.styles=n`
    .content {
      min-width: 400px;
    }
  `}};t([_t()],Qt.prototype,"_params",void 0),t([_t()],Qt.prototype,"_variables",void 0),Qt=t([dt("switch-manager-dialog-variables-editor")],Qt);var Yt=Object.freeze({__proto__:null,get SwitchManagerDialogVariablesEditor(){return Qt}});export{Rt as SwitchManagerPanel};
