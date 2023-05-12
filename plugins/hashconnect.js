import Vue from "vue";
import { HashConnect } from "hashconnect";

Vue.prototype.$hashconnect = new HashConnect(true);

// Vue.prototype.$initHashconnect = () => {
//   Vue.prototype.$hashconnect = new HashConnect(true);
// };
