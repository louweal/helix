import { contractCallQuery, contractExecuteTransaction } from "../utils/contractService";

import { lookupContractGetContract, lookupContractGetNumContracts } from "../utils/lookupContractService";

let factoryContractId = "0.0.13389762";
let lookupContractId = "0.0.13335253";
let accountId = "0.0.3477311";

export const state = () => ({
  contracts: undefined,
  demo: undefined,
  sortBy: {
    group: "contract",
    field: "startdate",
    direction: 1,
  },
  waiting: false,
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

      if (state.sortBy.group === payload.group && state.sortBy.field === payload.field) {
        direction = -1 * state.sortBy.direction;
      }
      state.sortBy.direction = direction;
    }

    state.sortBy.group = payload.group;
    state.sortBy.field = payload.field;

    let type = "contracts";
    let dataClone = [...state.contracts]; //to do
    // console.log(typeof dataClone);
    if (typeof state[type][0][state.sortBy.group][state.sortBy.field] === "string") {
      state[type].sort((a, b) =>
        a[state.sortBy.group][state.sortBy.field].toLowerCase() > b[state.sortBy.group][state.sortBy.field].toLowerCase()
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
        value: Math.floor(new Date(payload.order_date).getTime() / 1000),
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

  async getSmartContracts({ commit, state }, payload) {
    //   state.waiting = !state.waiting;
    //   let accountId = state.currentAccount.accountId;
    //   let pvkey = state.currentAccount.pvkey;
    //   const numContracts = await lookupContractGetNumContracts(accountId);
    //   let i = 0;
    //   let data = [];
    //   while (i < numContracts) {
    //     let contractId = await lookupContractGetContract(accountId, i);
    //     if (contractId.toString() !== "0.0.0") {
    //       const state = await contractGetter(accountId, pvkey, contractId, "getState", "uint8");
    //       const prevOwner = await contractGetter(accountId, pvkey, contractId, "getPrevOwner", "address");
    //       const encodedS = await contractGetter(accountId, pvkey, contractId, "getStatic", "string");
    //       const date = await contractGetter(accountId, pvkey, contractId, "getDate", "uint32");
    //       const s = decodeData(encodedS);
    //       data.push({
    //         index: i,
    //         ID: contractId.toString(),
    //         startdate: date, //parseInt((Date.now() / 1000 - date) / 86400),
    //         state: state,
    //         store: accountId, // is this correct?
    //         seller: prevOwner, // get this from store?
    //         owner: accountId,
    //         category: +s.category,
    //         visual: +s.visual,
    //         name: s.name,
    //         description: s.description,
    //         material_description: s.material_description,
    //         production_country: s.production_country,
    //         deposit: +s.deposit,
    //         price: +s.price,
    //         duration: +s.duration,
    //       });
    //     }
    //     i += 1;
    //   }
    //   let storeIds = state.contracts.map((c) => c.ID);
    //   data = data.filter((c) => !storeIds.includes(c.ID));
    //   // commit all to store
    //   commit("addContracts", data);
    //   commit("setAccountContractsFetched");
    //   state.waiting = !state.waiting;
    //   return data;
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
