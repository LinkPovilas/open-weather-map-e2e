import { test as base } from './page-task-test';
import { env } from 'env';
import { endpoint } from 'data/api/endpoint';

interface ApiRequest {
  currentWeatherDataUrl: URL;
}

export const test = base.extend<ApiRequest>({
  currentWeatherDataUrl: async ({}, use) => {
    const url = new URL(env.BASE_API_URL);
    url.pathname = endpoint.currentWeatherData();
    url.searchParams.set('appid', env.API_KEY);
    await use(url);
  }
});
