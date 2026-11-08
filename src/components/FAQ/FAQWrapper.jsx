import { memo, useState, useEffect, useCallback, useRef } from "react"
import { MinusIcon, PlusIcon, ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/20/solid"
import { motion } from "framer-motion"
import CTAButton from "../CTAButton"
import { QuestionMarkCircleIcon } from "@heroicons/react/20/solid"

const NavButton = memo(({ onClick, label, children }) => (
  <button onClick={onClick} aria-label={label}
    className="w-10 h-10 cursor-pointer rounded-full border border-border flex items-center justify-center text-text hover:bg-primary hover:text-bg hover:border-primary transition-colors">
    {children}
  </button>
))

const FAQ_DATA = {
  "General FAQs": [
    { q: "What's included in every project?", a: "Every project starts with a strategy call, goes through a structured design and build phase, and ends with a handoff session where we walk you through everything. You get source files, a 30-day support window, and documentation." },
    { q: "How long does a typical project take?", a: "A branding project runs 2–3 weeks. A website is 3–5 weeks. A mobile app is 6–10 weeks. If you're bundling services, timelines overlap — so a full Digital Presence Bundle (brand + web + app) usually lands in 8–12 weeks." },
    { q: "Do I need to prepare anything before we start?", a: "We'll send you a short intake form after the first call. It covers your audience, competitors, and goals. You don't need to have designs or copy ready — that's what we're here for." },
    { q: "Can I see examples of your work before committing?", a: "Yes — our Work page has full case studies for each service type. You can also request a curated portfolio for your specific industry in the Let's Talk form." },
    { q: "Do you work with businesses outside Lebanon?", a: "Yes. Most of our clients are remote. We work across Europe, the Gulf, and North America. All communication happens over video calls and async channels — no office visits required." },
    { q: "What happens after the project is delivered?", a: "You get a 30-day support window for fixes and minor adjustments. After that, we offer retainer packages for ongoing updates, content changes, and performance monitoring." },
  ],
  Bundles: [
    { q: "What is the Digital Presence Bundle?", a: "It's our flagship package — brand identity, website, and mobile app delivered together. Because they're built as a system, everything is visually and functionally coherent. You also pay less than booking each service separately." },
    { q: "Can I add a service to a bundle after it starts?", a: "Yes, within the first week. After that, additions create scope creep that delays delivery. We'd rather scope everything upfront and do it properly." },
    { q: "Is there a bundle for just brand and website — without the app?", a: "Yes. The Brand + Web package covers identity and a conversion-focused site. It's the right choice if you don't need a mobile app yet but want a coherent brand from day one." },
    { q: "How do bundles compare in price to individual services?", a: "Bundles are priced at roughly 15–20% below the sum of individual services. The saving reflects shared research, shared design system, and less back-and-forth across separate briefs." },
    { q: "What if I only want one service?", a: "That's fine. All services are available standalone — branding, websites, and apps can each be scoped independently. Bundles are an option, not a requirement." },
  ],
  Branding: [
    { q: "What does a branding project actually produce?", a: "You get a logo suite (primary, secondary, icon variants), a colour palette with usage rules, typography selection, brand voice guidelines, and a pattern or texture asset. Everything is delivered as a Figma file plus export-ready files." },
    { q: "Do you do brand strategy, or just the visual identity?", a: "Both. We open with a positioning session — who you're for, what you stand for, what you're not. The visual identity is built on that foundation, not in spite of it." },
    { q: "Can I keep my existing logo and just refresh the rest?", a: "Yes. A brand refresh can work around an existing mark if there's equity in it. We'll audit what's worth keeping and what's holding you back." },
    { q: "Will I own the final files?", a: "Completely. Source Figma files, all export formats (SVG, PNG, PDF), and full usage rights transfer to you at handoff. No licensing, no ongoing fees." },
    { q: "How many rounds of revisions are included?", a: "Two structured revision rounds after the initial concept presentation. Additional rounds are available at a flat hourly rate if needed — though in practice, most projects land in two." },
  ],
  Websites: [
    { q: "What platform do you build on?", a: "Most sites are built on Webflow for content-managed pages, or custom React/Next.js for product-led or app-adjacent sites. We recommend the right stack based on your team's technical comfort and update frequency." },
    { q: "Is SEO included?", a: "Technical SEO is built in by default — proper heading structure, meta setup, sitemap, canonical tags, and Core Web Vitals-conscious build. Content SEO (keyword strategy, ongoing optimisation) is a separate retainer." },
    { q: "Do you write the copy?", a: "Copywriting is available as an add-on. If you have copy, we'll work with it and flag anything that's likely to hurt conversion. If you don't, we'll produce conversion-focused copy as part of the project." },
    { q: "What if I need e-commerce functionality?", a: "We build on Webflow Commerce for simpler stores, and recommend Shopify for high-volume retail. Complex custom checkout flows are scoped case-by-case." },
    { q: "Will I be able to update the site myself?", a: "Yes. Every site is built with a CMS layer for pages, blog posts, team members, and any repeating content. We include a handoff session and a short video walkthrough so you're not dependent on us for day-to-day changes." },
    { q: "Do you offer hosting?", a: "We set up hosting on Vercel, Netlify, or Webflow's own hosting depending on the stack. Domain connection and DNS configuration are included. Hosting costs are paid directly by you to the provider — we don't mark them up." },
  ],
}

const CATEGORIES = Object.keys(FAQ_DATA)

const SectionPill = ({ children }) => (
  <div className="w-min rounded-full">
    <p className="text-[13px] sm:text-[14px] text-text font-secondary w-max select-none">{children}</p>
  </div>
)

// Accordion body uses CSS grid-template-rows trick:
// grid-rows 0fr → 1fr is GPU-composited — no JS height measurement,
// no ResizeObserver, no Framer Motion layout reflow per frame.
const FAQItem = memo(({ faq, index, isOpen, onToggle }) => (
  <div className={`border rounded-xl overflow-hidden transition-colors duration-300 bg-bg ${isOpen ? "border-border" : "border-border/60"}`}>
    <button
      onClick={onToggle}
      className="w-full flex items-start justify-between gap-4 px-5 py-4 sm:py-5 text-left group cursor-pointer"
      aria-expanded={isOpen}
    >
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <span className="text-[12px] font-secondary text-primary/80 tabular-nums shrink-0">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className={`text-[14px] sm:text-[15px] font-semibold leading-snug transition-colors duration-200 select-none font-primary
          ${isOpen ? 'text-primary' : 'text-text'}`}>
          {faq.q}
        </span>
      </div>
      <span className={`shrink-0 w-6 h-6 rounded-full border flex items-center justify-center mt-0.5 transition-all duration-300 ${isOpen ? "border-primary text-primary" : "border-border text-text/50 group-hover:border-primary group-hover:text-primary"}`}>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex items-center justify-center w-full h-full"
        >
          {isOpen ? <MinusIcon className="w-3 h-3" /> : <PlusIcon className="w-3 h-3" />}
        </motion.span>
      </span>
    </button>

    {/* Outer div drives the height via grid-template-rows — no JS, no reflow */}
    <div
      style={{
        display: "grid",
        gridTemplateRows: isOpen ? "1fr" : "0fr",
        transition: "grid-template-rows 0.18s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }}
    >
      {/* overflow:hidden on inner collapses the 0fr row cleanly */}
      <div
        style={{ overflow: "hidden" }}
        className={`transition-opacity ${isOpen ? "opacity-100 duration-200 delay-75" : "opacity-0 duration-100"}`}
      >
        <div className="px-5 pb-5 ">
          <div className="bg-subPrimary/20 p-4 rounded-md">
            <p className="text-[13px] sm:text-[14px] text-text font-primary font-medium leading-relaxed text-justify select-none">
              {faq.a}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
))

export default function FAQWrapper() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0])
  const [openIdx, setOpenIdx] = useState(0)
  const [isStuck, setIsStuck] = useState(false)
  const sentinelRef = useRef(null)

  const faqs = FAQ_DATA[activeCategory]

   const switchCategory = useCallback((cat) => {
    setActiveCategory(cat)
    setTimeout(() => {
        if (!sentinelRef.current) return
        const top = sentinelRef.current.getBoundingClientRect().top + window.scrollY - 125 // ← adjust offset
        window.scrollTo({ top, behavior: 'smooth' })
    }, 0)
    setOpenIdx(null)
    }, [])

  const toggle = useCallback((i) => setOpenIdx((prev) => (prev === i ? null : i)), [])

  const prev = useCallback(() =>
    setActiveCategory((cur) => {
      const next = CATEGORIES[(CATEGORIES.indexOf(cur) - 1 + CATEGORIES.length) % CATEGORIES.length]
      setOpenIdx(null)
      return next
    }), [])

  const next = useCallback(() =>
    setActiveCategory((cur) => {
      const next = CATEGORIES[(CATEGORIES.indexOf(cur) + 1) % CATEGORIES.length]
      setOpenIdx(null)
      return next
    }), [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsStuck(!entry.isIntersecting),
      { threshold: 0 }
    )
    if (sentinelRef.current) observer.observe(sentinelRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="flex flex-col items-stretch w-full bg-bg pt-8 sm:pt-12 lg:pt-20">
      <div className="px-8 md:px-12 lg:px-20 xl:px-44 2xl:px-56 pb-1 sm:pb-4 flex justify-between items-center">
        <SectionPill>Choose a Category:</SectionPill>
        <span className="text-[12px] font-primary font-bold text-primary bg-bg border border-primary/80 rounded-md px-2.5 py-0.5 tabular-nums select-none">
            {String(faqs.length).padStart(2, "0")} questions
        </span>
      </div>

      <div ref={sentinelRef} className="h-px" />

      <div className={`px-8 md:px-12 lg:px-20 xl:px-44 2xl:px-56 sticky top-18 flex items-start justify-between gap-4 w-full bg-bg py-4 z-40 transition-colors 
        ${isStuck ? "border-b border-border" : "border-b border-transparent"}`}>
        <div className="flex items-center gap-2.5 md:gap-4 overflow-x-auto pb-0.5" style={{ scrollbarWidth: "none" }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => switchCategory(cat)}
              className={`shrink-0 text-[12px] md:text-[13px] font-medium px-3 py-1.5 rounded-full border transition-colors select-none cursor-pointer italic ${activeCategory === cat ? "bg-subPrimary/40 text-primary border-primary" : "bg-transparent text-text border-border hover:border-primary hover:text-primary"}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="hidden sm:flex items-center gap-2 shrink-0">
          <NavButton onClick={prev} label="Previous category">
            <ArrowLeftIcon className="w-4 h-4" />
          </NavButton>
          <NavButton onClick={next} label="Next category">
            <ArrowRightIcon className="w-4 h-4" />
          </NavButton>
        </div>
      </div>

      <div className="px-8 md:px-12 lg:px-20 xl:px-44 2xl:px-56 pt-1 sm:pt-4">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col gap-3 sm:gap-4"
        >
          {faqs.map((faq, i) => (
            <FAQItem
              key={`${activeCategory}-${i}`}
              faq={faq}
              index={i}
              isOpen={openIdx === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </motion.div>
      <div className="flex items-center mt-5 sm:mt-8 gap-4">
        <div className="flex-1 h-px bg-border"/>
        <CTAButton variant='outlined' link='/sendinquiry'>
            <div className="flex w-max items-center justify-center gap-2">
                <QuestionMarkCircleIcon className="w-4 h-4" />
                Send Inquiry
            </div>
        </CTAButton>
      </div>
      </div>
    </div>
  )
}