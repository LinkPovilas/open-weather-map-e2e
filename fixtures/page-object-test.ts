import { test as base } from '@playwright/test';
import { ApiKeyForm } from 'page-objects/api-key/api-key-form';
import { ApiKeyTable } from 'page-objects/api-key/api-key-table';
import { EditApiKeyModal } from 'page-objects/api-key/edit-api-key-modal';
import { SignInForm } from 'page-objects/authentication/sign-in-form';
import { NavigationBar } from 'page-objects/navigation/navigation-bar';
import { UserDropdownMenu } from 'page-objects/navigation/user-dropdown-menu';

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
