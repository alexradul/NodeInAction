const currency = require("./currency");

const cash = 50;
console.log(`${cash} canadian dolars when converted to US dolars are ${currency.canadianToUS(cash)}`);
console.log(`${cash} Canadian dolars when converted to US dolars are ${currency.UStoCanadian(cash)}`);
