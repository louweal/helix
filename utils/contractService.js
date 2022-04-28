
const {
    Client,
    AccountId,
    PrivateKey,
    TokenCreateTransaction,
    FileCreateTransaction,
    FileAppendTransaction,
    ContractCreateTransaction,
    ContractFunctionParameters,
    TokenUpdateTransaction,
    ContractExecuteTransaction,
    TokenInfoQuery,
    AccountBalanceQuery,
    Hbar,
} = require("@hashgraph/sdk");
// const fs = require("fs");

// console.log($store.currentAccount.accountId);

const operatorId = AccountId.fromString(process.env.MY_ACCOUNT_ID);
const operatorKey = PrivateKey.fromString(process.env.MY_PRIVATE_KEY);
const treasuryId = AccountId.fromString(process.env.MY_ACCOUNT_ID);
const treasuryKey = PrivateKey.fromString(process.env.MY_PRIVATE_KEY);
const aliceId = AccountId.fromString(process.env.JANES_ID);
const aliceyKey = PrivateKey.fromString(process.env.JANES_PVKEY);

const client = Client.forTestnet().setOperator(operatorId, operatorKey);

export async function contractCreate(token) {
    // STEP 2 ===================================
    console.log(`STEP 1 ===================================`);
    const htsContract = require("./HTS.json");

    const bytecode = htsContract.data.bytecode.object;

    //Create a file on Hedera and store the hex-encoded bytecode
    const fileCreateTx = new FileCreateTransaction()
        .setContents(bytecode);

    //Submit the file to the Hedera test network signing with the transaction fee payer key specified with the client
    const submitTx = await fileCreateTx.execute(client);

    //Get the receipt of the file create transaction
    const fileReceipt = await submitTx.getReceipt(client);

    //Get the file ID from the receipt
    const bytecodeFileId = fileReceipt.fileId;

    //Log the file ID
    console.log("The smart contract bytecode file ID is " + bytecodeFileId)

    // STEP 3 ===================================
    //Deploy the contract instance
    const contractTx = await new ContractCreateTransaction()
        //The bytecode file ID
        .setBytecodeFileId(bytecodeFileId)
        //The max gas to reserve
        .setGas(2000000);

    //Submit the transaction to the Hedera test network
    const contractResponse = await contractTx.execute(client);

    //Get the receipt of the file create transaction
    const contractReceipt = await contractResponse.getReceipt(client);

    //Get the smart contract ID
    const newContractId = contractReceipt.contractId;

    //Log the smart contract ID
    console.log("The smart contract ID is " + newContractId);

}