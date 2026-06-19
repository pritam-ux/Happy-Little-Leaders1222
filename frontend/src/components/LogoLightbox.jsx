import { useEffect } from 'react';

export default function LogoLightbox({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm grid place-items-center p-4 animate-[fadeIn_150ms_ease-out]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Logo preview"
    >
      <div
        className="relative max-w-[90vw] max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-white text-ink shadow-pop grid place-items-center text-2xl font-bold leading-none hover:bg-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-300"
        >
          ×
        </button>
        <img
          src="/logo.png"
          alt="Happy Little Leaders"
          className="block max-w-[90vw] max-h-[90vh] rounded-2xl shadow-pop bg-white"
        />
      </div>
    </div>
  );
}
