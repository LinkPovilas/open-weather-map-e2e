import { APIRequestContext } from '@playwright/test';
import { test as base } from './page-task-test';
import { env } from 'env';

interface ApiRequest {
  request: APIRequestContext;
}

export const test = base.extend<ApiRequest>({
  request: async ({ browser }, use) => {
    const browserContext = await browser.newContext({
      baseURL: env.BASE_API_URL
    });
    const apiRequest = browserContext.request;
    await use(apiRequest);
  }
});
