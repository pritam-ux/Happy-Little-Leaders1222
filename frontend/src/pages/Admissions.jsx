import SectionTitle from '../components/SectionTitle.jsx';
import EnquiryForm from '../components/EnquiryForm.jsx';
import SlotBooking from '../components/SlotBooking.jsx';
import { Blob, Sparkle, GradientStripe } from '../components/Decor.jsx';

const steps = [
  { n: 1, title: 'Inquire', body: 'Submit the inquiry form or give us a call.', gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FF9F68 100%)' },
  { n: 2, title: 'Campus Visit', body: 'Tour our campus and meet our teachers.', gradient: 'linear-gradient(135deg, #FFD93D 0%, #FF9F68 100%)' },
  { n: 3, title: 'Application', body: 'Fill out the admission form with required documents.', gradient: 'linear-gradient(135deg, #4ECDC4 0%, #6C63FF 100%)' },
  { n: 4, title: 'Welcome', body: 'Once approved, your child joins the HLL family!', gradient: 'linear-gradient(135deg, #8BC34A 0%, #4ECDC4 100%)' },
];

const docs = [
  'Birth certificate (copy)',
  'Aadhaar card (child & parents)',
  '4 passport-size photos of the child',
  'Address proof',
  'Vaccination records',
];

export default function Admissions() {
  function downloadForm() {
    const content = `HAPPY LITTLE LEADERS — ADMISSION FORM (Placeholder)
=====================================================
Born to Win

Child's full name: ____________________________________
Date of birth:     ____________________________________
Program (Playgroup/Nursery/LKG/UKG): __________________
Branch (Chintalkunta / Vanasthalipuram): ______________

Father's name:     ____________________________________
Mother's name:     ____________________________________
Phone:             ____________________________________
Email:             ____________________________________
Address:           ____________________________________

Documents required:
- Birth certificate (copy)
- Aadhaar card (child & parents)
- 4 passport-size photos of the child
- Address proof
- Vaccination records

Signature of parent/guardian: _________________________
Date: __________________________________________________
`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'HLL-admission-form.txt';
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <GradientStripe />
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10"
             style={{ background: 'linear-gradient(120deg, #FF6B6B 0%, #FF9F68 35%, #FFD93D 70%, #4ECDC4 100%)', backgroundSize: '200% 200%', animation: 'shimmer 8s ease-in-out infinite' }} />
        <div className="absolute top-10 right-10 opacity-50"><Sparkle size={20} className="text-white" /></div>
        <div className="absolute bottom-12 left-20 opacity-60 animate-sparkle"><Sparkle size={14} className="text-white" /></div>
        <div className="absolute top-1/2 right-1/3 opacity-40 animate-sparkle"><Sparkle size={16} className="text-white" /></div>
        <div className="section py-16 text-white relative">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/25 backdrop-blur ring-1 ring-white/40 text-xs font-bold uppercase tracking-wider">
            🎉 Admissions Open · 2026–27
          </span>
          <h1 className="heading text-4xl sm:text-5xl mt-4 text-white drop-shadow">Join the HLL family</h1>
          <p className="mt-4 text-lg text-white/90 max-w-2xl">
            We're enrolling now for Playgroup, Nursery, LKG and UKG across both campuses.
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-section-cream">
        <Blob tone="gold" size="w-72 h-72" className="-top-10 -left-20" />
        <Blob tone="brand" size="w-72 h-72" className="-bottom-10 -right-20" style={{ animationDelay: '-4s' }} />
        <div className="section py-12 relative">
          <SectionTitle eyebrow="Easy as 1-2-3-4" title="Steps to apply" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((s) => (
              <div key={s.n} className="premium-card relative pt-8">
                <div className="absolute -top-4 -left-3 w-12 h-12 grid place-items-center rounded-2xl text-white font-extrabold text-lg"
                     style={{ background: s.gradient, boxShadow: '0 18px 40px -12px rgba(255,107,107,0.55)' }}>
                  {s.n}
                </div>
                <h3 className="font-display font-extrabold text-lg">{s.title}</h3>
                <p className="text-ink/70 mt-2 text-sm">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-section-cool">
        <div className="section py-12 grid md:grid-cols-2 gap-6 relative">
          <div className="premium-card">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-11 h-11 rounded-2xl grid place-items-center text-white"
                   style={{ background: 'linear-gradient(135deg, #6C63FF 0%, #4ECDC4 100%)' }}>📄</div>
              <h3 className="heading text-xl">Documents required</h3>
            </div>
            <ul className="space-y-2 text-ink/80">
              {docs.map((d) => (
                <li key={d} className="flex items-start gap-2">
                  <span className="text-leaf mt-1">✓</span> {d}
                </li>
              ))}
            </ul>
            <button onClick={downloadForm} className="btn-secondary mt-6">⬇ Download Admission Form</button>
          </div>

          <div className="premium-card" style={{ background: 'linear-gradient(135deg, rgba(78,205,196,0.18) 0%, rgba(108,99,255,0.10) 100%)' }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-11 h-11 rounded-2xl grid place-items-center text-white"
                   style={{ background: 'linear-gradient(135deg, #FF6B6B 0%, #FF9F68 100%)' }}>💬</div>
              <h3 className="heading text-xl">Admission Enquiry</h3>
            </div>
            <EnquiryForm source="admissions" />
          </div>
        </div>
      </section>

      <section id="slot-booking" className="relative overflow-hidden bg-section-warm">
        <Blob tone="coral" size="w-72 h-72" className="-top-10 -right-20" />
        <Blob tone="indigo" size="w-72 h-72" className="-bottom-10 -left-20" style={{ animationDelay: '-5s' }} />
        <div className="section py-12 relative">
          <SectionTitle
            eyebrow="Campus visit · Slot booking"
            title="Pick a time that works for you"
            subtitle="Choose a date, pick a time slot, and add it straight to your Google Calendar."
            center
          />
          <SlotBooking />
        </div>
      </section>
    </>
  );
}
