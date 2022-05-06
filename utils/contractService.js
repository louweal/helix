const {
  Client,
  AccountId,
  PrivateKey,
  ContractId,
  TokenId,
  FileCreateTransaction,
  FileAppendTransaction,
  ContractCreateTransaction,
  ContractFunctionParameters,
  ContractExecuteTransaction,
  ContractCallQuery,
  Hbar,
} = require("@hashgraph/sdk");

export async function contractCreate(
  accountId,
  pvKey,
  name,
  description,
  visual,
  category,
  productionCountry,
  materialDescription,
  duration,
  deposit,
  charity
) {
  console.log(description);
  console.log(visual);

  const operatorId = AccountId.fromString(process.env.MY_ACCOUNT_ID);
  const operatorKey = PrivateKey.fromString(process.env.MY_PRIVATE_KEY);

  const operatorClient = Client.forTestnet().setOperator(
    operatorId,
    operatorKey
  );

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
  console.log(`- The smart contract bytecode file ID is ${bytecodeFileId}`);

  // Append contents to the file
  const fileAppendTx = new FileAppendTransaction()
    .setFileId(bytecodeFileId)
    .setContents(bytecode)
    .setMaxChunks(20)
    .freezeWith(client);
  const fileAppendSign = await fileAppendTx.sign(sellerKey);
  const fileAppendSubmit = await fileAppendSign.execute(client);
  const fileAppendRx = await fileAppendSubmit.getReceipt(client);
  console.log(`- Content added: ${fileAppendRx.status} \n`);

  const contractTx = await new ContractCreateTransaction()
    .setBytecodeFileId(bytecodeFileId)
    .setConstructorParameters(
      new ContractFunctionParameters()
        .addString(name)
        .addString(description)
        .addUint32(visual)
        .addUint32(category)
        .addString(productionCountry)
        .addString(materialDescription)
        .addUint256(duration)
        .addUint256(deposit)
        .addAddress(AccountId.fromString(charity).toSolidityAddress())
    )
    .setGas(2000000);
  const contractResponse = await contractTx.execute(client);
  const contractReceipt = await contractResponse.getReceipt(client);
  const newContractId = await contractReceipt.contractId;
  console.log("The smart contract ID is " + newContractId);

  // add newContractId to lookup contract
  const contractExecuteTx = new ContractExecuteTransaction()
    .setContractId(process.env.LOOKUP_CONTRACT)
    .setGas(100000)
    .setFunction(
      "addContract",
      new ContractFunctionParameters()
        .addAddress(AccountId.fromString(accountId).toSolidityAddress())
        .addAddress(ContractId.fromString(newContractId).toSolidityAddress())
    );
  const contractExecuteSubmit = await contractExecuteTx.execute(operatorClient);
  const contractExecuteRx = await contractExecuteSubmit.getReceipt(
    operatorClient
  );
  console.log(
    `- Contract function call status: ${contractExecuteRx.status} \n`
  );

  return newContractId;
}

export async function contractSetBuyer(buyerAccountId) {
  // todo
}

export async function getMyContracts(accountId, pvKey) {
  console.log(process.env.MY_ACCOUNT_ID);
  console.log(process.env.MY_PRIVATE_KEY);

  const operatorId = AccountId.fromString(process.env.MY_ACCOUNT_ID);
  const operatorKey = PrivateKey.fromString(process.env.MY_PRIVATE_KEY);

  const operatorClient = Client.forTestnet().setOperator(
    operatorId,
    operatorKey
  );

  const sellerId = AccountId.fromString(accountId);
  const sellerKey = PrivateKey.fromString(pvKey);

  const client = Client.forTestnet().setOperator(sellerId, sellerKey);

  let lookupContractId = process.env.LOOKUP_CONTRACT;

  let myContracts = [];

  let i = 0;
  while (i < 1024) {
    try {
      const contractQueryTx = new ContractCallQuery()
        .setContractId(lookupContractId)
        .setGas(100000)
        .setFunction(
          "getContract",
          new ContractFunctionParameters()
            .addAddress(AccountId.fromString(accountId).toSolidityAddress())
            .addUint32(i)
        );
      const contractQuerySubmit = await contractQueryTx.execute(operatorClient);
      const contractQueryResult = contractQuerySubmit.getAddress(0);

      // console.log("the result: " + contractQueryResult);

      const contractId = ContractId.fromSolidityAddress(contractQueryResult); // ?
      console.log(`- The contractAddress at index ${i} is ${contractId} \n`);

      // get values from contract
      const name = await getter(client, contractId, "getName", "string");
      const description = await getter(
        client,
        contractId,
        "getDescription",
        "string"
      );
      const visual = await getter(client, contractId, "getVisual", "uint32");
      const deposit = await getter(client, contractId, "getDeposit", "uint256");

      // console.log("the visual is: " + visual);
      // console.log(visual);

      myContracts.push({
        ID: contractId,
        seller: accountId,
        visual: visual,
        name: name,
        description: description,
        deposit: deposit.toString(),
      });
    } catch (error) {
      // console.log(error);
      console.log("Done");
      break;
      // console.error(error);
    }
    i += 1;
  }

  // console.log(myContracts);
  return myContracts;
}

// helper functions

async function getter(client, contractId, functionName, returnType) {
  const contractQueryTx = await new ContractCallQuery()
    .setContractId(contractId)
    .setGas(100000)
    .setFunction(functionName)
    .setQueryPayment(new Hbar(2));
  const contractQuerySubmit = await contractQueryTx.execute(client);

  if (returnType === "uint32") {
    return await contractQuerySubmit.getUint32(0);
  }
  if (returnType === "uint256") {
    return await contractQuerySubmit.getUint256(0);
  }
  if (returnType === "string") {
    return await contractQuerySubmit.getString(0);
  }
}
