import { test as base } from './page-object-test';
import { generateRandomApiKeyName } from 'utils/test-data-utils';
import { urlPath } from 'data/ui/url-path';
import { expect } from './custom-matchers';

interface ApiKey {
  name: string;
  value: string;
}

interface PageTask {
  apiKey: ApiKey;
}

export const test = base.extend<PageTask>({
  apiKey: async ({ page, apiKeysPage }, use) => {
    await page.goto(urlPath.apiKeysPage);
    const name = generateRandomApiKeyName();
    await apiKeysPage.apiKeyForm.createApiKey(name);
    const apiKey = await apiKeysPage.apiKeyTable.getApiKeyByName(name);
    expect(apiKey).toBeTruthy();
    await use({ name, value: apiKey });
  }
});
