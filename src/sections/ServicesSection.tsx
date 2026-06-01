import { motion } from 'framer-motion';
import { SectionHeading } from '../components/SectionHeading';
import { ServiceCard } from '../components/ServiceCard';
import { dentalServices } from '../data/siteData';
import { Sparkles } from 'lucide-react';

export const ServicesSection = () => {
  const icons = ['🦷', '✨', '🪞', '⚕️'];

  return (
    <section id="dental-services" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Services"
        title="Dental & Maxillofacial services designed with a luxury brand language"
        description="The service presentation is intentionally premium, with glass cards, glowing borders, and cinematic depth that echo the hero design."
      />

      <div className="mt-14 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="glass rounded-[32px] p-8"
        >
          <p className="text-xs uppercase tracking-[0.55em] text-gold/80">Core Offerings</p>
          <h3 className="mt-4 font-display text-4xl font-semibold text-white">Cosmetic, surgical, and restorative care in one experience</h3>
          <p className="mt-4 text-sm leading-8 text-white/70">
            Every service card is crafted to feel like a premium treatment category rather than a simple clinic listing.
          </p>
          <div className="mt-8 flex items-center gap-3 text-sm text-white/70">
            <Sparkles className="text-gold" size={18} />
            Designed for a polished, future-forward hospital presence.
          </div>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2">
          {dentalServices.map((service, index) => (
            <ServiceCard
              key={service}
              title={service}
              description="High-trust treatment planning, premium patient comfort, and results-focused care delivery."
              icon={icons[index % icons.length]}
            />
          ))}
        </div>
      </div>
    </section>
  );
};