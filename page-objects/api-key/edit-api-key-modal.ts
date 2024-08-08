import { PageObject } from 'page-objects/page-object';

export class EditApiKeyModal extends PageObject {
  get apiKeyNameField() {
    return this.page.getByLabel('API key name');
  }

  get saveButton() {
    return this.page.getByRole('button', { name: 'Save' });
  }

  /**
   * Fills the API key name field with the provided value.
   *
   * @param {string} apiKeyName - The value to be filled into the API key name field.
   */
  async enterApiKeyName(apiKeyName: string) {
    await this.apiKeyNameField.fill(apiKeyName);
  }

  /**
   * Clicks the save button.
   */
  async clickSave() {
    await this.saveButton.click();
  }

  /**
   * Updates the API key name.
   *
   * @param {string} apiKeyName - The new API key name to update.
   */
  async updateApiKeyName(apiKeyName: string) {
    await this.enterApiKeyName(apiKeyName);
    await this.clickSave();
  }
}
