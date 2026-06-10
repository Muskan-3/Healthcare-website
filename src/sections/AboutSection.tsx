import { memo } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../components/SectionHeading';

/* ── Pillar data with SVG icons ─────────────────────────────────────────── */
const PILLARS = [
  {
    title: 'Precision',
    text: 'Digital-first treatment planning',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
        <path d="M5.636 5.636l2.122 2.122M16.243 16.243l2.121 2.121M5.636 18.364l2.122-2.121M16.243 7.757l2.121-2.121" />
      </svg>
    ),
  },
  {
    title: 'Luxury',
    text: 'Hospital-grade comfort and privacy',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
      </svg>
    ),
  },
  {
    title: 'Confidence',
    text: 'Results led by informed consent',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M9 12l2 2 4-4" />
        <path d="M12 3a9 9 0 1 0 0 18A9 9 0 0 0 12 3z" />
      </svg>
    ),
  },
];

/* ── Framer Motion variants ─────────────────────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.14, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

/* ── Floating background particles (purely decorative) ──────────────────── */
const PARTICLES = [
  { top: '12%', left: '8%', size: 3, dur: '7s', delay: '0s' },
  { top: '28%', left: '18%', size: 2, dur: '9s', delay: '1.2s' },
  { top: '55%', left: '5%', size: 4, dur: '11s', delay: '0.4s' },
  { top: '75%', left: '22%', size: 2, dur: '8s', delay: '2s' },
  { top: '10%', left: '85%', size: 3, dur: '10s', delay: '0.8s' },
  { top: '40%', left: '90%', size: 2, dur: '7s', delay: '1.6s' },
  { top: '68%', left: '78%', size: 4, dur: '12s', delay: '0.2s' },
  { top: '88%', left: '60%', size: 2, dur: '9s', delay: '3s' },
];

/* ── Right-side cards data ───────────────────────────────────────────────── */
const RIGHT_CARDS = [
  {
    label: 'Doctor',
    content: (
      <>
        <h3 className="mt-4 font-display text-2xl font-semibold text-white">Dr. Reema Shukla</h3>
        <p className="mt-1 text-sm text-white/60 tracking-wide">Director & Lead Clinician</p>
        <p className="mt-4 text-sm leading-7 text-white/70">
          Dr. Reema Shukla leads the clinical team with a focus on advanced dental care, maxillofacial surgery, and
          aesthetic treatments. She prioritizes evidence-based, patient-centered care and long-term outcomes.
        </p>
        <div className="mt-4 space-y-1.5 text-sm text-white/65">
          <p>
            Phone:{' '}
            <a href="tel:9956967000" className="text-white hover:text-gold transition-colors duration-200">
              9956967000
            </a>
          </p>
          <p>
            Email:{' '}
            <a href="mailto:drreemashukla10@gmail.com" className="text-white hover:text-gold transition-colors duration-200">
              drreemashukla10@gmail.com
            </a>
          </p>
        </div>
        <div className="mt-6 flex items-center gap-4">
          <a
            href="https://wa.me/919956967000"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contact Dr. Reema on WhatsApp"
            className="w-12 h-12 rounded-full transition-transform duration-300 hover:scale-110 shadow-[0_4px_14px_rgba(0,0,0,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#04010D]"
          >
            <img src="/whatsapp.png" alt="WhatsApp" className="w-full h-full object-cover rounded-full" width="48" height="48" loading="lazy" decoding="async" />
          </a>
          <a
            href="https://www.instagram.com/drreemashukla/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow Dr. Reema on Instagram"
            className="w-12 h-12 rounded-full transition-transform duration-300 hover:scale-110 shadow-[0_4px_14px_rgba(0,0,0,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#04010D]"
          >
            <img src="/instagram.png" alt="Instagram" className="w-full h-full object-cover rounded-full" width="48" height="48" loading="lazy" decoding="async" />
          </a>
          <a
            href="https://www.facebook.com/savitridentalhospital"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow Savitri Dental Hospital on Facebook"
            className="w-12 h-12 rounded-full transition-transform duration-300 hover:scale-110 shadow-[0_4px_14px_rgba(0,0,0,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#04010D]"
          >
            <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <circle cx="24" cy="24" r="24" fill="#1877F2" />
              <path
                fill="white"
                d="M26.8 25.6h2.8l1.1-4.4h-3.9v-2.3c0-1.2.4-2.2 1.8-2.2h2.1v-3.8
                   c-.4-.05-1.5-.15-2.7-.15-3.2 0-5.1 1.9-5.1 5.1v3.35H20v4.4h2.9V36h3.9V25.6z"
              />
            </svg>
          </a>
        </div>
      </>
    ),
  },
  {
    label: 'Clinic Details',
    content: (
      <div className="mt-4 space-y-2 text-sm leading-7 text-white/70">
        <p>66A/2C, Ward No 25, Stanley Road, Prayagraj 211002</p>
        <p>Phone: 9956967000</p>
        <p>Email: drreemashukla10@gmail.com</p>
      </div>
    ),
  },
  {
    label: 'Care Philosophy',
    content: (
      <p className="mt-4 text-sm leading-8 text-white/70">
        Each treatment is framed to feel calm, premium, and precise — with a visual language that communicates trust
        before the first consultation even begins.
      </p>
    ),
  },
];

/* ═══════════════════════════════════════════════════════════════════════════ */
export const AboutSection = memo(() => {
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 overflow-hidden">

      {/* ── Floating background particles ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full opacity-30"
            style={{
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
              background: i % 2 === 0 ? 'rgba(245,197,66,0.9)' : 'rgba(192,132,252,0.9)',
              animation: `float-y ${p.dur} ease-in-out ${p.delay} infinite`,
            }}
          />
        ))}
        {/* Ambient radial glows */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-purple-900/20 blur-[80px]" />
        <div className="absolute -bottom-24 right-0 w-80 h-80 rounded-full bg-gold/5 blur-[70px]" />
      </div>

      {/* ── Section heading ── */}
      <SectionHeading
        eyebrow="About Doctor"
        title="Luxury care led by clinical precision and aesthetic intelligence"
        description="Dr. Reema Shukla brings together advanced dental care, maxillofacial surgery, and skin aesthetics under one premium patient experience designed for comfort, clarity, and outcomes."
      />

      {/* ── Main grid ── */}
      <div className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-start">

        {/* ── LEFT — THE BRAND card ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="relative self-start rounded-[32px] overflow-hidden
                     glass border border-white/10
                     shadow-[0_8px_48px_rgba(76,29,149,0.22),0_0_0_1px_rgba(245,197,66,0.10)]
                     transition-all duration-500
                     hover:shadow-[0_12px_64px_rgba(139,61,255,0.30),0_0_0_1px_rgba(245,197,66,0.24),0_0_28px_rgba(245,197,66,0.10)]
                     hover:-translate-y-1"
        >
          {/* Golden shimmer sweep */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background: 'linear-gradient(105deg, transparent 35%, rgba(245,197,66,0.07) 50%, transparent 65%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 5s ease-in-out infinite',
            }}
          />

          {/* Subtle top-left corner glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-10 -left-10 w-52 h-52 rounded-full blur-[60px]"
            style={{ background: 'rgba(139,61,255,0.18)' }}
          />

          <div className="relative z-10 p-8 sm:p-10">
            {/* Eyebrow */}
            <motion.p variants={itemVariants} className="text-xs uppercase tracking-[0.5em] text-gold/80">
              The Brand
            </motion.p>

            {/* Title */}
            <motion.h3 variants={itemVariants} className="mt-4 font-display text-3xl sm:text-4xl font-semibold text-white leading-tight">
              Savitri Dental Hospital &amp; Maxillofacial Centre
            </motion.h3>

            {/* Description */}
            <motion.p variants={itemVariants} className="mt-5 text-sm leading-8 text-white/70 sm:text-base">
              Built for a premium urban audience, the brand identity blends trust, surgical expertise, and aesthetic
              refinement into a single cinematic digital experience.
            </motion.p>

            {/* Gold divider */}
            <motion.div
              variants={itemVariants}
              className="mt-8 h-px w-20 rounded-full"
              style={{ background: 'linear-gradient(90deg, rgba(245,197,66,0.6), transparent)' }}
            />

            {/* Pillar cards */}
            <motion.div variants={itemVariants} className="mt-6 grid gap-3 sm:grid-cols-3">
              {PILLARS.map(({ title, text, icon }) => (
                <div
                  key={title}
                  className="group relative rounded-2xl border border-white/10 bg-white/[0.04] p-5
                             transition-all duration-350
                             hover:border-gold/30 hover:bg-white/[0.07]
                             hover:shadow-[0_4px_24px_rgba(245,197,66,0.10),0_0_0_1px_rgba(245,197,66,0.18)]
                             hover:-translate-y-0.5"
                >
                  {/* Icon badge */}
                  <div
                    className="mb-3 inline-flex items-center justify-center w-9 h-9 rounded-xl
                               border border-gold/25 bg-gold/10 text-gold
                               icon-glow-pulse group-hover:scale-110 transition-transform duration-300"
                  >
                    {icon}
                  </div>
                  <h4 className="font-semibold text-white text-sm">{title}</h4>
                  <p className="mt-1.5 text-xs leading-5 text-white/60">{text}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* ── RIGHT — stacked cards ── */}
        <div className="flex flex-col gap-5">
          {RIGHT_CARDS.map(({ label, content }, i) => (
            <motion.div
              key={label}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="glass rounded-[28px] border border-white/10 p-7
                         shadow-[0_4px_32px_rgba(76,29,149,0.16)]
                         transition-all duration-400
                         hover:border-gold/25
                         hover:shadow-[0_8px_40px_rgba(139,61,255,0.22),0_0_0_1px_rgba(245,197,66,0.18),0_0_18px_rgba(245,197,66,0.08)]
                         hover:-translate-y-1"
            >
              <p className="text-xs uppercase tracking-[0.5em] text-gold/80">{label}</p>
              {content}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});