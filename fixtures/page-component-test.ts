import { test as base } from '@playwright/test';
import { ApiKeyForm } from 'page-objects/components/api-key/api-key-form';
import { ApiKeyTable } from 'page-objects/components/api-key/api-key-table';
import { EditApiKeyModal } from 'page-objects/components/api-key/edit-api-key-modal';
import { SignInForm } from 'page-objects/components/authentication/sign-in-form';
import { NavigationBar } from 'page-objects/components/navigation/navigation-bar';
import { UserDropdownMenu } from 'page-objects/components/navigation/user-dropdown-menu';

interface PageComponent {
  _signInForm: SignInForm;
  _userDropdownMenu: UserDropdownMenu;
  _navigationBar: NavigationBar;
  _apiKeyForm: ApiKeyForm;
  _apiKeyTable: ApiKeyTable;
  _editApiKeyModal: EditApiKeyModal;
}

export const test = base.extend<PageComponent>({
  _signInForm: async ({ page }, use) => {
    await use(new SignInForm(page));
  },
  _userDropdownMenu: async ({ page }, use) => {
    await use(new UserDropdownMenu(page));
  },
  _navigationBar: async ({ page, _userDropdownMenu }, use) => {
    await use(new NavigationBar(page, _userDropdownMenu));
  },
  _apiKeyForm: async ({ page }, use) => {
    await use(new ApiKeyForm(page));
  },
  _apiKeyTable: async ({ page }, use) => {
    await use(new ApiKeyTable(page));
  },
  _editApiKeyModal: async ({ page }, use) => {
    await use(new EditApiKeyModal(page));
  }
});
