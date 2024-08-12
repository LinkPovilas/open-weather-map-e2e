import { randomUUID } from 'crypto';

/**
 * Generates a random API key name.
 */
export const generateRandomApiKeyName = () =>
  randomUUID().replaceAll('-', '').slice(0, 19);
