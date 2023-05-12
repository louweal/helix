export const state = () => ({
  active: false,
});

export const mutations = {
  show(state) {
    state.active = true;
  },

  hide(state) {
    state.active = false;
  },
};
