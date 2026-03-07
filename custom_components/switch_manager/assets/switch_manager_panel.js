!function(t){"use strict";function e(t,e,i,s){var o,a=arguments.length,n=a<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var r=t.length-1;r>=0;r--)(o=t[r])&&(n=(a<3?o(n):a>3?o(e,i,n):o(e,i))||n);return a>3&&n&&Object.defineProperty(e,i,n),n}"function"==typeof SuppressedError&&SuppressedError;const i=globalThis,s=i.ShadowRoot&&(void 0===i.ShadyCSS||i.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),a=new WeakMap;let n=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(s&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=a.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&a.set(e,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new n(i,t,o)},h=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,o))(e)})(t):t,{is:c,defineProperty:l,getOwnPropertyDescriptor:d,getOwnPropertyNames:p,getOwnPropertySymbols:u,getPrototypeOf:g}=Object,m=globalThis,_=m.trustedTypes,b=_?_.emptyScript:"",f=m.reactiveElementPolyfillSupport,v=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?b:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},w=(t,e)=>!c(t,e),$={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:w};Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let A=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&l(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:o}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const a=s?.call(this);o?.call(this,e),this.requestUpdate(t,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=g(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...p(t),...u(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(h(t))}else void 0!==t&&e.push(h(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{if(s)t.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const s of e){const e=document.createElement("style"),o=i.litNonce;void 0!==o&&e.setAttribute("nonce",o),e.textContent=s.cssText,t.appendChild(e)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=s;const a=o.fromAttribute(e,t.type);this[s]=a??this._$Ej?.get(s)??a,this._$Em=null}}requestUpdate(t,e,i,s=!1,o){if(void 0!==t){const a=this.constructor;if(!1===s&&(o=this[t]),i??=a.getPropertyOptions(t),!((i.hasChanged??w)(o,e)||i.useDefault&&i.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(a._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:o},a){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,a??e??this[t]),!0!==o||void 0!==a)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};A.elementStyles=[],A.shadowRootOptions={mode:"open"},A[v("elementProperties")]=new Map,A[v("finalized")]=new Map,f?.({ReactiveElement:A}),(m.reactiveElementVersions??=[]).push("2.1.2");const x=globalThis,C=t=>t,S=x.trustedTypes,V=S?S.createPolicy("lit-html",{createHTML:t=>t}):void 0,H="$lit$",M=`lit$${Math.random().toFixed(9).slice(2)}$`,E="?"+M,k=`<${E}>`,L=document,D=()=>L.createComment(""),P=t=>null===t||"object"!=typeof t&&"function"!=typeof t,O=Array.isArray,T="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,U=/-->/g,q=/>/g,R=RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,B=/"/g,z=/^(?:script|style|textarea|title)$/i,I=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),Z=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),F=new WeakMap,J=L.createTreeWalker(L,129);function G(t,e){if(!O(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==V?V.createHTML(e):e}const K=(t,e)=>{const i=t.length-1,s=[];let o,a=2===e?"<svg>":3===e?"<math>":"",n=N;for(let e=0;e<i;e++){const i=t[e];let r,h,c=-1,l=0;for(;l<i.length&&(n.lastIndex=l,h=n.exec(i),null!==h);)l=n.lastIndex,n===N?"!--"===h[1]?n=U:void 0!==h[1]?n=q:void 0!==h[2]?(z.test(h[2])&&(o=RegExp("</"+h[2],"g")),n=R):void 0!==h[3]&&(n=R):n===R?">"===h[0]?(n=o??N,c=-1):void 0===h[1]?c=-2:(c=n.lastIndex-h[2].length,r=h[1],n=void 0===h[3]?R:'"'===h[3]?B:j):n===B||n===j?n=R:n===U||n===q?n=N:(n=R,o=void 0);const d=n===R&&t[e+1].startsWith("/>")?" ":"";a+=n===N?i+k:c>=0?(s.push(r),i.slice(0,c)+H+i.slice(c)+M+d):i+M+(-2===c?e:d)}return[G(t,a+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class Y{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,a=0;const n=t.length-1,r=this.parts,[h,c]=K(t,e);if(this.el=Y.createElement(h,i),J.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=J.nextNode())&&r.length<n;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(H)){const e=c[a++],i=s.getAttribute(t).split(M),n=/([.?@])?(.*)/.exec(e);r.push({type:1,index:o,name:n[2],strings:i,ctor:"."===n[1]?it:"?"===n[1]?st:"@"===n[1]?ot:et}),s.removeAttribute(t)}else t.startsWith(M)&&(r.push({type:6,index:o}),s.removeAttribute(t));if(z.test(s.tagName)){const t=s.textContent.split(M),e=t.length-1;if(e>0){s.textContent=S?S.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],D()),J.nextNode(),r.push({type:2,index:++o});s.append(t[e],D())}}}else if(8===s.nodeType)if(s.data===E)r.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(M,t+1));)r.push({type:7,index:o}),t+=M.length-1}o++}}static createElement(t,e){const i=L.createElement("template");return i.innerHTML=t,i}}function Q(t,e,i=t,s){if(e===Z)return e;let o=void 0!==s?i._$Co?.[s]:i._$Cl;const a=P(e)?void 0:e._$litDirective$;return o?.constructor!==a&&(o?._$AO?.(!1),void 0===a?o=void 0:(o=new a(t),o._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=o:i._$Cl=o),void 0!==o&&(e=Q(t,o._$AS(t,e.values),o,s)),e}class X{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??L).importNode(e,!0);J.currentNode=s;let o=J.nextNode(),a=0,n=0,r=i[0];for(;void 0!==r;){if(a===r.index){let e;2===r.type?e=new tt(o,o.nextSibling,this,t):1===r.type?e=new r.ctor(o,r.name,r.strings,this,t):6===r.type&&(e=new at(o,this,t)),this._$AV.push(e),r=i[++n]}a!==r?.index&&(o=J.nextNode(),a++)}return J.currentNode=L,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class tt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),P(t)?t===W||null==t||""===t?(this._$AH!==W&&this._$AR(),this._$AH=W):t!==this._$AH&&t!==Z&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>O(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==W&&P(this._$AH)?this._$AA.nextSibling.data=t:this.T(L.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Y.createElement(G(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new X(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=F.get(t.strings);return void 0===e&&F.set(t.strings,e=new Y(t)),e}k(t){O(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new tt(this.O(D()),this.O(D()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=C(t).nextSibling;C(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class et{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,o){this.type=1,this._$AH=W,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(t,e=this,i,s){const o=this.strings;let a=!1;if(void 0===o)t=Q(this,t,e,0),a=!P(t)||t!==this._$AH&&t!==Z,a&&(this._$AH=t);else{const s=t;let n,r;for(t=o[0],n=0;n<o.length-1;n++)r=Q(this,s[i+n],e,n),r===Z&&(r=this._$AH[n]),a||=!P(r)||r!==this._$AH[n],r===W?t=W:t!==W&&(t+=(r??"")+o[n+1]),this._$AH[n]=r}a&&!s&&this.j(t)}j(t){t===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class it extends et{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===W?void 0:t}}class st extends et{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==W)}}class ot extends et{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??W)===Z)return;const i=this._$AH,s=t===W&&i!==W||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==W&&(i===W||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class at{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const nt=x.litHtmlPolyfillSupport;nt?.(Y,tt),(x.litHtmlVersions??=[]).push("3.3.2");const rt=globalThis;let ht=class extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let o=s._$litPart$;if(void 0===o){const t=i?.renderBefore??null;s._$litPart$=o=new tt(e.insertBefore(D(),t),t,void 0,i??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Z}};ht._$litElement$=!0,ht.finalized=!0,rt.litElementHydrateSupport?.({LitElement:ht});const ct=rt.litElementPolyfillSupport;ct?.({LitElement:ht}),(rt.litElementVersions??=[]).push("4.2.2");const lt=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},dt={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:w},pt=(t=dt,e,i)=>{const{kind:s,metadata:o}=i;let a=globalThis.litPropertyMetadata.get(o);if(void 0===a&&globalThis.litPropertyMetadata.set(o,a=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),a.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const o=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,o,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const o=this[s];e.call(this,i),this.requestUpdate(s,o,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function ut(t){return(e,i)=>"object"==typeof i?pt(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function gt(t){return ut({...t,state:!0,attribute:!1})}const mt=(t,e,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,i),i);function _t(t,e){return(i,s,o)=>{const a=e=>e.renderRoot?.querySelector(t)??null;if(e){const{get:t,set:e}="object"==typeof s?i:o??(()=>{const t=Symbol();return{get(){return this[t]},set(e){this[t]=e}}})();return mt(i,s,{get(){let i=t.call(this);return void 0===i&&(i=a(this),(null!==i||this.hasUpdated)&&e.call(this,i)),i}})}return mt(i,s,{get(){return a(this)}})}}const bt="switch_manager",ft=["single","restart","queued","parallel"];function vt(t){return t?`/${bt}/${t}`:`/${bt}`}function yt(t){return`/assets/${bt}/${t}`}function wt(t){return`${bt}/${t}`}function $t(t){history.pushState(null,"",t);const e=new Event("location-changed");window.dispatchEvent(e)}function At(t,e,i){const s=new CustomEvent(e,{bubbles:!0,composed:!0,detail:i});t.dispatchEvent(s)}function xt(t,e){At(t,"hass-notification",{message:e})}function Ct(t,e,i,s){At(t,"show-dialog",{dialogTag:e,dialogImport:i,dialogParams:s})}let St=class extends ht{constructor(){super(...arguments),this._blueprints=[],this._filter=""}showDialog(t){this._params=t,this.hass=this.parentElement?.hass||document.querySelector("home-assistant")?.hass,this._loadBlueprints()}closeDialog(){this._params=void 0,this._blueprints=[],this._filter=""}async _loadBlueprints(){const t=await this.hass.callWS({type:wt("blueprints")});this._blueprints=Object.values(t.blueprints)}render(){if(!this._params)return I``;const t=this._filter?this._blueprints.filter(t=>t.name.toLowerCase().includes(this._filter.toLowerCase())||t.service.toLowerCase().includes(this._filter.toLowerCase())):this._blueprints;return I`
      <ha-dialog open @closed=${this.closeDialog} heading="Select Blueprint">
        <search-input
          .filter=${this._filter}
          @value-changed=${t=>this._filter=t.detail.value}
        ></search-input>
        <div class="blueprints">
          ${t.map(t=>I`
              <ha-card
                outlined
                class="blueprint-item"
                @click=${()=>this._selectBlueprint(t)}
              >
                <div class="card-content">
                  <div class="image">
                    ${t.has_image?I`<img src="${yt(t.id+".png")}" />`:I`<ha-svg-icon
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
        <mwc-button slot="secondaryAction" @click=${this.closeDialog}>
          Cancel
        </mwc-button>
      </ha-dialog>
    `}_selectBlueprint(t){this.closeDialog(),$t(vt(`new/${t.id}`))}static{this.styles=r`
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
    search-input {
      display: block;
      margin-bottom: 8px;
    }
  `}};e([gt()],St.prototype,"_params",void 0),e([gt()],St.prototype,"_blueprints",void 0),e([gt()],St.prototype,"_filter",void 0),St=e([lt("switch-manager-dialog-blueprint-selector")],St);var Vt=Object.freeze({__proto__:null,get SwitchManagerDialogBlueprintSelector(){return St}});let Ht=class extends ht{constructor(){super(...arguments),this.narrow=!1,this._data=[]}connectedCallback(){super.connectedCallback(),this._populateSwitches()}render(){return I`
      <ha-app-layout>
        <app-header slot="header" fixed>
          <app-toolbar>
            <ha-menu-button
              .hass=${this.hass}
              .narrow=${this.narrow}
            ></ha-menu-button>
            <div main-title>Switch Manager</div>
            <div>v${this.panel.config.version}</div>
          </app-toolbar>
        </app-header>
      </ha-app-layout>
      <hui-view>
        <hui-panel-view>
          <div class="switch-list">
            ${0===this._data.length?I`<div class="empty">No Switches configured</div>`:this._data.map(t=>I`
                    <ha-card
                      outlined
                      class="switch-item"
                      @click=${()=>this._editSwitch(t.switch_id)}
                    >
                      <div class="card-content row">
                        <div class="image-col">
                          ${t.switch.valid_blueprint&&t.switch.blueprint.has_image?I`<img
                                src="${yt(t.blueprint_id+".png")}"
                              />`:I`<ha-svg-icon
                                .path=${"M13 5C15.21 5 17 6.79 17 9C17 10.5 16.2 11.77 15 12.46V11.24C15.61 10.69 16 9.89 16 9C16 7.34 14.66 6 13 6S10 7.34 10 9C10 9.89 10.39 10.69 11 11.24V12.46C9.8 11.77 9 10.5 9 9C9 6.79 10.79 5 13 5M20 20.5C19.97 21.32 19.32 21.97 18.5 22H13C12.62 22 12.26 21.85 12 21.57L8 17.37L8.74 16.6C8.93 16.39 9.2 16.28 9.5 16.28H9.7L12 18V9C12 8.45 12.45 8 13 8S14 8.45 14 9V13.47L15.21 13.6L19.15 15.79C19.68 16.03 20 16.56 20 17.14V20.5M20 2H4C2.9 2 2 2.9 2 4V12C2 13.11 2.9 14 4 14H8V12L4 12L4 4H20L20 12H18V14H20V13.96L20.04 14C21.13 14 22 13.09 22 12V4C22 2.9 21.11 2 20 2Z"}
                              ></ha-svg-icon>`}
                        </div>
                        <div class="info-col">
                          <div class="name">
                            ${t.error?I`<span class="error"
                                  >${t.name} (${t.error})</span
                                >`:t.name}
                          </div>
                          ${this.narrow?"":I`<div class="secondary">
                                ${t.service} / ${t.type}
                              </div>`}
                        </div>
                        <div class="status-col">
                          ${t.enabled?"":I`<ha-svg-icon
                                class="disabled-icon"
                                .path=${"M12 2C17.5 2 22 6.5 22 12S17.5 22 12 22 2 17.5 2 12 6.5 2 12 2M12 4C10.1 4 8.4 4.6 7.1 5.7L18.3 16.9C19.3 15.5 20 13.8 20 12C20 7.6 16.4 4 12 4M16.9 18.3L5.7 7.1C4.6 8.4 4 10.1 4 12C4 16.4 7.6 20 12 20C13.9 20 15.6 19.4 16.9 18.3Z"}
                              ></ha-svg-icon>`}
                        </div>
                        <div class="actions-col">
                          <ha-button-menu corner="BOTTOM_START">
                            <ha-icon-button
                              slot="trigger"
                              .path=${"M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z"}
                              @click=${t=>t.stopPropagation()}
                            ></ha-icon-button>
                            <mwc-list-item
                              graphic="icon"
                              @click=${e=>{e.stopPropagation(),this._toggleEnabled(t.switch_id,t.enabled)}}
                            >
                              ${t.enabled?"Disable":"Enable"}
                              <ha-svg-icon
                                slot="graphic"
                                .path=${t.enabled?"M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4M9,9V15H15V9":"M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M10,16.5L16,12L10,7.5V16.5Z"}
                              ></ha-svg-icon>
                            </mwc-list-item>
                            <mwc-list-item
                              graphic="icon"
                              class="warning"
                              @click=${e=>{e.stopPropagation(),this._deleteConfirm(t)}}
                            >
                              Delete
                              <ha-svg-icon
                                slot="graphic"
                                class="warning"
                                .path=${"M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"}
                              ></ha-svg-icon>
                            </mwc-list-item>
                          </ha-button-menu>
                        </div>
                      </div>
                    </ha-card>
                  `)}
          </div>
          <div class="fab-container">
            <ha-fab
              slot="fab"
              .label=${"Add Switch"}
              extended
              @click=${this._showBlueprintDialog}
            >
              <ha-svg-icon
                slot="icon"
                .path=${"M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"}
              ></ha-svg-icon>
            </ha-fab>
          </div>
        </hui-panel-view>
      </hui-view>
    `}_populateSwitches(){this.hass.callWS({type:wt("configs")}).then(t=>{const e=[];Object.values(t.configs).forEach(t=>{const i=t.valid_blueprint?t.blueprint:{id:t.blueprint,service:"",name:""};e.push({switch:t,blueprint_id:i.id,switch_id:t.id,error:t._error,enabled:t.enabled,name:t.name,service:i.service||"",type:i.name||"",actions:t.id})}),this._data=e})}_editSwitch(t){$t(vt(`edit/${t}`))}async _toggleEnabled(t,e){try{const i=await this.hass.callWS({type:wt("config/enabled"),enabled:!e,config_id:t});this._populateSwitches(),xt(this,"Switch "+(i.enabled?"Enabled":"Disabled"))}catch(t){xt(this,t.message)}}async _deleteConfirm(t){Ct(this,"switch-manager-dialog-confirm",()=>Promise.resolve().then(function(){return Tt}),{title:"Delete switch?",text:`${t.name} will be permanently deleted.`,confirmText:"Delete",dismissText:"Cancel",confirm:()=>this._delete(t.switch_id),confirmation:!0,destructive:!0})}async _delete(t){try{await this.hass.callWS({type:wt("config/delete"),config_id:t.toString()}),this._populateSwitches(),xt(this,"Switch Deleted")}catch(t){xt(this,t.message)}}_showBlueprintDialog(){Ct(this,"switch-manager-dialog-blueprint-selector",()=>Promise.resolve().then(function(){return Vt}),{})}static{this.styles=r`
    :host {
      display: block;
    }
    hui-view {
      display: block;
      height: calc(100vh - var(--header-height));
      overflow-y: auto;
    }
    app-toolbar {
      height: var(--header-height);
    }
    app-header,
    app-toolbar {
      background-color: var(
        --app-header-background-color,
        var(--mdc-theme-primary)
      );
      font-weight: 400;
      color: var(--app-header-text-color, var(--mdc-theme-on-primary, #fff));
    }
    .switch-list {
      max-width: 1040px;
      margin: 16px auto;
      padding: 0 16px;
    }
    .switch-item {
      margin-bottom: 8px;
      cursor: pointer;
    }
    .switch-item:hover {
      background: var(--secondary-background-color);
    }
    .row {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .image-col {
      width: 64px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .image-col img {
      max-width: 100%;
      max-height: 48px;
      display: block;
    }
    .image-col ha-svg-icon {
      fill: var(--primary-color);
      width: 40px;
      height: 40px;
    }
    .info-col {
      flex: 1;
      min-width: 0;
    }
    .info-col .name {
      font-weight: 500;
    }
    .info-col .secondary {
      color: var(--secondary-text-color);
      font-size: 0.875em;
    }
    .error {
      color: red;
    }
    .status-col {
      flex-shrink: 0;
    }
    .disabled-icon {
      color: var(--secondary-text-color);
    }
    .actions-col {
      flex-shrink: 0;
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
  `}};e([ut({attribute:!1})],Ht.prototype,"hass",void 0),e([ut({type:Boolean})],Ht.prototype,"narrow",void 0),e([ut({attribute:!1})],Ht.prototype,"panel",void 0),e([ut({attribute:!1})],Ht.prototype,"route",void 0),e([gt()],Ht.prototype,"_data",void 0),Ht=e([lt("switch-manager-index")],Ht);const Mt=1;class Et{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}const kt=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends Et{constructor(t){if(super(t),t.type!==Mt||"class"!==t.name||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){if(void 0===this.st){this.st=new Set,void 0!==t.strings&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(t=>""!==t)));for(const t in e)e[t]&&!this.nt?.has(t)&&this.st.add(t);return this.render(e)}const i=t.element.classList;for(const t of this.st)t in e||(i.remove(t),this.st.delete(t));for(const t in e){const s=!!e[t];s===this.st.has(t)||this.nt?.has(t)||(s?(i.add(t),this.st.add(t)):(i.remove(t),this.st.delete(t)))}return Z}});let Lt=class extends ht{constructor(){super(...arguments),this.index=0,this.scrollable=!0}render(){return!this.blueprint_actions||this.blueprint_actions.length<=1?I``:I`
      <paper-tabs
        selected="${this.index}"
        @iron-select=${this._tabChanged}
        ?scrollable=${this.scrollable}
      >
        ${this.blueprint_actions.map((t,e)=>{const i=this.config_actions?.[e]?.sequence?.length||0;return I`
            <paper-tab index="${e}">
              ${t.title}
              ${i?I`<ha-assist-chip
                    filled
                    .label="${i}"
                  ></ha-assist-chip>`:""}
              ${"init"===t.title?I`<div id="init-suffix">
                    <ha-svg-icon
                      slot="graphic"
                      .path=${"M7,8L2.5,12L7,16V8M17,8V16L21.5,12L17,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10Z"}
                    ></ha-svg-icon>
                  </div>`:""}
            </paper-tab>
          `})}
      </paper-tabs>
    `}async updated(t){if(this.tabs&&t.has("config_actions")){this.scrollable=!0,await this.updateComplete;let t=0;for(const e of Array.from(this.tabs.children))t+=e.offsetWidth;this.scrollable=t>this.tabs.offsetWidth}}flash(t){const e=this.tabs?.querySelector(`[index="${t}"]`);e&&(e.removeAttribute("feedback"),e.setAttribute("feedback",""),setTimeout(()=>e.removeAttribute("feedback"),1e3))}_tabChanged(t){const e=t.detail,i=e.item.parentNode,s=Array.from(i.children).indexOf(e.item);this.dispatchEvent(new CustomEvent("changed",{detail:{index:s}}))}static{this.styles=r`
    @keyframes feedback {
      to {
        border-color: #00e903;
        color: #00e903;
      }
    }
    :host {
      display: flex;
      justify-content: center;
      --paper-tab-ink: transparent;
      --paper-tabs-selection-bar-color: transparent;
    }
    paper-tabs {
      display: grid;
      justify-content: center;
      flex: 1 1 0%;
      height: var(--header-height);
      margin: 0 10px;
    }
    paper-tabs[scrollable] {
      display: flex;
    }
    paper-tab {
      padding: 0px 32px;
      box-sizing: border-box;
      text-transform: uppercase;
    }
    paper-tab[feedback] {
      animation: 0.4s feedback;
      animation-iteration-count: 2;
      animation-direction: alternate;
    }
    paper-tab.iron-selected {
      border-bottom: 2px solid var(--primary-color);
      color: var(--primary-color);
    }
    ha-assist-chip {
      position: absolute;
      top: 0;
      right: -32px;
      --_leading-space: 12px;
      --_trailing-space: 12px;
    }
    #init-suffix {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex: auto;
      position: relative;
      padding: 0 12px;
      overflow: hidden;
      vertical-align: middle;
    }
  `}};e([ut({attribute:!1})],Lt.prototype,"hass",void 0),e([ut({attribute:!1})],Lt.prototype,"blueprint_actions",void 0),e([ut({attribute:!1})],Lt.prototype,"config_actions",void 0),e([ut({type:Number,reflect:!0})],Lt.prototype,"index",void 0),e([gt()],Lt.prototype,"scrollable",void 0),e([_t("paper-tabs",!0)],Lt.prototype,"tabs",void 0),Lt=e([lt("switch-manager-button-actions")],Lt);const Dt="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z";let Pt=class extends ht{constructor(){super(...arguments),this.narrow=!1,this.disabled=!1,this.sequence=[],this.button_index=0,this.action_index=0,this.is_new=!0,this._is_yaml=!1,this._dirty=!1,this._debug=!1,this._block_save=!1}render(){if(!this.config)return I``;const t=!!this.config._error;return I`
      <ha-app-layout>
        <app-header slot="header" fixed>
          <app-toolbar>
            <ha-menu-button
              .hass=${this.hass}
              .narrow=${this.narrow}
            ></ha-menu-button>
            <ha-icon-button
              .path=${"M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"}
              @click=${this._backTapped}
            ></ha-icon-button>
            <div main-title id="title-container">
              <span>Switch Manager - ${this.config?.name}</span>
            </div>
            <div>
              <ha-button-menu corner="BOTTOM_START" slot="toolbar-icon">
                <ha-icon-button
                  slot="trigger"
                  .label=${this.hass.localize("ui.common.menu")}
                  .path=${Dt}
                ></ha-icon-button>
                <mwc-list-item
                  graphic="icon"
                  .disabled=${!this.config||t}
                  @click=${this._showIdentifierAutoDiscoveryDialog}
                >
                  Identifier
                  <ha-svg-icon
                    slot="graphic"
                    .path=${"M10 7V9H9V15H10V17H6V15H7V9H6V7H10M16 7C17.11 7 18 7.9 18 9V15C18 16.11 17.11 17 16 17H12V7M16 9H14V15H16V9Z"}
                  ></ha-svg-icon>
                </mwc-list-item>
                <mwc-list-item graphic="icon" @click=${this._showRenameDialog}>
                  Rename
                  <ha-svg-icon
                    slot="graphic"
                    .path=${"M18,17H10.5L12.5,15H18M6,17V14.5L13.88,6.65C14.07,6.45 14.39,6.45 14.59,6.65L16.35,8.41C16.55,8.61 16.55,8.92 16.35,9.12L8.47,17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z"}
                  ></ha-svg-icon>
                </mwc-list-item>
                <mwc-list-item graphic="icon" @click=${this._rotate}>
                  Rotate
                  <ha-svg-icon
                    slot="graphic"
                    .path=${"M16.89,15.5L18.31,16.89C19.21,15.73 19.76,14.39 19.93,13H17.91C17.77,13.87 17.43,14.72 16.89,15.5M13,17.9V19.92C14.39,19.75 15.74,19.21 16.9,18.31L15.46,16.87C14.71,17.41 13.87,17.76 13,17.9M19.93,11C19.76,9.61 19.21,8.27 18.31,7.11L16.89,8.53C17.43,9.28 17.77,10.13 17.91,11M15.55,5.55L11,1V4.07C7.06,4.56 4,7.92 4,12C4,16.08 7.05,19.44 11,19.93V17.91C8.16,17.43 6,14.97 6,12C6,9.03 8.16,6.57 11,6.09V10L15.55,5.55Z"}
                  ></ha-svg-icon>
                </mwc-list-item>
                <mwc-list-item
                  graphic="icon"
                  .disabled=${!this.config||t}
                  @click=${this._showVariablesEditorDialog}
                >
                  Variables
                  <ha-svg-icon
                    slot="graphic"
                    .path=${"M8,3A2,2 0 0,0 6,5V9A2,2 0 0,1 4,11H3V13H4A2,2 0 0,1 6,15V19A2,2 0 0,0 8,21H10V19H8V14A2,2 0 0,0 6,12A2,2 0 0,0 8,10V5H10V3M16,3A2,2 0 0,1 18,5V9A2,2 0 0,0 20,11H21V13H20A2,2 0 0,0 18,15V19A2,2 0 0,1 16,21H14V19H16V14A2,2 0 0,1 18,12A2,2 0 0,1 16,10V5H14V3H16Z"}
                  ></ha-svg-icon>
                </mwc-list-item>
                <mwc-list-item
                  graphic="icon"
                  .disabled=${!this.config||t}
                  @click=${this._showCopyFromDialog}
                >
                  Copy From
                  <ha-svg-icon
                    slot="graphic"
                    .path=${"M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"}
                  ></ha-svg-icon>
                </mwc-list-item>
                <mwc-list-item
                  graphic="icon"
                  .disabled=${!this.config||this.is_new||t}
                  @click=${this._toggleEnabled}
                >
                  ${this.config?.enabled?"Disable":"Enable"}
                  <ha-svg-icon slot="graphic" .path=${"M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4M9,9V15H15V9"}></ha-svg-icon>
                </mwc-list-item>
                <li divider role="separator"></li>
                <mwc-list-item
                  graphic="icon"
                  .disabled=${!this.config||this.is_new||t}
                  @click=${this._toggleDebug}
                >
                  Debug
                  <ha-svg-icon slot="graphic" .path=${"M14,12H10V10H14M14,16H10V14H14M20,8H17.19C16.74,7.22 16.12,6.55 15.37,6.04L17,4.41L15.59,3L13.42,5.17C12.96,5.06 12.5,5 12,5C11.5,5 11.04,5.06 10.59,5.17L8.41,3L7,4.41L8.62,6.04C7.88,6.55 7.26,7.22 6.81,8H4V10H6.09C6.04,10.33 6,10.66 6,11V12H4V14H6V15C6,15.34 6.04,15.67 6.09,16H4V18H6.81C7.85,19.79 9.78,21 12,21C14.22,21 16.15,19.79 17.19,18H20V16H17.91C17.96,15.67 18,15.34 18,15V14H20V12H18V11C18,10.66 17.96,10.33 17.91,10H20V8Z"}></ha-svg-icon>
                </mwc-list-item>
                <li divider role="separator"></li>
                <mwc-list-item
                  .disabled=${this.is_new}
                  class=${kt({warning:!this.is_new})}
                  graphic="icon"
                  @click=${this._deleteConfirm}
                >
                  Delete
                  <ha-svg-icon
                    class=${kt({warning:!this.is_new})}
                    slot="graphic"
                    .path=${"M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"}
                  ></ha-svg-icon>
                </mwc-list-item>
              </ha-button-menu>
            </div>
          </app-toolbar>
        </app-header>
      </ha-app-layout>

      <hui-view>
        <hui-panel-view>
          ${t?W:I`<h3 id="blueprint-name">${this.blueprint?.service} / ${this.blueprint?.name}</h3>`}

          <div id="switch-image" rotate="${this.config.rotate}">
            ${!this.blueprint||this.blueprint?.has_image?I`<svg id="switch-svg"></svg>`:I`<ha-svg-icon .path=${"M13 5C15.21 5 17 6.79 17 9C17 10.5 16.2 11.77 15 12.46V11.24C15.61 10.69 16 9.89 16 9C16 7.34 14.66 6 13 6S10 7.34 10 9C10 9.89 10.39 10.69 11 11.24V12.46C9.8 11.77 9 10.5 9 9C9 6.79 10.79 5 13 5M20 20.5C19.97 21.32 19.32 21.97 18.5 22H13C12.62 22 12.26 21.85 12 21.57L8 17.37L8.74 16.6C8.93 16.39 9.2 16.28 9.5 16.28H9.7L12 18V9C12 8.45 12.45 8 13 8S14 8.45 14 9V13.47L15.21 13.6L19.15 15.79C19.68 16.03 20 16.56 20 17.14V20.5M20 2H4C2.9 2 2 2.9 2 4V12C2 13.11 2.9 14 4 14H8V12L4 12L4 4H20L20 12H18V14H20V13.96L20.04 14C21.13 14 22 13.09 22 12V4C22 2.9 21.11 2 20 2Z"}></ha-svg-icon>`}
          </div>

          ${t?W:I`
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
              ${this._errors?I`
                    <ha-alert alert-type="error">
                      ${this._errors}
                      ${this.config.is_mismatch?I`<mwc-button slot="action" @click=${this._fixMismatch}>Fix</mwc-button>`:""}
                    </ha-alert>
                  `:""}
              ${this.config&&!this.config.enabled?I`
                    <ha-alert alert-type="info">
                      Switch is disabled
                      <mwc-button slot="action" @click=${this._toggleEnabled}>Enable</mwc-button>
                    </ha-alert>
                  `:""}
              ${t?W:I`
                <div id="sequence-container">
                  <div class="header">
                    <h2 id="sequence-heading" class="name">
                      Sequence
                      <ha-selector-select
                        id="mode-selector"
                        .hass=${this.hass}
                        .value=${this.config?.buttons[this.button_index]?.actions[this.action_index]?.mode}
                        label="Mode"
                        .selector=${{select:{mode:"dropdown",options:ft.map(t=>({label:t.charAt(0).toUpperCase()+t.slice(1),value:t}))}}}
                        @value-changed=${this._modeValueChanged}
                      ></ha-selector-select>
                    </h2>
                    <ha-button-menu corner="TOP_START" slot="toolbar-icon">
                      <ha-icon-button
                        slot="trigger"
                        .label=${this.hass.localize("ui.common.menu")}
                        .path=${Dt}
                      ></ha-icon-button>
                      <mwc-list-item graphic="icon" @click=${this._toggleYaml}>
                        ${this._is_yaml?"Visual Editor":"Yaml Editor"}
                        <ha-svg-icon slot="graphic" .path=${this._is_yaml?"M21 13.1C20.9 13.1 20.7 13.2 20.6 13.3L19.6 14.3L21.7 16.4L22.7 15.4C22.9 15.2 22.9 14.8 22.7 14.6L21.4 13.3C21.3 13.2 21.2 13.1 21 13.1M19.1 14.9L13 20.9V23H15.1L21.2 16.9L19.1 14.9M21 3H13V9H21V3M19 7H15V5H19V7M13 18.06V11H21V11.1C20.24 11.1 19.57 11.5 19.19 11.89L18.07 13H15V16.07L13 18.06M11 3H3V13H11V3M9 11H5V5H9V11M11 20.06V15H3V21H11V20.06M9 19H5V17H9V19Z":"M8,12H16V14H8V12M10,20H6V4H13V9H18V12.1L20,10.1V8L14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H10V20M8,18H12.1L13,17.1V16H8V18M20.2,13C20.3,13 20.5,13.1 20.6,13.2L21.9,14.5C22.1,14.7 22.1,15.1 21.9,15.3L20.9,16.3L18.8,14.2L19.8,13.2C19.9,13.1 20,13 20.2,13M20.2,16.9L14.1,23H12V20.9L18.1,14.8L20.2,16.9Z"}></ha-svg-icon>
                      </mwc-list-item>
                    </ha-button-menu>
                  </div>
                  ${this._is_yaml?I`<ha-yaml-editor
                        .hass=${this.hass}
                        .value=${this.sequence}
                        @value-changed=${this._configSequenceChanged}
                      ></ha-yaml-editor>`:I`<ha-automation-action
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

          ${t?W:I`
            <div class="fab-container">
              <ha-fab
                slot="fab"
                .label=${"Save"}
                extended
                collapse
                @click=${this._save}
                class=${kt({dirty:this._dirty,blocked:this._block_save})}
              >
                <ha-svg-icon slot="icon" .path=${"M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z"}></ha-svg-icon>
              </ha-fab>
            </div>
          `}
        </hui-panel-view>
      </hui-view>
    `}connectedCallback(){super.connectedCallback(),this._loadConfig(),this._startListeners()}disconnectedCallback(){this._killListener("_reloadListener"),this._killListener("_subscribedMonitor"),super.disconnectedCallback()}_killListener(t){return!!this[t]&&(this[t](),this[t]=void 0,!0)}async _startListeners(){this._reloadListener=await this.hass.connection.subscribeEvents(t=>{"switch_manager"===t.data.domain&&"reload"===t.data.service&&this._loadConfig()},"call_service")}_loadConfig(){"id"in this.params?(this.is_new=!1,this.hass.callWS({type:wt("configs"),config_id:this.params.id}).then(t=>this._setConfig(t.config))):(this.is_new=!0,this._dirty=!0,"blueprint"in this.params&&this._loadBlueprint(this.params.blueprint).then(t=>{this._setConfig(function(t){const e={id:null,name:"New Switch",enabled:!0,identifier:"",blueprint:t,valid_blueprint:!0,buttons:[],is_mismatch:!1,rotate:0};return t.buttons.forEach((t,i)=>{e.buttons[i]={actions:[]},t.actions.forEach((t,s)=>{e.buttons[i].actions[s]={mode:ft[0],sequence:[]}})}),e}(t.blueprint)),this._showRenameDialog()}))}_loadBlueprint(t){return this.hass.callWS({type:wt("blueprints"),blueprint_id:t})}_setConfig(t){if(this.config=t,t._error)return this._errors=t._error,void(this._block_save=!0);this._setBlueprint(t.blueprint),this._updateSequence(),this._monitor()}async _monitor(){this.is_new||(this._killListener("_subscribedMonitor"),this._subscribedMonitor=await this.hass.connection.subscribeMessage(t=>{if("action_triggered"===t.event){if(!this.config?.identifier)return;if(t.button===this.button_index&&(this.blueprint?.buttons[this.button_index]?.actions.length??0)>1&&this.button_actions.flash(t.action),1===this.blueprint?.buttons?.length)return void xt(this,"Button Pressed");const e=this.svg?.querySelector(`[index="${t.button}"]`);e&&(e.removeAttribute("pressed"),e.setAttribute("pressed",""),setTimeout(()=>e.removeAttribute("pressed"),1e3))}"incoming"!==t.event&&"action_triggered"!==t.event||!this._debug||console.log(t)},{type:wt("config/monitor"),config_id:this.config.id}))}_setBlueprint(t){this.blueprint=t,this.requestUpdate(),this._drawSVG()}async _drawSVG(){if(!this.blueprint?.has_image)return;await this.updateComplete;const t=this.svg;if(t){const e=t.cloneNode(!1);t.parentNode.replaceChild(e,t)}const e=new Image;e.src=yt(`${this.blueprint.id}.png`),e.onload=()=>{const t=this.svg;if(!t)return;t.setAttributeNS(null,"viewBox",`0 0 ${e.width} ${e.height}`);const i=document.createElementNS("http://www.w3.org/2000/svg","image");i.setAttributeNS(null,"x","0"),i.setAttributeNS(null,"y","0"),i.setAttributeNS(null,"width",e.width.toString()),i.setAttributeNS(null,"height",e.height.toString()),i.setAttributeNS("http://www.w3.org/1999/xlink","href",e.src),i.setAttributeNS(null,"visibility","visible"),t.prepend(i)},this.blueprint.buttons.length>1&&this.blueprint.buttons.forEach((t,e)=>{let i;if(t.x>-1&&t.y>-1&&t.width>0&&t.height>0)i=document.createElementNS("http://www.w3.org/2000/svg","rect"),i.setAttributeNS(null,"x",t.x.toString()),i.setAttributeNS(null,"y",t.y.toString()),i.setAttributeNS(null,"width",t.width.toString()),i.setAttributeNS(null,"height",t.height.toString());else if(t.x>-1&&t.y>-1&&t.width>0)i=document.createElementNS("http://www.w3.org/2000/svg","circle"),i.setAttributeNS(null,"cx",t.x.toString()),i.setAttributeNS(null,"cy",t.y.toString()),i.setAttributeNS(null,"r",t.width.toString());else{if(!t.d)return;i=document.createElementNS("http://www.w3.org/2000/svg","path"),i.setAttributeNS(null,"d",t.d.toString())}i.setAttribute("class","button"),i.setAttribute("index",e.toString()),this.button_index===e&&i.setAttribute("selected",""),this._buttonTotalSequence(this.config.buttons[e])||i.setAttribute("empty",""),i.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation(),this._setButtonIndex(parseInt(t.target.getAttribute("index")))}),this.svg?.append(i)})}_buttonTotalSequence(t){let e=0;return t.actions.forEach(t=>e+=t.sequence.length),e}_updateSequence(t){t&&(this.config.buttons[this.button_index].actions[this.action_index].sequence=t),this.sequence=[...this.config?.buttons[this.button_index]?.actions[this.action_index]?.sequence||[]]}_validate(){return this._errors=void 0,!!this.config?.identifier||(this._showIdentifierAutoDiscoveryDialog(),!1)}_save(){!this._block_save&&this._validate()&&this.config&&!this.config._error&&(this._block_save=!0,this._dirty=!1,this.hass.callWS({type:wt("config/save"),config:{...this.config,blueprint:this.config.blueprint.id}}).then(t=>{this.is_new&&(this.is_new=!1,this.config.id=t.config_id,$t(vt(`edit/${t.config_id}`)),this._monitor()),xt(this,"Switch Saved")}).catch(t=>{xt(this,t.message),this._errors=t.message,this._dirty=!0}).finally(()=>this._block_save=!1))}_backTapped(){$t(vt())}_actionChanged(t){this._setActionIndex(t.detail.index)}_setButtonIndex(t){t!==this.button_index&&(this.button_index=t,this.svg?.querySelector("[selected]")?.removeAttribute("selected"),this.svg?.querySelector(`[index="${t}"]`)?.setAttribute("selected",""),this._setActionIndex(0))}_setActionIndex(t){this.action_index=t,this._updateSequence(),this._is_yaml&&this._yamlEditor?.setValue(this.sequence)}_configSequenceChanged(t){let e=t.detail.value;!this._is_yaml||e&&Array.isArray(e)||(e=[]),this.requestUpdate("config"),this._updateSequence(e),this._errors=void 0,this._dirty=!0}_rotate(){this.config.rotate=this.config.rotate>=3?0:this.config.rotate+1,this.requestUpdate("config"),this._dirty=!0}_toggleDebug(){this._debug=!this._debug,xt(this,"Debug "+(this._debug?"Enabled. View dev console":"Disabled"))}_toggleYaml(){this._is_yaml=!this._is_yaml,this.updateComplete.then(()=>{this._is_yaml&&this._yamlEditor?.setValue(this.sequence)})}_modeValueChanged(t){const e=this.config?.buttons[this.button_index]?.actions[this.action_index]?.mode;e!==t.detail.value&&(this.config.buttons[this.button_index].actions[this.action_index].mode=t.detail.value,this.requestUpdate("config"),this._dirty=!0)}_toggleEnabled(){this.config&&!this.is_new&&(this.config.enabled=!this.config.enabled,this.hass.callWS({type:wt("config/enabled"),enabled:this.config.enabled,config_id:this.config.id}),this.requestUpdate("config"))}_fixMismatch(){this.config&&this.hass.callWS({type:wt("config/save"),config:{...this.config,blueprint:this.config.blueprint.id},fix_mismatch:!0}).then(()=>{this._errors=void 0,this.config.is_mismatch=!1,this.requestUpdate(),xt(this,"Mismatch Fixed")})}_deleteConfirm(){this.is_new||Ct(this,"switch-manager-dialog-confirm",()=>Promise.resolve().then(function(){return Tt}),{title:"Delete switch?",text:`${this.config?.name} will be permanently deleted.`,confirmText:"Delete",dismissText:"Cancel",confirm:()=>{this.hass.callWS({type:wt("config/delete"),config_id:this.config.id.toString()}).then(()=>$t(vt()))},confirmation:!0,destructive:!0})}_showIdentifierAutoDiscoveryDialog(){Ct(this,"switch-manager-dialog-identifier-auto-discovery",()=>Promise.resolve().then(function(){return Ut}),{switch_id:this.config?.id,identifier:this.config?.identifier,blueprint:this.blueprint,update:t=>{this.config.identifier=t.identifier,this._dirty=!0,this.requestUpdate()},onClose:()=>{}})}_showRenameDialog(){Ct(this,"switch-manager-dialog-rename-switch",()=>Promise.resolve().then(function(){return Rt}),{config:this.config,update:t=>{this.config.name=t.name,this._dirty=!0,this.requestUpdate()},onClose:()=>{this.is_new&&this._showIdentifierAutoDiscoveryDialog()}})}_showCopyFromDialog(){Ct(this,"switch-manager-dialog-copy-from",()=>Promise.resolve().then(function(){return Bt}),{blueprint_id:this.config?.blueprint?.id,current_switch_id:this.config?.id,update:t=>{this.config.buttons=t.buttons,!1!==t.variables&&(this.config.variables=t.variables),this._dirty=!0,this._updateSequence(),this._drawSVG()},onClose:()=>{}})}_showVariablesEditorDialog(){Ct(this,"switch-manager-dialog-variables-editor",()=>Promise.resolve().then(function(){return It}),{config:this.config,update:t=>{this.config.variables=t.variables,this._dirty=!0,this.requestUpdate()},onClose:()=>{}})}static{this.styles=r`
    @keyframes pressed {
      to {
        fill: #3ff17975;
        stroke: #00e903;
      }
    }
    :host {
      --max-width: 1040px;
    }
    ha-app-layout {
      z-index: 5;
    }
    app-toolbar {
      height: var(--header-height);
    }
    app-header,
    app-toolbar {
      background-color: var(
        --app-header-background-color,
        var(--mdc-theme-primary)
      );
      font-weight: 400;
      color: var(--app-header-text-color, var(--mdc-theme-on-primary, #fff));
    }
    mwc-list-item {
      min-width: 165px;
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
    hui-view {
      height: calc(100vh - var(--header-height));
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
  `}};e([ut({attribute:!1})],Pt.prototype,"hass",void 0),e([ut({type:Boolean})],Pt.prototype,"narrow",void 0),e([ut({attribute:!1})],Pt.prototype,"panel",void 0),e([ut({attribute:!1})],Pt.prototype,"route",void 0),e([ut({attribute:!1})],Pt.prototype,"params",void 0),e([ut({attribute:!1})],Pt.prototype,"blueprint",void 0),e([ut({attribute:!1})],Pt.prototype,"config",void 0),e([ut({type:Boolean})],Pt.prototype,"disabled",void 0),e([gt()],Pt.prototype,"_subscribedMonitor",void 0),e([gt()],Pt.prototype,"_reloadListener",void 0),e([gt()],Pt.prototype,"sequence",void 0),e([gt()],Pt.prototype,"button_index",void 0),e([gt()],Pt.prototype,"action_index",void 0),e([gt()],Pt.prototype,"is_new",void 0),e([gt()],Pt.prototype,"_is_yaml",void 0),e([gt()],Pt.prototype,"_dirty",void 0),e([gt()],Pt.prototype,"_debug",void 0),e([gt()],Pt.prototype,"_block_save",void 0),e([gt()],Pt.prototype,"_errors",void 0),e([_t("#switch-svg")],Pt.prototype,"svg",void 0),e([_t("switch-manager-button-actions")],Pt.prototype,"button_actions",void 0),e([_t("ha-yaml-editor")],Pt.prototype,"_yamlEditor",void 0),Pt=e([lt("switch-manager-switch-editor")],Pt),t.SwitchManagerPanel=class extends ht{constructor(){super(...arguments),this.narrow=!1,this._params={}}set route(t){this._route=t;const e=t.path.split("/");"new"===e[1]?this._params={action:"new",blueprint:e[2]}:"edit"===e[1]?this._params={action:"edit",id:e[2]}:this._params={}}get route(){return this._route}render(){return"action"in this._params?I`
        <switch-manager-switch-editor
          .hass=${this.hass}
          .narrow=${this.narrow}
          .route=${this._route}
          .panel=${this.panel}
          .params=${this._params}
        ></switch-manager-switch-editor>
      `:I`
      <switch-manager-index
        .hass=${this.hass}
        .narrow=${this.narrow}
        .route=${this._route}
        .panel=${this.panel}
      ></switch-manager-index>
    `}firstUpdated(){this.hass.loadFragmentTranslation("config"),this.hass.loadBackendTranslation("title"),this.hass.loadBackendTranslation("device_automation"),this.hass.loadBackendTranslation("config"),this._applyTheme()}updated(t){super.updated(t);const e=t.get("hass");e&&e.themes!==this.hass.themes&&this._applyTheme()}provideHass(t){t.hass=this.hass}_applyTheme(){this.style.backgroundColor="var(--primary-background-color)",this.style.color="var(--primary-text-color)",this.style.fontFamily="var(--mdc-typography-headline6-font-family, var(--mdc-typography-font-family, Roboto, sans-serif))"}static{this.styles=r`
    :host {
      display: block;
    }
  `}},e([ut({attribute:!1})],t.SwitchManagerPanel.prototype,"hass",void 0),e([ut({type:Boolean})],t.SwitchManagerPanel.prototype,"narrow",void 0),e([ut({attribute:!1})],t.SwitchManagerPanel.prototype,"panel",void 0),e([gt()],t.SwitchManagerPanel.prototype,"_params",void 0),e([ut({attribute:!1})],t.SwitchManagerPanel.prototype,"route",null),t.SwitchManagerPanel=e([lt("switch-manager-panel")],t.SwitchManagerPanel);let Ot=class extends ht{showDialog(t){this._params=t}closeDialog(){this._params=void 0}render(){return this._params?I`
      <ha-dialog
        open
        @closed=${this._dismiss}
        .heading=${this._params.title||"Confirm"}
      >
        <div>${this._params.text||""}</div>
        ${this._params.prompt?I`<ha-textfield id="prompt-input" .value=${this._params.promptValue||""}></ha-textfield>`:""}
        <mwc-button slot="secondaryAction" @click=${this._dismiss}>
          ${this._params.dismissText||"Cancel"}
        </mwc-button>
        <mwc-button
          slot="primaryAction"
          @click=${this._confirm}
          class=${this._params.destructive?"destructive":""}
        >
          ${this._params.confirmText||"OK"}
        </mwc-button>
      </ha-dialog>
    `:I``}_dismiss(){this._params?.cancel?.(),this.closeDialog()}_confirm(){this._params?.confirm?.(),this.closeDialog()}static{this.styles=r`
    .destructive {
      --mdc-theme-primary: var(--error-color);
    }
  `}};e([gt()],Ot.prototype,"_params",void 0),Ot=e([lt("switch-manager-dialog-confirm")],Ot);var Tt=Object.freeze({__proto__:null,get SwitchManagerDialogConfirm(){return Ot}});let Nt=class extends ht{constructor(){super(...arguments),this._identifier="",this._discovered=[],this._listening=!1}showDialog(t){this._params=t,this._identifier=t.identifier||"",this._discovered=[],this.hass=this.parentElement?.hass||document.querySelector("home-assistant")?.hass,this._startDiscovery()}closeDialog(){this._stopDiscovery(),this._params?.onClose?.(),this._params=void 0}async _startDiscovery(){const t=this._params.blueprint;if(t){this._listening=!0;try{this._unsubscribe=await this.hass.connection.subscribeMessage(t=>{t.identifier&&!this._discovered.includes(t.identifier)&&(this._discovered=[...this._discovered,t.identifier])},{type:wt("blueprints/auto_discovery"),blueprint_id:t.id})}catch{this._listening=!1}}}_stopDiscovery(){this._unsubscribe?.(),this._unsubscribe=void 0,this._listening=!1}render(){return this._params?I`
      <ha-dialog
        open
        @closed=${this.closeDialog}
        heading="Switch Identifier"
      >
        <div class="content">
          <ha-textfield
            .value=${this._identifier}
            @input=${t=>this._identifier=t.target.value}
            label="Identifier"
          ></ha-textfield>

          ${this._listening?I`
                <div class="discovery">
                  <p>
                    Press a button on your switch to auto-discover its
                    identifier...
                  </p>
                  <ha-circular-progress indeterminate></ha-circular-progress>
                  ${this._discovered.length?I`
                        <div class="discovered-list">
                          ${this._discovered.map(t=>I`
                              <mwc-list-item @click=${()=>this._selectIdentifier(t)}>
                                ${t}
                              </mwc-list-item>
                            `)}
                        </div>
                      `:""}
                </div>
              `:""}
        </div>
        <mwc-button slot="secondaryAction" @click=${this.closeDialog}>
          Cancel
        </mwc-button>
        <mwc-button slot="primaryAction" @click=${this._save}>
          Save
        </mwc-button>
      </ha-dialog>
    `:I``}_selectIdentifier(t){this._identifier=t}_save(){this._params?.update?.({identifier:this._identifier}),this.closeDialog()}static{this.styles=r`
    .content {
      min-width: 300px;
    }
    ha-textfield {
      width: 100%;
    }
    .discovery {
      margin-top: 16px;
      text-align: center;
    }
    .discovered-list {
      margin-top: 8px;
      text-align: left;
    }
    mwc-list-item {
      cursor: pointer;
    }
    mwc-list-item:hover {
      background: var(--secondary-background-color);
    }
  `}};e([gt()],Nt.prototype,"_params",void 0),e([gt()],Nt.prototype,"_identifier",void 0),e([gt()],Nt.prototype,"_discovered",void 0),e([gt()],Nt.prototype,"_listening",void 0),Nt=e([lt("switch-manager-dialog-identifier-auto-discovery")],Nt);var Ut=Object.freeze({__proto__:null,get SwitchManagerDialogIdentifierAutoDiscovery(){return Nt}});let qt=class extends ht{constructor(){super(...arguments),this._name=""}showDialog(t){this._params=t,this._name=t.config?.name||""}closeDialog(){this._params?.onClose?.(),this._params=void 0}render(){return this._params?I`
      <ha-dialog open @closed=${this.closeDialog} heading="Rename Switch">
        <ha-textfield
          .value=${this._name}
          @input=${t=>this._name=t.target.value}
          label="Name"
          dialogInitialFocus
        ></ha-textfield>
        <mwc-button slot="secondaryAction" @click=${this.closeDialog}>
          Cancel
        </mwc-button>
        <mwc-button slot="primaryAction" @click=${this._save}>
          Save
        </mwc-button>
      </ha-dialog>
    `:I``}_save(){this._name.trim()&&this._params?.update?.({name:this._name.trim()}),this.closeDialog()}static{this.styles=r`
    ha-textfield {
      width: 100%;
    }
  `}};e([gt()],qt.prototype,"_params",void 0),e([gt()],qt.prototype,"_name",void 0),qt=e([lt("switch-manager-dialog-rename-switch")],qt);var Rt=Object.freeze({__proto__:null,get SwitchManagerDialogRenameSwitch(){return qt}});let jt=class extends ht{constructor(){super(...arguments),this._switches=[],this._copyVariables=!0}showDialog(t){this._params=t,this.hass=this.parentElement?.hass||document.querySelector("home-assistant")?.hass,this._loadSwitches()}closeDialog(){this._params?.onClose?.(),this._params=void 0,this._switches=[]}async _loadSwitches(){const t=await this.hass.callWS({type:wt("copy_from_list"),blueprint_id:this._params.blueprint_id,skip_config_id:this._params.current_switch_id||""});this._switches=t.switches}render(){return this._params?I`
      <ha-dialog open @closed=${this.closeDialog} heading="Copy From">
        <div class="content">
          ${0===this._switches.length?I`<p>No other switches with this blueprint found.</p>`:I`
                <ha-formfield label="Copy variables">
                  <ha-switch
                    .checked=${this._copyVariables}
                    @change=${t=>this._copyVariables=t.target.checked}
                  ></ha-switch>
                </ha-formfield>
                <div class="switch-list">
                  ${this._switches.map(t=>I`
                      <mwc-list-item @click=${()=>this._selectSwitch(t)}>
                        ${t.name}
                      </mwc-list-item>
                    `)}
                </div>
              `}
        </div>
        <mwc-button slot="secondaryAction" @click=${this.closeDialog}>
          Cancel
        </mwc-button>
      </ha-dialog>
    `:I``}_selectSwitch(t){this._params?.update?.({buttons:JSON.parse(JSON.stringify(t.buttons)),variables:!!this._copyVariables&&JSON.parse(JSON.stringify(t.variables||{}))}),this.closeDialog()}static{this.styles=r`
    .content {
      min-width: 300px;
    }
    .switch-list {
      margin-top: 8px;
    }
    mwc-list-item {
      cursor: pointer;
    }
    ha-formfield {
      display: block;
      margin-bottom: 8px;
    }
  `}};e([gt()],jt.prototype,"_params",void 0),e([gt()],jt.prototype,"_switches",void 0),e([gt()],jt.prototype,"_copyVariables",void 0),jt=e([lt("switch-manager-dialog-copy-from")],jt);var Bt=Object.freeze({__proto__:null,get SwitchManagerDialogCopyFrom(){return jt}});let zt=class extends ht{constructor(){super(...arguments),this._variables={}}showDialog(t){this._params=t,this._variables=JSON.parse(JSON.stringify(t.config?.variables||{}))}closeDialog(){this._params?.onClose?.(),this._params=void 0}render(){return this._params?I`
      <ha-dialog open @closed=${this.closeDialog} heading="Variables">
        <div class="content">
          <ha-yaml-editor
            .value=${this._variables}
            @value-changed=${t=>this._variables=t.detail.value}
          ></ha-yaml-editor>
        </div>
        <mwc-button slot="secondaryAction" @click=${this.closeDialog}>
          Cancel
        </mwc-button>
        <mwc-button slot="primaryAction" @click=${this._save}>
          Save
        </mwc-button>
      </ha-dialog>
    `:I``}_save(){this._params?.update?.({variables:this._variables}),this.closeDialog()}static{this.styles=r`
    .content {
      min-width: 400px;
    }
  `}};e([gt()],zt.prototype,"_params",void 0),e([gt()],zt.prototype,"_variables",void 0),zt=e([lt("switch-manager-dialog-variables-editor")],zt);var It=Object.freeze({__proto__:null,get SwitchManagerDialogVariablesEditor(){return zt}})}({});
