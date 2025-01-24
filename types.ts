export type DigitalCurrencyMonthlyData = {
  'Meta Data': {
    '1. Information': string;
    '2. Digital Currency Code': string;
    '3. Digital Currency Name': string;
    '4. Market Code': string;
    '5. Market Name': string;
    '6. Last Refreshed': string;
    '7. Time Zone': string;
  };
  'Time Series (Digital Currency Monthly)': {
    [date: string]: {
      '1. open': string;
      '2. high': string;
      '3. low': string;
      '4. close': string;
      '5. volume': string;
    };
  };
};
