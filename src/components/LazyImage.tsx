import { memo, useState } from 'react';

type Props = React.ImgHTMLAttributes<HTMLImageElement> & { src: string; priority?: boolean };

export const LazyImage = memo(({ src, alt = '', className = '', priority = false, ...rest }: Props) => {
  const [loaded, setLoaded] = useState(false);

  const url600 = src.includes('?') ? `${src}&w=600` : `${src}?w=600`;
  const url1200 = src.includes('?') ? `${src}&w=1200` : `${src}?w=1200`;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={url600}
        srcSet={`${url600} 600w, ${url1200} 1200w`}
        sizes="(max-width: 768px) 100vw, (max-width: 1279px) 50vw, 33vw"
        alt={alt}
        width={rest.width ?? 1200}
        height={rest.height ?? 900}
        onLoad={() => setLoaded(true)}
        decoding="async"
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'low'}
        className={`w-full h-full object-cover transition-opacity duration-300 ease-out ${loaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ willChange: 'opacity' }}
        {...rest}
      />
      {!loaded && <div className="absolute inset-0 bg-[#0b0420]" />}
    </div>
  );
});

export default LazyImage;