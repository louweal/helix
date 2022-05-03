const {
  Client,
  AccountId,
  PrivateKey,
  FileCreateTransaction,
  FileAppendTransaction,
  ContractCreateTransaction,
  ContractFunctionParameters,
  ContractExecuteTransaction,
  AccountBalanceQuery,
  Hbar,
} = require("@hashgraph/sdk");

export async function contractCreate(
  accountId,
  pvKey,
  name,
  duration,
  deposit,
  charity
) {
  console.log("the accountId is: " + accountId);
  const operatorId = AccountId.fromString(accountId);
  const operatorKey = PrivateKey.fromString(pvKey);
  //   const treasuryId = AccountId.fromString(accountId);
  const treasuryKey = PrivateKey.fromString(pvKey);

  const client = Client.forTestnet().setOperator(operatorId, operatorKey);

  const htsContract = require("./Contract.json");
  const bytecode = htsContract.data.bytecode.object;

  const fileCreateTx = new FileCreateTransaction()
    .setKeys([treasuryKey])
    .freezeWith(client);
  const fileCreateSign = await fileCreateTx.sign(treasuryKey);
  const fileCreateSubmit = await fileCreateSign.execute(client);
  const fileCreateRx = await fileCreateSubmit.getReceipt(client);
  const bytecodeFileId = fileCreateRx.fileId;
  console.log(`- The smart contract bytecode file ID is ${bytecodeFileId}`);

  // Append contents to the file
  const fileAppendTx = new FileAppendTransaction()
    .setFileId(bytecodeFileId)
    .setContents(bytecode)
    .setMaxChunks(10)
    .freezeWith(client);
  const fileAppendSign = await fileAppendTx.sign(treasuryKey);
  const fileAppendSubmit = await fileAppendSign.execute(client);
  const fileAppendRx = await fileAppendSubmit.getReceipt(client);
  console.log(`- Content added: ${fileAppendRx.status} \n`);

  //Deploy the contract instance

  // add here .setConstructorParameters(new ContractFunctionParameters().addString("Alice").addUint256(111111));
  //    .setInitialBalance(new Hbar(initialBalance))
  const contractTx = await new ContractCreateTransaction()
    .setBytecodeFileId(bytecodeFileId)
    .setConstructorParameters(
      new ContractFunctionParameters()
        .addString(name)
        .addUint256(duration)
        .addUint256(deposit)
        .addUint256(duration)
        .addAddress(charity.toSolidityAddress())
    )
    .setGas(2000000);
  const contractResponse = await contractTx.execute(client);
  const contractReceipt = await contractResponse.getReceipt(client);
  const newContractId = await contractReceipt.contractId;
  console.log("The smart contract ID is " + newContractId);

  return newContractId;
}

export async function contractSetBuyer(buyerAccountId) {
  // todo
}
