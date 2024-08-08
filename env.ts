import 'dotenv/config';
import { cleanEnv, bool, url, makeValidator } from 'envalid';

const apiKey = makeValidator((input) => {
  if (/^[a-zA-Z0-9]{32}$/.test(input)) {
    return input;
  }
  throw new Error('Invalid API key provided');
});

const env = cleanEnv(process.env, {
  CI: bool({ default: false }),
  BASE_URL: url(),
  BASE_API_URL: url(),
  API_KEY: apiKey()
});

export default env;
