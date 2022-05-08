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

export async function contractCreate(accountId, pvKey, data) {
  const staticData = {
    name: data.name,
    visual: data.visual,
    category: data.category,
    deposit: data.deposit,
    description: data.description,
    productionCountry: data.productionCountry,
    materialDescription: data.materialDescription,
  };
  // console.log(data);

  const staticDataStr = encodeData(staticData);

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
        .addString(staticDataStr)
        .addUint256(data.duration)
        .addUint256(data.deposit)
        .addAddress(AccountId.fromString(data.charity).toSolidityAddress())
    )
    .setGas(4000000);
  const contractResponse = await contractTx.execute(client);
  const contractReceipt = await contractResponse.getReceipt(client);
  const newContractId = await contractReceipt.contractId;
  console.log("The smart contract ID is " + newContractId);

  // add newContractId to lookup contract
  const operatorId = AccountId.fromString(process.env.MY_ACCOUNT_ID);
  const operatorKey = PrivateKey.fromString(process.env.MY_PRIVATE_KEY);
  const operatorClient = Client.forTestnet().setOperator(
    operatorId,
    operatorKey
  );

  await addContract(operatorClient, accountId, newContractId);

  // Run query to find the index of the new contract in the list

  const index = await getContractIndex(operatorClient, accountId);
  console.log(index);

  return { contractId: newContractId, index: index };
}

export async function contractSetBuyer(
  accountId,
  pvKey,
  contractId,
  index,
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
    `- Contract association with the buyers's account: ${contractExecRx1.status.toString()} \n`
  );

  // add contract to lookup list buyer
  const operatorId = AccountId.fromString(process.env.MY_ACCOUNT_ID);
  const operatorKey = PrivateKey.fromString(process.env.MY_PRIVATE_KEY);
  const operatorClient = Client.forTestnet().setOperator(
    operatorId,
    operatorKey
  );

  // update lookup contract 1: add to buyer list: addContract
  await addContract(operatorClient, buyerAccountId, contractId);

  // Run query to find the index of the new contract in the list

  const newIndex = await getContractIndex(operatorClient, buyerAccountId);
  console.log(newIndex); // todo: return it and update it in the store

  // delete contract from seller lookup list
  deleteContract(operatorClient, sellerId, index);
}

async function getContractIndex(client, accountId) {
  const contractQueryTx = new ContractCallQuery()
    .setContractId(process.env.LOOKUP_CONTRACT)
    .setGas(100000)
    .setFunction(
      "getNumContracts",
      new ContractFunctionParameters().addAddress(
        AccountId.fromString(accountId).toSolidityAddress()
      )
    );
  const contractQuerySubmit = await contractQueryTx.execute(client);
  const contractQueryResult = contractQuerySubmit.getUint32(0);

  return contractQueryResult - 1;
}

async function addContract(client, accountId, contractId) {
  const contractExecuteTx = new ContractExecuteTransaction()
    .setContractId(process.env.LOOKUP_CONTRACT)
    .setGas(100000)
    .setFunction(
      "addContract",
      new ContractFunctionParameters()
        .addAddress(AccountId.fromString(accountId).toSolidityAddress())
        .addAddress(ContractId.fromString(contractId).toSolidityAddress())
    );
  const contractExecuteSubmit = await contractExecuteTx.execute(client);
  const contractExecuteRx = await contractExecuteSubmit.getReceipt(client);
  console.log(`- addContract call status: ${contractExecuteRx.status} \n`);
}

async function deleteContract(client, accountId, index) {
  const contractExecuteTx = new ContractExecuteTransaction()
    .setContractId(process.env.LOOKUP_CONTRACT)
    .setGas(40000)
    .setFunction(
      "deleteContract",
      new ContractFunctionParameters()
        .addAddress(AccountId.fromString(accountId).toSolidityAddress())
        .addUint32(index)
    );
  const contractExecuteSubmit = await contractExecuteTx.execute(client);
  const contractExecuteRx = await contractExecuteSubmit.getReceipt(client);
  console.log(
    `ExecuteTransaction - deleteContract - status: ${contractExecuteRx.status} \n`
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
    `- confirmPurchase call status: ${contractExecRx1.status.toString()} \n`
  );
}

export async function getMyContracts(accountId, pvKey) {
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
        .setGas(400000)
        .setFunction(
          "getContract",
          new ContractFunctionParameters()
            .addAddress(AccountId.fromString(accountId).toSolidityAddress())
            .addUint32(i)
        );
      const contractQuerySubmit = await contractQueryTx.execute(operatorClient);
      const contractQueryResult = contractQuerySubmit.getAddress(0);

      const contractId = ContractId.fromSolidityAddress(contractQueryResult); // ?
      console.log(`- The contractAddress at index ${i} is ${contractId} \n`);

      // get values from contract
      const state = await getter(client, contractId, "getState", "uint8");
      const prevOwner = await getter(
        client,
        contractId,
        "getPrevOwner",
        "address"
      );
      const charity = await getter(
        client,
        contractId,
        "getCharityAddress",
        "address"
      );
      const encodedS = await getter(client, contractId, "getStatic", "string");
      const date = await getter(client, contractId, "getDate", "uint32");
      const duration = await getter(
        client,
        contractId,
        "getDuration",
        "uint256"
      );
      const s = decodeData(encodedS);

      console.log("prevOwner:", prevOwner);
      console.log("date:", date);

      console.log(s);

      myContracts.push({
        ID: contractId.toString(),
        startdate: parseInt((Date.now() / 1000 - date) / 86400),
        duration: +duration,
        state: state,
        store: accountId,
        seller: AccountId.fromSolidityAddress(prevOwner).toString(),
        owner: accountId,
        category: +s.category,
        visual: +s.visual,
        name: s.name,
        description: s.description,
        materialDescription: s.materialDescription,
        productionCountry: s.productionCountry,
        deposit: +s.deposit,
        charity: AccountId.fromSolidityAddress(charity).toString(),
      });
    } catch (error) {
      console.log(error);
      console.log("Done");
      break;
    }
    i += 1;
  }

  // console.log(myContracts);
  return myContracts;
}

// helper functions

async function getter(client, contractId, functionName, returnType) {
  const contractQueryTx = new ContractCallQuery()
    .setContractId(contractId)
    .setGas(200000)
    .setFunction(functionName)
    .setQueryPayment(new Hbar(2));
  const contractQuerySubmit = await contractQueryTx.execute(client);

  if (returnType === "uint8") {
    return contractQuerySubmit.getUint8(0);
  }
  if (returnType === "uint32") {
    return contractQuerySubmit.getUint32(0);
  }
  if (returnType === "uint256") {
    return contractQuerySubmit.getUint256(0);
  }
  if (returnType === "string") {
    return contractQuerySubmit.getString(0);
  }
  if (returnType === "address") {
    return contractQuerySubmit.getAddress(0);
  }
}

function encodeData(data) {
  let str = "";
  let numProps = Object.keys(data).length;
  let i = 0;
  for (let prop in data) {
    str = str.concat(data[prop]);
    if (i < numProps - 1) {
      str = str.concat(":|:");
    }
    i += 1;
  }
  return str;
}

function decodeData(str) {
  let obj = {};
  let props = str.split(":|:");

  obj["name"] = props[0];
  obj["visual"] = +props[1];
  obj["category"] = +props[2];
  obj["deposit"] = +props[3];
  obj["description"] = props[4];
  obj["productionCountry"] = props[5];
  obj["materialDescription"] = props[6];
  return obj;
}
