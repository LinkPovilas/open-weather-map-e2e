import { test as base } from './page-objects-test';

// TODO: Add tasks consisting of multiple page object interactions
interface PageTask {
  fooBar: string;
}

export const test = base.extend<PageTask>({});
