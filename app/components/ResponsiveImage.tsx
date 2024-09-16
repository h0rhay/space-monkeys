import { useState } from 'react';
import { Image } from '@unpic/react';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({ src, alt, width, height }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Log when the image loading starts and finishes
  const handleImageLoad = () => {
    console.log('Image has loaded:', src);
    setImageLoaded(true);
  };

  const handleImageError = (e: any) => {
    console.error('Image failed to load:', src, e);
  };

  return (
    <div
      style={{
        display: 'grid',
        placeItems: 'center',
        width: `${width}px`,
        height: `${height}px`,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Shimmer background that remains visible */}
      <div
        style={{
          gridArea: '1 / 1',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.5s infinite linear',
        }}
      />

      {/* Actual Image from @unpic/react with logging */}
      <Image
        src={src}
        layout="constrained"
        width={width}
        height={height}
        alt={alt}
        onLoad={handleImageLoad} // Log when image loads
        onError={handleImageError} // Log errors if image fails to load
        style={{
          gridArea: '1 / 1',
          width: '100%',
          height: '100%',
          transition: 'opacity 0.5s ease-in-out',
          opacity: imageLoaded ? 1 : 0, // Smooth transition as the image loads
        }}
      />

      {/* CSS for shimmer animation */}
      <style>{`
        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </div>
  );
};

export default ResponsiveImage;
