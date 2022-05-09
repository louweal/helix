import {
  contractCreate,
  getMyContracts,
  contractSetBuyer,
  contractConfirmPurchase,
  contractDeleteCreatedContract,
  lookupContractRemoveContract,
} from "../utils/contractService";

export const state = () => ({
  currentAccount: {},
  contracts: [],
  accounts: [],
  categories: [],
  countries: [],
  images: [],
  labels: [],
  materials: [],
  currentCategory: -1,
  waiting: false,
  action: false,
});

export const mutations = {
  SET_CONTRACTS(state, payload) {
    state.contracts = payload;
  },
  SET_ACCOUNTS(state, payload) {
    state.accounts = payload;
  },
  SET_CATEGORIES(state, payload) {
    state.categories = payload;
  },
  SET_COUNTRIES(state, payload) {
    state.countries = payload;
  },
  SET_IMAGES(state, payload) {
    state.images = payload;
  },
  SET_LABELS(state, payload) {
    state.labels = payload;
  },
  SET_MATERIALS(state, payload) {
    state.materials = payload;
  },
  setCurrentCategory(state, payload) {
    state.currentCategory = payload;
  },
  setCurrentAccount(state, payload) {
    state.currentAccount = payload;
  },
  setAction(state, payload) {
    state.action = payload;
  },

  addContract(state, payload) {
    //payload = contract
    state.contracts.push(payload);
    console.log("added to store: " + payload);
  },

  addContracts(state, payload) {
    //payload = contracts array
    state.contracts.push(...payload);
    console.log("added to store: " + payload);
  },

  deleteContract(state, payload) {
    //payload = contract
    state.contracts = state.contracts.filter((c) => c.ID !== payload.ID);
  },

  updateField(state, payload) {
    state.contracts.forEach(
      (c) =>
        (c[payload.field] =
          c.ID === payload.contractId ? payload.value : c[payload.field])
    );
  },

  transferContract(state, payload) {
    // { ID , seller, buyer }
    state.contracts.forEach((c) => {
      (c.owner = c.ID === payload.ID ? payload.buyer : c.owner),
        (c.seller = c.ID === payload.ID ? payload.seller : c.seller),
        (c.startdate = c.ID === payload.ID ? todayDate() : c.startdate);
    });
  },
  sellContract(state, payload) {
    // { ID , buyer }
    state.contracts.forEach((c) => {
      (c.owner = c.ID === payload.ID ? payload.buyer : c.owner),
        (c.startdate = c.ID === payload.ID ? todayDate() : c.startdate);
    });
  },

  toggleAwaitState(state) {
    state.waiting = !state.waiting;
  },

  setAccountContractsFetched(state) {
    state.currentAccount["fetched"] = true;
  },
};

export const actions = {
  // purchase contract functions

  async removeContract({ commit, state }, payload) {
    commit("toggleAwaitState");

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
    commit("toggleAwaitState");

    // update store (delete contract)
    commit("deleteContract", { ID: payload.contractId });
  },

  async setBuyer({ commit, state }, payload) {
    // call contract function
    let index = await contractSetBuyer(
      state.currentAccount.accountId,
      state.currentAccount.pvkey,
      payload.contractId,
      payload.index,
      payload.buyerId
    );

    // update index, state and owner in store (so no queries are needed to see the changes)

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
  },

  async confirmPurchase({ commit, state }, payload) {
    await contractConfirmPurchase(
      state.currentAccount.accountId,
      state.currentAccount.pvkey,
      payload.contractId,
      payload.deposit,
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
      value: payload.fakeBuyDate,
    });
  },

  async addSmartContract({ commit, state }, payload) {
    // commit("toggleAwaitState"); //

    let data = payload;
    let { contractId, index } = await contractCreate(
      state.currentAccount.accountId,
      state.currentAccount.pvkey,
      data
    );
    // console.log(index);

    // add the returned contract meta data
    data["ID"] = contractId.toString();
    data["index"] = +index; // index in list in lookup contract

    commit("addContract", data);
    // commit("toggleAwaitState");

    return contractId;
  },

  async getSmartContracts({ commit, state }) {
    commit("toggleAwaitState");
    let data = await getMyContracts(
      state.currentAccount.accountId,
      state.currentAccount.pvkey
    );

    console.log("data in store");
    console.log(data);

    let storeIds = state.contracts.map((c) => c.ID);

    console.log("lengths");
    console.log(data.length);
    data = data.filter((c) => !storeIds.includes(c.ID));
    console.log(data.length);

    // commit all to store
    commit("addContracts", data);
    commit("setAccountContractsFetched");

    commit("toggleAwaitState");
    return data;
  },
};

function todayDate() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();

  return dd + "-" + mm + "-" + yyyy;
}
