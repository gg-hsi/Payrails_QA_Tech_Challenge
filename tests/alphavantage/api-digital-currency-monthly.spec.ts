import { expect } from '@playwright/test';
import responseExample from '../../data/digital_currency.json';
import { fixtures as test } from '../../fixture';
import { DigitalCurrencyMonthlyData } from '../../types';

test.describe('Market News', () => {
  const endpoint = 'DIGITAL_CURRENCY_MONTHLY';
  test('Get Digital Currency', async ({ cleanContext, baseURL, apiKey }) => {
    // Define endpoint and query parameters
    const params = {
      function: endpoint,
      symbol: responseExample['Meta Data']['2. Digital Currency Code'],
      apikey: apiKey,
      market: responseExample['Meta Data']['4. Market Code'],
    };
    // Construct query string
    const queryString = new URLSearchParams(params).toString();
    const url = `${baseURL}?${queryString}`;
    // Make the GET request
    const response = await cleanContext.get(url);
    expect(response.ok()).toBeTruthy();
    const responseBody: DigitalCurrencyMonthlyData = await response.json();
    // No Error in response
    expect(responseBody).not.toHaveProperty('Error Message');

    //Validate response Data structure
    Object.keys(responseBody).forEach((key) => expect(responseExample).toHaveProperty(key));

    //Validate Meta Data structure
    expect(Object.keys(responseExample['Meta Data'])).toEqual(
      Object.keys(responseBody['Meta Data']),
    );

    //Validate Time Series Data structure
    Object.keys(responseBody['Time Series (Digital Currency Monthly)']).forEach((key) => {
      expect(
        Object.keys(responseExample['Time Series (Digital Currency Monthly)']['testDate']),
      ).toEqual(Object.keys(responseBody['Time Series (Digital Currency Monthly)'][key]));
    });
    // Validate the content of the response
    expect(responseBody['Meta Data']['1. Information']).toBe(
      'Monthly Prices and Volumes for Digital Currency',
    );
    expect(responseBody['Meta Data']['2. Digital Currency Code']).toBe(params.symbol);
    expect(responseBody['Meta Data']['4. Market Code']).toBe(params.market);
  });

  test('Get Digital Currency error', async ({ request, baseURL, apiKey }) => {
    // Missing required params (symbol, market)
    const params = {
      function: endpoint,
      apikey: apiKey,
    };

    // Construct query string
    const queryString = new URLSearchParams(params).toString();
    const url = `${baseURL}?${queryString}`;

    // Make the GET request
    const response = await request.get(url);
    expect(response.ok()).toBeTruthy();
    const responseBody = await response.json();

    // Error in response
    expect(responseBody).toHaveProperty('Error Message');
  });
});
