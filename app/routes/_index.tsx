import { useLoaderData } from '@remix-run/react';
import { NasaApodData, nasaLoader } from '../loaders/nasaApodLoader';
import ResponsiveImage from '../components/ResponsiveImage'; // Import ResponsiveImage
import { sanitizeAltText } from '../utils/sanitizeAltText';

export const loader = nasaLoader;

export default function Index() {
  const data = useLoaderData<NasaApodData>();

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.explanation}</p>

      {/* Use ResponsiveImage for the image with shimmer */}
      <ResponsiveImage
        src={data.url}
        alt={sanitizeAltText(data.title)}
        width={960}
        height={440}
      />
    </div>
  );
}
