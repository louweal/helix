export const state = () => ({
  contracts: undefined,
  demo: undefined,
  sortBy: {
    group: "contract",
    field: "startdate",
    direction: 1,
  },
});

export const mutations = {
  SET_CONTRACTS(state, contracts) {
    state.contracts = contracts;
  },
  SET_DEMO_CONTRACTS(state, payload) {
    if (payload) {
      state.demo = payload;
      state.contracts = payload;
    } else {
      state.contracts = state.demo;
    }
  },

  setSortBy(state, payload) {
    // console.log(payload);

    if (payload.direction) {
      state.sortBy.direction = payload.direction;
    } else {
      let direction = 1;

      if (
        state.sortBy.group === payload.group &&
        state.sortBy.field === payload.field
      ) {
        direction = -1 * state.sortBy.direction;
      }
      state.sortBy.direction = direction;
    }

    state.sortBy.group = payload.group;
    state.sortBy.field = payload.field;

    let type = "contracts";
    let dataClone = [...state.contracts]; //to do
    // console.log(typeof dataClone);
    if (
      typeof state[type][0][state.sortBy.group][state.sortBy.field] === "string"
    ) {
      state[type].sort((a, b) =>
        a[state.sortBy.group][state.sortBy.field].toLowerCase() >
        b[state.sortBy.group][state.sortBy.field].toLowerCase()
          ? -1 * state.sortBy.direction
          : 1 * state.sortBy.direction
      );
    } else {
      state[type].sort((a, b) =>
        a[state.sortBy.group][state.sortBy.field] >
        b[state.sortBy.group][state.sortBy.field]
          ? -1 * state.sortBy.direction
          : 1 * state.sortBy.direction
      );
    }
  },
};
