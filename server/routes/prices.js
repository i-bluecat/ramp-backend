const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const prices = [
    { symbol: "BTCUSDT", price: 106855.99 },
    { symbol: "ETHUSDT", price: 3357.6 },
    { symbol: "BNBUSDT", price: 696.14 },
    { symbol: "XRPUSDT", price: 3.218 },
    { symbol: "ADAUSDT", price: 1.0216 },
    { symbol: "SOLUSDT", price: 255.35 },
    { symbol: "DOGEUSDT", price: 0.38455 },
    { symbol: "DOTUSDT", price: 6.814 },
    { symbol: "SHIBUSDT", price: 0.00002119 },
    { symbol: "AVAXUSDT", price: 37.33 },
    { symbol: "USD", price: 1 },
    { symbol: "EUR", price: 1.1 },
    { symbol: "JPY", price: 0.0075 },
    { symbol: "GBP", price: 1.2 },
    { symbol: "AUD", price: 0.75 },
    { symbol: "CAD", price: 0.8 },
    { symbol: "CHF", price: 1.05 },
    { symbol: "CNY", price: 0.15 },
    { symbol: "NZD", price: 0.7 },
  ];
  res.json(prices);
});

module.exports = router;
