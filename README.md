# Helix

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
