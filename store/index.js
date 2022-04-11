import { accountCreate } from "../service/accountCreate";
import { accountGetInfo } from "../service/accountGetInfo";
import { tokenGetInfo } from "../service/tokenService";

export const state = () => ({
  currentCategory: -1,
  action: false,
  currentAccount: {
    ID: -1,
    name: "",
    accountId: "",
    avatar: "",
  },
  contracts: [],
  accounts: [],
  categories: [],
  countries: [],
  images: [],
  labels: [],
  materials: []
});

// export const actions = {
//   async setup() {
//     console.log("doing setup");
//   }
// };

export const mutations = {
  SET_CONTRACTS(state, payload) {
    state.contracts = payload
  },
  SET_ACCOUNTS(state, payload) {
    state.accounts = payload
  },
  SET_CATEGORIES(state, payload) {
    state.categories = payload
  },
  SET_COUNTRIES(state, payload) {
    state.countries = payload
  },
  SET_IMAGES(state, payload) {
    state.images = payload
  },
  SET_LABELS(state, payload) {
    state.labels = payload
  },
  SET_MATERIALS(state, payload) {
    state.materials = payload
  },
  setCurrentCategory(state, payload) {
    state.currentCategory = payload;
  },
  setCurrentAccount(state, payload) {
    state.currentAccount = payload;
  },
  setAction(state, payload) {
    state.action = payload
  },

  addContract(state, payload) {
    //payload = contract
    state.contracts.push(payload);
    state.images.forEach(i => i.used = i.ID === payload.visual ? true : i.used)
  },

  deleteContract(state, payload) {
    //payload = contract
    state.images.forEach(i => i.used = i.ID === payload.visual ? false : i.used)
    state.contracts = state.contracts.filter(c => c.ID !== payload.ID)

  },
  transferContract(state, payload) {
    // { ID , seller, buyer }
    state.contracts.forEach(c => {
      c.owner = c.ID === payload.ID ? payload.buyer : c.owner,
        c.seller = c.ID === payload.ID ? payload.seller : c.seller,
        c.startdate = c.ID === payload.ID ? todayDate() : c.startdate
    })
  },
  sellContract(state, payload) {
    // { ID , buyer }
    state.contracts.forEach(c => {
      c.owner = c.ID === payload.ID ? payload.buyer : c.owner,
        c.startdate = c.ID === payload.ID ? todayDate() : c.startdate
    })
  }
};

function todayDate() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();

  return dd + "-" + mm + "-" + yyyy;
}
