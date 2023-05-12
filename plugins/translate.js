import Vue from "vue";
import * as en from "~/lang/en.js";
// import * as nl from "~/lang/nl.js";

Vue.prototype.$t = (t) => {
  let path = window.location.pathname;
  // if (path.startsWith("/nl")) {
  //   return nl.default[t] || t;
  // }
  return en.default[t] || t;
};
