export const currentWeatherApiResponseErrorMessage = {
  nothingToGeocode: {
    cod: 400,
    message: 'Nothing to geocode'
  },
  invalidApiKey: {
    cod: 401,
    message:
      'Invalid API key. Please see https://openweathermap.org/faq#error401 for more info.'
  }
} as const;
