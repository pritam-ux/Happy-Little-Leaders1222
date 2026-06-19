import { useEffect, useMemo, useRef, useState } from 'react';
import { api } from '../api.js';
import { Sparkle } from './Decor.jsx';

const SLOTS_STORE = 'hll_demo_slot_bookings';
const TIMES = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];
const CAMPUSES = ['Chintalkunta', 'Vanasthalipuram'];
const SLOT_MINUTES = 30;

function daysUntilEndOfYear() {
  const out = [];
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const last = new Date(start.getFullYear(), 11, 31);
  last.setHours(0, 0, 0, 0);
  const cur = new Date(start);
  while (cur <= last) {
    out.push(new Date(cur));
    cur.setDate(cur.getDate() + 1);
  }
  return out;
}

function monthChips(days) {
  const seen = new Set();
  const out = [];
  for (const d of days) {
    const k = `${d.getFullYear()}-${d.getMonth()}`;
    if (seen.has(k)) continue;
    seen.add(k);
    out.push({ key: k, year: d.getFullYear(), month: d.getMonth(), label: d.toLocaleDateString(undefined, { month: 'short' }), firstDay: d });
  }
  return out;
}
function fmtDateKey(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
function dayLabel(d) {
  return d.toLocaleDateString(undefined, { weekday: 'short' });
}
function dateLabel(d) {
  return d.toLocaleDateString(undefined, { day: '2-digit', month: 'short' });
}
export function display12h(t) {
  if (!t) return '';
  const [h, m] = t.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const hh = ((h + 11) % 12) + 1;
  return `${hh}:${String(m).padStart(2, '0')} ${suffix}`;
}

function loadBookings() {
  try { return JSON.parse(localStorage.getItem(SLOTS_STORE) || '[]'); } catch { return []; }
}
function saveBookings(list) {
  try { localStorage.setItem(SLOTS_STORE, JSON.stringify(list)); } catch {}
}

export function freeSlot({ date, time, campus }) {
  if (!date || !time) return;
  const list = loadBookings().filter(
    (b) => !(b.date === date && b.time === time && (!campus || b.campus === campus))
  );
  saveBookings(list);
}

export function buildGoogleCalendarUrl(booking) {
  const start = new Date(`${booking.date}T${booking.time}:00`);
  const end = new Date(start.getTime() + SLOT_MINUTES * 60 * 1000);
  const fmt = (d) => d.toISOString().replace(/[-:]|\.\d{3}/g, '');
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `Campus Visit — ${booking.parentName || 'Visitor'}`,
    dates: `${fmt(start)}/${fmt(end)}`,
    details:
      `Booked via Happy Little Leaders website.\n` +
      `Parent: ${booking.parentName || '—'}\n` +
      (booking.childName ? `Child: ${booking.childName}\n` : '') +
      `Phone: ${booking.phone || '—'}\n` +
      `Campus: ${booking.campus}`,
    location: `Happy Little Leaders — ${booking.campus}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export default function SlotBooking() {
  const days = useMemo(() => daysUntilEndOfYear(), []);
  const months = useMemo(() => monthChips(days), [days]);
  const [activeDay, setActiveDay] = useState(fmtDateKey(days[0]));
  const [activeCampus, setActiveCampus] = useState(CAMPUSES[0]);
  const [bookings, setBookings] = useState(loadBookings);
  const [pickedSlot, setPickedSlot] = useState(null);
  const [form, setForm] = useState({ parentName: '', childName: '', phone: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const dayStripRef = useRef(null);

  useEffect(() => {
    setPickedSlot(null);
  }, [activeDay, activeCampus]);

  useEffect(() => {
    const el = dayStripRef.current;
    if (!el) return;
    const active = el.querySelector('[data-active="true"]');
    if (active) {
      const r = active.getBoundingClientRect();
      const c = el.getBoundingClientRect();
      el.scrollTo({ left: el.scrollLeft + (r.left - c.left) - (c.width / 2) + (r.width / 2), behavior: 'smooth' });
    }
  }, [activeDay]);

  const activeMonthKey = (() => {
    const d = days.find((x) => fmtDateKey(x) === activeDay) || days[0];
    return `${d.getFullYear()}-${d.getMonth()}`;
  })();

  function jumpToMonth(m) {
    const target = m.firstDay >= days[0] ? m.firstDay : days[0];
    const k = fmtDateKey(target);
    setActiveDay(k);
  }

  function isTaken(date, time, campus) {
    return bookings.some((b) => b.date === date && b.time === time && b.campus === campus);
  }
  function isPast(date, time) {
    const slot = new Date(`${date}T${time}:00`);
    return slot.getTime() < Date.now();
  }

  async function confirm(e) {
    e.preventDefault();
    setError(null);
    if (!pickedSlot) { setError('Pick a time slot first.'); return; }
    if (!form.parentName.trim()) { setError('Parent name is required.'); return; }
    if (!/^[0-9+\- ]{7,15}$/.test(form.phone.trim())) { setError('Enter a valid phone number.'); return; }

    const booking = {
      id: `slot-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      date: pickedSlot.date,
      time: pickedSlot.time,
      campus: activeCampus,
      parentName: form.parentName.trim(),
      childName: form.childName.trim(),
      phone: form.phone.trim(),
      createdAt: new Date().toISOString(),
    };

    setSubmitting(true);
    try {
      await api('/visits', {
        method: 'POST',
        body: {
          name: booking.parentName,
          childName: booking.childName,
          phone: booking.phone,
          preferredDate: booking.date,
          branch: booking.campus,
          campus: booking.campus,
          notes: `Slot ${display12h(booking.time)}${booking.childName ? ` · child: ${booking.childName}` : ''}`,
          slotTime: booking.time,
          source: 'slot-booking',
        },
      }).catch(() => {});
      const next = [booking, ...bookings];
      setBookings(next);
      saveBookings(next);
      setSuccess(booking);
      setPickedSlot(null);
      setForm({ parentName: '', childName: '', phone: '' });
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  }

  function reset() {
    setSuccess(null);
    setError(null);
  }

  return (
    <div className="grid lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3 premium-card">
        <div className="flex items-center gap-2 mb-4">
          <Sparkle size={14} className="text-brand" />
          <h3 className="heading text-xl">Pick a campus visit slot</h3>
        </div>

        <div className="flex gap-2 mb-4">
          {CAMPUSES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActiveCampus(c)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${
                activeCampus === c ? 'text-white' : 'bg-white border border-ink/10 text-ink/70 hover:border-brand/40'
              }`}
              style={activeCampus === c ? { background: 'linear-gradient(135deg, #FF6B6B 0%, #FF9F68 100%)', boxShadow: '0 12px 24px -10px rgba(255,107,107,0.5)' } : undefined}
            >
              📍 {c}
            </button>
          ))}
        </div>

        <div className="flex gap-1.5 flex-wrap mb-3">
          {months.map((m) => {
            const active = m.key === activeMonthKey;
            return (
              <button
                key={m.key}
                type="button"
                onClick={() => jumpToMonth(m)}
                className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider transition ${
                  active ? 'text-white' : 'bg-white border border-ink/10 text-ink/70 hover:border-indigo2/40'
                }`}
                style={active ? { background: 'linear-gradient(135deg, #6C63FF 0%, #4ECDC4 100%)', boxShadow: '0 10px 20px -8px rgba(108,99,255,0.5)' } : undefined}
              >
                {m.label}{m.year !== new Date().getFullYear() ? ` '${String(m.year).slice(-2)}` : ''}
              </button>
            );
          })}
        </div>

        <div ref={dayStripRef} className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scroll-smooth">
          {days.map((d) => {
            const k = fmtDateKey(d);
            const active = k === activeDay;
            return (
              <button
                key={k}
                type="button"
                data-active={active ? 'true' : 'false'}
                onClick={() => setActiveDay(k)}
                className={`flex-shrink-0 w-16 rounded-2xl p-2 text-center transition ${
                  active ? 'text-white' : 'bg-white border border-ink/10 text-ink/70 hover:border-teal/40'
                }`}
                style={active ? { background: 'linear-gradient(135deg, #4ECDC4 0%, #6C63FF 100%)', boxShadow: '0 12px 24px -10px rgba(78,205,196,0.5)' } : undefined}
              >
                <div className="text-[10px] font-bold uppercase opacity-90">{dayLabel(d)}</div>
                <div className="text-lg font-display font-extrabold leading-tight">{d.getDate()}</div>
                <div className="text-[10px] opacity-80">{dateLabel(d).split(' ')[1]}</div>
              </button>
            );
          })}
        </div>

        <div className="mt-5 grid grid-cols-3 sm:grid-cols-4 gap-2">
          {TIMES.map((t) => {
            const taken = isTaken(activeDay, t, activeCampus);
            const past = isPast(activeDay, t);
            const picked = pickedSlot && pickedSlot.date === activeDay && pickedSlot.time === t;
            const disabled = taken || past;
            return (
              <button
                key={t}
                type="button"
                disabled={disabled}
                onClick={() => setPickedSlot({ date: activeDay, time: t })}
                className={`rounded-2xl p-3 text-center text-sm font-bold transition border ${
                  disabled
                    ? 'bg-ink/5 border-ink/5 text-ink/30 cursor-not-allowed line-through'
                    : picked
                      ? 'text-white border-transparent'
                      : 'bg-white border-ink/10 text-ink hover:border-brand/40 hover:-translate-y-0.5'
                }`}
                style={picked ? { background: 'linear-gradient(135deg, #FF6B6B 0%, #FFD93D 100%)', boxShadow: '0 14px 28px -10px rgba(255,107,107,0.55)' } : undefined}
              >
                {display12h(t)}
                {taken && <div className="text-[9px] mt-0.5 text-red-500 not-italic">Booked</div>}
                {past && !taken && <div className="text-[9px] mt-0.5 not-italic">Past</div>}
              </button>
            );
          })}
        </div>

        <div className="mt-3 flex items-center gap-4 text-xs text-ink/60">
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-md bg-white border border-ink/15" /> Available</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-md" style={{ background: 'linear-gradient(135deg, #FF6B6B 0%, #FFD93D 100%)' }} /> Selected</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-md bg-ink/10" /> Unavailable</span>
        </div>
      </div>

      <div className="lg:col-span-2 premium-card">
        {success ? (
          <SuccessPanel booking={success} onReset={reset} />
        ) : (
          <form onSubmit={confirm} className="space-y-3" noValidate>
            <div className="flex items-center gap-2 mb-1">
              <Sparkle size={14} className="text-amber-500" />
              <h3 className="heading text-xl">Confirm booking</h3>
            </div>

            <div className="rounded-2xl p-3 bg-gradient-to-r from-brand/10 via-gold/10 to-teal/10 ring-1 ring-brand/15 text-sm">
              {pickedSlot ? (
                <div className="flex items-center gap-2">
                  <span className="text-xl">🕒</span>
                  <div>
                    <div className="font-bold text-ink">
                      {new Date(pickedSlot.date).toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' })}
                    </div>
                    <div className="text-xs text-ink/70">{display12h(pickedSlot.time)} · {activeCampus} campus</div>
                  </div>
                </div>
              ) : (
                <div className="text-ink/60">Pick a date and time on the left to start.</div>
              )}
            </div>

            <div>
              <label className="label">Parent's name</label>
              <input className="input" value={form.parentName} onChange={(e) => setForm({ ...form, parentName: e.target.value })} placeholder="e.g. Priya Sharma" />
            </div>
            <div>
              <label className="label">Child's name</label>
              <input className="input" value={form.childName} onChange={(e) => setForm({ ...form, childName: e.target.value })} placeholder="e.g. Aarav" />
            </div>
            <div>
              <label className="label">Phone</label>
              <input className="input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="10-digit mobile" inputMode="tel" />
            </div>

            <button disabled={submitting || !pickedSlot} className="btn-primary w-full">
              {submitting ? 'Booking…' : '🎉 Book this slot'}
            </button>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <p className="text-[11px] text-ink/50">After booking you'll get an "Add to Google Calendar" button so the visit lands directly in your calendar.</p>
          </form>
        )}
      </div>
    </div>
  );
}

function SuccessPanel({ booking, onReset }) {
  const gcal = buildGoogleCalendarUrl(booking);
  const dateStr = new Date(booking.date).toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  return (
    <div className="text-center">
      <div className="w-16 h-16 mx-auto rounded-full grid place-items-center text-white text-3xl mb-3"
           style={{ background: 'linear-gradient(135deg, #8BC34A 0%, #4ECDC4 100%)', boxShadow: '0 18px 40px -16px rgba(139,195,74,0.55)' }}>
        ✓
      </div>
      <h3 className="heading text-xl">Slot booked!</h3>
      <p className="text-ink/70 text-sm mt-1">We'll be expecting you on</p>
      <div className="mt-3 rounded-2xl p-4 text-white"
           style={{ background: 'linear-gradient(135deg, #FF6B6B 0%, #FFD93D 100%)' }}>
        <div className="text-sm opacity-90">{dateStr}</div>
        <div className="font-display font-extrabold text-2xl mt-1">{display12h(booking.time)}</div>
        <div className="text-xs opacity-90 mt-1">📍 {booking.campus} campus</div>
      </div>

      <a
        href={gcal}
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-flex items-center justify-center gap-2 w-full rounded-full px-5 py-3 font-bold text-white"
        style={{ background: 'linear-gradient(135deg, #4ECDC4 0%, #6C63FF 100%)', boxShadow: '0 18px 40px -16px rgba(78,205,196,0.55)' }}
      >
        📅 Add to Google Calendar
      </a>

      <button
        type="button"
        onClick={onReset}
        className="mt-3 text-xs font-bold text-ink/60 hover:text-brand transition"
      >
        Book another slot
      </button>
    </div>
  );
}
