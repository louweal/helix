export const state = () => ({
  active: "03",
});

export const mutations = {
  toggle(state, id) {
    state.active = id;
  },
};
