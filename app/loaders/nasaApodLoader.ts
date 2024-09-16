import { json, LoaderArgs } from '@remix-run/node';
import axios from 'axios';

// Types for NASA APOD API response
export type NasaApodData = {
  date: string;
  explanation: string;
  hdurl: string;
  title: string;
  url: string;
};

type CachedData = {
  data: NasaApodData;
  timestamp: number;
};

// In-memory cache
const cache = new Map<string, CachedData>();
const CACHE_DURATION = 60 * 60 * 24 * 1000; // 24 hours

export async function nasaLoader({ request }: LoaderArgs) {
  const cacheKey = 'nasa_apod_data';
  const cachedData = cache.get(cacheKey);

  // Start time measurement
  const startTime = Date.now();

  // If cache hit, log time and return cached data
  if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
    const endTime = Date.now(); // End time for cache hit
    console.log(`Cache hit! Response time: ${endTime - startTime} ms`);
    return json(cachedData.data); // <-- Cached response
  }

  // If cache miss, make API call and log the response time
  const apiKey = process.env.NASA_API_KEY;
  const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

  try {
    const response = await axios.get<NasaApodData>(url);
    const data = response.data;

    // Cache the result
    cache.set(cacheKey, { data, timestamp: Date.now() });

    const endTime = Date.now(); // End time for API request
    console.log(`Cache miss (API request). Response time: ${endTime - startTime} ms`);

    return json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Response('Failed to fetch data from NASA', { status: 500 });
  }
}
