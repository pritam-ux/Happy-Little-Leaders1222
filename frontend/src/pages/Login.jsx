import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { Blob, Sparkle, GradientStripe } from '../components/Decor.jsx';

const roleHome = {
  admin: '/dashboard-admin',
  teacher: '/dashboard-teacher',
  parent: '/dashboard-parent',
};

const ROLES = [
  { role: 'parent', icon: '👪', desc: 'Track progress, attendance & announcements', gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FF9F68 100%)' },
  { role: 'teacher', icon: '👩‍🏫', desc: 'Mark attendance, post updates & manage class', gradient: 'linear-gradient(135deg, #4ECDC4 0%, #8BC34A 100%)' },
  { role: 'admin', icon: '🧑‍💼', desc: 'Manage users, announcements & reports', gradient: 'linear-gradient(135deg, #6C63FF 0%, #4ECDC4 100%)' },
];

export default function Login() {
  const { user, login, register, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'parent', childName: '' });
  const [error, setError] = useState(null);

  if (user) {
    return <Navigate to={location.state?.from?.pathname || roleHome[user.role]} replace />;
  }

  async function submit(e) {
    e.preventDefault();
    setError(null);
    try {
      const u = mode === 'login'
        ? await login(form.email, form.password)
        : await register(form);
      navigate(roleHome[u.role]);
    } catch (err) {
      setError(err.message);
    }
  }

  function fillDemo(role) {
    const map = {
      parent: { email: 'parent@hll.com', password: 'parent123' },
      teacher: { email: 'teacher@hll.com', password: 'teacher123' },
      admin: { email: 'admin@hll.com', password: 'admin123' },
    };
    setMode('login');
    setForm({ ...form, email: map[role].email, password: map[role].password });
  }

  return (
    <>
      <GradientStripe />
      <section className="relative overflow-hidden bg-section-warm">
        <Blob tone="brand" size="w-80 h-80" className="-top-20 -left-20" />
        <Blob tone="indigo" size="w-72 h-72" className="-bottom-10 -right-20" style={{ animationDelay: '-5s' }} />
        <Blob tone="gold" size="w-64 h-64" className="top-1/3 right-1/4" style={{ animationDelay: '-2s' }} />

        <div className="section py-16 grid md:grid-cols-2 gap-8 items-center relative">
          <div className="hidden md:block">
            <span className="chip-teal inline-flex items-center gap-2"><Sparkle size={12} /> Login Portal</span>
            <h1 className="heading text-4xl mt-4">
              Welcome back to <span className="gradient-text">HLL</span>
            </h1>
            <p className="mt-3 text-ink/70 max-w-md">
              Parents, teachers and admins — sign in to access dashboards, attendance, announcements and more.
            </p>
            <div className="mt-8 grid gap-3 max-w-md">
              {ROLES.map((r) => (
                <button
                  type="button"
                  key={r.role}
                  onClick={() => fillDemo(r.role)}
                  className="premium-card flex items-center gap-3 !p-4 text-left hover-lift cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-2xl grid place-items-center text-2xl text-white"
                       style={{ background: r.gradient, boxShadow: '0 14px 30px -10px rgba(31,42,68,0.35)' }}>
                    {r.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-display font-extrabold capitalize">{r.role}</div>
                    <div className="text-sm text-ink/70">{r.desc}</div>
                  </div>
                  <span className="text-xs font-bold text-brand">Use →</span>
                </button>
              ))}
            </div>
          </div>

          <div className="premium-card relative">
            <div className="absolute -top-3 -right-3 w-12 h-12 rounded-2xl grid place-items-center text-white animate-pulseSoft"
                 style={{ background: 'linear-gradient(135deg, #FF6B6B 0%, #FFD93D 100%)' }}>
              <Sparkle size={20} />
            </div>

            <div className="flex bg-ink/5 rounded-full p-1 text-sm font-bold mb-5">
              <button
                type="button"
                onClick={() => setMode('login')}
                className={`flex-1 py-2 rounded-full transition ${mode === 'login' ? 'bg-white text-brand' : 'text-ink/60'}`}
                style={mode === 'login' ? { boxShadow: '0 8px 20px -8px rgba(255,107,107,0.4)' } : undefined}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setMode('register')}
                className={`flex-1 py-2 rounded-full transition ${mode === 'register' ? 'bg-white text-indigo2-600' : 'text-ink/60'}`}
                style={mode === 'register' ? { boxShadow: '0 8px 20px -8px rgba(108,99,255,0.4)' } : undefined}
              >
                Register
              </button>
            </div>

            <form onSubmit={submit} className="space-y-3">
              {mode === 'register' && (
                <>
                  <div>
                    <label className="label">Full name</label>
                    <input className="input" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="label">Role</label>
                      <select className="input" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                        <option value="parent">Parent</option>
                        <option value="teacher">Teacher</option>
                      </select>
                    </div>
                    {form.role === 'parent' && (
                      <div>
                        <label className="label">Child's name</label>
                        <input className="input" value={form.childName} onChange={(e) => setForm({ ...form, childName: e.target.value })} />
                      </div>
                    )}
                  </div>
                </>
              )}
              <div>
                <label className="label">Email</label>
                <input type="email" required className="input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <div>
                <label className="label">Password</label>
                <input type="password" required className="input" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
              </div>
              <button disabled={loading} className="btn-primary w-full">
                {loading ? 'Please wait…' : mode === 'login' ? 'Login' : 'Create account'}
              </button>
              {error && <p className="text-sm text-red-600 bg-red-50 rounded-xl px-3 py-2">{error}</p>}
            </form>

            <div className="mt-5 rounded-2xl p-4"
                 style={{ background: 'linear-gradient(135deg, rgba(255,217,61,0.18) 0%, rgba(255,159,104,0.14) 100%)', border: '1px dashed rgba(255,107,107,0.3)' }}>
              <div className="text-xs font-bold uppercase tracking-wider text-brand mb-2 flex items-center gap-2">
                <Sparkle size={12} /> Demo accounts
              </div>
              <div className="space-y-1 text-xs text-ink/80">
                <button type="button" onClick={() => fillDemo('parent')} className="block w-full text-left hover:text-brand transition">
                  👪 <span className="font-mono">parent@hll.com / parent123</span>
                </button>
                <button type="button" onClick={() => fillDemo('teacher')} className="block w-full text-left hover:text-teal-600 transition">
                  👩‍🏫 <span className="font-mono">teacher@hll.com / teacher123</span>
                </button>
                <button type="button" onClick={() => fillDemo('admin')} className="block w-full text-left hover:text-indigo2-600 transition">
                  🧑‍💼 <span className="font-mono">admin@hll.com / admin123</span>
                </button>
              </div>
              <p className="text-[10px] text-ink/50 mt-2">
                Click to autofill. Or use any email — the password decides the role: it must contain <b>admin</b>, <b>teacher</b>, or <b>parent</b>.
              </p>
            </div>

            <p className="text-xs text-center mt-5 text-ink/60">
              New to HLL? <Link to="/admissions" className="text-brand font-bold">Apply for admission</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
