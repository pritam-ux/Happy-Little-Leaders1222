import { useState } from 'react';

export default function SmartImage({ src, alt, className = '', wrapClassName = '', fallback = 'from-orange-200 to-pink-200', ...rest }) {
  const [error, setError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${wrapClassName}`}>
      {!error ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onError={() => setError(true)}
          className={`block w-full h-full object-cover ${className}`}
          {...rest}
        />
      ) : (
        <div className={`w-full h-full grid place-items-center bg-gradient-to-br ${fallback} text-ink/40 text-sm font-semibold`}>
          {alt || 'Image'}
        </div>
      )}
    </div>
  );
}
