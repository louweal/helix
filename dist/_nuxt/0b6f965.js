(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{255:function(t,e,n){var content=n(261);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(40).default)("117e3c13",content,!0,{sourceMap:!1})},257:function(t,e,n){"use strict";n.r(e);var o={props:{level:{type:String,default:"2",validator:function(t){return-1!==["0","1","2","3","4","5","6"].indexOf(t)}},size:{type:String,default:"xl"},color:{type:String,default:""},fstyle:{type:[String,Boolean],default:!1},weight:{type:[String,Boolean],default:!1}},computed:{fontSize:function(){return"fs-".concat(this.size)},fontWeight:function(){return!!this.weight&&"heading--".concat(this.weight)},fontColor:function(){return!!this.color&&"heading--".concat(this.color)},fontStyle:function(){return!!this.fstyle&&"heading--".concat(this.fstyle)}}},c=(n(260),n(14)),component=Object(c.a)(o,(function(){var t=this,e=t.$createElement;return(t._self._c||e)("0"===t.level?"span":"h"+t.level,{tag:"component",staticClass:"heading",class:[t.fontWeight,t.fontSize,t.fontColor,t.fontStyle]},[t._t("default",(function(){return[t._v(" ("+t._s(t.size)+") I'm a H"+t._s(t.level)+" ")]}))],2)}),[],!1,null,"2a8dfc28",null);e.default=component.exports},260:function(t,e,n){"use strict";n(255)},261:function(t,e,n){var o=n(39)(!1);o.push([t.i,".heading[data-v-2a8dfc28]{font-weight:700}.heading span[data-v-2a8dfc28]{font-weight:700!important}.heading--400[data-v-2a8dfc28]{font-weight:400}.heading--500[data-v-2a8dfc28]{font-weight:500}.heading--italic[data-v-2a8dfc28]{font-style:italic;color:#c4c4c4}.heading--white[data-v-2a8dfc28]{color:#fff}.heading--black[data-v-2a8dfc28]{color:#000}",""]),t.exports=o}}]);