export const state = () => ({});

export const mutations = {
  setStock(state, payload) {
    state[payload.id] = payload.onSale;
  },
};

export const actions = {};

export const getters = {};
