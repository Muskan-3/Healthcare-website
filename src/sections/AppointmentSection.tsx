import { FormEvent, memo, useCallback, useState } from 'react';
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

// Stable module-level constant — no new array object created per render
const TEXT_FIELDS = [
  { name: 'name' as const, placeholder: 'Name', type: 'text' },
  { name: 'phone' as const, placeholder: 'Phone', type: 'text' },
  { name: 'email' as const, placeholder: 'Email', type: 'email' },
];

const INITIAL_FORM = {
  name: '', phone: '', email: '',
  treatmentCategory: '', treatment: '', message: '',
};

export const AppointmentSection = memo(() => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitError, setSubmitError] = useState('');

  const submit = useCallback((event: FormEvent) => {
    event.preventDefault();
    if (!form.treatmentCategory || !form.treatment) {
      setSubmitError('Please select both a treatment category and treatment to continue.');
      return;
    }
    setSubmitError('');
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
    window.location.assign(`https://wa.me/919956967000?text=${text}`);
  }, [form]);

  const handleCategoryChange = useCallback((value: string) => {
    setSubmitError('');
    setForm((current) => ({ ...current, treatmentCategory: value, treatment: '' }));
  }, []);

  const handleTreatmentChange = useCallback((value: string) => {
    setSubmitError('');
    setForm((current) => ({ ...current, treatment: value }));
  }, []);

  const selectedTreatmentOptions = form.treatmentCategory
    ? treatmentOptions[form.treatmentCategory as keyof typeof treatmentOptions]
    : [];

  return (
    <section id="appointment" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Appointment"
        title="Reserve Your Personalized Consultation"
        description="Connect with our specialists to discuss your healthcare, dental, and aesthetic goals in a private, professional, and luxurious environment."
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
        {TEXT_FIELDS.map((field) => (
          <input
            key={field.name}
            type={field.type}
            placeholder={field.placeholder}
            value={form[field.name]}
            onChange={(event) => {
              setSubmitError('');
              setForm((current) => ({ ...current, [field.name]: event.target.value }));
            }}
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
            onChange={handleCategoryChange}
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
            onChange={handleTreatmentChange}
          />
        </div>
        <textarea
          placeholder="Message"
          rows={5}
          value={form.message}
          onChange={(event) => {
            setSubmitError('');
            setForm((current) => ({ ...current, message: event.target.value }));
          }}
          className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-white placeholder:text-white/45 outline-none transition focus:border-gold/50"
        />
        {submitError ? <p className="text-sm text-[#FFD86B]" role="status" aria-live="polite">{submitError}</p> : null}
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