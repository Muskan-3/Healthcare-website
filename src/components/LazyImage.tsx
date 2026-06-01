import { useState } from 'react';

type Props = React.ImgHTMLAttributes<HTMLImageElement> & { src: string };

export const LazyImage = ({ src, alt = '', className = '', ...rest }: Props) => {
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
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition duration-700 ${loaded ? 'opacity-100' : 'opacity-0 scale-105'}`}
        loading="lazy"
        {...rest}
      />
      {!loaded && <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-[#0b0420] via-[#1a0733] to-[#0b0420]" />}
    </div>
  );
};

export default LazyImage;