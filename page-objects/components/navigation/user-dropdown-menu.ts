import { Component } from '../component';

export class UserDropdownMenu extends Component {
  get self() {
    return this.page.locator('#user-dropdown');
  }

  get myApiKeysLink() {
    return this.page.getByRole('link', { name: 'My API keys' });
  }

  /**
   * Clicks the user dropdown menu.
   */
  async clickSelf() {
    await this.self.click();
  }

  /**
   * Clicks the 'My API keys' link in the user dropdown menu.
   */
  async clickMyApiKeys() {
    await this.myApiKeysLink.click();
  }

  /**
   * Clicks on the user dropdown menu and then clicks on the 'My API keys' link.
   */
  async goToMyApiKeys() {
    await this.clickSelf();
    await this.clickMyApiKeys();
  }
}
