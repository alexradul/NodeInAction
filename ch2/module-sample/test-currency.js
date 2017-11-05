const CurrencyExchange = require("./currency");

const eurosExchangeRate = new CurrencyExchange(122.3);

console.log(`300 euros is ${eurosExchangeRate.convert(300)}`);
