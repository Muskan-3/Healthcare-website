import { memo, useCallback, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../components/SectionHeading';
import { Lightbox } from '../components/Lightbox';
import LazyImage from '../components/LazyImage';

const galleryAspectClasses = ['aspect-[4/5]', 'aspect-square', 'aspect-[5/6]', 'aspect-[4/5]', 'aspect-square', 'aspect-[5/6]'] as const;

const galleryTitleMap: Record<string, string> = {
  'Copy of NZ8_1457.JPG': 'Advanced Laser Skin Treatment',
  'Copy of NZ8_1463.JPG': 'Ambient Candle Sculpture',
  'Copy of NZ8_1464.JPG': 'Decorative Reception Accent',
  'Copy of NZ8_1476.JPG': 'Professional Laser Skin Session',
  'Copy of NZ8_1484.JPG': 'Modern Dental Clinic Interior',
  'Copy of NZ8_1485.JPG': 'State-of-the-Art Dental Operatory',
  'Copy of NZ8_1486.JPG': 'Specialized Dental Treatment Room',
  'Copy of NZ8_1488.JPG': 'Smile Inspiration Feature Wall',
  'Copy of NZ8_1489.JPG': 'Comfortable Reception Area',
  'Copy of NZ8_1490.JPG': 'Modern Dental Workspace',
  'Copy of NZ8_1491.JPG': 'Professional Skin Care Session',
  'Copy of NZ8_1492.JPG': 'Patient Reception Experience',
  'Copy of NZ8_1493.JPG': 'Luxury Hospitality Lounge',
  'Copy of NZ8_1494.JPG': 'Advanced Clinical Treatment Suite',
  'Copy of NZ8_1495.JPG': 'Savitri Dental & Maxillofacial Centre Exterior',
  'Copy of NZ8_1496.JPG': 'Contemporary Dental Procedure Bay',
  'sdh hosp 4.png': 'Signature Savitri Branding Wall',
  'sdh hospital.png': 'Patient Hospitality Lounge',
  'sdh hospital 2.png': 'Contemporary Dental Operatory',
  'sdh hospital 3.png': 'Dental Treatment Bay',
  'sdh hospital out.png': 'Savitri Dental Façade View',
};

const galleryImageModules = import.meta.glob('/public/Real-Images/*', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const galleryItems = Object.entries(galleryImageModules)
  .sort(([firstPath], [secondPath]) => firstPath.localeCompare(secondPath))
  .map(([path, image], index) => {
    const fileName = path.split('/').pop() ?? `gallery-image-${index + 1}`;
    const title = galleryTitleMap[fileName] ?? fileName
      .replace(/\.[^.]+$/, '')
      .replace(/^copy of\s+/i, '')
      .replace(/[._-]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    return {
      id: path,
      title: title || `Gallery Image ${index + 1}`,
      image,
    };
  });

export const GallerySection = memo(() => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeItem = useMemo(
    () => (activeIndex !== null ? galleryItems[activeIndex] : undefined),
    [activeIndex],
  );

  const openItem = useCallback((index: number) => setActiveIndex(index), []);
  const closeItem = useCallback(() => setActiveIndex(null), []);

  return (
    <section id="gallery" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Before After Gallery"
        title="Experience Excellence Through Every Space"
        description="From advanced treatment rooms to welcoming patient lounges, discover the environment that makes Savitri Luxury Healthcare truly exceptional."
      />

      <div className="mt-14 columns-1 gap-6 space-y-6 md:columns-2 xl:columns-3">
        {galleryItems.map((item, index) => (
          <motion.button
            key={item.id}
            type="button"
            aria-label={`Open gallery image: ${item.title}`}
            whileHover={{ scale: 1.02 }}
            onClick={() => openItem(index)}
            className="group relative block w-full overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] text-left shadow-2xl shadow-black/35 transform-gpu will-change-transform"
          >
            <div className="h-auto w-full">
              <LazyImage
                src={item.image}
                alt={item.title}
                priority={index < 3}
                className={galleryAspectClasses[index % galleryAspectClasses.length]}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#050214]/90 via-[#050214]/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-white">
              <p className="text-xs uppercase tracking-[0.45em] text-gold/80">Portfolio</p>
              <h3 className="mt-2 font-display text-2xl font-semibold">{item.title}</h3>
            </div>
          </motion.button>
        ))}
      </div>

      <Lightbox
        open={activeIndex !== null}
        title={activeItem?.title}
        image={activeItem?.image}
        onClose={closeItem}
      />
    </section>
  );
});