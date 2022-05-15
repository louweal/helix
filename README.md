# Helix

## Setup

```
nvm use
npm install
```

### Set your varables in .env

MY_ACCOUNT_ID=your (testnet) account ID
MY_PRIVATE_KEY=your (testnet) private key

### Create a new lookup contract (optional)

```
node ./utils/createLookupContract.js
```

###### Set the lookup contract Id in .env

LOOKUP_CONTRACT=new lookup contract id

## Development

```
nvm use
npm run dev
```

## Production

```
nvm use
npm run generate
npm run start
```
