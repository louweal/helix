const {
  Client,
  AccountBalanceQuery,
  Hbar,
  TransferTransaction,
} = require("@hashgraph/sdk");
require("dotenv").config();

async function main() {
  //Grab your Hedera testnet account ID and private key from your .env file
  const myAccountId = process.env.MY_ACCOUNT_ID;
  const myPrivateKey = process.env.MY_PRIVATE_KEY;

  // If we weren't able to grab it, we should throw a new error
  if (myAccountId == null || myPrivateKey == null) {
    throw new Error(
      "Environment variables myAccountId and myPrivateKey must be present"
    );
  }

  // Create our connection to the Hedera network
  const client = Client.forTestnet().setOperator(myAccountId, myPrivateKey);

  const newAccountId = "0.0.4010152"; //process.env.ALICES_ID;

  //Verify the account balance
  const accountBalance = await new AccountBalanceQuery()
    .setAccountId(newAccountId)
    .execute(client);

  console.log(
    "The current account balance is: " +
      accountBalance.hbars.toTinybars() +
      " tinybar."
  );

  //Create the transfer transaction
  const sendHbar = await new TransferTransaction()
    .addHbarTransfer(myAccountId, new Hbar(-4000))
    .addHbarTransfer(newAccountId, new Hbar(4000))
    .execute(client);

  //Verify the transaction reached consensus
  const transactionReceipt = await sendHbar.getReceipt(client);
  console.log(
    "The transfer transaction from my account to the new account was: " +
      transactionReceipt.status.toString()
  );

  //Request the cost of the query
  const queryCost = await new AccountBalanceQuery()
    .setAccountId(newAccountId)
    .getCost(client);

  console.log("The cost of query is: " + queryCost);

  //Check the new account's balance
  const getNewBalance = await new AccountBalanceQuery()
    .setAccountId(newAccountId)
    .execute(client);

  console.log(
    "The account balance after the transfer is: " +
      getNewBalance.hbars +
      " hbar."
  );

  process.exit();
}
main();
