import SectionTitle from '../components/SectionTitle.jsx';
import SmartImage from '../components/SmartImage.jsx';
import { Link } from 'react-router-dom';
import { Blob, Sparkle, GradientStripe } from '../components/Decor.jsx';
import { PROGRAM_IMAGES, ACTIVITY_IMAGES } from '../lib/images.js';

const programs = [
  {
    name: 'Playgroup',
    age: '1.5 – 2.5 yrs',
    tag: 'First steps',
    gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FF9F68 100%)',
    chip: 'chip',
    accent: '#FF6B6B',
    activities: ['Sensory play', 'Songs & rhymes', 'Free play', 'Toilet training'],
    outcomes: [
      'Comfortable separation from parents',
      'Early social and sharing skills',
      'Strong motor coordination',
    ],
  },
  {
    name: 'Nursery',
    age: '2.5 – 3.5 yrs',
    tag: 'Curious explorers',
    gradient: 'linear-gradient(135deg, #4ECDC4 0%, #8BC34A 100%)',
    chip: 'chip-teal',
    accent: '#4ECDC4',
    activities: ['Pre-writing skills', 'Number sense 1–10', 'Storytelling', 'Outdoor play'],
    outcomes: [
      'Confident speech & vocabulary',
      'Number recognition 1–10',
      'Beginning of pre-writing strokes',
    ],
  },
  {
    name: 'LKG',
    age: '3.5 – 4.5 yrs',
    tag: 'Bright thinkers',
    gradient: 'linear-gradient(135deg, #FFD93D 0%, #FF9F68 100%)',
    chip: 'chip-gold',
    accent: '#E5BC1F',
    activities: ['Reading readiness', 'Writing patterns', 'Numbers 1–50', 'Group activities'],
    outcomes: [
      'Reading 3-letter words',
      'Writing capital & small letters',
      'Numbers 1–50 with concept',
    ],
  },
  {
    name: 'UKG',
    age: '4.5 – 5.5 yrs',
    tag: 'School-ready',
    gradient: 'linear-gradient(135deg, #6C63FF 0%, #4ECDC4 100%)',
    chip: 'chip-indigo',
    accent: '#6C63FF',
    activities: ['Phonics & reading', 'Cursive writing', 'Math foundations', 'Public speaking'],
    outcomes: [
      'Fluent phonics-based reading',
      'Cursive writing & sentence formation',
      'Addition, subtraction & basics',
    ],
  },
];

const activities = [
  { key: 'art', title: 'Art', body: 'Crayon, paint and clay for creativity.', tone: 'text-brand' },
  { key: 'story', title: 'Storytelling', body: 'Daily story circles for imagination.', tone: 'text-coral' },
  { key: 'music', title: 'Music', body: 'Rhythm, instruments and singalongs.', tone: 'text-amber-500' },
  { key: 'outdoor', title: 'Outdoor Play', body: 'Safe outdoor time and games.', tone: 'text-leaf' },
];

export default function Programs() {
  return (
    <>
      <GradientStripe />
      <section className="relative overflow-hidden bg-section-warm">
        <Blob tone="brand" size="w-80 h-80" className="-top-20 -left-20" />
        <Blob tone="gold" size="w-72 h-72" className="-top-10 right-10" style={{ animationDelay: '-4s' }} />
        <div className="section py-16 relative">
          <span className="chip-gold inline-flex items-center gap-2"><Sparkle size={12} /> Curriculum</span>
          <h1 className="heading text-4xl sm:text-5xl mt-4">
            Programs designed for <span className="gradient-text">joyful growth</span>
          </h1>
          <p className="mt-5 text-lg text-ink/70 max-w-3xl">
            Each program is age-appropriate, theme-based and balances structured learning with plenty of play.
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-section-cream">
        <Blob tone="teal" size="w-72 h-72" className="-top-10 -right-20" />
        <Blob tone="indigo" size="w-72 h-72" className="-bottom-20 -left-20" style={{ animationDelay: '-6s' }} />
        <div className="section py-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5 relative">
          {programs.map((p) => (
            <div key={p.name} className="group rounded-3xl overflow-hidden bg-white hover-lift flex flex-col relative"
                 style={{ boxShadow: '0 20px 50px -25px rgba(31,42,68,0.35)' }}>
              <div className="h-1.5" style={{ background: p.gradient }} />
              <div className="relative">
                <SmartImage src={PROGRAM_IMAGES[p.name]} alt={p.name} wrapClassName="aspect-[4/3]" className="group-hover:scale-110 transition duration-500" />
                <div className="absolute inset-0" style={{ background: p.gradient, opacity: 0.25, mixBlendMode: 'multiply' }} />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur text-xs font-bold" style={{ color: p.accent }}>
                  {p.tag}
                </div>
                <div className="absolute bottom-3 left-3 text-white drop-shadow">
                  <div className="font-display font-extrabold text-2xl">{p.name}</div>
                  <div className="text-xs font-semibold opacity-90">{p.age}</div>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: p.accent }}>Activity Highlights</div>
                <ul className="space-y-1.5 text-sm">
                  {p.activities.map((a) => (
                    <li key={a} className="flex items-start gap-2">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: p.accent }} /> {a}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-4 border-t border-ink/10">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-leaf mb-2">Learning Outcomes</div>
                  <ul className="space-y-1.5 text-sm text-ink/80">
                    {p.outcomes.map((o) => (
                      <li key={o} className="flex items-start gap-2">
                        <span className="text-leaf mt-0.5">✓</span> {o}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-section-cool">
        <div className="section py-16 relative">
          <SectionTitle eyebrow="A day at HLL" title="Activities that spark wonder" center />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {activities.map((a) => (
              <div key={a.key} className="group rounded-3xl overflow-hidden bg-white hover-lift"
                   style={{ boxShadow: '0 20px 50px -25px rgba(31,42,68,0.35)' }}>
                <div className="relative">
                  <SmartImage src={ACTIVITY_IMAGES[a.key]} alt={a.title} wrapClassName="aspect-[4/3]" className="group-hover:scale-110 transition duration-500" />
                  <div className="absolute top-3 left-3 w-9 h-9 rounded-full bg-white/95 grid place-items-center shadow">
                    <Sparkle size={14} className={a.tone} />
                  </div>
                </div>
                <div className="p-4">
                  <div className="font-bold">{a.title}</div>
                  <p className="text-sm text-ink/70 mt-1">{a.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section py-12">
        <div className="relative rounded-3xl p-8 md:p-10 text-white overflow-hidden text-center"
             style={{ background: 'linear-gradient(120deg, #FF6B6B 0%, #FF9F68 50%, #FFD93D 100%)', boxShadow: '0 25px 60px -20px rgba(255,107,107,0.55)' }}>
          <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white/20 blur-2xl" />
          <h3 className="heading text-2xl text-white">Ready to begin the journey?</h3>
          <p className="text-white/90 mt-2">Admissions are open for the new academic year.</p>
          <div className="mt-5 flex justify-center gap-3 flex-wrap">
            <Link to="/admissions" className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-bold bg-white text-brand hover:scale-105 transition">Enroll Now</Link>
            <Link to="/contact#book-visit" className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-bold border-2 border-white text-white hover:bg-white/10 transition">Book a Visit</Link>
          </div>
        </div>
      </section>
    </>
  );
}
