import { PageObject } from '../page-object';

export interface UserCredentials {
  email: string;
  password: string;
}

export class SignInForm extends PageObject {
  get emailField() {
    return this.page.getByLabel('Email');
  }

  get passwordField() {
    return this.page.getByPlaceholder('Password');
  }

  get submitButton() {
    return this.page.getByRole('button', { name: 'Submit' });
  }

  get rememberMeCheckbox() {
    return this.page.getByLabel('Remember me');
  }

  async enterEmail(email: string) {
    await this.emailField.fill(email);
  }

  async enterPassword(password: string) {
    await this.passwordField.fill(password);
  }

  async clickSubmit() {
    await this.submitButton.click();
  }

  async login(
    { email, password }: UserCredentials = {
      email: 'soenitavinted@proton.me',
      password: 'WeatherSEBTest24*'
    }
  ) {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickSubmit();
  }
}
