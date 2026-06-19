import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { api } from '../api.js';
import { Blob, Sparkle, GradientStripe } from '../components/Decor.jsx';
import { buildGoogleCalendarUrl, display12h, freeSlot } from '../components/SlotBooking.jsx';

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'users', label: 'Users' },
  { id: 'inquiries', label: 'Inquiries' },
  { id: 'visits', label: 'Visits' },
  { id: 'announcements', label: 'Announcements' },
];

export default function AdminDashboard() {
  const { user } = useAuth();
  const [tab, setTab] = useState('overview');
  const [users, setUsers] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [visits, setVisits] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    Promise.all([
      api('/users', { auth: true }).catch(() => []),
      api('/inquiries', { auth: true }).catch(() => []),
      api('/visits', { auth: true }).catch(() => []),
      api('/announcements', { auth: true }).catch(() => []),
    ]).then(([u, i, v, a]) => {
      setUsers(u);
      setInquiries(i);
      setVisits(v);
      setAnnouncements(a);
    });
  }, []);

  const counts = {
    parents: users.filter((u) => u.role === 'parent').length,
    teachers: users.filter((u) => u.role === 'teacher').length,
    admins: users.filter((u) => u.role === 'admin').length,
  };

  return (
    <>
      <GradientStripe />
      <section className="relative overflow-hidden bg-section-indigo">
        <Blob tone="indigo" size="w-80 h-80" className="-top-20 -left-20" />
        <Blob tone="teal" size="w-72 h-72" className="-bottom-10 -right-20" style={{ animationDelay: '-5s' }} />
        <Blob tone="brand" size="w-64 h-64" className="top-1/3 right-1/4" style={{ animationDelay: '-3s' }} />

        <div className="section py-10 relative">
          <span className="chip-indigo inline-flex items-center gap-2"><Sparkle size={12} /> Administrator</span>
          <h1 className="heading text-3xl mt-3">
            Welcome, <span className="gradient-text-cool">{user?.name?.split(' ')[0]}</span> 🧑‍💼
          </h1>

          <div className="mt-6 flex gap-2 flex-wrap">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition capitalize ${
                  tab === t.id ? 'text-white' : 'bg-white border border-ink/10 text-ink/80 hover:border-indigo2/40'
                }`}
                style={tab === t.id ? { background: 'linear-gradient(135deg, #6C63FF 0%, #4ECDC4 100%)', boxShadow: '0 18px 40px -16px rgba(108,99,255,0.45)' } : undefined}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="mt-6">
            {tab === 'overview' && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Stat label="Parents" value={counts.parents} icon="👪" gradient="linear-gradient(135deg, #FF6B6B 0%, #FF9F68 100%)" />
                <Stat label="Teachers" value={counts.teachers} icon="👩‍🏫" gradient="linear-gradient(135deg, #4ECDC4 0%, #8BC34A 100%)" />
                <Stat label="Inquiries" value={inquiries.length} icon="📨" gradient="linear-gradient(135deg, #FFD93D 0%, #FF9F68 100%)" />
                <Stat label="Visit requests" value={visits.length} icon="📅" gradient="linear-gradient(135deg, #6C63FF 0%, #4ECDC4 100%)" />
              </div>
            )}

            {tab === 'users' && <UsersTab users={users} setUsers={setUsers} />}
            {tab === 'inquiries' && (
              <InquiriesTab
                items={inquiries}
                onDelete={async (id) => {
                  await api(`/inquiries/${id}`, { auth: true, method: 'DELETE' }).catch(() => {});
                  setInquiries((arr) => arr.filter((x) => x._id !== id));
                }}
              />
            )}
            {tab === 'visits' && (
              <VisitsTab
                items={[
                  ...visits.map((v) => ({ ...v, _origin: 'visits' })),
                  ...inquiries.filter((i) => i.intent === 'visit').map((i) => ({ ...i, _origin: 'inquiries' })),
                ]}
                onDelete={async (id, origin) => {
                  const pool = origin === 'inquiries' ? inquiries : visits;
                  const item = pool.find((x) => x._id === id);
                  const path = origin === 'inquiries' ? `/inquiries/${id}` : `/visits/${id}`;
                  await api(path, { auth: true, method: 'DELETE' }).catch(() => {});
                  if (origin === 'inquiries') {
                    setInquiries((arr) => arr.filter((x) => x._id !== id));
                  } else {
                    setVisits((arr) => arr.filter((x) => x._id !== id));
                  }
                  if (item?.source === 'slot-booking' && item.preferredDate && item.slotTime) {
                    freeSlot({ date: item.preferredDate, time: item.slotTime, campus: item.branch || item.campus });
                  }
                }}
              />
            )}
            {tab === 'announcements' && <AnnouncementsTab items={announcements} setItems={setAnnouncements} />}
          </div>
        </div>
      </section>
    </>
  );
}

function Stat({ label, value, icon, gradient }) {
  return (
    <div className="premium-card hover-lift">
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-2xl grid place-items-center text-2xl text-white"
             style={{ background: gradient, boxShadow: '0 18px 40px -16px rgba(31,42,68,0.35)' }}>
          {icon}
        </div>
        <div>
          <div className="text-sm text-ink/60 font-semibold">{label}</div>
          <div className="text-2xl font-display font-extrabold">{value}</div>
        </div>
      </div>
    </div>
  );
}

const ROLE_PILL = {
  admin: 'bg-indigo2/10 text-indigo2-600 ring-indigo2/30',
  teacher: 'bg-teal/10 text-teal-600 ring-teal/30',
  parent: 'bg-brand/10 text-brand ring-brand/30',
};

function UsersTab({ users, setUsers }) {
  async function changeRole(id, role) {
    try {
      const updated = await api(`/users/${id}/role`, { auth: true, method: 'PATCH', body: { role } });
      setUsers((arr) => arr.map((u) => (u.id === id ? { ...u, role: updated.role || role } : u)));
    } catch {
      setUsers((arr) => arr.map((u) => (u.id === id ? { ...u, role } : u)));
    }
  }
  async function remove(id) {
    if (!confirm('Delete this user?')) return;
    await api(`/users/${id}`, { auth: true, method: 'DELETE' }).catch(() => {});
    setUsers((arr) => arr.filter((u) => u.id !== id));
  }

  return (
    <div className="premium-card overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left text-ink/60 border-b border-ink/10">
            <th className="py-3 pr-4">Name</th>
            <th className="py-3 pr-4">Email</th>
            <th className="py-3 pr-4">Role</th>
            <th className="py-3 pr-4">Joined</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {users.length === 0 && (
            <tr><td colSpan={5} className="py-6 text-center text-ink/60">No users.</td></tr>
          )}
          {users.map((u) => (
            <tr key={u.id} className="border-t border-ink/5 hover:bg-ink/[0.02] transition">
              <td className="py-3 pr-4 font-bold">{u.name}</td>
              <td className="py-3 pr-4 text-ink/70">{u.email}</td>
              <td className="py-3 pr-4">
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ring-1 ${ROLE_PILL[u.role] || ''}`}>{u.role}</span>
              </td>
              <td className="py-3 pr-4 text-ink/60">{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}</td>
              <td className="py-3 flex gap-2">
                <select className="input !py-1 !px-2 text-xs max-w-[110px]" value={u.role} onChange={(e) => changeRole(u.id, e.target.value)}>
                  <option value="parent">parent</option>
                  <option value="teacher">teacher</option>
                  <option value="admin">admin</option>
                </select>
                <button onClick={() => remove(u.id)} className="text-red-500 text-xs font-bold hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const PROGRAM_ORDER = ['Playgroup', 'Nursery', 'LKG', 'UKG', 'Daycare', 'Other'];
const PROGRAM_THEME = {
  Playgroup: { gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FF9F68 100%)', accent: 'text-brand', icon: '🧸' },
  Nursery: { gradient: 'linear-gradient(135deg, #FF9F68 0%, #FFD93D 100%)', accent: 'text-amber-600', icon: '🎨' },
  LKG: { gradient: 'linear-gradient(135deg, #FFD93D 0%, #8BC34A 100%)', accent: 'text-leaf-600', icon: '📚' },
  UKG: { gradient: 'linear-gradient(135deg, #4ECDC4 0%, #6C63FF 100%)', accent: 'text-indigo2-600', icon: '🚀' },
  Daycare: { gradient: 'linear-gradient(135deg, #6C63FF 0%, #FF6B6B 100%)', accent: 'text-indigo2-600', icon: '🍼' },
  Other: { gradient: 'linear-gradient(135deg, #1F2A44 0%, #6C63FF 100%)', accent: 'text-ink', icon: '✉️' },
};

function groupByProgram(items) {
  const groups = {};
  for (const it of items) {
    const key = PROGRAM_ORDER.includes(it.program) ? it.program : 'Other';
    (groups[key] ||= []).push(it);
  }
  for (const k of Object.keys(groups)) {
    groups[k].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
  }
  return groups;
}

function InquiriesTab({ items, onDelete }) {
  const enquiries = items.filter((i) => i.intent !== 'visit');
  const visits = items.filter((i) => i.intent === 'visit');
  const groups = groupByProgram(enquiries);
  const sections = PROGRAM_ORDER.filter((p) => groups[p]?.length);

  if (enquiries.length === 0 && visits.length === 0) {
    return <div className="premium-card"><p className="text-ink/60 text-sm">No inquiries yet.</p></div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {PROGRAM_ORDER.map((p) => (
          <div key={p} className="rounded-2xl p-3 text-white text-center"
               style={{ background: PROGRAM_THEME[p].gradient, boxShadow: '0 14px 28px -14px rgba(31,42,68,0.35)' }}>
            <div className="text-lg">{PROGRAM_THEME[p].icon}</div>
            <div className="text-xl font-display font-extrabold leading-tight">{groups[p]?.length || 0}</div>
            <div className="text-[11px] font-semibold opacity-90 leading-tight">{p}</div>
          </div>
        ))}
      </div>

      {visits.length > 0 && (
        <ProgramSection
          title="Visit Bookings (via Enquiry Form)"
          count={visits.length}
          gradient="linear-gradient(135deg, #4ECDC4 0%, #6C63FF 100%)"
          icon="📅"
          items={visits}
          onDelete={onDelete}
        />
      )}

      {sections.map((p) => (
        <ProgramSection
          key={p}
          title={p}
          count={groups[p].length}
          gradient={PROGRAM_THEME[p].gradient}
          icon={PROGRAM_THEME[p].icon}
          items={groups[p]}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

function ProgramSection({ title, count, gradient, icon, items, onDelete }) {
  return (
    <div className="premium-card">
      <div className="flex items-center gap-3 mb-4">
        <span className="w-10 h-10 rounded-2xl grid place-items-center text-white text-xl"
              style={{ background: gradient, boxShadow: '0 14px 28px -14px rgba(31,42,68,0.35)' }}>
          {icon}
        </span>
        <h3 className="heading text-lg">{title}</h3>
        <span className="ml-auto px-3 py-1 rounded-full text-xs font-bold text-white"
              style={{ background: gradient }}>{count}</span>
      </div>
      <ul className="divide-y divide-ink/5">
        {items.map((i) => (
          <li key={i._id} className="py-3">
            <div className="flex justify-between gap-3 flex-wrap">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl grid place-items-center text-white text-sm font-bold flex-shrink-0"
                     style={{ background: gradient }}>
                  {i.name?.[0]?.toUpperCase() || 'I'}
                </div>
                <div>
                  <div className="font-bold">
                    {i.name}
                    {i.phone && <> · <a href={`tel:${i.phone}`} className="text-sm font-normal text-ink/50 hover:text-brand transition">{i.phone}</a></>}
                  </div>
                  {(i.childName || i.childAge) && (
                    <div className="text-xs text-ink/60">
                      Child: <b className="text-ink">{i.childName || '—'}</b>{i.childAge && <> · {i.childAge} yrs</>}
                    </div>
                  )}
                  {i.message && <div className="text-sm text-ink/70 mt-0.5">{i.message}</div>}
                  <div className="text-xs text-ink/50 mt-1 flex flex-wrap gap-x-3 gap-y-0.5">
                    {i.email && <span>📧 {i.email}</span>}
                    {i.campus && <span>📍 <b className="text-teal-600">{i.campus}</b></span>}
                    {i.createdAt && <span>🕒 {new Date(i.createdAt).toLocaleString()}</span>}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="flex gap-1">
                  {i.source && <span className="chip-gold !text-[10px] h-fit">{i.source}</span>}
                  {i.intent === 'visit' && <span className="chip-teal !text-[10px] h-fit">visit</span>}
                </div>
                {onDelete && (
                  <button
                    type="button"
                    onClick={() => onDelete(i._id)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold text-red-600 bg-red-50 hover:bg-red-100 transition"
                    aria-label="Delete inquiry"
                  >
                    🗑 Delete
                  </button>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function VisitsTab({ items, onDelete }) {
  const slot = items.filter((i) => i.source === 'slot-booking');
  const other = items.filter((i) => i.source !== 'slot-booking');
  slot.sort((a, b) => new Date(a.preferredDate + 'T' + (a.slotTime || '00:00')) - new Date(b.preferredDate + 'T' + (b.slotTime || '00:00')));

  if (items.length === 0) {
    return <div className="premium-card"><p className="text-ink/60 text-sm">No visit requests yet.</p></div>;
  }

  return (
    <div className="space-y-6">
      {slot.length > 0 && (
        <div className="premium-card">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-10 h-10 rounded-2xl grid place-items-center text-white text-xl"
                  style={{ background: 'linear-gradient(135deg, #FF6B6B 0%, #FFD93D 100%)' }}>🎯</span>
            <h3 className="heading text-lg">Slot Bookings</h3>
            <span className="ml-auto px-3 py-1 rounded-full text-xs font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #FF6B6B 0%, #FFD93D 100%)' }}>{slot.length}</span>
          </div>
          <ul className="grid sm:grid-cols-2 gap-3">
            {slot.map((i) => <SlotRow key={i._id} item={i} onDelete={onDelete} />)}
          </ul>
        </div>
      )}

      {other.length > 0 && (
        <div className="premium-card">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-10 h-10 rounded-2xl grid place-items-center text-white text-xl"
                  style={{ background: 'linear-gradient(135deg, #6C63FF 0%, #4ECDC4 100%)' }}>📅</span>
            <h3 className="heading text-lg">Other Visit Requests</h3>
            <span className="ml-auto px-3 py-1 rounded-full text-xs font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #6C63FF 0%, #4ECDC4 100%)' }}>{other.length}</span>
          </div>
          <ul className="divide-y divide-ink/5">
            {other.map((i) => <VisitRow key={i._id} item={i} onDelete={onDelete} />)}
          </ul>
        </div>
      )}
    </div>
  );
}

function SlotRow({ item: i, onDelete }) {
  const gcal = buildGoogleCalendarUrl({
    date: i.preferredDate,
    time: i.slotTime || '10:00',
    campus: i.branch || i.campus || 'Chintalkunta',
    parentName: i.name,
    childName: i.childName,
    phone: i.phone,
  });
  const niceDate = i.preferredDate ? new Date(i.preferredDate).toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' }) : '';
  return (
    <li className="relative rounded-2xl p-4 ring-1 ring-brand/20"
        style={{ background: 'linear-gradient(135deg, rgba(255,107,107,0.07) 0%, rgba(255,217,61,0.07) 100%)' }}>
      <div className="flex items-start gap-3">
        <div className="w-11 h-11 rounded-2xl grid place-items-center text-white text-sm font-bold flex-shrink-0"
             style={{ background: 'linear-gradient(135deg, #FF6B6B 0%, #FFD93D 100%)' }}>
          {i.name?.[0]?.toUpperCase() || 'S'}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-bold">{i.name}</div>
          {i.childName && <div className="text-xs text-ink/60">Child: <b className="text-ink">{i.childName}</b></div>}
          <a href={`tel:${i.phone}`} className="text-xs text-ink/60 hover:text-brand transition">📞 {i.phone}</a>
        </div>
      </div>
      <div className="mt-3 rounded-xl p-2.5 text-white"
           style={{ background: 'linear-gradient(135deg, #FF6B6B 0%, #FF9F68 100%)' }}>
        <div className="flex items-center justify-between gap-2 text-xs">
          <span className="font-bold">🕒 {display12h(i.slotTime) || '—'}</span>
          <span className="opacity-90">📍 {i.branch || i.campus}</span>
        </div>
        <div className="font-display font-extrabold text-base leading-tight">{niceDate}</div>
      </div>
      <div className="mt-3 flex gap-2">
        <a
          href={gcal}
          target="_blank"
          rel="noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 rounded-full text-xs font-bold text-white"
          style={{ background: 'linear-gradient(135deg, #4ECDC4 0%, #6C63FF 100%)', boxShadow: '0 12px 24px -10px rgba(78,205,196,0.55)' }}
        >
          📅 Add to Google Calendar
        </a>
        {onDelete && (
          <button
            type="button"
            onClick={() => onDelete(i._id, i._origin)}
            className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-full text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 transition"
            aria-label="Unbook slot"
            title="Unbook this slot"
          >🗑 Unbook</button>
        )}
      </div>
    </li>
  );
}

function VisitRow({ item: i, onDelete }) {
  const gcal = i.preferredDate ? buildGoogleCalendarUrl({
    date: i.preferredDate,
    time: i.slotTime || '10:00',
    campus: i.branch || i.campus || 'Chintalkunta',
    parentName: i.name,
    childName: i.childName,
    phone: i.phone,
  }) : null;
  return (
    <li className="py-3 flex justify-between gap-3 flex-wrap items-center">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl grid place-items-center text-white text-sm font-bold"
             style={{ background: 'linear-gradient(135deg, #6C63FF 0%, #4ECDC4 100%)' }}>
          {i.name?.[0] || 'V'}
        </div>
        <div>
          <div className="font-bold">{i.name} · <a href={`tel:${i.phone}`} className="text-sm font-normal text-ink/50 hover:text-brand transition">{i.phone}</a></div>
          <div className="text-sm text-ink/70">{i.notes || i.message || 'No notes'}</div>
          {i._origin === 'inquiries' && (
            <div className="text-[10px] text-ink/50 mt-0.5">via enquiry form</div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3 flex-wrap justify-end">
        <div className="text-right text-sm">
          <div className="font-bold text-brand">{i.preferredDate || (i.createdAt && new Date(i.createdAt).toLocaleDateString())}</div>
          <div className="text-ink/60">{i.branch || i.campus}</div>
        </div>
        {gcal && (
          <a href={gcal} target="_blank" rel="noreferrer"
             className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold text-white"
             style={{ background: 'linear-gradient(135deg, #4ECDC4 0%, #6C63FF 100%)' }}>
            📅 Calendar
          </a>
        )}
        {onDelete && (
          <button
            type="button"
            onClick={() => onDelete(i._id, i._origin)}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold text-red-600 bg-red-50 hover:bg-red-100 transition"
            aria-label="Delete visit request"
          >🗑 Delete</button>
        )}
      </div>
    </li>
  );
}

function AnnouncementsTab({ items, setItems }) {
  const [form, setForm] = useState({ title: '', body: '', audience: 'all' });
  async function post(e) {
    e.preventDefault();
    try {
      const created = await api('/announcements', { auth: true, method: 'POST', body: form });
      setItems([{ _id: created.id, ...form, createdAt: new Date().toISOString() }, ...items]);
      setForm({ title: '', body: '', audience: 'all' });
    } catch {}
  }
  async function remove(id) {
    if (!confirm('Delete announcement?')) return;
    await api(`/announcements/${id}`, { auth: true, method: 'DELETE' }).catch(() => {});
    setItems(items.filter((i) => i._id !== id));
  }
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <form onSubmit={post} className="premium-card space-y-3">
        <h3 className="heading text-lg flex items-center gap-2"><span>✏️</span> New announcement</h3>
        <input className="input" placeholder="Title" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <select className="input" value={form.audience} onChange={(e) => setForm({ ...form, audience: e.target.value })}>
          <option value="all">Everyone</option>
          <option value="parents">Parents</option>
          <option value="teachers">Teachers</option>
        </select>
        <textarea className="input min-h-[120px]" placeholder="Body" required value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} />
        <button className="btn-cool w-full">Post</button>
      </form>
      <div className="premium-card">
        <h3 className="heading text-lg mb-3 flex items-center gap-2"><span>📣</span> All announcements</h3>
        {items.length === 0 ? (
          <p className="text-ink/60 text-sm">None yet.</p>
        ) : (
          <ul className="space-y-3">
            {items.map((n) => (
              <li key={n._id} className="rounded-2xl pl-4 pr-3 py-3 flex justify-between gap-3"
                  style={{ background: 'linear-gradient(90deg, rgba(108,99,255,0.08), transparent)', borderLeft: '4px solid #6C63FF' }}>
                <div>
                  <div className="font-bold">{n.title}</div>
                  <div className="text-sm text-ink/70">{n.body}</div>
                </div>
                <button onClick={() => remove(n._id)} className="text-red-500 text-xs font-bold hover:underline">Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
