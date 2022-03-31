export const state = () => ({});

export const mutations = {
  SET_CONTRACTS(state, payload) {
    Vue.set(state, {
      list: payload.data,
    })
  },

}

export const actions = {
  async GET_LIST({ commit }) {
    console.log("get list");

    var json = require('~/data/contracts.json');
    console.log(json);

    commit('SET_CONTRACTS', {
      data: json
    })
  }
};

export const getters = {
  getContracts: (state, getters, rootState) => () => {
    return state.list
  },
  getMatchingContracts: state => (q) => {
    return state.list.find(c => c.name.includes(q))
  },
};
