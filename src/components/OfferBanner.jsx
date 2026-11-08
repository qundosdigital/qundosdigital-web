import React, { memo } from 'react'
import CTAButton from './CTAButton'

/* ─── Palette ─────────────────────────────────────────────────────────────── */
const P    = '#0E513C'
const PLL  = '#E8F5EF'
const SAND = '#EDE8DF'

/* ─── Animations ──────────────────────────────────────────────────────────── */
const STYLES = `
  @keyframes ob-float-a {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-8px); }
  }
  @keyframes ob-float-b {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-5px); }
  }
  @keyframes ob-draw {
    to { stroke-dashoffset: 0; }
  }
  @keyframes ob-pulse {
    0%, 100% { opacity: 1;   transform: scale(1); }
    50%       { opacity: 0.25; transform: scale(0.8); }
  }
  @keyframes ob-spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes ob-fade-in {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .ob-fa  { animation: ob-float-a 5s ease-in-out infinite; }
  .ob-fb  { animation: ob-float-b 3.8s ease-in-out infinite; }
  .ob-drw { animation: ob-draw  2s 0.4s ease forwards; }
  .ob-pls { animation: ob-pulse 2.2s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
  .ob-spn { animation: ob-spin  10s linear infinite; transform-box: fill-box; transform-origin: center; }
  .ob-in  { animation: ob-fade-in 0.45s ease both; }
`

/* ══════════════════════════════════════════════════════════════════════════════
   SVG 1 — Free Resources & PDFs
   All decorative floats are clamped well inside viewBox="0 0 300 220"
   so nothing clips against the card edge.
══════════════════════════════════════════════════════════════════════════════ */

const INK = '#0E513C'
const SVG_PROPS = {
  viewBox: '0 0 320 280',
  preserveAspectRatio: 'xMidYMid slice',
  xmlns: 'http://www.w3.org/2000/svg',
  'aria-hidden': 'true',
  style: { position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' },
}

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
          fill="none" stroke={INK} strokeWidth="0.5" opacity="0.12"/>
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
const CONTOURS = [MicroRings, MicroFan]


function SVGResources() {
  const ink = P
  const fi  = 'rgba(14,81,60,0.07)'
  const fi2 = 'rgba(14,81,60,0.14)'

  const PX = 260, PY = 48   // peak coordinates

  return (
    <svg viewBox="0 0 300 220" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full" style={{ display: 'block' }}>

      {/* ── Subtle horizontal grid ────────────────────────────────── */}
      {[148, 114, 80].map((y, i) => (
        <line key={i} x1="40" y1={y} x2="272" y2={y}
          stroke={ink} strokeWidth="0.6" strokeDasharray="4 5" opacity="0.10"/>
      ))}

      {/* ── Chart axes ────────────────────────────────────────────── */}
      <line x1="40" y1="30" x2="40" y2="180"
        stroke={ink} strokeWidth="1.2" strokeLinecap="round" opacity="0.18"/>
      <line x1="40" y1="180" x2="276" y2="180"
        stroke={ink} strokeWidth="1.2" strokeLinecap="round" opacity="0.18"/>

      {/* ── Chart area fill (two layers for tonal depth) ─────────── */}
      <path
        d={`M46,180 L46,168 C78,160 124,143 157,123 C190,103 228,68 ${PX},${PY} L${PX},180 Z`}
        fill={fi}/>
      <path
        d={`M46,180 L46,168 C78,160 124,143 157,123 C190,103 228,68 ${PX},${PY} L${PX},180 Z`}
        fill={fi2} opacity="0.45"/>

      {/* ── Rising line (animated draw via ob-drw) ────────────────── */}
      <path
        d={`M46,168 C78,160 124,143 157,123 C190,103 228,68 ${PX},${PY}`}
        stroke={ink} strokeWidth="3" strokeLinecap="round" fill="none"
        strokeDasharray="335" strokeDashoffset="335" className="ob-drw"/>

      {/* ── Mid-point milestone dot ───────────────────────────────── */}
      <circle cx="157" cy="123" r="3.5" fill={fi2} stroke={ink} strokeWidth="1.8"/>

      {/* ── Peak — outer pulse rings (ob-fa breathe in/out) ─────────
          Two rings at different radii + delays for a radar-pulse feel */}
      <circle className="ob-fa" cx={PX} cy={PY} r="19" fill="none"
        stroke={ink} strokeWidth="0.9" opacity="0.14"
        style={{ transformOrigin: `${PX}px ${PY}px` }}/>
      <circle className="ob-fa" cx={PX} cy={PY} r="12" fill="none"
        stroke={ink} strokeWidth="1.1" opacity="0.24"
        style={{ transformOrigin: `${PX}px ${PY}px`, animationDelay: '0.28s' }}/>

      {/* ── Peak — core dot ──────────────────────────────────────── */}
      <circle cx={PX} cy={PY} r="5.5" fill={ink}/>

      {/* ── Upward arrow above peak ─────────────────────────────── */}
      <g className="ob-fa"
        style={{ transformOrigin: `${PX}px ${PY - 22}px`, animationDelay: '0.55s' }}>
        <line
          x1={PX} y1={PY - 10} x2={PX} y2={PY - 28}
          stroke={ink} strokeWidth="2.2" strokeLinecap="round"/>
        <polyline
          points={`${PX - 7},${PY - 22} ${PX},${PY - 30} ${PX + 7},${PY - 22}`}
          fill="none" stroke={ink} strokeWidth="2.2"
          strokeLinecap="round" strokeLinejoin="round"/>
      </g>

      {/* ── Free resource badge — top-left corner ────────────────
          Cross starburst (4 diagonal rays) + circle + download arrow.
          Reads instantly: "free download." */}
      <g className="ob-fa"
        style={{ transformOrigin: '28px 26px', animationDelay: '0.65s' }}>
        {[0, 45, 90, 135].map((deg, i) => {
          const r = (deg * Math.PI) / 180
          const c = Math.cos(r), s = Math.sin(r)
          return (
            <line key={i}
              x1={28 - c * 14} y1={26 - s * 14}
              x2={28 + c * 14} y2={26 + s * 14}
              stroke={ink} strokeWidth="2" strokeLinecap="round" opacity="0.28"/>
          )
        })}
        <circle cx="28" cy="26" r="11" fill={fi2} stroke={ink} strokeWidth="2"/>
        {/* Down arrow (download) */}
        <line x1="28" y1="19" x2="28" y2="27"
          stroke={ink} strokeWidth="1.7" strokeLinecap="round"/>
        <polyline points="24,24 28,30 32,24"
          fill="none" stroke={ink} strokeWidth="1.7"
          strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="24" y1="33" x2="32" y2="33"
          stroke={ink} strokeWidth="1.3" strokeLinecap="round"/>
      </g>

      {/* ── Open book — bottom-left ("learn") ────────────────────
          Left page darker fill (fi2), right page lighter (fi).
          Three ruled lines on the left page. */}
      <g className="ob-fb"
        style={{ transformOrigin: '34px 200px', animationDelay: '0.35s' }}>
        {/* Left page */}
        <path d="M10,215 Q10,190 34,187 L34,215 Z"
          fill={fi2} stroke={ink} strokeWidth="2" strokeLinejoin="round"/>
        {/* Right page */}
        <path d="M58,215 Q58,190 34,187 L34,215 Z"
          fill={fi} stroke={ink} strokeWidth="2" strokeLinejoin="round"/>
        {/* Spine */}
        <line x1="34" y1="187" x2="34" y2="215"
          stroke={ink} strokeWidth="1.4" opacity="0.45"/>
        {/* Page lines */}
        <line x1="14" y1="197" x2="30" y2="197" stroke={ink} strokeWidth="0.9" opacity="0.35"/>
        <line x1="14" y1="203" x2="30" y2="203" stroke={ink} strokeWidth="0.9" opacity="0.35"/>
        <line x1="14" y1="209" x2="26" y2="209" stroke={ink} strokeWidth="0.9" opacity="0.35"/>
      </g>

    </svg>
  )
}

/* ══════════════════════════════════════════════════════════════════════════════
   SVG 2 — Book Your Consultation
══════════════════════════════════════════════════════════════════════════════ */
function SVGConsultation({ dark }) {
  const ink = dark ? PLL : P
  const fi  = dark ? 'rgba(232,245,239,0.10)' : 'rgba(14,81,60,0.07)'
  const fi2 = dark ? 'rgba(232,245,239,0.20)' : 'rgba(14,81,60,0.15)'

  return (
    <svg viewBox="0 0 300 220" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full" style={{ display: 'block' }}>

      {/* Laptop screen */}
      <rect x="58" y="20" width="184" height="126" rx="9" fill={fi} stroke={ink} strokeWidth="2.4"/>
      <rect x="65" y="27" width="170" height="112" rx="5" fill={fi2}/>
      <line x1="150" y1="27" x2="150" y2="139" stroke={ink} strokeWidth="1" opacity="0.35"/>

      {/* Left person */}
      <circle cx="108" cy="68" r="20" fill={fi} stroke={ink} strokeWidth="1.8"/>
      <ellipse cx="101" cy="67" rx="2.8" ry="3.2" fill={ink}/>
      <ellipse cx="115" cy="67" rx="2.8" ry="3.2" fill={ink}/>
      <path d="M102,79 Q108,85 114,79" fill="none" stroke={ink} strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M80,135 Q80,104 108,99 Q136,104 136,135"
        fill={fi} stroke={ink} strokeWidth="1.8"/>

      {/* Right person */}
      <circle cx="192" cy="68" r="20" fill={fi2} stroke={ink} strokeWidth="1.8"/>
      <ellipse cx="185" cy="67" rx="2.8" ry="3.2" fill={ink}/>
      <ellipse cx="199" cy="67" rx="2.8" ry="3.2" fill={ink}/>
      <path d="M186,79 Q192,85 198,79" fill="none" stroke={ink} strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M164,135 Q164,104 192,99 Q220,104 220,135"
        fill={fi2} stroke={ink} strokeWidth="1.8"/>

      {/* REC dot + waveform */}
      <circle cx="76" cy="37" r="5.5" fill={ink} className="ob-pls"/>
      <line x1="86" y1="37" x2="91" y2="37" stroke={ink} strokeWidth="2" strokeLinecap="round"/>
      <line x1="94" y1="32" x2="94" y2="42" stroke={ink} strokeWidth="2" strokeLinecap="round"/>
      <line x1="99" y1="34" x2="99" y2="40" stroke={ink} strokeWidth="2" strokeLinecap="round"/>
      <line x1="104" y1="37" x2="109" y2="37" stroke={ink} strokeWidth="2" strokeLinecap="round"/>

      {/* Laptop base */}
      <path d="M42,147 L258,147 L270,166 L30,166 Z"
        fill={fi} stroke={ink} strokeWidth="2.2" strokeLinejoin="round"/>
      <rect x="132" y="153" width="36" height="9" rx="3"
        fill="none" stroke={ink} strokeWidth="1.4" opacity="0.55"/>


      {/* Dollar speech bubble — top-right (inset) */}
      <g className="ob-fa" style={{ transformOrigin: '258px 46px', animationDelay: '0.9s' }}>
        <path d="M226,22 Q226,4 258,4 Q290,4 290,22 Q290,40 258,40 L254,54 L244,40 Q226,40 226,22 Z"
          fill={fi} stroke={ink} strokeWidth="2.2"/>
        <circle cx="258" cy="22" r="14" fill="none" stroke={ink} strokeWidth="1"
          opacity="0.35" strokeDasharray="5 3" className="ob-spn"/>
        <text x="258" y="30" textAnchor="middle" fontSize="20"
          fill={ink} fontWeight="900" fontFamily="Arial,sans-serif">$</text>
      </g>

      {/* Stair growth arrow — bottom-right (inset) */}
      <g className="ob-fb" style={{ transformOrigin: '252px 192px', animationDelay: '0.5s' }}>
        <polyline
          points="224,214 224,199 240,199 240,184 256,184 256,170 272,170"
          fill="none" stroke={ink} strokeWidth="3.2" strokeLinecap="square"
          strokeDasharray="90" strokeDashoffset="90" className="ob-drw"/>
        <polygon points="276,163 286,176 266,176" fill={ink}/>
      </g>

      {/* Headset — bottom-left (inset) */}
      <g className="ob-fa" style={{ transformOrigin: '34px 190px', animationDelay: '0.7s' }}>
        <path d="M12,188 Q12,168 34,168 Q56,168 56,188"
          fill="none" stroke={ink} strokeWidth="2.4" strokeLinecap="round"/>
        <rect x="9"  y="186" width="9" height="16" rx="4" fill={fi} stroke={ink} strokeWidth="2"/>
        <rect x="50" y="186" width="9" height="16" rx="4" fill={fi} stroke={ink} strokeWidth="2"/>
        <path d="M11,200 Q6,210 10,216" fill="none" stroke={ink} strokeWidth="2" strokeLinecap="round"/>
        <circle cx="11" cy="218" r="4.5" fill={fi} stroke={ink} strokeWidth="1.8"/>
      </g>
    </svg>
  )
}

/* ══════════════════════════════════════════════════════════════════════════════
   CARD PRESETS — export so consumers can import & spread/override
══════════════════════════════════════════════════════════════════════════════ */
export const OFFER_CARDS = [
  {
    id: 'consultation',
    theme: 'light',
    label: 'Book a Call',
    heading: (
      <>
        Treat your business{' '}
        <em className="font-secondary not-italic">like an asset; </em>
        {' '}<span className="italic">not a checklist</span>
      </>
    ),
    subheading:
      "No proposal after the call. If we're a fit, we'll explain what an engagement looks like and what it produces. If not, we'll tell you.",
    cta: { label: 'Book a Free Brand Audit', variant: 'filled', showArrow: true },
  },

  {
  id: 'resources',
  theme: 'light',
  label: 'Free Resources',
  heading: (
    <>
      Access Frameworks your{' '}
      <em className="font-secondary not-italic text-primary">competitors aren't using.</em>
    </>
  ),
  subheading:
    'Most founders wing it. These assets give you the exact positioning, pricing, and brand frameworks we use with every client; all provided for you free of charge!',
  cta: { label: 'Grab the Free Frameworks', variant: 'filled', showArrow: true },
},
]

const ILLUSTRATIONS = {
  resources:    SVGResources,
  consultation: SVGConsultation,
}

/* ══════════════════════════════════════════════════════════════════════════════
   OfferBanner
   Props
   ─────
   card   Card object. Defaults to OFFER_CARDS[0] (resources).
          Pass OFFER_CARDS[1] or any custom object to switch.

   Examples
   ────────
   // Default (resources):
   <OfferBanner />

   // Consultation card:
   <OfferBanner card={OFFER_CARDS[1]} />

   // Resources card, no CTA button:
   <OfferBanner card={{ ...OFFER_CARDS[0], cta: undefined }} />

   // Toggle from parent:
   const [active, setActive] = useState(OFFER_CARDS[0])
   <button onClick={() => setActive(OFFER_CARDS[1])}>Switch</button>
   <OfferBanner card={active} />
══════════════════════════════════════════════════════════════════════════════ */
export default function OfferBanner({ card = OFFER_CARDS[0] }) {
  const isLight = card.theme !== 'dark'
  const bgOffer      = isLight ? SAND : P
  const ink     = isLight ? P    : PLL
  const Illus   = ILLUSTRATIONS[card.id] ?? SVGResources
  const ContourBg = CONTOURS[OFFER_CARDS.indexOf(card)]

  return (
    <div className="px-8 md:px-12 lg:px-20 xl:px-44 2xl:px-56 mt-6 sm:mt-10">
      <style>{STYLES}</style>

      <div
        key={card.id}
        className={`ob-in rounded-xl flex flex-col sm:flex-row items-stretch border border-border bg-bg`}
       >

        {/* Text */}
        <div className="flex flex-col justify-center gap-5 md:gap-8 p-8 sm:p-10 md:p-12 xl:p-14 flex-1 min-w-0 order-2 md:order-1">

          <h2
            className="text-[26px] sm:text-[44px] font-primary font-normal leading-tight tracking-tight select-none"
            style={{ color: ink, maxWidth: '20ch' }}>
            {card.heading}
          </h2>

          <p
            className="text-[14px] sm:text-[16px] text-text max-w-md font-primary font-normal text-justify leading-5 select-none"
            style={{maxWidth: '48ch' }}>
            {card.subheading}
          </p>

          {card.cta && (
            <div className="mt-2">
              <CTAButton
                variant={card.cta.variant ?? (isLight ? 'filled' : 'outline')}
                showArrow={card.cta.showArrow ?? true}
                onClick={card.cta.onClick} radius={12}>
                {card.cta.label}
              </CTAButton>
            </div>
          )}
          <div className="absolute inset-0" style={{ zIndex: 0 }}>
            <ContourBg />
          </div>
        </div>

        {/* Illustration — padding ensures floats never touch card edge */}
        {/* <div
          className="
            w-full sm:w-65 md:w-75 lg:w-85 xl:w-95
            shrink-0 items-center justify-center
            p-10 sm:pl-2 sm:pr-10 sm:py-10 order-1 md:order-2
          "
          style={{ minHeight: 240 }}>
          <Illus dark={!isLight} />
        </div> */}
      </div>
    </div>
  )
}