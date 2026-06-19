import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle.jsx';
import EnquiryForm from '../components/EnquiryForm.jsx';
import { Blob, Sparkle, GradientStripe } from '../components/Decor.jsx';
import { BRANCHES, PHONES } from '../config.js';

const QUICK = [
  {
    icon: '📞',
    title: 'Phone',
    body: PHONES,
    href: (p) => `tel:+91${p}`,
    gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FF9F68 100%)',
  },
  {
    icon: '💬',
    title: 'WhatsApp',
    body: ['Chat with us'],
    href: () => `https://wa.me/91${PHONES[0]}`,
    target: '_blank',
    gradient: 'linear-gradient(135deg, #8BC34A 0%, #4ECDC4 100%)',
  },
  {
    icon: '⏰',
    title: 'Hours',
    body: ['Mon – Sat · 9:00 AM – 5:00 PM'],
    gradient: 'linear-gradient(135deg, #6C63FF 0%, #4ECDC4 100%)',
  },
];

export default function Contact() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#book-visit') {
      document.getElementById('book-visit')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.hash]);

  return (
    <>
      <GradientStripe />
      <section className="relative overflow-hidden bg-section-warm">
        <Blob tone="brand" size="w-80 h-80" className="-top-20 -left-20" />
        <Blob tone="gold" size="w-72 h-72" className="-top-10 right-10" style={{ animationDelay: '-4s' }} />
        <div className="section py-12 relative">
          <span className="chip-teal inline-flex items-center gap-2"><Sparkle size={12} /> Get in touch</span>
          <h1 className="heading text-4xl sm:text-5xl mt-4">
            We'd love to <span className="gradient-text">hear from you</span>
          </h1>
          <p className="mt-4 text-ink/70 max-w-2xl">
            Call, WhatsApp or stop by either of our campuses. Our team is happy to answer all your questions.
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-section-cream">
        <div className="section pb-12 pt-8 grid md:grid-cols-3 gap-4 relative">
          {QUICK.map((q) => (
            <div key={q.title} className="premium-card hover-lift">
              <div className="w-12 h-12 rounded-2xl grid place-items-center text-white text-xl mb-3"
                   style={{ background: q.gradient, boxShadow: '0 18px 40px -16px rgba(31,42,68,0.35)' }}>
                {q.icon}
              </div>
              <h3 className="font-display font-extrabold mb-1">{q.title}</h3>
              {q.body.map((b) =>
                q.href ? (
                  <a key={b} href={q.href(b)} target={q.target} rel={q.target === '_blank' ? 'noreferrer' : undefined}
                     className="block text-ink/80 hover:text-brand transition">
                    {b}
                  </a>
                ) : (
                  <div key={b} className="text-ink/80">{b}</div>
                )
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-section-cool">
        <Blob tone="teal" size="w-72 h-72" className="-top-10 -left-20" />
        <Blob tone="indigo" size="w-72 h-72" className="-bottom-10 -right-20" style={{ animationDelay: '-6s' }} />
        <div className="section py-16 relative">
          <SectionTitle eyebrow="Two campuses" title="Find us in Hyderabad" center />
          <div className="grid md:grid-cols-2 gap-6">
            {BRANCHES.map((b, idx) => (
              <div key={b.name} className="relative overflow-hidden rounded-3xl bg-white hover-lift"
                   style={{ boxShadow: '0 20px 50px -25px rgba(31,42,68,0.35)' }}>
                <div className="h-1.5" style={{ background: idx === 0 ? 'linear-gradient(90deg, #FF6B6B, #FF9F68)' : 'linear-gradient(90deg, #4ECDC4, #6C63FF)' }} />
                <iframe title={b.name} src={b.mapsEmbed} className="w-full h-72 border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                <div className="p-6">
                  <h3 className="heading text-xl">{b.name}</h3>
                  <p className="text-ink/70 mt-2">{b.address}</p>
                  <div className="flex gap-2 mt-4 flex-wrap">
                    <a href={b.directions} target="_blank" rel="noreferrer" className="btn-primary !py-2 !px-4 text-sm">Get Directions</a>
                    <a href={`tel:+91${PHONES[0]}`} className="btn-secondary !py-2 !px-4 text-sm">📞 Call</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="book-visit" className="relative overflow-hidden bg-section-warm">
        <Blob tone="coral" size="w-72 h-72" className="-top-20 -right-20" />
        <Blob tone="gold" size="w-64 h-64" className="-bottom-10 left-10" style={{ animationDelay: '-3s' }} />
        <div className="section py-16 relative">
          <div className="grid md:grid-cols-5 gap-6">
            <div className="md:col-span-2 relative rounded-3xl p-8 text-white overflow-hidden"
                 style={{ background: 'linear-gradient(135deg, #FF6B6B 0%, #FF9F68 50%, #FFD93D 100%)', boxShadow: '0 25px 60px -20px rgba(255,107,107,0.55)' }}>
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/15 blur-2xl" />
              <h3 className="heading text-2xl text-white relative">Admission Enquiry</h3>
              <p className="text-white/90 mt-2 relative">
                Submit your details and our admissions team will reach out within 24 hours, or book a free campus visit instantly.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-white/95 relative">
                <li className="flex items-center gap-2"><span>✓</span> Quick response within 24 hours</li>
                <li className="flex items-center gap-2"><span>✓</span> Personalised program guidance</li>
                <li className="flex items-center gap-2"><span>✓</span> Free campus visit available</li>
                <li className="flex items-center gap-2"><span>✓</span> Daycare & flexible timings</li>
              </ul>
            </div>
            <div className="md:col-span-3 premium-card">
              <EnquiryForm source="contact" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
