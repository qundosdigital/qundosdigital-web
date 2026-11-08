import React, { useRef, useCallback, useEffect, memo, useState } from 'react'
import { motion, useMotionValue, animate, AnimatePresence } from 'framer-motion'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/20/solid'
import CTAButton from '../CTAButton'
import { bento_grid } from '../../assets/assets'

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────
const CARD_GAP = 10
const MOB_H    = 420
const SPRING = { type: 'spring', stiffness: 560, damping: 36, mass: 0.55 }


const INK = '#0E513C'
const SVG_PROPS = {
  viewBox: '0 0 320 280',
  preserveAspectRatio: 'xMidYMid slice',
  xmlns: 'http://www.w3.org/2000/svg',
  'aria-hidden': 'true',
  style: { position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' },
}

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

// ─────────────────────────────────────────────────────────────────────────────
// Feature cards data
// ─────────────────────────────────────────────────────────────────────────────

const FEATURE_CARDS = [
  {
    id: 'brand-manual',
    image: bento_grid.bento2,
    label: 'Branding',
    tag: 'END AGENCY RESETS',
    number: '01',
    title: "Your Brand Documented. So the Next Person Gets It Right.",
    description:
      "We build everything your team, vendors, and partners need to run from the same playbook — logo, strategy, color, type, voice, and usage rules. No more chaos when the account manager changes. No more starting from scratch.",
    proof: '20–40% higher close rate on proposals.',
  },
  {
    id: 'web-dev',
    image: bento_grid.bento3,
    label: 'Web Development',
    tag: 'TURN VISITS INTO REVENUE',
    number: '02',
    title: "A Website That Pre-Qualifies, Convinces, and Closes.",
    description:
      "Most websites are digital brochures — they describe but don't convert. We build websites around one goal: making the right person take the next step. Lead qualification, content management, and mobile performance.",
    proof: '30–50% shorter sales cycle when site pre-qualifies.',
  },
  {
    id: 'ops-system',
    image: bento_grid.bento5,
    label: 'Operational Systems',
    tag: 'STEP BACK. SELL MORE.',
    number: '03',
    title: "Your Business Running The Same Way Whether You're There Or Not..",
    description:
      "Brand, website, and positioning built together — not handed off between vendors. You get a business that closes deals while you're offline, and that any buyer, investor, or partner can understand in minutes.",
    proof: 'Built for the founder who\'s ready to step back without things falling apart.',
  },
  {
    id: 'full-system',
    image: bento_grid.bento4,
    label: 'Complete Bundles',
    tag: 'STEP BACK. SELL MORE.',
    number: '04',
    title: "Brand. Web. Operations. Built As One Thing, Not Three Separate Bills.",
    description:
      "When branding, your website, and your internal systems are built by different people with different agendas, the gaps between them cost you money. We build all three as a single infrastructure — engineered to compound in value the longer you use it.",
    proof: 'This is what your competitors who charge more than you are sitting on.',
  },
]

const FEATURE_CARDS_MOBILE = [
  {
    id: 'brand-manual',
    image: bento_grid.bento2,
    label: 'Branding',
    tag: 'END AGENCY RESETS',
    number: '01',
    title: "Your Brand in a Playbook Anyone Can Run.",
    description: "Positioning, voice, identity — documented once and used by everyone. There will be no resets.",
    proof: '20–40% higher close rate on proposals.',
  },
  {
    id: 'web-dev',
    image: bento_grid.bento3,
    label: 'Web Development',
    tag: 'TURN VISITS INTO REVENUE',
    number: '02',
    title: "A Site That Qualifies Before You Pick Up the Phone.",
    description: "Built around making the right person take the next step; not just look around and leave.",
    proof: '30–50% shorter sales cycle when site pre-qualifies.',
  },
  {
    id: 'ops-systems',
    image: bento_grid.bento4,
    label: 'Operational Systems',
    tag: 'PRODUCTIZE YOUR PROCESS',
    number: '03',
    title: "Your Business Mastered Without the Bottlenecks.",
    description: "Dashboards, workflows, and access controls so things run the same with or without you.",
    proof: 'Built for the founder who\'s ready to step back.',
  },
  {
    id: 'full-system',
    image: bento_grid.bento5,
    label: 'Complete Bundles',
    tag: 'STEP BACK. SELL MORE.',
    number: '04',
    title: "Brand, Web & Ops. Built as One for the Whole Team.",
    description: "All built together so nothing gaps, or conflicts; and the whole thing compounds in value.",
    proof: 'Your competitors who charge more use this.',
  },
]

const N         = FEATURE_CARDS.length
const TOTAL_MOB = N + 1

// ─────────────────────────────────────────────────────────────────────────────
// Shared NavButton
// ─────────────────────────────────────────────────────────────────────────────
const NavButton = memo(({ onClick, label, children, disabled }) => (
  <button
    onClick={onClick}
    aria-label={label}
    disabled={disabled}
    className="w-10 h-10 cursor-pointer rounded-full border border-border flex items-center justify-center text-text hover:bg-primary hover:text-bg hover:border-primary transition-colors">
    {children}
  </button>
))

// ─────────────────────────────────────────────────────────────────────────────
// Scanlines texture
// ─────────────────────────────────────────────────────────────────────────────
function Scanlines() {
  return (
    <svg
      viewBox="0 0 1 1"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 2,
        opacity: 0.08,
      }}
    >
      <defs>
        <pattern id="scan" x="0" y="0" width="1" height="4" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="1" height="1" fill="white"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#scan)"/>
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Desktop expandable card
// ─────────────────────────────────────────────────────────────────────────────
function ExpandableCard({ card, isExpanded, onEnter }) {
  // Glass bar fades in AFTER flex expansion settles → backdrop-blur never runs during animation
  const glassStyle = {
    opacity:    isExpanded ? 1 : 0,
    transition: isExpanded
      ? 'opacity 0.15s ease 0.18s'
      : 'opacity 0.08s ease 0s',   // instant on collapse
    pointerEvents: isExpanded ? 'auto' : 'none',
  }
  // Top row text (no backdrop-blur) safe to animate freely
  const textStyle = {
    opacity:    isExpanded ? 1 : 0,
    transition: isExpanded
      ? 'opacity 0.15s ease 0.18s'
      : 'opacity 0.08s ease 0s',
    pointerEvents: isExpanded ? 'auto' : 'none',
  }

  return (
    // ── Outer: flex transition ONLY — no overflow-hidden here ────────────────
    // Separating flex from clip eliminates the per-frame re-clip that causes jitter
    <div
      style={{
        flex: isExpanded ? '2 0 0' : '0.55 0 0',
        minWidth: 0,
        position: 'relative',
        cursor: 'pointer',
        userSelect: 'none',
        transitionProperty: 'flex, filter',
        transitionDuration: '0.28s, 0.22s',
        transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94), ease',
        filter: isExpanded ? 'grayscale(0)' : 'grayscale(0.85)',
        // Promote to GPU layer so flex reflow never triggers a repaint
        transform: 'translateZ(0)',
        willChange: 'transform',
      }}
      onMouseEnter={onEnter}
    >
      {/* ── Inner: clip + border-radius only — never transitions ───────────── */}
      <div className="relative rounded-xl overflow-hidden w-full h-full">

        <Scanlines />
        {card.image && (
          <img
            src={card.image}
            alt=""
            draggable={false}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            style={{ zIndex: 0 }}
          />
        )}

        {/* Gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0.06) 55%, transparent 100%)',
            zIndex: 1,
          }}
        />

        {/* ── Vertical label — shows when collapsed ───────────────────────── */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ zIndex: 3, opacity: isExpanded ? 0 : 1, transition: 'opacity 0.1s ease' }}
        >
          <p
            className="font-primary font-semibold text-white/90 whitespace-nowrap"
            style={{ fontSize: 14, writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            {card.label}
          </p>
        </div>

        {/* ── Top row: label pill + number — no backdrop-blur, safe to animate ── */}
        <div
          className="absolute top-0 inset-x-0 flex items-start justify-between px-8 pt-7"
          style={{ zIndex: 4, ...textStyle }}
        >
          <span
            className="font-primary font-semibold border border-white/25 px-2.5 py-0.5 rounded-full italic text-white"
            style={{ fontSize: 12 }}
          >
            {card.label}
          </span>
          <span className="font-secondary text-white/50 leading-none" style={{ fontSize: 68 }}>
            {card.number}
          </span>
        </div>

        {/* ── Glass bar ────────────────────────────────────────────────────────
            Opacity is on THIS element — backdrop-blur is skipped entirely when
            opacity:0, so no blur computation happens during the flex animation.
            This kills both the jitter and the collapsed-state overlap.
        ─────────────────────────────────────────────────────────────────────── */}
        <div
          className="absolute bottom-0 inset-x-0 border-t border-bg/20"
          style={{
            zIndex: 4,
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            background: 'color-mix(in srgb, var(--color-bg) 18%, transparent)',
            ...glassStyle,
          }}
        >
          <div className="flex flex-col gap-3 px-8 pt-5 pb-6">
            <p className="font-primary font-semibold text-white leading-7" style={{ fontSize: 20 }}>
              {card.title}
            </p>
            <p className="font-primary text-white/75 leading-relaxed" style={{ fontSize: 13, maxWidth: 520 }}>
              {card.description}
            </p>
            <p className="font-primary text-subPrimary italic" style={{ fontSize: 11, opacity: 0.8 }}>
              {card.proof}
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Desktop accordion strip + bottom nav
// ─────────────────────────────────────────────────────────────────────────────
function ExpandableStrip() {
  const [activeIdx, setActiveIdx] = useState(0)

  const navigate = useCallback((d) => {
    setActiveIdx((prev) => (prev + d + N) % N)
  }, [])

  return (
    <div className="flex flex-col gap-0">
      <div className="flex" style={{ gap: CARD_GAP, height: 540 }}>
        {FEATURE_CARDS.map((card, i) => (
          <ExpandableCard
            key={card.id}
            card={card}
            isExpanded={activeIdx === i}
            onEnter={() => setActiveIdx(i)}
          />
        ))}
      </div>

      <div className="flex items-center mt-8 gap-3">
        <div style={{ flex: 2 }} className="h-px bg-border" />
        <div className="flex items-center gap-2 shrink-0">
          <NavButton onClick={() => navigate(-1)} label="Previous">
            <ArrowLeftIcon className="w-4 h-4" />
          </NavButton>
          <NavButton onClick={() => navigate(1)} label="Next">
            <ArrowRightIcon className="w-4 h-4" />
          </NavButton>
        </div>
        <div style={{ flex: 3 }} className="h-px bg-border" />
        <CTAButton variant="filled" showArrow={true} radius={12} link='/ourwork'>
          See Our Work
        </CTAButton>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Mobile feature card
// ─────────────────────────────────────────────────────────────────────────────
const MOB_CARD_TRANS = { type: 'spring', stiffness: 580, damping: 44, mass: 0.5 }

const MobileCard = memo(({ card, isActive }) => (
  // Never animate opacity on this element — backdrop-blur child must stay at opacity:1
  <div
    className="relative rounded-xl overflow-hidden select-none"
    style={{ height: MOB_H, transform: 'translateZ(0)' }}
  >
    {card.image && (
      <img
        src={card.image}
        alt=""
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{
          zIndex: 0,
          // grayscale on the img only — doesn't touch backdrop-blur
          filter: isActive ? 'grayscale(0)' : 'grayscale(0.85)',
          transition: 'filter 0.22s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      />
    )}

    {/* Gradient */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: 'linear-gradient(to top, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.05) 55%, transparent 100%)',
        zIndex: 1,
      }}
    />

    {/* ── Dark overlay for inactive state ───────────────────────────────────
        Sits above everything except the glass bar.
        Animating this overlay's opacity never touches the backdrop-filter.
    ─────────────────────────────────────────────────────────────────────── */}
    <div
      className="absolute inset-0 pointer-events-none rounded-xl"
      style={{
        zIndex: 3,
        background: 'rgba(0,0,0,0.52)',
        opacity:    isActive ? 0 : 1,
        transition: 'opacity 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      }}
    />

    {/* Top row — above overlay when active */}
    <div className="absolute top-0 inset-x-0 flex items-center justify-between px-6 pt-6"
      style={{ zIndex: 4 }}>
      <span
        className="font-primary font-semibold border border-white/25 px-2 py-0.5 rounded-full italic text-white"
        style={{ fontSize: 12 }}
      >
        {card.label}
      </span>
      <span className="font-secondary text-white/50" style={{ fontSize: 14 }}>
        {card.number}
      </span>
    </div>

    {/* ── Glass bar — ALWAYS at full opacity, never inside animated wrapper ── */}
    <div
      className="absolute bottom-0 inset-x-0 border-t border-bg/20"
      style={{
        zIndex: 5,
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        background: 'color-mix(in srgb, var(--color-bg) 18%, transparent)',
      }}
    >
      <div className="flex flex-col gap-2.5 px-6 pt-4 pb-5">
        <p className="font-primary font-semibold text-white leading-6" style={{ fontSize: 16 }}>
          {card.title}
        </p>
        <p className="font-primary text-white/70 leading-[22px]" style={{ fontSize: 12 }}>
          {card.description}
        </p>
        <p className="font-primary text-subPrimary italic" style={{ fontSize: 11, opacity: 0.75 }}>
          {card.proof}
        </p>
      </div>
    </div>
  </div>
))

// ─────────────────────────────────────────────────────────────────────────────
// Mobile CTA slide
// ─────────────────────────────────────────────────────────────────────────────
const CTA_STAGGER = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1, delayChildren: 0.12 } },
  hide:   {},
}
const CTA_ITEM = {
  hidden: { opacity: 0, y: 22, scale: 0.97 },
  show:   { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] } },
  hide:   { opacity: 0, y: -10, scale: 0.97, transition: { duration: 0.2, ease: 'easeIn' } },
}

const MobileCTASlide = memo(({ isActive }) => {
  const state = isActive ? 'show' : 'hide'

  return (
    <motion.div
      className="relative rounded-xl overflow-hidden select-none bg-bg border border-border"
      style={{ height: MOB_H }}
      animate={{ opacity: isActive ? 1 : 0.32 }}
      transition={MOB_CARD_TRANS}
    >
      <MicroParallels/>
      <svg
        viewBox="0 0 300 420"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0, opacity: 0.12 }}
      >
        {Array.from({ length: 15 }, (_, row) =>
          Array.from({ length: 12 }, (_, col) => (
            <circle
              key={`${row}-${col}`}
              cx={col * 28 + (row % 2 === 1 ? 14 : 0)}
              cy={row * 30}
              r="1.2"
              fill="white"
            />
          ))
        )}
      </svg>

      <motion.div
        variants={CTA_STAGGER}
        initial="hidden"
        animate={state}
        className="absolute inset-0 flex flex-col justify-between p-6"
        style={{ zIndex: 2 }}
      >
        <motion.p
          variants={CTA_ITEM}
          className="font-primary font-semibold tracking-wider uppercase text-primary"
          style={{ fontSize: 10, opacity: 0.6 }}
        >
          So you need proof
        </motion.p>

        <motion.div variants={CTA_ITEM} className="flex flex-col gap-3">
          <p className="font-secondary text-primary leading-snug" style={{ fontSize: 28 }}>
            We Build Legacy.
          </p>
          <p className="font-primary text-text leading-relaxed" style={{ fontSize: 13, opacity: 0.8 }}>
            It's time you stop settling, start closing, and build something worth owning.
          </p>
        </motion.div>

        <motion.div variants={CTA_ITEM}>
          <CTAButton variant="filled" showArrow={true} radius={12} link='/ourwork'>
            See Our Work
          </CTAButton>
        </motion.div>
      </motion.div>
    </motion.div>
  )
})

// ─────────────────────────────────────────────────────────────────────────────
// Mobile carousel
// ─────────────────────────────────────────────────────────────────────────────
function MobileCarousel() {
  const containerRef = useRef(null)
  const x            = useMotionValue(0)
  const [activeIdx, setActiveIdx] = useState(0)

  const isCTA = activeIdx === N

  const snapX = useCallback((idx) => {
    const w = containerRef.current?.clientWidth ?? 0
    return -(idx * (w + CARD_GAP))
  }, [])

  const snapTo = useCallback((idx) => {
    const clamped = Math.max(0, Math.min(TOTAL_MOB - 1, idx))
    animate(x, snapX(clamped), SPRING)
    setActiveIdx(clamped)
  }, [x, snapX])

  useEffect(() => {
    const ro = new ResizeObserver(() => x.set(snapX(activeIdx)))
    if (containerRef.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [activeIdx, x, snapX])

  const handleDragEnd = useCallback((_, info) => {
    const w         = containerRef.current?.clientWidth ?? 0
    const threshold = w * 0.18
    if      (info.offset.x < -threshold) snapTo(activeIdx + 1)
    else if (info.offset.x >  threshold) snapTo(activeIdx - 1)
    else                                  snapTo(activeIdx)
  }, [activeIdx, snapTo])

  return (
    <div className="flex flex-col gap-6">
      <div ref={containerRef} className="overflow-hidden">
        <motion.div
          drag="x"
          dragConstraints={{ left: snapX(TOTAL_MOB - 1), right: 0 }}
          dragElastic={0.06}
          dragMomentum={false}
          onDragEnd={handleDragEnd}
          style={{
            x,
            display: 'flex',
            alignItems: 'stretch',
            gap: CARD_GAP,
            width: `calc(${TOTAL_MOB * 100}% + ${(TOTAL_MOB - 1) * CARD_GAP}px)`,
            willChange: 'transform',
            touchAction: 'pan-y',
            cursor: 'grab',
          }}
        >
          {FEATURE_CARDS_MOBILE.map((card, i) => (
            <div
              key={card.id}
              style={{ flex: `0 0 calc(${100 / TOTAL_MOB}% - ${((TOTAL_MOB - 1) * CARD_GAP) / TOTAL_MOB}px)` }}
            >
              <MobileCard card={card} isActive={i === activeIdx} />
            </div>
          ))}

          <div style={{ flex: `0 0 calc(${100 / TOTAL_MOB}% - ${((TOTAL_MOB - 1) * CARD_GAP) / TOTAL_MOB}px)` }}>
            <MobileCTASlide isActive={isCTA} />
          </div>
        </motion.div>
      </div>

      {/* Nav bar */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 shrink-0">
          <NavButton onClick={() => snapTo(activeIdx - 1)} label="Previous" disabled={activeIdx === 0}>
            <ArrowLeftIcon className={`w-4 h-4 opacity-40 ${activeIdx > 0 && 'text-primary opacity-100'}`}/>
          </NavButton>
          <NavButton onClick={() => snapTo(activeIdx + 1)} label="Next" disabled={activeIdx === TOTAL_MOB - 1}>
            <ArrowRightIcon className={`w-4 h-4 opacity-40 ${activeIdx < N && 'text-primary opacity-100'}`}/>
          </NavButton>
        </div>

        <div className="flex-4 h-px bg-border" />

        <div className="flex w-max items-center gap-1.5">
          {FEATURE_CARDS.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => snapTo(i)}
                aria-label={`Card ${i + 1}`}
                animate={{ width: i === activeIdx ? 20 : 6, opacity: i === activeIdx ? 1 : 0.3 }}
                transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                className="h-1.5 rounded-full bg-primary"
                style={{ minWidth: 6 }}
              />
            ))}

            {/* CTA slide dot */}
            <motion.button
              onClick={() => snapTo(N)}
              aria-label="CTA slide"
              animate={{ width: activeIdx === N ? 20 : 6, opacity: activeIdx === N ? 1 : 0.3 }}
              transition={{ type: 'spring', stiffness: 800, damping: 46 }}
              className="h-1.5 rounded-full bg-primary"
              style={{ minWidth: 6 }}
            />
        </div>

        <div className="flex-1 flex justify-start w-max ml-2">
          <span className="text-[11px] w-max font-primary text-text opacity-50 select-none tabular-nums">
            {activeIdx + 1} / {N + 1}
          </span>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────────────────────────────────────
export default function BrandingBento() {
  return (
    <section className="w-full px-8 md:px-12 lg:px-20 xl:px-44 2xl:px-56 pt-8 sm:pt-12 bg-bg flex flex-col">

      <div className="flex flex-col gap-5">
        <div className="border border-primary px-3 py-0.5 w-min rounded-full">
          <p className="text-[12px] sm:text-[13px] text-primary font-primary font-semibold italic w-max select-none">
            What we do to solve this
          </p>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 md:gap-16 mb-6 md:mb-10">
          <h2 className="text-[25px] sm:text-[36px] font-primary font-normal text-text leading-[32.5px] md:leading-11 tracking-tight select-none">
            We Build
            <span className="font-secondary text-primary"> Infrastructure</span>{' '}<br/>
            <em className="font-secondary font-normal not-italic">Most Agencies Skip</em>
          </h2>
          <p className="text-[14px] sm:text-[16px] font-primary text-text leading-6 text-justify md:max-w-lg select-none">
            Documented positioning, a converting website,
            a running marketing system, and a brand guide; not scattered Canva files.
          </p>
        </div>
      </div>

      <div className="hidden md:block">
        <ExpandableStrip />
      </div>

      <div className="md:hidden">
        <MobileCarousel />
      </div>

    </section>
  )
}