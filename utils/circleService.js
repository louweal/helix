/**
 * See installation instructions at
 * https://developers.circle.com/developer/docs/circle-sdk
 */
// import {
//   Circle,
//   CircleEnvironments,
//   PaymentIntentCreationRequest,
// } from "@circle-fin/circle-sdk";
// import crypto from "crypto";

const { Circle, CircleEnvironments } = require("@circle-fin/circle-sdk");
const crypto = require("crypto");

// import {
//   Circle,
//   CircleEnvironments,
//   SubscriptionRequest,
// } from "@circle-fin/circle-sdk";

const circle = new Circle(
  "QVBJX0tFWTplMjYxZmUwOTNiYzFmY2QxZjExZmU1NmRlOTY3MjY0ZDo1M2M4Zjg1YjZmOTIxYThjOTg5ZWQ5YTRiYjBkMzNjMA==",
  CircleEnvironments.sandbox // API base url
);

// async function createCryptoPayment() {
//   const reqBody = {
//     amount: {
//       amount: "1.00",
//       currency: "USD",
//     },
//     settlementCurrency: "USD",
//     paymentMethods: [
//       {
//         type: "blockchain",
//         chain: "ETH",
//       },
//     ],
//     idempotencyKey: crypto.randomUUID(),
//   };
//   const resp = await circle.cryptoPaymentIntents.createPaymentIntent(reqBody);
//   console.log(resp.data);
// }
// createCryptoPayment();

// async function createSubscription() {
//   const subscribeReq: SubscriptionRequest = {
//     endpoint: "https://example.org/handler/for/notifications",
//   };

//   const subscribeResp = await circle.subscriptions.createSubscription(
//     subscribeReq
//   );
//   console.log(subscribeResp.data);
// }
// createSubscription();

async function listBalances() {
  const balancesRes = await circle.balances.listBalances();
  return balancesRes.data.data;
}

async function listPayments() {
  const resp = await circle.payments.listPayments();
  // console.log(resp.data[0].amount);
  return resp.data.data;
}

async function main() {
  // let data = await listPayments();
  let data = await listBalances();

  console.log(data);

  // let test = data.forEach((i) => i.amount);
  // console.log(test);
}

main();
