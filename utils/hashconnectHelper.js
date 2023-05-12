import { HashConnect } from "hashconnect";

let hashconnect;

// let availableExtensions = [];
let status = "Initializing";

let initData;
let pairingData;
let accountId;
let availableExtension;
let state;

// let saveData = {};

let appMetadata = {
  name: "Circless",
  description: "Fiction dApp on Hedera",
  icon: "https://localhost:8001/favicon.png",
};
export function getAvailableExtension() {
  return availableExtension;
}

export async function connectHashpack() {
  hashconnect.connectToLocalWallet();
}
