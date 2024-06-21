const express = require("express");
const app = express();
const axios = require("axios");
const cache = require("memory-cache");
const rateLimit = require("express-rate-limit");

require("dotenv").config();
const port = process.env.PORT;
const cacheDuration = Number(process.env.CACHE_DURATION);
const limiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS),
  limit: Number(process.env.RATE_LIMIT_MAX),
  message: {
    status: "fail",
    message: "Too many requests, please try again later.",
  },
});

app.use(limiter);

app.get("/api/v1/exchange-rate", async (req, res) => {
  const { fromCurrency, toCurrency } = req.query;
  if (!fromCurrency || !toCurrency) {
    return res.status(400).send({
      status: "fail",
      message: "Missed query parameters",
    });
  }

  const cacheKey = `${fromCurrency}_${toCurrency}`;
  let cachedRate = cache.get(cacheKey);
  if (!cachedRate) {
    try {
      const integratedAPI = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1`;

      // Fetch exchange rate from integrated API
      const response = await axios.get(
        integratedAPI + `/currencies/${fromCurrency}.json`
      );

      if (
        !response ||
        !response.data ||
        !response.data[fromCurrency] ||
        !response.data[fromCurrency][toCurrency]
      ) {
        res.status(400).send({
          status: "fail",
          message: "failed to fetch exchange rate from integrated API",
        });
      }

      // Cache the exchange rate
      cachedRate = response.data[fromCurrency][toCurrency];
      cache.put(cacheKey, cachedRate, cacheDuration);
    } catch (error) {
      console.error(error.message);
      res.status(500).send({
        status: "error",
        message: error.message || "Internal server error",
      });
    }
  }

  res.send({
    status: "success",
    data: {
      fromCurrency,
      toCurrency,
      exchangeRate: cachedRate,
      timestamp: new Date().toISOString(),
    },
  });
});

app.all("*", (req, res) => {
  res.status(404).send({
    status: "error",
    message: "Resource not found",
  });
});

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
