import React, { useRef, useCallback, useEffect, useState, memo } from 'react'
import { motion, useMotionValue, animate, AnimatePresence } from 'framer-motion'
import { ArrowLeftIcon, ArrowRightIcon, ArrowTurnDownRightIcon, CheckBadgeIcon, MinusIcon, PlusIcon, StarIcon } from '@heroicons/react/20/solid'
import CTAButton from '../CTAButton'

// ══════════════════════════════════════════════════════════════════════════════
// CONTOURS
// ══════════════════════════════════════════════════════════════════════════════

const INK = '#0E513C'
const SVG_BASE = {
  viewBox: '0 0 320 280', preserveAspectRatio: 'xMidYMid slice',
  xmlns: 'http://www.w3.org/2000/svg', 'aria-hidden': 'true',
  style: { position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' },
}

const MicroParallels = () => (
  <svg {...SVG_BASE}>
    {Array.from({ length: 26 }, (_, i) => (i - 5) * 24).map((x, i) => (
      <line key={i} x1={x} y1={0} x2={x + 340} y2={280} stroke={INK} strokeWidth="0.5" opacity="0.085" />
    ))}
  </svg>
)

const MicroRings = () => (
  <svg {...SVG_BASE}>
    {[18, 36, 54, 72, 92, 114, 138, 164, 192, 222].map((rx, i) => (
      <ellipse key={i} cx="160" cy="140" rx={rx} ry={rx * 0.72} fill="none" stroke={INK} strokeWidth="0.5" opacity="0.085" />
    ))}
  </svg>
)

// ══════════════════════════════════════════════════════════════════════════════
// PRIMITIVES
// ══════════════════════════════════════════════════════════════════════════════

const SectionPill = ({ children }) => (
  <div className="border border-primary px-3 py-0.5 w-min rounded-full">
    <p className="text-[12px] sm:text-[13px] text-primary font-primary font-semibold italic w-max select-none">{children}</p>
  </div>
)

const NavButton = memo(({ onClick, label, children, disabled }) => (
  <button onClick={onClick} aria-label={label} disabled={disabled}
    className="w-10 h-10 cursor-pointer rounded-full border border-border flex items-center justify-center text-text hover:bg-primary hover:text-bg hover:border-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
    {children}
  </button>
))

// ══════════════════════════════════════════════════════════════════════════════
// CAROUSEL HOOK + SHARED COMPONENTS
// ══════════════════════════════════════════════════════════════════════════════

const SPRING = { type: 'spring', stiffness: 320, damping: 32, mass: 0.9 }
const GAP    = 12

function useCarousel(count) {
  const containerRef = useRef(null)
  const x            = useMotionValue(0)
  const [idx, setIdx] = useState(0)

  const snapX = useCallback((i) => -(i * ((containerRef.current?.clientWidth ?? 0) + GAP)), [])

  const snapTo = useCallback((i) => {
    const c = Math.max(0, Math.min(count - 1, i))
    animate(x, snapX(c), SPRING)
    setIdx(c)
  }, [x, snapX, count])

  useEffect(() => {
    const ro = new ResizeObserver(() => x.set(snapX(idx)))
    if (containerRef.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [idx, x, snapX])

  const handleDragEnd = useCallback((_, info) => {
    const t = (containerRef.current?.clientWidth ?? 0) * 0.2
    if      (info.offset.x < -t) snapTo(idx + 1)
    else if (info.offset.x >  t) snapTo(idx - 1)
    else                          snapTo(idx)
  }, [idx, snapTo])

  return { containerRef, x, idx, snapTo, handleDragEnd }
}

function CarouselDots({ count, active, onSelect }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: count }).map((_, i) => (
        <motion.button key={i} onClick={() => onSelect(i)} aria-label={`Slide ${i + 1}`}
          animate={{ width: i === active ? 20 : 6, opacity: i === active ? 1 : 0.3 }}
          transition={{ type: 'spring', stiffness: 500, damping: 40 }}
          className="h-1.5 rounded-full bg-primary" style={{ minWidth: 6 }} />
      ))}
    </div>
  )
}

function CarouselNav({ count, idx, snapTo }) {
  return (
    <div className="flex items-center gap-3">
      <NavButton onClick={() => snapTo(idx - 1)} label="Previous" disabled={idx === 0}>
        <ArrowLeftIcon className="w-4 h-4" />
      </NavButton>
      <NavButton onClick={() => snapTo(idx + 1)} label="Next" disabled={idx === count - 1}>
        <ArrowRightIcon className="w-4 h-4" />
      </NavButton>
      <div className="flex-1 h-px bg-border" />
      <CarouselDots count={count} active={idx} onSelect={snapTo} />
      <span className="text-[11px] font-primary text-text opacity-50 select-none tabular-nums">{idx + 1} / {count}</span>
    </div>
  )
}

function SwipeCarousel({ items, renderItem, aspect }) {
  const N = items.length
  const { containerRef, x, idx, snapTo, handleDragEnd } = useCarousel(N)
  if (!N) return null

  return (
    <div className="flex flex-col gap-4">
      <div ref={containerRef} className="overflow-hidden rounded-xl">
        <motion.div drag="x"
          dragConstraints={{ left: -(N - 1) * ((containerRef.current?.clientWidth ?? 0) + GAP), right: 0 }}
          dragElastic={0.06} dragMomentum={false} onDragEnd={handleDragEnd}
          style={{ x, display: 'flex', gap: GAP, width: `calc(${N * 100}% + ${(N - 1) * GAP}px)`, willChange: 'transform', touchAction: 'pan-y', cursor: 'grab' }}
        >
          {items.map((item, i) => (
            <div key={i} style={{ flex: `0 0 calc(${100 / N}% - ${((N - 1) * GAP) / N}px)`, ...(aspect ? { aspectRatio: aspect } : {}) }}>
              {renderItem(item, i)}
            </div>
          ))}
        </motion.div>
      </div>
      {N > 1 && <CarouselNav count={N} idx={idx} snapTo={snapTo} />}
    </div>
  )
}

function ImageCarousel({ images = [], aspect = '4/3' }) {
  return (
    <SwipeCarousel
      items={images}
      aspect={aspect}
      renderItem={(src, i) => (
        <div className="rounded-xl overflow-hidden border border-border h-full">
          <img src={src} alt={`Image ${i + 1}`} className="w-full h-full object-cover object-top" />
        </div>
      )}
    />
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// QUOTE
// ══════════════════════════════════════════════════════════════════════════════

const STAGGER = { center: { transition: { staggerChildren: 0.065, delayChildren: 0.1 } } }
const ITEM = {
  enter:  { opacity: 0, y: 10 },
  center: { opacity: 1, y: 0,  transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit:   { opacity: 0, y: -5, transition: { duration: 0.16, ease: 'easeIn' } },
}

const MOB_ITEM = {
  hidden: { opacity: 0, y: 12 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.34, ease: [0.25, 0.46, 0.45, 0.94] } },
}

const StarRating = memo(({ rating }) => (
  <div className="flex items-center gap-2 font-primary">
    <span className="text-[15px] leading-7 font-primary font-black text-text">{rating.toFixed(1)}</span>
    <StarIcon className="h-4 w-4 text-primary" />
  </div>
))

function QuoteSection({ quote }) {
  if (!quote) return null
  return (
    <section className="pt-8 sm:pt-12 flex flex-col gap-5">
      <SectionPill>Client Voice</SectionPill>

      {/* Desktop */}
      <div className="hidden md:flex items-stretch overflow-hidden min-h-100 md:gap-10">
        {quote.photo && (
          <div className="w-[28%] lg:w-[32%] shrink-0 relative">
            <img src={quote.photo} alt={quote.author} className="absolute inset-0 w-full h-full object-cover object-center rounded-xl" />
            <div className="absolute inset-0 rounded-xl" style={{ background: 'linear-gradient(to right, transparent 60%, rgba(0,0,0,0.06))' }} />
          </div>
        )}
        <motion.div variants={STAGGER} initial="enter" animate="center" exit="exit"
          className="relative flex flex-col justify-between gap-5 items-stretch p-8 border border-border rounded-xl">
          <MicroRings />
          <motion.div variants={ITEM} className="flex items-center justify-between">
            <span className="text-[52px] font-black text-text leading-none select-none">"</span>
            <div className="flex gap-2 flex-wrap justify-end">
              {quote.tags.map(t => (
                <span key={t} className="border border-primary rounded-full px-2.5 py-1 text-[13px] bg-primary/2 text-primary select-none font-primary font-semibold opacity-80 italic">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
          <motion.p variants={ITEM} className="text-[16px] text-text leading-8 text-justify opacity-95 select-none flex-1 font-primary">
            {quote.text}
          </motion.p>
          <motion.div variants={ITEM} className="flex items-end justify-between">
            <div className="flex flex-col items-start gap-1 font-primary">
              <p className="text-[16px] font-semibold text-text select-none">{quote.author}</p>
              <p className="text-[14px] text-text opacity-60 select-none">{quote.role}</p>
            </div>
            <StarRating rating={quote.rating} />
          </motion.div>
        </motion.div>
      </div>

      {/* Mobile */}
      <div className="relative border border-border rounded-xl p-5 flex flex-col gap-4 h-full overflow-hidden md:hidden">
        <div className="absolute inset-0" style={{ zIndex: 0 }}>
          <MicroRings />
        </div>
        <div className="relative flex flex-col gap-8 h-full" style={{ zIndex: 1 }}>
          <motion.div variants={MOB_ITEM} animate="show" initial="hidden" className="flex items-center justify-between">
            <div className="w-full flex items-center gap-4">
              <span className="text-[40px] font-black text-text leading-none select-none">"</span>
              <img src={quote.photo} alt={quote.author} className="w-12 h-12 rounded-full object-cover border-2" />
            </div>
            <div className="flex justify-end w-full">
              <StarRating rating={quote.rating} />
            </div>
          </motion.div>

          <motion.p variants={MOB_ITEM} animate="show" initial="hidden"
            className="text-[14px] text-text leading-6 text-justify opacity-90 select-none flex-1 font-primary">
            {quote.text}
          </motion.p>

          <motion.div variants={MOB_ITEM} animate="show" initial="hidden" className="flex gap-2 flex-wrap">
            {quote.tags.map(t => (
              <span key={t} className="border border-primary rounded-full px-2.5 py-1 text-[13px] bg-primary/2 text-primary select-none font-primary font-semibold opacity-80 italic">
                {t}
              </span>
            ))}
          </motion.div>

          <motion.div variants={MOB_ITEM} animate="show" initial="hidden" className="font-primary flex flex-col gap-1">
            <p className="text-[14px] font-semibold text-text select-none">{quote.author}</p>
            <p className="text-[12px] text-text opacity-60 select-none">{quote.role}</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// COLOR PALETTE BAR
// colors: [{ hex, name, role: 'Primary'|'Secondary'|'Tertiary'|'Other', percentage }]
// ══════════════════════════════════════════════════════════════════════════════

const ROLE_ORDER = ['Primary', 'Secondary', 'Accent', 'Neutral', 'Other']
const ROLE_BADGE = { Primary: 'primary', Secondary: 'secondary', Tertiary: 'tertiary', Other: '—' }

function ColorPaletteBar({ colors = [] }) {
  const sorted = [...colors].sort((a, b) => ROLE_ORDER.indexOf(a.role ?? 'Other') - ROLE_ORDER.indexOf(b.role ?? 'Other'))
  const total  = sorted.reduce((s, c) => s + (c.percentage ?? 0), 0) || 100

  return (
    <div className="flex flex-col gap-5">
      <div className="flex w-full h-7 rounded-lg overflow-hidden" style={{ gap: 2 }}>
        {sorted.map((c, i) => (
          <div key={i} title={`${c.name} — ${c.percentage ?? 0}%`}
            style={{ backgroundColor: c.hex, width: `${((c.percentage ?? 0) / total) * 100}%`, flexShrink: 0, minWidth: 4 }} />
        ))}
      </div>
      <div className="flex flex-col gap-2.5">
        {sorted.map((c, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl border border-border shrink-0" style={{ backgroundColor: c.hex }} />
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <span className="text-[12px] sm:text-[13px] text-text italic font-primary font-semibold select-none">{c.name}</span>
              {c.role && (
                <span className="text-[11px] border border-border rounded-full px-2 py-0.5 text-text/60 italic font-primary font-semibold shrink-0 select-none">
                  {ROLE_BADGE[c.role] ?? c.role}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[11px] sm:text-[12px] text-text/60 italic font-primary font-semibold select-none">{c.hex}</span>
              {c.percentage != null && (
                <span className="text-[11px] sm:text-[12px] text-primary italic font-primary font-semibold select-none tabular-nums">
                  // {c.percentage}%
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// TYPOGRAPHY SHOWCASE
// font: { name, role, fontFamily?, hierarchy?: [{ label, px, weight }] }
// ══════════════════════════════════════════════════════════════════════════════

const DEFAULT_HIERARCHY = [
  { label: 'Display', px: 36, weight: 300 },
  { label: 'H1',      px: 28, weight: 600 },
  { label: 'H2',      px: 22, weight: 500 },
  { label: 'H3',      px: 17, weight: 500 },
  { label: 'Body',    px: 14, weight: 400 },
  { label: 'Caption', px: 11, weight: 400 },
]

const TYPO_VARIANTS = {
  enter:  (d) => ({ x: d > 0 ? 24 : -24, opacity: 0 }),
  center:         { x: 0,                 opacity: 1 },
  exit:   (d) => ({ x: d > 0 ? -24 : 24, opacity: 0 }),
}
const TYPO_T = { duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }

function TypographyCard({ font }) {
  const ff        = font.fontFamily
  const hierarchy = font.hierarchy ?? DEFAULT_HIERARCHY

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-end justify-between gap-2 px-6 py-5 border-b border-border">
        <div className="flex flex-col gap-2 items-start">
          <span className="text-[12px] sm:text-[13px] text-primary font-primary font-semibold italic select-none">{font.role}</span>
          <p className={`text-[20px] sm:text-[26px] text-text leading-none select-none tracking-tight ${ff}`} style={{ fontWeight: 400, }}>
            {font.name}
          </p>
        </div>
        <p className={`text-[40px] sm:text-[56px] text-primary/15 leading-none select-none tracking-tighter shrink-0 ${ff}`} style={{ fontWeight: 300, }}>
          Ag
        </p>
      </div>
      <div className="p-6 py-4 flex flex-col">
        {hierarchy.map((h) => (
          <div key={h.label} className="flex items-center gap-4 py-1">
            <span className="text-[12px] sm:text-[13px] text-text/40 font-primary font-semibold italic select-none w-10">{h.label}</span>
            <p className={`leading-none select-none truncate flex-1 text-primary ${ff}`} style={{ fontSize: h.px, fontWeight: h.weight,}}>{font.name}</p>
            <span className="text-[11px] sm:text-[13px] text-text/25 font-primary font-semibold select-none">{h.px}px · {h.weight}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function TypographyShowcase({ fonts = [] }) {
  if (!fonts.length) return null
  const N = fonts.length
  const [[current, dir], setPage] = useState([0, 0])
  const navigate = (d) => setPage(([p]) => [(p + d + N) % N, d])
  const goTo     = (i)  => setPage(([p]) => [i, i > p ? 1 : -1])

  const { containerRef, x, idx, snapTo, handleDragEnd } = useCarousel(N)

  return (
    <div className="flex flex-col gap-5">
      {/* Desktop */}
      <div className="hidden sm:flex flex-col rounded-xl overflow-hidden border border-border">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div key={current} custom={dir}
            variants={TYPO_VARIANTS} initial="enter" animate="center" exit="exit" transition={TYPO_T}>
            <TypographyCard font={fonts[current]} />
          </motion.div>
        </AnimatePresence>
        {N > 1 && (
          <div className="flex items-center gap-3 px-5 py-3 border-t border-border">
            <NavButton onClick={() => navigate(-1)} label="Previous font"><ArrowLeftIcon className="w-4 h-4" /></NavButton>
            <NavButton onClick={() => navigate(1)}  label="Next font"><ArrowRightIcon className="w-4 h-4" /></NavButton>
            <div className="flex-1 h-px bg-border" />
            <CarouselDots count={N} active={current} onSelect={goTo} />
            <span className="text-[11px] font-primary text-text opacity-40 tabular-nums select-none">{current + 1} / {N}</span>
          </div>
        )}
      </div>

      {/* Mobile */}
      <div className="sm:hidden flex flex-col gap-4">
        <div ref={containerRef} className="overflow-hidden rounded-xl">
          <motion.div drag="x"
            dragConstraints={{ left: -(N - 1) * ((containerRef.current?.clientWidth ?? 0) + GAP), right: 0 }}
            dragElastic={0.06} dragMomentum={false} onDragEnd={handleDragEnd}
            style={{ x, display: 'flex', gap: GAP, width: `calc(${N * 100}% + ${(N - 1) * GAP}px)`, willChange: 'transform', touchAction: 'pan-y', cursor: 'grab' }}
          >
            {fonts.map((font, i) => (
              <div key={i} className="rounded-xl overflow-hidden border border-border"
                style={{ flex: `0 0 calc(${100 / N}% - ${((N - 1) * GAP) / N}px)` }}>
                <TypographyCard font={font} />
              </div>
            ))}
          </motion.div>
        </div>
        {N > 1 && <CarouselNav count={N} idx={idx} snapTo={snapTo} />}
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// BRAND IDENTITY
// ══════════════════════════════════════════════════════════════════════════════

function BrandIdentitySection({ brand = {}, title = '', images = [] }) {
  if (!brand.colors?.length && !brand.fonts?.length && !images.length) return null

  return (
    <section className="flex flex-col gap-5 sm:gap-10 pt-1 sm:pt-5 w-full">
      <MockupsSection images={images} />
      <div className="flex flex-col sm:flex-row gap-5 sm:gap-8 w-full justify-between">
        <div className="w-full flex flex-col gap-5 sm:gap-8">
          {brand.colors?.length > 0 && <ColorPaletteBar colors={brand.colors} />}
          {brand.pattern && (
            <div className="flex flex-col gap-5 flex-1 min-h-0">
              <div className="relative rounded-xl border border-border overflow-hidden w-full flex-1 min-h-20 sm:min-h-30">
                <img src={brand.pattern} alt={`${title} brand pattern`} className="absolute inset-0 w-full h-full object-cover" />
              </div>
            </div>
          )}
        </div>
        <div className="w-full">
          {brand.fonts?.length > 0 && <TypographyShowcase fonts={brand.fonts} />}
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// MOCKUPS BENTO GRID
// ══════════════════════════════════════════════════════════════════════════════

const BENTO_LAYOUT = [
  { col: 1,       row: '1 / 3' },
  { col: 2,       row: '1 / 3' },
  { col: 3,       row: 1       },
  { col: 4,       row: 1       },
  { col: '3 / 5', row: 2       },
]

const MOBILE_BENTO = [
  { col: 1,       row: 1,       aspect: '1/1'  },
  { col: 2,       row: 1,       aspect: '1/1'  },
  { col: 1,       row: '2 / 4', aspect: null   },
  { col: 2,       row: 2,       aspect: '1/1'  },
  { col: 2,       row: 3,       aspect: '1/1'  },
]

function MockupsSection({ images = [] }) {
  if (!images.length) return null
  const imgs = [...images, ...Array(Math.max(0, 8 - images.length)).fill(null)]

  return (
    <section className="flex flex-col">
      {/* Desktop bento */}
      <div className="hidden md:grid gap-3"
        style={{ gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: '260px 260px' }}>
        {imgs.slice(0, 5).map((src, i) => (
          <div key={i} className="relative rounded-xl overflow-hidden border border-border bg-border/10"
            style={{ gridColumn: BENTO_LAYOUT[i].col, gridRow: BENTO_LAYOUT[i].row }}>
            {src && <img src={src} alt={`Mockup ${i + 1}`} className="absolute inset-0 w-full h-full object-cover object-top" />}
          </div>
        ))}
      </div>

      {/* Mobile bento */}
      <div className="md:hidden grid gap-2" style={{ gridTemplateColumns: '1fr 1fr', gridTemplateRows: 'auto' }}>
        {imgs.slice(0, 5).map((src, i) => {
          const cell = MOBILE_BENTO[i]
          return (
            <div key={i} className="relative rounded-xl overflow-hidden border border-border bg-border/10"
              style={{ gridColumn: cell.col, gridRow: cell.row, ...(cell.aspect ? { aspectRatio: cell.aspect } : {}) }}>
              {src && <img src={src} alt={`Mockup ${i + 1}`} className="absolute inset-0 w-full h-full object-cover object-top" />}
            </div>
          )
        })}
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// FEATURE ACCORDION
// ══════════════════════════════════════════════════════════════════════════════

const FeatureAccordion = memo(({ features = [] }) => {
  const [openIdx, setOpenIdx] = useState(0)
  const toggle = (i) => setOpenIdx((prev) => (prev === i ? null : i))

  return (
    <div className="flex flex-col gap-3">
      {features.map((f, i) => (
        <FeatureAccordionItem key={i} feature={f} index={i} isOpen={openIdx === i} onToggle={() => toggle(i)} />
      ))}
    </div>
  )
})

const FeatureAccordionItem = memo(({ feature, index, isOpen, onToggle }) => {
  const ref = useRef(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (!ref.current) return
    const ro = new ResizeObserver(() => {
      if (ref.current) setHeight(ref.current.scrollHeight)
    })
    ro.observe(ref.current)
    return () => ro.disconnect()
  }, [])

  return (
    <div className={`border rounded-xl overflow-hidden transition-colors duration-300 bg-bg ${isOpen ? 'border-border' : 'border-border/60'}`}>
      <button onClick={onToggle} className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left group cursor-pointer" aria-expanded={isOpen}>
        <div className="flex flex-col gap-1 flex-1 min-w-0 pr-1">
          <div className="flex items-center gap-3">
            <span className="text-[12px] font-secondary text-primary/60 tabular-nums select-none shrink-0">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className={`text-[13px] sm:text-[14px] font-semibold italic leading-snug transition-colors duration-200 select-none ${isOpen ? 'text-primary' : 'text-text'}`}>
              {feature.label}
            </span>
          </div>
          {!isOpen && feature.description && (
            <div className="flex items-center gap-3">
              <span className="shrink-0 w-[22px]" />
              <div className="flex gap-2 min-w-0">
                <ArrowTurnDownRightIcon className="h-4 w-4 shrink-0 text-primary/40" />
                <span className="text-[12px] text-text/40 font-primary font-semibold truncate select-none leading-snug">
                  {feature.description}
                </span>
              </div>
            </div>
          )}
        </div>
        <span className={`shrink-0 w-6 h-6 rounded-full border flex items-center justify-center mt-0.5 transition-all duration-300 ${isOpen ? 'border-primary text-primary' : 'border-border text-text/50 group-hover:border-primary group-hover:text-primary'}`}>
          <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex items-center justify-center w-full h-full">
            {isOpen ? <MinusIcon className="w-3 h-3" /> : <PlusIcon className="w-3 h-3" />}
          </motion.span>
        </span>
      </button>

      <motion.div
        animate={{ height: isOpen ? height : 0, opacity: isOpen ? 1 : 0 }}
        transition={{
          height:  { duration: 0.1,  ease: [0.25, 0.46, 0.45, 0.94] },
          opacity: { duration: isOpen ? 0.18 : 0.12, delay: isOpen ? 0.08 : 0, ease: 'easeInOut' },
        }}
        style={{ overflow: 'hidden' }}
      >
        <div ref={ref} className="px-5 pb-5">
          <div className="bg-subPrimary/25 p-3 rounded-md">
            <p className="text-[13px] sm:text-[14px] text-text font-medium leading-relaxed select-none">
              {feature.description}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
})

// ══════════════════════════════════════════════════════════════════════════════
// SECTION HEADING
//
// title     — plain string rendered as text          (AppShowcase)
// titleHtml — raw HTML string via dangerouslySetInnerHTML  (WebShowcase)
//
// Pass only one. If both are provided, titleHtml wins.
// ══════════════════════════════════════════════════════════════════════════════

function SectionHeading({ pill, title, titleHtml, subtitle }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 md:gap-16">
      <div className="flex flex-col gap-5 shrink-0">
        <SectionPill>{pill}</SectionPill>
        {titleHtml ? (
            typeof titleHtml === 'string' ? (
                <h2
                className="text-[25px] sm:text-[36px] font-primary font-normal text-text leading-[32.5px] md:leading-11 tracking-tight select-none"
                dangerouslySetInnerHTML={{ __html: titleHtml }}
                />
            ) : (
                titleHtml
            )
            ) : title ? (
            <h2 className="text-[25px] sm:text-[36px] font-primary font-normal text-text leading-[32.5px] md:leading-11 tracking-tight select-none">
                {title}
            </h2>
            ) : null}
      </div>
      {subtitle && (
        <p className="text-[14px] sm:text-[16px] font-primary text-text leading-6 text-justify md:max-w-lg md:pt-8 select-none">
          {subtitle}
        </p>
      )}
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// WEBSITE SHOWCASE
//
// web prop shape:
// {
//   headlineHtml: string  — HTML string; wrap words in <span> to style them
//   description:  string  — plain subtitle paragraph
//   url:          string
//   features:     [{ label, description }]
//   images: { desktop: string, screens: string[] }
// }
// ══════════════════════════════════════════════════════════════════════════════

function WebShowcase({ web }) {
  if (!web) return null
  const screens = web.images?.screens ?? []

  return (
    <section className="pt-8 sm:pt-12 flex flex-col gap-5 sm:gap-10 font-primary">
      <SectionHeading pill="The Website" titleHtml={web.headlineHtml} subtitle={web.description} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
        {web.images?.desktop && (
          <div className="relative w-full rounded-xl overflow-hidden border border-border">
            <div className="flex items-center gap-1.5 px-4 py-2.5 sm:py-3 bg-subPrimary/5 border-b border-border shrink-0">
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-primary/80" />
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-primary/80" />
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-primary/80" />
              {web.url && (
                <div className="flex-1 mx-2 sm:mx-3 px-3 py-1 bg-bg rounded-full border border-border">
                  <p className="text-[12px] sm:text-[13px] text-primary font-primary font-semibold select-none truncate">
                    {web.url.replace('https://', '')}
                  </p>
                </div>
              )}
              <CheckBadgeIcon className="w-4 h-4 text-primary" />
            </div>
            <div className="w-full aspect-video">
              <img src={web.images.desktop} alt="Website screenshot" className="w-full h-full object-cover object-top" />
            </div>
          </div>
        )}

        {web.features?.length > 0 && (
          <div className="flex flex-col gap-5 h-full">
            <div className="flex items-center justify-between px-0.5">
              <SectionPill>Web Core Features</SectionPill>
              <span className="text-[11px] font-secondary text-text/60 bg-subPrimary/20 border border-subPrimary/40 rounded-full px-2 py-0.5 select-none">
                {String(web.features.length).padStart(2, '0')}
              </span>
            </div>
            <FeatureAccordion features={web.features} />
            <div className="flex items-center gap-4 mt-auto pt-2">
              <div className="flex-1 h-px bg-border" />
              <CTAButton variant="filled" showArrow link="/letstalk">See Plans</CTAButton>
            </div>
          </div>
        )}
      </div>

      {screens.length > 0 && (
        <>
          <div className="hidden md:grid grid-cols-3 gap-4">
            {screens.slice(0, 3).map((src, i) => (
              <div key={i} className="w-full aspect-video rounded-xl overflow-hidden border border-border">
                <img src={src} alt={`Screen ${i + 1}`} className="w-full h-full object-cover object-top" />
              </div>
            ))}
          </div>
          <div className="md:hidden">
            <ImageCarousel images={screens} aspect="16/9" />
          </div>
        </>
      )}
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// APP SHOWCASE
//
// app prop shape:
// {
//   headline:    string  — plain string for the section title
//   description: string  — plain subtitle paragraph
//   features:    [{ label, description }]
//   images: { screens: string[] }
// }
// ══════════════════════════════════════════════════════════════════════════════

function AppShowcase({ app }) {
  if (!app) return null
  const extraScreens = app.images?.screens ?? []
  const N = extraScreens.length
  const { containerRef, x, idx, snapTo, handleDragEnd } = useCarousel(N)

  return (
    <section className="flex flex-col gap-5 sm:gap-10 pt-8 sm:pt-12 font-primary">
      <SectionHeading pill="The Mobile Application" title={app.headlineHtml} subtitle={app.description} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 items-center">
        {N > 0 && (
          <>
            {/* Mobile: drag-snap carousel */}
            <div className="md:hidden flex flex-col gap-4">
              <div ref={containerRef} className="overflow-hidden w-full">
                <motion.div drag="x"
                  dragConstraints={{ left: -(N - 1) * ((containerRef.current?.clientWidth ?? 0) + GAP), right: 0 }}
                  dragElastic={0.08} dragMomentum={false} onDragEnd={handleDragEnd}
                  style={{ x, display: 'flex', alignItems: 'stretch', gap: GAP, width: `calc(${N * 100}% + ${(N - 1) * GAP}px)`, willChange: 'transform', touchAction: 'pan-y', cursor: 'grab' }}
                >
                  {extraScreens.map((src, i) => (
                    <div key={i} style={{ flex: `0 0 calc(${100 / N}% - ${((N - 1) * GAP) / N}px)` }}>
                      <div className="relative w-full rounded-2xl overflow-hidden border border-border" style={{ aspectRatio: '4/5' }}>
                        {src && <img src={src} alt={`Screen ${i + 1}`} className="absolute inset-0 w-full h-full object-cover object-top" draggable={false} />}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
              <CarouselNav count={N} idx={idx} snapTo={snapTo} />
            </div>

            {/* Desktop: staggered column */}
            <div className="hidden md:flex gap-4 items-end w-full">
              {extraScreens.slice(0, 3).map((src, i) => (
                <div key={i} className="relative flex-1 rounded-2xl overflow-hidden border border-border"
                  style={{ aspectRatio: '9/16', transform: i === 1 ? 'translateY(-16px)' : 'none' }}>
                  {src && <img src={src} alt={`Screen ${i + 1}`} className="absolute inset-0 w-full h-full object-cover object-top" />}
                </div>
              ))}
            </div>
          </>
        )}

        {app.features?.length > 0 && (
          <div className="flex flex-col gap-5 h-full">
            <div className="flex items-center justify-between px-0.5">
              <SectionPill>App Core Features</SectionPill>
              <span className="text-[11px] font-secondary text-text/60 bg-subPrimary/20 border border-subPrimary/40 rounded-full px-2 py-0.5 select-none">
                {String(app.features.length).padStart(2, '0')}
              </span>
            </div>
            <FeatureAccordion features={app.features} />
            <div className="flex items-center gap-4 mt-auto pt-2">
              <div className="flex-1 h-px bg-border" />
              <CTAButton variant="filled" showArrow link="/letstalk">Let's Talk</CTAButton>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// MAIN EXPORT
//
// web.headlineHtml  — HTML string; use <span class="..."> to style parts
// app.headline      — plain string
// ══════════════════════════════════════════════════════════════════════════════

export default function CaseStudyPage({
  title  = '',
  quote  = null,
  brand  = {},
  images = {},
  web    = null,
  app    = null,
}) {
  return (
    <div className="w-full bg-bg text-text font-primary">
      <BrandIdentitySection brand={brand} title={title} images={images.mockups ?? []} />
      <AppShowcase app={app} />
      <WebShowcase web={web} />
      {/* <QuoteSection quote={quote} /> */}
    </div>
  )
}