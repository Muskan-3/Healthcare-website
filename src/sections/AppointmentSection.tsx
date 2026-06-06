import { FormEvent, memo, useState } from 'react';
import { motion } from 'framer-motion';
import { FormSelectField } from '../components/FormSelectField';
import { SectionHeading } from '../components/SectionHeading';

const treatmentCategories = [
  { label: 'Dental Treatments', value: 'Dental Treatments' },
  { label: 'Facial Aesthetic Treatments', value: 'Facial Aesthetic Treatments' },
];

const treatmentOptions = {
  'Dental Treatments': [
    { label: 'Dental Consultation', value: 'Dental Consultation' },
    { label: 'Smile Design', value: 'Smile Design' },
    { label: 'Cosmetic Dentistry', value: 'Cosmetic Dentistry' },
    { label: 'Dental Procedures', value: 'Dental Procedures' },
    { label: 'Maxillofacial Treatments', value: 'Maxillofacial Treatments' },
  ],
  'Facial Aesthetic Treatments': [
    { label: 'Premium Hydra Facial', value: 'Premium Hydra Facial' },
    { label: 'Carbon Facial', value: 'Carbon Facial' },
    { label: 'Vampire Facial', value: 'Vampire Facial' },
    { label: 'Exoluxe Facial', value: 'Exoluxe Facial' },
    { label: 'Power Glow Facial', value: 'Power Glow Facial' },
    { label: 'Collagen Boost Mesofacial', value: 'Collagen Boost Mesofacial' },
    { label: 'GFC Glow Therapy', value: 'GFC Glow Therapy' },
    { label: 'Pumpkin Peel', value: 'Pumpkin Peel' },
  ],
} as const;

export const AppointmentSection = memo(() => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    treatmentCategory: '',
    treatment: '',
    message: '',
  });

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!form.treatmentCategory || !form.treatment) {
      return;
    }

    const text = encodeURIComponent(
      [
        'Appointment request:',
        `Name: ${form.name}`,
        `Phone: ${form.phone}`,
        `Email: ${form.email}`,
        `Treatment Category: ${form.treatmentCategory}`,
        `Treatment: ${form.treatment}`,
        `Message: ${form.message}`,
      ].join('%0A'),
    );
    window.open(`https://wa.me/919956967000?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const selectedTreatmentOptions = form.treatmentCategory
    ? treatmentOptions[form.treatmentCategory as keyof typeof treatmentOptions]
    : [];

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
        noValidate
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6 }}
        className="mx-auto mt-14 grid max-w-4xl gap-4 rounded-[32px] border border-white/10 bg-white/[0.05] p-6 shadow-xl shadow-black/35 sm:p-8"
      >
        {[
          { name: 'name', placeholder: 'Name', type: 'text' },
          { name: 'phone', placeholder: 'Phone', type: 'text' },
          { name: 'email', placeholder: 'Email', type: 'email' },
        ].map((field) => (
          <input
            key={field.name}
            type={field.type}
            placeholder={field.placeholder}
            value={form[field.name as keyof typeof form]}
            onChange={(event) => setForm((current) => ({ ...current, [field.name]: event.target.value }))}
            className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-white placeholder:text-white/45 outline-none transition focus:border-gold/50"
          />
        ))}
        <div className="grid gap-4 md:grid-cols-2">
          <FormSelectField
            id="treatment-category"
            name="treatmentCategory"
            label="Treatment Category"
            value={form.treatmentCategory}
            placeholder="Select treatment category"
            options={treatmentCategories}
            required
            onChange={(value) =>
              setForm((current) => ({
                ...current,
                treatmentCategory: value,
                treatment: '',
              }))
            }
          />
          <FormSelectField
            id="treatment"
            name="treatment"
            label="Treatment"
            value={form.treatment}
            placeholder={form.treatmentCategory ? 'Select treatment' : 'Select a category first'}
            options={selectedTreatmentOptions}
            required
            disabled={!form.treatmentCategory}
            onChange={(value) => setForm((current) => ({ ...current, treatment: value }))}
          />
        </div>
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
        <a href="https://wa.me/919956967000" target="_blank" rel="noopener noreferrer" className="text-center text-sm text-white/65 transition hover:text-gold">
          Prefer WhatsApp? Tap here to message the clinic directly.
        </a>
      </motion.form>
    </section>
  );
});