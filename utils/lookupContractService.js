const {
  Client,
  AccountId,
  PrivateKey,
  ContractId,
  ContractFunctionParameters,
  ContractExecuteTransaction,
  ContractCallQuery,
} = require("@hashgraph/sdk");

const operatorId = AccountId.fromString(process.env.MY_ACCOUNT_ID);
const operatorKey = PrivateKey.fromString(process.env.MY_PRIVATE_KEY);
const client = Client.forTestnet().setOperator(operatorId, operatorKey);

export async function lookupContractRemoveContract(accountId, index) {
  const contractExecuteTx = new ContractExecuteTransaction()
    .setContractId(process.env.LOOKUP_CONTRACT)
    .setGas(100000)
    .setFunction(
      "deleteContract",
      new ContractFunctionParameters()
        .addAddress(AccountId.fromString(accountId).toSolidityAddress())
        .addUint32(index)
    );
  const contractExecuteSubmit = await contractExecuteTx.execute(client);
  const contractExecuteRx = await contractExecuteSubmit.getReceipt(client);
  console.log(
    `LC - ContractExecuteTransaction - deleteContract - status: ${contractExecuteRx.status} \n`
  );
}

export async function lookupContractAddContract(accountId, contractId) {
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
  console.log(
    `LC - ContractExecuteTransaction - addContract - status: ${contractExecuteRx.status} \n`
  );
}

export async function lookupContractDeleteContract(accountId, index) {
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
    `LC - ExecuteTransaction - deleteContract - status: ${contractExecuteRx.status} \n`
  );
}

export async function lookupContractGetNumContracts(accountId) {
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

  console.log(
    `LC - ContractCallQuery - getNumContracts - result: ${contractQueryResult}`
  );

  return contractQueryResult;
}

export async function lookupContractGetContractIndex(accountId) {
  const numContracts = await lookupContractGetNumContracts(accountId);
  return numContracts - 1;
}

export async function lookupContractGetContract(accountId, index) {
  const contractQueryTx = new ContractCallQuery()
    .setContractId(process.env.LOOKUP_CONTRACT)
    .setGas(400000)
    .setFunction(
      "getContract",
      new ContractFunctionParameters()
        .addAddress(AccountId.fromString(accountId).toSolidityAddress())
        .addUint32(index)
    );
  const contractQuerySubmit = await contractQueryTx.execute(client);
  const contractQueryResult = contractQuerySubmit.getAddress(0);

  const contractId = ContractId.fromSolidityAddress(contractQueryResult); // ?
  console.log(
    `LC - ${index} - ContractCallQuery - getContract - result: ${contractId} \n`
  );
  return contractId;
}
