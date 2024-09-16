import { useLoaderData } from '@remix-run/react';
import { NasaApodData, nasaLoader } from '../loaders/nasaApodLoader';

export const loader = nasaLoader; // <-- Link the loader here

export default function Index() {
  const data = useLoaderData<NasaApodData>(); // Fetch data from loader

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.explanation}</p>
      <img src={data.url} alt={data.title} />
    </div>
  );
}
