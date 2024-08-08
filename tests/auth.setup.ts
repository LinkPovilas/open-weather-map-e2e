import { urlPath } from 'data/url-paths';
import { test as setup, expect } from 'fixtures';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page, signInForm }) => {
  await page.goto(urlPath.homePage);
  await expect(page.locator('body')).toContainText(
    'You need to sign in or sign up before continuing'
  );
  await expect(page.getByLabel('Remember me')).not.toBeChecked();
  await signInForm.login();
  await expect(page.locator('body')).toContainText('Signed in successfully');
  await page.context().storageState({ path: authFile });
});
