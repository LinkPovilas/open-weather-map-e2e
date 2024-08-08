import { Page } from '@playwright/test';
import { PageObject } from '../page-object';
import type { UserDropdownMenu } from './user-dropdown-menu';

export class NavigationBar extends PageObject {
  constructor(
    page: Page,
    private readonly userMenu: UserDropdownMenu
  ) {
    super(page);
  }

  async goToUserApiKeys() {
    await this.userMenu.goToMyApiKeys();
  }
}
