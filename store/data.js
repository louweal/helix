import { contractCallQuery, contractExecuteTransaction, getSolidityAddress } from "../utils/contractService";

// import { lookupContractGetContract, lookupContractGetNumContracts } from "../utils/lookupContractService";

let factoryContractId = "0.0.13389762";
let lookupContractId = "0.0.13335253";
let accountId = "0.0.3477311";

export const state = () => ({
  contracts: [],
  demo: undefined,
  sortBy: {
    group: "contract",
    field: "startdate",
    direction: 1,
  },
  waiting: false,
});

export const mutations = {
  // SET_CONTRACTS(state, contracts) {
  //   state.contracts = contracts;
  // },
  SET_DEMO_CONTRACTS(state, payload) {
    if (payload) {
      state.demo = payload;
      state.contracts = payload;
    } else {
      state.contracts = state.demo;
    }
  },

  addContract(state, payload) {
    // state.contracts[payload.i] = payload.item;
    state.contracts.push(payload);
  },

  setSortBy(state, payload) {
    // console.log(payload);

    if (payload.direction) {
      state.sortBy.direction = payload.direction;
    } else {
      let direction = 1;

      if (state.sortBy.group === payload.group && state.sortBy.field === payload.field) {
        direction = -1 * state.sortBy.direction;
      }
      state.sortBy.direction = direction;
    }

    state.sortBy.group = payload.group;
    state.sortBy.field = payload.field;

    let type = "contracts";
    // console.log(typeof dataClone);
    if (typeof state[type][0][state.sortBy.group][state.sortBy.field] === "string") {
      state[type].sort((a, b) =>
        a[state.sortBy.group][state.sortBy.field].toLowerCase() >
        b[state.sortBy.group][state.sortBy.field].toLowerCase()
          ? -1 * state.sortBy.direction
          : 1 * state.sortBy.direction
      );
    } else {
      state[type].sort((a, b) =>
        a[state.sortBy.group][state.sortBy.field] > b[state.sortBy.group][state.sortBy.field]
          ? -1 * state.sortBy.direction
          : 1 * state.sortBy.direction
      );
    }
  },
};

export const actions = {
  async makeSolidityAddress(state, payload) {
    console.log(payload);
    return getSolidityAddress(payload);
  },
  async createDepositContract({ commit, state }, payload) {
    let value = parseInt(payload.deposit * 1e8);
    console.log("in createDepositContract");
    delete payload.amount;

    let params = [
      { type: "string", value: encodeData(payload) },
      { type: "uint256", value: payload.lifespan },
      { type: "uint256", value: value },
      {
        type: "uint256",
        value: payload.order_date,
      },
    ];

    let newContractId = await contractExecuteTransaction(factoryContractId, "deployDeposit", params, "address", value);
    console.log(newContractId);

    let params2 = [
      {
        type: "address",
        value: accountId, // todo
      },
      {
        type: "address",
        value: newContractId,
      },
    ];

    let status = await contractExecuteTransaction(lookupContractId, "addContract", params2, false, false);

    console.log(status);

    return newContractId;
  },

  async getNumContracts({ commit, state }) {
    let params = [
      {
        type: "address",
        value: accountId,
      },
    ];

    let num = await contractCallQuery(lookupContractId, "getNumContracts", params, "uint32");

    return num;
  },

  async getContractId({ commit, state }, payload) {
    let params = [
      {
        type: "address",
        value: payload.accountId,
      },
      {
        type: "uint32",
        value: payload.i,
      },
    ];

    return await contractCallQuery(lookupContractId, "getContract", params, "address");
  },

  async getMetadata({ commit, state }, payload) {
    let encoded = await contractCallQuery(payload.contractId, "metadata", false, "string");
    // console.log(encoded);

    let d = decodeData(encoded);

    let item = {
      i: payload.i, // index position in lookup contract
      store: {
        name: d.store,
      },
      product: {
        name: d.name,
        visual: d.visual,
      },
      contract: {
        id: payload.contractId,
        currency: "EUR",
        deposit: d.deposit,
        startdate: d.order_date,
        enddate: d.order_date + d.lifespan * 86400,
      },
    };

    commit("addContract", { i: payload.i, item: item });
  },

  async donateDeposit({ commit, state }, payload) {
    // call donate function

    // delete contract from lookup contract
    let index = state.contracts.find((c) => c.contract.id === payload.contractId).i;
    console.log(index);

    let params = [
      {
        type: "address",
        value: payload.accountId,
      },
      { type: "uint32", value: index },
    ];

    // console.log(params);

    let status = await contractExecuteTransaction(lookupContractId, "deleteContract", params, false, false);
    console.log(params);
  },
};

// helper functions

function encodeData(data) {
  return Buffer.from(JSON.stringify(data)).toString("base64");
}

function decodeData(str) {
  let decoded = Buffer.from(str, "base64").toString();
  // console.log("decoded :>> ", decoded);
  return JSON.parse(decoded);
}
