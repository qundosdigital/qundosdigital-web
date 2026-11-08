import React, { useState, useRef, useCallback, memo, useEffect } from 'react'
import { AnimatePresence, motion, useMotionValue, animate } from 'framer-motion'
import { ArrowLeftIcon, ArrowRightIcon, PencilSquareIcon } from '@heroicons/react/20/solid'
import { client_images } from '../../assets/assets'
import { StarIcon } from '@heroicons/react/16/solid'
import CTAButton from '../CTAButton'

const REVIEWS = [
  {
    id: 1,
    name: 'Ahmad Jahel',
    role: 'Owner of Bees Service',
    rating: 5.0,
    tags: ['Total Infastructure Bundle', 'Mobile Dev'],
    text: "The team created our branding and marketplace application for BeeService, and the results were excellent. The app is fast, user-friendly, and perfectly represents our vision. Their work helped us launch with a professional image and a strong user experience.",
    photo: client_images.client1,
    sideLeft: client_images.client2,
    sideRight: client_images.client3,
  },
  {
    id: 2,
    name: 'Ali Dagher',
    role: 'Owner of Ali\'s Electronic',
    rating: 5.0,
    tags: ['Items & Order Commerce', 'Brand Identity',],
    text: "We hired them for the branding and e-commerce website of Alis Electronic. The identity feels modern and professional, and the website makes it easy for customers to browse and purchase electronics and robotic parts. Great work from start to finish.",
    photo: client_images.client2,
    sideLeft: client_images.client3,
    sideRight: client_images.client1,
  },
  {
    id: 3,
    name: 'Ali Fadel',
    role: 'Owner of Farouj Fadel.',
    rating: 4.8,
    tags: ['Brand Identity',],
    text: "The branding they created for Farouj Fadel gave our restaurant a fresh and memorable identity. From the logo to the packaging, everything reflects our quality and helps us stand out in the fast-food market.",
    photo: client_images.client3,
    sideLeft: client_images.client1,
    sideRight: client_images.client2,
  },
]

const N        = REVIEWS.length
const CARD_GAP = 16
const SPRING   = { type: 'spring', stiffness: 320, damping: 32, mass: 0.9 }

// ── Animation variants ────────────────────────────────────────────────────────
const IMAGE_VARIANTS = {
  enter:  (d) => ({ x: d > 0 ? 18 : -18, opacity: 0, filter: 'blur(6px)' }),
  center:         { x: 0,                 opacity: 1, filter: 'blur(0px)' },
  exit:   (d) => ({ x: d > 0 ? -18 : 18, opacity: 0, filter: 'blur(6px)' }),
}
const CARD_VARIANTS = {
  enter:  { opacity: 0 },
  center: { opacity: 1 },
  exit:   { opacity: 0 },
}
const STAGGER = { center: { transition: { staggerChildren: 0.065, delayChildren: 0.1 } } }
const ITEM = {
  enter:  { opacity: 0, y: 10 },
  center: { opacity: 1, y: 0,  transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit:   { opacity: 0, y: -5, transition: { duration: 0.16, ease: 'easeIn' } },
}
const MOB_STAGGER_ACTIVE   = { transition: { staggerChildren: 0.07, delayChildren: 0.05 } }
const MOB_STAGGER_INACTIVE = {}
const MOB_ITEM = {
  hidden: { opacity: 0, y: 12 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.34, ease: [0.25, 0.46, 0.45, 0.94] } },
  hide:   { opacity: 0, y: -6, transition: { duration: 0.16, ease: 'easeIn' } },
}
const IMG_T  = { duration: 0.52, ease: [0.25, 0.46, 0.45, 0.94] }
const CARD_T = { duration: 0.28, ease: 'easeInOut' }

// ── Micrographic contour patterns (5 total — cycles for any number of cards) ─
const INK = '#0E513C'
const SVG_PROPS = {
  viewBox: '0 0 320 280',
  preserveAspectRatio: 'xMidYMid slice',
  xmlns: 'http://www.w3.org/2000/svg',
  'aria-hidden': 'true',
  style: { position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' },
}

// 0 — isometric dot grid: tiny filled dots at offset rows, covers card evenly
function MicroDots() {
  const dots = []
  const colSpacing = 20, rowSpacing = 18
  const cols = Math.ceil(320 / colSpacing) + 1
  const rows = Math.ceil(280 / rowSpacing) + 1
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = c * colSpacing + (r % 2 === 1 ? colSpacing / 2 : 0)
      const y = r * rowSpacing
      dots.push({ x, y })
    }
  }
  return (
    <svg {...SVG_PROPS}>
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r="0.85" fill={INK} opacity="0.1"/>
      ))}
    </svg>
  )
}

// 1 — evenly spaced parallel lines at 38°, single direction only
function MicroParallels() {
  const lines = []
  for (let i = -5; i <= 20; i++) {
    const x0 = i * 24
    lines.push([x0, 0, x0 + 340, 280])
  }
  return (
    <svg {...SVG_PROPS}>
      {lines.map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke={INK} strokeWidth="0.5" opacity="0.085"/>
      ))}
    </svg>
  )
}

// 2 — fine square grid: horizontal + vertical lines at equal spacing
function MicroGrid() {
  const step = 22
  const hLines = [], vLines = []
  for (let y = 0; y <= 280; y += step) hLines.push(y)
  for (let x = 0; x <= 320; x += step) vLines.push(x)
  return (
    <svg {...SVG_PROPS}>
      {hLines.map((y, i) => (
        <line key={`h${i}`} x1="0" y1={y} x2="320" y2={y}
          stroke={INK} strokeWidth="0.45" opacity="0.075"/>
      ))}
      {vLines.map((x, i) => (
        <line key={`v${i}`} x1={x} y1="0" x2={x} y2="280"
          stroke={INK} strokeWidth="0.45" opacity="0.075"/>
      ))}
    </svg>
  )
}

// 3 — clean concentric ellipses from card centre
function MicroRings() {
  return (
    <svg {...SVG_PROPS}>
      {[18, 36, 54, 72, 92, 114, 138, 164, 192, 222].map((rx, i) => (
        <ellipse key={i} cx="160" cy="140"
          rx={rx} ry={rx * 0.72}
          fill="none" stroke={INK} strokeWidth="0.5" opacity="0.085"/>
      ))}
    </svg>
  )
}

// 4 — fine radial fan from bottom-right corner, evenly spread
function MicroFan() {
  const lines = []
  const cx = 320, cy = 280, len = 480
  const startAngle = Math.PI          // 180°
  const endAngle   = Math.PI * 1.5    // 270°
  const count      = 14
  for (let i = 0; i < count; i++) {
    const a = startAngle + (i / (count - 1)) * (endAngle - startAngle)
    lines.push([cx + len * Math.cos(a), cy + len * Math.sin(a)])
  }
  return (
    <svg {...SVG_PROPS}>
      {lines.map(([x2, y2], i) => (
        <line key={i} x1={cx} y1={cy} x2={x2} y2={y2}
          stroke={INK} strokeWidth="0.5" opacity="0.085"/>
      ))}
    </svg>
  )
}

// Pool of patterns — cycles via index % CONTOURS.length
const CONTOURS = [MicroDots, MicroParallels, MicroGrid, MicroRings, MicroFan]

// ── Sub-components ────────────────────────────────────────────────────────────
const StarRating = memo(({ rating }) => (
  <div className="flex items-center gap-2 font-primary">
    <span className="text-[15px] leading-7 font-primary font-black text-text">{rating.toFixed(1)}</span>
    <StarIcon className="h-4 w-4 text-primary"/>
  </div>
))

const SideImage = memo(({ src, dir, id, grayscale }) => (
  <div
    className={`w-[28%] lg:w-[26%] shrink-0 rounded-xl overflow-hidden relative ${grayscale ? 'grayscale opacity-90' : ''}`}
    style={{ minHeight: '260px' }}
  >
    <AnimatePresence mode="popLayout" custom={dir}>
      <motion.img
        key={id} src={src} alt="" custom={dir}
        variants={IMAGE_VARIANTS} initial="enter" animate="center" exit="exit"
        transition={IMG_T}
        style={{ willChange: 'transform, opacity, filter' }}
        className="absolute inset-0 w-full h-full object-cover rounded-xl"
      />
    </AnimatePresence>
    <div className="absolute inset-0 bg-linear-to-t from-text/30 to-transparent"/>
  </div>
))

// Desktop centre card — gets its own contour keyed to `current`
const DesktopCardContent = memo(({ review, current }) => {
  const Contour = CONTOURS[current % CONTOURS.length]
  return (
    <motion.div variants={STAGGER} initial="enter" animate="center" exit="exit"
      className="flex flex-col justify-between gap-5 h-full">
      {/* Micrographic background — rendered once, behind all text */}
      <Contour/>
      <motion.div variants={ITEM} className="flex items-center justify-between">
        <span className="text-[52px] font-black text-text leading-none select-none">"</span>
        <div className="flex gap-2 flex-wrap justify-end">
          {review.tags.map(t => (
            <span key={t}
              className="border border-primary rounded-full px-2.5 py-1 text-[13px] bg-primary/2 text-primary select-none font-primary font-semibold opacity-80 italic">
              {t}
            </span>
          ))}
        </div>
      </motion.div>
      <motion.p variants={ITEM}
        className="text-[16px] text-text leading-8 text-justify opacity-95 select-none flex-1 font-primary">
        {review.text}
      </motion.p>
      <motion.div variants={ITEM} className="flex items-end justify-between">
        <div className="flex flex-col items-start gap-1 font-primary">
          <p className="text-[16px] font-semibold text-text select-none">{review.name}</p>
          <p className="text-[14px] text-text opacity-60 select-none">{review.role}</p>
        </div>
        <StarRating rating={review.rating}/>
      </motion.div>
    </motion.div>
  )
})

// Mobile card — contour keyed to the review's position in the list
const MobileCard = memo(({ review, isActive, reviewIdx }) => {
  const state   = isActive ? 'show' : 'hide'
  const Contour = CONTOURS[reviewIdx % CONTOURS.length]

  return (
    <div className="relative border border-border rounded-xl p-5 flex flex-col gap-4 h-full overflow-hidden">
      {/* Contour background — always visible, not staggered */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <Contour/>
      </div>
      {/* Card content */}
      <div className="relative" style={{ zIndex: 1 }}>
        <motion.div
          animate={isActive ? MOB_STAGGER_ACTIVE : MOB_STAGGER_INACTIVE}
          className="flex flex-col gap-8 h-full"
        >
          <motion.div variants={MOB_ITEM} animate={state} initial="hidden"
            className="flex items-center justify-between">
            <div className="w-full flex items-center gap-4">
              <span className="text-[40px] font-black text-text leading-none select-none">"</span>
              {/* <img src={review.photo} alt={review.name}
                className="w-12 h-12 rounded-full object-cover border-2"/> */}
            </div>
            <div className="flex justify-end w-full">
              <StarRating rating={review.rating}/>
            </div>
          </motion.div>

          <motion.p variants={MOB_ITEM} animate={state} initial="hidden"
            className="text-[14px] text-text leading-6 text-justify opacity-90 select-none flex-1 font-primary">
            {review.text}
          </motion.p>

          <motion.div variants={MOB_ITEM} animate={state} initial="hidden"
            className="flex gap-2 flex-wrap">
            {review.tags.map(t => (
              <span key={t}
                className="border border-primary rounded-full px-2.5 py-1 text-[13px] bg-primary/2 text-primary select-none font-primary font-semibold opacity-80 italic">
                {t}
              </span>
            ))}
          </motion.div>

          <motion.div variants={MOB_ITEM} animate={state} initial="hidden"
            className="font-primary flex flex-col gap-1">
            <p className="text-[14px] font-semibold text-text select-none">{review.name}</p>
            <p className="text-[12px] text-text opacity-60 select-none">{review.role}</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
})

const NavButton = memo(({ onClick, label, children }) => (
  <button onClick={onClick} aria-label={label}
    className="w-10 h-10 cursor-pointer rounded-full border border-border flex items-center justify-center text-text hover:bg-primary hover:text-bg hover:border-primary transition-colors">
    {children}
  </button>
))

// ── Main ──────────────────────────────────────────────────────────────────────
export default function ReviewsSection() {
  const [[current, dir], setPage] = useState([1, 0])

  const containerRef = useRef(null)
  const x            = useMotionValue(0)
  const [mobIdx, setMobIdx] = useState(0)

  const snapX = useCallback((idx) => {
    const w = containerRef.current?.clientWidth ?? 0
    return -(idx * (w + CARD_GAP))
  }, [])

  const snapTo = useCallback((idx) => {
    const clamped = Math.max(0, Math.min(N - 1, idx))
    animate(x, snapX(clamped), SPRING)
    setMobIdx(clamped)
  }, [x, snapX])

  useEffect(() => {
    const ro = new ResizeObserver(() => x.set(snapX(mobIdx)))
    if (containerRef.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [mobIdx, x, snapX])

  const navigateDesktop = useCallback((d) => {
    setPage(([prev]) => [(prev + d + N) % N, d])
  }, [])

  const navigateMobile = useCallback((d) => snapTo(mobIdx + d), [mobIdx, snapTo])

  const handleDragEnd = useCallback((_, info) => {
    const w         = containerRef.current?.clientWidth ?? 0
    const threshold = w * 0.2
    if      (info.offset.x < -threshold) snapTo(mobIdx + 1)
    else if (info.offset.x >  threshold) snapTo(mobIdx - 1)
    else                                  snapTo(mobIdx)
  }, [mobIdx, snapTo])

  const review = REVIEWS[current]

  return (
    <section className="w-full px-8 md:px-12 lg:px-20 xl:px-44 2xl:px-56 pt-8 sm:pt-12 bg-bg flex flex-col gap-2">

      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 md:gap-16 mb-4 md:mb-10">
        <div className="flex flex-col gap-5 shrink-0">
          <div className="border border-primary px-3 py-0.5 w-min rounded-full">
            <p className="text-[12px] sm:text-[13px] text-primary font-primary font-semibold italic w-max select-none">Our Reputation</p>
          </div>
          <h2 className="text-[25px] sm:text-[36px] font-primary font-normal text-text leading-[32.5px] md:leading-11 tracking-tight select-none">
            What <span className="font-normal font-secondary text-primary">Founders</span>{' '}
            <em className="italic font-normal font-primary">Say About</em>
            <br/>
            <span className="font-normal font-secondary text-text">The</span>
            <span className="font-normal font-secondary text-primary"> Results </span>
            <span className="font-normal font-secondary text-text">We Deliver</span>
          </h2>
        </div>
        <p className="text-[14px] sm:text-[16px] font-primary text-text leading-6 text-justify md:max-w-lg md:pt-12 select-none">
          Ambitious business owners who needed a brand that could command a higher price — and a website that closed the gap.
        </p>
      </div>

      {/* ══ DESKTOP ══════════════════════════════════════════════════════════ */}
      <div className="hidden md:flex items-stretch gap-6">
        <SideImage src={review.sideLeft} dir={dir} id={`l-${current}`}/>

        {/* Centre review card — overflow-hidden already present, relative already present */}
        <div className="flex-1 rounded-xl border border-border overflow-hidden relative" style={{ minHeight: '400px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={`card-${current}`}
              variants={CARD_VARIANTS} initial="enter" animate="center" exit="exit"
              transition={CARD_T}
              style={{ willChange: 'opacity' }}
              className="absolute inset-0 p-7 flex flex-col justify-between gap-5"
            >
              <DesktopCardContent review={review} current={current}/>
            </motion.div>
          </AnimatePresence>
        </div>

        <SideImage src={review.sideRight} dir={dir} id={`r-${current}`} grayscale/>
      </div>

      {/* ══ MOBILE ═══════════════════════════════════════════════════════════ */}
      <div ref={containerRef} className="md:hidden overflow-hidden">
        <motion.div
          drag="x"
          dragConstraints={{ left: snapX(N - 1), right: 0 }}
          dragElastic={0.08}
          dragMomentum={false}
          onDragEnd={handleDragEnd}
          style={{
            x,
            display: 'flex',
            alignItems: 'stretch',
            gap: CARD_GAP,
            width: `calc(${N * 100}% + ${(N - 1) * CARD_GAP}px)`,
            willChange: 'transform',
            touchAction: 'pan-y',
            cursor: 'grab',
          }}
        >
          {REVIEWS.map((r, i) => (
            <div key={r.id}
              style={{ flex: `0 0 calc(${100 / N}% - ${((N - 1) * CARD_GAP) / N}px)` }}>
              <MobileCard review={r} isActive={i === mobIdx} reviewIdx={i}/>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ══ DESKTOP NAV ══════════════════════════════════════════════════════ */}
      <div className="hidden md:flex items-center mt-8 gap-3">
        <div style={{ flex: 2 }} className="h-px bg-border"/>
        <div className="flex items-center gap-2 shrink-0">
          <NavButton onClick={() => navigateDesktop(-1)} label="Previous">
            <ArrowLeftIcon className="w-4 h-4"/>
          </NavButton>
          <NavButton onClick={() => navigateDesktop(1)} label="Next">
            <ArrowRightIcon className="w-4 h-4"/>
          </NavButton>
        </div>
        <div style={{ flex: 3 }} className="h-px bg-border"/>
        <CTAButton variant="outlined" showArrow={true} link='/writeareview'>
          <div className="flex w-max items-center justify-center gap-2">
            <PencilSquareIcon className="w-4 h-4"/>
            Write a Review
          </div>
        </CTAButton>
      </div>

      {/* ══ MOBILE NAV ═══════════════════════════════════════════════════════ */}
      <div className="md:hidden flex items-center mt-4 gap-3">
        <div className="flex items-center gap-2 shrink-0">
          <NavButton onClick={() => navigateMobile(-1)} label="Previous">
            <ArrowLeftIcon className={`w-4 h-4 opacity-40 ${mobIdx > 0 ? 'text-primary opacity-100' : ''}`}/>
          </NavButton>
          <NavButton onClick={() => navigateMobile(1)} label="Next">
            <ArrowRightIcon className={`w-4 h-4 opacity-40 ${mobIdx < REVIEWS.length - 1 ? 'text-primary opacity-100' : ''}`}/>
          </NavButton>
        </div>
        <div className="flex-1 h-px bg-border"/>
        <CTAButton variant="outlined" link='/writeareview'>
          <div className="flex w-max items-center justify-center gap-2">
            <PencilSquareIcon className="w-4 h-4"/>
            Write a Review
          </div>
        </CTAButton>
      </div>

    </section>
  )
}