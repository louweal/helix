export const state = () => ({
  currentCategory: "all",
  currentAccount: 0
});

// export const actions = {
//   /**
//    *  Init data to use globally
//    */
//   async nuxtServerInit({ dispatch }) {
//     console.log("nuxtserverinit");
//     await Promise.all([
//       dispatch('contracts/GET_LIST'),
//     ])
//   },
// }

export const mutations = {
  setCurrentCategory(state, payload) {
    state.currentCategory = payload;
  },
  setCurrentAccount(state, payload) {
    state.currentAccount = payload;
  },
};
