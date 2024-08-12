export const currentWeatherResponseError = {
  nothingToGeocode: {
    cod: 400,
    message: 'Nothing to geocode'
  },
  wrongLatitude: {
    cod: 400,
    message: 'wrong latitude'
  },
  wrongLongitude: {
    cod: 400,
    message: 'wrong longitude'
  },
  invalidApiKey: {
    cod: 401,
    message:
      'Invalid API key. Please see https://openweathermap.org/faq#error401 for more info.'
  },
  cityNotFound: { cod: '404', message: 'city not found' }
} as const;
