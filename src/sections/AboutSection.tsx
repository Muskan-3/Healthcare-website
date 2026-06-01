import { motion } from 'framer-motion';
import { SectionHeading } from '../components/SectionHeading';

export const AboutSection = () => {
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="About Doctor"
        title="Luxury care led by clinical precision and aesthetic intelligence"
        description="Dr. Reema Shukla brings together advanced dental care, maxillofacial surgery, and skin aesthetics under one premium patient experience designed for comfort, clarity, and outcomes."
      />

      <div className="mt-14 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="glass rounded-[32px] p-8"
        >
          <p className="text-sm uppercase tracking-[0.45em] text-gold/80">The Brand</p>
          <h3 className="mt-4 font-display text-4xl font-semibold text-white">Savitri Dental Hospital &amp; Maxillofacial Centre</h3>
          <p className="mt-5 max-w-2xl text-sm leading-8 text-white/70 sm:text-base">
            Built for a premium urban audience, the brand identity blends trust, surgical expertise, and aesthetic refinement into a single cinematic digital experience.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              ['Precision', 'Digital-first treatment planning'],
              ['Luxury', 'Hospital-grade comfort and privacy'],
              ['Confidence', 'Results led by informed consent'],
            ].map(([title, text]) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <h4 className="font-semibold text-white">{title}</h4>
                <p className="mt-2 text-sm leading-6 text-white/65">{text}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="grid gap-4"
        >
          <div className="glass rounded-[30px] p-7">
            <p className="text-xs uppercase tracking-[0.5em] text-gold/80">Doctor</p>
            <h3 className="mt-4 font-display text-2xl font-semibold text-white">Dr. Reema Shukla</h3>
            <p className="mt-1 text-sm text-white/75">Director</p>
            <p className="mt-4 text-sm leading-7 text-white/70">
              Dr. Reema Shukla leads the clinical team with a focus on advanced dental care, maxillofacial surgery, and aesthetic treatments. She prioritizes evidence-based, patient-centered care and long-term outcomes.
            </p>
            <div className="mt-4 space-y-2 text-sm text-white/75">
              <p>Phone: <a href="tel:9956967000" className="text-white">9956967000</a></p>
              <p>Email: <a href="mailto:drreemashukla10@gmail.com" className="text-white">drreemashukla10@gmail.com</a></p>
            </div>
          </div>
          <div className="glass rounded-[30px] p-7">
            <p className="text-xs uppercase tracking-[0.5em] text-gold/80">Clinic Details</p>
            <div className="mt-4 space-y-3 text-sm leading-7 text-white/75">
              <p>66A/2C, Ward No 25, Stanley Road, Prayagraj 211002</p>
              <p>Phone: 9956967000</p>
              <p>Email: drreemashukla10@gmail.com</p>
            </div>
          </div>
          <div className="glass rounded-[30px] p-7">
            <p className="text-xs uppercase tracking-[0.5em] text-gold/80">Care Philosophy</p>
            <p className="mt-4 text-sm leading-8 text-white/70">
              Each treatment is framed to feel calm, premium, and precise, with a visual language that communicates trust before the first consultation even begins.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};