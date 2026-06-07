import { memo, useState } from 'react';

type Props = React.ImgHTMLAttributes<HTMLImageElement> & { src: string; priority?: boolean };

// Only append Unsplash resize params — local files (no 'unsplash.com') are used as-is
const makeUrl = (src: string, w: number): string => {
  if (!src.includes('unsplash.com')) return src;
  return src.includes('?') ? `${src}&w=${w}` : `${src}?w=${w}`;
};

export const LazyImage = memo(({ src, alt = '', className = '', priority = false, ...rest }: Props) => {
  const [loaded, setLoaded] = useState(false);

  const url600 = makeUrl(src, 600);
  const url1200 = makeUrl(src, 1200);
  const hasSrcSet = src.includes('unsplash.com');

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={url600}
        srcSet={hasSrcSet ? `${url600} 600w, ${url1200} 1200w` : undefined}
        sizes={hasSrcSet ? '(max-width: 768px) 100vw, (max-width: 1279px) 50vw, 33vw' : undefined}
        alt={alt}
        width={rest.width ?? 1200}
        height={rest.height ?? 900}
        onLoad={() => setLoaded(true)}
        decoding="async"
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        className={`w-full h-full object-cover transition-opacity duration-300 ease-out ${loaded ? 'opacity-100' : 'opacity-0'}`}
        {...rest}
      />
      {!loaded && <div className="absolute inset-0 bg-[#0b0420]" />}
    </div>
  );
});

export default LazyImage;