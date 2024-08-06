import { APIResponse, test as base } from '@playwright/test';
import { UserData } from '../api/user-request';
import { endpoint } from '../api/endpoint';

interface ApiRequest {
  userLoginRequest: ({ data }: { data: UserData }) => Promise<APIResponse>;
}

export const test = base.extend<ApiRequest>({
  userLoginRequest: async ({ request }, use) => {
    await use(({ data }: { data: UserData }) => {
      return request.post(endpoint.userLogin(), { data });
    });
  }
});
