import { memo, useRef, useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize2, X, PlayCircle, ArrowRight } from 'lucide-react';
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

/* ─── Tag pill colours ──────────────────────────────────────────────────────── */
const TAG_CONFIG: Record<string, { style: string; label: string }> = {
  'Clinic Spotlight': {
    style: 'bg-[#8B3DFF]/20 text-[#c084fc] border-[#8B3DFF]/30',
    label: 'Clinic Spotlight',
  },
  'Expert Insights': {
    style: 'bg-[#F5C542]/10 text-[#F5C542] border-[#F5C542]/25',
    label: 'Expert Insights',
  },
  'Patient Story': {
    style: 'bg-[#34d399]/10 text-[#34d399] border-[#34d399]/25',
    label: 'Patient Story',
  },
  'Our Craft': {
    style: 'bg-[#60a5fa]/10 text-[#60a5fa] border-[#60a5fa]/25',
    label: 'Our Craft',
  },
};

/* ─── Video thumbnail generator ──────────────────────────────────────────────
 *
 *  Captures a frame from the video at a meaningful timestamp using an
 *  off-screen <video> + <canvas>, then returns a JPEG data-URL.
 *
 *  Black-frame detection:
 *    After capture, the pixel data is sampled.  If the average brightness
 *    is below a threshold the frame is considered "black" (intro, fade-in,
 *    or loading screen) and a later timestamp is tried automatically.
 *
 *  Seek strategy:
 *    1st attempt: 3 s   — skip most intros / black leader
 *    2nd attempt: 5 s   — deeper into the content
 *    3rd attempt: 8 s   — well past any fade-in
 *    4th attempt: 15 % of duration — proportional fallback
 *
 *  Results are memoised in a module-level Map so each video is decoded
 *  only once across all card instances and the lightbox.
 * ──────────────────────────────────────────────────────────────────────────── */
const thumbCache = new Map<string, string>();

/** Average brightness of a canvas (0–255). */
function avgBrightness(canvas: HTMLCanvasElement): number {
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return 0;
  const w = canvas.width;
  const h = canvas.height;
  // Sample a grid instead of every pixel for speed
  const step = Math.max(1, Math.floor(Math.min(w, h) / 40));
  const data = ctx.getImageData(0, 0, w, h).data;
  let sum = 0;
  let count = 0;
  for (let y = 0; y < h; y += step) {
    for (let x = 0; x < w; x += step) {
      const i = (y * w + x) * 4;
      // Luminance approximation
      sum += data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
      count++;
    }
  }
  return count > 0 ? sum / count : 0;
}

/** Timestamps to try in order (seconds). */
const SEEK_TIMESTAMPS = [3, 5, 8];

function captureFrame(
  video: HTMLVideoElement,
): string {
  const w = video.videoWidth || 640;
  const h = video.videoHeight || 360;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (ctx) ctx.drawImage(video, 0, 0, w, h);
  return canvas.toDataURL('image/jpeg', 0.82);
}

function generateVideoThumbnail(src: string): Promise<string> {
  if (thumbCache.has(src)) return Promise.resolve(thumbCache.get(src)!);

  return new Promise((resolve) => {
    const video = document.createElement('video');
    video.crossOrigin = 'anonymous';
    video.muted = true;
    video.playsInline = true;
    video.preload = 'auto';

    let settled = false;
    let seekIdx = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const cleanup = () => {
      clearTimeout(timeoutId);
      video.removeAttribute('src');
      video.load();
    };

    const done = (dataUrl: string) => {
      if (settled) return;
      settled = true;
      if (dataUrl) thumbCache.set(src, dataUrl);
      cleanup();
      resolve(dataUrl);
    };

    const trySeek = () => {
      if (settled) return;
      const dur = video.duration;
      if (!dur || !isFinite(dur)) {
        // Can't determine duration — capture current frame
        done(captureFrame(video));
        return;
      }

      let t: number;
      if (seekIdx < SEEK_TIMESTAMPS.length) {
        t = SEEK_TIMESTAMPS[seekIdx];
      } else {
        // Proportional fallback: 15 %, 25 %, 40 %
        const pct = 0.15 + (seekIdx - SEEK_TIMESTAMPS.length) * 0.1;
        t = dur * Math.min(pct, 0.4);
      }
      // Don't seek past the end
      if (t >= dur - 0.5) t = dur * 0.5;
      video.currentTime = t;
    };

    const onLoadedData = () => {
      trySeek();
    };

    const onSeeked = () => {
      if (settled) return;

      const frame = captureFrame(video);

      // Quick brightness check — if the frame is too dark, try next timestamp
      const w = video.videoWidth || 640;
      const h = video.videoHeight || 360;
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (ctx) ctx.drawImage(video, 0, 0, w, h);

      const brightness = avgBrightness(canvas);

      if (brightness < 12 && seekIdx < SEEK_TIMESTAMPS.length + 2) {
        // Frame is essentially black — try next timestamp
        seekIdx++;
        trySeek();
        return;
      }

      // Good enough frame (or we've exhausted retries)
      done(frame);
    };

    const onError = () => {
      done('');
    };

    video.addEventListener('loadeddata', onLoadedData, { once: true });
    video.addEventListener('seeked', onSeeked);
    video.addEventListener('error', onError, { once: true });

    // Safety timeout — bail out after 12 s
    timeoutId = setTimeout(() => {
      if (!settled) done(captureFrame(video));
    }, 12000);

    video.src = src;
  });
}

/** Hook: returns a video-frame thumbnail data-URL (or null while loading). */
function useVideoThumbnail(src: string): string | null {
  const [thumb, setThumb] = useState<string | null>(
    () => thumbCache.get(src) ?? null,
  );

  useEffect(() => {
    if (thumbCache.has(src)) {
      setThumb(thumbCache.get(src)!);
      return;
    }
    let cancelled = false;
    generateVideoThumbnail(src).then((url) => {
      if (!cancelled && url) setThumb(url);
    });
    return () => { cancelled = true; };
  }, [src]);

  return thumb;
}

/* ─── Lightbox player ────────────────────────────────────────────────────────
 *  Rendered via createPortal(…, document.body) so it sits above all page
 *  content regardless of ancestor transforms / containment.
 *  Body scroll is locked while the modal is open.
 * ──────────────────────────────────────────────────────────────────────────── */
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

  /* Use cached thumbnail as poster for instant display */
  const cachedThumb = useVideoThumbnail(video.file);

  /* Auto-play on mount */
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.play().then(() => setPlaying(true)).catch(() => {});
    return () => { el.pause(); };
  }, []);

  /* Lock body scroll */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  /* ESC key */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

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

  const modal = (
    <motion.div
      key="lb-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: 'rgba(4,1,13,0.94)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Playing: ${video.title}`}
    >
      {/* Close button — always visible in top-right corner */}
      <button
        onClick={onClose}
        aria-label="Close video player"
        className="absolute top-4 right-4 z-[10001] flex items-center justify-center w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-white/80 hover:text-white hover:bg-black/70 transition-colors duration-200"
      >
        <X size={20} />
      </button>

      <motion.div
        key="lb-panel"
        initial={{ opacity: 0, scale: 0.93, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.93, y: 16 }}
        transition={{ type: 'spring', stiffness: 240, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        className="relative flex flex-col overflow-hidden rounded-2xl border border-white/10 shadow-[0_32px_100px_rgba(76,29,149,0.5),0_0_0_1px_rgba(245,197,66,0.08)]"
        style={{
          width: 'calc(100% - 2rem)',
          maxWidth: 1100,
          maxHeight: '90vh',
          background: 'rgba(5,2,20,0.97)',
        }}
      >
        {/* Video container */}
        <div
          className="relative w-full overflow-hidden flex items-center justify-center bg-black"
          style={{ maxHeight: '80vh' }}
        >
          <video
            ref={videoRef}
            src={video.file}
            poster={cachedThumb || undefined}
            className="block w-full object-contain"
            style={{ maxHeight: '80vh' }}
            playsInline
            preload="auto"
            onEnded={() => setPlaying(false)}
          />
        </div>

        {/* Controls bar */}
        <div className="relative z-20 flex items-center justify-between gap-4 px-4 sm:px-5 py-3 border-t border-white/[0.06]">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={togglePlay}
              aria-label={playing ? 'Pause video' : 'Play video'}
              className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full border border-white/15 bg-white/[0.06] text-white hover:bg-white/[0.12] transition-colors duration-200"
            >
              {playing ? <Pause size={15} /> : <Play size={15} />}
            </button>
            <button
              onClick={toggleMute}
              aria-label={muted ? 'Unmute video' : 'Mute video'}
              className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full border border-white/15 bg-white/[0.06] text-white hover:bg-white/[0.12] transition-colors duration-200"
            >
              {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </button>
            <span className="text-xs font-medium text-white/50 truncate max-w-[120px] sm:max-w-xs">
              {video.title}
            </span>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={openFullscreen}
              aria-label="Open fullscreen"
              className="flex items-center justify-center w-9 h-9 rounded-full border border-white/15 bg-white/[0.06] text-white hover:bg-white/[0.12] transition-colors duration-200"
            >
              <Maximize2 size={14} />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return createPortal(modal, document.body);
});
VideoLightbox.displayName = 'VideoLightbox';

/* ─── Play Button with Pulse Ring ───────────────────────────────────────────── */
const PlayButton = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const dims = size === 'lg' ? 'w-20 h-20' : size === 'md' ? 'w-14 h-14' : 'w-11 h-11';
  const iconSize = size === 'lg' ? 36 : size === 'md' ? 24 : 18;
  const ringSize = size === 'lg' ? 'w-28 h-28' : size === 'md' ? 'w-20 h-20' : 'w-16 h-16';

  return (
    <div className="relative flex items-center justify-center">
      <div className={`absolute ${ringSize} rounded-full border-2 border-[#F5C542]/20 video-play-pulse`} />
      <div
        className={`${dims} rounded-full bg-white/[0.12] backdrop-blur-md border border-white/25 flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-400 group-hover:bg-[#F5C542]/20 group-hover:border-[#F5C542]/50 group-hover:shadow-[0_8px_40px_rgba(245,197,66,0.3)]`}
      >
        <PlayCircle
          size={iconSize}
          strokeWidth={1.3}
          className="text-white group-hover:text-[#F5C542] transition-colors duration-400"
        />
      </div>
    </div>
  );
};

/* ─── Video Thumbnail ────────────────────────────────────────────────────────
 *  Auto-generated from the actual video file via canvas capture.
 *  Shows a premium gradient skeleton while the thumbnail generates,
 *  then cross-fades to the captured video frame.
 *  NO external images, NO gallery images, NO placeholders.
 * ──────────────────────────────────────────────────────────────────────────── */
const VideoThumbnail = memo(({
  videoSrc,
  alt,
  className = '',
}: {
  videoSrc: string;
  alt: string;
  className?: string;
}) => {
  const thumb = useVideoThumbnail(videoSrc);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Skeleton gradient — visible while thumbnail generates */}
      {!thumb && (
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(139,61,255,0.12) 0%, rgba(5,2,20,0.8) 40%, rgba(245,197,66,0.08) 100%)',
          }}
        />
      )}

      {/* Captured video frame */}
      {thumb && (
        <img
          src={thumb}
          alt={alt}
          className={`block w-full h-full object-cover ${className}`}
          draggable={false}
          loading="eager"
        />
      )}
    </div>
  );
});
VideoThumbnail.displayName = 'VideoThumbnail';

/* ─── Video Card ───────────────────────────────────────────────────────────── */
const VideoCard = memo(({
  video,
  index,
  onOpen,
}: {
  video: VideoItem;
  index: number;
  onOpen: (v: VideoItem) => void;
}) => {
  const tagConfig = TAG_CONFIG[video.tag] ?? { style: 'bg-white/10 text-white/70 border-white/10', label: video.tag };

  return (
    <motion.article
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{
        type: 'spring',
        stiffness: 90,
        damping: 20,
        delay: index * 0.07,
      }}
      whileHover={{ y: -5, transition: { type: 'spring', stiffness: 400, damping: 30 } }}
      className="group relative flex flex-col cursor-pointer card-hover-glow"
      style={{
        isolation: 'isolate',
        clipPath: 'inset(0 round 16px)',
        background: 'linear-gradient(165deg, rgba(8,3,27,0.9), rgba(5,2,20,0.95))',
        borderRadius: '16px',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
      onClick={() => onOpen(video)}
      role="button"
      tabIndex={0}
      aria-label={`Play video: ${video.title}`}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(video); } }}
    >
      {/* Gold shimmer sweep on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: 'linear-gradient(105deg, transparent 35%, rgba(245,197,66,0.05) 50%, transparent 65%)',
          animation: 'shimmer 3.5s ease-in-out infinite',
          borderRadius: '16px',
        }}
      />

      {/* Thumbnail — 9:16 portrait aspect ratio, dominant element */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          isolation: 'isolate',
          willChange: 'transform',
          aspectRatio: '9 / 16',
          borderRadius: '16px 16px 0 0',
        }}
      >
        {/* Auto-generated video thumbnail */}
        <VideoThumbnail
          videoSrc={video.file}
          alt={video.title}
          className="transition-[filter,transform] duration-700 ease-out group-hover:brightness-110 group-hover:scale-[1.05]"
        />

        {/* Gradient overlay — smooth bottom fade */}
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            background: `linear-gradient(
              to bottom,
              transparent 0%,
              transparent 35%,
              rgba(5,2,20,0.2) 55%,
              rgba(5,2,20,0.7) 75%,
              rgba(5,2,20,0.97) 100%
            )`,
          }}
        />

        {/* Play button — centered */}
        <div className="absolute inset-0 z-[2] flex items-center justify-center">
          <PlayButton size="md" />
        </div>

        {/* Category tag */}
        <div className="absolute top-3 left-3 z-[3]">
          <span
            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] backdrop-blur-md ${tagConfig.style}`}
          >
            {tagConfig.label}
          </span>
        </div>
      </div>

      {/* Text content — compact, below video */}
      <div className="relative z-[1] flex flex-col px-4 pt-4 pb-4">
        <div className="h-px w-8 rounded-full bg-gradient-to-r from-[#8B3DFF] to-[#F5C542] mb-3 group-hover:w-12 transition-all duration-500" />
        <h3 className="font-display text-[0.95rem] font-semibold text-white leading-snug group-hover:text-[#F5C542] transition-colors duration-300">
          {video.title}
        </h3>
        <p className="mt-1.5 text-[0.78rem] leading-[1.5] text-white/45 line-clamp-2">
          {video.caption}
        </p>
        <div className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-semibold text-[#F5C542]/60 group-hover:text-[#F5C542] transition-colors duration-300">
          <Play size={9} className="fill-current" />
          <span>Watch Now</span>
          <ArrowRight size={9} className="transform group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>
    </motion.article>
  );
});
VideoCard.displayName = 'VideoCard';

/* ─── Section ──────────────────────────────────────────────────────────────── */
export const VideoShowcaseSection = memo(() => {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  const openVideo = useCallback((v: VideoItem) => setActiveVideo(v), []);
  const closeVideo = useCallback(() => setActiveVideo(null), []);

  return (
    <section
      id="video-showcase"
      className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-28"
    >
      {/* Ambient glow blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/4 w-[520px] h-[520px] rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(139,61,255,0.45) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full opacity-10"
        style={{
          background: 'radial-gradient(circle, rgba(245,197,66,0.35) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Section Header */}
      <SectionHeading
        eyebrow="Video Showcase"
        title="Smile Stories & Clinic Highlights"
        description="Watch real patient transformations, expert myth-busting, and exclusive collaborations — straight from Savitri Dental Hospital & Maxillofacial Clinic."
      />

      {/* ── Uniform Video Grid — all cards equal size ── */}
      <div className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {VIDEOS.map((video, i) => (
          <VideoCard
            key={video.id}
            video={video}
            index={i}
            onOpen={openVideo}
          />
        ))}
      </div>

      {/* Lightbox — rendered via Portal for correct positioning */}
      <AnimatePresence>
        {activeVideo && (
          <VideoLightbox video={activeVideo} onClose={closeVideo} />
        )}
      </AnimatePresence>
    </section>
  );
});

VideoShowcaseSection.displayName = 'VideoShowcaseSection';
