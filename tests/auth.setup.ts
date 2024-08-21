import { alertMessage, noticeMessage } from 'data/ui/messages';
import { urlPath } from 'data/ui/url-path';
import { env } from 'env';
import { test as setup, expect } from 'fixtures';
import { authFilePath } from 'playwright.config';

setup('authenticate', async ({ page, singInPage }) => {
  await page.goto(urlPath.homePage);
  await expect(page.locator('body')).toContainText(alertMessage.signInOrSignUp);
  await expect(singInPage.signInForm.rememberMeCheckbox).not.toBeChecked();
  await singInPage.signInForm.login({
    email: env.USER_EMAIL,
    password: env.USER_PASSWORD
  });
  await expect(page.locator('body')).toContainText(
    noticeMessage.signedInSuccessfully
  );
  await page.context().storageState({ path: authFilePath });
});
