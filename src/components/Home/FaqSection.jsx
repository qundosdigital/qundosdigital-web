import React, { useState, useRef, useEffect, memo, useCallback } from 'react'
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion'
import CTAButton from '../CTAButton'
import { QuestionMarkCircleIcon } from '@heroicons/react/16/solid'

const FAQS = [
  {
    id: 'f1',
    question: 'We already have a brand. Do we have to start from scratch?',
    answer: 'No. we\'ll tell you exactly what\'s already working and what a buyer or enterprise client would push back on. Most founders are stronger than they think in a few areas; and quietly bleeding in two or three they haven\'t looked at closely.',
  },
  {
    id: 'f2',
    question: 'What if the timing doesn\'t work and how long is the wait?',
    answer: 'We take 10 to 12 new clients per month because the work requires full attention. If we\'re at capacity when you book, we\'ll tell you exactly when the next opening is and hold it. We won\'t rush an existing client to fit you in.',
  },
  {
    id: 'f3',
    question: 'Already worked with agencies. Why would this be different?',
    answer: 'Because we don\'t reset your strategy. We start with an audit that shows you exactly what\'s broken and why, and every deliverable flows from one agreed document; not a new account manager\'s opinion six months in.',
  },
  {
    id: 'f4',
    question: 'How involved do I need to be during the process?',
    answer: 'Three focused sessions — the audit, the strategy sign-off, and the final handoff. Outside of those, we run the build. You\'re not managing the project; you\'re approving the direction.',
  },
  {
    id: 'f5',
    question: 'After the engagement ends, are we on our own?',
    answer: 'You receive a complete handoff package: every file, every system, every document, organized and ready to run. If anything needs calibration after launch, we stay available for 10 days at no additional cost.',
  },
]

// Measure real content height for the animation without layout thrash
function useContentHeight(open) {
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

  return { ref, height }
}

const FAQItem = memo(({ faq, isOpen, onToggle, index }) => {
  const { ref, height } = useContentHeight(isOpen)

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, delay: index * 0.03, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`border border-border rounded-xl overflow-hidden transition-colors duration-300
        ${isOpen ? 'bg-bg ' : 'bg-bg'}`}
    >
      {/* Question row */}
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 px-5 py-4 sm:py-5 text-left group cursor-pointer"
        aria-expanded={isOpen}
      >
        <span className={`text-[14px] sm:text-[15px] font-semibold leading-snug transition-colors duration-200 select-none
          ${isOpen ? 'text-primary' : 'text-text'}`}>
          {faq.question}
        </span>

        {/* Animated +/− icon */}
        <span className={`shrink-0 w-6 h-6 rounded-full border flex items-center justify-center mt-0.5 transition-all duration-300
          ${isOpen ? 'border-primary text-primary rotate-0' : 'border-border text-text group-hover:border-primary group-hover:text-primary'}`}>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex items-center justify-center w-full h-full"
          >
            {isOpen
              ? <MinusIcon className="w-3 h-3" />
              : <PlusIcon  className="w-3 h-3" />
            }
          </motion.span>
        </span>
      </button>

      {/* Answer — animates height + opacity, no layout jump */}
      <motion.div
        animate={{ height: isOpen ? height : 0, opacity: isOpen ? 1 : 0 }}
        transition={{
          height:  { duration: 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
          opacity: { duration: isOpen ? 0.18 : 0.12, delay: isOpen ? 0.08 : 0, ease: 'easeInOut' },
        }}
        style={{ overflow: 'hidden' }}
      >
        <div ref={ref} className="px-5 pb-5">
          {/* Subtle top rule */}
          <div className="bg-subPrimary/25 p-3 rounded-md">
              <p className="text-[13px] sm:text-[14px] text-text font-medium leading-relaxed text-justify select-none">
                {faq.answer}
              </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
})

export default function FAQSection() {
  const [openId, setOpenId] = useState(FAQS[0].id)

  const toggle = useCallback((id) => {
    setOpenId((prev) => (prev === id ? null : id))
  }, [])

  return (
    <section className="w-full px-8 md:px-12 lg:px-20 xl:px-44 2xl:px-56 pt-8 sm:pt-12 lg:pt-15 bg-bg">
      <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-16 lg:gap-24 font-primary">

        {/* ── Left: heading + subtext + CTA ── */}
        <div className="flex flex-1 flex-col gap-20 md:sticky md:top-24 shrink-0 md:w-70 lg:w-75">

            {/* Badge */}
            <div className="flex flex-col gap-5">
                <div className="border border-primary px-3 py-0.5 w-min rounded-full">
                    <p className="text-[12px] sm:text-[13px] text-primary font-primary font-semibold italic w-max select-none">FAQs</p>
                </div>
                {/* Heading */}
                <h2 className="text-[25px] sm:text-[36px] font-secondary text-text leading-[32.5px] md:leading-11 tracking-tight select-none">
                  Everything You Wonder{' '}<br />
                  <span className="text-primary">Before Booking</span>
                </h2>
                {/* Description */}
                <p className="text-[14px] sm:text-[16px] font-primary text-text leading-6 text-justify md:max-w-lg md:pt-5 select-none">
                  Discover answers to questions we're asked by founders most often. Created to help you understand how everything works.
                </p>
            </div>

          {/* CTA — wide: inline with line, mobile: bottom of section */}
          

            <div className="hidden md:flex items-center mt-8 gap-3 w-full 2xl:w-[80%]">
                <p className="text-[13px] text-text opacity-60 leading-snug select-none w-[60%] 3xl:w-[40%]">
                For any additional inquiries, our support team is always ready to assist.
                </p>
                <div className="flex-1 h-px bg-border" />
                  <CTAButton variant='outlined' link='/sendinquiry'>
                    <div className="flex w-max items-center justify-center gap-2">
                      <QuestionMarkCircleIcon className="w-4 h-4" />
                      Send Inquiry
                    </div>
                  </CTAButton>
            </div>
        </div>

        {/* ── Right: accordion ── */}
        <div className="flex-1 flex flex-col gap-3">
          {FAQS.map((faq, i) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              index={i}
              isOpen={openId === faq.id}
              onToggle={() => toggle(faq.id)}
            />
          ))}

          {/* Mobile CTA */}
          <div className="md:hidden flex items-center justify-between mt-4 gap-5">
            <p className="text-[14px] text-text opacity-80 leading-snug select-none">
              Ready to assist.
            </p>
            <div className="flex-1 h-px bg-border" />
            <CTAButton variant='outlined' link='/sendinquiry'>
                <div className="flex w-max items-center justify-center gap-2">
                    <QuestionMarkCircleIcon className="w-4 h-4" />
                    Send Inquiry
                </div>
            </CTAButton>
          </div>
        </div>

      </div>
    </section>
  )
}