(window.webpackJsonp=window.webpackJsonp||[]).push([[26,12,16],{255:function(t,e,n){var content=n(261);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(40).default)("117e3c13",content,!0,{sourceMap:!1})},257:function(t,e,n){"use strict";n.r(e);var o={props:{level:{type:String,default:"2",validator:function(t){return-1!==["0","1","2","3","4","5","6"].indexOf(t)}},size:{type:String,default:"xl"},color:{type:String,default:""},fstyle:{type:[String,Boolean],default:!1},weight:{type:[String,Boolean],default:!1}},computed:{fontSize:function(){return"fs-".concat(this.size)},fontWeight:function(){return!!this.weight&&"heading--".concat(this.weight)},fontColor:function(){return!!this.color&&"heading--".concat(this.color)},fontStyle:function(){return!!this.fstyle&&"heading--".concat(this.fstyle)}}},l=(n(260),n(14)),component=Object(l.a)(o,(function(){var t=this,e=t.$createElement;return(t._self._c||e)("0"===t.level?"span":"h"+t.level,{tag:"component",staticClass:"heading",class:[t.fontWeight,t.fontSize,t.fontColor,t.fontStyle]},[t._t("default",(function(){return[t._v(" ("+t._s(t.size)+") I'm a H"+t._s(t.level)+" ")]}))],2)}),[],!1,null,"2a8dfc28",null);e.default=component.exports},260:function(t,e,n){"use strict";n(255)},261:function(t,e,n){var o=n(39)(!1);o.push([t.i,".heading[data-v-2a8dfc28]{font-weight:700}.heading span[data-v-2a8dfc28]{font-weight:700!important}.heading--400[data-v-2a8dfc28]{font-weight:400}.heading--500[data-v-2a8dfc28]{font-weight:500}.heading--italic[data-v-2a8dfc28]{font-style:italic;color:#c4c4c4}.heading--white[data-v-2a8dfc28]{color:#fff}.heading--black[data-v-2a8dfc28]{color:#000}",""]),t.exports=o},285:function(t,e,n){t.exports=n.p+"img/avatar1.99eb5ae.png"},286:function(t,e,n){var content=n(312);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(40).default)("666449ef",content,!0,{sourceMap:!1})},311:function(t,e,n){"use strict";n(286)},312:function(t,e,n){var o=n(39)(!1);o.push([t.i,".nav-item[data-v-adcc08c2]{width:100%;border-bottom:1px solid #f1f1f1;padding:1rem 0;display:flex;justify-content:space-between;align-items:center;color:#686868}.nav-item .icon[data-v-adcc08c2]{min-width:37px}",""]),t.exports=o},338:function(t,e,n){var content=n(359);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(40).default)("c792b346",content,!0,{sourceMap:!1})},349:function(t,e,n){"use strict";n.r(e);var o={props:{to:{type:[String,Boolean],default:!1}}},l=(n(311),n(14)),component=Object(l.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("nuxt-link",{staticClass:"nav-item",attrs:{to:t.to}},[n("heading",{staticClass:"bottom-xs-0",attrs:{level:"0",size:"l",weight:"400"}},[t._t("default")],2),t._v(" "),n("icon",{attrs:{icon:"chevron-right",xxxsize:"lg"}})],1)}),[],!1,null,"adcc08c2",null);e.default=component.exports;installComponents(component,{Heading:n(257).default,Icon:n(183).default})},358:function(t,e,n){"use strict";n(338)},359:function(t,e,n){var o=n(39)(!1);o.push([t.i,"",""]),t.exports=o},382:function(t,e,n){"use strict";n.r(e);var o={},l=(n(358),n(14)),component=Object(l.a)(o,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"page page--white"},[o("div",{staticClass:"container"},[o("Section",[o("div",{staticClass:"grid collapse"},[o("div",{staticClass:"col-xs-2"},[o("div",{staticClass:"img ratio-1x1 img--round img--light",style:{backgroundImage:"url("+n(285)+")"}})])]),t._v(" "),o("heading",{staticClass:"bottom-xs-0",attrs:{size:"2xl",level:"1",weight:"400",color:"black"}},[t._v("\n        Jane Doe\n      ")]),t._v(" "),o("heading",{attrs:{size:"m",level:"0",weight:"400",color:"black"}},[t._v("\n        Hedera ID: 0.0.1234567\n      ")])],1),t._v(" "),o("Section",[o("hr"),t._v(" "),o("nav-item",{attrs:{to:"/faq"}},[t._v("Frequently asked questions")]),t._v(" "),o("nav-item",{attrs:{to:"/login"}},[t._v("Sign out")])],1)],1)])}),[],!1,null,"4766c0bf",null);e.default=component.exports;installComponents(component,{Heading:n(257).default,Section:n(132).default,NavItem:n(349).default})}}]);