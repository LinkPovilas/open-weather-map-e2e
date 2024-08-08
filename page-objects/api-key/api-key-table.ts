import { PageObject } from '../page-object';

export class ApiKeyTable extends PageObject {
  get self() {
    return this.page.getByRole('table');
  }
  get tableRow() {
    return this.page.getByRole('row');
  }

  get tableCell() {
    return this.page.getByRole('cell');
  }

  get actionButton() {
    return this.tableCell.getByRole('link');
  }

  /**
   * Opens the edit API key modal by clicking the edit button for the API key with the specified name.
   *
   * @param {string} apiKeyName - The name of the API key to edit.
   */
  async clickEditKeyName(apiKeyName: string) {
    await this.page
      .getByRole('row', { name: apiKeyName })
      .locator('a')
      .nth(1)
      .click();
  }

  /**
   * Retrieves the API key associated with the given API key name.
   *
   * @param {string} apiKeyName - The name of the API key to retrieve.
   */
  async getApiKeyByName(apiKeyName: string): Promise<string> {
    const tableRow = this.page.getByRole('row').filter({
      has: this.page.getByRole('cell', { name: apiKeyName })
    });
    const apiKeyCell = tableRow.getByRole('cell').first();
    const apiKey = await apiKeyCell.innerText();

    return apiKey;
  }
}
