const fs = require("fs");
const solc = require("solc");

var input = {
    'HelloHedera.sol': fs.readFileSync('HelloHedera.sol', 'utf8')
};
let compiledContract = solc.compile({ sources: input }, 1);

console.log(compiledContract);