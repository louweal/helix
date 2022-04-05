export const state = () => ({
  currentCategory: -1,
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

  addContract(state, payload) {
    state.contracts.push(payload)
  },
  transferContract(state, payload) {
    // { id , newOwner }
    state.contracts.forEach(c => c.owner = c.ID === payload.ID ? payload.newOwner : c.owner)
  }
};