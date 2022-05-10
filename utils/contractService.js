const {
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
} = require("@hashgraph/sdk");

export async function contractCreate(accountId, pvKey, data, staticDataStr) {
  const sellerId = AccountId.fromString(accountId);
  const sellerKey = PrivateKey.fromString(pvKey);
  const client = Client.forTestnet().setOperator(sellerId, sellerKey);

  const htsContract = require("./Contract.json");
  const bytecode = htsContract.data.bytecode.object;

  const fileCreateTx = new FileCreateTransaction()
    .setKeys([sellerKey])
    .freezeWith(client);
  const fileCreateSign = await fileCreateTx.sign(sellerKey);
  const fileCreateSubmit = await fileCreateSign.execute(client);
  const fileCreateRx = await fileCreateSubmit.getReceipt(client);
  const bytecodeFileId = fileCreateRx.fileId;
  // console.log(`- The smart contract bytecode file ID is ${bytecodeFileId}`);

  // Append contents to the file
  const fileAppendTx = new FileAppendTransaction()
    .setFileId(bytecodeFileId)
    .setContents(bytecode)
    .setMaxChunks(20)
    .freezeWith(client);
  const fileAppendSign = await fileAppendTx.sign(sellerKey);
  const fileAppendSubmit = await fileAppendSign.execute(client);
  const fileAppendRx = await fileAppendSubmit.getReceipt(client);
  console.log(`FileAppendTransaction - status: ${fileAppendRx.status} \n`);

  const contractTx = await new ContractCreateTransaction()
    .setBytecodeFileId(bytecodeFileId)
    .setConstructorParameters(
      new ContractFunctionParameters()
        .addString(staticDataStr)
        .addUint256(data.duration)
        .addUint256(data.deposit)
        .addAddress(AccountId.fromString(data.charity).toSolidityAddress())
    )
    .setGas(4000000);
  const contractResponse = await contractTx.execute(client);
  const contractReceipt = await contractResponse.getReceipt(client);
  const newContractId = await contractReceipt.contractId;
  console.log("ContractCreateTransaction - result: " + newContractId);

  return newContractId;
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
    `ContractExecuteTransaction - deleteCreatedContract - status: ${contractExecRx1.status.toString()} \n`
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
    .setFunction("deleteContract", new ContractFunctionParameters()
      .addAddress(AccountId.fromString(charityAccountId).toSolidityAddress())
    )
    .freezeWith(client);
  const contractExecSign1 = await contractExecTx1.sign(sellerKey);
  const contractExecSubmit1 = await contractExecSign1.execute(client);
  const contractExecRx1 = await contractExecSubmit1.getReceipt(client);
  console.log(
    `ContractExecuteTransaction - deleteContract - status: ${contractExecRx1.status.toString()} \n`
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
    `ContractExecuteTransaction - setBuyer - status: ${contractExecRx1.status.toString()} \n`
  );
}

export async function contractConfirmPurchase(
  accountId,
  pvKey,
  contractId,
  deposit,
  buyDate
) {
  const sellerId = AccountId.fromString(accountId);
  const sellerKey = PrivateKey.fromString(pvKey);
  const client = Client.forTestnet().setOperator(sellerId, sellerKey);

  // execute transaction
  const contractExecTx1 = await new ContractExecuteTransaction()
    .setContractId(contractId)
    .setGas(3000000)
    .setPayableAmount(Hbar.fromTinybars(deposit))
    .setFunction(
      "confirmPurchase",
      new ContractFunctionParameters().addUint256(buyDate)
    )
    .freezeWith(client);
  const contractExecSign1 = await contractExecTx1.sign(sellerKey);
  const contractExecSubmit1 = await contractExecSign1.execute(client);
  const contractExecRx1 = await contractExecSubmit1.getReceipt(client);
  console.log(
    `ContractExecuteTransaction - confirmPurchase - status: ${contractExecRx1.status.toString()} \n`
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
    `ContractExecuteTransaction - transferOwnership - status: ${contractExecRx1.status.toString()} \n`
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
    `- - - ContractCallQuery - ${functionName} - result: ${result} \n`
  );
  return result;
}
