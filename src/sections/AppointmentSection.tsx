import { FormEvent, memo, useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../components/SectionHeading';

export const AppointmentSection = memo(() => {
  const [form, setForm] = useState({ name: '', phone: '', email: '', treatment: '', message: '' });

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const text = encodeURIComponent(
      `Appointment request:%0AName: ${form.name}%0APhone: ${form.phone}%0AEmail: ${form.email}%0ATreatment: ${form.treatment}%0AMessage: ${form.message}`,
    );
    window.open(`https://wa.me/919956967000?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="appointment" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Appointment"
        title="A premium glassmorphism form with WhatsApp integration"
        description="The final conversion point stays visually aligned with the rest of the site and routes quickly into a direct contact action."
      />

      {/* backdrop-blur-xl removed — glass bg and border retained for premium look */}
      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6 }}
        className="mx-auto mt-14 grid max-w-4xl gap-4 rounded-[32px] border border-white/10 bg-white/[0.05] p-6 shadow-xl shadow-black/35 sm:p-8"
      >
        {[
          { name: 'name', placeholder: 'Name' },
          { name: 'phone', placeholder: 'Phone' },
          { name: 'email', placeholder: 'Email' },
          { name: 'treatment', placeholder: 'Treatment' },
        ].map((field) => (
          <input
            key={field.name}
            type={field.name === 'email' ? 'email' : 'text'}
            placeholder={field.placeholder}
            value={form[field.name as keyof typeof form]}
            onChange={(event) => setForm((current) => ({ ...current, [field.name]: event.target.value }))}
            className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-white placeholder:text-white/45 outline-none transition focus:border-gold/50"
          />
        ))}
        <textarea
          placeholder="Message"
          rows={5}
          value={form.message}
          onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
          className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-white placeholder:text-white/45 outline-none transition focus:border-gold/50"
        />
        <button
          type="submit"
          className="rounded-full bg-gradient-to-r from-gold to-luxe px-7 py-4 text-sm font-semibold text-black transition hover:scale-[1.01]"
        >
          Book Appointment
        </button>
        <a href="https://wa.me/919956967000" target="_blank" rel="noreferrer" className="text-center text-sm text-white/65 transition hover:text-gold">
          Prefer WhatsApp? Tap here to message the clinic directly.
        </a>
      </motion.form>
    </section>
  );
});