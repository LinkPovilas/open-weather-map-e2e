import { z } from 'zod';

const coordSchema = z.object({
  lon: z.number(),
  lat: z.number()
});

const weatherSchema = z.object({
  id: z.number(),
  main: z.string(),
  description: z.string(),
  icon: z.string()
});

const mainSchema = z.object({
  temp: z.number(),
  feels_like: z.number(),
  pressure: z.number(),
  humidity: z.number(),
  temp_min: z.number(),
  temp_max: z.number(),
  sea_level: z.number(),
  grnd_level: z.number()
});

const windSchema = z.object({
  speed: z.number(),
  deg: z.number(),
  gust: z.number().optional()
});

const rainSchema = z.object({
  '1h': z.number().optional(),
  '3h': z.number().optional()
});

const snowSchema = z.object({
  '1h': z.number().optional(),
  '3h': z.number().optional()
});

const cloudsSchema = z.object({
  all: z.number()
});

const sysSchema = z.object({
  type: z.number(),
  id: z.number(),
  message: z.string().optional(),
  country: z.string(),
  sunrise: z.number(),
  sunset: z.number()
});

const weatherDataSchema = z.object({
  coord: coordSchema,
  weather: z.array(weatherSchema),
  base: z.string(),
  main: mainSchema,
  visibility: z.number(),
  wind: windSchema,
  rain: rainSchema.optional(),
  snow: snowSchema.optional(),
  clouds: cloudsSchema,
  dt: z.number(),
  sys: sysSchema,
  timezone: z.number(),
  id: z.number(),
  name: z.string(),
  cod: z.number()
});

type WeatherData = z.infer<typeof weatherDataSchema>;

export { weatherDataSchema, WeatherData };
