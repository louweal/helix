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
  },

  addContracts(state, payload) {
    //payload = contracts array
    state.contracts.push(...payload);
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

  // transferContract(state, payload) {
  //   // { ID , seller, buyer }
  //   state.contracts.forEach((c) => {
  //     (c.owner = c.ID === payload.ID ? payload.buyer : c.owner),
  //       (c.seller = c.ID === payload.ID ? payload.seller : c.seller),
  //       (c.startdate = c.ID === payload.ID ? todayDate() : c.startdate);
  //   });
  // },
  // sellContract(state, payload) {
  //   // { ID , buyer }
  //   state.contracts.forEach((c) => {
  //     (c.owner = c.ID === payload.ID ? payload.buyer : c.owner),
  //       (c.startdate = c.ID === payload.ID ? todayDate() : c.startdate);
  //   });
  // },

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

  async deleteBoughtContract({ commit, state }, payload) {
    commit("toggleAwaitState");

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
    commit("toggleAwaitState");

    // update store (delete contract)
    commit("deleteContract", { ID: payload.contractId });
  },

  async setBuyer({ commit, state }, payload) {
    commit("toggleAwaitState");

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
    console.log(index);

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

    commit("toggleAwaitState");
  },

  async getAvailableDeposit({ commit, state }, payload) {
    commit("toggleAwaitState");

    const amount = await contractGetter(
      state.currentAccount.accountId,
      state.currentAccount.pvkey,
      payload.contractId,
      "getAvailableDeposit",
      "uint256"
    );

    commit("toggleAwaitState");

    console.log(amount);

    return amount;
  },

  async collect({ commit, state }, payload) {
    commit("toggleAwaitState");

    await contractCollect(
      state.currentAccount.accountId,
      state.currentAccount.pvkey,
      payload.contractId
    );

    commit("toggleAwaitState");
  },

  async donate({ commit, state }, payload) {
    commit("toggleAwaitState");

    await contractDonate(
      state.currentAccount.accountId,
      state.currentAccount.pvkey,
      payload.contractId,
      payload.charityId
    );

    commit("toggleAwaitState");
  },

  async confirmPurchase({ commit, state }, payload) {
    commit("toggleAwaitState");

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
      value: payload.fakeBuyDate != 0 ? payload.fakeBuyDate : Date.now() / 1000,
    });

    commit("toggleAwaitState");
  },

  async transferOwnership({ commit, state }, payload) {
    commit("toggleAwaitState");

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
      value: 0,
    });
    commit("updateField", {
      contractId: payload.contractId,
      field: "seller",
      value: state.currentAccount.accountId,
    });
    commit("toggleAwaitState");
  },

  async addSmartContract({ commit, state }, payload) {
    let data = payload;
    let accountId = state.currentAccount.accountId;
    let pvkey = state.currentAccount.pvkey;

    const staticDataStr = encodeData({
      name: data.name,
      visual: data.visual,
      category: data.category,
      deposit: data.deposit,
      description: data.description,
      productionCountry: data.productionCountry,
      materialDescription: data.materialDescription,
    });

    let contractId = await contractCreate(
      accountId,
      pvkey,
      data,
      staticDataStr
    );

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

  async getSmartContracts({ commit, state }) {
    commit("toggleAwaitState");

    let accountId = state.currentAccount.accountId;
    let pvkey = state.currentAccount.pvkey;

    console.log("currentAccount", accountId);

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
        const duration = await contractGetter(
          accountId,
          pvkey,
          contractId,
          "getDuration",
          "uint256"
        );
        const s = decodeData(encodedS);

        data.push({
          index: i,
          ID: contractId.toString(),
          startdate: date, //parseInt((Date.now() / 1000 - date) / 86400),
          duration: +duration,
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
          // charity: charity,
        });
      }

      i += 1;
    }

    let storeIds = state.contracts.map((c) => c.ID);

    data = data.filter((c) => !storeIds.includes(c.ID));

    // commit all to store
    commit("addContracts", data);
    commit("setAccountContractsFetched");

    commit("toggleAwaitState");
    return data;
  },
};

// function todayDate() {
//   var today = new Date();
//   var dd = String(today.getDate()).padStart(2, "0");
//   var mm = String(today.getMonth() + 1).padStart(2, "0");
//   var yyyy = today.getFullYear();

//   return dd + "-" + mm + "-" + yyyy;
// }

// helper functions

function encodeData(data) {
  let str = "";
  let numProps = Object.keys(data).length;
  let i = 0;
  for (let prop in data) {
    str = str.concat(data[prop]);
    if (i < numProps - 1) {
      str = str.concat(":|:");
    }
    i += 1;
  }
  return str;
}

function decodeData(str) {
  let obj = {};
  let props = str.split(":|:");

  obj["name"] = props[0];
  obj["visual"] = +props[1];
  obj["category"] = +props[2];
  obj["deposit"] = +props[3];
  obj["description"] = props[4];
  obj["production_country"] = props[5];
  obj["material_description"] = props[6];
  return obj;
}
