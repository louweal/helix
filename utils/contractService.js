import Vue from "vue";
require("dotenv").config();

const {
  Client,
  AccountId,
  PrivateKey,
  ContractId,
  ContractFunctionParameters,
  ContractExecuteTransaction,
  ContractCallQuery,
  TransactionRecordQuery,
  Hbar,
} = require("@hashgraph/sdk");

async function transactionFlow(tx, returnType) {
  let rx; // response
  let isVoid = returnType === false; // get returned value if function has returnType

  if (process.env.MY_ACCOUNT_ID && process.env.MY_PRIVATE_KEY) {
    //.env file found -> testing on localhost
    rx = await clientTransactionFlow(tx, isVoid);
  } else {
    rx = await signerTransactionFlow(tx, isVoid);
  }

  let val;
  // console.log(rx);

  switch (returnType) {
    case "address":
      val = AccountId.fromSolidityAddress(rx.getAddress(0));
      break;
    default:
      val = rx.toString();
  }

  console.log(`Result: ${val} \n`);

  return val; // return value
}

async function queryFlow(tx, returnType) {
  let exTx;

  if (process.env.MY_ACCOUNT_ID && process.env.MY_PRIVATE_KEY) {
    //.env file found -> testing on localhost
    exTx = await clientQueryFlow(tx);
  } else {
    exTx = await signerQueryFlow(tx);
  }
  let val;
  switch (returnType) {
    case "string":
      val = exTx.getString(0);
      break;
    case "uint32":
      val = exTx.getUint32(0);
      break;
    case "address":
      val = AccountId.fromSolidityAddress(exTx.getAddress(0)).toString();
      break;
    default:
      console.log("Unknown returnType: " + returnType);
  }

  console.log(`Result: ${val.toString()} \n`);
  return val;
}

async function clientQueryFlow(tx) {
  const id = AccountId.fromString(process.env.MY_ACCOUNT_ID);
  const key = PrivateKey.fromString(process.env.MY_PRIVATE_KEY);
  const client = Client.forTestnet().setOperator(id, key);

  return await tx.execute(client);
}

async function signerQueryFlow(tx) {
  let network = Vue.prototype.$network;
  let topic = Vue.prototype.$hashconnect.hcData.topic;
  let accountId = Vue.prototype.$hashconnect.hcData.pairingData[0].accountIds[0];
  let provider = Vue.prototype.$hashconnect.getProvider(network, topic, accountId);
  let signer = Vue.prototype.$hashconnect.getSigner(provider);

  return await tx.executeWithSigner(signer);
}

async function clientTransactionFlow(tx, isVoid) {
  const id = AccountId.fromString(process.env.MY_ACCOUNT_ID);
  const key = PrivateKey.fromString(process.env.MY_PRIVATE_KEY);
  const client = Client.forTestnet().setOperator(id, key);

  const frozenTx = tx.freezeWith(client);
  const signedTx = await frozenTx.sign(key);
  const exTx = await signedTx.execute(client);

  if (isVoid) {
    return (await exTx.getReceipt(client)).status; //  get status
  } else {
    return (await exTx.getRecord(client)).contractFunctionResult; // to get return value
  }
}

async function signerTransactionFlow(tx, isVoid) {
  let network = Vue.prototype.$network;
  let topic = Vue.prototype.$hashconnect.hcData.topic;
  let accountId = Vue.prototype.$hashconnect.hcData.pairingData[0].accountIds[0];
  let provider = Vue.prototype.$hashconnect.getProvider(network, topic, accountId);
  let signer = Vue.prototype.$hashconnect.getSigner(provider);

  // sign with HashPack
  let frozenTx = await tx.freezeWithSigner(signer);
  const exTx = await frozenTx.executeWithSigner(signer);
  //return await provider.getTransactionReceipt(exTx.transactionId);

  if (isVoid) {
    return await provider.getTransactionReceipt(exTx.transactionId); //  get status
  } else {
    console.log(await provider.getTransactionReceipt(exTx.transactionId));
    let rec = await provider.call(
      new TransactionRecordQuery().setIncludeChildren(true).setTransactionId(exTx.transactionId)
    ); // undefined .setIncludeChildren(true)
    console.log(rec);
    return rec;
  }
}

function functionParameters(params) {
  let cfp = new ContractFunctionParameters();

  for (let i = 0; i < params.length; i++) {
    let type = params[i]["type"];
    let value = params[i]["value"];

    switch (type) {
      case "string":
        cfp = cfp.addString(value);
        break;
      case "uint256":
        cfp = cfp.addUint256(value);
        break;
      case "uint32":
        cfp = cfp.addUint32(value);
        break;
      case "address": {
        cfp = cfp.addAddress(ContractId.fromString(value).toSolidityAddress());
        break;
      }
      default:
        console.log("Unknown parameter type");
    }
  }

  return cfp;
}

export function getSolidityAddress(str) {
  return AccountId.fromString(str).toSolidityAddress().toString();
}

export async function contractExecuteTransaction(id, name, params, returnType = false, value = false) {
  let tx = new ContractExecuteTransaction().setContractId(id).setGas(3000000);

  if (params) {
    tx = tx.setFunction(name, functionParameters(params));
  } else {
    tx = tx.setFunction(name);
  }

  if (value) {
    tx = tx.setPayableAmount(Hbar.fromTinybars(value));
  }

  return await transactionFlow(tx, returnType);
}

export async function contractCallQuery(id, name, params, returnType) {
  let tx = new ContractCallQuery().setContractId(id).setGas(200000);

  if (params) {
    tx = tx.setFunction(name, functionParameters(params));
  } else {
    tx = tx.setFunction(name);
  }

  return await queryFlow(tx, returnType);
}
