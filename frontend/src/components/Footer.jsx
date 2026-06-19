import { Link } from 'react-router-dom';
import { useState } from 'react';
import { api } from '../api.js';
import { BRANCHES, PHONES } from '../config.js';
import LogoLightbox from './LogoLightbox.jsx';

const SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com', icon: InstaIcon },
  { label: 'Facebook', href: 'https://facebook.com', icon: FbIcon },
  { label: 'YouTube', href: 'https://youtube.com', icon: YtIcon },
  { label: 'WhatsApp', href: `https://wa.me/91${PHONES[0]}`, icon: WaIcon },
];

const HOURS = [
  { day: 'Mon – Fri', time: '8:30 AM – 7:00 PM' },
  { day: 'Saturday', time: '9:00 AM – 1:00 PM' },
  { day: 'Sunday', time: 'Closed' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);
  const [logoOpen, setLogoOpen] = useState(false);

  async function subscribe(e) {
    e.preventDefault();
    setStatus(null);
    try {
      await api('/newsletter', { method: 'POST', body: { email } });
      setStatus({ ok: true, msg: 'Subscribed!' });
      setEmail('');
    } catch (err) {
      setStatus({ ok: false, msg: err.message });
    }
  }

  return (
    <footer className="mt-16 text-white relative overflow-hidden"
            style={{ background: 'linear-gradient(160deg, #1F2A44 0%, #2A3558 60%, #1F2A44 100%)' }}>
      <div
        aria-hidden="true"
        className="h-1 w-full"
        style={{ background: 'linear-gradient(90deg, #FF6B6B 0%, #FF9F68 25%, #FFD93D 50%, #4ECDC4 75%, #6C63FF 100%)' }}
      />
      <div aria-hidden="true" className="pointer-events-none absolute -top-32 -left-32 w-80 h-80 rounded-full bg-brand/15 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-indigo2/20 blur-3xl" />

      <div className="section py-12 grid md:grid-cols-12 gap-8 relative">
        <div className="md:col-span-4">
          <div className="flex items-center gap-2 mb-3">
            <button
              type="button"
              onClick={() => setLogoOpen(true)}
              aria-label="View logo"
              className="rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-300"
            >
              <img
                src="/logo.png"
                alt="Happy Little Leaders"
                className="w-10 h-10 rounded-2xl object-cover bg-white transition hover:scale-105"
              />
            </button>
            <div>
              <div className="font-display font-extrabold gradient-text">Happy Little Leaders</div>
              <div className="text-xs font-semibold text-teal-300">Born to Win</div>
            </div>
          </div>
          <p className="text-sm text-white/70">
            A premium preschool in Hyderabad nurturing curious minds through play-based learning, qualified teachers and a safe environment.
          </p>

          <div className="mt-5 flex items-center gap-3">
            {SOCIALS.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand grid place-items-center transition"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <h4 className="font-display font-bold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link to="/about" className="hover:text-gold">About</Link></li>
            <li><Link to="/programs" className="hover:text-gold">Programs</Link></li>
            <li><Link to="/admissions" className="hover:text-gold">Admissions</Link></li>
            <li><Link to="/gallery" className="hover:text-gold">Gallery</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
            <li><Link to="/login" className="hover:text-gold">Parent Login</Link></li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h4 className="font-display font-bold mb-3">Our Campuses</h4>
          <ul className="space-y-4 text-sm text-white/80">
            {BRANCHES.map((b) => (
              <li key={b.name}>
                <div className="font-semibold text-white">{b.short}</div>
                <div className="text-white/70 leading-snug">{b.address}</div>
                <a
                  href={b.directions}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-1 text-xs text-gold hover:text-orange-200"
                >
                  Open in Google Maps →
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-4 pt-4 border-t border-white/10 text-sm">
            <div className="font-semibold text-white mb-1">Phone</div>
            {PHONES.map((p) => (
              <a key={p} href={`tel:+91${p}`} className="block text-white/80 hover:text-gold">📞 {p}</a>
            ))}
          </div>
        </div>

        <div className="md:col-span-3">
          <h4 className="font-display font-bold mb-3">Working Hours</h4>
          <ul className="space-y-1.5 text-sm text-white/80">
            {HOURS.map((h) => (
              <li key={h.day} className="flex justify-between gap-3">
                <span>{h.day}</span>
                <span className="text-white">{h.time}</span>
              </li>
            ))}
          </ul>

          <h4 className="font-display font-bold mt-6 mb-2">Newsletter</h4>
          <p className="text-xs text-white/70 mb-2">Updates on events, admissions and parenting tips.</p>
          <form onSubmit={subscribe} className="flex gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="flex-1 rounded-full px-3 py-2 text-ink outline-none text-sm"
              aria-label="Email"
            />
            <button
              className="rounded-full px-4 py-2 font-bold text-sm text-white hover:scale-105 transition"
              style={{ background: 'linear-gradient(135deg, #FF6B6B 0%, #FF9F68 100%)', boxShadow: '0 10px 24px -10px rgba(255,107,107,0.55)' }}
            >Join</button>
          </form>
          {status && (
            <p className={`text-xs mt-2 ${status.ok ? 'text-emerald-300' : 'text-red-300'}`}>{status.msg}</p>
          )}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="section py-4 text-xs text-white/50 flex flex-col md:flex-row gap-2 md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Happy Little Leaders. All rights reserved.</span>
          <span>Designed with love for little learners.</span>
        </div>
      </div>

      <LogoLightbox open={logoOpen} onClose={() => setLogoOpen(false)} />
    </footer>
  );
}

function InstaIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
      <path d="M12 2.2c3.2 0 3.6 0 4.8.07 1.2.06 1.8.25 2.2.42.6.22 1 .5 1.4.9.4.4.68.8.9 1.4.17.4.36 1 .42 2.2.06 1.2.07 1.6.07 4.8s0 3.6-.07 4.8c-.06 1.2-.25 1.8-.42 2.2-.22.6-.5 1-.9 1.4-.4.4-.8.68-1.4.9-.4.17-1 .36-2.2.42-1.2.06-1.6.07-4.8.07s-3.6 0-4.8-.07c-1.2-.06-1.8-.25-2.2-.42-.6-.22-1-.5-1.4-.9-.4-.4-.68-.8-.9-1.4-.17-.4-.36-1-.42-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.8c.06-1.2.25-1.8.42-2.2.22-.6.5-1 .9-1.4.4-.4.8-.68 1.4-.9.4-.17 1-.36 2.2-.42C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.15 0-3.5 0-4.7.06-1.1.05-1.7.23-2.1.39-.5.2-.9.45-1.3.85-.4.4-.65.8-.85 1.3-.16.4-.34 1-.39 2.1-.06 1.2-.06 1.55-.06 4.7s0 3.5.06 4.7c.05 1.1.23 1.7.39 2.1.2.5.45.9.85 1.3.4.4.8.65 1.3.85.4.16 1 .34 2.1.39 1.2.06 1.55.06 4.7.06s3.5 0 4.7-.06c1.1-.05 1.7-.23 2.1-.39.5-.2.9-.45 1.3-.85.4-.4.65-.8.85-1.3.16-.4.34-1 .39-2.1.06-1.2.06-1.55.06-4.7s0-3.5-.06-4.7c-.05-1.1-.23-1.7-.39-2.1-.2-.5-.45-.9-.85-1.3-.4-.4-.8-.65-1.3-.85-.4-.16-1-.34-2.1-.39-1.2-.06-1.55-.06-4.7-.06zm0 3.06a4.94 4.94 0 1 1 0 9.88 4.94 4.94 0 0 1 0-9.88zm0 8.14a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4zm5.13-8.34a1.15 1.15 0 1 1 0-2.3 1.15 1.15 0 0 1 0 2.3z"/>
    </svg>
  );
}
function FbIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.86.26-1.45 1.5-1.45h1.6V4.46c-.27-.04-1.2-.12-2.27-.12-2.24 0-3.78 1.37-3.78 3.88V10.5H8v3h2.55V21h2.95z"/>
    </svg>
  );
}
function YtIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
      <path d="M21.6 7.2a2.5 2.5 0 0 0-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.83.43A2.5 2.5 0 0 0 2.4 7.2 26.1 26.1 0 0 0 2 12c0 1.6.14 3.2.4 4.8a2.5 2.5 0 0 0 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.83-.43a2.5 2.5 0 0 0 1.77-1.77c.26-1.6.4-3.2.4-4.8 0-1.6-.14-3.2-.4-4.8zM10 15V9l5.2 3-5.2 3z"/>
    </svg>
  );
}
function WaIcon() {
  return (
    <svg viewBox="0 0 32 32" className="w-4 h-4" fill="currentColor" aria-hidden="true">
      <path d="M26.6 5.4A14.6 14.6 0 0 0 5.27 24.59L4 30l5.59-1.46A14.6 14.6 0 1 0 26.6 5.4zM16 27.66a11.65 11.65 0 0 1-5.93-1.62l-.42-.25-3.31.87.88-3.23-.27-.43A11.66 11.66 0 1 1 16 27.66z"/>
      <path d="M19.11 17.27c-.27-.13-1.6-.79-1.85-.88-.25-.09-.43-.13-.61.13-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.13-1.13-.42-2.16-1.34-.8-.71-1.34-1.59-1.5-1.86-.16-.27-.02-.41.12-.55.13-.13.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.13-.61-1.47-.83-2.02-.22-.53-.45-.46-.61-.47h-.52c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.27s.97 2.63 1.11 2.81c.13.18 1.92 2.93 4.65 4.11.65.28 1.16.45 1.55.58.65.21 1.24.18 1.71.11.52-.08 1.6-.65 1.83-1.28.23-.63.23-1.18.16-1.28-.07-.1-.25-.16-.52-.29z"/>
    </svg>
  );
}
