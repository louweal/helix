export const state = () => ({
  network: "testnet",
  domain: "https://marvelous-chebakia-329fb2.netlify.app/",
  // user: { id: -1, name: "", address: "", slug: "" },
  accountId: undefined,
  foundExtension: { name: undefined },
  pairingData: undefined,
});

export const mutations = {
  setFoundExtension(state, payload) {
    console.log(payload);
    state.foundExtension = payload;
  },
  setPairingData(state, payload) {
    state.pairingData = payload;
    let accountId = payload.accountIds[0];
    state.accountId = accountId;

    state.data.contracts = undefined;
  },

  disconnect(state) {
    state.accountId = undefined;
    state.pairingData = undefined;
  },
};
