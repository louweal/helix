(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{256:function(t,e,n){"use strict";(function(t){n(131),n(25),n(61);e.a={props:{type:{type:String,default:"submit"},state:{type:String,default:"default"},size:{type:String,default:""},href:{type:String,default:""},hash:{type:String,default:""},active:{type:Boolean,default:!1}},computed:{isNone:function(){return""===this.href&&""===this.hash},isInternal:function(e){var n=e.$store;return this.href.startsWith("/")||this.href.startsWith(n.state.hostname)||this.href.startsWith(t.env.SITEMAP_HOSTNAME)},internalLink:function(){return this.href.startsWith("/")?this.href:"/"+this.href.replace(/^[a-zA-Z]{3,5}:\/{2}[a-zA-Z0-9_.:-]+\//,"")}}}}).call(this,n(186))},259:function(t,e,n){var content=n(270);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(40).default)("809eb69e",content,!0,{sourceMap:!1})},269:function(t,e,n){"use strict";n(259)},270:function(t,e,n){var r=n(39)(!1);r.push([t.i,'.button{position:relative;display:inline-flex;justify-content:center;align-items:center;border-radius:7px;color:#000;font-size:16px;font-family:"Roboto",Helvetica,Arial,sans-serif;line-height:1.5;text-decoration:none;white-space:nowrap;text-align:center!important;font-weight:500;transition:background-color .25s ease-in;cursor:pointer;padding:5px 10px}.button i{margin-right:.5rem;color:#fff}.button--active,.button--primary{background:#339a69;color:#fff}.button--dark{background:#686868;color:#fff}.button:hover{background-color:#339a69;color:#fff}.button:hover i{color:#fff}.button--fullwidth{width:100%}',""]),t.exports=r},271:function(t,e,n){"use strict";n.r(e);var r=n(256).a,o=(n(269),n(14)),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement;return(t._self._c||e)("nuxt-link",{tag:"div",staticClass:"button",class:["button--"+t.state,t.size?"button--"+t.size:"",!!t.active&&"button--active"],attrs:{to:t.href}},[t._t("default",(function(){return[t._v("i'm a button")]}))],2)}),[],!1,null,null,null);e.default=component.exports}}]);