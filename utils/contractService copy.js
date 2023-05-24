import Vue from "vue";
// import { HashConnect } from "hashconnect";
require("dotenv").config();

const {
  LocalProvider,
  Client,
  AccountId,
  PrivateKey,
  ContractId,
  FileCreateTransaction,
  FileAppendTransaction,
  ContractCreateTransaction,
  ContractFunctionParameters,
  ContractExecuteTransaction,
  ContractCallQuery,
  Hbar,
  Wallet,
  ContractCreateFlow,
} = require("@hashgraph/sdk");

let depositFactoryId = "0.0.13389762";

async function transactionFlow(tx, returnType) {
  let exTx, rx; // response
  if (process.env.MY_ACCOUNT_ID && process.env.MY_PRIVATE_KEY) {
    //.env file found -> testing on localhost
    [exTx, rx] = await clientFlow(tx);
  } else {
    [exTx, rx] = await signerFlow(tx);
  }

  let val;

  console.log(rx);

  switch (returnType) {
    case "address":
      val = rx.contractFunctionResult.getAddress(0);
      val = AccountId.fromSolidityAddress(val);
      break;
    default:
      val = rx.status;
  }

  console.log(`Result: ${val.toString()} \n`);

  return val; // return value
}

async function clientFlow(tx) {
  const id = AccountId.fromString(process.env.MY_ACCOUNT_ID);
  const key = PrivateKey.fromString(process.env.MY_PRIVATE_KEY);
  const client = Client.forTestnet().setOperator(id, key);
  // sign and execute with private key
  const frozenTx = tx.freezeWith(client);
  const signedTx = await frozenTx.sign(key);
  const exTx = await signedTx.execute(client);
  // const rx = await exTx.getReceipt(client); // to get status
  const rx = await exTx.getRecord(client); // to get return value

  return [exTx, rx];
}

async function signerFlow(tx) {
  let network = Vue.prototype.$network;
  let topic = Vue.prototype.$hashconnect.hcData.topic;
  let accountId =
    Vue.prototype.$hashconnect.hcData.pairingData[0].accountIds[0];
  let provider = Vue.prototype.$hashconnect.getProvider(
    network,
    topic,
    accountId
  );

  let signer = Vue.prototype.$hashconnect.getSigner(provider);

  // sign with HashPack
  let frozenTx = await tx.freezeWithSigner(signer);
  const exTx = await frozenTx.executeWithSigner(signer);
  const rx = await provider.getTransactionReceipt(exTx.transactionId);
  // todo: get return value?!?
  return [exTx, rx];
}

function functionParameters(params) {
  let cfp = new ContractFunctionParameters();

  for (let i = 0; i < params.length; i++) {
    let type = params[i]["type"];
    let value = params[i]["value"];

    switch (type) {
      case "String":
        cfp = cfp.addString(value);
        break;
      case "Uint256":
        cfp = cfp.addUint256(value);
        break;
      default:
        console.log("Unknown parameter type");
    }
  }

  return cfp;
}

export async function contractExecuteTransaction(
  id,
  name,
  params,
  returnType,
  value
) {}

export async function contractCreate(metadata, lifespan, deposit, date) {
  let params = [
    { type: "String", value: metadata },
    { type: "Uint256", value: lifespan },
    { type: "Uint256", value: deposit },
    { type: "Uint256", value: date },
  ];
  // create transaction for calling deployDeposit
  const tx = new ContractExecuteTransaction()
    .setContractId(depositFactoryId)
    .setGas(3000000)
    .setPayableAmount(Hbar.fromTinybars(deposit))
    .setFunction("deployDeposit", functionParameters(params));

  let newContractAddresss = await transactionFlow(tx, "address");

  // add address to lookup contract
  // 0.0.13391420

  return;
}

export async function contractDeleteCreatedContract(
  accountId,
  pvKey,
  contractId
) {
  // sets the state of the contract to inactive
  const sellerId = AccountId.fromString(accountId);
  const sellerKey = PrivateKey.fromString(pvKey);
  const client = Client.forTestnet().setOperator(sellerId, sellerKey);

  // execute transaction
  const contractExecTx1 = new ContractExecuteTransaction()
    .setContractId(contractId)
    .setGas(3000000)
    .setFunction("deleteCreatedContract")
    .freezeWith(client);
  const contractExecSign1 = await contractExecTx1.sign(sellerKey);
  const contractExecSubmit1 = await contractExecSign1.execute(client);
  const contractExecRx1 = await contractExecSubmit1.getReceipt(client);
  console.log(
    `HC - ContractExecuteTransaction - deleteCreatedContract - status: ${contractExecRx1.status.toString()} \n`
  );
}

export async function contractDeleteContract(
  accountId,
  pvKey,
  contractId,
  charityAccountId
) {
  // sets the state of the contract to inactive
  const sellerId = AccountId.fromString(accountId);
  const sellerKey = PrivateKey.fromString(pvKey);
  const client = Client.forTestnet().setOperator(sellerId, sellerKey);

  // execute transaction
  const contractExecTx1 = new ContractExecuteTransaction()
    .setContractId(contractId)
    .setGas(3000000)
    .setFunction(
      "deleteContract",
      new ContractFunctionParameters().addAddress(
        AccountId.fromString(charityAccountId).toSolidityAddress()
      )
    )
    .freezeWith(client);
  const contractExecSign1 = await contractExecTx1.sign(sellerKey);
  const contractExecSubmit1 = await contractExecSign1.execute(client);
  const contractExecRx1 = await contractExecSubmit1.getReceipt(client);
  console.log(
    `HC - ContractExecuteTransaction - deleteContract - status: ${contractExecRx1.status.toString()} \n`
  );
}

export async function contractSetBuyer(
  accountId,
  pvKey,
  contractId,
  buyerAccountId
) {
  const sellerId = AccountId.fromString(accountId);
  const sellerKey = PrivateKey.fromString(pvKey);
  const client = Client.forTestnet().setOperator(sellerId, sellerKey);

  // execute transaction
  const contractExecTx1 = await new ContractExecuteTransaction()
    .setContractId(contractId)
    .setGas(3000000)
    .setFunction(
      "setBuyer",
      new ContractFunctionParameters().addAddress(
        AccountId.fromString(buyerAccountId).toSolidityAddress()
      )
    )
    .freezeWith(client);

  const contractExecSign1 = await contractExecTx1.sign(sellerKey);
  const contractExecSubmit1 = await contractExecSign1.execute(client);
  const contractExecRx1 = await contractExecSubmit1.getReceipt(client);
  console.log(
    `HC - ContractExecuteTransaction - setBuyer - status: ${contractExecRx1.status.toString()} \n`
  );
}

export async function contractConfirmPurchase(
  accountId,
  pvKey,
  contractId,
  amount,
  buyDate
) {
  const sellerId = AccountId.fromString(accountId);
  const sellerKey = PrivateKey.fromString(pvKey);
  const client = Client.forTestnet().setOperator(sellerId, sellerKey);

  // execute transaction
  const contractExecTx1 = await new ContractExecuteTransaction()
    .setContractId(contractId)
    .setGas(3000000)
    .setPayableAmount(Hbar.fromTinybars(amount))
    .setFunction(
      "confirmPurchase",
      new ContractFunctionParameters().addUint256(buyDate)
    )
    .freezeWith(client);
  const contractExecSign1 = await contractExecTx1.sign(sellerKey);
  const contractExecSubmit1 = await contractExecSign1.execute(client);
  const contractExecRx1 = await contractExecSubmit1.getReceipt(client);
  console.log(
    `HC - ContractExecuteTransaction - confirmPurchase - status: ${contractExecRx1.status.toString()} \n`
  );
}

export async function contractTransferOwnership(
  accountId,
  pvKey,
  contractId,
  buyerAccountId,
  charityAccountId
) {
  const sellerId = AccountId.fromString(accountId);
  const sellerKey = PrivateKey.fromString(pvKey);
  const client = Client.forTestnet().setOperator(sellerId, sellerKey);

  // execute transaction
  const contractExecTx1 = await new ContractExecuteTransaction()
    .setContractId(contractId)
    .setGas(3000000)
    .setFunction(
      "transferOwnership",
      new ContractFunctionParameters()
        .addAddress(AccountId.fromString(buyerAccountId).toSolidityAddress())
        .addAddress(AccountId.fromString(charityAccountId).toSolidityAddress())
    )
    .freezeWith(client);

  const contractExecSign1 = await contractExecTx1.sign(sellerKey);
  const contractExecSubmit1 = await contractExecSign1.execute(client);
  const contractExecRx1 = await contractExecSubmit1.getReceipt(client);
  console.log(
    `HC - ContractExecuteTransaction - transferOwnership - status: ${contractExecRx1.status.toString()} \n`
  );
}

export async function contractCollect(accountId, pvKey, contractId) {
  const sellerId = AccountId.fromString(accountId);
  const sellerKey = PrivateKey.fromString(pvKey);
  const client = Client.forTestnet().setOperator(sellerId, sellerKey);

  // execute transaction
  const contractExecTx1 = await new ContractExecuteTransaction()
    .setContractId(contractId)
    .setGas(3000000)
    .setFunction("collect")
    .freezeWith(client);

  const contractExecSign1 = await contractExecTx1.sign(sellerKey);
  const contractExecSubmit1 = await contractExecSign1.execute(client);
  const contractExecRx1 = await contractExecSubmit1.getReceipt(client);
  console.log(
    `HC - ContractExecuteTransaction - collect - status: ${contractExecRx1.status.toString()} \n`
  );
}

export async function contractDonate(accountId, pvKey, contractId, charityId) {
  const sellerId = AccountId.fromString(accountId);
  const sellerKey = PrivateKey.fromString(pvKey);
  const client = Client.forTestnet().setOperator(sellerId, sellerKey);

  // execute transaction
  const contractExecTx1 = await new ContractExecuteTransaction()
    .setContractId(contractId)
    .setGas(3000000)
    .setFunction(
      "donate",
      new ContractFunctionParameters().addAddress(
        AccountId.fromString(charityId).toSolidityAddress()
      )
    )
    .freezeWith(client);

  const contractExecSign1 = await contractExecTx1.sign(sellerKey);
  const contractExecSubmit1 = await contractExecSign1.execute(client);
  const contractExecRx1 = await contractExecSubmit1.getReceipt(client);
  console.log(
    `HC - ContractExecuteTransaction - donate - status: ${contractExecRx1.status.toString()} \n`
  );
}

export async function contractGetter(
  accountId,
  pvKey,
  contractId,
  functionName,
  returnType
) {
  const sellerId = AccountId.fromString(accountId);
  const sellerKey = PrivateKey.fromString(pvKey);
  const client = Client.forTestnet().setOperator(sellerId, sellerKey);

  const contractQueryTx = new ContractCallQuery()
    .setContractId(contractId)
    .setGas(200000)
    .setFunction(functionName)
    .setQueryPayment(new Hbar(2));
  const contractQuerySubmit = await contractQueryTx.execute(client);

  let result = 0;

  if (returnType === "uint8") {
    result = contractQuerySubmit.getUint8(0);
  } else if (returnType === "uint32") {
    result = contractQuerySubmit.getUint32(0);
  } else if (returnType === "uint256") {
    result = contractQuerySubmit.getUint256(0);
  } else if (returnType === "string") {
    result = contractQuerySubmit.getString(0);
  } else if (returnType === "address") {
    result = contractQuerySubmit.getAddress(0);
    result = AccountId.fromSolidityAddress(result).toString();
  }

  console.log(
    `- HC - ContractCallQuery - ${functionName} - result: ${result} \n`
  );
  return result;
}
