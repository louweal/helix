# Helix

Helix is a platform that helps the environment using the hedera smart contract service.
It was implemented with Vue, Nuxt, Solidity and the Hedera Smart Contract Service.
The project was submitted to the Hedera Hackathon 2022 on Devpost.

Demo website: [helix.codesparks.nl](https://helix.codesparks.nl)

## Setup

```
nvm use
npm install
```

### Set your varables in .env

```
MY_ACCOUNT_ID=your (testnet) account ID
MY_PRIVATE_KEY=your (testnet) private key
```

### Create a new lookup contract (optional)

```
node ./utils/createLookupContract.js
```

###### Set the lookup contract Id in .env

```
LOOKUP_CONTRACT=new lookup contract id
```

## Run in development mode

```
nvm use
npm run dev
```

## Or run in production mode

```
nvm use
npm run generate
npm run start
```

## Transfer HBARs

When neccesary, use the `hedera/transfer-hbars.js` script to transfer hbars from your testnet account to the demo accounts (DEMOSHOP, Alice and Bob)
