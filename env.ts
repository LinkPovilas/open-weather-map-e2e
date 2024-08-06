import 'dotenv/config';
import { cleanEnv, bool, url } from 'envalid';

const env = cleanEnv(process.env, {
  CI: bool({ default: false }),
  BASE_URL: url()
});

export default env;
