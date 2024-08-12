import { mergeTests } from '@playwright/test';
import { test as apiTest } from './api-request-test';
import { test as pageTest } from './page-task-test';

const test = mergeTests(apiTest, pageTest);

export { test, test as it };
export { expect } from './custom-matchers';
