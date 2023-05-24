require("dotenv").config();

var fs = require("fs");

const {
  Client,
  AccountId,
  PrivateKey,
  ContractCreateFlow,
  FileCreateTransaction,
  FileAppendTransaction,
  ContractCreateTransaction,
} = require("@hashgraph/sdk");

async function main() {
  const operatorId = AccountId.fromString(process.env.MY_ACCOUNT_ID);
  const operatorKey = PrivateKey.fromString(process.env.MY_PRIVATE_KEY);

  const client = Client.forTestnet().setOperator(operatorId, operatorKey);

  // const htsContract = require("./contracts/DepositFactory.json");

  // const bytecode = htsContract.data.bytecode.object;

  const contractName = "DepositFactory";

  const bytecode = fs.readFileSync(
    `./utils/contracts/${contractName}_sol_${contractName}.bin`
  );

  const createContract = new ContractCreateFlow()
    .setGas(150000) // Increase if revert
    .setBytecode(bytecode); // Contract bytecode
  const createContractTx = await createContract.execute(client);
  const createContractRx = await createContractTx.getReceipt(client);
  const contractId = createContractRx.contractId;

  console.log(`Contract created with ID: ${contractId}`);

  process.exit();
}

main();
