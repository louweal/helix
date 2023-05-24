export const state = () => ({
  network: "testnet",
  lookupContractId: "0.0.13335253",
  depositFactoryId: "0.0.13389762",
  domain: "https://helix.codesparks.nl/",
  accountId: undefined,
  foundExtension: { name: undefined },
  pairingData: undefined,
});

export const mutations = {
  setFoundExtension(state, payload) {
    console.log("set found extensions");
    console.log(payload);
    state.foundExtension = payload;
  },
  setPairingData(state, payload) {
    state.pairingData = payload;
    let accountId = payload.accountIds[0];
    state.accountId = accountId;

    state.data.contracts = undefined;
  },

  setAccountId(state, payload) {
    state.accountId = payload;
  },

  disconnect(state) {
    state.accountId = undefined;
    state.pairingData = undefined;
  },
};
