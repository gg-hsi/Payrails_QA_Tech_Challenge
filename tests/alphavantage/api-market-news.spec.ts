import { expect } from '@playwright/test';
import responseExample from '../../data/intraday.json';
import { fixtures as test } from '../../fixture';

test.describe('Market News', () => {
  const endpoint = 'TIME_SERIES_INTRADAY';
  test('Get historical intraday', async ({ request, baseURL, apiKey }) => {
    // Define endpoint and query parameters
    const params = {
      function: endpoint,
      symbol: responseExample['Meta Data']['2. Symbol'],
      interval: responseExample['Meta Data']['4. Interval'],
      apikey: apiKey,
    };

    // Construct query string
    const queryString = new URLSearchParams(params).toString();
    const url = `${baseURL}?${queryString}`;
    // Make the GET request
    const response = await request.get(url);
    expect(response.ok()).toBeTruthy();
    const responseBody = await response.json();
    // No Error in response
    expect(responseBody).not.toHaveProperty('Error Message');

    //Validate response Data structure
    Object.keys(responseBody).forEach((key) => expect(responseExample).toHaveProperty(key));

    //Validate Meta Data structure
    expect(Object.keys(responseExample['Meta Data'])).toEqual(
      Object.keys(responseBody['Meta Data']),
    );

    //Validate Time Series Data structure
    Object.keys(responseBody['Time Series (1min)']).forEach((key) => {
      expect(Object.keys(responseExample['Time Series (1min)']['testTimeStamp'])).toEqual(
        Object.keys(responseBody['Time Series (1min)'][key]),
      );
    });
    // No Error in response
    expect(responseBody['Error Message']).toBeFalsy();

    // Validate the structure of the response
    expect(responseBody['Meta Data']).toBeDefined();
    expect(responseBody['Meta Data']['1. Information']).toBe(
      'Intraday (1min) open, high, low, close prices and volume',
    );
    expect(responseBody['Meta Data']['2. Symbol']).toBe(params.symbol);
    expect(responseBody['Meta Data']['4. Interval']).toBe(params.interval);
  });

  test('Get historical intraday error', async ({ request, baseURL, apiKey }) => {
    // Missing required params (symbol, interval)
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
