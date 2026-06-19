import { useEffect, useState } from 'react';
import SmartImage from './SmartImage.jsx';

export default function HeroCarousel({ slides, interval = 4500 }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % slides.length), interval);
    return () => clearInterval(id);
  }, [slides.length, interval]);

  return (
    <div className="relative aspect-[4/5] sm:aspect-[5/4] rounded-[2.5rem] bg-white shadow-soft p-3 rotate-2">
      <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-gradient-to-br from-orange-200 via-pink-200 to-yellow-200">
        {slides.map((s, idx) => (
          <div
            key={s.src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-out ${idx === i ? 'opacity-100' : 'opacity-0'}`}
          >
            <SmartImage
              src={s.src}
              alt={s.caption}
              wrapClassName="w-full h-full"
              className="scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent text-white p-5">
              <div className="text-sm font-semibold tracking-wide uppercase opacity-90">Happy Little Leaders</div>
              <div className="text-xl font-display font-extrabold">{s.caption}</div>
            </div>
          </div>
        ))}

        <div className="absolute top-3 right-3 flex gap-1.5">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all ${idx === i ? 'w-6 bg-white' : 'w-2 bg-white/60'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
