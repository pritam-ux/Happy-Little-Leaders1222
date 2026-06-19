const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const DEMO_TOKEN = 'demo-mode-token';

const STORE_INQUIRIES = 'hll_demo_inquiries';
const STORE_VISITS = 'hll_demo_visits';
const STORE_INQUIRIES_DEL = 'hll_demo_inquiries_deleted';
const STORE_VISITS_DEL = 'hll_demo_visits_deleted';

function getToken() {
  return localStorage.getItem('hll_token');
}

function isDemo() {
  return getToken() === DEMO_TOKEN;
}

function today(offset = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString().slice(0, 10);
}

function readStore(key) {
  try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch { return []; }
}
function writeStore(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}
function appendStore(key, item) {
  const list = readStore(key);
  const entry = { _id: `live-${Date.now()}-${Math.floor(Math.random() * 1000)}`, createdAt: new Date().toISOString(), ...item };
  list.unshift(entry);
  writeStore(key, list);
  return entry;
}

const demoData = {
  '/auth/me': () => ({ user: JSON.parse(localStorage.getItem('hll_user') || 'null') }),
  '/attendance': () => [
    { _id: 'a1', date: today(-1), status: 'present', classroom: 'Nursery A' },
    { _id: 'a2', date: today(-2), status: 'present', classroom: 'Nursery A' },
    { _id: 'a3', date: today(-3), status: 'late', classroom: 'Nursery A' },
    { _id: 'a4', date: today(-4), status: 'present', classroom: 'Nursery A' },
    { _id: 'a5', date: today(-5), status: 'absent', classroom: 'Nursery A' },
    { _id: 'a6', date: today(-6), status: 'present', classroom: 'Nursery A' },
    { _id: 'a7', date: today(-7), status: 'present', classroom: 'Nursery A' },
  ],
  '/announcements': () => [
    { _id: 'n1', title: 'Welcome to the new term!', body: "Classes resume on Monday. Please pack your child's water bottle.", audience: 'all', createdAt: new Date().toISOString() },
    { _id: 'n2', title: 'Annual Day Practice', body: 'Practice sessions begin next week for our annual day performance.', audience: 'parents', createdAt: new Date(Date.now() - 86400000).toISOString() },
    { _id: 'n3', title: 'Parent–Teacher Meet', body: 'Schedule will be shared by the end of this week.', audience: 'all', createdAt: new Date(Date.now() - 172800000).toISOString() },
  ],
  '/reports': () => [
    { _id: 'r1', term: 'Term 1', summary: 'Aarav has shown great progress in vocabulary and storytelling.', skills: { reading: 4, writing: 3, math: 4, art: 5, social: 5 } },
    { _id: 'r2', term: 'Term 2', summary: 'Excellent confidence in show-and-tell. Number sense is improving.', skills: { reading: 4, writing: 4, math: 4, art: 5, social: 5 } },
  ],
  '/users': () => [
    { id: 'demo-admin', name: 'Admin User', email: 'admin@hll.com', role: 'admin', createdAt: new Date().toISOString() },
    { id: 'demo-teacher', name: 'Teacher Priya', email: 'teacher@hll.com', role: 'teacher', classroom: 'Nursery A', createdAt: new Date().toISOString() },
    { id: 'demo-parent-1', name: 'Parent Ravi', email: 'parent@hll.com', role: 'parent', childName: 'Aarav', createdAt: new Date().toISOString() },
    { id: 'demo-parent-2', name: 'Sneha R.', email: 'sneha@example.com', role: 'parent', childName: 'Diya', createdAt: new Date().toISOString() },
    { id: 'demo-parent-3', name: 'Arjun K.', email: 'arjun@example.com', role: 'parent', childName: 'Vivaan', createdAt: new Date().toISOString() },
  ],
  '/inquiries': () => {
    const dead = new Set(readStore(STORE_INQUIRIES_DEL));
    return [
      ...readStore(STORE_INQUIRIES).filter((x) => !dead.has(x._id)),
      { _id: 'i1', name: 'Priya M.', phone: '9876543210', message: 'Interested in Nursery for my 3-year-old.', program: 'Nursery', childAge: '3', source: 'admissions', campus: 'Chintalkunta', createdAt: new Date(Date.now() - 86400000).toISOString() },
      { _id: 'i2', name: 'Ramesh G.', phone: '9123456780', message: 'Need daycare details for working parents.', program: 'Daycare', childAge: '2.5', source: 'contact', campus: 'Vanasthalipuram', createdAt: new Date(Date.now() - 172800000).toISOString() },
    ].filter((x) => !dead.has(x._id));
  },
  '/visits': () => {
    const dead = new Set(readStore(STORE_VISITS_DEL));
    return [
      ...readStore(STORE_VISITS).filter((x) => !dead.has(x._id)),
      { _id: 'v1', name: 'Lakshmi V.', phone: '9988776655', preferredDate: today(2), branch: 'Chintalkunta', notes: 'Visiting with my husband.', createdAt: new Date(Date.now() - 86400000).toISOString() },
      { _id: 'v2', name: 'Rohit S.', phone: '9001122334', preferredDate: today(5), branch: 'Vanasthalipuram', notes: 'Daycare tour please.', createdAt: new Date(Date.now() - 259200000).toISOString() },
    ].filter((x) => !dead.has(x._id));
  },
};

function markDeleted(storeKey, deletedKey, id) {
  const stored = readStore(storeKey);
  if (stored.some((x) => x._id === id)) {
    writeStore(storeKey, stored.filter((x) => x._id !== id));
  } else {
    const dead = readStore(deletedKey);
    if (!dead.includes(id)) {
      dead.push(id);
      writeStore(deletedKey, dead);
    }
  }
}

function mockResponse(path, method, body) {
  if (method === 'POST' && path === '/inquiries') {
    const entry = appendStore(STORE_INQUIRIES, body || {});
    return { ok: true, id: entry._id };
  }
  if (method === 'POST' && path === '/visits') {
    const entry = appendStore(STORE_VISITS, body || {});
    return { ok: true, id: entry._id };
  }
  if (method === 'POST' && (path === '/newsletter' || path === '/attendance' || path === '/announcements' || path === '/reports')) {
    return { ok: true, id: `demo-${Date.now()}`, ...body };
  }

  const inqDel = path.match(/^\/inquiries\/(.+)$/);
  if (method === 'DELETE' && inqDel) {
    markDeleted(STORE_INQUIRIES, STORE_INQUIRIES_DEL, inqDel[1]);
    return { ok: true };
  }
  const visDel = path.match(/^\/visits\/(.+)$/);
  if (method === 'DELETE' && visDel) {
    markDeleted(STORE_VISITS, STORE_VISITS_DEL, visDel[1]);
    return { ok: true };
  }

  if (method === 'PATCH' || method === 'DELETE') return { ok: true };
  const provider = demoData[path];
  return provider ? provider() : null;
}

async function tryFetch(path, opts) {
  const res = await fetch(`${BASE}${path}`, opts);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.message || `Request failed (${res.status})`);
    err.status = res.status;
    throw err;
  }
  return data;
}

export async function api(path, { method = 'GET', body, auth = false, headers = {} } = {}) {
  if (auth && isDemo()) {
    const data = mockResponse(path, method, body);
    if (data !== null) return data;
  }

  const opts = { method, headers: { 'Content-Type': 'application/json', ...headers } };
  if (body !== undefined) opts.body = JSON.stringify(body);
  if (auth) {
    const token = getToken();
    if (token && token !== DEMO_TOKEN) opts.headers.Authorization = `Bearer ${token}`;
  }

  if (method === 'POST' && (path === '/inquiries' || path === '/visits' || path === '/newsletter')) {
    try {
      return await tryFetch(path, opts);
    } catch (err) {
      const fallback = mockResponse(path, method, body);
      if (fallback !== null) return fallback;
      throw err;
    }
  }

  return tryFetch(path, opts);
}
