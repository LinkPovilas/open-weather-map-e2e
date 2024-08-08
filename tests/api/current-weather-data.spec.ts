import { endpoint } from 'api/endpoint';
import { it, expect } from 'fixtures';
import env from 'env';
import { weatherDataSchema } from 'api/schemas/weather-data-schema';
import { currentWeatherApiResponseErrorMessage } from 'api/api-response-error-messages';
import { errorResponseScema } from 'api/schemas/error-response-schema';

it.describe('Current weather data API', () => {
  let url: URL;

  it.beforeEach(() => {
    url = new URL(env.BASE_API_URL);
    url.pathname = endpoint.currentWeatherData();
    url.searchParams.set('appid', env.API_KEY);
  });

  it('should return weather data for valid coordinates', async ({
    request
  }) => {
    const latitude = '44.34';
    const longitude = '10.99';
    url.searchParams.set('lat', latitude);
    url.searchParams.set('lon', longitude);

    const response = await request.get(url.toString());

    expect(response.status()).toEqual(200);
    const data: unknown = await response.json();
    expect(() => weatherDataSchema.parse(data)).not.toThrow();
    const parsedData = weatherDataSchema.parse(data);
    expect(parsedData.coord).toEqual({
      lon: Number(longitude),
      lat: Number(latitude)
    });
  });

  it('should return weather data for valid city name', async ({ request }) => {
    const location = {
      cityName: 'Stockholm',
      countryCode: 'SE'
    };
    url.searchParams.set('q', location.cityName);

    const response = await request.get(url.toString());

    expect(response.status()).toEqual(200);
    const data: unknown = await response.json();
    expect(() => weatherDataSchema.parse(data)).not.toThrow();
    const parsedData = weatherDataSchema.parse(data);
    expect(parsedData.name).toEqual(location.cityName);
    expect(parsedData.sys.country).toEqual(location.countryCode);
  });

  it('should return weather data for full location query', async ({
    request
  }) => {
    const location = {
      cityName: 'New York',
      stateName: 'NY',
      countryCode: 'US'
    };
    const query = Object.values(location).map(String).join(',');
    url.searchParams.set('q', query);

    const response = await request.get(url.toString());

    expect(response.status()).toEqual(200);
    const data: unknown = await response.json();
    expect(() => weatherDataSchema.parse(data)).not.toThrow();
    const parsedData = weatherDataSchema.parse(data);
    expect(parsedData.name).toEqual(location.cityName);
    expect(parsedData.sys.country).toEqual(location.countryCode);
  });

  it('should return weather data for valid city ID', async ({ request }) => {
    const location = {
      cityId: '593116',
      cityName: 'Vilnius',
      countryCode: 'LT'
    };

    url.searchParams.set('id', location.cityId);

    const response = await request.get(url.toString());

    expect(response.status()).toEqual(200);
    const data: unknown = await response.json();
    expect(() => weatherDataSchema.parse(data)).not.toThrow();
    const parsedData = weatherDataSchema.parse(data);
    expect(parsedData.name).toEqual(location.cityName);
    expect(parsedData.sys.country).toEqual(location.countryCode);
  });

  it('should return weather data for valid zip code and country code', async ({
    request
  }) => {
    const location = {
      zipCode: '00100',
      cityName: 'Helsinki',
      countryCode: 'FI'
    };
    url.searchParams.set('zip', `${location.zipCode},${location.countryCode}`);

    const response = await request.get(url.toString());

    expect(response.status()).toEqual(200);
    const data: unknown = await response.json();
    expect(() => weatherDataSchema.parse(data)).not.toThrow();
    const parsedData = weatherDataSchema.parse(data);
    expect(parsedData.name).toEqual(location.cityName);
    expect(parsedData.sys.country).toEqual(location.countryCode);
  });

  it('should handle unauthorized request', async ({ request }) => {
    url.searchParams.delete('appid');

    const response = await request.get(url.toString());

    expect(response.status()).toEqual(401);
    const data: unknown = await response.json();
    expect(() => errorResponseScema.parse(data)).not.toThrow();
    const parsedData = errorResponseScema.parse(data);
    expect(parsedData).toEqual(
      currentWeatherApiResponseErrorMessage.invalidApiKey
    );
  });

  it('should handle request with newly created API key', async ({
    apiKey,
    request
  }) => {
    url.searchParams.set('appid', apiKey.value);

    const response = await request.get(url.toString());

    expect(response.status()).toEqual(401);
    const data: unknown = await response.json();
    expect(() => errorResponseScema.parse(data)).not.toThrow();
    const parsedData = errorResponseScema.parse(data);
    expect(parsedData).toEqual(
      currentWeatherApiResponseErrorMessage.invalidApiKey
    );
  });

  it('should handle request without latitude and longitude', async ({
    request
  }) => {
    const response = await request.get(url.toString());

    expect(response.status()).toEqual(400);
    const data: unknown = await response.json();
    expect(() => errorResponseScema.parse(data)).not.toThrow();
    const parsedData = errorResponseScema.parse(data);
    expect(parsedData).toEqual(
      currentWeatherApiResponseErrorMessage.nothingToGeocode
    );
  });
});
