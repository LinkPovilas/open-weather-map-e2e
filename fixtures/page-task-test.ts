import { generateRandomApiKeyName } from 'utils/test-data-utils';
import { test as base, expect } from './page-object-test';
import { urlPath } from 'data/url-paths';

interface ApiKey {
  name: string;
  value: string;
}

interface PageTask {
  apiKey: ApiKey;
}

export const test = base.extend<PageTask>({
  apiKey: async ({ page, apiKeyForm, apiKeyTable }, use) => {
    await page.goto(urlPath.apiKeysPage);
    const name = generateRandomApiKeyName();
    await apiKeyForm.createApiKey(name);
    const apiKey = await apiKeyTable.getApiKeyByName(name);
    expect(apiKey).toBeTruthy();
    await use({ name, value: apiKey });
  }
});
