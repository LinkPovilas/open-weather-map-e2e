import { PageObject } from './page-object';

export interface LoginData {
  email: string;
  password: string;
}

export class LoginForm extends PageObject {
  get emailField() {
    return this.page.getByPlaceholder('Email');
  }

  get passwordField() {
    return this.page.getByPlaceholder('Password');
  }

  get submitButton() {
    return this.page.getByRole('button', { name: 'Submit' });
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

  async loginAs({ email, password }: LoginData) {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickSubmit();
  }
}
