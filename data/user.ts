import { LoginData } from 'page-objects/login-form';

interface User {
  validUser: LoginData;
  invalidUsername: LoginData;
}

export const user: User = {
  validUser: {
    email: 'john.doe@hero.com',
    password: 'SimplePassword%567'
  },
  invalidUsername: {
    email: 'invalid@hero.com',
    password: 'SimplePassword%567'
  }
} as const;
