import { expect as baseExpect } from '@playwright/test';
import type { APIResponse } from '@playwright/test';
import { ZodSchema } from 'zod';

export const expect = baseExpect.extend({
  async toHaveStatus(response: APIResponse, expected: number) {
    const assertionName = 'toHaveStatus';
    const actualStatus = response.status();
    const pass = actualStatus === expected;

    let responseBody: string;
    let responseHeaders: Record<string, string>;

    if (!pass) {
      responseBody = await response.text();
      responseHeaders = response.headers();
    }

    const message = pass
      ? () =>
          this.utils.matcherHint(assertionName, undefined, undefined, {
            isNot: this.isNot
          }) +
          '\n\n' +
          `Expected: ${this.isNot ? 'not ' : ''}${this.utils.printExpected(expected)}\n` +
          `Received: ${this.utils.printReceived(actualStatus)}`
      : () =>
          this.utils.matcherHint(assertionName, undefined, undefined, {
            isNot: this.isNot
          }) +
          '\n\n' +
          `Expected: ${this.utils.printExpected(expected)}\n` +
          `Received: ${this.utils.printReceived(actualStatus)}\n\n` +
          `Response Body: ${this.utils.printReceived(responseBody)}\n` +
          `Response Headers: ${this.utils.printReceived(responseHeaders)}`;

    return {
      message,
      pass,
      name: assertionName,
      expected,
      actual: actualStatus
    };
  },
  toMatchSchema(actual: unknown, schema: ZodSchema) {
    const assertionName = 'toMatchSchema';
    const result = schema.safeParse(actual);
    const pass = result.success;
    const message = pass
      ? () =>
          this.utils.matcherHint(assertionName, undefined, undefined, {
            isNot: this.isNot
          }) +
          '\n\n' +
          `Expected data to match schema:\n` +
          `Received: ${this.utils.printReceived(actual)}`
      : () =>
          this.utils.matcherHint(assertionName, undefined, undefined, {
            isNot: this.isNot
          }) +
          '\n\n' +
          `Expected data to match schema:\n` +
          `Received: ${this.utils.printReceived(actual)}\n` +
          `Schema Validation Errors: ${this.utils.printReceived(result.error)}\n`;

    return {
      message,
      pass,
      name: assertionName,
      expected: schema,
      actual
    };
  }
});
