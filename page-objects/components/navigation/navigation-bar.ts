import { Page } from '@playwright/test';
import { Component } from '../component';
import type { UserDropdownMenu } from './user-dropdown-menu';

export class NavigationBar extends Component {
  constructor(
    page: Page,
    private readonly userMenu: UserDropdownMenu
  ) {
    super(page);
  }

  /**
   * Performs actions to navigate to the 'My API keys' page.
   */
  async goToUserApiKeys() {
    await this.userMenu.goToMyApiKeys();
  }
}
