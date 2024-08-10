import { it, expect } from 'fixtures';
import {
  WeatherData,
  weatherDataSchema
} from 'data/api/schemas/weather-data-schema';
import { currentWeatherResponseError } from 'data/api/api-response-errors';
import {
  ErrorResponse,
  errorResponseSchema
} from 'data/api/schemas/error-response-schema';

it.describe('Current weather data API', () => {
  it('should return weather data for valid coordinates', async ({
    request,
    currentWeatherDataUrl: url
  }) => {
    const latitude = '44.34';
    const longitude = '10.99';
    url.searchParams.set('lat', latitude);
    url.searchParams.set('lon', longitude);

    const response = await request.get(url.toString());

    await expect(response).toHaveStatus(200);
    const data = (await response.json()) as WeatherData;
    expect(data).toMatchSchema(weatherDataSchema);
    expect(data).toEqual(
      expect.objectContaining({
        coord: expect.objectContaining({
          lon: Number(longitude),
          lat: Number(latitude)
        })
      })
    );
  });

  it('should return weather data for valid city name', async ({
    request,
    currentWeatherDataUrl: url
  }) => {
    const location = {
      cityName: 'Stockholm',
      countryCode: 'SE'
    };
    url.searchParams.set('q', location.cityName);

    const response = await request.get(url.toString());

    await expect(response).toHaveStatus(200);
    const data = (await response.json()) as WeatherData;
    expect(data).toMatchSchema(weatherDataSchema);
    expect(data).toEqual(
      expect.objectContaining({
        name: location.cityName,
        sys: expect.objectContaining({
          country: location.countryCode
        })
      })
    );
  });

  it('should return weather data for full location query', async ({
    request,
    currentWeatherDataUrl: url
  }) => {
    const location = {
      cityName: 'New York',
      stateName: 'NY',
      countryCode: 'US'
    };
    const query = Object.values(location).map(String).join(',');
    url.searchParams.set('q', query);

    const response = await request.get(url.toString());

    await expect(response).toHaveStatus(200);
    const data = (await response.json()) as WeatherData;
    expect(data).toMatchSchema(weatherDataSchema);
    expect(data).toEqual(
      expect.objectContaining({
        name: location.cityName,
        sys: expect.objectContaining({
          country: location.countryCode
        })
      })
    );
  });

  it('should return weather data for valid city ID', async ({
    request,
    currentWeatherDataUrl: url
  }) => {
    const location = {
      cityId: '593116',
      cityName: 'Vilnius',
      countryCode: 'LT'
    };
    url.searchParams.set('id', location.cityId);

    const response = await request.get(url.toString());

    await expect(response).toHaveStatus(200);
    const data = (await response.json()) as WeatherData;
    expect(data).toMatchSchema(weatherDataSchema);
    expect(data).toEqual(
      expect.objectContaining({
        name: location.cityName,
        sys: expect.objectContaining({
          country: location.countryCode
        })
      })
    );
  });

  it('should return weather data for valid zip code and country code', async ({
    request,
    currentWeatherDataUrl: url
  }) => {
    const location = {
      zipCode: '00100',
      cityName: 'Helsinki',
      countryCode: 'FI'
    };
    url.searchParams.set('zip', `${location.zipCode},${location.countryCode}`);

    const response = await request.get(url.toString());

    await expect(response).toHaveStatus(200);
    const data = (await response.json()) as WeatherData;
    expect(data).toMatchSchema(weatherDataSchema);
    expect(data).toEqual(
      expect.objectContaining({
        name: location.cityName,
        sys: expect.objectContaining({ country: location.countryCode })
      })
    );
  });

  it('should handle request without location query parameters', async ({
    request,
    currentWeatherDataUrl: url
  }) => {
    const response = await request.get(url.toString());

    await expect(response).toHaveStatus(400);
    const data = (await response.json()) as ErrorResponse;
    expect(data).toMatchSchema(errorResponseSchema);
    const result = errorResponseSchema.safeParse(data);
    expect(result.data).toEqual(currentWeatherResponseError.nothingToGeocode);
  });

  it('should handle unauthorized request', async ({
    request,
    currentWeatherDataUrl: url
  }) => {
    url.searchParams.delete('appid');

    const response = await request.get(url.toString());

    await expect(response).toHaveStatus(401);
    const data = (await response.json()) as ErrorResponse;
    expect(data).toMatchSchema(errorResponseSchema);
    expect(data).toEqual(currentWeatherResponseError.invalidApiKey);
  });

  it('should handle request with newly created API key', async ({
    apiKey,
    request,
    currentWeatherDataUrl: url
  }) => {
    url.searchParams.set('appid', apiKey.value);

    const response = await request.get(url.toString());

    await expect(response).toHaveStatus(401);
    const data = (await response.json()) as ErrorResponse;
    expect(data).toMatchSchema(errorResponseSchema);
    expect(data).toEqual(currentWeatherResponseError.invalidApiKey);
  });
});
