export const state = () => ({
  currentCategory: -1,
  currentAccount: {
    ID: -1,
    name: "",
    accountId: "",
    avatar: "",
  },
  contracts: []
});

export const mutations = {
  SET_CONTRACTS(state, payload) {
    state.contracts = payload
  },
  setCurrentCategory(state, payload) {
    state.currentCategory = payload;
  },
  setCurrentAccount(state, payload) {
    state.currentAccount = payload;
  },

  addContract(state, payload) {
    state.contracts.push(payload)
  }
};