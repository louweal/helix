console.clear();
require("dotenv").config();
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
const fs = require("fs");

console.log("hello");