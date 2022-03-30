export const state = () => ({
  currentCategory: "all",
});

export const mutations = {
  setCurrentCategory(state, payload) {
    state.currentCategory = payload;
  },
};
