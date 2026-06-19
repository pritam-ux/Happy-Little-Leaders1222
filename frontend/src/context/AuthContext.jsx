import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../api.js';

const AuthContext = createContext(null);

const DEMO_TOKEN = 'demo-mode-token';

const ROLE_DEFAULTS = {
  admin: { name: 'Admin User', classroom: undefined, childName: undefined },
  teacher: { name: 'Teacher Priya', classroom: 'Nursery A', childName: undefined },
  parent: { name: 'Parent Ravi', classroom: 'Nursery A', childName: 'Aarav' },
};

function roleFromPassword(password) {
  const p = (password || '').toLowerCase();
  if (p.includes('admin')) return 'admin';
  if (p.includes('teacher')) return 'teacher';
  if (p.includes('parent')) return 'parent';
  return null;
}

function buildDemoUser(email, password) {
  const role = roleFromPassword(password);
  if (!role) return null;
  const defaults = ROLE_DEFAULTS[role];
  const localPart = (email || '').split('@')[0] || defaults.name;
  const niceName = localPart
    .replace(/[._-]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase()) || defaults.name;
  return {
    id: `demo-${role}-${Date.now()}`,
    name: niceName,
    email,
    role,
    childName: defaults.childName,
    classroom: defaults.classroom,
    demo: true,
  };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('hll_user');
    return raw ? JSON.parse(raw) : null;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('hll_token');
    if (!token || user) return;
    if (token === DEMO_TOKEN) return;
    api('/auth/me', { auth: true })
      .then((data) => {
        setUser(data.user);
        localStorage.setItem('hll_user', JSON.stringify(data.user));
      })
      .catch(() => {
        localStorage.removeItem('hll_token');
        localStorage.removeItem('hll_user');
      });
  }, []);

  function persist(u, token) {
    localStorage.setItem('hll_token', token);
    localStorage.setItem('hll_user', JSON.stringify(u));
    setUser(u);
  }

  async function login(email, password) {
    setLoading(true);
    try {
      try {
        const data = await api('/auth/login', { method: 'POST', body: { email, password } });
        persist(data.user, data.token);
        return data.user;
      } catch (err) {
        const demo = buildDemoUser(email, password);
        if (demo) {
          persist(demo, DEMO_TOKEN);
          return demo;
        }
        const e = new Error('Invalid credentials. Use a password containing "admin", "teacher" or "parent".');
        throw e;
      }
    } finally {
      setLoading(false);
    }
  }

  async function register(payload) {
    setLoading(true);
    try {
      try {
        const data = await api('/auth/register', { method: 'POST', body: payload });
        persist(data.user, data.token);
        return data.user;
      } catch (err) {
        const u = {
          id: `demo-${Date.now()}`,
          name: payload.name,
          email: payload.email,
          role: payload.role === 'teacher' ? 'teacher' : 'parent',
          childName: payload.childName,
          demo: true,
        };
        persist(u, DEMO_TOKEN);
        return u;
      }
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem('hll_token');
    localStorage.removeItem('hll_user');
    setUser(null);
  }

  const value = useMemo(() => ({ user, loading, login, register, logout }), [user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}
