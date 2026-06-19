export default function SectionTitle({ eyebrow, title, subtitle, center = false }) {
  return (
    <div className={`mb-8 ${center ? 'text-center' : ''}`}>
      {eyebrow && (
        <div className={`mb-3 ${center ? 'flex justify-center' : ''}`}>
          <span className="chip">{eyebrow}</span>
        </div>
      )}
      <h2 className="heading text-3xl sm:text-4xl">{title}</h2>
      {subtitle && <p className={`mt-3 text-ink/70 max-w-2xl ${center ? 'mx-auto' : ''}`}>{subtitle}</p>}
    </div>
  );
}
