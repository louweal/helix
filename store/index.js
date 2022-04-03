export const state = () => ({
  currentCategory: "all",
  currentAccount: {
    ID: -1,
    name: "",
    accountId: "",
    avatar: "",
  },
});

export const mutations = {
  setCurrentCategory(state, payload) {
    state.currentCategory = payload;
  },
  setCurrentAccount(state, payload) {
    state.currentAccount = payload;
  },
};
