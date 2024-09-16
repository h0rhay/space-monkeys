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

  return (
    <div
      style={{
        display: 'grid',
        placeItems: 'center',
        width: `${width}px`,
        height: `${height}px`,
        overflow: 'hidden', // Ensure container does not overflow
        position: 'relative',
      }}
    >
      {/* Shimmer background that remains visible */}
      <div
        style={{
          gridArea: '1 / 1', // Ensure shimmer and image overlap in the same grid cell
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.5s infinite linear',
        }}
      />

      {/* Actual Image overlayed with fade-in effect */}
      <Image
        src={src}
        layout="constrained"
        width={width}
        height={height}
        alt={alt}
        onLoad={() => setImageLoaded(true)} // Fires once the image is loaded
        style={{
          gridArea: '1 / 1', // Same grid cell to overlap with shimmer
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
