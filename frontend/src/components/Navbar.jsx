import { useEffect, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import LogoLightbox from './LogoLightbox.jsx';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/programs', label: 'Programs' },
  { to: '/admissions', label: 'Admissions' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [logoOpen, setLogoOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 8); }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function handleLogout() {
    logout();
    navigate('/');
  }

  const dashboardPath =
    user?.role === 'admin'
      ? '/dashboard-admin'
      : user?.role === 'teacher'
      ? '/dashboard-teacher'
      : '/dashboard-parent';

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 backdrop-blur-xl border-b border-ink/5'
          : 'bg-white/70 backdrop-blur border-b border-transparent'
      }`}
      style={scrolled ? { boxShadow: '0 10px 30px -10px rgba(31,42,68,0.18)' } : undefined}
    >
      <div
        aria-hidden="true"
        className="h-0.5 w-full"
        style={{ background: 'linear-gradient(90deg, #FF6B6B 0%, #FF9F68 25%, #FFD93D 50%, #4ECDC4 75%, #6C63FF 100%)' }}
      />
      <div className={`section flex items-center justify-between transition-all ${scrolled ? 'py-2' : 'py-3'}`}>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setLogoOpen(true)}
            aria-label="View logo"
            className="relative rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand/40"
          >
            <span
              aria-hidden="true"
              className="absolute -inset-1 rounded-2xl blur-md opacity-50"
              style={{ background: 'linear-gradient(135deg, #FF6B6B 0%, #FFD93D 50%, #4ECDC4 100%)' }}
            />
            <img
              src="/logo.png"
              alt="Happy Little Leaders"
              className="relative w-10 h-10 rounded-2xl object-cover transition hover:scale-105"
              style={{ boxShadow: '0 18px 40px -12px rgba(255,107,107,0.45)' }}
            />
          </button>
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="font-display font-extrabold text-lg leading-none"
          >
            <span className="gradient-text">Happy Little Leaders</span>
            <span className="block text-xs font-semibold text-teal-600 mt-0.5">Born to Win</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `relative px-3 py-2 rounded-full text-sm font-semibold transition ${
                  isActive ? 'text-brand bg-brand/10' : 'hover:bg-ink/5 text-ink/80'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  <span
                    className={`pointer-events-none absolute left-3 right-3 -bottom-0.5 h-0.5 rounded-full origin-left transition-transform duration-300 ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                    style={{ background: 'linear-gradient(90deg, #FF6B6B, #FF9F68, #FFD93D)' }}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          {user ? (
            <>
              <Link to={dashboardPath} className="btn-secondary !py-2 !px-4 text-sm">
                {user.name?.split(' ')[0] || 'Dashboard'}
              </Link>
              <button onClick={handleLogout} className="btn-ghost !py-2 !px-3 text-sm">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-ghost !py-2 !px-4 text-sm">Login</Link>
              <Link to="/admissions" className="btn-primary !py-2 !px-4 text-sm">Enroll Now</Link>
            </>
          )}
        </div>

        <button
          aria-label="Toggle menu"
          className="md:hidden w-10 h-10 grid place-items-center rounded-xl border border-ink/10"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="text-2xl leading-none">{open ? '×' : '☰'}</span>
        </button>
      </div>

      <LogoLightbox open={logoOpen} onClose={() => setLogoOpen(false)} />

      {open && (
        <div className="md:hidden border-t border-ink/5 bg-white">
          <div className="section py-3 flex flex-col gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-xl font-semibold ${isActive ? 'bg-brand/10 text-brand' : 'hover:bg-ink/5'}`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <div className="flex gap-2 pt-2">
              {user ? (
                <>
                  <Link to={dashboardPath} onClick={() => setOpen(false)} className="btn-secondary flex-1 !py-2">My Dashboard</Link>
                  <button onClick={() => { setOpen(false); handleLogout(); }} className="btn-ghost !py-2">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setOpen(false)} className="btn-secondary flex-1 !py-2">Login</Link>
                  <Link to="/admissions" onClick={() => setOpen(false)} className="btn-primary flex-1 !py-2">Enroll</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
