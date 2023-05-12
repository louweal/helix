// export const state = () => ({
//   foundExtension: { name: "Unset" },
//   pairingData: undefined,
//   hashconnect: undefined,
// });

// export const mutations = {
//   setHashconnect(state, payload) {
//     state.hashconnect = payload;
//   },

//   setFoundExtension(state, payload) {
//     state.foundExtension = payload;
//   },
//   setPairingData(state, payload) {
//     state.pairingData = payload;

//     let accountId = payload.accountIds[0];

//     // also set user
//     state.accountId = accountId;
//     state.user = {
//       id: accountId,
//       name: accountId,
//       address: accountId,
//       slug: accountId.replaceAll(".", "-"),
//     };
//   },

//   disconnect(state) {
//     // state.user = undefined;
//     // state.accountId = undefined;
//     state.pairingData = undefined;
//   },
// };
