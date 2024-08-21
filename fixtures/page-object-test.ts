import { test as base } from './page-component-test';
import { ApiKeysPage } from 'page-objects/pages/api-keys-page';
import { HomePage } from 'page-objects/pages/home-page';
import { SignInPage } from 'page-objects/pages/sign-in-page';

interface PageObject {
  singInPage: SignInPage;
  homePage: HomePage;
  apiKeysPage: ApiKeysPage;
}

export const test = base.extend<PageObject>({
  singInPage: async ({ _navigationBar, _signInForm }, use) => {
    await use(new SignInPage(_navigationBar, _signInForm));
  },
  homePage: async ({ _navigationBar }, use) => {
    await use(new HomePage(_navigationBar));
  },
  apiKeysPage: async (
    { _navigationBar, _apiKeyForm, _apiKeyTable, _editApiKeyModal },
    use
  ) => {
    await use(
      new ApiKeysPage(
        _navigationBar,
        _apiKeyForm,
        _apiKeyTable,
        _editApiKeyModal
      )
    );
  }
});
