import { useState } from 'react';
import { api } from '../api.js';

const PROGRAMS = ['Playgroup', 'Nursery', 'LKG', 'UKG', 'Daycare'];
const CAMPUSES = ['Chintalkunta', 'Vanasthalipuram', 'No preference'];

const blank = {
  parentName: '',
  childName: '',
  childAge: '',
  phone: '',
  email: '',
  program: 'Playgroup',
  campus: 'Chintalkunta',
  message: '',
};

function validate(form) {
  const errors = {};
  if (!form.parentName.trim()) errors.parentName = 'Parent name is required';
  if (!form.childName.trim()) errors.childName = 'Child name is required';
  if (!form.childAge.trim()) errors.childAge = 'Child age is required';
  else if (!/^[0-9]+(\.[0-9]+)?$/.test(form.childAge.trim())) errors.childAge = 'Enter age in years (e.g. 3.5)';
  if (!form.phone.trim()) errors.phone = 'Phone is required';
  else if (!/^[0-9+\- ]{7,15}$/.test(form.phone.trim())) errors.phone = 'Enter a valid phone number';
  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = 'Enter a valid email';
  if (!form.program) errors.program = 'Please choose a program';
  if (!form.campus) errors.campus = 'Please choose a campus';
  return errors;
}

export default function EnquiryForm({ source = 'contact', mode = 'enquiry' }) {
  const [form, setForm] = useState(blank);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  function update(k, v) {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  }

  async function submit(e, intent) {
    e.preventDefault();
    const v = validate(form);
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    setSubmitting(true);
    setStatus(null);
    try {
      await api('/inquiries', {
        method: 'POST',
        body: {
          name: form.parentName,
          childName: form.childName,
          childAge: form.childAge,
          phone: form.phone,
          email: form.email,
          program: form.program,
          campus: form.campus,
          message: form.message,
          intent,
          source,
        },
      });
      setStatus({
        ok: true,
        msg: intent === 'visit'
          ? 'Visit requested! Our team will confirm shortly.'
          : "Thanks! We'll reach out within 24 hours.",
      });
      setForm(blank);
    } catch (err) {
      setStatus({ ok: false, msg: err.message || 'Something went wrong. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={(e) => submit(e, 'enquiry')} className="space-y-3" noValidate>
      <div className="grid sm:grid-cols-2 gap-3">
        <Field label="Parent Name" error={errors.parentName}>
          <input
            className="input"
            value={form.parentName}
            onChange={(e) => update('parentName', e.target.value)}
            placeholder="e.g. Priya Sharma"
            autoComplete="name"
          />
        </Field>
        <Field label="Child Name" error={errors.childName}>
          <input
            className="input"
            value={form.childName}
            onChange={(e) => update('childName', e.target.value)}
            placeholder="e.g. Aarav"
          />
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <Field label="Child Age (years)" error={errors.childAge}>
          <input
            className="input"
            value={form.childAge}
            onChange={(e) => update('childAge', e.target.value)}
            placeholder="e.g. 3.5"
            inputMode="decimal"
          />
        </Field>
        <Field label="Phone Number" error={errors.phone}>
          <input
            className="input"
            value={form.phone}
            onChange={(e) => update('phone', e.target.value)}
            placeholder="10-digit mobile"
            inputMode="tel"
            autoComplete="tel"
          />
        </Field>
      </div>

      <Field label="Email" error={errors.email}>
        <input
          type="email"
          className="input"
          value={form.email}
          onChange={(e) => update('email', e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
        />
      </Field>

      <div className="grid sm:grid-cols-2 gap-3">
        <Field label="Program Interested In" error={errors.program}>
          <select className="input" value={form.program} onChange={(e) => update('program', e.target.value)}>
            {PROGRAMS.map((p) => <option key={p}>{p}</option>)}
          </select>
        </Field>
        <Field label="Preferred Campus" error={errors.campus}>
          <select className="input" value={form.campus} onChange={(e) => update('campus', e.target.value)}>
            {CAMPUSES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </Field>
      </div>

      <Field label="Message">
        <textarea
          className="input min-h-[100px]"
          value={form.message}
          onChange={(e) => update('message', e.target.value)}
          placeholder="Anything you'd like us to know"
        />
      </Field>

      <div className="grid sm:grid-cols-2 gap-3 pt-1">
        <button disabled={submitting} className="btn-primary w-full">
          {submitting ? 'Sending…' : 'Submit Enquiry'}
        </button>
        <button
          type="button"
          disabled={submitting}
          onClick={(e) => submit(e, 'visit')}
          className="btn-secondary w-full"
        >
          {submitting ? 'Please wait…' : 'Book Visit'}
        </button>
      </div>

      {status && (
        <p
          role="status"
          className={`text-sm mt-2 ${status.ok ? 'text-emerald-700' : 'text-red-600'}`}
        >
          {status.msg}
        </p>
      )}
    </form>
  );
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="label">{label}</label>
      {children}
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}
