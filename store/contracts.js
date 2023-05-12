export const state = () => ({
  demoList: undefined,
  list: undefined,
});

export const mutations = {
  setContracts(state, payload) {
    state.list = payload;
  },

  setDemoContracts(state, payload) {
    state.demoList = payload;
  },
};
