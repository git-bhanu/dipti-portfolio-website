'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

type BlurUpImageProps = {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  className?: string;
  priority?: boolean;
  'data-tina-field'?: string;
};

export function BlurUpImage({
  src,
  alt,
  fill,
  width,
  height,
  sizes,
  className,
  priority,
  'data-tina-field': dataTinaField,
}: BlurUpImageProps) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, []);

  if (fill) {
    return (
      <Image
        ref={imgRef}
        src={src}
        alt={alt}
        fill
        sizes={sizes ?? '100vw'}
        className={`${className ?? ''} transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        priority={priority}
        data-tina-field={dataTinaField}
        onLoad={() => setLoaded(true)}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      data-tina-field={dataTinaField}
    />
  );
}
