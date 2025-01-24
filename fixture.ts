import { APIRequestContext, test as base, request } from '@playwright/test';

const fixtures = base.extend<{
  apiKey: string;
  cleanContext: APIRequestContext;
}>({
  apiKey: async ({}, use) => {
    const apiKey = process.env.API_KEY?.toString() || 'demo';
    await use(apiKey);
  },
  cleanContext: async ({ baseURL }, use) => {
    const context = await request.newContext({
      baseURL,
      extraHTTPHeaders: {
        'User-Agent': 'request',
      },
    });
    await use(context);
  },
});

export { fixtures };
