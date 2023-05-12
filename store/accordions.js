export const state = () => ({
  list: {
    why: false,
    how: false,
    tech: false,
    faq: false,
  },
});

export const mutations = {
  toggle(state, payload) {
    if (state.list[payload.name] === payload.item) {
      state.list[payload.name] = false; // hide
    } else {
      state.list[payload.name] = payload.item; // show
    }
  },
};
