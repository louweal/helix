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
} = require("@hashgraph/sdk");

export async function contractCreate(metadata, lifespan, deposit, date) {
  let network = process.env.HEDERA_NETWORK || "testnet";
  let topic = Vue.prototype.$hashconnect.hcData.topic;
  let accountId =
    Vue.prototype.$hashconnect.hcData.pairingData[0].accountIds[0];

  let provider = Vue.prototype.$hashconnect.getProvider(
    network,
    topic,
    accountId
  );

  let signer = Vue.prototype.$hashconnect.getSigner(provider);

  const htsContract = require("./Helix.json");
  const bytecode = htsContract.data.bytecode.object;

  const fileCreateTx = new FileCreateTransaction()
    .setContents(bytecode)
    .setMaxTransactionFee(new Hbar(2));

  const fileCreateFreeze = await fileCreateTx.freezeWithSigner(signer);

  console.log(fileCreateFreeze);

  const fileCreateSign = await fileCreateFreeze.signWithSigner(signer); // fileCreateTx.signWithSigner is not a function
  const txCreateResponse = await fileCreateSign.executeWithSigner(signer);

  const fileCreateRx = await provider.getTransactionReceipt(
    txCreateResponse.transactionId
  );
  const bytecodeFileId = fileCreateRx.fileId;
  console.log(`- The smart contract bytecode file ID is: ${bytecodeFileId}`);

  return;
  // const sellerId = AccountId.fromString(accountId);
  // const sellerKey = PrivateKey.fromString(pvKey);
  // const client = Client.forTestnet().setOperator(sellerId, sellerKey);

  // const fileCreateRx = await fileCreateSubmit.getReceipt(client);
  // const bytecodeFileId = fileCreateRx.fileId;
  // console.log(`- The smart contract bytecode file ID is ${bytecodeFileId}`);

  // Append contents to the file
  // const fileAppendTx = new FileAppendTransaction()
  //   .setFileId(bytecodeFileId)
  //   .setContents(bytecode)
  //   .setMaxChunks(20)
  //   .freezeWithSigner(this.signer);

  // const fileAppendSubmit = await fileAppendTx.executeWithSigner(signer);
  // const fileAppendRx = await fileAppendSubmit.getReceipt(client);
  // console.log(`FileAppendTransaction - status: ${fileAppendRx.status} \n`);

  // const contractTx = await new ContractCreateTransaction()
  //   .setBytecodeFileId(bytecodeFileId)
  //   .setConstructorParameters(
  //     new ContractFunctionParameters()
  //       .addString(metadata)
  //       .addUint256(lifespan)
  //       .addUint256(deposit)
  //       .addUint256(date)
  //   )
  //   .setGas(4000000);
  // const contractResponse = await contractTx.execute(client);
  // const contractReceipt = await contractResponse.getReceipt(client);
  // const newContractId = await contractReceipt.contractId;
  // console.log("HC - ContractCreateTransaction - result: " + newContractId);

  // return newContractId;
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
