// for testing

require("dotenv").config();

const {
  Client,
  AccountId,
  PrivateKey,
  ContractId,
  ContractExecuteTransaction,
  ContractFunctionParameters,
  ContractInfoQuery,
  ContractCallQuery,
  Hbar,
} = require("@hashgraph/sdk");

const operatorId = AccountId.fromString(process.env.MY_ACCOUNT_ID);
const operatorKey = PrivateKey.fromString(process.env.MY_PRIVATE_KEY);

const client = Client.forTestnet().setOperator(operatorId, operatorKey);

async function main() {
  let contractId = "0.0.34402364"; //"0.0.34402364"

  //Create the query
  // const query = new ContractInfoQuery().setContractId(contractId);

  // //Sign the query with the client operator private key and submit to a Hedera network
  // const info = await query.execute(client);

  // console.log(info);

  /// more testing

  // real warehouse account id = 0.0.34174224
  // real itemcontract id = 0.0.34399726
  let accountId = "0.0.34174224";
  let itemContractId = "0.0.34399726";

  console.log(AccountId.fromString(accountId).toSolidityAddress());

  console.log(ContractId.fromString(itemContractId).toSolidityAddress());

  // Add contract to lookup
  // const contractExecuteTx = new ContractExecuteTransaction()
  //   .setContractId(contractId)
  //   .setGas(100000)
  //   .setFunction(
  //     "addContract",
  //     new ContractFunctionParameters()
  //       .addAddress(AccountId.fromString(accountId).toSolidityAddress())
  //       .addAddress(ContractId.fromString(itemContractId).toSolidityAddress())
  //   );
  // const contractExecuteSubmit = await contractExecuteTx.execute(client);
  // const contractExecuteRx = await contractExecuteSubmit.getReceipt(client);
  // console.log(
  //   `- Contract function call status: ${contractExecuteRx.status} \n`
  // );

  // todo: loop / while

  // Then getContract

  let i = 0;
  while (i < 1024) {
    try {
      const contractQueryTx = new ContractCallQuery()
        .setContractId(contractId)
        .setGas(100000)
        .setFunction(
          "getContract",
          new ContractFunctionParameters()
            .addAddress(AccountId.fromString(accountId).toSolidityAddress())
            .addUint32(i)
        );
      const contractQuerySubmit = await contractQueryTx.execute(client);
      const contractQueryResult = contractQuerySubmit.getAddress(0);
      console.log(
        `- The contractAddress at index ${i} is ${contractQueryResult} \n`
      );
    } catch (error) {
      console.log("Done");
      break;
      // console.error(error);
    }
    i += 1;
  }
}

main();
