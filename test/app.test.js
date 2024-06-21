const assert = require("assert");
const axios = require("axios");
const app = require("../app");

describe("GET /api/v1/exchange-rate with query parameters: fromCurrency and toCurrency", () => {
  const url = "http://localhost:3000/api/v1/exchange-rate";
  let fromCurrency;
  let toCurrency;

  it("should return the exchange rate for the specified currency pair", async () => {
    fromCurrency = "usd";
    toCurrency = "egp";
    const response = await axios.get(
      `${url}?fromCurrency=${fromCurrency}&toCurrency=${toCurrency}`
    );

    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.status, "success");
    assert.strictEqual(response.data.data.fromCurrency, fromCurrency);
    assert.strictEqual(response.data.data.toCurrency, toCurrency);
    assert.ok(Date.parse(response.data.data.timestamp));
  });

  it("should fail if 'fromCurrency' query parameter is missing", async () => {
    toCurrency = "egp";
    try {
      await axios.get(`${url}?toCurrency=${toCurrency}`);
    } catch (response) {
      assert.strictEqual(response.response.data.status, "fail");
      assert.strictEqual(
        response.response.data.message,
        "Missed query parameters"
      );
    }
  });

  it("should fail if 'toCurrency' query parameter is missing", async () => {
    fromCurrency = "usd";
    try {
      await axios.get(`${url}?fromCurrency=${fromCurrency}`);
    } catch (response) {
      assert.strictEqual(response.response.data.status, "fail");
      assert.strictEqual(
        response.response.data.message,
        "Missed query parameters"
      );
    }
  });

  it("should fail if currency code is not valid", async () => {
    fromCurrency = "usd";
    toCurrency = "invalid";
    try {
      await axios.get(
        `${url}?fromCurrency=${fromCurrency}&toCurrency=${toCurrency}`
      );
    } catch (response) {
      assert.strictEqual(response.response.data.status, "fail");
      assert.strictEqual(
        response.response.data.message,
        "failed to fetch exchange rate from integrated API"
      );
    }
  });
});
