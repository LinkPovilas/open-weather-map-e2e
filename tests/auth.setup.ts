import { alertMessage, noticeMessage } from 'data/ui/messages';
import { urlPath } from 'data/ui/url-path';
import { test as setup, expect } from 'fixtures';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page, signInForm }) => {
  await page.goto(urlPath.homePage);
  await expect(page.locator('body')).toContainText(alertMessage.signInOrSignUp);
  await expect(signInForm.rememberMeCheckbox).not.toBeChecked();
  await signInForm.login();
  await expect(page.locator('body')).toContainText(
    noticeMessage.signedInSuccessfully
  );
  await page.context().storageState({ path: authFile });
});
