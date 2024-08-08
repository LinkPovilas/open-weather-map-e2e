import { test as base } from '@playwright/test';
import { ApiKeyForm, ApiKeyTable, EditApiKeyModal } from 'page-objects/api-key';
import { SignInForm } from 'page-objects/authentication';
import { NavigationBar, UserDropdownMenu } from 'page-objects/navigation';

interface PageObject {
  signInForm: SignInForm;
  userDropdownMenu: UserDropdownMenu;
  navigationBar: NavigationBar;
  apiKeyForm: ApiKeyForm;
  apiKeyTable: ApiKeyTable;
  editApiKeyModal: EditApiKeyModal;
}

export const test = base.extend<PageObject>({
  signInForm: async ({ page }, use) => {
    await use(new SignInForm(page));
  },
  userDropdownMenu: async ({ page }, use) => {
    await use(new UserDropdownMenu(page));
  },
  navigationBar: async ({ page, userDropdownMenu }, use) => {
    await use(new NavigationBar(page, userDropdownMenu));
  },
  apiKeyForm: async ({ page }, use) => {
    await use(new ApiKeyForm(page));
  },
  apiKeyTable: async ({ page }, use) => {
    await use(new ApiKeyTable(page));
  },
  editApiKeyModal: async ({ page }, use) => {
    await use(new EditApiKeyModal(page));
  }
});

export { expect } from '@playwright/test';
