import SectionTitle from '../components/SectionTitle.jsx';
import { Blob, Sparkle, GradientStripe } from '../components/Decor.jsx';

const reasons = [
  { icon: '🎯', title: 'Tailored Curriculum', body: 'Age-appropriate programs designed by early-childhood experts.', tone: 'brand' },
  { icon: '🤗', title: 'Loving Environment', body: 'Small class sizes mean every child gets real attention.', tone: 'coral' },
  { icon: '🌱', title: 'Holistic Growth', body: 'Cognitive, emotional, social and physical development together.', tone: 'leaf' },
  { icon: '🎶', title: 'Music & Movement', body: 'Daily music, dance and storytelling to spark imagination.', tone: 'gold' },
  { icon: '🧠', title: 'Mindful Discipline', body: 'Positive guidance — not punishment — shapes confident kids.', tone: 'indigo' },
  { icon: '👨‍👩‍👧', title: 'Family Partnership', body: 'Parents are partners — frequent updates and open communication.', tone: 'teal' },
];

const TONE = {
  brand: 'bg-brand/10 ring-brand/30 text-brand',
  coral: 'bg-coral/10 ring-coral/30 text-coral',
  leaf: 'bg-leaf/10 ring-leaf/30 text-leaf',
  gold: 'bg-gold/15 ring-gold/40 text-amber-600',
  indigo: 'bg-indigo2/10 ring-indigo2/30 text-indigo2-600',
  teal: 'bg-teal/10 ring-teal/30 text-teal-600',
};

export default function About() {
  return (
    <>
      <GradientStripe />
      <section className="relative overflow-hidden bg-section-warm">
        <Blob tone="brand" size="w-80 h-80" className="-top-20 -left-20" />
        <Blob tone="teal" size="w-72 h-72" className="-bottom-10 -right-20" style={{ animationDelay: '-4s' }} />
        <div className="section py-16 relative">
          <span className="chip-teal inline-flex items-center gap-2"><Sparkle size={12} /> About Happy Little Leaders</span>
          <h1 className="heading text-4xl sm:text-5xl mt-4">
            <span className="gradient-text">Born to Win</span> — every child, every day
          </h1>
          <p className="mt-5 text-lg text-ink/70 max-w-3xl">
            Happy Little Leaders is a premium preschool with two campuses in Hyderabad, dedicated to nurturing
            curious, confident and kind little humans through joyful, play-based learning.
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-section-cream">
        <div className="section py-12 grid md:grid-cols-2 gap-6 relative">
          <div className="premium-card">
            <div className="w-12 h-12 rounded-2xl grid place-items-center bg-gold/20 ring-2 ring-gold/40 mb-3">
              <Sparkle size={20} className="text-amber-600" />
            </div>
            <h2 className="heading text-2xl">Our Vision</h2>
            <p className="mt-3 text-ink/80">
              To raise a generation of kind, curious and confident children — leaders who believe they are
              <em> Born to Win</em>, and who treat the world with empathy and wonder.
            </p>
          </div>
          <div className="premium-card">
            <div className="w-12 h-12 rounded-2xl grid place-items-center bg-brand/10 ring-2 ring-brand/30 mb-3">
              <Sparkle size={20} className="text-brand" />
            </div>
            <h2 className="heading text-2xl">Our Mission</h2>
            <p className="mt-3 text-ink/80">
              To create a safe, joyful and stimulating environment where every child can play, learn and grow at their own pace —
              supported by qualified teachers and a thoughtful, modern curriculum.
            </p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-section-cool">
        <Blob tone="teal" size="w-72 h-72" className="-top-10 -left-20" />
        <Blob tone="indigo" size="w-72 h-72" className="-bottom-10 -right-10" style={{ animationDelay: '-5s' }} />
        <div className="section py-12 relative">
          <SectionTitle eyebrow="Teaching philosophy" title="Play first. Learning follows." subtitle="Young children learn best when they're free to play, ask questions and explore. Our daily routines weave structured learning into unstructured fun." />
          <div className="grid md:grid-cols-3 gap-6">
            <div className="premium-card">
              <div className="font-bold text-lg mb-1 flex items-center gap-2"><span className="text-2xl">🧩</span> Play-Based</div>
              <p className="text-ink/70">Sensory play, role play and exploration build problem-solving skills.</p>
            </div>
            <div className="premium-card">
              <div className="font-bold text-lg mb-1 flex items-center gap-2"><span className="text-2xl">🎨</span> Creative</div>
              <p className="text-ink/70">Art, music and storytelling make every day memorable and meaningful.</p>
            </div>
            <div className="premium-card">
              <div className="font-bold text-lg mb-1 flex items-center gap-2"><span className="text-2xl">💛</span> Inclusive</div>
              <p className="text-ink/70">Every child is celebrated for who they are. No labels, just love.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-section-warm">
        <div className="section py-16 relative">
          <SectionTitle eyebrow="Why choose us" title="Reasons families love HLL" center />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {reasons.map((r) => (
              <div key={r.title} className="premium-card hover-lift">
                <div className={`w-12 h-12 rounded-2xl grid place-items-center ring-2 mb-3 ${TONE[r.tone]}`}>
                  <span className="text-2xl">{r.icon}</span>
                </div>
                <div className="font-display font-extrabold text-lg">{r.title}</div>
                <p className="text-sm text-ink/70 mt-2">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
