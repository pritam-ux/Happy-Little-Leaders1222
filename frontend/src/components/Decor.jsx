const TONES = {
  brand: 'bg-brand/40',
  coral: 'bg-coral/40',
  gold: 'bg-gold/45',
  teal: 'bg-teal/40',
  indigo: 'bg-indigo2/40',
  leaf: 'bg-leaf/35',
  pink: 'bg-pink-300/45',
};

export function Blob({ tone = 'brand', className = '', size = 'w-72 h-72', animate = true, style }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute ${size} blob-shape ${TONES[tone] || TONES.brand} ${animate ? 'animate-blob' : ''} ${className}`}
      style={style}
    />
  );
}

export function Sparkle({ className = '', size = 14 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={`text-gold ${className}`}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0l2.39 7.36H22l-6.18 4.49L18.21 24 12 19.27 5.79 24l2.39-12.15L2 7.36h7.61z" />
    </svg>
  );
}

export function WaveDivider({ from = '#FFF8F0', to = '#FFFCF5', flip = false, height = 80 }) {
  return (
    <div aria-hidden="true" className="relative -mb-px leading-[0]" style={{ background: from }}>
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="block w-full"
        style={{ height, transform: flip ? 'scaleY(-1)' : 'none' }}
      >
        <path d="M0,40 C240,90 480,0 720,40 C960,80 1200,10 1440,50 L1440,100 L0,100 Z" fill={to} />
      </svg>
    </div>
  );
}

export function CurveDivider({ from = '#FFF8F0', to = '#FAFAFF', flip = false }) {
  return (
    <div aria-hidden="true" className="relative -mb-px leading-[0]" style={{ background: from }}>
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="block w-full"
        style={{ height: 90, transform: flip ? 'scaleY(-1)' : 'none' }}
      >
        <path d="M0,80 Q720,0 1440,80 L1440,120 L0,120 Z" fill={to} />
      </svg>
    </div>
  );
}

export function GradientStripe({ className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`h-1 w-full ${className}`}
      style={{
        background: 'linear-gradient(90deg, #FF6B6B 0%, #FF9F68 25%, #FFD93D 50%, #4ECDC4 75%, #6C63FF 100%)',
      }}
    />
  );
}

export function DotGrid({ className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 opacity-30 ${className}`}
      style={{
        backgroundImage: 'radial-gradient(rgba(108,99,255,0.25) 1.5px, transparent 1.5px)',
        backgroundSize: '22px 22px',
      }}
    />
  );
}
