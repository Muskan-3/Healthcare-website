import { memo, useState } from 'react';

type Props = React.ImgHTMLAttributes<HTMLImageElement> & { src: string };

export const LazyImage = memo(({ src, alt = '', className = '', ...rest }: Props) => {
  const [loaded, setLoaded] = useState(false);

  const url600 = src.includes('?') ? `${src}&w=600` : `${src}?w=600`;
  const url1200 = src.includes('?') ? `${src}&w=1200` : `${src}?w=1200`;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={url600}
        srcSet={`${url600} 600w, ${url1200} 1200w`}
        sizes="(max-width: 768px) 100vw, 600px"
        alt={alt}
        width={rest.width ?? 1200}
        height={rest.height ?? 900}
        onLoad={() => setLoaded(true)}
        decoding="async"
        loading="lazy"
        className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        {...rest}
      />
      {!loaded && <div className="absolute inset-0 bg-[#0b0420]" />}
    </div>
  );
});

export default LazyImage;