import React, { useRef, useEffect, useCallback, useState, memo } from 'react'
import { useMotionValue, animate } from 'framer-motion'
import { motion } from 'framer-motion'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/20/solid'
import CTAButton from '../CTAButton'
import { issues } from '../../assets/assets'

/* ─── Palette ─────────────────────────────────────────────────────────────── */
const P   = '#0E513C'
const PLL = '#E8F5EF'

/* ─── Styles ─────────────────────────────────────────────────────────────── */
const STYLES = `
  @keyframes stamp-in {
    0%   { transform: scale(1.07) rotate(-1.2deg); opacity: 0; }
    65%  { transform: scale(0.97) rotate(0.4deg);  opacity: 1; }
    100% { transform: scale(1)    rotate(0deg);     opacity: 1; }
  }
  @keyframes draw { to { stroke-dashoffset: 0; } }
  .stamp-svg { animation: stamp-in 0.5s cubic-bezier(.22,.68,0,1.2) both; }
  .draw      { animation: draw 1.5s cubic-bezier(.4,0,.2,1) forwards; }
`

/* ─── Contour Backgrounds (4 unique variants) ─────────────────────────────── */
/*
 * Subtle topographic-line textures visible in the card background
 * behind the stamp illustration. Opacity is intentionally very low (~7%)
 * so they read as texture rather than graphic elements.
 */

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


const CONTOURS = [MicroDots, MicroFan, MicroGrid, MicroParallels , MicroRings]

/* ─── Stamp SVGs ──────────────────────────────────────────────────────────── */
/*
 * Four distinct passport-stamp shapes, each flat and minimal:
 *   Sales  → landscape oval (entry visa style)
 *   Demand → heraldic shield (badge stamp)
 *   Time   → double circle (round seal, text on curved path)
 *   Scale  → rotated diamond (travel stamp)
 *
 * Anatomy of each stamp:
 *   • Bold 3px outer border in primary green
 *   • Thin dashed inner border (evoking security printing)
 *   • PLL (#E8F5EF) flat fill inside
 *   • clipped graphic element (bars, bullseye, clock, staircase)
 *   • Serif label in small caps at the bottom
 */

function SVGSales() {
  return (
    <svg viewBox="0 0 240 140" xmlns="http://www.w3.org/2000/svg"
      className="w-full stamp-svg" style={{ display: 'block', animationDelay: '0s' }}>
      <line x1="44" y1="24" x2="44" y2="120" stroke={P} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="44" y1="120" x2="196" y2="120" stroke={P} strokeWidth="1.5" strokeLinecap="round"/>
      {[{x:56,h:36},{x:82,h:52},{x:108,h:44},{x:134,h:70},{x:160,h:88}].map((b,i)=>(
        <rect key={i} x={b.x} y={120-b.h} width="20" height={b.h}
          fill={i===4?P:'none'} stroke={P} strokeWidth="1.5" rx="2"/>
      ))}
      <polyline points="66,100 92,84 118,90 144,66 170,42"
        fill="none" stroke={P} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
        strokeDasharray="140" strokeDashoffset="140" className="draw"/>
      <polygon points="166,38 176,40 170,50" fill={P}/>
      <g className="float" style={{transformOrigin:'182px 52px'}}>
        <circle cx="182" cy="52" r="20" fill="none" stroke={P} strokeWidth="2"/>
        <circle cx="182" cy="52" r="20" fill={PLL} opacity="0.6"/>
        <line x1="176" y1="52" x2="188" y2="52" stroke={P} strokeWidth="2" strokeLinecap="round"/>
        <line x1="182" y1="46" x2="182" y2="58" stroke={P} strokeWidth="2" strokeLinecap="round"/>
      </g>
    </svg>
  )
}

function SVGDemand() {
  return (
    <svg viewBox="0 0 240 160" xmlns="http://www.w3.org/2000/svg"
      className="w-full stamp-svg" style={{ display: 'block', animationDelay: '0.08s' }}>
      <path d="M60,32 L180,32 L148,88 L92,88 Z"
        fill="none" stroke={P} strokeWidth="1.8" strokeLinejoin="round"/>
      <line x1="70" y1="50" x2="170" y2="50" stroke={P} strokeWidth="1" strokeDasharray="4 3"/>
      <line x1="84" y1="68" x2="156" y2="68" stroke={P} strokeWidth="1" strokeDasharray="4 3"/>
      <line x1="120" y1="88" x2="120" y2="120" stroke={P} strokeWidth="3" strokeLinecap="round"/>
      {[0,1,2].map(i=>(
        <circle key={i} cx="120" cy={124+i*10} r="3.5" fill={P}
          className="blink" style={{animationDelay:`${i*0.5}s`}}/>
      ))}
      <rect x="22" y="96" width="44" height="38" rx="4" fill="none" stroke={P} strokeWidth="1.5"/>
      <line x1="22" y1="108" x2="66" y2="108" stroke={P} strokeWidth="1.2"/>
      {[0,1,2].map(col=>[0,1].map(row=>(
        <rect key={`${col}${row}`} x={26+col*14} y={112+row*10} width="8" height="7"
          rx="1.5" fill={col===1&&row===0?P:'none'} stroke={P} strokeWidth="1"/>
      )))}
      <g className="float" style={{transformOrigin:'196px 64px'}}>
        <circle cx="196" cy="64" r="18" fill="none" stroke={P} strokeWidth="1.5"/>
        <circle cx="196" cy="64" r="18" fill={PLL} opacity="0.6"/>
        <path d="M188,64 l6,6 l10,-12" fill="none" stroke={P} strokeWidth="2.2"
          strokeLinecap="round" strokeLinejoin="round"/>
      </g>
    </svg>
  )
}

function SVGTime() {
  return (
    <svg viewBox="0 0 240 160" xmlns="http://www.w3.org/2000/svg"
      className="w-full stamp-svg" style={{ display: 'block', animationDelay: '0.16s' }}>
      <circle cx="110" cy="82" r="52" fill="none" stroke={P} strokeWidth="1.8"/>
      {[0,1,2,3,4,5,6,7,8,9,10,11].map(i=>{
        const a = (i/12)*Math.PI*2 - Math.PI/2
        const r1=44, r2=51
        return <line key={i}
          x1={110+r1*Math.cos(a)} y1={82+r1*Math.sin(a)}
          x2={110+r2*Math.cos(a)} y2={82+r2*Math.sin(a)}
          stroke={P} strokeWidth={i%3===0?2:1}/>
      })}
      <line x1="110" y1="82" x2="110" y2="40" stroke={P} strokeWidth="2" strokeLinecap="round"
        style={{transformOrigin:'110px 82px', animation:'slow-spin 12s linear infinite'}}/>
      <line x1="110" y1="82" x2="132" y2="66" stroke={P} strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="110" cy="82" r="3.5" fill={P}/>
      <g className="float" style={{transformOrigin:'185px 44px'}}>
        <circle cx="185" cy="44" r="22" fill="none" stroke={P} strokeWidth="1.5"/>
        <circle cx="185" cy="44" r="22" fill={PLL} opacity="0.6"/>
        <circle cx="179" cy="38" r="5" fill="none" stroke={P} strokeWidth="1.5"/>
        <circle cx="179" cy="50" r="5" fill="none" stroke={P} strokeWidth="1.5"/>
        <line x1="183" y1="41" x2="194" y2="52" stroke={P} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="183" y1="47" x2="194" y2="36" stroke={P} strokeWidth="1.5" strokeLinecap="round"/>
      </g>
      <text x="51" y="133" textAnchor="middle" fontSize="12" fill={P}
        fontFamily="'Bree Serif',sans-serif" fontWeight="600" letterSpacing=".1em">FOCUS</text>
    </svg>
  )
}

function SVGScale() {
  return (
    <svg viewBox="0 0 240 160" xmlns="http://www.w3.org/2000/svg"
      className="w-full stamp-svg" style={{ display: 'block', animationDelay: '0.24s' }}>
      <path d="M120,20 L162,36 L162,86 Q162,118 120,132 Q78,118 78,86 L78,36 Z"
        fill="none" stroke={P} strokeWidth="2" strokeLinejoin="round"/>
      <path d="M120,32 L150,44 L150,84 Q150,108 120,120 Q90,108 90,84 L90,44 Z"
        fill={PLL} stroke={P} strokeWidth="1" strokeLinejoin="round"/>
      <line x1="120" y1="98" x2="120" y2="54" stroke={P} strokeWidth="2.5" strokeLinecap="round"/>
      <polyline points="110,64 120,52 130,64" fill="none" stroke={P} strokeWidth="2.5"
        strokeLinecap="round" strokeLinejoin="round"/>
      {[{x:36,y:60},{x:204,y:60},{x:36,y:110},{x:204,y:110}].map((m,i)=>(
        <g key={i}>
          <circle cx={m.x} cy={m.y} r="14" fill="none" stroke={P} strokeWidth="1.2"
            strokeDasharray="4 3"/>
          <line x1={m.x-6} y1={m.y-6} x2={m.x+6} y2={m.y+6}
            stroke={P} strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
          <line x1={m.x+6} y1={m.y-6} x2={m.x-6} y2={m.y+6}
            stroke={P} strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
        </g>
      ))}
    </svg>
  )
}

function IssueOne() {
  return (
    <div className='w-75 flex mt-5 ml-2'><img src={issues.issue1}/></div>
  )
}
function IssueTwo() {
  return (
    <div className='w-75 mt-5 ml-4 flex'><img src={issues.issue2}/></div>
  )
}
function IssueThree() {
  return (
    <div className='w-80 mt-6 flex'><img src={issues.issue3}/></div>
  )
}
function IssueFour() {
  return (
    <div className='w-65 mt-2 flex'><img src={issues.issue4}/></div>
  )
}
/* ─── Cards Data ──────────────────────────────────────────────────────────── */
/*
 * HOW TO STYLE INDIVIDUAL TITLE TEXT SEGMENTS
 * ─────────────────────────────────────────────
 * Each card's `title` is an array of segment objects:
 *
 *   { text: 'some text', className?: string, style?: CSSProperties }
 *
 * Every segment becomes its own inline <span>, so you can apply any
 * Tailwind class or inline style to any word or phrase independently.
 *
 * Examples:
 *   { text: 'bold word',       className: 'font-bold' }
 *   { text: 'italic phrase',   className: 'italic' }
 *   { text: 'green accent',    className: 'text-primary' }
 *   { text: 'custom color',    style: { color: '#D4A63A' } }
 *   { text: 'combined',        className: 'font-semibold italic', style: { letterSpacing: '0.05em' } }
 */
const CARDS = [
  {
    id: 'adsIssue',
    title: [
      { text: 'You gain traffic that ', className: 'italic '},
      { text: 'vanishes with your money ', className: 'text-primary italic'},
      { text: 'when the ' },
      { text: 'budget gets paused.', className: 'italic' },
    ],
    desc: 'You spent money on ads and when the spending stopped nothing was left behind.',
    Illustration: IssueOne,
    contourIdx: 0,
    animDelay: 0,
  },
  {
    id: 'sameTalk',
    title: [
      { text: 'There is always ' },
      { text: 'a ', className: 'italic' },
      { text: ' new agency', className: 'italic text-primary' },
      { text: ' with yet another opinion and bill.' },
    ],
    desc: 'A new account manager arrives and resets the strategy, then sends you another bill.',
    Illustration: IssueThree,
    contourIdx: 1,
    animDelay: 0.08,
  },
  {
    id: 'noResults',
    title: [
      { text: 'You spent ', className: 'italic' },
      { text: ' ',},
      { text: 'time & money ', className: 'text-primary italic' },
      { text: 'polishing your brand only for ',},
      { text: 'static results. ', className: 'italic' },
    ],
    desc: 'The positioning isn\'t built to make someone choose you over a cheaper option.',
    Illustration: IssueFour,
    contourIdx: 2,
    animDelay: 0.16,
  },
  {
    id: 'steppingBack',
    title: [
      { text: 'Your business ', className: 'text-primary italic'},
      { text: 'runs ' },
      { text: 'on your image; ', className: 'italic' },
      { text: 'a costly mistake for long-term growth.' },
    ],
    desc: 'No documented system means no scale, team handoff, or a pitch that holds.',
    Illustration: IssueTwo,
    contourIdx: 3,
    animDelay: 0.24,
  },
]

const N        = CARDS.length
const CARD_GAP = 16
const SPRING   = { type: 'spring', stiffness: 320, damping: 32, mass: 0.9 }

/* ─── Card ───────────────────────────────────────────────────────────────── */
const ResourceCard = memo(function ResourceCard({ card }) {
  const ContourBg = CONTOURS[card.contourIdx]

  return (
    <div className="rounded-xl overflow-hidden flex flex-col border border-border w-full h-full">
      {/* Illustration area — three absolutely-stacked layers */}
      <div
        className="relative overflow-hidden w-full"
        style={{ aspectRatio: '240 / 165' }}
      >
        {/* Layer 0: contour texture */}
        <div className="absolute inset-0" style={{ zIndex: 0 }}>
          <ContourBg />
        </div>
        {/* Layer 1: stamp illustration */}
        <div className="absolute inset-0 flex w-full items-center justify-center" style={{ zIndex: 1 }}>
          <card.Illustration/>
        </div>
        {/* Layer 2: subtle bottom-edge vignette */}
        {/* <div
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 2, background: 'linear-gradient(to top, rgba(14,81,60,0.02) 0%, transparent 25%)' }}
        /> */}
      </div>

      {/* Text area */}
      <div className="flex flex-col gap-2 p-6 flex-1 border-t border-border">
        {/*
          Title — each segment is a styled <span>.
          Edit the `title` array in CARDS to change text styling per-segment.
        */}
        <p className="text-[15px] sm:text-[16px] font-primary font-semibold text-text leading-[22.4px] select-none">
          {card.title.map((seg, i) => (
            <span key={i} className={seg.className ?? ''} style={seg.style ?? {}}>
              {seg.text}
            </span>
          ))}
        </p>
        <p className="text-[14px] sm:text-[16px] font-primary text-text leading-6 select-none opacity-75 italic">
          {card.desc}
        </p>
      </div>
    </div>
  )
})

/* ─── Nav Button ─────────────────────────────────────────────────────────── */
const NavButton = memo(function NavButton({ onClick, label, children }) {
  return (
    <button onClick={onClick} aria-label={label}
      className="w-10 h-10 cursor-pointer rounded-full border border-border flex items-center justify-center text-text hover:bg-primary hover:text-bg hover:border-primary transition-colors">
      {children}
    </button>
  )
})

/* ─── Root ───────────────────────────────────────────────────────────────── */
export default function Issues() {
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

  const handleDragEnd = useCallback((_, info) => {
    const w         = containerRef.current?.clientWidth ?? 0
    const threshold = w * 0.2
    if      (info.offset.x < -threshold) snapTo(mobIdx + 1)
    else if (info.offset.x >  threshold) snapTo(mobIdx - 1)
    else                                  snapTo(mobIdx)
  }, [mobIdx, snapTo])

  return (
    <div className="px-8 md:px-12 lg:px-20 xl:px-44 2xl:px-56 mt-8 sm:mt-20">
      <style>{STYLES}</style>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 md:gap-16 mb-6 md:mb-10">
        <div className="flex flex-col gap-5 shrink-0">
          <div className="border border-primary px-3 py-0.5 w-min rounded-full">
            <p className="text-[12px] sm:text-[13px] text-primary font-primary font-semibold italic w-max select-none">
              Why is this important?
            </p>
          </div>
          <h2 className="text-[25px] sm:text-[36px] font-primary font-normal text-text leading-[32.5px] md:leading-11 tracking-tight select-none">
            Your Brand Either {' '} <br/>
            <span className="font-normal font-secondary text-primary">
              Builds Equity <span className="text-text font-primary font-semibold italic">or </span><span className="text-text">Burns Cash</span>
            </span>
          </h2>
        </div>
        <p className="text-[14px] sm:text-[16px] font-primary text-text leading-6 text-justify md:max-w-lg md:pt-8 select-none">
          Founders come to us after paying someone for files they can't use and a brand nobody remembers. Here's what's happening:
        </p>
      </div>

      {/* Desktop 4-col grid */}
      <div className="hidden md:grid grid-cols-4 gap-5">
        {CARDS.map(card => <ResourceCard key={card.id} card={card}/>)}
      </div>

      {/* Mobile snap carousel */}
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
          {CARDS.map((card) => (
            <div key={card.id}
              style={{ flex: `0 0 calc(${100 / N}% - ${((N - 1) * CARD_GAP) / N}px)` }}>
              <ResourceCard card={card}/>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Mobile nav */}
      <div className="md:hidden flex items-center mt-6 gap-3">
        <div className="flex items-center w-full gap-2 shrink-0">
          <NavButton onClick={() => snapTo(mobIdx - 1)} label="Previous">
            <ArrowLeftIcon className={`w-4 h-4 opacity-40 ${mobIdx > 0 && 'text-primary opacity-100'}`}/>
          </NavButton>
          <NavButton onClick={() => snapTo(mobIdx + 1)} label="Next">
            <ArrowRightIcon className={`w-4 h-4 opacity-40 ${mobIdx < N - 1 && 'text-primary opacity-100'}`}/>
          </NavButton>
          <div className="flex-4 h-px w-full bg-border"/>
          <div className="flex w-max items-center gap-1.5">
              {CARDS.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => snapTo(i)}
                  aria-label={`Card ${i + 1}`}
                  animate={{
                    width:   i === mobIdx ? 20 : 6,
                    opacity: i === mobIdx ? 1  : 0.3,
                  }}
                  transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                  className="h-1.5 rounded-full bg-primary"
                  style={{ minWidth: 6 }}
                />
              ))}
            </div>
                
            <div className="flex-1 flex justify-start w-max ml-2">
              <span className="text-[11px] w-max font-primary text-text opacity-50 select-none tabular-nums">
                {mobIdx + 1} / {N}
              </span>
            </div>
        </div>
      </div>

      {/* Desktop CTA */}
      <div className="hidden md:flex items-center mt-8 gap-4">
        <div className="flex-1 h-px bg-border"/>
        <CTAButton variant="outlined" showArrow={true} link='/letstalk'>Let's Talk</CTAButton>
      </div>
    </div>
  )
}