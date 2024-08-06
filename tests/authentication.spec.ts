import { expect, it } from '../fixtures';
import { user } from '../data/user';

it.describe('Authentication', () => {
  it('should allow user to login', async ({ loginForm, page }) => {
    await page.goto('/');
    await loginForm.loginAs(user.validUser);
    await expect(page).toHaveURL(/\/contactList/);
  });

  it('should allow user to login using API', async ({ userLoginRequest }) => {
    const response = await userLoginRequest({ data: user.validUser });
    expect(response.ok()).toBeTruthy();

    const headers = response.headers();
    expect(headers).toHaveProperty('set-cookie');
    expect(headers['set-cookie']).toMatch(/token=/);
  });
});
