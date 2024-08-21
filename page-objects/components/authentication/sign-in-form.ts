import { Component } from '../component';

export interface UserCredentials {
  email: string;
  password: string;
}

export class SignInForm extends Component {
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

  /**
   * Fills the email field with the provided email address.
   *
   * @param {string} email - The email address to be filled into the email field.
   */
  async enterEmail(email: string) {
    await this.emailField.fill(email);
  }

  /**
   * Fills the password field with the provided password.
   *
   * @param {string} password - The password to be filled into the password field.
   */
  async enterPassword(password: string) {
    await this.passwordField.fill(password);
  }

  /**
   * Clicks the submit button.
   */
  async clickSubmit() {
    await this.submitButton.click();
  }

  /**
   * Logs in with the provided email and password.
   *
   * @param {UserCredentials} credentials - The user's email and password.
   */
  async login({ email, password }: UserCredentials) {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickSubmit();
  }
}
