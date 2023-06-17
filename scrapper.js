const axios = require("axios");
require("dotenv").config();

const api_key = process.env.API_KEY;

let currencies = [
  "bitcoin",
  "ethereum",
  "litecoin",
  "tether",
  "usd-coin",
  "bnb",
  "bitcoin-cash",
  "dogecoin",
];
let coins = [
  { name: "bitcoin", id: 1 },
  { name: "ethereum", id: 1027 },
  { name: "litecoin", id: 2 },
  { name: "tether", id: 825 },
  { name: "usd-coin", id: 3408 },
  { name: "bnb", id: 1839 },
  { name: "bitcoin-cash", id: 1831 },
  { name: "dogecoin", id: 74 },
];

let coinData = async () => {
  // attach image url to coins array
  coins.forEach((item) => {
    item.image = `https://s2.coinmarketcap.com/static/img/coins/64x64/${item.id}.png`;
  });
  let res = await axios(
    "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=20",
    {
      headers: {
        "X-CMC_PRO_API_KEY": api_key,
      },
    }
  );
  let data = await res.data.data;
  data.forEach((coin) => {
    coins.forEach((item) => {
      if (coin.id == item.id) {
        item["24h"] = coin.quote.USD["volume_24h"];
        item["24h-change"] = coin.quote.USD["volume_change_24h"];
        item.price = coin.quote.USD.price;
        item.maxSupply = coin["max_supply"];
        item.circulatingSupply = coin.circulating_supply;
        item["percent_change_1h"] = coin.quote.USD["percent_change_1h"];
        item["percent_change_24h"] = coin.quote.USD["percent_change_24h"];
      }
    });
  });
  return coins;
};

module.exports = { coinData };
