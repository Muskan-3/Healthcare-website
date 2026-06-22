import { memo, useRef, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize2, X, PlayCircle } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';

/* ─── Video catalogue ──────────────────────────────────────────────────────── */
type VideoItem = {
  id: string;
  file: string;
  title: string;
  caption: string;
  tag: string;
};

const VIDEOS: VideoItem[] = [
  {
    id: 'sdh-ad',
    file: '/videos/SDH ad (GMB).mp4',
    title: 'Experience World-Class Dental Care',
    caption:
      'Discover the Savitri Dental Hospital & Maxillofacial Clinic difference — state-of-the-art technology, expert specialists, and personalised care all under one roof.',
    tag: 'Clinic Spotlight',
  },
  {
    id: 'sdh-braces-myth',
    file: '/videos/SDH braces myth (GMB).mp4',
    title: 'Breaking the Braces Myths',
    caption:
      "Think braces are painful, visible, or only for kids? Think again. Dr. Reema Shukla debunks the most common misconceptions about orthodontic treatment.",
    tag: 'Expert Insights',
  },
  {
    id: 'sdh-karishma',
    file: '/videos/SDH collabs with Karishma (GMB).mp4',
    title: "Karishma's Smile Transformation",
    caption:
      "Karishma shares her personal journey to a confident, radiant smile — and why she chose Savitri Dental Hospital for her complete smile makeover.",
    tag: 'Patient Story',
  },
  {
    id: 'sdh-paroma',
    file: '/videos/SDH collabs with Paroma(GMB).mp4',
    title: "Paroma's Confidence Renewed",
    caption:
      'Paroma opens up about how advanced dental treatment at SDH transformed not just her smile but her self-confidence and quality of life.',
    tag: 'Patient Story',
  },
  {
    id: 'sdh-perfect',
    file: '/videos/SDH everything looks perfect.mp4',
    title: 'Everything Looks Perfect',
    caption:
      'A behind-the-scenes look at the precision, artistry, and care that goes into every smile — because at SDH, perfection is the standard.',
    tag: 'Our Craft',
  },
];

/* ─── TAG pill colours ─────────────────────────────────────────────────────── */
const TAG_STYLES: Record<string, string> = {
  'Clinic Spotlight': 'bg-[#8B3DFF]/20 text-[#c084fc] border-[#8B3DFF]/30',
  'Expert Insights': 'bg-[#F5C542]/10 text-[#F5C542] border-[#F5C542]/25',
  'Patient Story': 'bg-[#34d399]/10 text-[#34d399] border-[#34d399]/25',
  'Our Craft': 'bg-[#60a5fa]/10 text-[#60a5fa] border-[#60a5fa]/25',
};

/* ─── Lightbox player ──────────────────────────────────────────────────────── */
const VideoLightbox = memo(({
  video,
  onClose,
}: {
  video: VideoItem;
  onClose: () => void;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.play().then(() => setPlaying(true)).catch(() => { });
    return () => { el.pause(); };
  }, []);

  const togglePlay = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) { el.play(); setPlaying(true); }
    else { el.pause(); setPlaying(false); }
  }, []);

  const toggleMute = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
  }, []);

  const openFullscreen = useCallback(() => {
    videoRef.current?.requestFullscreen?.();
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        key="lightbox-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center px-6 pb-6 pt-20"
        style={{ background: 'rgba(4,1,13,0.92)' }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`Playing: ${video.title}`}
      >
        <motion.div
          key="lightbox-panel"
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ type: 'spring', stiffness: 220, damping: 26 }}
          onClick={(e) => e.stopPropagation()}
          className="relative flex flex-col overflow-hidden rounded-[20px] border border-white/10 shadow-[0_24px_80px_rgba(76,29,149,0.45),0_0_0_1px_rgba(245,197,66,0.08)]"
          style={{
            width: '100%',
            maxWidth: 560,         /* Wide enough for comfortable controls */
            background: 'rgba(5,2,20,0.96)',
          }}
        >
          {/* Gold shimmer overlay */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10"
            style={{
              background: 'linear-gradient(105deg, transparent 35%, rgba(245,197,66,0.04) 50%, transparent 65%)',
              animation: 'shimmer 6s ease-in-out infinite',
            }}
          />

          {/*
           * Video container:
           *   • Fixed width (inherits 560px panel), height driven by max-height.
           *   • max-height: 68vh leaves room for the controls bar + backdrop
           *     padding on a 1080p screen — the entire modal stays visible.
           *   • The <video> fills the container with object-contain so both
           *     portrait (9:16) and landscape (16:9 / 4:3) fit without cropping.
           *   • background #000 fills the letterbox bars for landscape content.
           */}
          <div
            className="relative w-full overflow-hidden flex items-center justify-center"
            style={{ maxHeight: '68vh', background: '#000' }}
          >
            <video
              ref={videoRef}
              src={video.file}
              className="block w-full object-contain"
              style={{ maxHeight: '68vh' }}
              playsInline
              preload="auto"
              onEnded={() => setPlaying(false)}
            />
          </div>

          {/* Controls bar */}
          <div className="relative z-20 flex items-center justify-between gap-4 px-5 py-3 border-t border-white/[0.06]">
            <div className="flex items-center gap-3">
              <button
                id={`lb-play-${video.id}`}
                onClick={togglePlay}
                aria-label={playing ? 'Pause video' : 'Play video'}
                className="flex items-center justify-center w-8 h-8 rounded-full border border-white/15 bg-white/[0.06] text-white hover:bg-white/[0.12] transition-colors duration-200"
              >
                {playing ? <Pause size={14} /> : <Play size={14} />}
              </button>
              <button
                id={`lb-mute-${video.id}`}
                onClick={toggleMute}
                aria-label={muted ? 'Unmute video' : 'Mute video'}
                className="flex items-center justify-center w-8 h-8 rounded-full border border-white/15 bg-white/[0.06] text-white hover:bg-white/[0.12] transition-colors duration-200"
              >
                {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>
              <span className="text-xs font-medium text-white/50 truncate max-w-[160px] sm:max-w-xs">
                {video.title}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                id={`lb-fullscreen-${video.id}`}
                onClick={openFullscreen}
                aria-label="Open fullscreen"
                className="flex items-center justify-center w-8 h-8 rounded-full border border-white/15 bg-white/[0.06] text-white hover:bg-white/[0.12] transition-colors duration-200"
              >
                <Maximize2 size={13} />
              </button>
              <button
                id={`lb-close-${video.id}`}
                onClick={onClose}
                aria-label="Close video player"
                className="flex items-center justify-center w-8 h-8 rounded-full border border-white/15 bg-white/[0.06] text-white/70 hover:text-white hover:bg-white/[0.12] transition-colors duration-200"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
});
VideoLightbox.displayName = 'VideoLightbox';

/* ─── Video thumbnail block ─────────────────────────────────────────────────
 * Key rules:
 *  • The wrapper is overflow-hidden — scale transform is clipped here, not
 *    at the card boundary, so hover zoom never overflows the card border.
 *  • The <video> is block / w-full / h-auto → intrinsic height, no black bars.
 *  • A tall bottom gradient fades the frame into the card background colour
 *    so there is no hard seam between the video area and the text block.
 *  • While the thumbnail is loading the wrapper has a min-height so the
 *    skeleton shimmer is visible; once loaded the video drives the height.
 * ────────────────────────────────────────────────────────────────────────── */
const VideoThumb = ({
  video,
  featured = false,
}: {
  video: VideoItem;
  featured?: boolean;
}) => {
  const thumbRef = useRef<HTMLVideoElement>(null);
  const [thumbReady, setThumbReady] = useState(false);
  const tagStyle = TAG_STYLES[video.tag] ?? 'bg-white/10 text-white/70 border-white/10';

  useEffect(() => {
    const el = thumbRef.current;
    if (!el) return;
    const onLoaded = () => setThumbReady(true);
    el.addEventListener('loadeddata', onLoaded, { once: true });
    return () => el.removeEventListener('loadeddata', onLoaded);
  }, []);

  return (
    /* ── VideoThumb return ──────────────────────────────────────────────────
     * CLIPPING STRATEGY
     * overflow-hidden alone doesn't always clip scaled children when the
     * parent is on a GPU compositing layer (Framer Motion transforms).
     *
     * Fix: give this wrapper
     *   • isolation: isolate  — creates a new stacking context
     *   • will-change: transform  — promotes it to its own compositing layer
     *   • overflow: hidden  — now clips within that layer
     *
     * ADDITIONALLY: we no longer scale the video on hover — CSS filter
     * brightness is used instead, which never causes overflow.
     * ──────────────────────────────────────────────────────────────────── */
    <div
      className="relative w-full overflow-hidden"
      style={{
        isolation: 'isolate',
        willChange: 'transform',
        /*
         * maxHeight caps the thumbnail area so portrait videos don't make
         * cards excessively tall. object-contain on the <video> preserves
         * the original aspect ratio — nothing is cropped; the video simply
         * sits within the constrained box (pillarboxed if portrait).
         * The card background fills any empty space seamlessly.
         */
        maxHeight: featured ? 220 : 170,
        minHeight: thumbReady ? undefined : (featured ? 180 : 130),
      }}
    >
      {/* Skeleton shimmer */}
      {!thumbReady && (
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(110deg, rgba(139,61,255,0.08) 0%, rgba(5,2,20,0.5) 45%, rgba(139,61,255,0.08) 100%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.8s linear infinite',
          }}
        />
      )}

      {/*
       * h-full + object-contain → fills the constrained wrapper height
       * while preserving the video's original aspect ratio exactly.
       * group-hover:brightness-110 → in-place effect, zero overflow risk.
       */}
      <video
        ref={thumbRef}
        src={video.file}
        className={`block w-full h-full object-contain transition-[filter] duration-500 ease-out group-hover:brightness-110 ${thumbReady ? 'opacity-100' : 'opacity-0'}`}
        muted
        playsInline
        preload="metadata"
        onLoadedMetadata={(e) => { (e.currentTarget as HTMLVideoElement).currentTime = 0.5; }}
        tabIndex={-1}
        aria-hidden="true"
      />

      {/*
       * Bottom gradient fades into EXACTLY the same rgba as the card
       * background (rgba(5,2,20,0.85)) so the seam is invisible.
       * The gradient also covers any decoder-black edges on the video.
       */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: `linear-gradient(
            to bottom,
            transparent 25%,
            rgba(5,2,20,0.25) 58%,
            rgba(5,2,20,0.75) 82%,
            rgba(5,2,20,0.85) 100%
          )`,
        }}
      />

      {/* Play button */}
      <div className="absolute inset-0 z-[2] flex items-center justify-center">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.94 }}
          className={`flex items-center justify-center rounded-full border border-white/20 bg-white/[0.09] backdrop-blur-sm text-white shadow-[0_8px_32px_rgba(4,1,13,0.55)] transition-all duration-300 group-hover:bg-[#F5C542]/15 group-hover:border-[#F5C542]/40 group-hover:shadow-[0_8px_40px_rgba(245,197,66,0.25)] ${featured ? 'w-[68px] h-[68px]' : 'w-12 h-12'}`}
        >
          <PlayCircle
            size={featured ? 34 : 24}
            strokeWidth={1.4}
            className="text-white group-hover:text-[#F5C542] transition-colors duration-300"
          />
        </motion.div>
      </div>

      {/* Tag pill */}
      <div className="absolute top-3 left-3 z-[3]">
        <span
          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.42em] backdrop-blur-sm ${tagStyle}`}
        >
          {video.tag}
        </span>
      </div>

      {/* Featured badge */}
      {featured && (
        <div className="absolute top-3 right-3 z-[3]">
          <span className="inline-flex items-center rounded-full border border-[#F5C542]/35 bg-[#F5C542]/10 px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.4em] text-[#F5C542] backdrop-blur-sm">
            Featured
          </span>
        </div>
      )}
    </div>
  );
};

/* ─── Individual video card ────────────────────────────────────────────────── */
const VideoCard = memo(({
  video,
  index,
  onOpen,
  featured = false,
}: {
  video: VideoItem;
  index: number;
  onOpen: (v: VideoItem) => void;
  featured?: boolean;
}) => (
  <motion.article
    initial={{ opacity: 0, y: 24, scale: 0.97 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, amount: 0.08 }}
    transition={{
      type: 'spring',
      stiffness: 90,
      damping: 20,
      delay: index * 0.06,
    }}
    whileHover={{ y: -4, transition: { type: 'spring', stiffness: 400, damping: 30 } }}
    className="group relative flex flex-col rounded-[20px] border border-white/[0.09] cursor-pointer card-hover-glow"
    style={{
      /*
       * overflow-hidden is intentionally REMOVED from the article.
       * The inner VideoThumb wrapper owns its own isolated overflow-hidden
       * layer. Putting overflow-hidden on the article (which Framer Motion
       * applies transforms to) is what caused the GPU-layer bypass.
       * Border-radius clipping still works via the border itself.
       * We use isolation + clip-path to keep corners crisp without overflow.
       */
      background: 'rgba(5,2,20,0.85)',
      isolation: 'isolate',
      clipPath: 'inset(0 round 20px)',
    }}
    onClick={() => onOpen(video)}
    role="button"
    tabIndex={0}
    aria-label={`Play video: ${video.title}`}
    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(video); } }}
  >
    {/* Gold shimmer sweep */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      style={{
        background:
          'linear-gradient(105deg, transparent 35%, rgba(245,197,66,0.05) 50%, transparent 65%)',
        animation: 'shimmer 3.5s ease-in-out infinite',
      }}
    />

    {/* Video thumbnail — naturally sized, overflow clipped internally */}
    <VideoThumb video={video} featured={featured} />

    {/*
     * Text block sits directly below the gradient fade-out of the video.
     * Reduced padding keeps the card tight; no extra black band in between.
     * pt-0 is intentional — the gradient already provides visual separation.
     */}
    <div className="relative z-[1] flex flex-col gap-0.5 px-3 pt-2 pb-3">
      {/* Accent line */}
      <div
        className={`h-px rounded-full bg-gradient-to-r from-[#8B3DFF] to-[#F5C542] transition-all duration-300 group-hover:w-12 ${featured ? 'w-9' : 'w-6'}`}
      />
      <h3
        className={`font-display font-semibold text-white leading-snug group-hover:text-[#F5C542] transition-colors duration-300 mt-1 ${featured ? 'text-[1.05rem]' : 'text-[0.9rem]'}`}
      >
        {video.title}
      </h3>
      <p className={`text-[0.8rem] leading-[1.55] text-white/50 ${featured ? '' : 'line-clamp-2'}`}>
        {video.caption}
      </p>
      <div className="mt-1.5 flex items-center gap-1.5 text-[10px] font-semibold text-[#F5C542]/65 group-hover:text-[#F5C542] transition-colors duration-300">
        <Play size={9} className="fill-current" />
        <span>Watch Now</span>
      </div>
    </div>
  </motion.article>
));
VideoCard.displayName = 'VideoCard';

/* ─── Section ──────────────────────────────────────────────────────────────── */
export const VideoShowcaseSection = memo(() => {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  const openVideo = useCallback((v: VideoItem) => setActiveVideo(v), []);
  const closeVideo = useCallback(() => setActiveVideo(null), []);

  // Split videos: first is featured (left column), rest fill right side
  const [featured, ...rest] = VIDEOS;

  return (
    <section
      id="video-showcase"
      className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
    >
      {/* Ambient glow blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/4 w-[480px] h-[480px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(139,61,255,0.45) 0%, transparent 70%)',
          filter: 'blur(72px)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-1/4 w-[360px] h-[360px] rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(245,197,66,0.35) 0%, transparent 70%)',
          filter: 'blur(72px)',
        }}
      />

      <SectionHeading
        eyebrow="Video Showcase"
        title="Smile Stories & Clinic Highlights"
        description="Watch real patient transformations, expert myth-busting, and exclusive collaborations — straight from Savitri Dental Hospital & Maxillofacial Clinic."
      />

      {/*
        Layout (desktop):
          ┌─────────────────────────────┐
          │       Featured hero         │  ← centred, ~75 % width
          └─────────────────────────────┘
          ┌──────────────┐ ┌────────────┐
          │   Video 2    │ │  Video 3   │  ← 2-col grid
          └──────────────┘ └────────────┘
          ┌──────────────┐ ┌────────────┐
          │   Video 4    │ │  Video 5   │
          └──────────────┘ └────────────┘

        Mobile: everything stacks to a single column.
      */}

      {/* ── Featured hero ── */}
      <div className="mt-8 flex justify-center">
        <div className="w-full max-w-[65%] sm:max-w-[70%] lg:max-w-[62%]">
          <VideoCard
            video={featured}
            index={0}
            onOpen={openVideo}
            featured
          />
        </div>
      </div>

      {/* ── 2 × 2 grid of remaining videos ── */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {rest.map((video, i) => (
          <VideoCard
            key={video.id}
            video={video}
            index={i + 1}
            onOpen={openVideo}
          />
        ))}
      </div>

      {/* Lightbox */}
      {activeVideo && (
        <VideoLightbox video={activeVideo} onClose={closeVideo} />
      )}
    </section>
  );
});

VideoShowcaseSection.displayName = 'VideoShowcaseSection';
