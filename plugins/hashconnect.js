import Vue from "vue";
import { HashConnect } from "hashconnect";

Vue.prototype.$network = "testnet";
Vue.prototype.$hashconnect = new HashConnect(true); // true enables debugmode

// console.log(Vue.prototype.$hashconnect);
