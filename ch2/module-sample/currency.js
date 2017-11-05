const canadianDollarExchangeRate = 0.91;

const roundTwo = amount => Math.round(amount * 100) / 100;

exports.canadianToUS = canadian => roundTwo(canadian * canadianDollarExchangeRate);
exports.UStoCanadian = us => roundTwo(us / canadianDollarExchangeRate);

class CurrencyExchange {
  constructor(exchangeRate) {
    this.exchangeRate = exchangeRate;
  }

  convert(amount) {
    return roundTwo(amount * this.exchangeRate);
  }
}

module.exports = CurrencyExchange;
