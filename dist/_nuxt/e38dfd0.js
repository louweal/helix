(window.webpackJsonp=window.webpackJsonp||[]).push([[32,3,12,19],{255:function(t,e,n){var content=n(261);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(40).default)("117e3c13",content,!0,{sourceMap:!1})},257:function(t,e,n){"use strict";n.r(e);var o={props:{level:{type:String,default:"2",validator:function(t){return-1!==["0","1","2","3","4","5","6"].indexOf(t)}},size:{type:String,default:"xl"},color:{type:String,default:""},fstyle:{type:[String,Boolean],default:!1},weight:{type:[String,Boolean],default:!1}},computed:{fontSize:function(){return"fs-".concat(this.size)},fontWeight:function(){return!!this.weight&&"heading--".concat(this.weight)},fontColor:function(){return!!this.color&&"heading--".concat(this.color)},fontStyle:function(){return!!this.fstyle&&"heading--".concat(this.fstyle)}}},r=(n(260),n(14)),component=Object(r.a)(o,(function(){var t=this,e=t.$createElement;return(t._self._c||e)("0"===t.level?"span":"h"+t.level,{tag:"component",staticClass:"heading",class:[t.fontWeight,t.fontSize,t.fontColor,t.fontStyle]},[t._t("default",(function(){return[t._v(" ("+t._s(t.size)+") I'm a H"+t._s(t.level)+" ")]}))],2)}),[],!1,null,"2a8dfc28",null);e.default=component.exports},258:function(t,e,n){var content=n(268);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(40).default)("c5a3a2de",content,!0,{sourceMap:!1})},260:function(t,e,n){"use strict";n(255)},261:function(t,e,n){var o=n(39)(!1);o.push([t.i,".heading[data-v-2a8dfc28]{font-weight:700}.heading span[data-v-2a8dfc28]{font-weight:700!important}.heading--400[data-v-2a8dfc28]{font-weight:400}.heading--500[data-v-2a8dfc28]{font-weight:500}.heading--italic[data-v-2a8dfc28]{font-style:italic;color:#c4c4c4}.heading--white[data-v-2a8dfc28]{color:#fff}.heading--black[data-v-2a8dfc28]{color:#000}",""]),t.exports=o},262:function(t,e,n){"use strict";var o=n(11),r=n(1),c=n(3),l=n(103),f=n(18),d=n(13),v=n(185),h=n(41),m=n(102),x=n(184),_=n(4),y=n(72).f,I=n(28).f,w=n(17).f,k=n(263),C=n(264).trim,N="Number",E=r.Number,S=E.prototype,O=r.TypeError,M=c("".slice),A=c("".charCodeAt),D=function(t){var e=x(t,"number");return"bigint"==typeof e?e:$(e)},$=function(t){var e,n,o,r,c,l,f,code,d=x(t,"number");if(m(d))throw O("Cannot convert a Symbol value to a number");if("string"==typeof d&&d.length>2)if(d=C(d),43===(e=A(d,0))||45===e){if(88===(n=A(d,2))||120===n)return NaN}else if(48===e){switch(A(d,1)){case 66:case 98:o=2,r=49;break;case 79:case 111:o=8,r=55;break;default:return+d}for(l=(c=M(d,2)).length,f=0;f<l;f++)if((code=A(c,f))<48||code>r)return NaN;return parseInt(c,o)}return+d};if(l(N,!E(" 0o1")||!E("0b1")||E("+0x1"))){for(var z,F=function(t){var e=arguments.length<1?0:E(D(t)),n=this;return h(S,n)&&_((function(){k(n)}))?v(Object(e),n,F):e},T=o?y(E):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,fromString,range".split(","),j=0;T.length>j;j++)d(E,z=T[j])&&!d(F,z)&&w(F,z,I(E,z));F.prototype=S,S.constructor=F,f(r,N,F)}},263:function(t,e,n){var o=n(3);t.exports=o(1..valueOf)},264:function(t,e,n){var o=n(3),r=n(21),c=n(12),l=n(265),f=o("".replace),d="["+l+"]",v=RegExp("^"+d+d+"*"),h=RegExp(d+d+"*$"),m=function(t){return function(e){var n=c(r(e));return 1&t&&(n=f(n,v,"")),2&t&&(n=f(n,h,"")),n}};t.exports={start:m(1),end:m(2),trim:m(3)}},265:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},266:function(t,e,n){"use strict";n.r(e);n(262);var o={props:{dir:{type:String,default:""},gap:{type:Number,default:1},forceDir:{type:Boolean,default:!1}}},r=(n(267),n(14)),component=Object(r.a)(o,(function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"stack",class:[!!t.dir&&"stack--"+t.dir,!!t.forceDir&&"stack--forced"],style:"--gap: "+t.gap+"rem"},[t._t("default")],2)}),[],!1,null,"89936964",null);e.default=component.exports},267:function(t,e,n){"use strict";n(258)},268:function(t,e,n){var o=n(39)(!1);o.push([t.i,".stack[data-v-89936964]{display:flex;flex-wrap:nowrap;margin-left:calc(var(--gap)*-1);align-items:center}.stack>*[data-v-89936964],.stack[data-v-89936964]> *{margin-left:var(--gap);flex-grow:0;flex-shrink:0}.stack--vertical[data-v-89936964]{flex-direction:column;margin-left:0;margin-top:calc(var(--gap)*-1)}.stack--vertical>*[data-v-89936964],.stack--vertical[data-v-89936964]> *{margin-top:calc(var(--gap)*1)!important;margin-left:0}",""]),t.exports=o},277:function(t,e,n){t.exports=n.p+"img/chair.c9b8b24.png"},283:function(t,e,n){t.exports=n.p+"img/logo.7ba0d17.svg"},285:function(t,e,n){t.exports=n.p+"img/avatar1.99eb5ae.png"},287:function(t,e,n){t.exports=n.p+"img/logo-small.25c7f4c.svg"},294:function(t,e,n){var content=n(319);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(40).default)("3dcff83c",content,!0,{sourceMap:!1})},313:function(t,e,n){var map={"./avatar1.png":285,"./avatar2.png":314,"./avatar3.png":315,"./avatar4.png":316,"./icons/ico-account.svg":191,"./icons/ico-contracts.svg":188,"./icons/ico-goals.svg":190,"./icons/ico-insights.svg":317,"./icons/ico-search.svg":189,"./logo-small.svg":287,"./logo.svg":283,"./products/chair.png":277};function o(t){var e=r(t);return n(e)}function r(t){if(!n.o(map,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return map[t]}o.keys=function(){return Object.keys(map)},o.resolve=r,t.exports=o,o.id=313},314:function(t,e,n){t.exports=n.p+"img/avatar2.3493749.png"},315:function(t,e,n){t.exports=n.p+"img/avatar3.ea91b47.png"},316:function(t,e,n){t.exports=n.p+"img/avatar4.47fc7df.png"},317:function(t,e,n){t.exports=n.p+"img/ico-insights.57e8806.svg"},318:function(t,e,n){"use strict";n(294)},319:function(t,e,n){var o=n(39)(!1);o.push([t.i,".account-card[data-v-8809f852]{display:block;background-color:#fff;border-radius:6px;width:100%;padding:9px;border:1px solid #f1f1f1}.account-card__visual[data-v-8809f852]{position:relative;margin:0 12px;background-color:#fff}",""]),t.exports=o},341:function(t,e,n){var content=n(366);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(40).default)("0087efe1",content,!0,{sourceMap:!1})},350:function(t,e,n){"use strict";n.r(e);var o={props:{data:{type:Object,default:function(){}},dropdown:{type:Boolean,default:!1}},methods:{signIn:function(){console.log("todo update store"),this.$router.push({path:"/"})}}},r=(n(318),n(14)),component=Object(r.a)(o,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"account-card",on:{click:t.signIn}},[o("div",{staticClass:"grid collapse align-xs-middle"},[o("div",{staticClass:"col-xs-2"},[o("div",{staticClass:"img img--round img--light ratio-1x1",style:{backgroundImage:"url("+n(313)("./"+t.data.avatar)+")"}})]),t._v(" "),o("div",{staticClass:"col-xs-7 offset-xs-1"},[o("heading",{staticClass:"bottom-xs-0",attrs:{size:"l",level:"2"}},[t._v("\n        "+t._s(t.data.name))]),t._v(" "),o("heading",{attrs:{size:"m",level:"0",weight:"400"}},[t._v(" "+t._s(t.data.accountId))])],1),t._v(" "),o("div",{staticClass:"col-xs-2"},[o("div",{staticClass:"align-xs-end"},[o("icon",{attrs:{icon:"chevron-right",size:"lg"}})],1)])])])}),[],!1,null,"8809f852",null);e.default=component.exports;installComponents(component,{Heading:n(257).default,Icon:n(183).default})},364:function(t){t.exports=JSON.parse('[{"ID":1,"name":"Jane Doe","seller":false,"accountId":"0.0.1234567","avatar":"avatar1.png"},{"ID":2,"name":"John Doe","seller":false,"accountId":"0.0.7654321","avatar":"avatar2.png"},{"ID":3,"name":"GreenStore Amsterdam","seller":true,"accountId":"0.0.0034243","avatar":"avatar3.png"},{"ID":4,"name":"Plastic Soup Foundation","charity":true,"accountId":"0.0.0034243","avatar":"avatar4.png"}]')},365:function(t,e,n){"use strict";n(341)},366:function(t,e,n){var o=n(39)(!1);o.push([t.i,"",""]),t.exports=o},386:function(t,e,n){"use strict";n.r(e);var o=[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"align-xs-center bottom-xs-2"},[e("img",{attrs:{src:n(283),alt:"logo",width:"106.66",height:"49.84"}})])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"grid align-xs-center bottom-xs-3"},[n("div",{staticClass:"col-xs-8"},[n("p",[t._v("Choose one of the demo accounts below to sign in")])])])}],r={accounts:n(364)},c=(n(365),n(14)),component=Object(c.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page page--white"},[n("div",{staticClass:"container"},[t._v("\n     \n    "),n("div",{staticClass:"bottom-xs-3"}),t._v(" "),t._m(0),t._v(" "),t._m(1),t._v(" "),n("Stack",{attrs:{dir:"vertical"}},t._l(3,(function(i){return n("account-card",{key:i,attrs:{data:t.$options.accounts[i-1]}})})),1)],1)])}),o,!1,null,"7498db6d",null);e.default=component.exports;installComponents(component,{AccountCard:n(350).default,Stack:n(266).default})}}]);