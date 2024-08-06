import { mergeTests } from '@playwright/test';
import { test as apiTest } from './api-requests-test';
import { test as pageTest } from './page-tasks-test';

const test = mergeTests(apiTest, pageTest);

export { test, test as it };
export { expect } from '@playwright/test';
