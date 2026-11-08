import { memo, useState, useEffect, useRef } from "react"
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/20/solid"
import { motion } from "framer-motion"
import BlogCard from "./BlogCard"
import { client_images } from "../../assets/assets"

const TABS = ["All", "Brand & Identity", "Marketing & Growth", "Digital Presence", "Sales & Operations"]

const NavButton = memo(({ onClick, label, children }) => (
  <button onClick={onClick} aria-label={label}
    className="w-10 h-10 cursor-pointer rounded-full border border-border flex items-center justify-center text-text hover:bg-primary hover:text-bg hover:border-primary transition-colors">
    {children}
  </button>
))

const SectionPill = ({ children }) => (
  <div className="w-min rounded-full">
    <p className="text-[13px] sm:text-[14px] text-text font-secondary w-max select-none">{children}</p>
  </div>
)

const ALL_POSTS = [
  // ── Brand & Identity ─────────────────────────────────────────────────────
  {
    category: "Brand & Identity",
    image:    "https://picsum.photos/seed/brand1/800/500",
    title:    "Why some businesses charge 10x more for the exact same service",
    excerpt:  "It's not the service. It's not the portfolio. It's the brand doing the talking before you say a word — and most businesses have no idea what it's saying.",
    author:   { name: "Mohammad Assaf", avatar: client_images.client1 },
    date:     "Jun 10, 2025",
    readTime: "6 min read",
    link:     "/blog/charge-10x",
    pdf:      "/downloads/brand-pricing-guide.pdf",
  },
  {
    category: "Brand & Identity",
    image:    "https://picsum.photos/seed/brand2/800/500",
    title:    "At what point does poor branding start costing you more than fixing it would?",
    excerpt:  "There's a hidden tax on weak brand identity. Every lost quote, every race-to-the-bottom negotiation, every referral that went to a competitor — most of it traces back here.",
    author:   { name: "Mohammad Assaf", avatar: client_images.client1 },
    date:     "Jun 18, 2025",
    readTime: "7 min read",
    link:     "/blog/branding-cost",
  },
  {
    category: "Brand & Identity",
    image:    "https://picsum.photos/seed/brand3/800/500",
    title:    "The difference between a logo and a brand identity",
    excerpt:  "A logo is a mark. A brand identity is a system. One is a single file from a freelancer. The other is what makes your business recognizable, consistent, and hard to copy.",
    author:   { name: "Mohammad Assaf", avatar: client_images.client1 },
    date:     "Jul 2, 2025",
    readTime: "4 min read",
    link:     "/blog/logo-vs-brand",
    pdf:      "/downloads/brand-identity-checklist.pdf",
  },
  {
    category: "Brand & Identity",
    image:    "https://picsum.photos/seed/brand4/800/500",
    title:    "Can a small business with a strong brand outcompete a bigger, better-funded competitor?",
    excerpt:  "Budget is not the deciding factor anymore. Here's how positioning and a coherent identity close the gap — and in many cases reverse it entirely.",
    author:   { name: "Mohammad Assaf", avatar: client_images.client1 },
    date:     "Jul 14, 2025",
    readTime: "8 min read",
    link:     "/blog/small-brand-big-competitor",
  },

  // ── Marketing & Growth ────────────────────────────────────────────────────
  {
    category: "Marketing & Growth",
    image:    "https://picsum.photos/seed/mkt1/800/500",
    title:    "Why most small business owners mistake visibility for marketing",
    excerpt:  "Posting every day isn't a strategy. Having 10,000 followers isn't growth. Here's the difference between being seen and being chosen — and why only one of them pays.",
    author:   { name: "Mohammad Assaf", avatar: client_images.client1 },
    date:     "Jun 22, 2025",
    readTime: "5 min read",
    link:     "/blog/visibility-vs-marketing",
  },
  {
    category: "Marketing & Growth",
    image:    "https://picsum.photos/seed/mkt2/800/500",
    title:    "What is the difference between a business that scales and one that just gets busier?",
    excerpt:  "Both look the same from the outside. One has a ceiling. The other has a system. The gap between them is almost never about effort — it's about structure.",
    author:   { name: "Mohammad Assaf", avatar: client_images.client1 },
    date:     "Jul 5, 2025",
    readTime: "9 min read",
    link:     "/blog/scales-vs-busy",
    pdf:      "/downloads/scale-readiness-scorecard.pdf",
  },
  {
    category: "Marketing & Growth",
    image:    "https://picsum.photos/seed/mkt3/800/500",
    title:    "Why businesses that focus on fewer services grow faster",
    excerpt:  "Offering everything is a growth ceiling in disguise. The moment you try to serve everyone, you stop being the obvious choice for anyone.",
    author:   { name: "Mohammad Assaf", avatar: client_images.client1 },
    date:     "Jul 20, 2025",
    readTime: "6 min read",
    link:     "/blog/fewer-services-faster-growth",
  },
  {
    category: "Marketing & Growth",
    image:    "https://picsum.photos/seed/mkt4/800/500",
    title:    "How businesses that don't run ads continue to grow revenue year over year",
    excerpt:  "No ad spend. No boosted posts. No agency retainer. Some of the fastest-growing service businesses operate this way — here's the actual playbook.",
    author:   { name: "Mohammad Assaf", avatar: client_images.client1 },
    date:     "Aug 3, 2025",
    readTime: "7 min read",
    link:     "/blog/grow-without-ads",
    pdf:      "/downloads/organic-growth-playbook.pdf",
  },

  // ── Digital Presence ──────────────────────────────────────────────────────
  {
    category: "Digital Presence",
    image:    "https://picsum.photos/seed/web1/800/500",
    title:    "What your website is communicating before anyone reads a word",
    excerpt:  "Design signals price, trust, and competence in under three seconds. Most service businesses are sending the wrong message — and have no idea.",
    author:   { name: "Mohammad Assaf", avatar: client_images.client1 },
    date:     "Jun 28, 2025",
    readTime: "5 min read",
    link:     "/blog/website-signals",
  },
  {
    category: "Digital Presence",
    image:    "https://picsum.photos/seed/web2/800/500",
    title:    "Why a bad website costs a business more than building a good one",
    excerpt:  "The real cost of a weak website isn't the build price. It's every lead that landed, looked around for eight seconds, and quietly closed the tab.",
    author:   { name: "Mohammad Assaf", avatar: client_images.client1 },
    date:     "Jul 8, 2025",
    readTime: "6 min read",
    link:     "/blog/bad-website-true-cost",
    pdf:      "/downloads/website-audit-checklist.pdf",
  },
  {
    category: "Digital Presence",
    image:    "https://picsum.photos/seed/web3/800/500",
    title:    "How to build a website that works as a 24/7 salesperson",
    excerpt:  "A brochure tells people what you do. A sales-focused website gets them to take the next step — without you being in the room.",
    author:   { name: "Mohammad Assaf", avatar: client_images.client1 },
    date:     "Jul 25, 2025",
    readTime: "8 min read",
    link:     "/blog/website-as-salesperson",
  },
  {
    category: "Digital Presence",
    image:    "https://picsum.photos/seed/web4/800/500",
    title:    "What features should a client-facing mobile app have for a service business?",
    excerpt:  "Most service businesses over-engineer their app and under-deliver on the three things clients actually need: booking, communication, and status updates.",
    author:   { name: "Mohammad Assaf", avatar: client_images.client1 },
    date:     "Aug 10, 2025",
    readTime: "5 min read",
    link:     "/blog/app-features-service-business",
    pdf:      "/downloads/app-feature-checklist.pdf",
  },

  // ── Sales & Operations ────────────────────────────────────────────────────
  {
    category: "Sales & Operations",
    image:    "https://picsum.photos/seed/sales1/800/500",
    title:    "The difference between selling a service and selling an outcome",
    excerpt:  "One conversation is about deliverables. The other is about what life looks like after the work is done. The second one closes at a completely different rate.",
    author:   { name: "Mohammad Assaf", avatar: client_images.client1 },
    date:     "Jun 15, 2025",
    readTime: "6 min read",
    link:     "/blog/service-vs-outcome",
  },
  {
    category: "Sales & Operations",
    image:    "https://picsum.photos/seed/sales2/800/500",
    title:    "What should go in a client proposal to increase your close rate",
    excerpt:  "Most proposals are a list of things you'll do and a price. The ones that win look completely different — here's exactly what they include and why.",
    author:   { name: "Mohammad Assaf", avatar: client_images.client1 },
    date:     "Jul 1, 2025",
    readTime: "7 min read",
    link:     "/blog/winning-proposals",
    pdf:      "/downloads/proposal-template.pdf",
  },
  {
    category: "Sales & Operations",
    image:    "https://picsum.photos/seed/sales3/800/500",
    title:    "How to follow up with leads without sounding desperate",
    excerpt:  "Most service businesses either chase too hard or disappear after the first message. There's a follow-up sequence that converts — and it doesn't feel like either.",
    author:   { name: "Mohammad Assaf", avatar: client_images.client1 },
    date:     "Jul 16, 2025",
    readTime: "4 min read",
    link:     "/blog/follow-up-that-converts",
  },
  {
    category: "Sales & Operations",
    image:    "https://picsum.photos/seed/sales4/800/500",
    title:    "What systems does a business need before the founder can step back?",
    excerpt:  "If the business only works when you're in it, it isn't a business — it's a job. Here's the exact stack of systems that changes that.",
    author:   { name: "Mohammad Assaf", avatar: client_images.client1 },
    date:     "Aug 5, 2025",
    readTime: "10 min read",
    link:     "/blog/founder-step-back-systems",
    pdf:      "/downloads/systems-checklist.pdf",
  },
]
export default function BlogWrapper() {
  const [activeTab, setActiveTab] = useState("All")
  const [isStuck, setIsStuck]     = useState(false)
  const sentinelRef = useRef(null)
  const contentRef  = useRef(null)

  const filteredPosts = activeTab === "All"
    ? ALL_POSTS
    : ALL_POSTS.filter(p => p.category === activeTab)

  const setTab = (tab) => {
    setActiveTab(tab)
    setTimeout(() => {
      if (!contentRef.current) return
      const top = contentRef.current.getBoundingClientRect().top + window.scrollY - 140
      window.scrollTo({ top, behavior: "smooth" })
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
    <div className="flex flex-col items-stretch w-full bg-bg sm:pt-12">
      <div ref={sentinelRef} className="h-px" />

      <div className="px-8 md:px-12 lg:px-20 xl:px-44 2xl:px-56 pb-1 sm:pb-4">
        <SectionPill>Read or Download Our Free Assets:</SectionPill>
      </div>

      <div className={`px-8 md:px-12 lg:px-20 xl:px-44 2xl:px-56 sticky top-18 flex items-start justify-between gap-4 w-full bg-bg py-4 z-40 transition-colors
        ${isStuck ? "border-b border-border" : "border-b border-transparent"}`}>
        <div className="flex items-center gap-2.5 md:gap-4 overflow-x-auto pb-0.5" style={{ scrollbarWidth: "none" }}>
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setTab(tab)}
              className={`shrink-0 text-[12px] md:text-[14px] font-medium px-3 py-1.5 rounded-full border transition-colors select-none cursor-pointer italic
                ${activeTab === tab
                  ? "bg-subPrimary/40 text-primary border-primary"
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

      <motion.div
        ref={contentRef}
        key={activeTab}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="px-8 md:px-12 lg:px-20 xl:px-44 2xl:px-56"
      >
        {/* Mobile */}
        <div className="sm:hidden flex flex-col gap-5">
          {filteredPosts.length > 0 ? (
              <>
                {filteredPosts.slice(1).map((post, i) => (
                  <BlogCard key={i} post={post} />
                ))}
              </>
          ) : (
            <p className="text-center text-text/40 font-primary italic text-[14px] py-16 select-none">
              No posts in this category yet.
            </p>
          )}
        </div>

        {/* sm+ grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-8 py-5">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, i) => (
              <BlogCard key={i} post={post} featured={true}/>
            ))
          ) : (
            <p className="col-span-full text-center text-text/40 font-primary italic text-[14px] py-16 select-none">
              No posts in this category yet.
            </p>
          )}
        </div>
      </motion.div>
    </div>
  )
}