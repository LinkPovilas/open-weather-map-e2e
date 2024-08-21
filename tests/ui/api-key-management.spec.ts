import { noticeMessage } from 'data/ui/messages';
import { it, expect } from 'fixtures';
import { generateRandomApiKeyName } from 'utils/test-data-utils';

it.describe('API key management', () => {
  it('should update API key name', async ({ apiKey, apiKeysPage, page }) => {
    const newApiKeyName = generateRandomApiKeyName();

    await apiKeysPage.apiKeyTable.clickEditKeyName(apiKey.name);
    await apiKeysPage.editApiKeyModal.updateApiKeyName(newApiKeyName);
    await expect(page.locator('body')).toContainText(
      noticeMessage.apiKeyEditedSuccessfully
    );
    const sameApiKeyAsBefore =
      await apiKeysPage.apiKeyTable.getApiKeyByName(newApiKeyName);

    expect(sameApiKeyAsBefore).toEqual(apiKey.value);
    await expect(
      apiKeysPage.apiKeyTable.tableCell.filter({ hasText: newApiKeyName })
    ).toHaveCount(1);
  });
});
