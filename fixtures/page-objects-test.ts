import { test as base } from '@playwright/test';
import { LoginForm } from '../page-objects/login-form';

interface PageObject {
  loginForm: LoginForm;
}

export const test = base.extend<PageObject>({
  loginForm: async ({ page }, use) => {
    await use(new LoginForm(page));
  }
});
