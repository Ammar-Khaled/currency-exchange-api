# Currency Exchange API
This is a simple currency exchange API that exposes the exchange rate between two currencies.

## Table of Contents
- [API Documentation](#api-documentation)
- [Features](#features)
- [Installation](#installation)
- [Testing](#testing)
- [Integration](#integration)
- [Author](#author)

## API Documentation

- GET `/api/v1/exchange-rate`
  - Gets the exchange rate between two currencies.
  - Query Parameters:
    | Parameter | Type   | Description                                                                                   |
    |-----------|--------|-----------------------------------------------------------------------------------------------|
    | fromCurrency      | String | The three-small-letter code of the currency you want to convert from. (e.g. usd, egp, eur, etc.)      |
    | toCurrency        | String | The three-small-letter code of the currency you want to convert to. (e.g. usd, egp, eur, etc.)          |

  - Response (following Jsend specifications):

    | Attribute      | Type | Description                                                      |
    |----------------|---------|------------------------------------------------------------------|
    | status  | String | Describe the status of the response: "success", "fail" or "error" |
    | data   | Object | if "success", contains the response data: fromCurrency, toCurrency, exhangeRate, timestamp |
    | message | String | if "fail" or "error", contains a message describing what happened. |

  - HTTP Response Codes
      | Status Code | Description                                                                                           |
      |-------------|-------------------------------------------------------------------------------------------------------|
      | 200         | The request was successful.                                                                           |
      | 400         | invalid parameters for the resource.                 |
      | 404         | resource not found |
      | 429 | Too many requests exceeding the rate limit.
      | 500         | If any unexpected error occurs while processing the request.                                         |
  - Content Type: application/json
  - Example:
    ```bash
    curl http://localhost:3000/api/exchange-rate?fromCurrency=usd&toCurrency=egp
    ```
    ```json
    {
      "status": "success",
      "data": {
        "fromCurrency": "usd",
        "toCurrency": "egp",
        "exchangeRate": 47.71190127,
        "timestamp": "2024-06-21T20:04:27.699Z"
      }
    }

## Features
* **Caching**: reduces the number of requests to the external API.
* **Rate Limiting**: for the API to prevent abuse.
* **Dockerizing**: using docker-compose.
* **Unit Tests**: reliable through unit tests.


## Installation
1. Clone the repository
```bash
$ git clone https://github.com/Ammar-Khaled/currency-exchange-api.git
$ cd currency-exchange-api
```

If you don't have Node and npm installed on your machine, Visit the [official Node.js website](https://nodejs.org) and download the appropriate installer for your operating system.


2. Install the dependencies
```bash
$ npm install
```

3. Start the server
```bash
$ npm start
app is listening on port 3000
```
now you can access the API on `http://localhost:3000`

## Testing
To run the tests, run the following command:
```bash
$ npm test
```

## Integration
After checking around ten public APIs on stack overflow, we decided to integrate with this [Exchange-API](https://github.com/fawazahmed0/exchange-api) to get the exchange rates because of its simplicity, unlimited requests, freeness and daily updates...


## Author
Ammar Noor [Linkedin](https://www.linkedin.com/in/ammar-noor/)
