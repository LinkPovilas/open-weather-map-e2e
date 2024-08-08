import { it, expect } from 'fixtures';
import { generateRandomApiKeyName } from 'utils/test-data-utils';

it.describe('API key management', () => {
  it('should update API key name', async ({
    apiKey,
    apiKeyTable,
    editApiKeyModal,
    page
  }) => {
    const newApiKeyName = generateRandomApiKeyName();

    await apiKeyTable.clickEditKeyName(apiKey.name);
    await editApiKeyModal.updateApiKeyName(newApiKeyName);
    await expect(page.locator('body')).toContainText(
      'API key was edited successfully'
    );
    const sameApiKeyAsBefore = await apiKeyTable.getApiKeyByName(newApiKeyName);

    expect(sameApiKeyAsBefore).toEqual(apiKey.value);
  });
});
