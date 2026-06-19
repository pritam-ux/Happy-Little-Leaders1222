import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { api } from '../api.js';
import { Blob, Sparkle, GradientStripe } from '../components/Decor.jsx';

export default function ParentDashboard() {
  const { user } = useAuth();
  const [attendance, setAttendance] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [reports, setReports] = useState([]);
  const [err, setErr] = useState(null);

  useEffect(() => {
    Promise.all([
      api('/attendance', { auth: true }).catch((e) => { setErr(e.message); return []; }),
      api('/announcements', { auth: true }).catch(() => []),
      api('/reports', { auth: true }).catch(() => []),
    ]).then(([a, n, r]) => {
      setAttendance(a);
      setAnnouncements(n);
      setReports(r);
    });
  }, []);

  const present = attendance.filter((a) => a.status === 'present').length;
  const total = attendance.length;
  const pct = total ? Math.round((present / total) * 100) : 0;

  return (
    <>
      <GradientStripe />
      <section className="relative overflow-hidden bg-section-warm">
        <Blob tone="brand" size="w-80 h-80" className="-top-20 -left-20" />
        <Blob tone="gold" size="w-72 h-72" className="-bottom-10 -right-20" style={{ animationDelay: '-5s' }} />

        <div className="section py-10 relative">
          <Header user={user} subtitle={user?.childName ? `Tracking ${user.childName}` : 'Parent dashboard'} />

          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <Stat label="Attendance" value={`${pct}%`} hint={`${present}/${total} days`} icon="📅" gradient="linear-gradient(135deg, #FF6B6B 0%, #FF9F68 100%)" />
            <Stat label="Announcements" value={announcements.length} hint="Recent updates" icon="📣" gradient="linear-gradient(135deg, #4ECDC4 0%, #6C63FF 100%)" />
            <Stat label="Reports" value={reports.length} hint="Progress reports" icon="📈" gradient="linear-gradient(135deg, #FFD93D 0%, #FF9F68 100%)" />
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <Card title="Recent attendance" icon="🗓️" tone="brand">
              {attendance.length === 0 ? (
                <p className="text-ink/60 text-sm">No attendance records yet.</p>
              ) : (
                <ul className="divide-y divide-ink/5">
                  {attendance.slice(0, 8).map((a) => (
                    <li key={a._id} className="flex justify-between items-center py-2.5 text-sm">
                      <span className="font-medium">{a.date}</span>
                      <StatusPill status={a.status} />
                    </li>
                  ))}
                </ul>
              )}
            </Card>

            <Card title="Announcements" icon="📣" tone="indigo">
              {announcements.length === 0 ? (
                <p className="text-ink/60 text-sm">No announcements right now.</p>
              ) : (
                <ul className="space-y-3">
                  {announcements.map((n) => (
                    <li key={n._id} className="rounded-2xl pl-4 pr-3 py-3"
                        style={{ background: 'linear-gradient(90deg, rgba(108,99,255,0.08), transparent)', borderLeft: '4px solid #6C63FF' }}>
                      <div className="font-bold">{n.title}</div>
                      <div className="text-sm text-ink/70 mt-0.5">{n.body}</div>
                      <div className="text-xs text-ink/50 mt-1">{new Date(n.createdAt).toLocaleDateString()}</div>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          </div>

          <div className="mt-8">
            <Card title="Progress reports" icon="📈" tone="gold">
              {reports.length === 0 ? (
                <p className="text-ink/60 text-sm">Reports will appear here once teachers publish them.</p>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  {reports.map((r) => (
                    <div key={r._id} className="rounded-2xl p-5 ring-1 ring-ink/5 bg-white/70 backdrop-blur hover-lift">
                      <div className="font-display font-extrabold text-lg gradient-text">{r.term}</div>
                      <p className="text-sm text-ink/70 mt-1">{r.summary}</p>
                      {r.skills && (
                        <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs mt-3">
                          {Object.entries(r.skills).map(([k, v]) => (
                            <div key={k} className="flex justify-between">
                              <span className="capitalize text-ink/70">{k}</span>
                              <span className="text-amber-500 font-bold">{'★'.repeat(v)}<span className="text-ink/20">{'★'.repeat(5 - v)}</span></span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>

          {err && <p className="text-sm text-red-600 mt-4">{err}</p>}
        </div>
      </section>
    </>
  );
}

function Header({ user, subtitle }) {
  return (
    <div className="flex items-end justify-between flex-wrap gap-4">
      <div>
        <span className="chip">Welcome</span>
        <h1 className="heading text-3xl mt-2">
          Hi <span className="gradient-text">{user?.name?.split(' ')[0]}</span> 👋
        </h1>
        <p className="text-ink/70 mt-1">{subtitle}</p>
      </div>
    </div>
  );
}

function Stat({ label, value, hint, icon, gradient }) {
  return (
    <div className="premium-card hover-lift">
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-2xl grid place-items-center text-2xl text-white flex-shrink-0"
             style={{ background: gradient, boxShadow: '0 18px 40px -16px rgba(31,42,68,0.35)' }}>
          {icon}
        </div>
        <div>
          <div className="text-sm text-ink/60 font-semibold">{label}</div>
          <div className="text-2xl font-display font-extrabold">{value}</div>
          <div className="text-xs text-ink/50">{hint}</div>
        </div>
      </div>
    </div>
  );
}

const CARD_TONE = {
  brand: { bg: 'bg-brand/10', text: 'text-brand', ring: 'ring-brand/30' },
  indigo: { bg: 'bg-indigo2/10', text: 'text-indigo2-600', ring: 'ring-indigo2/30' },
  gold: { bg: 'bg-gold/15', text: 'text-amber-600', ring: 'ring-gold/40' },
  teal: { bg: 'bg-teal/10', text: 'text-teal-600', ring: 'ring-teal/30' },
};

function Card({ title, icon, tone = 'brand', children }) {
  const t = CARD_TONE[tone];
  return (
    <div className="premium-card">
      <div className="flex items-center gap-3 mb-3">
        <span className={`w-10 h-10 rounded-2xl grid place-items-center text-lg ring-2 ${t.bg} ${t.ring}`}>{icon}</span>
        <h2 className="heading text-lg">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function StatusPill({ status }) {
  const map = {
    present: { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Present' },
    absent: { bg: 'bg-red-100', text: 'text-red-700', label: 'Absent' },
    late: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Late' },
  };
  const s = map[status] || { bg: 'bg-ink/5', text: 'text-ink/60', label: status };
  return <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${s.bg} ${s.text}`}>{s.label}</span>;
}
