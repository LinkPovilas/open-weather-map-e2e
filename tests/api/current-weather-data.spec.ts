import { it, expect } from 'fixtures';
import {
  WeatherData,
  weatherDataMainSchema,
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
    const cityName = 'Stockholm';
    const countryCode = 'SE';
    url.searchParams.set('q', cityName);

    const response = await request.get(url.toString());

    await expect(response).toHaveStatus(200);
    const data = (await response.json()) as WeatherData;
    expect(data).toMatchSchema(weatherDataSchema);
    expect(data).toEqual(
      expect.objectContaining({
        name: cityName,
        sys: expect.objectContaining({
          country: countryCode
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
    const cityId = '593116';
    const cityName = 'Vilnius';
    const countryCode = 'LT';
    url.searchParams.set('id', cityId);

    const response = await request.get(url.toString());

    await expect(response).toHaveStatus(200);
    const data = (await response.json()) as WeatherData;
    expect(data).toMatchSchema(weatherDataSchema);
    expect(data).toEqual(
      expect.objectContaining({
        name: cityName,
        sys: expect.objectContaining({
          country: countryCode
        })
      })
    );
  });

  it('should return weather data for valid zip code and country code', async ({
    request,
    currentWeatherDataUrl: url
  }) => {
    const zipCode = '00100';
    const cityName = 'Helsinki';
    const countryCode = 'FI';
    url.searchParams.set('zip', `${zipCode},${countryCode}`);

    const response = await request.get(url.toString());

    await expect(response).toHaveStatus(200);
    const data = (await response.json()) as WeatherData;
    expect(data).toMatchSchema(weatherDataSchema);
    expect(data).toEqual(
      expect.objectContaining({
        name: cityName,
        sys: expect.objectContaining({ country: countryCode })
      })
    );
  });

  it('should return translated city name and description', async ({
    request,
    currentWeatherDataUrl
  }) => {
    const languageCode = 'FR';
    const cityName = 'Warsaw';
    const cityNameFr = 'Varsovie';

    const defaultLangUrl = new URL(currentWeatherDataUrl);
    defaultLangUrl.searchParams.set('q', cityName);

    const localizedLangUrl = new URL(currentWeatherDataUrl);
    localizedLangUrl.searchParams.set('q', cityName);
    localizedLangUrl.searchParams.set('lang', languageCode);

    const defaultLangResponse = await request.get(defaultLangUrl.toString());
    await expect(defaultLangResponse).toHaveStatus(200);

    const localizedLangUrlResponse = await request.get(
      localizedLangUrl.toString()
    );
    await expect(localizedLangUrlResponse).toHaveStatus(200);

    const localizedLangData =
      (await localizedLangUrlResponse.json()) as WeatherData;
    expect(localizedLangData.name).toBe(cityNameFr);
    const defaultLangData = (await defaultLangResponse.json()) as WeatherData;

    const weatherDataLength = localizedLangData.weather.length;
    for (let i = 0; i < weatherDataLength; i++) {
      if (localizedLangData.weather[i].id === defaultLangData.weather[i].id) {
        const localizedDescription = localizedLangData.weather[i].description;
        const defaultDescription = defaultLangData.weather[i].description;
        expect(localizedDescription).not.toBe(defaultDescription);
      }
    }
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

  it('should handle request with invalid coordinates', async ({
    request,
    currentWeatherDataUrl: url
  }) => {
    url.searchParams.set('lat', '44.34°N');
    url.searchParams.set('lon', '10.99°W');

    const response = await request.get(url.toString());

    await expect(response).toHaveStatus(400);
    const data = (await response.json()) as ErrorResponse;
    expect(data).toMatchSchema(errorResponseSchema);
    const result = errorResponseSchema.safeParse(data);
    expect(result.data).toEqual(currentWeatherResponseError.nothingToGeocode);
  });

  it('should handle request with invalid city name', async ({
    request,
    currentWeatherDataUrl: url
  }) => {
    url.searchParams.set('q', 'invalid');

    const response = await request.get(url.toString());
    await expect(response).toHaveStatus(404);
    const data = (await response.json()) as ErrorResponse;
    expect(data).toMatchSchema(errorResponseSchema);
    expect(data).toEqual(currentWeatherResponseError.cityNotFound);
  });

  it('should handle request with invalid city ID', async ({
    request,
    currentWeatherDataUrl: url
  }) => {
    url.searchParams.set('id', '123456');

    const response = await request.get(url.toString());

    await expect(response).toHaveStatus(404);
    const data = (await response.json()) as ErrorResponse;
    expect(data).toMatchSchema(errorResponseSchema);
    expect(data).toEqual(currentWeatherResponseError.cityNotFound);
  });

  it('should handle request with invalid zip code', async ({
    request,
    currentWeatherDataUrl: url
  }) => {
    const zipCode = '123';
    const countryCode = 'FI';
    url.searchParams.set('zip', `${zipCode},${countryCode}`);

    const response = await request.get(url.toString());

    await expect(response).toHaveStatus(404);
    const data = (await response.json()) as ErrorResponse;
    expect(data).toMatchSchema(errorResponseSchema);
    expect(data).toEqual(currentWeatherResponseError.cityNotFound);
  });

  it('should handle requests with different units of measurement', async ({
    request,
    currentWeatherDataUrl: baseUrl
  }) => {
    const cityName = 'Stockholm';
    baseUrl.searchParams.set('q', cityName);

    // Kelvin by default
    const standardUnitsUrl = new URL(baseUrl);

    // Fahrenheit
    const imeperialUnitsUrl = new URL(baseUrl);
    imeperialUnitsUrl.searchParams.set('units', 'imperial');

    // Celsius
    const metricUnitsUrl = new URL(baseUrl);
    metricUnitsUrl.searchParams.set('units', 'metric');

    const standardUnitsResponse = await request.get(
      standardUnitsUrl.toString()
    );
    await expect(standardUnitsResponse).toHaveStatus(200);
    const dataInStandardUnits =
      (await standardUnitsResponse.json()) as WeatherData;
    expect(dataInStandardUnits.main).toMatchSchema(weatherDataMainSchema);

    const imperialUnitResponse = await request.get(
      imeperialUnitsUrl.toString()
    );
    await expect(imperialUnitResponse).toHaveStatus(200);
    const dataInImperialUnits =
      (await imperialUnitResponse.json()) as WeatherData;
    expect(dataInImperialUnits.main).toMatchSchema(weatherDataMainSchema);

    const metricUnitsResponse = await request.get(metricUnitsUrl.toString());
    await expect(metricUnitsResponse).toHaveStatus(200);
    const dataInMetricUnits = (await metricUnitsResponse.json()) as WeatherData;
    expect(dataInMetricUnits.main).toMatchSchema(weatherDataMainSchema);

    // Kelvin temperature should be higher than Celsius
    expect(dataInStandardUnits.main.temp).toBeGreaterThan(
      dataInMetricUnits.main.temp
    );
    expect(dataInStandardUnits.main.feels_like).toBeGreaterThan(
      dataInMetricUnits.main.feels_like
    );
    expect(dataInStandardUnits.main.temp_min).toBeGreaterThan(
      dataInMetricUnits.main.temp_min
    );
    expect(dataInStandardUnits.main.temp_max).toBeGreaterThan(
      dataInMetricUnits.main.temp_max
    );

    // Fahrenheit temperature should be higher than Celsius
    expect(dataInImperialUnits.main.temp).toBeGreaterThan(
      dataInMetricUnits.main.temp
    );
    expect(dataInImperialUnits.main.feels_like).toBeGreaterThan(
      dataInMetricUnits.main.feels_like
    );
    expect(dataInImperialUnits.main.temp_min).toBeGreaterThan(
      dataInMetricUnits.main.temp_min
    );
    expect(dataInImperialUnits.main.temp_max).toBeGreaterThan(
      dataInMetricUnits.main.temp_max
    );
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
