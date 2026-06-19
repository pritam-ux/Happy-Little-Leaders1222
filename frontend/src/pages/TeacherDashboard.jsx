import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { api } from '../api.js';
import { Blob, Sparkle, GradientStripe } from '../components/Decor.jsx';

const TABS = [
  { id: 'attendance', label: '📅 Mark Attendance', gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FF9F68 100%)' },
  { id: 'announcement', label: '📣 Post Announcement', gradient: 'linear-gradient(135deg, #4ECDC4 0%, #6C63FF 100%)' },
  { id: 'updates', label: '✏️ Class Updates', gradient: 'linear-gradient(135deg, #FFD93D 0%, #FF9F68 100%)' },
];

export default function TeacherDashboard() {
  const { user } = useAuth();
  const [tab, setTab] = useState('attendance');
  const active = TABS.find((t) => t.id === tab);

  return (
    <>
      <GradientStripe />
      <section className="relative overflow-hidden bg-section-cool">
        <Blob tone="teal" size="w-80 h-80" className="-top-20 -left-20" />
        <Blob tone="leaf" size="w-72 h-72" className="-bottom-10 -right-20" style={{ animationDelay: '-5s' }} />

        <div className="section py-10 relative">
          <span className="chip-teal inline-flex items-center gap-2"><Sparkle size={12} /> Teacher</span>
          <h1 className="heading text-3xl mt-3">
            Welcome, <span className="gradient-text-cool">{user?.name?.split(' ')[0]}</span> 👩‍🏫
          </h1>
          <p className="text-ink/70 mt-1">{user?.classroom ? `Classroom: ${user.classroom}` : 'Manage your class'}</p>

          <div className="mt-6 flex gap-2 flex-wrap">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition ${
                  tab === t.id ? 'text-white' : 'bg-white border border-ink/10 text-ink/80 hover:border-teal/40'
                }`}
                style={tab === t.id ? { background: t.gradient, boxShadow: '0 18px 40px -16px rgba(31,42,68,0.35)' } : undefined}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="mt-6">
            {tab === 'attendance' && <AttendanceTab gradient={active.gradient} />}
            {tab === 'announcement' && <AnnouncementTab gradient={active.gradient} />}
            {tab === 'updates' && <UpdatesTab />}
          </div>
        </div>
      </section>
    </>
  );
}

function AttendanceTab({ gradient }) {
  const [students, setStudents] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [statuses, setStatuses] = useState({});
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    api('/users', { auth: true })
      .then((all) => setStudents(all.filter((u) => u.role === 'parent')))
      .catch(() => {
        setStudents([
          { id: 'demo-1', name: 'Aarav (demo)', childName: 'Aarav' },
          { id: 'demo-2', name: 'Diya (demo)', childName: 'Diya' },
        ]);
      });
  }, []);

  function setStatus(id, status) {
    setStatuses((s) => ({ ...s, [id]: status }));
  }

  async function save() {
    setMsg(null);
    const tasks = Object.entries(statuses).map(([studentId, status]) =>
      api('/attendance', { auth: true, method: 'POST', body: { studentId, date, status } })
    );
    try {
      await Promise.all(tasks);
      setMsg({ ok: true, msg: 'Attendance saved!' });
    } catch (err) {
      setMsg({ ok: false, msg: err.message });
    }
  }

  return (
    <div className="premium-card">
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <label className="label !mb-0">Date</label>
        <input type="date" className="input max-w-[200px]" value={date} onChange={(e) => setDate(e.target.value)} />
        <button onClick={save} className="btn-primary !py-2 !px-4 ml-auto">Save attendance</button>
      </div>
      <ul className="divide-y divide-ink/5">
        {students.length === 0 && <li className="py-4 text-ink/60 text-sm">No students yet. (Login as admin to seed users.)</li>}
        {students.map((s) => (
          <li key={s.id} className="py-3 flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl grid place-items-center text-lg text-white"
                   style={{ background: gradient }}>
                {(s.childName || s.name).charAt(0)}
              </div>
              <div>
                <div className="font-bold">{s.childName || s.name}</div>
                <div className="text-xs text-ink/60">Parent: {s.name}</div>
              </div>
            </div>
            <div className="flex gap-1">
              {[
                { st: 'present', cls: 'bg-emerald-500' },
                { st: 'absent', cls: 'bg-red-500' },
                { st: 'late', cls: 'bg-amber-500' },
              ].map(({ st, cls }) => (
                <button
                  key={st}
                  onClick={() => setStatus(s.id, st)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-full capitalize transition ${
                    statuses[s.id] === st ? `${cls} text-white shadow` : 'bg-ink/5 hover:bg-ink/10'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </li>
        ))}
      </ul>
      {msg && <p className={`text-sm mt-3 ${msg.ok ? 'text-emerald-700' : 'text-red-600'}`}>{msg.msg}</p>}
    </div>
  );
}

function AnnouncementTab() {
  const [form, setForm] = useState({ title: '', body: '', audience: 'parents' });
  const [items, setItems] = useState([]);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    api('/announcements', { auth: true }).then(setItems).catch(() => {});
  }, []);

  async function post(e) {
    e.preventDefault();
    setMsg(null);
    try {
      const created = await api('/announcements', { auth: true, method: 'POST', body: form });
      setItems([{ _id: created.id, ...form, createdAt: new Date().toISOString() }, ...items]);
      setForm({ title: '', body: '', audience: 'parents' });
      setMsg({ ok: true, msg: 'Posted!' });
    } catch (err) {
      setMsg({ ok: false, msg: err.message });
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <form onSubmit={post} className="premium-card space-y-3">
        <h3 className="heading text-lg flex items-center gap-2"><span>✏️</span> New announcement</h3>
        <div>
          <label className="label">Title</label>
          <input className="input" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        </div>
        <div>
          <label className="label">Audience</label>
          <select className="input" value={form.audience} onChange={(e) => setForm({ ...form, audience: e.target.value })}>
            <option value="all">Everyone</option>
            <option value="parents">Parents</option>
            <option value="teachers">Teachers</option>
          </select>
        </div>
        <div>
          <label className="label">Message</label>
          <textarea className="input min-h-[120px]" required value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} />
        </div>
        <button className="btn-cool w-full">Post announcement</button>
        {msg && <p className={`text-sm ${msg.ok ? 'text-emerald-700' : 'text-red-600'}`}>{msg.msg}</p>}
      </form>

      <div className="premium-card">
        <h3 className="heading text-lg mb-3 flex items-center gap-2"><span>📣</span> Recent announcements</h3>
        {items.length === 0 ? (
          <p className="text-ink/60 text-sm">Nothing posted yet.</p>
        ) : (
          <ul className="space-y-3 max-h-96 overflow-auto scroll-shadow pr-2">
            {items.map((n) => (
              <li key={n._id} className="rounded-2xl pl-4 pr-3 py-3"
                  style={{ background: 'linear-gradient(90deg, rgba(78,205,196,0.10), transparent)', borderLeft: '4px solid #4ECDC4' }}>
                <div className="font-bold">{n.title}</div>
                <div className="text-sm text-ink/70">{n.body}</div>
                <div className="text-xs text-ink/50 mt-1">to {n.audience}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

const UPDATES_STORE = 'hll_class_updates';

const CATEGORY_OPTIONS = [
  { key: 'theme', label: "Today's Theme", emoji: '🎨', gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FF9F68 100%)' },
  { key: 'story', label: 'Storytime', emoji: '📖', gradient: 'linear-gradient(135deg, #4ECDC4 0%, #6C63FF 100%)' },
  { key: 'music', label: 'Music & Dance', emoji: '🎵', gradient: 'linear-gradient(135deg, #FFD93D 0%, #FF9F68 100%)' },
  { key: 'art', label: 'Art & Craft', emoji: '🖌️', gradient: 'linear-gradient(135deg, #FF9F68 0%, #FFD93D 100%)' },
  { key: 'outdoor', label: 'Outdoor Play', emoji: '🌳', gradient: 'linear-gradient(135deg, #8BC34A 0%, #4ECDC4 100%)' },
  { key: 'snack', label: 'Snack / Meal', emoji: '🍎', gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FFD93D 100%)' },
  { key: 'note', label: 'Note to Parents', emoji: '📝', gradient: 'linear-gradient(135deg, #6C63FF 0%, #FF6B6B 100%)' },
];

function loadUpdates() {
  try { return JSON.parse(localStorage.getItem(UPDATES_STORE) || '[]'); } catch { return []; }
}
function saveUpdates(list) {
  try { localStorage.setItem(UPDATES_STORE, JSON.stringify(list)); } catch {}
}

function UpdatesTab() {
  const [items, setItems] = useState(loadUpdates);
  const [form, setForm] = useState({ title: '', body: '', category: 'theme', startTime: '', endTime: '' });
  const [editingId, setEditingId] = useState(null);
  const [msg, setMsg] = useState(null);

  function formatTimeRange(start, end) {
    if (!start && !end) return '';
    if (start && end) return `${start} – ${end}`;
    return start || end;
  }

  function persist(list) {
    setItems(list);
    saveUpdates(list);
  }

  function submit(e) {
    e.preventDefault();
    setMsg(null);
    if (!form.title.trim()) { setMsg({ ok: false, msg: 'Title is required' }); return; }
    if (editingId) {
      const updated = items.map((it) => it.id === editingId ? { ...it, ...form, updatedAt: new Date().toISOString() } : it);
      persist(updated);
      setMsg({ ok: true, msg: 'Update saved' });
    } else {
      const entry = { id: `cu-${Date.now()}-${Math.floor(Math.random() * 1000)}`, ...form, createdAt: new Date().toISOString() };
      persist([entry, ...items]);
      setMsg({ ok: true, msg: 'Update posted to parents' });
    }
    setForm({ title: '', body: '', category: 'theme', startTime: '', endTime: '' });
    setEditingId(null);
  }

  function edit(it) {
    setEditingId(it.id);
    setForm({
      title: it.title,
      body: it.body || '',
      category: it.category || 'note',
      startTime: it.startTime || '',
      endTime: it.endTime || '',
    });
    setMsg(null);
  }

  function cancelEdit() {
    setEditingId(null);
    setForm({ title: '', body: '', category: 'theme', startTime: '', endTime: '' });
  }

  function remove(id) {
    persist(items.filter((it) => it.id !== id));
  }

  function clearAll() {
    persist([]);
  }

  const activeCat = CATEGORY_OPTIONS.find((c) => c.key === form.category) || CATEGORY_OPTIONS[0];

  return (
    <div className="grid lg:grid-cols-5 gap-6">
      <form onSubmit={submit} className="premium-card space-y-3 lg:col-span-2">
        <h3 className="heading text-lg flex items-center gap-2">
          <span>{editingId ? '✏️' : '➕'}</span> {editingId ? 'Edit class update' : 'New class update'}
        </h3>

        <div>
          <label className="label">Category</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {CATEGORY_OPTIONS.map((c) => (
              <button
                type="button"
                key={c.key}
                onClick={() => setForm({ ...form, category: c.key })}
                className={`rounded-xl p-2 text-left text-xs font-bold transition ${form.category === c.key ? 'text-white' : 'bg-white border border-ink/10 text-ink/80 hover:border-teal/40'}`}
                style={form.category === c.key ? { background: c.gradient, boxShadow: '0 10px 24px -10px rgba(31,42,68,0.35)' } : undefined}
              >
                <span className="text-base mr-1">{c.emoji}</span>
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="label">Title</label>
          <input
            className="input"
            placeholder="e.g. Today's Theme: Colors"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label">Start time</label>
            <input
              type="time"
              className="input"
              value={form.startTime}
              onChange={(e) => setForm({ ...form, startTime: e.target.value })}
            />
          </div>
          <div>
            <label className="label">End time</label>
            <input
              type="time"
              className="input"
              value={form.endTime}
              onChange={(e) => setForm({ ...form, endTime: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="label">Details (optional)</label>
          <textarea
            className="input min-h-[110px]"
            placeholder="Add a short note for parents…"
            value={form.body}
            onChange={(e) => setForm({ ...form, body: e.target.value })}
          />
        </div>

        <div className="rounded-2xl p-4 text-white"
             style={{ background: activeCat.gradient, boxShadow: '0 18px 40px -16px rgba(31,42,68,0.35)' }}>
          <div className="flex items-start justify-between gap-2">
            <div className="text-xs font-bold uppercase opacity-90 flex items-center gap-1">
              {activeCat.emoji} {activeCat.label}
            </div>
            {(form.startTime || form.endTime) && (
              <div className="px-2 py-0.5 rounded-full bg-white/25 text-[10px] font-bold backdrop-blur whitespace-nowrap">
                🕒 {formatTimeRange(form.startTime, form.endTime)}
              </div>
            )}
          </div>
          <div className="font-display font-extrabold text-lg leading-tight mt-1">
            {form.title || 'Preview title'}
          </div>
          {form.body && <div className="text-sm opacity-95 mt-1">{form.body}</div>}
        </div>

        <div className="flex gap-2">
          <button className="btn-cool flex-1">{editingId ? 'Save changes' : 'Post update'}</button>
          {editingId && <button type="button" onClick={cancelEdit} className="btn-ghost">Cancel</button>}
        </div>
        {msg && <p className={`text-sm ${msg.ok ? 'text-emerald-700' : 'text-red-600'}`}>{msg.msg}</p>}
      </form>

      <div className="premium-card lg:col-span-3">
        <div className="flex items-center justify-between gap-3 mb-3">
          <h3 className="heading text-lg flex items-center gap-2"><span>📌</span> Posted updates</h3>
          {items.length > 0 && (
            <button onClick={clearAll} className="text-xs font-bold text-red-500 hover:text-red-700">Clear all</button>
          )}
        </div>
        {items.length === 0 ? (
          <p className="text-ink/60 text-sm">Nothing posted yet. Use the form on the left to share today's activities with parents.</p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-3">
            {items.map((it) => {
              const cat = CATEGORY_OPTIONS.find((c) => c.key === it.category) || CATEGORY_OPTIONS[CATEGORY_OPTIONS.length - 1];
              return (
                <div key={it.id} className="relative rounded-2xl p-4 text-white hover-lift"
                     style={{ background: cat.gradient, boxShadow: '0 18px 40px -16px rgba(31,42,68,0.35)' }}>
                  <div className="flex items-start justify-between gap-2 pr-16">
                    <div className="text-xs font-bold uppercase opacity-90 flex items-center gap-1">
                      {cat.emoji} {cat.label}
                    </div>
                    {(it.startTime || it.endTime) && (
                      <div className="px-2 py-0.5 rounded-full bg-white/25 text-[10px] font-bold backdrop-blur whitespace-nowrap">
                        🕒 {formatTimeRange(it.startTime, it.endTime)}
                      </div>
                    )}
                  </div>
                  <div className="font-display font-extrabold text-lg leading-tight mt-1">{it.title}</div>
                  {it.body && <div className="text-sm opacity-95 mt-1">{it.body}</div>}
                  <div className="text-[10px] opacity-80 mt-3">
                    {new Date(it.updatedAt || it.createdAt).toLocaleString()}
                    {it.updatedAt && <span className="ml-1">· edited</span>}
                  </div>
                  <div className="absolute top-2 right-2 flex gap-1">
                    <button
                      type="button"
                      onClick={() => edit(it)}
                      className="w-7 h-7 rounded-full bg-white/25 hover:bg-white/40 grid place-items-center text-xs"
                      aria-label="Edit update"
                    >✏️</button>
                    <button
                      type="button"
                      onClick={() => remove(it.id)}
                      className="w-7 h-7 rounded-full bg-white/25 hover:bg-white/40 grid place-items-center text-xs"
                      aria-label="Delete update"
                    >🗑</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
