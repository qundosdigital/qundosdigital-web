import { memo, useState, useEffect, useRef } from "react"
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/20/solid"
import CaseStudyPage from "./CaseStudy"
import { aliselectronic, beesservice, client_images, faroujFadel, huntersTarget, kroumtec, trusted_by } from "../../assets/assets"
import { pattern } from "framer-motion/client"
import { AnimatePresence, motion } from "framer-motion"

const beesserviceV = {
  title: "Bees Service",

  quote: {
    author: "Ahmad Nazir",
    role:   "Owner of DarkBey Media",
    rating: 5.0,
    tags:   ["Digital Presence Bundle"],
    text:   "Working with this team transformed our online presence completely. The results speak for themselves — our engagement tripled within the first month.",
    photo:  "https://picsum.photos/seed/client2/400/500",
  },

  brand: {
    pattern: beesservice.b6,
    colors: [
      { hex: "#f3b41b", name: "Yellowbe",    role: "Primary",   percentage: 70 },
      { hex: "#18818c", name: "Teal Cyan", role: "Secondary", percentage: 10 },
      { hex: "#1f2b44", name: "Deep Navy", role: "Neutral",  percentage: 20 },
    ],
    fonts: [
      { name: "Archivo",       role: "Headlines", fontFamily: "font-beesone"},
      { name: "Manrope", role: "Body",    fontFamily: "font-beestwo" },
    ],
  },

  images: {
    mockups: [
      beesservice.b4,
      beesservice.b5,
      beesservice.b3,
      beesservice.b1,
      beesservice.b2
    ],
  },

 /*  web: {
    headlineHtml:(
    <h2 className="text-[25px] sm:text-[36px] font-primary font-normal text-text leading-[32.5px] sm:leading-11 tracking-tight select-none">
        <span className="italic font-semibold">Every Option </span>
        <span className="italic font-medium">Has Been </span>
        <br/>
        <span className="font-secondary text-primary">Built </span>
        <span className="font-secondary text-primary">to </span>
        <em className="font-secondary not-italic">Pay For Itself</em>
    </h2>
    ),
    description: "No brochure pages. No dead ends. One goal per page — get the right person to take the next step.",
    url:         "https://beesservice.com",
    features: [
      { label: "Lead Qualification", description: "Filters the wrong visitors before they reach a call." },
      { label: "Conversion Focused", description: "Single CTA per page. No noise, no distractions."     },
      { label: "Mobile Optimised",   description: "Sub-2s load time on 4G across all pages."            },
    ],
    images: {
      desktop: "https://picsum.photos/seed/desktop/1200/675",
      screens: [
        "https://picsum.photos/seed/screen1/1200/675",
        "https://picsum.photos/seed/screen2/1200/675",
        "https://picsum.photos/seed/screen3/1200/675",
      ],
    },
  }, */

  /* app: {
    headlineHtml:(
    <h2 className="text-[25px] sm:text-[36px] font-primary font-normal text-text leading-[32.5px] sm:leading-11 tracking-tight select-none">
        <span className="italic font-semibold">Every Option </span>
        <span className="italic font-medium">Has Been </span>
        <br/>
        <span className="font-secondary text-primary">Built </span>
        <span className="font-secondary text-primary">to </span>
        <em className="font-secondary not-italic">Pay For Itself</em>
    </h2>
    ),
    description: "Clients book, pay, and confirm without ever picking up the phone. The founder gets notified and that's it.",
    features: [
      { label: "Instant Booking", description: "Client selects, pays, and confirms in under 60 seconds." },
      { label: "Auto Reminders",  description: "Push notifications that cut no-shows by 40%."            },
      { label: "Owner Dashboard", description: "Real-time bookings, earnings, and client history."       },
    ],
    images: {
      screens: [
        "https://picsum.photos/seed/app1/390/844",
        "https://picsum.photos/seed/app2/390/844",
        "https://picsum.photos/seed/app3/390/844",
      ],
    },
  }, */
}

const aliselectronicV = {
  title: "Ali's Electronic",

  quote: {
    author: "Ali Dagher",
    role:   "CEO of Ali's Electronic",
    rating: 4.9,
    tags:   ["Brand Identity", "Item & Order Commerce"],
    text:   "",
    photo:  "https://picsum.photos/seed/client10/400/500",
  },

  brand: {
    pattern: aliselectronic.flag,
    colors: [
      { hex: "#1156A3", name: "Electric Blue",   role: "Primary",   percentage: 60 },
      { hex: "#CC613A", name: "Copper Orange",    role: "Secondary", percentage: 10 },
      { hex: "#152438", name: "Navy Blue",        role: "Neutral",  percentage: 30},
    ],
    fonts: [
      { name: "Exo 2", role: "Headlines", fontFamily: "font-alisone"},
      { name: "Inter",         role: "Body",    fontFamily: "font-alistwo" },
    ],
  },

  images: {
    mockups: [
      aliselectronic.vertical,
      aliselectronic.router,
      aliselectronic.banner,
      aliselectronic.shirt,
      aliselectronic.desk,
      "https://picsum.photos/seed/v3/800/600",
      '',
      '',
      '',
    ],
  },

  /* web: {
    headlineHtml: (
      <h2 className="text-[25px] sm:text-[36px] font-primary font-normal text-text leading-[32.5px] sm:leading-11 tracking-tight select-none">
        <span className="italic font-semibold">Your Storage </span>
        <span className="italic font-medium">Business Needs </span>
        <br />
        <span className="font-secondary text-primary">A Site </span>
        <span className="font-secondary text-primary">That </span>
        <em className="font-secondary not-italic">Closes Deals</em>
      </h2>
    ),
    description: "A site built around one outcome — turning a visitor with a van full of stuff into a paying customer before they open a second tab.",
    url: "https://aliselectronic.com",
   features: [
      { 
        label: "Admin Dashboard & Analytics", 
        description: "Complete control over products, orders, customers, and inventory — plus real‑time sales insights and performance metrics." 
      },
      { 
        label: "AI-Powered Shopping Assistant", 
        description: "Natural language search that understands what you're trying to build or buy — just describe your electronics project, and the AI recommends the exact components or devices you need." 
      },
      { 
        label: "Smart Product Categorization & Browsing", 
        description: "Intelligent category trees, faceted search, and filter‑by‑attribute (size, color, price, brand) so customers find exactly what they want in seconds — no endless scrolling." 
      }
    ],
    images: {
      desktop: "https://picsum.photos/seed/vdesk/1200/675",
      screens: [
        "https://picsum.photos/seed/vs1/1200/675",
        "https://picsum.photos/seed/vs2/1200/675",
        "https://picsum.photos/seed/vs3/1200/675",
      ],
    },
  }, */
}

// ─────────────────────────────────────────────────────────────────────────────

const faroujFadelV = {
  title: "Farouj Fadel",

  quote: {
    author: "Ali Fadel",
    role:   "Founder of Kindred Clinic",
    rating: 5.0,
    tags:   ["Branding", "Web Design", "Mobile App"],
    text:   "Patients tell us the website made them feel safe before they even walked through the door. That trust used to take months to build — now it starts from the first click.",
    photo:  "https://picsum.photos/seed/client20/400/500",
  },

  brand: {
    pattern: faroujFadel.FFfour,
    colors: [
      { hex: "#d51f33", name: "Amaranth Red",  role: "Primary",   percentage: 50 },
      { hex: "#f15a29", name: " Sunset Blaze",       role: "Secondary", percentage: 30 },
      { hex: "#231f20", name: "Rustic Black",   role: "Neutral",  percentage: 20 },
    ],
    fonts: [
      { name: "Lora",  role: "Headlines", fontFamily: "font-fadelone"        },
      { name: "Arimo",      role: "Body",    fontFamily: "font-fadeltwo" },
    ],
  },

  images: {
    mockups: [
      faroujFadel.FFsix,
      faroujFadel.FFone,
      faroujFadel.FFthree,
      faroujFadel.FFfive,
      faroujFadel.FFtwo,
    
      
    ],
  },
}

// ─────────────────────────────────────────────────────────────────────────────

const huntersTargetV = {
  title: "Hunter's Target",

  quote: {
    author: "Tariq Mansour",
    role:   "Operations Director, Orion Freight",
    rating: 4.8,
    tags:   ["Web Design", "Mobile App"],
    text:   "Our dispatchers used to spend two hours a day on the phone confirming jobs. Now drivers confirm, update, and close jobs from the app. That time went straight back into growing the fleet.",
    photo:  "https://picsum.photos/seed/client30/400/500",
  },

  brand: {
    pattern: huntersTarget.HTten,
    colors: [
      { hex: "#1F2216", name: "Deep Forest",      role: "Primary",   percentage: 50 },
      { hex: "#41442D", name: "Military Green",  role: "Secondary", percentage: 30 },
      { hex: "#806A41", name: "Muted Earth", role: "Neutral", percentage: 20 },
    ],
    fonts: [
      { name: "Oxona", role: "Headlines", fontFamily: "font-huntersone" },
      { name: "Figtree",     role: "Body",    fontFamily: "font-hunterstwo"     },
    ],
  },

  images: {
    mockups: [
      huntersTarget.HTfive,
      huntersTarget.HTtwo,
      huntersTarget.HTone,
      huntersTarget.HTthree,
      huntersTarget.HTnine,
    ],
  },
}

const korumtecV = {
  title: "Kroumtec",

  quote: {
    author: "Khodor Alawieh",
    role:   "Operations Director, Orion Freight",
    rating: 4.8,
    tags:   ["Web Design", "Mobile App"],
    text:   "Our dispatchers used to spend two hours a day on the phone confirming jobs. Now drivers confirm, update, and close jobs from the app. That time went straight back into growing the fleet.",
    photo:  "https://picsum.photos/seed/client30/400/500",
  },

  brand: {
    pattern: kroumtec.k12,
    colors: [
      { hex: "#034435", name: "Mineral Evergreen",      role: "Primary",   percentage: 50 },
      { hex: "#1156A3", name: "Agripulse Green",  role: "Secondary", percentage: 20 },
      { hex: "#CC613A", name: "Vivid Orange", role: "Accent", percentage: 10 },
      { hex: "#17191D", name: "Soil Core Black", role: "Neutral", percentage: 20 },
    ],
    fonts: [
      { name: "Oxona", role: "Headlines", fontFamily: "font-huntersone" },
      { name: "Lato",     role: "Body",    fontFamily: "font-primary"     },
    ],
  },

  images: {
    mockups: [
     kroumtec.k2,
     kroumtec.k1,
     kroumtec.k13,
     kroumtec.k16,
     kroumtec.k8,
    ],
  },
}

const allCaseStudies = [
  faroujFadelV,
  beesserviceV,
  huntersTargetV,
  korumtecV,
  aliselectronicV,
]

const TABS = ["Farouj Fadel", "Bees Service",  "Hunter's Target", "Kroumtec", "Ali's Electronic"]


const NavButton = memo(({ onClick, label, children }) => (
  <button onClick={onClick} aria-label={label}
    className="w-10 h-10 cursor-pointer rounded-full border border-border flex items-center justify-center text-text hover:bg-primary hover:text-bg hover:border-primary transition-colors">
    {children}
  </button>
))

const SectionPill = ({ children }) => (
  <div className=" w-min rounded-full">
    <p className="text-[13px] sm:text-[14px] text-text font-secondary w-max select-none">{children}</p>
  </div>
)

export default function oWorkWrapper() {
  const [activeTab, setActiveTab] = useState("Farouj Fadel")
  const [isStuck, setIsStuck] = useState(false)
  const sentinelRef = useRef(null)

  const contentRef = useRef(null)

    const setTab = (tab) => {
    setActiveTab(tab)
    setTimeout(() => {
            if (!contentRef.current) return
            const top = contentRef.current.getBoundingClientRect().top + window.scrollY - 140 // ← adjust offset
            window.scrollTo({ top, behavior: 'smooth' })
        }, 0)
    }

    const prev = () => setTab(TABS[(TABS.indexOf(activeTab) - 1 + TABS.length) % TABS.length])
    const next = () => setTab(TABS[(TABS.indexOf(activeTab) + 1) % TABS.length])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsStuck(!entry.isIntersecting),
      { threshold: 0 }
    )
    if (sentinelRef.current) observer.observe(sentinelRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="flex flex-col items-stretch justify-between pt-5 sm:pt-12 lg:pt-20 w-full bg-bg">
      {/* Sentinel — sits just above the sticky bar */}
      <div ref={sentinelRef} className="h-px" />
      <div className="px-8 md:px-12 lg:px-20 xl:px-44 2xl:px-56 pb-1 sm:pb-4">
            <SectionPill>Choose a Business:</SectionPill>
        </div>
      <div className={`px-8 md:px-12 lg:px-20 xl:px-44 2xl:px-56 sticky top-18 flex items-start justify-between gap-4 w-full bg-bg py-4 z-40 transition-colors 
        ${isStuck ? "border-b border-border" : "border-b border-transparent"} `}>
            {/* <p className="text-[12px] sm:text-[13px] text-text/60 font-primary font-semibold italic select-none w-48">Choose a Brand:</p> */}
        <div className="flex items-center gap-2.5 md:gap-4 overflow-x-auto pb-0.5" style={{ scrollbarWidth: "none" }}>
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setTab(tab)}
              className={`shrink-0 text-[12px] md:text-[14px] font-medium px-3 py-1.5 rounded-full border transition-colors select-none cursor-pointer  italic
                ${activeTab === tab
                  ? "bg-subPrimary/40 text-primary border-primary "
                  : "bg-transparent text-text border-border hover:border-primary hover:text-primary"}`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-2 shrink-0">
          <NavButton onClick={prev} label="Previous"><ArrowLeftIcon className="w-4 h-4" /></NavButton>
          <NavButton onClick={next} label="Next"><ArrowRightIcon className="w-4 h-4" /></NavButton>
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
            ref={contentRef}
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="px-8 md:px-12 lg:px-20 xl:px-44 2xl:px-56 scroll-mt-28"
        >
            <CaseStudyPage {...allCaseStudies[TABS.indexOf(activeTab)]} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

     