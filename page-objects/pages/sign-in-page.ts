import type { NavigationBar } from 'page-objects/components/navigation/navigation-bar';
import type { SignInForm } from 'page-objects/components/authentication/sign-in-form';

export class SignInPage {
  constructor(
    readonly navigationBar: NavigationBar,
    readonly signInForm: SignInForm
  ) {}
}
