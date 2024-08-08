import { PageObject } from '../page-object';

export class UserDropdownMenu extends PageObject {
  get self() {
    return this.page.locator('#user-dropdown');
  }

  get myApiKeysLink() {
    return this.page.getByRole('link', { name: 'My API keys' });
  }

  async clickSelf() {
    await this.self.click();
  }

  async clickMyApiKeys() {
    await this.myApiKeysLink.click();
  }

  async goToMyApiKeys() {
    await this.clickSelf();
    await this.clickMyApiKeys();
  }
}
