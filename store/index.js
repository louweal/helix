import { contractCreate, getMyContracts } from "../utils/contractService";

export const state = () => ({
  currentCategory: -1,
  action: false,
  currentAccount: {},
  currentContractId: -1,
  contracts: [],
  accounts: [],
  categories: [],
  countries: [],
  images: [],
  labels: [],
  materials: [],
  fetching: false,
});

export const actions = {
  // hedera smart contracts
  async addSmartContract({ commit, state }, payload) {
    console.log("the payload");
    console.log(payload.name);

    let contractId = await contractCreate(
      state.currentAccount.accountId,
      state.currentAccount.pvkey,
      payload.name,
      payload.description,
      payload.visual,
      payload.category,
      payload.productionCountry,
      payload.materialDescription,
      payload.duration,
      payload.deposit,
      payload.charityAccountId
    );
    commit("updateContractId", contractId);
    return contractId;
  },

  async getSmartContracts({ state }) {
    let data = await getMyContracts(
      state.currentAccount.accountId,
      state.currentAccount.pvkey
    );

    console.log("data in store");
    console.log(data);

    // todo commit each to store if not in store yet

    return data;
  },
};

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
  resetCurrentContractId(state) {
    state.currentContractId = -1;
  },
  setAction(state, payload) {
    state.action = payload;
  },

  addContract(state, payload) {
    //payload = contract
    state.contracts.push(payload);
    state.images.forEach(
      (i) => (i.used = i.ID === payload.visual ? true : i.used)
    );
  },

  deleteContract(state, payload) {
    //payload = contract
    state.images.forEach(
      (i) => (i.used = i.ID === payload.visual ? false : i.used)
    );
    state.contracts = state.contracts.filter((c) => c.ID !== payload.ID);
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

  updateContractId(state, payload) {
    state.currentContractId = payload;
  },

  toggleFetchState(state) {
    state.fetching = !state.fetching;
  },
};

function todayDate() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();

  return dd + "-" + mm + "-" + yyyy;
}
