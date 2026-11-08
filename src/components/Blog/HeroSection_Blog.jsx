import React from 'react'
import { motion } from 'framer-motion'
import { client_images } from '../../assets/assets'
import CTAButton from '../CTAButton'
import { ArrowUpRightIcon } from '@heroicons/react/20/solid'

const DEFAULT_POST = {
  tags:      ["Systems", "AI", "Growth"],
  label:     "A Free Resources Hub",
  title:     "Why Systems are Trending Again — Even with AI",
  excerpt:   "Most businesses adopt AI and get busier. The ones that scale use it to reinforce systems — not replace the thinking behind them. Here's what separates the two.",
  author: {
    avatar:      client_images.client1,
    name:        "Mohammad Assaf",
    description: "Qundos Co-CEO",
    date:        "Jun 25, 2025",
    readTime:    "8 min read",
  },
  thumbnail: "https://picsum.photos/seed/vs3/1200/675",
  link:      "/blog/systems-and-ai",
}

function HeroSection_Blog({ featuredPost = DEFAULT_POST }) {
  const { tags, label, title, excerpt, author, thumbnail, link } = featuredPost

  return (
    <section className="flex flex-col px-8 md:px-12 lg:px-20 xl:px-44 2xl:px-56 pt-8 sm:pt-12 w-full gap-8 sm:gap-12 bg-bg overflow-hidden">

      {/* ── Hero editorial card ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="  flex flex-col md:flex-row gap-8 sm:gap-20 overflow-hidden bg-bg hover:border-border transition-colors duration-300 pb-8 sm:pb-0"
      >
        {/* ── Image — right on desktop, top on mobile ── */}
        <div className="relative group w-full md:w-[52%] aspect-square md:aspect-auto md:min-h-[420px] lg:min-h-[480px] shrink-0 order-last overflow-hidden rounded-xl">
          <img
            src={thumbnail}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.04] rounded-xl hover:cursor-pointer"
          />

          {/* Tags — over image, top-left */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
            {tags.map(tag => (
              <span key={tag} className="px-2.5 py-1 font-primary font-medium rounded-full bg-black/30 backdrop-blur-sm border border-white/15 text-white text-[10px] sm:text-[11px] select-none whitespace-nowrap">
                {tag}
              </span>
            ))}
          </div>

          {/* Arrow — top right */}
          <div className="absolute top-4 right-4 w-9 h-9 rounded-full border border-white/25 flex items-center justify-center bg-black/20 backdrop-blur-sm group-hover:bg-black/40 transition-colors">
            <ArrowUpRightIcon className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* ── Editorial text block — left on desktop, bottom on mobile ── */}
        <div className="flex flex-col justify-between gap-5 flex-1 order-first">

          {/* Top: label + title + excerpt */}
          <div className="flex flex-col gap-4 sm:gap-5">
            {/* Label */}
            {label && (
              <div className="flex items-center gap-3">
                <span className="text-[12px] font-primary font-bold text-primary select-none px-2 py-1 border border-primary rounded-full italic">
                  {label}
                </span>
              </div>
            )}

            {/* Title — large and editorial */}
            <h2 className="text-[22px] sm:text-[28px] md:text-[26px] lg:text-[32px] font-secondary text-text leading-[1.2] tracking-tight select-none group-hover:text-primary transition-colors duration-300">
              {title}
            </h2>

            {/* Excerpt */}
            {excerpt && (
              <p className="text-[14px] sm:text-[15px] font-primary text-text/60 leading-relaxed select-none line-clamp-3">
                {excerpt}
              </p>
            )}
          </div>

          {/* Bottom: read more link + author */}
          <div className="flex flex-col gap-5">


            {/* CTA row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 sm:gap-8 w-full">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-3">
              <img src={client_images.client1} alt="Client 1" className="w-9 h-9 rounded-full border-2 border-bg object-cover" />
              <img src={client_images.client2} alt="Client 2" className="w-9 h-9 rounded-full border-2 border-bg object-cover" />
              <img src={client_images.client3} alt="Client 3" className="w-9 h-9 rounded-full border-2 border-bg object-cover" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-[15px] font-bold text-text select-none">15+</span>
              <span className="text-[12px] text-text/60 font-normal select-none">Satisfied Founders</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CTAButton variant="filled" radius={12} showArrow={true} link="/letstalk">Read Article</CTAButton>
            <CTAButton variant="outlined" link="/ourwork">See Our Work</CTAButton>
          </div>
        </div>
          </div>

        </div>
      </motion.div>

    </section>
  )
}

export default HeroSection_Blog