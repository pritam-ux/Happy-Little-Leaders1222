import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../components/SectionTitle.jsx';
import HeroCarousel from '../components/HeroCarousel.jsx';
import SmartImage from '../components/SmartImage.jsx';
import AnimatedCounter from '../components/AnimatedCounter.jsx';
import { Blob, Sparkle, WaveDivider, CurveDivider, GradientStripe, DotGrid } from '../components/Decor.jsx';
import { BRANCHES, PHONES } from '../config.js';
import {
  HERO_SLIDES,
  ACTIVITY_IMAGES,
  SAFETY_IMAGES,
  DAYCARE_IMAGES,
  FOUNDER_IMAGE,
  TOUR_THUMB,
  TOUR_VIDEO_ID,
} from '../lib/images.js';

const stats = [
  { value: 50, suffix: '+', label: 'Happy Students', tone: 'brand' },
  { value: 4, suffix: '+', label: 'Years Experience', tone: 'teal' },
  { value: 2, suffix: '', label: 'Campuses', tone: 'indigo' },
  { value: 100, suffix: '%', label: 'Qualified Teachers', tone: 'gold' },
];

const STAT_TONE = {
  brand: { text: 'text-brand', bg: 'bg-brand/10' },
  teal: { text: 'text-teal-600', bg: 'bg-teal/10' },
  indigo: { text: 'text-indigo2-600', bg: 'bg-indigo2/10' },
  gold: { text: 'text-amber-600', bg: 'bg-gold/15' },
};

const compareRows = [
  { feature: 'Small Class Sizes', hll: true, typical: false },
  { feature: 'CCTV Monitoring (All Areas)', hll: true, typical: false },
  { feature: 'In-house Daycare Facility', hll: true, typical: false },
  { feature: 'Qualified, Trained Teachers', hll: true, typical: true },
  { feature: 'Daily Parent Communication', hll: true, typical: false },
  { feature: 'Strict Hygiene Standards', hll: true, typical: false },
];

const activities = [
  { key: 'story', title: 'Story Reading', body: 'Daily story circles in English and Hindi.', tone: 'brand' },
  { key: 'art', title: 'Art & Craft', body: 'Crayon, paint and clay for creativity.', tone: 'coral' },
  { key: 'music', title: 'Music & Dance', body: 'Rhythm games and singalongs.', tone: 'gold' },
  { key: 'outdoor', title: 'Outdoor Play', body: 'Safe outdoor time and team games.', tone: 'leaf' },
  { key: 'rhymes', title: 'Rhymes', body: 'Action rhymes for language & memory.', tone: 'teal' },
  { key: 'sensory', title: 'Sensory Activities', body: 'Touch, sound and texture play.', tone: 'indigo' },
  { key: 'festival', title: 'Festival Celebrations', body: 'Diwali, Pongal, Christmas — every story.', tone: 'brand' },
  { key: 'speaking', title: 'Public Speaking', body: 'Show & tell builds early confidence.', tone: 'coral' },
];

const ACTIVITY_TONE = {
  brand: 'from-brand to-coral',
  coral: 'from-coral to-gold',
  gold: 'from-gold to-coral',
  leaf: 'from-leaf to-teal',
  teal: 'from-teal to-indigo2',
  indigo: 'from-indigo2 to-teal',
};

const reviews = [
  { name: 'Sneha R.', rating: 5, text: 'My daughter looks forward to school every morning. The teachers are wonderful and the activities are so creative!' },
  { name: 'Arjun K.', rating: 5, text: 'A truly safe and loving environment. We love the regular updates from the parent dashboard.' },
  { name: 'Priya M.', rating: 5, text: "Beautiful campus, fantastic curriculum. We can see real growth in our son's confidence." },
  { name: 'Ramesh G.', rating: 5, text: 'The daycare facility is a blessing for working parents. Truly motherly care.' },
  { name: 'Lakshmi V.', rating: 4, text: 'Wonderful teachers, lovely festivals. Our little one is thriving here.' },
];

const safetyItems = [
  { key: 'cctv', title: 'CCTV Surveillance', body: '24x7 cameras across classrooms, corridors and play areas.', tone: 'brand' },
  { key: 'sanitize', title: 'Daily Sanitization', body: 'Toys, surfaces and washrooms sanitized throughout the day.', tone: 'teal' },
  { key: 'caregivers', title: 'Trained Caregivers', body: 'First-aid certified staff trained in child psychology.', tone: 'gold' },
  { key: 'entry', title: 'Secure Campus Entry', body: 'Visitor logs, ID checks and child handover protocols.', tone: 'indigo' },
  { key: 'snacks', title: 'Healthy Snacks', body: 'Wholesome, nutritionist-approved options every day.', tone: 'leaf' },
  { key: 'emergency', title: 'Emergency Preparedness', body: 'Fire drills, first-aid kits, evacuation plans in place.', tone: 'coral' },
];

const SAFE_RING = {
  brand: 'ring-brand/30 bg-brand/10 text-brand',
  teal: 'ring-teal/30 bg-teal/10 text-teal-600',
  gold: 'ring-gold/40 bg-gold/15 text-amber-600',
  indigo: 'ring-indigo2/30 bg-indigo2/10 text-indigo2-600',
  leaf: 'ring-leaf/30 bg-leaf/10 text-leaf-600',
  coral: 'ring-coral/30 bg-coral/10 text-coral-600',
};

export default function Home() {
  return (
    <>
      <GradientStripe />
      <Hero />
      <AdmissionsBanner />
      <FounderSection />
      <WhyChooseUs />
      <DaycareSection />
      <ActivitiesSection />
      <VirtualTour />
      <SafetySection />
      <ReviewsSection />
      <QuickContact />
      <BranchPreview />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-section-warm">
      <Blob tone="brand" size="w-96 h-96" className="-top-24 -left-24" />
      <Blob tone="gold" size="w-80 h-80" className="-top-10 right-0" style={{ animationDelay: '-4s' }} />
      <Blob tone="teal" size="w-96 h-96" className="-bottom-32 -right-24" style={{ animationDelay: '-8s' }} />
      <Blob tone="indigo" size="w-72 h-72" className="bottom-10 left-1/4" style={{ animationDelay: '-2s' }} />

      <div className="section py-10 sm:py-14 md:py-20 lg:py-24 grid md:grid-cols-2 gap-8 md:gap-10 items-center relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="chip-gold inline-flex items-center gap-2">
            <Sparkle size={12} /> Admissions Open · 2026–27
          </span>
          <h1 className="heading hero-title mt-4">
            Where little
            <span className="gradient-text"> dreamers </span>
            become
            <span className="gradient-text-cool"> leaders</span>.
          </h1>
          <p className="mt-5 body-fluid text-ink/70 max-w-xl">
            A joyful, premium preschool in Hyderabad with two campuses.
            <span className="font-semibold text-ink"> Born to Win </span>— every child, every day.
          </p>
          <div className="mt-6 sm:mt-7 flex flex-wrap gap-3">
            <Link to="/contact#book-visit" className="btn-primary w-full xs:w-auto">📅 Book a Campus Visit</Link>
            <Link to="/admissions" className="btn-cool w-full xs:w-auto">🎉 Admissions Open</Link>
          </div>

          <div className="mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className={`relative rounded-2xl bg-white/85 backdrop-blur p-2.5 sm:p-3 text-center border border-white/70 hover-lift`}
                style={{ boxShadow: '0 12px 24px -16px rgba(31,42,68,0.25)' }}
              >
                <div className={`mx-auto w-9 h-9 sm:w-10 sm:h-10 rounded-xl grid place-items-center mb-1 ${STAT_TONE[s.tone].bg}`}>
                  <Sparkle size={14} className={STAT_TONE[s.tone].text} />
                </div>
                <div className={`text-xl sm:text-2xl font-display font-extrabold ${STAT_TONE[s.tone].text}`}>
                  <AnimatedCounter to={s.value} suffix={s.suffix} />
                </div>
                <div className="text-[10px] sm:text-[11px] font-semibold text-ink/70 mt-0.5 leading-tight">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative mx-2 sm:mx-0"
        >
          <HeroCarousel slides={HERO_SLIDES} />

          <div className="hidden sm:flex absolute -left-4 -bottom-6 rounded-2xl px-3 py-2.5 lg:px-4 lg:py-3 items-center gap-2 lg:gap-3 animate-float text-white"
               style={{ background: 'linear-gradient(135deg, #FF6B6B 0%, #FF9F68 100%)', boxShadow: '0 25px 50px -12px rgba(255,107,107,0.45)' }}>
            <span className="text-xl lg:text-2xl">🏆</span>
            <div className="text-xs lg:text-sm">
              <div className="font-bold">4+ Years</div>
              <div className="opacity-90">Experience</div>
            </div>
          </div>
          <div className="absolute right-2 sm:-right-3 top-4 sm:top-6 rounded-2xl bg-white px-3 py-2 sm:px-4 sm:py-3 flex items-center gap-2 sm:gap-3 ring-1 ring-gold/40"
               style={{ boxShadow: '0 25px 50px -12px rgba(255,217,61,0.45)' }}>
            <span className="text-xl sm:text-2xl">⭐</span>
            <div className="text-xs sm:text-sm">
              <div className="font-bold text-amber-600">4.9/5</div>
              <div className="text-ink/60">Parent rating</div>
            </div>
          </div>
          <div className="hidden md:flex absolute right-6 -bottom-4 rounded-2xl px-3 py-2.5 lg:px-4 lg:py-3 items-center gap-2 lg:gap-3 animate-float text-white"
               style={{ background: 'linear-gradient(135deg, #4ECDC4 0%, #6C63FF 100%)', boxShadow: '0 25px 50px -12px rgba(78,205,196,0.45)', animationDelay: '1s' }}>
            <span className="text-xl lg:text-2xl">👩‍🏫</span>
            <div className="text-xs lg:text-sm">
              <div className="font-bold">Qualified</div>
              <div className="opacity-90">Teachers</div>
            </div>
          </div>
        </motion.div>
      </div>

      <WaveDivider from="transparent" to="#FFFCF5" height={70} />
    </section>
  );
}

function AdmissionsBanner() {
  const perks = [
    'Limited Seats Available',
    'Daycare Available',
    'Playgroup to UKG',
    'Free Campus Visit',
  ];
  return (
    <section className="bg-section-cream py-10">
      <div className="section">
        <div className="relative overflow-hidden rounded-[2rem] p-8 md:p-10 text-ink ring-1 ring-brand/15"
             style={{ background: 'linear-gradient(120deg, #FFE0E0 0%, #FFF5C2 35%, #D6F6F3 70%, #E4E1FF 100%)', backgroundSize: '220% 220%', animation: 'shimmer 10s ease-in-out infinite', boxShadow: '0 25px 60px -20px rgba(255,107,107,0.25)' }}>
          <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-brand/15 blur-2xl" />
          <div className="absolute -bottom-16 -left-10 w-64 h-64 rounded-full bg-indigo2/15 blur-2xl" />
          <div className="absolute top-4 left-4 opacity-70"><Sparkle size={18} className="text-brand" /></div>
          <div className="absolute top-12 right-24 opacity-80 animate-sparkle"><Sparkle size={12} className="text-amber-500" /></div>
          <div className="absolute bottom-10 left-32 opacity-60 animate-sparkle"><Sparkle size={16} className="text-indigo2" /></div>

          <div className="relative grid md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-brand text-sm font-bold ring-2 ring-brand/30 animate-pulseSoft">
                🎉 Admissions Open
              </div>
              <h2 className="font-display font-extrabold text-3xl md:text-4xl mt-3 text-ink">
                Reserve your child's seat for <span className="gradient-text">2026–27</span>
              </h2>
              <ul className="mt-4 grid sm:grid-cols-2 gap-x-6 gap-y-2.5 text-ink">
                {perks.map((p) => (
                  <li key={p} className="flex items-center gap-2">
                    <span className="w-6 h-6 grid place-items-center rounded-full text-white font-bold text-xs flex-shrink-0"
                          style={{ background: 'linear-gradient(135deg, #FF6B6B 0%, #FF9F68 100%)', boxShadow: '0 6px 16px -6px rgba(255,107,107,0.55)' }}>✓</span>
                    <span className="font-semibold">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-3 md:items-end">
              <Link to="/admissions" className="btn-primary w-full md:w-auto">
                Apply Now →
              </Link>
              <Link to="/contact#book-visit" className="btn-secondary w-full md:w-auto">
                Book a Visit
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FounderSection() {
  const quals = [
    { text: 'M.Sc (Physics)', tone: 'chip-indigo' },
    { text: 'MBA (UK)', tone: 'chip-teal' },
    { text: 'M.Sc (Psychology)', tone: 'chip-gold' },
    { text: 'Six Sigma Black Belt', tone: 'chip' },
    { text: 'BA LLB', tone: 'chip-indigo' },
  ];
  return (
    <section className="relative overflow-hidden bg-section-cream">
      <Blob tone="gold" size="w-80 h-80" className="-top-20 left-10" />
      <Blob tone="coral" size="w-72 h-72" className="bottom-10 -right-20" style={{ animationDelay: '-6s' }} />

      <div className="section py-16 relative">
        <SectionTitle eyebrow="Meet our founder" title="A vision built on love & learning" />
        <div className="grid md:grid-cols-5 gap-8 items-center">
          <div className="md:col-span-2 relative">
            <div className="absolute -inset-4 rounded-[2.5rem] -z-0"
                 style={{ background: 'linear-gradient(135deg, #FF6B6B 0%, #FF9F68 50%, #FFD93D 100%)', opacity: 0.25, filter: 'blur(20px)' }} />
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-gradient-to-br from-peach to-sun"
                 style={{ boxShadow: '0 40px 80px -30px rgba(31,42,68,0.4)' }}>
              <SmartImage src={FOUNDER_IMAGE} alt="Anupama Iyalapaka — Founder" wrapClassName="w-full h-full" />
            </div>
            <div className="absolute -bottom-5 -right-5 hidden sm:block rounded-2xl px-4 py-3 text-white"
                 style={{ background: 'linear-gradient(135deg, #6C63FF 0%, #4ECDC4 100%)', boxShadow: '0 25px 50px -12px rgba(108,99,255,0.45)' }}>
              <div className="text-xs font-semibold opacity-90">Founder</div>
              <div className="font-display font-extrabold">Anupama Iyalapaka</div>
            </div>
          </div>
          <div className="md:col-span-3">
            <h3 className="heading text-3xl gradient-text-cool">Anupama Iyalapaka</h3>
            <p className="mt-1 text-brand font-semibold">Founder & Director, Happy Little Leaders</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {quals.map((q) => (
                <span key={q.text} className={q.tone}>{q.text}</span>
              ))}
            </div>

            <div className="mt-6 space-y-4 text-ink/80">
              <p>
                <span className="font-bold text-ink">A warm welcome to every parent.</span> At Happy Little Leaders, we believe a child's earliest years are the most precious. I founded HLL to create a place where children are seen, heard and celebrated — every single day.
              </p>
              <p>
                <span className="font-bold text-ink">Our mission</span> is simple: nurture confident, curious and kind little humans through joyful, play-based learning, guided by qualified teachers in a safe, modern environment that parents can trust completely.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/about" className="btn-secondary">Learn more</Link>
              <Link to="/contact" className="btn-primary">Meet us in person</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-section-cool">
      <Blob tone="teal" size="w-80 h-80" className="-top-20 -left-20" />
      <Blob tone="indigo" size="w-72 h-72" className="-bottom-20 right-10" style={{ animationDelay: '-5s' }} />

      <div className="section py-16 relative">
        <SectionTitle eyebrow="Why parents choose us" title="Happy Little Leaders vs typical preschool" subtitle="A side-by-side look at what makes HLL different." center />

        <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          <div className="hidden md:block" />
          <div className="rounded-2xl p-5 text-white text-center"
               style={{ background: 'linear-gradient(135deg, #FF6B6B 0%, #FF9F68 100%)', boxShadow: '0 25px 50px -12px rgba(255,107,107,0.45)' }}>
            <div className="text-2xl">🌟</div>
            <div className="font-display font-extrabold text-lg mt-1">Happy Little Leaders</div>
          </div>
          <div className="rounded-2xl p-5 text-center bg-white/70 backdrop-blur ring-1 ring-ink/10">
            <div className="text-2xl">🏫</div>
            <div className="font-display font-extrabold text-lg mt-1 text-ink/60">Typical Preschool</div>
          </div>

          {compareRows.map((r) => (
            <ComparisonRow key={r.feature} row={r} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ComparisonRow({ row }) {
  return (
    <>
      <div className="glass rounded-2xl p-4 flex items-center font-semibold text-ink">{row.feature}</div>
      <div className="rounded-2xl p-4 grid place-items-center"
           style={{ background: 'linear-gradient(135deg, rgba(255,107,107,0.1) 0%, rgba(255,217,61,0.1) 100%)' }}>
        {row.hll ? (
          <span className="w-10 h-10 rounded-full text-white grid place-items-center font-bold"
                style={{ background: 'linear-gradient(135deg, #8BC34A 0%, #4ECDC4 100%)', boxShadow: '0 12px 30px -8px rgba(78,205,196,0.55)' }}>✓</span>
        ) : (
          <span className="w-10 h-10 rounded-full bg-red-100 text-red-500 grid place-items-center font-bold">×</span>
        )}
      </div>
      <div className="rounded-2xl p-4 grid place-items-center bg-white/70 backdrop-blur ring-1 ring-ink/10">
        {row.typical ? (
          <span className="w-10 h-10 rounded-full bg-emerald-200 text-emerald-700 grid place-items-center font-bold">✓</span>
        ) : (
          <span className="w-10 h-10 rounded-full bg-red-100 text-red-500 grid place-items-center font-bold">×</span>
        )}
      </div>
    </>
  );
}

function DaycareSection() {
  const features = [
    'Hygienic Environment',
    'Safe Premises',
    'Motherly Care',
    'Healthy Snacks',
    'Homework Support',
    'Play Activities',
  ];
  return (
    <section className="relative overflow-hidden bg-section-warm">
      <Blob tone="coral" size="w-80 h-80" className="-top-10 -right-20" />
      <Blob tone="leaf" size="w-64 h-64" className="bottom-10 -left-10" style={{ animationDelay: '-3s' }} />

      <div className="section py-16 relative">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="grid grid-cols-2 gap-3 relative">
            <div className="absolute -inset-2 rounded-[2.5rem] -z-0"
                 style={{ background: 'linear-gradient(135deg, #FFD93D 0%, #FF9F68 100%)', opacity: 0.25, filter: 'blur(24px)' }} />
            {DAYCARE_IMAGES.map((src, idx) => (
              <SmartImage
                key={src}
                src={src}
                alt={`Daycare ${idx + 1}`}
                wrapClassName={`relative rounded-3xl ring-4 ring-white ${idx === 0 ? 'aspect-[4/5] row-span-2' : 'aspect-square'}`}
              />
            ))}
          </div>
          <div>
            <span className="chip-teal">Daycare</span>
            <h2 className="heading text-3xl sm:text-4xl mt-3">
              Daycare with <span className="gradient-text">motherly care</span>
            </h2>
            <p className="mt-3 text-ink/70">
              A second home for your little one — warm, safe and joyful from morning to evening.
            </p>

            <div className="mt-5 grid sm:grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl p-4 text-white" style={{ background: 'linear-gradient(135deg, #4ECDC4 0%, #6C63FF 100%)', boxShadow: '0 18px 40px -16px rgba(78,205,196,0.55)' }}>
                <div className="text-xs font-semibold uppercase opacity-90">Age</div>
                <div className="font-bold text-lg">1.5 years and above</div>
              </div>
              <div className="rounded-2xl p-4 text-white" style={{ background: 'linear-gradient(135deg, #FF6B6B 0%, #FF9F68 100%)', boxShadow: '0 18px 40px -16px rgba(255,107,107,0.55)' }}>
                <div className="text-xs font-semibold uppercase opacity-90">Timings</div>
                <div className="font-bold text-lg">8:30 AM – 7:00 PM</div>
              </div>
            </div>

            <ul className="mt-5 grid sm:grid-cols-2 gap-x-4 gap-y-2">
              {features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-ink/80">
                  <span className="w-5 h-5 rounded-full text-white grid place-items-center text-xs font-bold"
                        style={{ background: 'linear-gradient(135deg, #8BC34A 0%, #4ECDC4 100%)' }}>✓</span>
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <Link to="/contact#book-visit" className="btn-primary">Book a daycare tour</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ActivitiesSection() {
  return (
    <section className="relative overflow-hidden bg-section-indigo">
      <Blob tone="indigo" size="w-80 h-80" className="-top-20 right-10" />
      <Blob tone="teal" size="w-72 h-72" className="-bottom-20 left-10" style={{ animationDelay: '-6s' }} />

      <div className="section py-16 relative">
        <SectionTitle eyebrow="A day at HLL" title="Activities that spark wonder" center />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {activities.map((a) => (
            <div key={a.key} className="group relative rounded-3xl overflow-hidden bg-white hover-lift"
                 style={{ boxShadow: '0 20px 50px -25px rgba(31,42,68,0.35)' }}>
              <div className="relative">
                <SmartImage
                  src={ACTIVITY_IMAGES[a.key]}
                  alt={a.title}
                  wrapClassName="aspect-[4/3]"
                  className="group-hover:scale-110 transition duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-tr opacity-30 ${ACTIVITY_TONE[a.tone]}`} />
                <div className={`absolute top-3 left-3 w-9 h-9 rounded-full grid place-items-center bg-white/95 text-lg shadow`}>
                  <Sparkle size={14} className={
                    a.tone === 'brand' ? 'text-brand'
                    : a.tone === 'coral' ? 'text-coral'
                    : a.tone === 'gold' ? 'text-amber-500'
                    : a.tone === 'leaf' ? 'text-leaf'
                    : a.tone === 'teal' ? 'text-teal-500'
                    : 'text-indigo2'
                  } />
                </div>
              </div>
              <div className="p-4">
                <div className="font-display font-extrabold text-lg">{a.title}</div>
                <p className="text-sm text-ink/70 mt-1">{a.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function VirtualTour() {
  const [open, setOpen] = useState(false);
  return (
    <section className="relative overflow-hidden bg-section-cool py-16">
      <DotGrid />
      <Blob tone="indigo" size="w-80 h-80" className="-top-20 -left-20" />
      <Blob tone="teal" size="w-80 h-80" className="-bottom-20 -right-20" style={{ animationDelay: '-6s' }} />

      <div className="section relative">
        <div className="text-center mb-8">
          <span className="chip-indigo inline-flex items-center gap-2"><Sparkle size={12} /> Take a peek</span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl mt-3 text-ink">
            Virtual <span className="gradient-text-cool">campus tour</span>
          </h2>
          <p className="mt-3 text-ink/70 max-w-2xl mx-auto">A quick walkthrough of our campuses, classrooms and play areas.</p>
        </div>

        <div className="relative max-w-4xl mx-auto rounded-[2rem] overflow-hidden ring-4 ring-white"
             style={{ boxShadow: '0 40px 80px -30px rgba(31,42,68,0.35)' }}>
          {!open ? (
            <button type="button" onClick={() => setOpen(true)} className="block w-full group relative" aria-label="Play campus tour video">
              <SmartImage src={TOUR_THUMB} alt="Campus tour" wrapClassName="aspect-video" className="group-hover:scale-105 transition duration-500" />
              <div className="absolute inset-0 bg-black/40 grid place-items-center">
                <div className="w-20 h-20 rounded-full grid place-items-center animate-pulseSoft group-hover:scale-110 transition text-white"
                     style={{ background: 'linear-gradient(135deg, #FF6B6B 0%, #FF9F68 100%)', boxShadow: '0 25px 50px -12px rgba(255,107,107,0.55)' }}>
                  <span className="text-3xl ml-1">▶</span>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-5 text-white text-left">
                <div className="text-sm uppercase tracking-wide opacity-80">Watch now</div>
                <div className="text-2xl font-display font-extrabold">Inside Happy Little Leaders</div>
              </div>
            </button>
          ) : (
            <div className="aspect-video bg-black">
              <iframe
                title="Happy Little Leaders campus tour"
                src={`https://www.youtube.com/embed/${TOUR_VIDEO_ID}?autoplay=1&rel=0`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function SafetySection() {
  return (
    <section className="relative overflow-hidden bg-section-cream">
      <Blob tone="brand" size="w-72 h-72" className="-top-20 -left-20" />
      <Blob tone="teal" size="w-72 h-72" className="-bottom-20 -right-20" style={{ animationDelay: '-7s' }} />

      <div className="section py-16 relative">
        <SectionTitle eyebrow="Safety & Hygiene" title="A campus you can trust" center />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {safetyItems.map((i) => (
            <div key={i.key} className="rounded-3xl overflow-hidden bg-white hover-lift group"
                 style={{ boxShadow: '0 20px 50px -25px rgba(31,42,68,0.35)' }}>
              <div className="relative">
                <SmartImage src={SAFETY_IMAGES[i.key]} alt={i.title} wrapClassName="aspect-[16/9]" className="group-hover:scale-110 transition duration-500" />
                <div className={`absolute top-3 left-3 w-10 h-10 rounded-2xl grid place-items-center ring-2 ${SAFE_RING[i.tone]}`}>
                  <Sparkle size={14} />
                </div>
              </div>
              <div className="p-5">
                <div className="font-display font-extrabold text-lg">{i.title}</div>
                <p className="text-sm text-ink/70 mt-1">{i.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewsSection() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % reviews.length), 5500);
    return () => clearInterval(id);
  }, []);

  const r = reviews[i];

  return (
    <section className="relative overflow-hidden bg-section-warm">
      <Blob tone="gold" size="w-72 h-72" className="-top-10 left-10" />
      <Blob tone="coral" size="w-72 h-72" className="-bottom-10 -right-10" style={{ animationDelay: '-4s' }} />

      <div className="section py-16 relative">
        <SectionTitle eyebrow="From our parents" title="Stories that make us smile" center />

        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-3 rounded-full bg-white px-5 py-2 ring-1 ring-gold/30"
               style={{ boxShadow: '0 12px 30px -10px rgba(255,217,61,0.5)' }}>
            <Stars n={5} />
            <span className="font-display font-extrabold text-xl text-amber-600">4.9/5</span>
            <span className="text-sm text-ink/60">Parent Rating</span>
          </div>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute -inset-3 rounded-[2.5rem] -z-0"
               style={{ background: 'linear-gradient(135deg, #FF6B6B 0%, #FFD93D 50%, #4ECDC4 100%)', opacity: 0.2, filter: 'blur(20px)' }} />
          <div className="relative premium-card text-center">
            <Sparkle size={22} className="text-gold absolute top-4 right-4 animate-sparkle" />
            <Stars n={r.rating} className="justify-center" />
            <p className="text-lg text-ink/80 italic mt-3 min-h-[5rem]">"{r.text}"</p>
            <div className="font-bold mt-4">— {r.name}</div>
            <div className="flex justify-center gap-2 mt-4">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setI(idx)}
                  aria-label={`Review ${idx + 1}`}
                  className={`h-2.5 rounded-full transition-all ${idx === i ? 'w-6' : 'w-2.5 bg-ink/20'}`}
                  style={idx === i ? { background: 'linear-gradient(90deg, #FF6B6B, #FF9F68)' } : undefined}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stars({ n, className = '' }) {
  return (
    <div className={`flex gap-0.5 ${className}`}>
      {Array.from({ length: 5 }).map((_, idx) => (
        <span key={idx} className={idx < n ? 'text-gold' : 'text-ink/15'}>★</span>
      ))}
    </div>
  );
}

function QuickContact() {
  return (
    <section className="section py-12">
      <div className="relative rounded-3xl p-8 md:p-10 text-white overflow-hidden"
           style={{ background: 'linear-gradient(135deg, #4ECDC4 0%, #6C63FF 100%)', boxShadow: '0 25px 60px -20px rgba(108,99,255,0.55)' }}>
        <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white/15 blur-2xl" />
        <div className="absolute -bottom-16 -left-10 w-64 h-64 rounded-full bg-white/10 blur-2xl" />
        <div className="relative grid md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2">
            <h3 className="heading text-2xl text-white">Got questions? We'd love to chat.</h3>
            <p className="text-white/85 mt-2">Call us, WhatsApp, or schedule a campus visit at either branch.</p>
          </div>
          <div className="flex flex-col gap-2">
            {PHONES.map((p) => (
              <a key={p} href={`tel:+91${p}`} className="rounded-full px-5 py-3 bg-white/15 hover:bg-white/25 ring-1 ring-white/30 backdrop-blur font-semibold transition flex items-center gap-2">
                <span>📞</span> {p}
              </a>
            ))}
            <Link to="/contact#book-visit" className="rounded-full px-5 py-3 bg-white text-ink font-bold text-center hover:scale-105 transition">
              Book a Visit
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function BranchPreview() {
  return (
    <section className="relative overflow-hidden bg-section-cool">
      <div className="section py-16 relative">
        <SectionTitle eyebrow="Two campuses" title="Visit us in Hyderabad" center />
        <div className="grid md:grid-cols-2 gap-6">
          {BRANCHES.map((b, idx) => (
            <div key={b.name} className="relative overflow-hidden rounded-3xl bg-white hover-lift"
                 style={{ boxShadow: '0 20px 50px -25px rgba(31,42,68,0.35)' }}>
              <div className="h-1.5" style={{ background: idx === 0 ? 'linear-gradient(90deg, #FF6B6B, #FF9F68)' : 'linear-gradient(90deg, #4ECDC4, #6C63FF)' }} />
              <iframe title={b.name} src={b.mapsEmbed} className="w-full h-56 border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              <div className="p-6">
                <h3 className="heading text-xl">{b.name}</h3>
                <p className="text-ink/70 mt-2">{b.address}</p>
                <div className="flex gap-2 mt-4">
                  <a href={b.directions} target="_blank" rel="noreferrer" className="btn-primary !py-2 !px-4 text-sm">Get Directions</a>
                  <Link to="/contact" className="btn-secondary !py-2 !px-4 text-sm">Contact</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
