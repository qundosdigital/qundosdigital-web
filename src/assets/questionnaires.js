/**
 * PACKAGE-SPECIFIC BOOKING QUESTIONS
 * ─────────────────────────────────────────────────────────────────────────────
 * Each export is a tuple of [QUESTIONS, SECTIONS] for one package.
 * All questions are written to mirror the intake forms of the world's top
 * creative and digital agencies (Wolff Olins, Collins, Pentagram, Huge,
 * Fantasy, R/GA, Instrument, Koto, Superside) combined with PACT-M
 * qualification logic and high-converting funnel best practices.
 *
 * Shared fields (name, email, companyname, website, reference, meeting)
 * are pulled from BASE_QUESTIONS using the same .find() pattern as the
 * existing BRANDING_STANDARD_QUESTIONS file.
 *
 * Usage:
 *   import { VISUAL_FOUNDATION_QUESTIONS, VISUAL_FOUNDATION_SECTIONS } from './packageQuestions';
 *   <TypeformLeadForm questions={VISUAL_FOUNDATION_QUESTIONS} sections={VISUAL_FOUNDATION_SECTIONS} />
 */

// ─────────────────────────────────────────────────────────────────────────────
// ██████  BRANDING PACKAGES
// ─────────────────────────────────────────────────────────────────────────────

// ─── 01. VISUAL FOUNDATION ($800) ────────────────────────────────────────────
// Target: solo operators, first-time founders, pre-launch startups.
// Goal:   Qualify fast, filter out price-shoppers, confirm they need a
//         foundation not a full system. Short and low-friction.

export const BASE_QUESTIONS = [
  {
    id: "name",
    type: "text",
    question: "What's your name?",
    placeholder: "Type your answer here...",
    required: true,
  },
  {
    id: "email",
    type: "text",
    inputType: "email",
    question: "Best email to reach you?",
    placeholder: "example@email.com",
    required: true,
  },
  {
    id: "companyname",
    type: "text",
    question: "What's the name of your business or project?",
    placeholder: "Type your answer here...",
    required: true,
  },
  {
    id: "website",
    type: "text",
    question: "Do you have a website? Drop the link if so.",
    placeholder: "Click \"Next\" if you have none...",
    required: false,
  },
  {
    id: "budget",
    type: "multiple_choice",
    question: "What investment range feels most comfortable to you?",
    required: true,
    choices: [
      { key: "A", label: "Under $1000" },
      { key: "B", label: "$1000 - $5000" },
      { key: "C", label: "$5000 - $10,000" },
      { key: "D", label: "$10,000 - $25,000" },
      { key: "E", label: "$25,000+" },
    ],
  },
  {
    id: "reference",
    type: "multiple_choice",
    question: "How did you hear about us?",
    required: true,
    choices: [
      { key: "A", label: "Google search" },
      { key: "B", label: "Instagram or LinkedIn" },
      { key: "C", label: "Referral from a friend or past client" },
      { key: "D", label: "Advertisement" },
      { key: "E", label: "Other" },
    ],
  },
  {
    id: "meeting",
    type: "calendar",
    question: "Pick a time that works for an intro call.",
    required: true,
    workingHours: { start: 9, end: 18 },
    daysAhead: 60,
    timezone: "Asia/Beirut",
  },
]

export const LETSTALK_SECTIONS = [
  {
    id: "letstalk",
    title: "Let's Talk!",
    description: "Kindly, fill the form and book a free call so we can get started.",
    questionIds: ["name", "email", "companyname", "website"],
  },
  {
    id: "laststep",
    title: "Let's Step",
    description: "Almost there! Keep going.",
    questionIds: ["budget", "reference", "meeting"],
  },
]


export const INQUIRY_QUESTIONS = [
  BASE_QUESTIONS.find(q => q.id === "name"),
  BASE_QUESTIONS.find(q => q.id === "email"),
  {
    id: "inq_topic",
    type: "multiple_choice",
    question: "What is your inquiry about?",
    required: true,
    choices: [
      { key: "A", label: "Branding — logos, identity, or brand guidelines" },
      { key: "B", label: "Web — marketing site, storefront, or internal system" },
      { key: "C", label: "A bundle — brand and web together" },
      { key: "D", label: "Something else — I'll explain below" },
    ],
  },
  {
    id: "inq_message",
    type: "textarea",
    question: "What would you like to know?",
    placeholder: "Ask directly — no need to over-explain. We'll follow up if we need more context.",
    required: true,
  },
  BASE_QUESTIONS.find(q => q.id === "reference"),
]
 
export const INQUIRY_SECTIONS = [
  {
    id: "inquiry",
    title: "Send an Inquiry",
    description: "Ask us anything. We read every message and reply within one business day.",
    questionIds: ["name", "email", "inq_topic", "inq_message", "reference"],
  },
]

export const WRITEAREVIEW_QUESTIONS = [
  BASE_QUESTIONS.find(q => q.id === "name"),
  {
    id: "pkg_id",
    type: "text",
    question: "What's the ID of the package you we delivered for you.",
    required: true,
    placeholder: "e.g. PKG-XXXXXX.",
  },
  {
    id: "clientreview",
    type: "textarea",
    question: "What do you think about our service?",
    placeholder: "Be honest — your review matters so we know what we're doing right, and what we are missing during delivery.",
    required: true,
  },
]
 
export const WRITEAREVIEW_SECTIONS = [
  {
    id: "review",
    title: "Write a Review",
    description: "Your review is much appreciated. It helps us fix gaps within our workflow if there are any.",
    questionIds: ["name", "pkg_id", "clientreview"],
  },
]

export const VISUAL_FOUNDATION_QUESTIONS = [
  // ── Section: You ──
  BASE_QUESTIONS.find(q => q.id === "name"),
  BASE_QUESTIONS.find(q => q.id === "email"),
  BASE_QUESTIONS.find(q => q.id === "companyname"),

  // ── Section: Your Situation ──
  {
    id: "vf_whatyoudo",
    type: "text",
    question: "In one sentence, what does your business do?",
    placeholder: "e.g. I help B2B companies with lead generation through cold email.",
    required: true,
  },
  {
    id: "vf_stage",
    type: "multiple_choice",
    question: "Where are you right now?",
    required: true,
    choices: [
      { key: "A", label: "Pre-launch — I haven't gone live yet" },
      { key: "B", label: "Just launched — less than 3 months in" },
      { key: "C", label: "Running — I have clients, the brand just needs a proper look" },
      { key: "D", label: "Rebranding — something changed and the old brand doesn't fit" },
    ],
  },
  {
    id: "vf_currentbrand",
    type: "multiple_choice",
    question: "What does your current visual identity look like?",
    required: true,
    choices: [
      { key: "A", label: "Nothing — completely starting from zero" },
      { key: "B", label: "A DIY or Canva logo I throw on everything" },
      { key: "C", label: "Something a freelancer made — it's fine but not quite right" },
      { key: "D", label: "An old brand from years ago that no longer fits" },
    ],
  },

  // ── Section: The Brand You Want ──
  {
    id: "vf_feel",
    type: "textarea",
    question: "Write 3–5 words that describe how your brand should feel when someone sees it for the first time.",
    placeholder: "e.g. Clean, bold, approachable, premium, honest...",
    required: true,
  },
  {
    id: "vf_never",
    type: "textarea",
    question: "Write 3–5 words your brand should never, ever feel like.",
    placeholder: "e.g. Cheap, generic, cluttered, cold...",
    required: true,
  },
  {
    id: "vf_reference",
    type: "textarea",
    question: "Name one brand whose logo or visual style you genuinely respect. What draws you to it?",
    placeholder: "e.g. Notion — it's minimal but has a distinct personality. Nothing feels accidental.",
    required: false,
  },

  // ── Section: Readiness ──
  {
    id: "vf_urgency",
    type: "multiple_choice",
    question: "When do you need this done?",
    required: true,
    choices: [
      { key: "A", label: "As soon as possible — I'm blocked without it" },
      { key: "B", label: "Within the next 4 weeks" },
      { key: "C", label: "Within the next 2 months" },
      { key: "D", label: "I'm planning ahead — no hard deadline" },
    ],
  },
  {
    id: "vf_decision",
    type: "multiple_choice",
    question: "Who makes the final call on the direction?",
    required: true,
    choices: [
      { key: "A", label: "Me — I decide alone" },
      { key: "B", label: "Me and a co-founder or partner" },
      { key: "C", label: "There are others involved in approval" },
    ],
  },
  {
    id: "vf_addons",
    type: "multiple_choice_multi",
    question: "Beyond the logo and core identity, what else do you know you'll need soon?",
    required: false,
    choices: [
      { key: "A", label: "A website" },
      { key: "B", label: "Social media profile kit" },
      { key: "C", label: "Business cards or printed materials" },
      { key: "D", label: "A brand guidelines document" },
      { key: "E", label: "None yet — just the foundation for now" },
    ],
  },

  // ── Section: Book ──
  BASE_QUESTIONS.find(q => q.id === "reference"),
  BASE_QUESTIONS.find(q => q.id === "meeting"),
]

export const VISUAL_FOUNDATION_SECTIONS = [
  {
    id: "you",
    title: "Visual Foundation Application",
    description: "Just a couple of basics to get going.",
    questionIds: ["name", "email", "companyname"],
  },
  {
    id: "situation",
    title: "Your Situation",
    description: "Help us understand where you are right now so we can skip the generic conversation.",
    questionIds: ["vf_whatyoudo", "vf_stage", "vf_currentbrand"],
  },
  {
    id: "brandyouwant",
    title: "The Brand You Want",
    description: "This is the most important section. Don't overthink it — just be honest.",
    questionIds: ["vf_feel", "vf_never", "vf_reference"],
  },
  {
    id: "readiness",
    title: "Readiness",
    description: "A few quick questions before we talk.",
    questionIds: ["vf_urgency", "vf_decision", "vf_addons"],
  },
  {
    id: "book",
    title: "Last Step",
    description: "How did you find us, and pick a time.",
    questionIds: ["reference", "meeting"],
  },
]


// ─── 02. BRAND IDENTITY ($1,800) ─────────────────────────────────────────────
// Target: growing businesses, 1–3 years in, inconsistent brand across platforms.
// Goal:   Surface the pain of inconsistency, confirm they need a system not
//         just a logo, and PACT-M qualify on authority and timeline.

export const BRAND_IDENTITY_QUESTIONS = [
  // ── Section: You ──
  BASE_QUESTIONS.find(q => q.id === "name"),
  BASE_QUESTIONS.find(q => q.id === "email"),
  BASE_QUESTIONS.find(q => q.id === "companyname"),
  BASE_QUESTIONS.find(q => q.id === "website"),

  // ── Section: Your Business ──
  {
    id: "bi_industry",
    type: "text",
    question: "What industry are you in?",
    placeholder: "e.g. F&B, SaaS, consulting, fashion, real estate...",
    required: true,
  },
  {
    id: "bi_operating",
    type: "multiple_choice",
    question: "How long have you been operating?",
    required: true,
    choices: [
      { key: "A", label: "Less than 1 year" },
      { key: "B", label: "1 to 3 years" },
      { key: "C", label: "3 to 5 years" },
      { key: "D", label: "More than 5 years" },
    ],
  },
  {
    id: "bi_revenue",
    type: "multiple_choice",
    question: "What's the best way to describe your current business stage?",
    required: true,
    choices: [
      { key: "A", label: "Early revenue — we have clients but it's not systematic yet" },
      { key: "B", label: "Growing — we're scaling and the brand hasn't kept up" },
      { key: "C", label: "Established — we're running well but the brand is holding us back" },
      { key: "D", label: "Pivoting — the business changed and the brand no longer fits" },
    ],
  },

  // ── Section: Your Brand Today ──
  {
    id: "bi_currentstate",
    type: "multiple_choice",
    question: "Be honest — what's actually wrong with your current brand?",
    required: true,
    choices: [
      { key: "A", label: "We look inconsistent — the brand looks different everywhere" },
      { key: "B", label: "We look cheap or amateurish compared to who we're selling to" },
      { key: "C", label: "The brand was never designed to scale — others can't use it correctly" },
      { key: "D", label: "It just doesn't represent who we actually are anymore" },
    ],
  },
  {
    id: "bi_brandusers",
    type: "multiple_choice",
    question: "Who uses your brand assets beyond you?",
    required: true,
    choices: [
      { key: "A", label: "Just me" },
      { key: "B", label: "A small team (2–5 people)" },
      { key: "C", label: "External designers, developers, or agencies" },
      { key: "D", label: "Multiple internal teams or locations" },
    ],
  },
  {
    id: "bi_brandtouches",
    type: "multiple_choice_multi",
    question: "Where does your brand need to work? Select all that apply.",
    required: true,
    choices: [
      { key: "A", label: "Social media (organic + paid)" },
      { key: "B", label: "Website" },
      { key: "C", label: "Sales decks and proposals" },
      { key: "D", label: "Physical materials (signage, packaging, print)" },
      { key: "E", label: "Email communications" },
    ],
  },

  // ── Section: The Brand You Want ──
  {
    id: "bi_feel",
    type: "textarea",
    question: "Write 3–5 words that describe how your brand should feel to your ideal client.",
    placeholder: "e.g. Authoritative, approachable, sharp, warm, premium...",
    required: true,
  },
  {
    id: "bi_never",
    type: "textarea",
    question: "Write 3–5 words your brand should never communicate — things that would immediately lose a client.",
    placeholder: "e.g. Generic, cold, cluttered, dated, unsafe...",
    required: true,
  },
  {
    id: "bi_competitor",
    type: "textarea",
    question: "Name one competitor or peer in your space. What specifically do they have that you don't?",
    placeholder: "Be specific — this is exactly what we use to position you differently.",
    required: false,
  },
  {
    id: "bi_outcome",
    type: "textarea",
    question: "What should be different for your business once you have a brand system that works?",
    placeholder: "What changes — in perception, in client quality, in how your team operates?",
    required: true,
  },

  // ── Section: Scope & Authority ──
  {
    id: "bi_decision",
    type: "multiple_choice",
    question: "Who is the final decision-maker on creative direction for this project?",
    required: true,
    choices: [
      { key: "A", label: "Me alone" },
      { key: "B", label: "Me and a co-founder or partner" },
      { key: "C", label: "Me and my marketing or creative team" },
      { key: "D", label: "Multiple stakeholders with different opinions" },
    ],
  },
  {
    id: "bi_existinglogo",
    type: "multiple_choice",
    question: "What should we do with your existing logo?",
    required: true,
    choices: [
      { key: "A", label: "Keep it — the logo is fine, it's the system around it that's missing" },
      { key: "B", label: "Evolve it — the concept is right but the execution isn't" },
      { key: "C", label: "Replace it entirely — we're starting fresh" },
      { key: "D", label: "I don't have one yet" },
    ],
  },
  {
    id: "bi_agency",
    type: "multiple_choice",
    question: "Have you worked with a branding agency or designer before?",
    required: true,
    choices: [
      { key: "A", label: "No — this is my first time" },
      { key: "B", label: "Yes — and it went well" },
      { key: "C", label: "Yes — and it was frustrating or didn't deliver what I expected" },
      { key: "D", label: "Yes — but I handled the brief poorly and want to do it differently" },
    ],
  },
  {
    id: "bi_timeline",
    type: "multiple_choice",
    question: "Is there a hard deadline attached to this project?",
    required: true,
    choices: [
      { key: "A", label: "Yes — I have a launch, event, or campaign driving the timeline" },
      { key: "B", label: "Soft deadline — I want it done within 6 weeks" },
      { key: "C", label: "No hard deadline — but I want to move quickly" },
      { key: "D", label: "I'm planning ahead — timeline is flexible" },
    ],
  },

  // ── Section: Book ──
  BASE_QUESTIONS.find(q => q.id === "reference"),
  BASE_QUESTIONS.find(q => q.id === "meeting"),
]

export const BRAND_IDENTITY_SECTIONS = [
  {
    id: "you",
    title: "Brand Identity Application",
    description: "The basics before we get into it.",
    questionIds: ["name", "email", "companyname", "website"],
  },
  {
    id: "yourbusiness",
    title: "Your Business",
    description: "Context first. We need to understand the business before we can build the brand.",
    questionIds: ["bi_industry", "bi_operating", "bi_revenue"],
  },
  {
    id: "yourbrandtoday",
    title: "Your Brand Today",
    description: "Be direct with us. The more honest you are here, the more targeted our solution will be.",
    questionIds: ["bi_currentstate", "bi_brandusers", "bi_brandtouches",],
  },
  {
    id: "brandyouwant",
    title: "The Brand You Want",
    description: "This is the most important section. Take your time — vague answers produce vague work.",
    questionIds: ["bi_feel", "bi_never", "bi_competitor", "bi_outcome"],
  },
  {
    id: "scope",
    title: "Scope & Authority",
    description: "A few things we need to align on before we can move forward.",
    questionIds: ["bi_decision", "bi_existinglogo", "bi_agency", "bi_timeline"],
  },
  {
    id: "book",
    title: "Last Step",
    description: "How did you find us, and book a time.",
    questionIds: ["reference", "meeting"],
  },
]


// ─── 03. FULL BRAND GUIDELINE ($4,000) ───────────────────────────────────────
// Target: established businesses, preparing for scale, investors, or partners.
// Goal:   Qualify on organizational complexity, confirm they need governance
//         not just execution, and surface the cost of not having it.

export const FULL_BRAND_GUIDELINE_QUESTIONS = [
  // ── Section: You ──
  BASE_QUESTIONS.find(q => q.id === "name"),
  BASE_QUESTIONS.find(q => q.id === "email"),
  BASE_QUESTIONS.find(q => q.id === "companyname"),
  BASE_QUESTIONS.find(q => q.id === "website"),

  // ── Section: Your Organization ──
  {
    id: "fbg_industry",
    type: "text",
    question: "What industry are you in, and who do you primarily sell to?",
    placeholder: "e.g. SaaS selling to mid-market B2B / F&B with 3 locations / Real estate consultancy...",
    required: true,
  },
  {
    id: "fbg_size",
    type: "multiple_choice",
    question: "How large is your organization?",
    required: true,
    choices: [
      { key: "A", label: "5–15 people" },
      { key: "B", label: "15–50 people" },
      { key: "C", label: "50–150 people" },
      { key: "D", label: "150+ people" },
    ],
  },
  {
    id: "fbg_driver",
    type: "multiple_choice",
    question: "What is the primary business event driving this project?",
    required: true,
    choices: [
      { key: "A", label: "Preparing for fundraising or investor conversations" },
      { key: "B", label: "Expanding to new markets, locations, or channels" },
      { key: "C", label: "Preparing to franchise or bring on partners" },
      { key: "D", label: "The brand is being used incorrectly and we've lost control of it" },
    ],
  },
  {
    id: "fbg_urgency_cost",
    type: "textarea",
    question: "What is the actual cost to your business of not having this done? What has already gone wrong that was not supposed to happen?",
    placeholder: "e.g. We hired a new marketing agency and they produced off-brand assets for three months before we caught it. / We lost a partnership discussion because our materials looked inconsistent with what our website said.",
    required: true,
  },

  // ── Section: Your Current Brand ──
  {
    id: "fbg_currentdocs",
    type: "multiple_choice",
    question: "What brand documentation currently exists?",
    required: true,
    choices: [
      { key: "A", label: "We have logo files, a color palette, and fonts — nothing more" },
      { key: "B", label: "We have a basic one-pager that no one actually uses" },
      { key: "C", label: "We have a guidelines document but it's outdated or incomplete" },
      { key: "D", label: "We have brand assets but zero documentation" },
    ],
  },
  {
    id: "fbg_brandconsistency",
    type: "multiple_choice",
    question: "How consistent is your brand across every touchpoint right now?",
    required: true,
    choices: [
      { key: "A", label: "Consistent only when I personally control the output" },
      { key: "B", label: "Varies significantly depending on who created it" },
      { key: "C", label: "Different agencies and team members have produced different versions" },
      { key: "D", label: "It's a known internal problem that's been discussed but not fixed" },
    ],
  },
  {
    id: "fbg_brandusers",
    type: "multiple_choice_multi",
    question: "Who outside your core team uses your brand? Select all that apply.",
    required: true,
    choices: [
      { key: "A", label: "Marketing or creative agencies" },
      { key: "B", label: "External developers or product teams" },
      { key: "C", label: "Franchise operators or regional teams" },
      { key: "D", label: "Investors, partners, or board members" },
      { key: "E", label: "PR or communications firms" },
    ],
  },
  {
    id: "fbg_currentlogokeep",
    type: "multiple_choice",
    question: "How do you feel about your current logo and core visual identity?",
    required: true,
    choices: [
      { key: "A", label: "The logo is strong — we need the system built around it" },
      { key: "B", label: "The logo needs evolution alongside the guideline work" },
      { key: "C", label: "The entire visual identity needs to be rebuilt from scratch" },
      { key: "D", label: "We're not sure — we need your assessment first" },
    ],
  },

  // ── Section: Brand Vision ──
  {
    id: "fbg_positioning",
    type: "textarea",
    question: "How would you describe your brand's positioning in the market today; and how do you want it to be perceived differently?",
    placeholder: "Where you are now vs. where you want to be. This shapes the entire strategic direction.",
    required: true,
  },
  {
    id: "fbg_editorial",
    type: "multiple_choice",
    question: "How much does your business rely on written content (social media, emails, reports, etc...)?",
    required: true,
    choices: [
      { key: "A", label: "Heavily — written content is a primary channel for us" },
      { key: "B", label: "Moderately — we publish and send communications regularly" },
      { key: "C", label: "Occasionally — we write but it's not systematic" },
      { key: "D", label: "Rarely — we're primarily visual or product-led" },
    ],
  },
  {
    id: "fbg_templates",
    type: "multiple_choice_multi",
    question: "Which template types do you need standardized? Select all that apply.",
    required: true,
    choices: [
      { key: "A", label: "Presentation and pitch decks" },
      { key: "B", label: "Social media content templates" },
      { key: "C", label: "Email and newsletter layouts" },
      { key: "D", label: "Printed stationery and letterhead" },
      { key: "E", label: "Marketing collateral (brochures, one-pagers, ads)" },
    ],
  },

  // ── Section: Authority & Process ──
  {
    id: "fbg_decision",
    type: "multiple_choice",
    question: "Who owns the final decision on brand direction at your organization?",
    required: true,
    choices: [
      { key: "A", label: "Founder or CEO only" },
      { key: "B", label: "Founder plus a marketing lead" },
      { key: "C", label: "A cross-functional team (marketing, product, exec)" },
      { key: "D", label: "A board or committee — multi-stage approval process" },
    ],
  },
  {
    id: "fbg_pastwork",
    type: "textarea",
    question: "Have you worked with a branding agency before on guidelines work? What happened?",
    placeholder: "Be specific. If something frustrating happened, we want to know — it helps us scope and structure the project correctly.",
    required: false,
  },
  {
    id: "fbg_timeline",
    type: "multiple_choice",
    question: "Is there an external deadline driving this?",
    required: true,
    choices: [
      { key: "A", label: "Yes — a specific date tied to a funding round, launch, or event" },
      { key: "B", label: "Soft target — we want it done within 3 months" },
      { key: "C", label: "We want to move quickly but the timeline is internal" },
      { key: "D", label: "No hard deadline — this is a planned investment" },
    ],
  },

  // ── Section: Book ──
  BASE_QUESTIONS.find(q => q.id === "reference"),
  BASE_QUESTIONS.find(q => q.id === "meeting"),
]

export const FULL_BRAND_GUIDELINE_SECTIONS = [
  {
    id: "you",
    title: "Full Brand Guideline Application",
    description: "Just a couple of basics to get going.",
    questionIds: ["name", "email", "companyname", "website"],
  },
  {
    id: "yourorg",
    title: "Your Organization",
    description: "We need to understand the scale and context before anything else.",
    questionIds: ["fbg_industry", "fbg_size", "fbg_driver", "fbg_urgency_cost"],
  },
  {
    id: "yourbrandnow",
    title: "Your Current Brand",
    description: "An honest assessment of where things stand today.",
    questionIds: ["fbg_currentdocs", "fbg_brandconsistency", "fbg_brandusers", "fbg_currentlogokeep"],
  },
  {
    id: "brandvision",
    title: "Brand Vision",
    description: "The strategic direction that will shape everything we build.",
    questionIds: ["fbg_positioning", "fbg_editorial", "fbg_templates"],
  },
  {
    id: "authority",
    title: "Authority & Process",
    description: "We need to understand how decisions get made at your organization.",
    questionIds: ["fbg_decision", "fbg_pastwork", "fbg_timeline"],
  },
  {
    id: "book",
    title: "Last Step",
    description: "How did you find us, and book your discovery session.",
    questionIds: ["reference", "meeting"],
  },
]


// ─────────────────────────────────────────────────────────────────────────────
// ██████  WEBSITES PACKAGES
// ─────────────────────────────────────────────────────────────────────────────

// ─── 04. MARKETING SYSTEM ($2,240) ───────────────────────────────────────────
// Target: service businesses, consultants, agencies that need leads.
// Goal:   Confirm the problem is lead quality/quantity, not just aesthetics.
//         Surface the current cost of a broken or absent funnel.

export const MARKETING_SYSTEM_QUESTIONS = [
  // ── Section: You ──
  BASE_QUESTIONS.find(q => q.id === "name"),
  BASE_QUESTIONS.find(q => q.id === "email"),
  BASE_QUESTIONS.find(q => q.id === "companyname"),
  BASE_QUESTIONS.find(q => q.id === "website"),

  // ── Section: Your Business ──
  {
    id: "ms_whatyoudo",
    type: "text",
    question: "What service do you offer, and who is your ideal client?",
    placeholder: "e.g. I run a boutique HR consultancy for mid-sized companies in the MENA region.",
    required: true,
  },
  {
    id: "ms_currentleads",
    type: "multiple_choice",
    question: "Where do most of your clients currently come from?",
    required: true,
    choices: [
      { key: "A", label: "Referrals and word of mouth — entirely" },
      { key: "B", label: "Mostly referrals, with some social media" },
      { key: "C", label: "A mix of referrals, ads, and cold outreach" },
      { key: "D", label: "We're just starting and don't have a consistent source yet" },
    ],
  },
  {
    id: "ms_leadproblem",
    type: "multiple_choice",
    question: "What's the real problem with how you currently get leads?",
    required: true,
    choices: [
      { key: "A", label: "I have no reliable inbound system — everything is reactive" },
      { key: "B", label: "I get enquiries but they're the wrong type of client" },
      { key: "C", label: "I lose leads because the website doesn't look credible enough" },
      { key: "D", label: "I spend too much time on bad-fit discovery calls I can't filter" },
    ],
  },

  // ── Section: Your Current Online Presence ──
  {
    id: "ms_currentsite",
    type: "multiple_choice",
    question: "What is your website doing for you right now?",
    required: true,
    choices: [
      { key: "A", label: "Nothing — I don't have one or it's a placeholder" },
      { key: "B", label: "It exists but no one would book a call from it" },
      { key: "C", label: "It gets traffic but doesn't convert visitors into enquiries" },
      { key: "D", label: "It was decent but it's outdated and doesn't reflect us anymore" },
    ],
  },
  {
    id: "ms_contentready",
    type: "multiple_choice",
    question: "When it comes to the copy and content on the new site — how prepared are you?",
    required: true,
    choices: [
      { key: "A", label: "I have everything written and ready" },
      { key: "B", label: "I have a rough draft that needs refinement" },
      { key: "C", label: "I know what I want to say but it's not written yet" },
      { key: "D", label: "I need help with copywriting and content strategy" },
    ],
  },
  {
    id: "ms_pages",
    type: "multiple_choice_multi",
    question: "Which pages do you know you need and prioritize? Select what's relevant to you.",
    required: true,
    choices: [
      { key: "A", label: "Homepage (conversion-focused)" },
      { key: "B", label: "About / Our Story page" },
      { key: "C", label: "Services or Offerings page" },
      { key: "D", label: "Case Studies or Portfolio page" },
      { key: "E", label: "Contact / Book a Call page" },
    ],
  },

  // ── Section: Lead Qualification ──
  {
    id: "ms_idealclient",
    type: "textarea",
    question: "Describe your ideal client in detail; who they are, what they're struggling with, and what makes them a great fit for you.",
    placeholder: "The more specific, the better. This directly informs how we design the pre-qualification system.",
    required: true,
  },
  {
    id: "ms_disqualify",
    type: "textarea",
    question: "What are the common red flags in a lead that tell you immediately this person is not a fit?",
    placeholder: "e.g. Businesses under 6 months old / Budget under $2k / Only interested in one-off projects.",
    required: true,
  },
  {
    id: "ms_conversiongoal",
    type: "multiple_choice",
    question: "What's the primary action you want visitors to take on your site?",
    required: true,
    choices: [
      { key: "A", label: "Book a discovery or strategy call" },
      { key: "B", label: "Fill out an enquiry or scoping form" },
      { key: "C", label: "Download a resource or lead magnet" },
      { key: "D", label: "Apply for a program, service, or limited offering" },
    ],
  },

  // ── Section: Brand & Technical ──
  {
    id: "ms_brand",
    type: "multiple_choice",
    question: "Do you have an existing brand identity (logo, colors, fonts) for us to design within?",
    required: true,
    choices: [
      { key: "A", label: "Yes — full brand assets ready to hand over" },
      { key: "B", label: "Yes — but basic. Just a logo and approximate colors." },
      { key: "C", label: "Not really — we'll figure it out as we go" },
      { key: "D", label: "No — I'll need branding work done before or alongside this" },
    ],
  },
  {
    id: "ms_integrations",
    type: "multiple_choice_multi",
    question: "Are there any existing tools or platforms this site needs to connect with?",
    required: false,
    choices: [
      { key: "A", label: "Calendar / booking tool (Calendly, Cal.com, etc.)" },
      { key: "B", label: "CRM (HubSpot, Pipedrive, etc.)" },
      { key: "C", label: "Email marketing platform (Mailchimp, Klaviyo, etc.)" },
      { key: "D", label: "Analytics (GA4, Hotjar, etc.)" },
      { key: "E", label: "No specific integrations" },
    ],
  },
  {
    id: "ms_timeline",
    type: "multiple_choice",
    question: "Is there a hard deadline for this site to be live?",
    required: true,
    choices: [
      { key: "A", label: "Yes — I have a specific launch date, event, or campaign" },
      { key: "B", label: "I want it live within 6 weeks" },
      { key: "C", label: "Within 2–3 months is fine" },
      { key: "D", label: "No hard deadline — I want it done right over fast" },
    ],
  },

  // ── Section: Book ──
  BASE_QUESTIONS.find(q => q.id === "reference"),
  BASE_QUESTIONS.find(q => q.id === "meeting"),
]

export const MARKETING_SYSTEM_SECTIONS = [
  {
    id: "you",
    title: "Marketing System Application",
    description: "A few basics before we get into it.",
    questionIds: ["name", "email", "companyname", "website"],
  },
  {
    id: "yourbusiness",
    title: "Your Business",
    description: "We need to understand what you're selling and to whom before we can design a system that converts.",
    questionIds: ["ms_whatyoudo", "ms_currentleads", "ms_leadproblem"],
  },
  {
    id: "youronlinepresence",
    title: "Your Current Online Presence",
    description: "The status of what exists now directly affects how we scope the new system.",
    questionIds: ["ms_currentsite", "ms_contentready", "ms_pages"],
  },
  {
    id: "leadqualification",
    title: "Lead Qualification Design",
    description: "This section shapes how we build the pre-qualification system. The more specific you are, the more it filters for you.",
    questionIds: ["ms_idealclient", "ms_disqualify", "ms_conversiongoal"],
  },
  {
    id: "brandtech",
    title: "Brand & Technical",
    description: "A few things we need to know before we can spec the build.",
    questionIds: ["ms_brand", "ms_integrations", "ms_timeline"],
  },
  {
    id: "book",
    title: "Last Step",
    description: "How did you find us, and pick a time to talk.",
    questionIds: ["reference", "meeting"],
  },
]


// ─── 05. ITEM & ORDER COMMERCE ($4,000) ──────────────────────────────────────
// Target: F&B, retail, e-commerce operators taking orders manually.
// Goal:   Quantify the operational pain of the current system, confirm the
//         scope (storefront vs. admin vs. both), and surface the ROI.

export const ITEM_ORDER_COMMERCE_QUESTIONS = [
  // ── Section: You ──
  BASE_QUESTIONS.find(q => q.id === "name"),
  BASE_QUESTIONS.find(q => q.id === "email"),
  BASE_QUESTIONS.find(q => q.id === "companyname"),
  BASE_QUESTIONS.find(q => q.id === "website"),

  // ── Section: Your Business ──
  {
    id: "ioc_businesstype",
    type: "multiple_choice",
    question: "What type of business are you running?",
    required: true,
    choices: [
      { key: "A", label: "Restaurant, café, or food concept" },
      { key: "B", label: "Retail store or boutique" },
      { key: "C", label: "E-commerce brand (products shipped to customers)" },
      { key: "D", label: "A hybrid — physical + online" },
    ],
  },
  {
    id: "ioc_locations",
    type: "multiple_choice",
    question: "How many locations or storefronts are you managing?",
    required: true,
    choices: [
      { key: "A", label: "1 location" },
      { key: "B", label: "2–3 locations" },
      { key: "C", label: "4+ locations or planning to expand" },
      { key: "D", label: "Online only — no physical location" },
    ],
  },
  {
    id: "ioc_volume",
    type: "multiple_choice",
    question: "Roughly how many orders or transactions do you process per day?",
    required: true,
    choices: [
      { key: "A", label: "Under 20" },
      { key: "B", label: "20–60" },
      { key: "C", label: "60–150" },
      { key: "D", label: "150+" },
    ],
  },

  // ── Section: Your Operations Today ──
  {
    id: "ioc_currentmethod",
    type: "multiple_choice",
    question: "How are you currently receiving and managing orders?",
    required: true,
    choices: [
      { key: "A", label: "WhatsApp or phone calls — manually" },
      { key: "B", label: "A third-party delivery platform (Talabat, Toters, etc.)" },
      { key: "C", label: "An existing system that doesn't work well" },
      { key: "D", label: "Walk-in only — no digital ordering at all" },
    ],
  },
  {
    id: "ioc_operationalpain",
    type: "textarea",
    question: "What is the current system actually costing you; in time, errors, missed orders, staff frustration, etc...?",
    placeholder: "Be specific. e.g. We miss 5–10 orders a week through WhatsApp. Staff spend 2 hours daily managing order confusion. We can't track inventory accurately so we run out of items without knowing.",
    required: true,
  },
  {
    id: "ioc_inventory",
    type: "multiple_choice",
    question: "How do you currently manage your inventory or stock?",
    required: true,
    choices: [
      { key: "A", label: "Manually — by eye or on paper" },
      { key: "B", label: "Spreadsheets" },
      { key: "C", label: "A separate tool that doesn't connect to orders" },
      { key: "D", label: "We don't track it at all right now" },
    ],
  },
  {
    id: "ioc_staffcount",
    type: "multiple_choice",
    question: "How many staff members need access to the system?",
    required: true,
    choices: [
      { key: "A", label: "Just me — owner-operated" },
      { key: "B", label: "2–5 people" },
      { key: "C", label: "6–20 people" },
      { key: "D", label: "More than 20" },
    ],
  },

  // ── Section: What You Need ──
  {
    id: "ioc_storefront",
    type: "multiple_choice",
    question: "Does the customer-facing storefront or menu need to be publicly accessible on the web?",
    required: true,
    choices: [
      { key: "A", label: "Yes — customers should be able to browse and order from any device" },
      { key: "B", label: "Yes — but primarily for in-store QR code use" },
      { key: "C", label: "Partially — some items are public, others require login" },
      { key: "D", label: "No — the admin and back-office side is what matters most" },
    ],
  },
  {
    id: "ioc_features",
    type: "multiple_choice_multi",
    question: "Which features are must-haves for your system? Select all that apply.",
    required: true,
    choices: [
      { key: "A", label: "Online ordering with real-time status updates" },
      { key: "B", label: "Table / delivery / pickup order types" },
      { key: "C", label: "Low-stock alerts and inventory management" },
      { key: "D", label: "Discount codes or promotional pricing" },
      { key: "E", label: "Multiple staff roles and access levels" },
    ],
  },
  {
    id: "ioc_payment",
    type: "multiple_choice",
    question: "Do you need the system to process online payments?",
    required: true,
    choices: [
      { key: "A", label: "Yes — I want customers to pay online at checkout" },
      { key: "B", label: "No — cash on delivery or in-person payment is fine for now" },
      { key: "C", label: "Both — online and cash options" },
      { key: "D", label: "Not yet, but I want the architecture to support it later" },
    ],
  },
  {
    id: "ioc_catalog",
    type: "multiple_choice",
    question: "How large is your product or menu catalog?",
    required: true,
    choices: [
      { key: "A", label: "Under 30 items" },
      { key: "B", label: "30–100 items" },
      { key: "C", label: "100–300 items" },
      { key: "D", label: "300+ items" },
    ],
  },
  {
    id: "ioc_brand",
    type: "multiple_choice",
    question: "Do you have a brand identity (logo, colors, fonts) for the storefront to be designed within?",
    required: true,
    choices: [
      { key: "A", label: "Yes — full brand assets ready" },
      { key: "B", label: "Yes — basic logo and rough colors" },
      { key: "C", label: "No — I need branding work alongside this" },
      { key: "D", label: "No — keep the design functional, branding can come later" },
    ],
  },

  // ── Section: Book ──
  BASE_QUESTIONS.find(q => q.id === "reference"),
  BASE_QUESTIONS.find(q => q.id === "meeting"),
]

export const ITEM_ORDER_COMMERCE_SECTIONS = [
  {
    id: "you",
    title: "Item & Order Commerce Application",
    description: "The basics before we get into your operation.",
    questionIds: ["name", "email", "companyname", "website"],
  },
  {
    id: "yourbusiness",
    title: "Your Business",
    description: "What you run and how big it is shapes everything about the system we build.",
    questionIds: ["ioc_businesstype", "ioc_locations", "ioc_volume"],
  },
  {
    id: "operationstoday",
    title: "Your Operations Today",
    description: "We need to know exactly what's broken before we can build what replaces it.",
    questionIds: ["ioc_currentmethod", "ioc_operationalpain", "ioc_inventory", "ioc_staffcount"],
  },
  {
    id: "whatyouneed",
    title: "What You Need",
    description: "The clearer you are here, the more accurately we can scope and quote.",
    questionIds: ["ioc_storefront", "ioc_features", "ioc_payment", "ioc_catalog", "ioc_brand"],
  },
  {
    id: "book",
    title: "Last Step",
    description: "How did you find us, and pick a time to talk.",
    questionIds: ["reference", "meeting"],
  },
]


// ─── 06. CUSTOM INTERNAL SYSTEM ($4,500+) ────────────────────────────────────
// Target: companies with complex operational needs no SaaS solves.
// Goal:   Scope the problem thoroughly, confirm decision authority, and
//         filter out clients who want SaaS replacements vs. custom systems.

export const CUSTOM_INTERNAL_SYSTEM_QUESTIONS = [
  // ── Section: You ──
  BASE_QUESTIONS.find(q => q.id === "name"),
  BASE_QUESTIONS.find(q => q.id === "email"),
  BASE_QUESTIONS.find(q => q.id === "companyname"),
  BASE_QUESTIONS.find(q => q.id === "website"),

  // ── Section: Your Business ──
  {
    id: "cis_industry",
    type: "text",
    question: "What industry are you in, and what does your company do at a high level?",
    placeholder: "e.g. Logistics company managing fleet operations across 3 cities / HR consultancy managing 200+ contractors.",
    required: true,
  },
  {
    id: "cis_size",
    type: "multiple_choice",
    question: "How many people will be actively using this system?",
    required: true,
    choices: [
      { key: "A", label: "5–15 users" },
      { key: "B", label: "15–50 users" },
      { key: "C", label: "50–200 users" },
      { key: "D", label: "200+ users" },
    ],
  },

  // ── Section: The Problem ──
  {
    id: "cis_currenttools",
    type: "textarea",
    question: "What tools or systems are you using to manage this workflow right now?",
    placeholder: "e.g. A combination of Google Sheets, WhatsApp groups, and a shared Notion page. / We use Zoho but it doesn't handle our custom approval chains.",
    required: true,
  },
  {
    id: "cis_whybroken",
    type: "textarea",
    question: "What is specifically broken or missing in how you operate today? What has this already cost you — in time, errors, or missed revenue?",
    placeholder: "Be as specific as possible. Numbers help: e.g. We lose 8 hours/week manually reconciling data across three tools. We've had 2 major errors in the last quarter due to missed handoffs.",
    required: true,
  },
  {
    id: "cis_whynotSaaS",
    type: "multiple_choice",
    question: "Have you explored off-the-shelf SaaS solutions for this?",
    required: true,
    choices: [
      { key: "A", label: "Yes — nothing on the market fits our specific workflow" },
      { key: "B", label: "Yes — we tried one and it didn't work for us" },
      { key: "C", label: "No — our workflow is too unique for standard tools" },
      { key: "D", label: "We use SaaS for parts of it, but the gaps between tools are the problem" },
    ],
  },

  // ── Section: What You're Building ──
  {
    id: "cis_systemtype",
    type: "multiple_choice_multi",
    question: "What type of system is this? Select all that apply.",
    required: true,
    choices: [
      { key: "A", label: "Operations or workflow management" },
      { key: "B", label: "Fleet, logistics, or delivery tracking" },
      { key: "C", label: "HR, staff management, or payroll processing" },
      { key: "D", label: "Booking, scheduling, or appointment system" },
      { key: "E", label: "Approval, request, or sign-off workflow" },
    ],
  },
  {
    id: "cis_roletypes",
    type: "textarea",
    question: "List the different types of users who will use the system and what each of them needs to be able to do.",
    placeholder: "e.g. Admin — full access to all data and settings. Operations Manager — can view and assign tasks, cannot edit billing. Field Staff — can only update their own task status via mobile.",
    required: true,
  },
  {
    id: "cis_reporting",
    type: "multiple_choice_multi",
    question: "What data outputs or reports does this system need to produce? Select all that apply.",
    required: true,
    choices: [
      { key: "A", label: "Real-time dashboards for operations visibility" },
      { key: "B", label: "Scheduled reports exported to PDF or spreadsheet" },
      { key: "C", label: "Audit logs and activity history" },
      { key: "D", label: "Financial or billing summaries" },
      { key: "E", label: "Performance or KPI tracking per user or team" },
    ],
  },
  {
    id: "cis_integrations",
    type: "textarea",
    question: "Does this system need to connect with anything that already exists — tools, databases, APIs, or third-party platforms?",
    placeholder: "e.g. Must sync with our existing QuickBooks account. / Needs to pull from our Shopify orders. / Should send notifications via WhatsApp Business API.",
    required: false,
  },
  {
    id: "cis_mobile",
    type: "multiple_choice",
    question: "Does any part of this system need to work on mobile for field staff or on-the-go users?",
    required: true,
    choices: [
      { key: "A", label: "Yes — mobile-first is critical for a portion of users" },
      { key: "B", label: "Yes — mobile-accessible but desktop is the primary surface" },
      { key: "C", label: "No — this is a purely desktop/web-based internal tool" },
      { key: "D", label: "Not sure — depends on the scoping conversation" },
    ],
  },

  // ── Section: Authority & Timeline ──
  {
    id: "cis_decision",
    type: "multiple_choice",
    question: "Who within your organization approves and owns this project?",
    required: true,
    choices: [
      { key: "A", label: "Me — I have full authority and budget" },
      { key: "B", label: "Me and a technical or operations co-lead" },
      { key: "C", label: "Requires sign-off from a director, CTO, or CEO" },
      { key: "D", label: "Multiple departments are involved in the decision" },
    ],
  },
  {
    id: "cis_techteam",
    type: "multiple_choice",
    question: "Do you have an internal technical team who will be involved in this project?",
    required: true,
    choices: [
      { key: "A", label: "Yes — we have developers who will be involved or take over after launch" },
      { key: "B", label: "Yes — a CTO or tech lead who needs to approve architecture decisions" },
      { key: "C", label: "No — we're fully outsourcing this and need ongoing support post-launch" },
      { key: "D", label: "No — but we plan to hire someone after this is built" },
    ],
  },
  {
    id: "cis_timeline",
    type: "multiple_choice",
    question: "What does the timeline look like for this?",
    required: true,
    choices: [
      { key: "A", label: "Urgent — operational issues are costing us now, need to move in weeks" },
      { key: "B", label: "3–6 months is the target window" },
      { key: "C", label: "6–12 months — this is a planned transformation" },
      { key: "D", label: "We're in early planning — timeline is TBD" },
    ],
  },
  {
    id: "cis_notes",
    type: "textarea",
    question: "Is there anything else we should know before the call — constraints, sensitivities, previous attempts, etc..?",
    placeholder: "No filter needed. The more we know before the call, the more focused and useful the conversation will be.",
    required: false,
  },

  // ── Section: Book ──
  BASE_QUESTIONS.find(q => q.id === "reference"),
  BASE_QUESTIONS.find(q => q.id === "meeting"),
]

export const CUSTOM_INTERNAL_SYSTEM_SECTIONS = [
  {
    id: "you",
    title: "Custom Internal System Application",
    description: "Just a couple of basics to get going.",
    questionIds: ["name", "email", "companyname", "website"],
  },
  {
    id: "yourbusiness",
    title: "Your Business",
    description: "Before we can scope a solution, we need to understand what you run and at what scale.",
    questionIds: ["cis_industry", "cis_size"],
  },
  {
    id: "theproblem",
    title: "The Problem",
    description: "This is the most important section. The more honest and specific you are, the better we can scope.",
    questionIds: ["cis_currenttools", "cis_whybroken", "cis_whynotSaaS"],
  },
  {
    id: "whatyourebuilding",
    title: "What You're Building",
    description: "Help us understand the shape of the system before we talk.",
    questionIds: ["cis_systemtype", "cis_roletypes", "cis_reporting", "cis_integrations", "cis_mobile"],
  },
  {
    id: "authorityandtimeline",
    title: "Authority & Timeline",
    description: "We need to understand how this gets approved and how urgently it's needed.",
    questionIds: ["cis_decision", "cis_techteam", "cis_timeline", "cis_notes"],
  },
  {
    id: "book",
    title: "Last Step",
    description: "How did you find us, and book your scoping session.",
    questionIds: ["reference", "meeting"],
  },
]


// ─────────────────────────────────────────────────────────────────────────────
// ██████  BUNDLED OFFERS
// ─────────────────────────────────────────────────────────────────────────────

// ─── 07. DIGITAL PRESENCE BUNDLE ($2,400) ────────────────────────────────────
// Target: first-time founders needing brand + website together.
// Goal:   Confirm they need both, that they're ready to start, and that they
//         understand the value of integration over doing them separately.

export const DIGITAL_PRESENCE_QUESTIONS = [
  // ── Section: You ──
  BASE_QUESTIONS.find(q => q.id === "name"),
  BASE_QUESTIONS.find(q => q.id === "email"),
  BASE_QUESTIONS.find(q => q.id === "companyname"),

  // ── Section: Your Business ──
  {
    id: "dp_whatyoudo",
    type: "text",
    question: "What does your business do and who is it for?",
    placeholder: "e.g. I run a personal styling service for professional women in Beirut.",
    required: true,
  },
  {
    id: "dp_stage",
    type: "multiple_choice",
    question: "Where are you right now?",
    required: true,
    choices: [
      { key: "A", label: "Pre-launch — I'm building toward going live" },
      { key: "B", label: "Soft-launch — I'm operating but not officially 'out there' yet" },
      { key: "C", label: "Running — I have clients but no professional digital presence" },
      { key: "D", label: "Restarting — I'm rebuilding after a pivot or rebrand" },
    ],
  },
  {
    id: "dp_why",
    type: "multiple_choice",
    question: "What's the main reason you need a brand and website now?",
    required: true,
    choices: [
      { key: "A", label: "I need to look credible enough for my target clients to take me seriously" },
      { key: "B", label: "I'm losing potential clients because they search for me and find nothing" },
      { key: "C", label: "I'm relying entirely on referrals and want to build something that works without me" },
      { key: "D", label: "I have a launch or event coming up and need everything ready" },
    ],
  },

  // ── Section: Brand ──
  {
    id: "dp_currentbrand",
    type: "multiple_choice",
    question: "What visual identity do you currently have?",
    required: true,
    choices: [
      { key: "A", label: "Nothing — starting completely from zero" },
      { key: "B", label: "A basic logo or wordmark I use informally" },
      { key: "C", label: "Something a friend or freelancer made that I've outgrown" },
      { key: "D", label: "Colors and fonts I use but nothing official or documented" },
    ],
  },
  {
    id: "dp_brandfeel",
    type: "textarea",
    question: "Write 3–5 words that describe how you want your brand to feel to someone encountering it for the first time.",
    placeholder: "e.g. Warm, elevated, personal, trustworthy, quiet confidence...",
    required: true,
  },
  {
    id: "dp_brandreference",
    type: "textarea",
    question: "Name one brand — in any industry — whose look and feel resonates with what you're going for. What specifically draws you to it?",
    placeholder: "e.g. Glossier — it feels personal and community-driven, not corporate. Everything looks considered but not overdone.",
    required: false,
  },

  // ── Section: Website ──
  {
    id: "dp_sitepurpose",
    type: "multiple_choice",
    question: "What is the primary job of your website?",
    required: true,
    choices: [
      { key: "A", label: "Build credibility and make me look legit" },
      { key: "B", label: "Generate enquiries and bookings" },
      { key: "C", label: "Explain what I do and who it's for" },
      { key: "D", label: "All of the above — it needs to do real work" },
    ],
  },
  {
    id: "dp_contentready",
    type: "multiple_choice",
    question: "When it comes to copy and content for the site — how ready are you?",
    required: true,
    choices: [
      { key: "A", label: "I have everything written" },
      { key: "B", label: "I have a rough draft" },
      { key: "C", label: "I know what I want to say but nothing is written yet" },
      { key: "D", label: "I need help figuring out what to say" },
    ],
  },

  // ── Section: Readiness ──
  {
    id: "dp_decision",
    type: "multiple_choice",
    question: "Who is the final decision-maker on this project?",
    required: true,
    choices: [
      { key: "A", label: "Me alone" },
      { key: "B", label: "Me and a partner or co-founder" },
      { key: "C", label: "I need to discuss with someone else before committing" },
    ],
  },
  {
    id: "dp_timeline",
    type: "multiple_choice",
    question: "When do you need this live?",
    required: true,
    choices: [
      { key: "A", label: "As soon as possible — I should have done this already" },
      { key: "B", label: "Within 6 weeks" },
      { key: "C", label: "Within 2–3 months" },
      { key: "D", label: "I'm planning ahead, no hard deadline" },
    ],
  },
  {
    id: "dp_separately",
    type: "multiple_choice",
    question: "Have you considered doing the brand and website with different providers?",
    required: true,
    choices: [
      { key: "A", label: "No — I want one team who handles both" },
      { key: "B", label: "Yes, but I've seen it go wrong when they're disconnected" },
      { key: "C", label: "I'm still weighing it — I want to understand the difference" },
      { key: "D", label: "I already tried it separately and it didn't work" },
    ],
  },

  // ── Section: Book ──
  BASE_QUESTIONS.find(q => q.id === "reference"),
  BASE_QUESTIONS.find(q => q.id === "meeting"),
]

export const DIGITAL_PRESENCE_SECTIONS = [
  {
    id: "you",
    title: "Digital Presence Bundle Application",
    description: "Just the basics first.",
    questionIds: ["name", "email", "companyname"],
  },
  {
    id: "yourbusiness",
    title: "Your Business",
    description: "Context before everything. Help us understand what you're building and why now.",
    questionIds: ["dp_whatyoudo", "dp_stage", "dp_why"],
  },
  {
    id: "brand",
    title: "Your Brand",
    description: "The Visual Foundation side of this bundle — what exists and what you want.",
    questionIds: ["dp_currentbrand", "dp_brandfeel", "dp_brandreference"],
  },
  {
    id: "website",
    title: "Your Website",
    description: "The Marketing System side — what you need it to do.",
    questionIds: ["dp_sitepurpose", "dp_contentready"],
  },
  {
    id: "readiness",
    title: "Readiness",
    description: "A few things we need to know before we can move forward.",
    questionIds: ["dp_decision", "dp_timeline", "dp_separately"],
  },
  {
    id: "book",
    title: "Last Step",
    description: "How did you find us, and book a time.",
    questionIds: ["reference", "meeting"],
  },
]


// ─── 08. AUTHORITY+ BUNDLE ($5,100) ──────────────────────────────────────────
// Target: growing businesses losing deals to competitors who look more established.
// Goal:   Surface the direct revenue cost of their current brand and website,
//         confirm they understand this is a system (not cosmetic), and qualify
//         on authority, urgency, and investment alignment.

export const AUTHORITY_PLUS_QUESTIONS = [
  // ── Section: You ──
  BASE_QUESTIONS.find(q => q.id === "name"),
  BASE_QUESTIONS.find(q => q.id === "email"),
  BASE_QUESTIONS.find(q => q.id === "companyname"),
  BASE_QUESTIONS.find(q => q.id === "website"),

  // ── Section: Your Business ──
  {
    id: "ap_industry",
    type: "text",
    question: "What industry are you in, and who do you primarily sell to?",
    placeholder: "e.g. B2B software consultancy / Luxury interior design studio / Regional FMCG distributor.",
    required: true,
  },
  {
    id: "ap_revenue",
    type: "multiple_choice",
    question: "What's the best way to describe your business right now?",
    required: true,
    choices: [
      { key: "A", label: "Growing — we have clients and revenue but we're not systematic yet" },
      { key: "B", label: "Scaling — we're growing but the brand and website are holding us back" },
      { key: "C", label: "Established — we're running well but losing ground to better-branded competitors" },
      { key: "D", label: "Pivoting — the business has changed and the brand no longer represents us" },
    ],
  },
  {
    id: "ap_competition",
    type: "textarea",
    question: "Name 1–2 competitors or businesses in your space that you think look more credible or established than you do. What gives them that advantage visually?",
    placeholder: "e.g. Agency X — their website is clean and positions them as premium. Their case studies do the selling for them. We look like a startup, they look like a firm.",
    required: true,
  },

  // ── Section: The Problem ──
  {
    id: "ap_costofbrand",
    type: "multiple_choice",
    question: "What has your current brand or website directly cost you?",
    required: true,
    choices: [
      { key: "A", label: "Lost deals — prospects went with a competitor who looked more established" },
      { key: "B", label: "Unqualified leads — the wrong clients keep reaching out" },
      { key: "C", label: "Price compression — clients push back on price because we don't look premium" },
      { key: "D", label: "All of the above — it's an active drag on revenue" },
    ],
  },
  {
    id: "ap_websitereality",
    type: "multiple_choice",
    question: "What is your website actually doing for you right now?",
    required: true,
    choices: [
      { key: "A", label: "Nothing — it's a digital business card at best" },
      { key: "B", label: "It generates enquiries but they're the wrong type" },
      { key: "C", label: "It looks outdated compared to who we're actually selling to" },
      { key: "D", label: "It doesn't exist or isn't live yet" },
    ],
  },
  {
    id: "ap_brandreality",
    type: "multiple_choice",
    question: "How consistent and professional is your brand across all touchpoints today?",
    required: true,
    choices: [
      { key: "A", label: "Looks different everywhere — social, website, and proposals don't match" },
      { key: "B", label: "Consistent but clearly not at the level of who we're trying to sell to" },
      { key: "C", label: "It was fine two years ago — we've outgrown it" },
      { key: "D", label: "It's never been done properly — we've been getting by without it" },
    ],
  },

  // ── Section: Brand Vision ──
  {
    id: "ap_brandfeel",
    type: "textarea",
    question: "When your ideal client encounters your brand for the first time; what should they feel, and immediately understand about you?",
    placeholder: "e.g. They should feel like they've found the serious option in a sea of generics. They should understand immediately that we charge more and are worth it.",
    required: true,
  },
  {
    id: "ap_sitejob",
    type: "multiple_choice",
    question: "What is the primary conversion job of your new website?",
    required: true,
    choices: [
      { key: "A", label: "Book discovery calls from qualified prospects" },
      { key: "B", label: "Support the sales process — send prospects here after first contact" },
      { key: "C", label: "Generate inbound leads from search and content" },
      { key: "D", label: "All of the above — it needs to be a full lead-generation system" },
    ],
  },
  {
    id: "ap_existing",
    type: "textarea",
    question: "What, if anything, is working about your current brand and website? What should we keep or build on?",
    placeholder: "e.g. Our color palette is strong. / The case studies on our site are good, they just don't convert. / Nothing — we're starting from scratch.",
    required: false,
  },

  // ── Section: Scope & Authority ──
  {
    id: "ap_webtype",
    type: "multiple_choice",
    question: "What type of web system does your business need?",
    required: true,
    choices: [
      { key: "A", label: "Lead generation site (I sell services or expertise)" },
      { key: "B", label: "Storefront and order management (I sell products or run F&B)" },
      { key: "C", label: "Both — I need a brand platform and a commerce or ordering system" },
      { key: "D", label: "Not entirely sure — I need guidance in the discovery call" },
    ],
  },
  {
    id: "ap_decision",
    type: "multiple_choice",
    question: "Who owns the final decision on this project — both the brand and website direction?",
    required: true,
    choices: [
      { key: "A", label: "Me alone" },
      { key: "B", label: "Me and a co-founder or business partner" },
      { key: "C", label: "Me and a marketing or brand lead" },
      { key: "D", label: "Multiple stakeholders — I'll need to bring others into the process" },
    ],
  },
  {
    id: "ap_pastexperience",
    type: "textarea",
    question: "Have you worked with an agency on brand or web before? If so — what happened and what would you do differently?",
    placeholder: "Be honest. Bad past experiences tell us exactly what to protect against.",
    required: false,
  },
  {
    id: "ap_timeline",
    type: "multiple_choice",
    question: "What's driving the timeline for this project?",
    required: true,
    choices: [
      { key: "A", label: "A specific event, launch, or campaign with a fixed date" },
      { key: "B", label: "We want to complete this within 3 months" },
      { key: "C", label: "Revenue pressure — the current situation is costing us now" },
      { key: "D", label: "No hard deadline — we want it done right" },
    ],
  },

  // ── Section: Book ──
  BASE_QUESTIONS.find(q => q.id === "reference"),
  BASE_QUESTIONS.find(q => q.id === "meeting"),
]

export const AUTHORITY_PLUS_SECTIONS = [
  {
    id: "you",
    title: "Authority+ Bundle Application",
    description: "Just a couple of basics to get going.",
    questionIds: ["name", "email", "companyname", "website"],
  },
  {
    id: "yourbusiness",
    title: "Your Business",
    description: "Context before everything.",
    questionIds: ["ap_industry", "ap_revenue", "ap_competition"],
  },
  {
    id: "theproblem",
    title: "The Problem",
    description: "We need to understand what your current brand and website are actually costing you.",
    questionIds: ["ap_costofbrand", "ap_websitereality", "ap_brandreality"],
  },
  {
    id: "brandvision",
    title: "Brand & Web Vision",
    description: "What the outcome looks like — before we talk about how to get there.",
    questionIds: ["ap_brandfeel", "ap_sitejob", "ap_existing"],
  },
  {
    id: "scope",
    title: "Scope & Authority",
    description: "We need to align on what you're building and who drives the decisions.",
    questionIds: ["ap_webtype", "ap_decision", "ap_pastexperience", "ap_timeline"],
  },
  {
    id: "book",
    title: "Last Step",
    description: "How did you find us, and book your discovery session.",
    questionIds: ["reference", "meeting"],
  },
]


// ─── 09. TOTAL INFRASTRUCTURE BUNDLE ($6,500+) ───────────────────────────────
// Target: founders scaling, hiring, or raising — complex brand + system needs.
// Goal:   This is the most thorough intake. Qualify organizational readiness,
//         confirm scope across both brand and technical systems, and surface
//         the strategic driver (growth, fundraise, franchise, etc.).

export const TOTAL_INFRASTRUCTURE_QUESTIONS = [
  // ── Section: You ──
  BASE_QUESTIONS.find(q => q.id === "name"),
  BASE_QUESTIONS.find(q => q.id === "email"),
  BASE_QUESTIONS.find(q => q.id === "companyname"),
  BASE_QUESTIONS.find(q => q.id === "website"),

  // ── Section: Your Organization ──
  {
    id: "ti_industry",
    type: "text",
    question: "What industry are you in, and what does your company do at a high level?",
    placeholder: "e.g. Regional logistics company managing 300 daily deliveries across 4 cities / SaaS platform for hospitality operators with 50 clients.",
    required: true,
  },
  {
    id: "ti_size",
    type: "multiple_choice",
    question: "How large is your organization today?",
    required: true,
    choices: [
      { key: "A", label: "5–20 people" },
      { key: "B", label: "20–75 people" },
      { key: "C", label: "75–200 people" },
      { key: "D", label: "200+ people" },
    ],
  },
  {
    id: "ti_driver",
    type: "multiple_choice",
    question: "What is the primary business event driving this investment?",
    required: true,
    choices: [
      { key: "A", label: "Fundraising — preparing for investor conversations" },
      { key: "B", label: "Scaling — growing into new markets, channels, or products" },
      { key: "C", label: "Hiring — the team is growing and the brand needs to work without the founder" },
      { key: "D", label: "Partnership or franchise — third parties will operate under our brand and system" },
    ],
  },
  {
    id: "ti_cost_of_delay",
    type: "textarea",
    question: "What is the actual cost of not having this done in the next 90 days? What has it already cost you?",
    placeholder: "e.g. We lost a distribution deal because our brand materials looked inconsistent with our pitch deck. / Our ops team is drowning in manual work — we're scaling the wrong way.",
    required: true,
  },

  // ── Section: Your Current Brand ──
  {
    id: "ti_brandstatus",
    type: "multiple_choice",
    question: "What's the most accurate description of your brand situation today?",
    required: true,
    choices: [
      { key: "A", label: "We have a brand but no governance — different people use it differently" },
      { key: "B", label: "We have a brand that no longer matches the company we've become" },
      { key: "C", label: "We need a complete brand rebuild — the current one was never done properly" },
      { key: "D", label: "We have a strong brand but no documentation for others to work from" },
    ],
  },
  {
    id: "ti_branddocs",
    type: "multiple_choice",
    question: "What brand documentation currently exists?",
    required: true,
    choices: [
      { key: "A", label: "Logo files only" },
      { key: "B", label: "Logo, colors, and fonts — but nothing documented or structured" },
      { key: "C", label: "A basic brand guide that's outdated or incomplete" },
      { key: "D", label: "Partial guidelines that different teams interpret differently" },
    ],
  },
  {
    id: "ti_brandusers",
    type: "multiple_choice_multi",
    question: "Who outside your core team will need to work with your brand system? Select all that apply.",
    required: true,
    choices: [
      { key: "A", label: "External marketing or creative agencies" },
      { key: "B", label: "Investors, board members, or institutional partners" },
      { key: "C", label: "Franchise operators or regional teams" },
      { key: "D", label: "Internal staff across multiple departments" },
      { key: "E", label: "External developers or product contractors" },
    ],
  },

  // ── Section: Your Current Systems ──
  {
    id: "ti_currentops",
    type: "textarea",
    question: "How are your core operations managed today — what tools, workflows, and manual processes hold everything together?",
    placeholder: "e.g. We use Google Sheets for ops tracking, WhatsApp for team communication, and a fragmented CRM. The handoffs between departments are manual and error-prone.",
    required: true,
  },
  {
    id: "ti_systemtype",
    type: "multiple_choice_multi",
    question: "What type of digital system does your organization need? Select all that apply.",
    required: true,
    choices: [
      { key: "A", label: "Operations or workflow management platform" },
      { key: "B", label: "Commerce or ordering system (for customers)" },
      { key: "C", label: "Logistics, fleet, or delivery management" },
      { key: "D", label: "HR, staff, or contractor management" },
      { key: "E", label: "Client-facing portal or dashboard" },
    ],
  },
  {
    id: "ti_systemscale",
    type: "multiple_choice",
    question: "How many users will actively use the digital system?",
    required: true,
    choices: [
      { key: "A", label: "Under 25 users" },
      { key: "B", label: "25–100 users" },
      { key: "C", label: "100–500 users" },
      { key: "D", label: "500+ users" },
    ],
  },
  {
    id: "ti_integrations",
    type: "textarea",
    question: "List any existing tools, platforms, or data sources this system needs to connect with.",
    placeholder: "e.g. Must integrate with Xero for financial reconciliation / Pull data from our Shopify store / Send notifications through WhatsApp Business API.",
    required: false,
  },

  // ── Section: Governance & Authority ──
  {
    id: "ti_decision",
    type: "multiple_choice",
    question: "Who is the final decision-maker across both the brand and system components of this project?",
    required: true,
    choices: [
      { key: "A", label: "Me — I have full authority on both" },
      { key: "B", label: "Me and a technical co-lead (CTO or Head of Product)" },
      { key: "C", label: "Me and a business co-founder or partner" },
      { key: "D", label: "A cross-functional leadership team" },
    ],
  },
  {
    id: "ti_techteam",
    type: "multiple_choice",
    question: "Do you have an internal technical team who will be involved?",
    required: true,
    choices: [
      { key: "A", label: "Yes — a CTO or tech lead who will need to approve architecture" },
      { key: "B", label: "Yes — developers who will take ownership after launch" },
      { key: "C", label: "No — we're fully outsourcing and need post-launch support" },
      { key: "D", label: "No — but we're hiring as part of this scale-up" },
    ],
  },
  {
    id: "ti_pastvendors",
    type: "textarea",
    question: "Have you worked with agencies or vendors on brand or technical systems before? What worked, what didn't — and what are you protecting against this time?",
    placeholder: "Be direct. We use this to scope the project structure and protect both sides.",
    required: false,
  },
  {
    id: "ti_timeline",
    type: "multiple_choice",
    question: "What's driving the timeline for this?",
    required: true,
    choices: [
      { key: "A", label: "A hard external date — funding round, launch, or board presentation" },
      { key: "B", label: "Operational pressure — the current situation is unsustainable" },
      { key: "C", label: "A 6-month strategic plan we need to execute" },
      { key: "D", label: "We're planning ahead — we have time to do this properly" },
    ],
  },
  {
    id: "ti_notes",
    type: "textarea",
    question: "Is there anything we should know before the call that didn't fit a checkbox? Constraints, sensitivities, political complexity, or context that would change how we approach this?",
    placeholder: "No filter. The more we know before we sit down, the more useful the conversation will be for both sides.",
    required: false,
  },

  // ── Section: Book ──
  BASE_QUESTIONS.find(q => q.id === "reference"),
  BASE_QUESTIONS.find(q => q.id === "meeting"),
]

export const TOTAL_INFRASTRUCTURE_SECTIONS = [
  {
    id: "you",
    title: "Total Infastructure Bundle Application",
    description: "Just a couple of basics to get going.",
    questionIds: ["name", "email", "companyname", "website"],
  },
  {
    id: "yourorg",
    title: "Your Organization",
    description: "Before we can scope anything, we need to understand the scale, the context, and the urgency.",
    questionIds: ["ti_industry", "ti_size", "ti_driver", "ti_cost_of_delay"],
  },
  {
    id: "yourbrand",
    title: "Your Current Brand",
    description: "Where the brand stands today — and how far it needs to go.",
    questionIds: ["ti_brandstatus", "ti_branddocs", "ti_brandusers"],
  },
  {
    id: "yoursystems",
    title: "Your Current Systems",
    description: "The operational reality before we design the solution.",
    questionIds: ["ti_currentops", "ti_systemtype", "ti_systemscale", "ti_integrations"],
  },
  {
    id: "governance",
    title: "Governance & Authority",
    description: "How decisions get made at your organization — and what we're building the project structure around.",
    questionIds: ["ti_decision", "ti_techteam", "ti_pastvendors", "ti_timeline", "ti_notes"],
  },
  {
    id: "book",
    title: "Last Step",
    description: "How did you find us, and book your discovery session.",
    questionIds: ["reference", "meeting"],
  },
]