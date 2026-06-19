import { useState } from 'react';
import SectionTitle from '../components/SectionTitle.jsx';

const items = [
  { id: 1, color: 'from-pink-200 to-peach', emoji: '🎨', label: 'Art Day' },
  { id: 2, color: 'from-sky2 to-mint', emoji: '📚', label: 'Story Circle' },
  { id: 3, color: 'from-sun to-peach', emoji: '🎵', label: 'Music Class' },
  { id: 4, color: 'from-lilac to-sky2', emoji: '🏃', label: 'Sports Day' },
  { id: 5, color: 'from-mint to-sun', emoji: '🥳', label: 'Annual Day' },
  { id: 6, color: 'from-peach to-pink-200', emoji: '🍎', label: 'Snack Time' },
  { id: 7, color: 'from-sky2 to-lilac', emoji: '🎉', label: 'Birthday' },
  { id: 8, color: 'from-mint to-sky2', emoji: '🌳', label: 'Nature Walk' },
  { id: 9, color: 'from-sun to-mint', emoji: '🧩', label: 'Puzzle Day' },
  { id: 10, color: 'from-pink-200 to-lilac', emoji: '👯', label: 'Dance Class' },
  { id: 11, color: 'from-peach to-sun', emoji: '🦄', label: 'Fancy Dress' },
  { id: 12, color: 'from-sky2 to-peach', emoji: '⚽', label: 'Outdoor Play' },
];

export default function Gallery() {
  const [active, setActive] = useState(null);

  return (
    <>
      <section className="section py-12">
        <span className="chip">Memories</span>
        <h1 className="heading text-4xl sm:text-5xl mt-4">Smiles from our campuses</h1>
        <p className="mt-4 text-ink/70 max-w-2xl">A peek into the everyday joy at Happy Little Leaders.</p>
      </section>

      <section className="section pb-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((it) => (
            <button
              key={it.id}
              onClick={() => setActive(it)}
              className={`group relative aspect-square rounded-3xl bg-gradient-to-br ${it.color} shadow-soft overflow-hidden hover:-translate-y-1 transition`}
            >
              <div className="absolute inset-0 grid place-items-center text-6xl group-hover:scale-110 transition">{it.emoji}</div>
              <div className="absolute inset-x-0 bottom-0 bg-black/40 text-white text-sm font-semibold py-2 opacity-0 group-hover:opacity-100 transition">
                {it.label}
              </div>
            </button>
          ))}
        </div>
      </section>

      {active && (
        <div
          className="fixed inset-0 z-50 bg-black/70 grid place-items-center p-4"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className={`relative w-full max-w-3xl aspect-video rounded-3xl bg-gradient-to-br ${active.color} grid place-items-center`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-[12rem]">{active.emoji}</div>
            <button
              onClick={() => setActive(null)}
              className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white text-ink grid place-items-center shadow-pop"
              aria-label="Close"
            >
              ×
            </button>
            <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-white/90 text-sm font-bold">{active.label}</div>
          </div>
        </div>
      )}
    </>
  );
}
