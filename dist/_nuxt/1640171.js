(window.webpackJsonp=window.webpackJsonp||[]).push([[32,4,7,17,19,22],{342:function(t,e,n){var content=n(346);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(33).default)("ee529ebe",content,!0,{sourceMap:!1})},343:function(t,e,n){"use strict";n.r(e);var r={props:{level:{type:String,default:"2",validator:function(t){return-1!==["0","1","2","3","4","5","6"].indexOf(t)}},size:{type:String,default:"xl"},color:{type:String,default:""},fstyle:{type:[String,Boolean],default:!1},weight:{type:[String,Boolean],default:!1}},computed:{fontSize:function(){return"fs-".concat(this.size)},fontWeight:function(){return!!this.weight&&"heading--".concat(this.weight)},fontColor:function(){return!!this.color&&"heading--".concat(this.color)},fontStyle:function(){return!!this.fstyle&&"heading--".concat(this.fstyle)}}},o=(n(345),n(13)),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement;return(t._self._c||e)("0"===t.level?"span":"h"+t.level,{tag:"component",staticClass:"heading",class:[t.fontWeight,t.fontSize,t.fontColor,t.fontStyle]},[t._t("default")],2)}),[],!1,null,"a9f606ec",null);e.default=component.exports},344:function(t,e,n){"use strict";var r=n(16),o=n(2),l=n(6),c=n(120),d=n(23),f=n(18),m=n(215),v=n(49),h=n(121),_=n(216),x=n(8),y=n(87).f,w=n(39).f,C=n(22).f,I=n(347),S=n(348).trim,k="Number",E=o.Number,N=E.prototype,M=o.TypeError,A=l("".slice),j=l("".charCodeAt),F=function(t){var e=_(t,"number");return"bigint"==typeof e?e:O(e)},O=function(t){var e,n,r,o,l,c,d,code,f=_(t,"number");if(h(f))throw M("Cannot convert a Symbol value to a number");if("string"==typeof f&&f.length>2)if(f=S(f),43===(e=j(f,0))||45===e){if(88===(n=j(f,2))||120===n)return NaN}else if(48===e){switch(j(f,1)){case 66:case 98:r=2,o=49;break;case 79:case 111:r=8,o=55;break;default:return+f}for(c=(l=A(f,2)).length,d=0;d<c;d++)if((code=j(l,d))<48||code>o)return NaN;return parseInt(l,r)}return+f};if(c(k,!E(" 0o1")||!E("0b1")||E("+0x1"))){for(var B,z=function(t){var e=arguments.length<1?0:E(F(t)),n=this;return v(N,n)&&x((function(){I(n)}))?m(Object(e),n,z):e},$=r?y(E):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,fromString,range".split(","),L=0;$.length>L;L++)f(E,B=$[L])&&!f(z,B)&&C(z,B,w(E,B));z.prototype=N,N.constructor=z,d(o,k,z)}},345:function(t,e,n){"use strict";n(342)},346:function(t,e,n){var r=n(32)(!1);r.push([t.i,".heading[data-v-a9f606ec]{font-weight:700}.heading span[data-v-a9f606ec]{font-weight:700!important}.heading--400[data-v-a9f606ec]{font-weight:400}.heading--500[data-v-a9f606ec]{font-weight:500}.heading--italic[data-v-a9f606ec]{font-style:italic;color:#c4c4c4}.heading--white[data-v-a9f606ec]{color:#fff}.heading--black[data-v-a9f606ec]{color:#000}",""]),t.exports=r},347:function(t,e,n){var r=n(6);t.exports=r(1..valueOf)},348:function(t,e,n){var r=n(6),o=n(24),l=n(15),c=n(349),d=r("".replace),f="["+c+"]",m=RegExp("^"+f+f+"*"),v=RegExp(f+f+"*$"),h=function(t){return function(e){var n=l(o(e));return 1&t&&(n=d(n,m,"")),2&t&&(n=d(n,v,"")),n}};t.exports={start:h(1),end:h(2),trim:h(3)}},349:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},350:function(t,e,n){var content=n(355);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(33).default)("c5a3a2de",content,!0,{sourceMap:!1})},351:function(t,e,n){var content=n(359);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(33).default)("1a038f32",content,!0,{sourceMap:!1})},353:function(t,e,n){"use strict";n.r(e);n(344);var r={props:{dir:{type:String,default:""},gap:{type:Number,default:1},forceDir:{type:Boolean,default:!1}}},o=(n(354),n(13)),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"stack",class:[!!t.dir&&"stack--"+t.dir,!!t.forceDir&&"stack--forced"],style:"--gap: "+t.gap+"rem"},[t._t("default")],2)}),[],!1,null,"89936964",null);e.default=component.exports},354:function(t,e,n){"use strict";n(350)},355:function(t,e,n){var r=n(32)(!1);r.push([t.i,".stack[data-v-89936964]{display:flex;flex-wrap:nowrap;margin-left:calc(var(--gap)*-1);align-items:center}.stack>*[data-v-89936964],.stack[data-v-89936964]> *{margin-left:var(--gap);flex-grow:0;flex-shrink:0}.stack--vertical[data-v-89936964]{flex-direction:column;margin-left:0;margin-top:calc(var(--gap)*-1)}.stack--vertical>*[data-v-89936964],.stack--vertical[data-v-89936964]> *{margin-top:calc(var(--gap)*1)!important;margin-left:0}",""]),t.exports=r},358:function(t,e,n){"use strict";n(351)},359:function(t,e,n){var r=n(32)(!1);r.push([t.i,".back-button[data-v-302e4b20]{position:fixed;top:0;padding:12px 0;z-index:2;left:0;width:100%}.back-button--bg[data-v-302e4b20]{background-color:#fff}",""]),t.exports=r},394:function(t,e,n){"use strict";n.r(e);var r={props:{to:{type:[String,Boolean],default:"/"},bg:{type:Boolean,default:!1}}},o=(n(358),n(13)),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"back-button",class:!!t.bg&&"back-button--bg"},[n("div",{staticClass:"container"},[n("div",{staticClass:"grid no-bottom-margin-cols align-xs-middle"},[n("div",{staticClass:"col-xs-4"},[n("nuxt-link",{attrs:{to:t.to}},[n("icon",{attrs:{icon:"arrow-left",size:"lg"}})],1)],1),t._v(" "),n("div",{staticClass:"col-xs-16 align-xs-center"},[n("heading",{staticClass:"bottom-xs-0",attrs:{size:"4xl",level:"1",color:"black"}},[t._t("default")],2)],1),t._v(" "),n("div",{staticClass:"col-xs-4"})])])])}),[],!1,null,"302e4b20",null);e.default=component.exports;installComponents(component,{Icon:n(119).default,Heading:n(343).default})},401:function(t,e,n){var content=n(440);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(33).default)("16e63d56",content,!0,{sourceMap:!1})},409:function(t,e,n){"use strict";var r=n(10),o=n(6),l=n(71),c=n(29),d=n(40),f=n(15),m=n(8),v=n(218),h=n(152),_=n(410),x=n(411),y=n(89),w=n(412),C=[],I=o(C.sort),S=o(C.push),k=m((function(){C.sort(void 0)})),E=m((function(){C.sort(null)})),N=h("sort"),M=!m((function(){if(y)return y<70;if(!(_&&_>3)){if(x)return!0;if(w)return w<603;var code,t,e,n,r="";for(code=65;code<76;code++){switch(t=String.fromCharCode(code),code){case 66:case 69:case 70:case 72:e=3;break;case 68:case 71:e=4;break;default:e=2}for(n=0;n<47;n++)C.push({k:t+n,v:e})}for(C.sort((function(a,b){return b.v-a.v})),n=0;n<C.length;n++)t=C[n].k.charAt(0),r.charAt(r.length-1)!==t&&(r+=t);return"DGBEFHACIJK"!==r}}));r({target:"Array",proto:!0,forced:k||!E||!N||!M},{sort:function(t){void 0!==t&&l(t);var e=c(this);if(M)return void 0===t?I(e):I(e,t);var n,r,o=[],m=d(e);for(r=0;r<m;r++)r in e&&S(o,e[r]);for(v(o,function(t){return function(e,n){return void 0===n?-1:void 0===e?1:void 0!==t?+t(e,n)||0:f(e)>f(n)?1:-1}}(t)),n=o.length,r=0;r<n;)e[r]=o[r++];for(;r<m;)delete e[r++];return e}})},410:function(t,e,n){var r=n(61).match(/firefox\/(\d+)/i);t.exports=!!r&&+r[1]},411:function(t,e,n){var r=n(61);t.exports=/MSIE|Trident/.test(r)},412:function(t,e,n){var r=n(61).match(/AppleWebKit\/(\d+)\./);t.exports=!!r&&+r[1]},438:function(t){t.exports=JSON.parse('{"text":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit amet nibh eu tortor laoreet auctor et ut nunc. Suspendisse tincidunt nisi sit amet diam dignissim, et laoreet mi iaculis. Morbi mauris massa, elementum id lectus a, efficitur tincidunt augue. Mauris feugiat velit mi, at vehicula metus mattis in. Pellentesque laoreet porttitor vehicula. Phasellus eleifend, nisl ac bibendum dapibus, sem nisi faucibus dolor, eu tincidunt ipsum risus non erat. Vivamus fringilla purus mi, sit amet lobortis lacus molestie a. In venenatis rhoncus libero, sit amet ornare ligula sollicitudin a. Nam vulputate congue eros. Aenean eget ligula eu eros sodales scelerisque sodales a quam. Phasellus dapibus tortor nec magna blandit suscipit. Fusce scelerisque vitae nulla viverra tempor. Ut tincidunt erat quam, eu mollis libero varius eu. Cras in ornare justo. Aenean dictum congue ligula vel cursus. Maecenas finibus justo ac efficitur pretium. Sed mattis lorem urna, porttitor rhoncus mi iaculis vitae. Nulla et lobortis lacus. Integer lorem dolor, vestibulum sed tincidunt in, dignissim id dolor. Etiam ultrices leo et lacinia fermentum. Mauris suscipit malesuada mauris sit amet luctus. Cras quis fermentum nibh. Aliquam erat volutpat. Aenean justo neque, blandit luctus metus in, posuere laoreet est. Cras in varius nunc, tempus sollicitudin metus. Aenean eu malesuada odio. Maecenas imperdiet, ex quis gravida tempor, tellus enim condimentum odio, pulvinar lobortis tortor lacus quis arcu. Curabitur eget placerat arcu, id faucibus velit. Aliquam est massa, bibendum sed nibh luctus, luctus bibendum odio. Vivamus in tempus nibh. Nunc maximus non lacus id laoreet. Suspendisse tristique quis purus nec consequat. Ut porttitor facilisis eros in faucibus. Mauris euismod elit sed nibh sollicitudin, pharetra dignissim orci sodales. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; In auctor, neque at ullamcorper luctus, lorem risus finibus erat, at rutrum ipsum justo sed felis. Duis tincidunt odio sed magna iaculis pharetra. Suspendisse placerat, arcu eget imperdiet bibendum, velit dolor elementum tellus, id congue enim mi a neque. Curabitur posuere euismod felis non sollicitudin. Pellentesque vehicula ipsum nibh. Praesent ut neque et urna tincidunt vestibulum. Nullam dapibus vel purus non sodales. Cras et ornare ante, non mattis arcu. Aliquam mi massa, posuere et justo a, pellentesque condimentum tortor. Etiam tempor, nulla eget efficitur scelerisque, mauris odio iaculis orci, eget consequat felis nulla nec ipsum. Nulla in laoreet diam. Suspendisse auctor bibendum elit, sit amet rhoncus arcu sagittis et. Maecenas auctor in urna et eleifend. Etiam mi purus, aliquam sed nisi in, iaculis aliquet felis. Suspendisse nulla neque, aliquam sit amet risus vel, feugiat ornare velit. Vestibulum volutpat dolor a elit interdum cursus. Mauris ornare lobortis blandit. Praesent vulputate, lectus non vulputate efficitur, sapien metus imperdiet nunc, quis bibendum lorem massa non orci. Suspendisse bibendum ultricies erat, tristique commodo dui ultrices quis. Donec iaculis tincidunt nisl ut finibus. Duis blandit vehicula eros, eu scelerisque tortor sodales ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in sagittis leo, quis luctus erat. Nam dictum diam sed ipsum blandit, in fermentum mauris maximus. Maecenas blandit sem vitae viverra malesuada. Nulla risus elit, mollis non accumsan sit amet, porttitor vitae enim. In ac tempor orci, mollis molestie est. In hac habitasse platea dictumst."}')},439:function(t,e,n){"use strict";n(401)},440:function(t,e,n){var r=n(32)(!1);r.push([t.i,".accordion-item[data-v-023d993a]{position:relative;display:block;border-bottom:1px solid #eee}.accordion-item__header[data-v-023d993a]{display:flex;align-items:center;justify-content:space-between;cursor:pointer;padding:1rem 0}.accordion-item__icon[data-v-023d993a]{display:inline-flex;font-size:1.5rem}.accordion-item__body[data-v-023d993a]{overflow:hidden}.accordion-item__inner[data-v-023d993a]{margin-bottom:1.25rem}.accordion-item--active .accordion-item__icon[data-v-023d993a]{transform:rotate(-180deg)}.expand-enter-active[data-v-023d993a],.expand-leave-active[data-v-023d993a]{height:auto;transition:all .4s ease-in}.expand-enter[data-v-023d993a],.expand-leave-to[data-v-023d993a]{opacity:0;height:0}",""]),t.exports=r},455:function(t,e,n){"use strict";n.r(e);n(344),n(153),n(52),n(409),n(34),n(149),n(73);var r={loremIpsum:n(438),props:{min:{type:[Number,Boolean],default:!1},max:{type:Number,default:20},mode:{type:String,default:"words"},lowercase:{type:Boolean,default:!1}},computed:{shuffled:function(){return this.$options.loremIpsum.text.split(".").map((function(t){return{value:t,sort:Math.random()}})).sort((function(a,b){return a.sort-b.sort})).map((function(t){return t.value})).join(".")},randomIntFromInterval:function(){var t=this.min+1,e=this.max+1;return t&&e?Math.floor(Math.random()*(e-t+1)+t):e},firstChars:function(){return this.shuffled.substring(0,this.randomIntFromInterval)},firstWords:function(){return this.shuffled.split(/[ ,]+/).slice(0,this.randomIntFromInterval).join(" ")}}},o=n(13),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.lowercase?n("span",[t._v("\n  "+t._s("chars"===t.mode?t.firstChars.toLowerCase():t.firstWords.toLowerCase())+"\n")]):n("span",[t._v("\n  "+t._s("chars"===t.mode?t.firstChars:t.firstWords)+"\n")])}),[],!1,null,null,null);e.default=component.exports},456:function(t,e,n){"use strict";n.r(e);var r={props:{label:{type:String,default:""},level:{type:String,default:3},icon:{type:[String,Boolean],default:!1}},data:function(){return{isExpanded:!1}}},o=(n(439),n(13)),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"accordion-item",class:!!t.isExpanded&&"accordion-item--active"},[n("div",{staticClass:"accordion-item__header",on:{click:function(e){t.isExpanded=!t.isExpanded}}},[n("Stack",{attrs:{gap:1.3}},[t.icon?n("icon",{attrs:{icon:t.icon,size:"lg"}}):t._e(),t._v(" "),n("Heading",{staticClass:"bottom-xs-0",attrs:{level:"3",size:"l",weight:"400"}},[t._v("\n        "+t._s(t.label)+"\n      ")])],1),t._v(" "),n("icon",{staticClass:"accordion-item__icon",attrs:{icon:"chevron-down"}})],1),t._v(" "),n("transition",{attrs:{name:"expand"}},[t.isExpanded?n("div",{staticClass:"accordion-item__body"},[n("div",{staticClass:"accordion-item__inner"},[t._t("default")],2)]):t._e()])],1)}),[],!1,null,"023d993a",null);e.default=component.exports;installComponents(component,{Icon:n(119).default,Heading:n(343).default,Stack:n(353).default})},474:function(t,e,n){var content=n(498);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(33).default)("12f0506a",content,!0,{sourceMap:!1})},497:function(t,e,n){"use strict";n(474)},498:function(t,e,n){var r=n(32)(!1);r.push([t.i,"",""]),t.exports=r},545:function(t,e,n){"use strict";n.r(e);var r={faqs:[{question:"What are these contracts for?",answer:!1},{question:"What is a deposit?",answer:!1},{question:"How is the deposit determined?",answer:!1},{question:"How can I obtain a contract?",answer:!1},{question:"Can I transfer a contract?",answer:!1},{question:"Can I delete a contract?",answer:!1},{question:"Can I transfer my contracts to myself?",answer:!1}],computed:{}},o=(n(497),n(13)),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page page--white"},[n("back-button",{attrs:{to:"/account",bg:""}},[t._v(" FAQ ")]),t._v("\n\n   \n  "),n("div",{staticClass:"bottom-xs-5"}),t._v(" "),n("div",{staticClass:"container"},[n("hr"),t._v(" "),t._l(t.$options.faqs,(function(e,r){return n("accordion-item",{key:r,attrs:{label:e.question,level:"2"}},[e.answer?[t._v("\n        "+t._s(e.answer)+"\n      ")]:n("lorem",{attrs:{max:45}})],2)}))],2)],1)}),[],!1,null,"fec74758",null);e.default=component.exports;installComponents(component,{BackButton:n(394).default,Lorem:n(455).default,AccordionItem:n(456).default})}}]);