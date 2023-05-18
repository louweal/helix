import {
  contractCreate,
  contractDeleteCreatedContract,
  contractSetBuyer,
  contractGetter,
  contractConfirmPurchase,
  contractTransferOwnership,
  contractCollect,
  contractDonate,
  contractDeleteContract,
} from "../utils/contractService";

import {
  lookupContractGetContract,
  lookupContractAddContract,
  lookupContractDeleteContract,
  lookupContractRemoveContract,
  lookupContractGetNumContracts,
  lookupContractGetContractIndex,
} from "../utils/lookupContractService";

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

export const actions = {
  // purchase contract functions

  async removeContract({ commit, state }, payload) {
    state.waiting = !state.waiting;

    // call contractDeleteCreatedContract
    await contractDeleteCreatedContract(
      state.currentAccount.accountId,
      state.currentAccount.pvkey,
      payload.contractId
    );

    // update lookup contract
    await lookupContractRemoveContract(
      state.currentAccount.accountId,
      payload.index
    );
    state.waiting = !state.waiting;

    // update store (delete contract)
    commit("deleteContract", { ID: payload.contractId });
  },

  async deleteBoughtContract({ commit, state }, payload) {
    state.waiting = !state.waiting;

    // call contractDeleteCreatedContract
    await contractDeleteContract(
      state.currentAccount.accountId,
      state.currentAccount.pvkey,
      payload.contractId,
      payload.charityId
    );

    // update lookup contract
    await lookupContractRemoveContract(
      state.currentAccount.accountId,
      payload.index
    );
    state.waiting = !state.waiting;

    // update store (delete contract)
    commit("deleteContract", { ID: payload.contractId });
  },

  async setBuyer({ commit, state }, payload) {
    state.waiting = !state.waiting;

    // 1) call contract function
    await contractSetBuyer(
      state.currentAccount.accountId,
      state.currentAccount.pvkey,
      payload.contractId,
      payload.buyerId
    );

    // 2) add contractid to the new owners' lookup list
    await lookupContractAddContract(payload.buyerId, payload.contractId);

    // 3) get the new index
    const index = await lookupContractGetContractIndex(payload.buyerId);

    // 4) delete contractid from the sellers lookup list
    await lookupContractDeleteContract(
      state.currentAccount.accountId,
      payload.index
    );

    // 5) update in store: owner, index, state
    commit("updateField", {
      contractId: payload.contractId,
      field: "index",
      value: index,
    });

    commit("updateField", {
      contractId: payload.contractId,
      field: "state",
      value: 1,
    });

    commit("updateField", {
      contractId: payload.contractId,
      field: "owner",
      value: payload.buyerId,
    });

    state.waiting = !state.waiting;
  },

  async getAvailableDeposit({ commit, state }, payload) {
    state.waiting = !state.waiting;

    const amount = await contractGetter(
      state.currentAccount.accountId,
      state.currentAccount.pvkey,
      payload.contractId,
      "getAvailableDeposit",
      "uint256"
    );

    state.waiting = !state.waiting;
    return amount;
  },

  async collect({ commit, state }, payload) {
    state.waiting = !state.waiting;

    await contractCollect(
      state.currentAccount.accountId,
      state.currentAccount.pvkey,
      payload.contractId
    );

    state.waiting = !state.waiting;
  },

  async donate({ commit, state }, payload) {
    state.waiting = !state.waiting;

    await contractDonate(
      state.currentAccount.accountId,
      state.currentAccount.pvkey,
      payload.contractId,
      payload.charityId
    );

    state.waiting = !state.waiting;
  },

  async confirmPurchase({ commit, state }, payload) {
    state.waiting = !state.waiting;

    await contractConfirmPurchase(
      state.currentAccount.accountId,
      state.currentAccount.pvkey,
      payload.contractId,
      payload.amount,
      payload.fakeBuyDate
    );

    // update store: state = 2, date , alleen dit?

    commit("updateField", {
      contractId: payload.contractId,
      field: "state",
      value: 2,
    });
    commit("updateField", {
      contractId: payload.contractId,
      field: "startdate",
      value: payload.fakeBuyDate != 0 ? payload.fakeBuyDate : Date.now() / 1000,
    });

    state.waiting = !state.waiting;
  },

  async transferOwnership({ commit, state }, payload) {
    state.waiting = !state.waiting;

    // 1) call contract function
    await contractTransferOwnership(
      state.currentAccount.accountId,
      state.currentAccount.pvkey,
      payload.contractId,
      payload.buyerId,
      payload.charityId
    );

    // 2) add contractid to the new owners' lookup list
    await lookupContractAddContract(payload.buyerId, payload.contractId);

    // 3) get the new index
    const index = await lookupContractGetContractIndex(payload.buyerId);

    // 4) delete contractid from the sellers lookup list
    await lookupContractDeleteContract(
      state.currentAccount.accountId,
      payload.index
    );

    // 5) update in store: owner, index, state, seller, startdate
    commit("updateField", {
      contractId: payload.contractId,
      field: "index",
      value: index,
    });

    commit("updateField", {
      contractId: payload.contractId,
      field: "state",
      value: 3,
    });

    commit("updateField", {
      contractId: payload.contractId,
      field: "owner",
      value: payload.buyerId,
    });

    commit("updateField", {
      contractId: payload.contractId,
      field: "startdate",
      value: Date.now() / 1000,
    });
    commit("updateField", {
      contractId: payload.contractId,
      field: "seller",
      value: state.currentAccount.accountId,
    });
    state.waiting = !state.waiting;
  },

  async addSmartContract({ commit, state }, payload) {
    console.log("in addSmartContract");
    delete payload.amount;
    // console.log(payload);

    let metadata = encodeData(payload);

    console.log(payload);
    let lifespan = payload.lifespan;
    let deposit = payload.deposit;
    let order_date = payload.order_date;
    const date = Math.floor(new Date(order_date).getTime() / 1000);

    let xxx = await contractCreate(metadata, lifespan, deposit, date);

    return;
    let data = payload;
    let accountId = state.currentAccount.accountId;
    let pvkey = state.currentAccount.pvkey;

    let contractId = await contractCreate(params);

    await lookupContractAddContract(accountId, contractId);

    // Run query to find the index of the new contract in the list
    const index = await lookupContractGetContractIndex(accountId);

    // add the returned contract meta data
    data["ID"] = contractId.toString();
    data["index"] = +index; // index in list in lookup contract

    // add contract to store
    commit("addContract", data);

    return contractId;
  },

  async getSmartContracts({ commit, state }, payload) {
    state.waiting = !state.waiting;

    let accountId = state.currentAccount.accountId;
    let pvkey = state.currentAccount.pvkey;

    const numContracts = await lookupContractGetNumContracts(accountId);

    let i = 0;

    let data = [];

    while (i < numContracts) {
      let contractId = await lookupContractGetContract(accountId, i);

      if (contractId.toString() !== "0.0.0") {
        const state = await contractGetter(
          accountId,
          pvkey,
          contractId,
          "getState",
          "uint8"
        );
        const prevOwner = await contractGetter(
          accountId,
          pvkey,
          contractId,
          "getPrevOwner",
          "address"
        );

        const encodedS = await contractGetter(
          accountId,
          pvkey,
          contractId,
          "getStatic",
          "string"
        );
        const date = await contractGetter(
          accountId,
          pvkey,
          contractId,
          "getDate",
          "uint32"
        );

        const s = decodeData(encodedS);

        data.push({
          index: i,
          ID: contractId.toString(),
          startdate: date, //parseInt((Date.now() / 1000 - date) / 86400),
          state: state,
          store: accountId, // is this correct?
          seller: prevOwner, // get this from store?
          owner: accountId,
          category: +s.category,
          visual: +s.visual,
          name: s.name,
          description: s.description,
          material_description: s.material_description,
          production_country: s.production_country,
          deposit: +s.deposit,
          price: +s.price,
          duration: +s.duration,
        });
      }

      i += 1;
    }

    let storeIds = state.contracts.map((c) => c.ID);

    data = data.filter((c) => !storeIds.includes(c.ID));

    // commit all to store
    commit("addContracts", data);
    commit("setAccountContractsFetched");

    state.waiting = !state.waiting;
    return data;
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
