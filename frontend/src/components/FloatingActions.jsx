import { useEffect, useState } from 'react';
import { BRANCHES, PHONES } from '../config.js';

export default function FloatingActions() {
  const [open, setOpen] = useState(false);
  const phone = PHONES[0];
  const waMsg = encodeURIComponent("Hello! I'd like to know more about Happy Little Leaders preschool.");

  useEffect(() => {
    if (!open) return;
    function onKey(e) { if (e.key === 'Escape') setOpen(false); }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const actions = [
    {
      label: 'Call Now',
      href: `tel:+91${phone}`,
      bg: 'bg-orange-500 hover:bg-orange-600',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
          <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.5.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.2.2 2.4.57 3.5a1 1 0 0 1-.25 1l-2.22 2.3z"/>
        </svg>
      ),
    },
    {
      label: 'WhatsApp',
      href: `https://wa.me/91${phone}?text=${waMsg}`,
      target: '_blank',
      bg: 'bg-green-500 hover:bg-green-600',
      icon: (
        <svg viewBox="0 0 32 32" className="w-5 h-5" fill="currentColor" aria-hidden="true">
          <path d="M19.11 17.27c-.27-.13-1.6-.79-1.85-.88-.25-.09-.43-.13-.61.13-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.13-1.13-.42-2.16-1.34-.8-.71-1.34-1.59-1.5-1.86-.16-.27-.02-.41.12-.55.13-.13.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.13-.61-1.47-.83-2.02-.22-.53-.45-.46-.61-.47h-.52c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.27s.97 2.63 1.11 2.81c.13.18 1.92 2.93 4.65 4.11.65.28 1.16.45 1.55.58.65.21 1.24.18 1.71.11.52-.08 1.6-.65 1.83-1.28.23-.63.23-1.18.16-1.28-.07-.1-.25-.16-.52-.29z"/>
          <path d="M26.6 5.4A14.6 14.6 0 0 0 5.27 24.59L4 30l5.59-1.46A14.6 14.6 0 1 0 26.6 5.4zM16 27.66a11.65 11.65 0 0 1-5.93-1.62l-.42-.25-3.31.87.88-3.23-.27-.43A11.66 11.66 0 1 1 16 27.66z"/>
        </svg>
      ),
    },
    {
      label: 'Get Directions',
      href: BRANCHES[0].directions,
      target: '_blank',
      bg: 'bg-sky-500 hover:bg-sky-600',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
          <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      <div
        className={`flex flex-col items-end gap-2 transition-all duration-300 ${
          open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none'
        }`}
        aria-hidden={!open}
      >
        {actions.map((a, idx) => (
          <a
            key={a.label}
            href={a.href}
            target={a.target}
            rel={a.target === '_blank' ? 'noreferrer' : undefined}
            onClick={() => setOpen(false)}
            className={`group flex items-center gap-2 ${a.bg} text-white rounded-full pl-3 pr-4 py-2 shadow-pop transition`}
            style={{ transitionDelay: open ? `${idx * 40}ms` : '0ms' }}
          >
            <span className="w-8 h-8 rounded-full bg-white/20 grid place-items-center">
              {a.icon}
            </span>
            <span className="text-sm font-semibold">{a.label}</span>
          </a>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close quick actions' : 'Open quick actions'}
        aria-expanded={open}
        className={`w-14 h-14 rounded-full grid place-items-center shadow-pop text-white transition ${
          open ? 'bg-ink rotate-45' : 'bg-orange-500 hover:bg-orange-600 animate-pulseSoft'
        }`}
      >
        <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor" aria-hidden="true">
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"/>
        </svg>
      </button>
    </div>
  );
}
