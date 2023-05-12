export const state = () => ({
  open: false,
});

export const mutations = {
  toggle(state) {
    console.log("toggle");
    state.open = !state.open;
  },
};
