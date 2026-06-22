import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { memo, useEffect, useRef } from 'react';

const Stat = memo(({ end, label, floatDelay = '0s' }: { end: number; label: string; floatDelay?: string }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const value = useMotionValue(0);
  const rounded = useTransform(value, (latest) => Math.round(latest));

  useEffect(() => {
    if (inView) {
      const controls = animate(value, end, { duration: 1.4, ease: 'easeOut' });
      return () => controls.stop();
    }
  }, [end, inView, value]);

  return (
    <div
      ref={ref}
      className="card-float glow-card glass rounded-[28px] p-6 text-center"
      style={{ animationDelay: floatDelay }}
    >
      <motion.div className="font-body text-5xl font-bold tracking-tight text-gold">{rounded}</motion.div>
      <p className="mt-3 text-sm uppercase tracking-[0.35em] text-white/65">{label}</p>
    </div>
  );
});

export const AchievementsSection = memo(() => {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="grid gap-6 md:grid-cols-3">
        <Stat end={12}   label="Years of excellence"    floatDelay="0s" />
        <Stat end={8000} label="Successful outcomes"    floatDelay="-1.8s" />
        <Stat end={24}   label="Hour patient guidance"  floatDelay="-3.2s" />
      </div>
    </section>
  );
});