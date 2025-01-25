import { test as base } from '@playwright/test';

const fixtures = base.extend<{
  apiKey: string;
}>({
  apiKey: async ({}, use) => {
    const apiKey = process.env.API_KEY?.toString() || 'demo';
    await use(apiKey);
  },
});

export { fixtures };
