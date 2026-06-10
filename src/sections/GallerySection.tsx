import { memo, useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../components/SectionHeading';
import { Lightbox } from '../components/Lightbox';
import LazyImage from '../components/LazyImage';

const galleryAspectClasses = [
  'aspect-[4/5]', 'aspect-square', 'aspect-[5/6]',
  'aspect-[4/5]', 'aspect-square', 'aspect-[5/6]',
] as const;

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
  'Copy of NZ8_1495.JPG': 'Savitri Dental & Maxillofacial Centre Exterior',
  'Copy of NZ8_1496.JPG': 'Contemporary Dental Procedure Bay',
  'sdh hosp 4.png': 'Signature Savitri Branding Wall',
  'sdh hospital 2.png': 'Contemporary Dental Operatory',
  'sdh hospital 3.png': 'Dental Treatment Bay',
  'sdh hospital out.png': 'Savitri Dental Façade View',
  'sdh hospital.png': 'Patient Hospitality Lounge',
};

const GALLERY_IMAGE_NAMES = [
  'Copy of NZ8_1457.JPG',
  'Copy of NZ8_1463.JPG',
  'Copy of NZ8_1464.JPG',
  'Copy of NZ8_1476.JPG',
  'Copy of NZ8_1484.JPG',
  'Copy of NZ8_1485.JPG',
  'Copy of NZ8_1486.JPG',
  'Copy of NZ8_1488.JPG',
  'Copy of NZ8_1489.JPG',
  'Copy of NZ8_1490.JPG',
  'Copy of NZ8_1491.JPG',
  'Copy of NZ8_1492.JPG',
  'Copy of NZ8_1493.JPG',
  'Copy of NZ8_1495.JPG',
  'Copy of NZ8_1496.JPG',
  'sdh hosp 4.png',
  'sdh hospital 2.png',
  'sdh hospital 3.png',
  'sdh hospital out.png',
  'sdh hospital.png',
];

type GalleryItem = { id: string; title: string; image: string };

const galleryItems: GalleryItem[] = GALLERY_IMAGE_NAMES.map((fileName, index) => {
  const mapped = galleryTitleMap[fileName];
  const title = mapped || (fileName
    .replace(/\.[^.]+$/, '')
    .replace(/^copy of\s+/i, '')
    .replace(/[._-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()) || `Gallery Image ${index + 1}`;

  return {
    id: fileName,
    title,
    image: `/Real-Images/${fileName}`,
  };
});

// Card component is memoized so Lightbox open/close doesn't re-render all cards
const GalleryCard = memo(({
  item, index, onClick,
}: { item: GalleryItem; index: number; onClick: (i: number) => void }) => (
  <motion.button
    type="button"
    aria-label={`Open gallery image: ${item.title}`}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.1 }}
    variants={{
      hidden: { opacity: 0, y: 20, scale: 0.98 },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: 'spring', stiffness: 100, damping: 20 },
      },
      hover: {
        y: -4,
        scale: 1.01,
        transition: { type: 'spring', stiffness: 400, damping: 25 },
      },
      tap: {
        scale: 0.98,
        transition: { duration: 0.1 },
      },
    }}
    whileHover="hover"
    whileTap="tap"
    onClick={() => onClick(index)}
    className="group relative block w-full overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] text-left shadow-2xl shadow-black/35 transform-gpu will-change-transform cursor-pointer"
  >
    <div className="h-auto w-full overflow-hidden">
      <LazyImage
        src={item.image}
        alt={item.title}
        priority={index < 3}
        className={galleryAspectClasses[index % galleryAspectClasses.length]}
        imgClassName="transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
      />
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-[#050214]/90 via-[#050214]/10 to-transparent" />
    <div className="absolute inset-x-0 bottom-0 p-5 text-white">
      <p className="text-xs uppercase tracking-[0.45em] text-gold/80">Portfolio</p>
      <h3 className="mt-2 font-display text-2xl font-semibold">{item.title}</h3>
    </div>
  </motion.button>
));

export const GallerySection = memo(() => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const activeItem = activeIndex !== null ? galleryItems[activeIndex] : undefined;

  const openItem = useCallback((index: number) => setActiveIndex(index), []);
  const closeItem = useCallback(() => setActiveIndex(null), []);

  return (
    <section id="gallery" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Before After Gallery"
        title="Real Results, Beautiful Transformations"
        description="Discover the remarkable outcomes achieved through our advanced dental, aesthetic, and maxillofacial treatments."
      />

      <div className="mt-14 columns-1 gap-6 space-y-6 md:columns-2 xl:columns-3">
        {galleryItems.map((item, index) => (
          <GalleryCard key={item.id} item={item} index={index} onClick={openItem} />
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