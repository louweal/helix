export const state = () => ({
  show: false,
  data: undefined,
});

export const mutations = {
  show(state, payload) {
    state.show = payload.name;
    state.data = payload.data;
  },

  hide(state) {
    state.show = false;
    state.data = undefined;
  },
};
