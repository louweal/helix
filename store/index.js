export const state = () => ({
  currentCategory: "all",
  currentAccount: {
    ID: -1,
    name: "",
    accountId: "",
    avatar: "",
  },
  contracts: []
});

export const actions = {
}

export const mutations = {
  SET_CONTRACTS(state, payload) {
    // console.log(payload);
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


export const getters = {

}