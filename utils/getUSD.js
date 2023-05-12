export default async function getUSD(currency = "HBAR") {
  let response = await fetch(
    `https://min-api.cryptocompare.com/data/price?fsym=${currency}&tsyms=USD`
  );
  let ccdata = await response.json();
  return ccdata["USD"];
}
