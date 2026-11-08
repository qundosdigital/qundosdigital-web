import React, { useState, useRef, useCallback, memo, useEffect } from 'react'
import { ArrowLeftIcon, ArrowRightIcon, CheckBadgeIcon } from '@heroicons/react/20/solid'
import { AnimatePresence, motion, useMotionValue, animate } from 'framer-motion'
import CTAButton from '../CTAButton'

// ── Data ──────────────────────────────────────────────────────────────────────
const TABS = ['Bundled Offers', 'Branding', 'Websites']
const INK = '#0E513C'

// ── Micrographic contour patterns ─────────────────────────────────────────────
const P_SVG = { viewBox:'0 0 320 520', preserveAspectRatio:'xMidYMid slice',
  xmlns:'http://www.w3.org/2000/svg', 'aria-hidden':'true',
  style:{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none' } }

function MicroLeft() {
  const dots = []
  const colSpacing = 20, rowSpacing = 18
  const cols = Math.ceil(320 / colSpacing) + 1
  const rows = Math.ceil(520 / rowSpacing) + 1
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = c * colSpacing + (r % 2 === 1 ? colSpacing / 2 : 0)
      const y = r * rowSpacing
      dots.push({ x, y })
    }
  }
  return (
    <svg {...P_SVG}>
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r="0.85" fill={INK} opacity="0.1"/>
      ))}
    </svg>
  )
}

function MicroMiddle() {
  return (
    <svg {...P_SVG}>
      {[22, 44, 68, 94, 122, 152, 184, 218, 254, 292].map((rx, i) => (
        <ellipse key={i} cx="160" cy="260"
          rx={rx} ry={rx * 0.75}
          fill="none" stroke={INK} strokeWidth="0.5" opacity="0.1"/>
      ))}
    </svg>
  )
}

function MicroRight() {
  const lines = []
  for (let i = -6; i <= 22; i++) {
    const x0 = i * 24
    lines.push([x0, 0, x0 + 370, 520])
  }
  return (
    <svg {...P_SVG}>
      {lines.map(([x1,y1,x2,y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke={INK} strokeWidth="0.5" opacity="0.1"/>
      ))}
    </svg>
  )
}

const CARD_CONTOURS = [MicroLeft, MicroMiddle, MicroRight]

// ── Plans data ────────────────────────────────────────────────────────────────
const PLANS = {
  'Branding': [
    {
      id: 'b1', badge: 'Visual Foundation', bestSeller: false, price: '$800',
      spotsLeft: 5,
      description: "Solo operators, early-age startups, and businesses that need a visual foundation.",
      cta: 'Apply Now', ctaFilled: true, ctaLink: '/visualfoundation',
      includesLabel: 'What this includes:',
      features: ['Primary + Secondary Logo','Two Variations of each Logo','Core Color Scheme','Font Pairings + Hierarchy','A logo-based brand Pattern'],
    },
    {
      id: 'b2', badge: 'Brand Identity', bestSeller: true, price: '$1,800',
      originalPrice: '$2,000', discountPct: 10, spotsLeft: 5,
      description: "Growing businesses that want to operate consistently across every touchpoint.",
      cta: 'Apply Now', ctaFilled: true, ctaLink: '/brandidentity',
      includesLabel: 'Everything in Visual Foundation plus:',
      features: ['Logo Guidelines','Full Color System','Full Typography System','Imagery Direction + Mockups','Brand Strategy Foundation'],
    },
    {
      id: 'b3', badge: 'Full Brand Guideline', bestSeller: false, price: '$4,000',
      spotsLeft: 5,
      description: "Established businesses that need a brand system for their team, investors, partners.",
      cta: 'Apply Now', ctaFilled: true, ctaLink: '/fullbranding',
      includesLabel: 'Everything in Brand Identity plus:',
      features: ['Complete Brand Strategy','Editorial Guideline','Templates (Stationary, Blogs, Social)','Marketing Collateral Templates','Comprehensive Document'],
    },
  ],
  'Bundled Offers': [
    {
      id:'c1', badge:'Digital Presence', bestSeller:false, price:'$4,050',
      originalPrice: '$5,400', discountPct: 25, spotsLeft: 5,
      description:'For founders launching for the first time who need a brand & website as one system.',
      cta:'Apply Now', ctaFilled:true, ctaLink: '/digitalpresence-bundle',
      includesLabel:'What this includes:',
      features:['Visual Foundation [Branding] package','Marketing System [Websites] package','In-depth brand direction session','A brand-to-web handoff document','15 days post-launch support'],
    },
    {
      id:'c2', badge:'Authority+', bestSeller:true, price:'$6,970',
      originalPrice: '$8,200', discountPct: 15, spotsLeft: 5,
      description:'For growing businesses losing deals to competitors who look more established.',
      cta:'Apply Now', ctaFilled:true, ctaLink: '/authorityplus-bundle',
      includesLabel:'What this includes:',
      features:['Full Brand Guideline [Branding]','Marketing System [Websites] package','In-depth brand direction session','A brand-to-web handoff document','30 days post-launch support'],
    },
    {
      id:'c3', badge:'Total Infrastructure', bestSeller:false, price:'$9,000', starting:true,
      spotsLeft: 5,
      description:'For founders preparing for their next stage — scaling, hiring, raising.',
      cta:'Contact Us', ctaFilled:true, ctaLink: '/totalinfastructure-bundle',
      includesLabel:'A custom solution that includes:',
      features:['Full Brand Guideline [Branding]','A custom digital platform & system','Role-based access & dashboards','Milestone-based delivery','60 days post-launch support'],
    },
  ],
  'Websites': [
    {
      id:'w1', badge:'Marketing System', bestSeller:true, price:'$3,240',
      originalPrice: '$4,800', discountPct: 33, spotsLeft: 5,
      description:'Service businesses, consultants, & local brands that need quality qualified leads.',
      cta:'Apply Now', ctaFilled:true, ctaLink: '/marketingsystem',
      includesLabel:'What this includes:',
      features:['5-page landing site + UX/UI','Full Content Management System','PACT-M Lead pre-qualification system','Lead management dashboard','Mobile responsive with SEO setup'],
    },
    {
      id:'w2', badge:'Item & Order Commerce', bestSeller:false, price:'$5,000',
      originalPrice: '$6,500', discountPct: 77, spotsLeft: 5,
      description:'Restaurants, retail shops, and e-commerce operators who manage products & orders.',
      cta:'Apply Now', ctaFilled:true, ctaLink: '/itemandordercommerce',
      includesLabel:'What this includes:',
      features:['Customer-facing storefront or menu','Item management panel','Order management system','Stock and inventory tracking','Pricing system & controls'],
    },
    {
      id:'w3', badge:'Custom Internal System', bestSeller:false, price:'$6,500', starting:true,
      spotsLeft: 5,
      description:'Companies that have internal operational needs - Logistics, HR, tracking, etc...',
      cta:'Contact Us', ctaFilled:true, ctaLink: '/custominternalsystem',
      includesLabel:'A custom solution that includes:',
      features:['Scoping & requirements workshop','Custom-built system workflow','Role-based access control','Reporting, logs, and data export','Training & written documentation'],
    },
  ],
}

const N_CARDS = 3
const CARD_GAP = 16
const SPRING   = { type: 'spring', stiffness: 320, damping: 32, mass: 0.9 }

const DESK_STAGGER = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
}
const DESK_CARD = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0,   transition: { duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit:   { opacity: 0, y: -10, transition: { duration: 0.18, ease: 'easeIn' } },
}

const MOB_STAGGER_ACTIVE   = { transition: { staggerChildren: 0.07, delayChildren: 0.05 } }
const MOB_STAGGER_INACTIVE = {}
const MOB_ITEM = {
  hidden: { opacity: 0, y: 12 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.34, ease: [0.25, 0.46, 0.45, 0.94] } },
  hide:   { opacity: 0, y: -6, transition: { duration: 0.16, ease: 'easeIn' } },
}

// ── Spots left indicator ──────────────────────────────────────────────────────
// Returns urgency color + label based on remaining spots
function spotsConfig(n) {
  if (n === 1) return { color: '#DC2626', bg: 'bg-red-50',   border: 'border-red-200',   text: 'text-red-600',   label: 'Last spot' }
  if (n === 2) return { color: '#EA580C', bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-600', label: `${n} spots left` }
  if (n <= 3)  return { color: '#D97706', bg: 'bg-amber-50',  border: 'border-amber-200',  text: 'text-amber-600',  label: `${n} spots left` }
  return              { color: INK,       bg: 'bg-subPrimary/10', border: 'border-primary/20', text: 'text-primary',   label: `${n} spots left` }
}

// ── Sub-components ────────────────────────────────────────────────────────────
const Badge = memo(({ label, filled }) => (
  <span className={`text-[12px] font-primary font-medium px-3 py-1 rounded-full border select-none
    ${filled
      ? 'bg-primary text-bg border-primary italic font-semibold rounded-lg'
      : 'text-primary border-primary bg-subPrimary/10 font-semibold'}`}>
    <div className="flex gap-1 items-center">
      {filled && <CheckBadgeIcon className='h-3 w-3'/>}
      {label}
    </div>
  </span>
))

// Discount pill — shown beside the live price
const DiscountBadge = memo(({ pct }) => (
  <span className="inline-flex items-center gap-0.5 text-[12px] sm:text-[13px] font-secondary px-2 py-0.5 rounded-sm bg-red-50 text-red-600 select-none tracking-wide">
    -{pct}%
  </span>
))

// Spots remaining strip
const SpotsBar = memo(({ n }) => {
  const cfg = spotsConfig(n)
  const MAX = 5
  const filled = Math.min(n, MAX)

  return (
    <div className={`flex items-center gap-2.5 px-2.5 py-1 rounded-lg ${cfg.bg} w-fit`}>
      {/* pip row */}
      <div className="flex items-center gap-[3px]">
        {Array.from({ length: MAX }).map((_, i) => (
          <span
            key={i}
            className="block w-[6px] h-[6px] rounded-full transition-all duration-300"
            style={{ backgroundColor: cfg.color, opacity: i < filled ? 1 : 0.25 }}
          />
        ))}
      </div>
      <span className={`text-[12px] font-primary font-bold tracking-tight ${cfg.text} select-none whitespace-nowrap`}>
        {cfg.label}
      </span>
    </div>
  )
})

// Price block — current price + discount badge + slashed original + spots
const PriceBlock = memo(({ plan, isMobile }) => {
  const hasOffer = plan.originalPrice && plan.discountPct

  return (
    <div className="flex flex-col gap-3">
      {/* Row 1: live price + discount badge */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-baseline gap-2.5 flex-wrap">
          {plan.starting && <span className={`${isMobile ? 'text-[12px]' : 'text-[13px]'} text-primary font-semibold select-none`}>starting</span>}
          <span className={`${isMobile ? 'text-[38px]' : 'text-[38px] sm:text-[42px]'} font-extrabold text-primary leading-none select-none`}>
            {plan.price}
          </span>
          <span className={`${isMobile ? 'text-[18px]' : 'text-[20px]'} text-primary font-semibold select-none`}>USD</span>
        </div>
        {hasOffer && <DiscountBadge pct={plan.discountPct}/>}
      </div>

      {/* Row 2: slashed original price */}
      <div className="flex items-baseline gap-5">
        {hasOffer && (
          <div className="flex items-center gap-1">
            <span className="text-[12px] text-text opacity-40 select-none font-primary font-semibold sm:hidden">
              was
            </span>
            <span className="text-[13px] text-text opacity-40 line-through select-none font-primary font-semibold">
              {plan.originalPrice}
            </span>
            <span className="text-[12px] text-text opacity-40 select-none font-primary font-semibold hidden sm:flex">
              was the rate
            </span>
          </div>
        )}
        {/* Row 3: spots left */}
        {plan.spotsLeft != null && (
            <SpotsBar n={plan.spotsLeft}/>
        )}
      </div>

    </div>
  )
})

const PlanCard = memo(({ plan, isActive, isMobile, planIdx }) => {
  const state = isActive ? 'show' : 'hide'
  const Contour = CARD_CONTOURS[planIdx]

  const inner = (
    <>
      <div className="absolute inset-0 rounded-xl overflow-hidden" style={{ zIndex: 0 }}>
        <Contour/>
      </div>
      <div className="relative flex flex-col gap-5 h-full" style={{ zIndex: 1 }}>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 flex-wrap mb-5">
            <Badge label={plan.badge} filled={false}/>
            {plan.bestSeller && <Badge label="Best Seller" filled={true}/>}
          </div>

          {/* Updated price block */}
          <PriceBlock plan={plan} isMobile={false}/>

          <p className="text-[13px] sm:text-[16px] text-text opacity-95 leading-relaxed text-justify select-none">
            {plan.description}
          </p>
        </div>
        <div className="flex flex-col gap-4 mb-6">
          <p className="text-[14px] text-text opacity-60 font-normal select-none italic">{plan.includesLabel}</p>
          <ul className="flex flex-col gap-2">
            {plan.features.map((f, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckBadgeIcon className="w-4 h-4 text-primary shrink-0 mt-0.5"/>
                <span className="text-[15px] text-text opacity-95 select-none italic">{f}</span>
              </li>
            ))}
          </ul>
        </div>
        <CTAButton variant={plan.ctaFilled ? 'filled' : 'outlined'} showArrow={plan.ctaFilled} radius={12} link={plan.ctaLink}>
          <p className="font-primary font-semibold leading-6">{plan.cta}</p>
        </CTAButton>
      </div>
    </>
  )

  if (!isMobile) {
    return (
      <div className="relative border border-border rounded-xl p-5 sm:p-10 flex flex-col gap-10 h-full bg-bg font-primary overflow-hidden">
        {inner}
      </div>
    )
  }

  return (
    <div className="relative border border-border rounded-xl p-6 flex flex-col gap-4 h-full bg-bg font-primary overflow-hidden">
      <div className="absolute inset-0 rounded-xl overflow-hidden" style={{ zIndex: 0 }}>
        <Contour/>
      </div>
      <div className="relative" style={{ zIndex: 1 }}>
        <motion.div
          animate={isActive ? MOB_STAGGER_ACTIVE : MOB_STAGGER_INACTIVE}
          className="flex flex-col gap-4 h-full"
        >
          <div className="flex flex-col gap-5">
            <motion.div variants={MOB_ITEM} animate={state} initial="hidden"
              className="flex items-center gap-2 flex-wrap">
              <Badge label={plan.badge} filled={false}/>
              {plan.bestSeller && <Badge label="Best Seller" filled={true}/>}
            </motion.div>

            {/* Mobile price block */}
            <motion.div variants={MOB_ITEM} animate={state} initial="hidden">
              <PriceBlock plan={plan} isMobile={true}/>
            </motion.div>

            <motion.p variants={MOB_ITEM} animate={state} initial="hidden"
              className="text-[13px] sm:text-[16px] text-text leading-relaxed text-justify select-none">
              {plan.description}
            </motion.p>
          </div>
          <motion.div variants={MOB_ITEM} animate={state} initial="hidden"
            className="flex flex-col gap-3 mb-2">
            <p className="text-[13px] text-text opacity-60 font-normal select-none italic">{plan.includesLabel}</p>
            <ul className="flex flex-col gap-2">
              {plan.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckBadgeIcon className="w-4 h-4 text-primary shrink-0 mt-0.5"/>
                  <span className="text-[14px] text-text select-none italic">{f}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          <CTAButton variant={plan.ctaFilled ? 'filled' : 'outlined'} showArrow={plan.ctaFilled} radius={12} link={plan.ctaLink}>
            <p className="font-primary font-semibold leading-6">{plan.cta}</p>
          </CTAButton>
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
export default function PricingSection() {
  const [activeTab, setActiveTab] = useState(TABS[0])
  const plans = PLANS[activeTab]

  const containerRef = useRef(null)
  const x            = useMotionValue(0)
  const [mobIdx, setMobIdx] = useState(0)

  const snapX = useCallback((idx) => {
    const w = containerRef.current?.clientWidth ?? 0
    return -(idx * (w + CARD_GAP))
  }, [])

  const snapTo = useCallback((idx) => {
    const clamped = Math.max(0, Math.min(N_CARDS - 1, idx))
    animate(x, snapX(clamped), SPRING)
    setMobIdx(clamped)
  }, [x, snapX])

  useEffect(() => {
    setMobIdx(0)
    x.set(0)
  }, [activeTab, x])

  useEffect(() => {
    const ro = new ResizeObserver(() => x.set(snapX(mobIdx)))
    if (containerRef.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [mobIdx, x, snapX])

  const handleDragEnd = useCallback((_, info) => {
    const w = containerRef.current?.clientWidth ?? 0
    if      (info.offset.x < -(w * 0.2)) snapTo(mobIdx + 1)
    else if (info.offset.x >  (w * 0.2)) snapTo(mobIdx - 1)
    else                                  snapTo(mobIdx)
  }, [mobIdx, snapTo])

  return (
    <section className="w-full px-8 md:px-12 lg:px-20 xl:px-44 2xl:px-56 pt-8 sm:pt-12 bg-bg">

      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 md:gap-16 mb-6 md:mb-10">
        <div className="flex flex-col gap-5 shrink-0">
          <div className="border border-primary px-3 py-0.5 w-min rounded-full">
            <p className="text-[12px] sm:text-[13px] text-primary font-primary font-semibold italic w-max select-none">Here's what we offer</p>
          </div>
          <h2 className="text-[25px] sm:text-[36px] font-primary font-normal text-text leading-[32.5px] sm:leading-11 tracking-tight select-none">
            <span className="italic font-semibold">Every Option </span>
            <span className="italic font-medium">Has Been </span>
            <br/>
            <span className="font-secondary text-primary">Built </span>
            <span className="font-secondary text-primary">to </span>
            <em className="font-secondary not-italic">Pay For Itself</em>
          </h2>
        </div>
        <p className="text-[14px] sm:text-[16px] font-primary text-text leading-6 text-justify md:max-w-lg md:pt-12 select-none">
          Pick exactly what your business needs to generate revenue right now, or bundle branding and web into one system and save up to 25%.
        </p>
      </div>

      {/* ── Tabs row ── */}
      <div className="flex items-center justify-between mb-5 md:mb-8 gap-4">
        <div className="flex items-center gap-2.5 md:gap-4 overflow-x-auto pb-0.5" style={{ scrollbarWidth: 'none' }}>
          {TABS.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`shrink-0 text-[12px] md:text-[14px] font-medium px-3 py-1.5 rounded-full border transition-colors select-none cursor-pointer italic
                ${activeTab === tab
                  ? 'bg-subPrimary/40 text-primary border-primary'
                  : 'bg-transparent text-text border-border hover:border-primary hover:text-primary'}`}>
              {tab}
            </button>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-2 shrink-0">
          <NavButton onClick={() => setActiveTab(TABS[(TABS.indexOf(activeTab) - 1 + TABS.length) % TABS.length])} label="Previous">
            <ArrowLeftIcon className="w-4 h-4"/>
          </NavButton>
          <NavButton onClick={() => setActiveTab(TABS[(TABS.indexOf(activeTab) + 1) % TABS.length])} label="Next">
            <ArrowRightIcon className="w-4 h-4"/>
          </NavButton>
        </div>
      </div>

      {/* ══ DESKTOP ══════════════════════════════════════════════════════════ */}
      <div className="hidden md:block">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={DESK_STAGGER}
            initial="hidden"
            animate="show"
            exit="exit"
            className="grid grid-cols-3 gap-5 sm:gap-8 md:gap-4 2xl:gap-10 items-stretch"
          >
            {plans.map((plan, i) => (
              <motion.div key={plan.id} variants={DESK_CARD}>
                <PlanCard plan={plan} isActive isMobile={false} planIdx={i}/>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ══ MOBILE ═══════════════════════════════════════════════════════════ */}
      <div ref={containerRef} className="md:hidden overflow-hidden">
        <motion.div
          drag="x"
          dragConstraints={{ left: snapX(N_CARDS - 1), right: 0 }}
          dragElastic={0.08}
          dragMomentum={false}
          onDragEnd={handleDragEnd}
          style={{
            x,
            display: 'flex',
            alignItems: 'stretch',
            gap: CARD_GAP,
            width: `calc(${N_CARDS * 100}% + ${(N_CARDS - 1) * CARD_GAP}px)`,
            willChange: 'transform',
            touchAction: 'pan-y',
            cursor: 'grab',
          }}
        >
          {plans.map((plan, i) => (
            <div key={plan.id}
              style={{ flex: `0 0 calc(${100 / N_CARDS}% - ${((N_CARDS - 1) * CARD_GAP) / N_CARDS}px)` }}>
              <PlanCard plan={plan} isActive={i === mobIdx} isMobile planIdx={i}/>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ══ BOTTOM NAV ═══════════════════════════════════════════════════════ */}
      <div className="md:hidden flex items-center mt-6 gap-3">
        <div className="flex items-center w-full gap-2 shrink-0">
          <NavButton onClick={() => snapTo(mobIdx - 1)} label="Previous">
            <ArrowLeftIcon className={`w-4 h-4 opacity-40 ${mobIdx > 0 && 'text-primary opacity-100'}`}/>
          </NavButton>
          <NavButton onClick={() => snapTo(mobIdx + 1)} label="Next">
            <ArrowRightIcon className={`w-4 h-4 opacity-40 ${mobIdx < N_CARDS - 1 && 'text-primary opacity-100'}`}/>
          </NavButton>
          <div className="flex-4 h-px w-full bg-border"/>
          <div className="flex w-max items-center gap-1.5">
            {plans.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => snapTo(i)}
                aria-label={`Card ${i + 1}`}
                animate={{ width: i === mobIdx ? 20 : 6, opacity: i === mobIdx ? 1 : 0.3 }}
                transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                className="h-1.5 rounded-full bg-primary"
                style={{ minWidth: 6 }}
              />
            ))}
          </div>
          <div className="flex-1 flex justify-start w-max ml-2">
            <span className="text-[11px] w-max font-primary text-text opacity-50 select-none tabular-nums">
              {mobIdx + 1} / {N_CARDS}
            </span>
          </div>
        </div>
      </div>

      <div className="hidden md:flex items-center mt-8 gap-4">
        <span className="font-primary font-medium text-[13px] sm:text-[15px] text-text/60 w-full max-w-[500px]  italic">We take on a limited number of projects each month to protect quality and delivery time — the spots you see are what's genuinely available right now.</span>
        <div className="flex-1 h-px bg-border"/>
        {/* <CTAButton variant="filled" showArrow={true} radius={12} link='/letstalk'>Let's Talk</CTAButton> */}
      </div>

    </section>
  )
}