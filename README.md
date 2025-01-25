# QA Technical Challenge at _Payrails_

## Manual Testcases

<table>
    <tr>
        <td>TestCase #</td>
        <td>Description</td>
        <td>Steps</td>
    </tr>
    <tr>
        <td>1</td>
        <td>Validate Market News <a href="https://www.alphavantage.co/documentation/#intraday">TIME_SERIES_INTRADAY</a> endpoint</td>
        <td>
            <table>
                <tr><th>Step #</th><th>Description</th></tr>
                <tr><td>1</td><td>Enter the following parameters in Postman:<br>1- function:"TIME_SERIES_INTRADAY"<br>2- symbol:"AAPL"<br>3- interval:"1min"<br>4- apikey:"API_KEY"<br>Send the HTTP request</td></tr>
                <tr><td>3</td><td>Check that response code is 200</td></tr>
                <tr><td>2</td><td>Check that response is successfull and contains all expected keys (<a href="https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo">check data structrue</a>)</td></tr>
            </table>
        </td>
    </tr>
    <tr>
        <td>2</td>
        <td>Validate Cryptocurrencies <a href="https://www.alphavantage.co/documentation/#currency-monthly">DIGITAL_CURRENCY_MONTHLY</a> endpoint</td>
        <td>
            <table>
                <tr><th>Step #</th><th>Description</th></tr>
                <tr><td>1</td><td>Enter the following parameters in Postman:<br>1- function:"DIGITAL_CURRENCY_MONTHLY"<br>2- symbol:"BTC"<br>3- market:"EUR"<br>4- apikey:"API_KEY"<br>Send the HTTP request</td></tr>
                <tr><td>2</td><td>Check that response code is 200</td></tr>
                <tr><td>3</td><td>Check that response is successfull and contains all expected keys (<a href="https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_MONTHLY&symbol=BTC&market=EUR&apikey=demo">check data structrue</a>)</td></tr>
            </table>
        </td>
    </tr>

</table>
## Automation

### Getting Started

To install packages for the tests by running:

```sh
npm i
```

### [Generate an API key](https://www.alphavantage.co/support/#api-key)

### Set the environment variable

Create a .env file in the project folder containing the following:

```
TESTING_URL='https://www.alphavantage.co/query'
API_KEY='GENERATED_API_KEY'
```

### Running unit test

To run tests for this project use:

```sh
npx playwright test
```

### Modules used

- [Node.js](https://nodejs.org/en/)
- [Playwright](https://playwright.dev/)
