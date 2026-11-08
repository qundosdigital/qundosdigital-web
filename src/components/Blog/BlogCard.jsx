// BlogCard.jsx
import { CalendarIcon, ClockIcon, ArrowDownTrayIcon } from "@heroicons/react/20/solid"

export default function BlogCard({ post, featured = false }) {
  const { image, category, title, excerpt, author, date, readTime, link = "#", pdf } = post

  // ── FEATURED (first card) — full-width vertical ──────────────────────────
  if (featured) {
    return (
      <div className="flex flex-col rounded-xl overflow-hidden group">
        {/* Image */}
        <a href={link} className="relative w-full aspect-video overflow-hidden block shrink-0 rounded-xl">
          <img
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform rounded-xl duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-linear-to-t from-bg/20 to-transparent pointer-events-none" />
        </a>

        {/* Body */}
        <div className="flex flex-col gap-2 py-8">
          <div className="flex justify-between items-center">
              {category && (
                <span className="w-max mb-3 text-[12px] font-primary font-semibold italic text-primary border border-primary/40 bg-primary/2 rounded-full px-2.5 py-0.5 select-none">
                  {category}
                </span>
              )}
              <p className="text-[12px] italic sm:text-[13px] font-primary font-semibold text-primary/60 leading-relaxed line-clamp-2 select-none cursor-pointer">
              Read Article
            </p>
          </div>
          <a href={link}>
            <h3 className="text-[15px] sm:text-[20px] font-secondary text-text leading-snug tracking-tight select-none group-hover:text-primary transition-colors duration-200">
              {title}
            </h3>
          </a>
          {excerpt && (
            <p className="text-[13px] sm:text-[14px] font-primary font-medium text-text/60 leading-relaxed line-clamp-2 select-none">
              {excerpt}
            </p>
          )}

          {/* Footer */}
          <div className="flex items-center gap-3 pt-3">
              <div className="flex gap-5 w-full">
                  {date && (
                    <div className="flex items-center gap-1 text-text/40">
                      <CalendarIcon className="w-3 h-3" />
                      <span className="text-[11px] font-primary font-semibold italic select-none">{date}</span>
                    </div>
                  )}
                  {readTime && (
                    <div className="flex items-center gap-1 text-text/40">
                      <ClockIcon className="w-3 h-3" />
                      <span className="text-[11px] font-primary font-semibold italic select-none">{readTime}</span>
                    </div>
                  )}
              </div>
            <div className="flex items-center gap-3 shrink-0">
              {pdf && (
                <a
                  href={pdf}
                  download
                  onClick={e => e.stopPropagation()}
                  className="flex items-center gap- text-bg border border-primary bg-primary rounded-full px-2.5 py-2 hover:bg-bg hover:text-primary transition-colors"
                >
                  <ArrowDownTrayIcon className="w-5 h-5 sm:mb-1" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── COMPACT (remaining cards) — horizontal row ────────────────────────────
  return (
    <div className="flex flex-row items-center gap-4 py-2 group">
      {/* Small rounded thumbnail */}
      <a href={link} className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 block">
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.06]"
        />
      </a>

      {/* Content */}
      <div className="flex flex-col gap-1 flex-1 min-w-0">
        {category && (
          <span className="text-[10px] font-primary font-semibold italic text-primary select-none">
            {category}
          </span>
        )}
        <a href={link}>
          <h3 className="text-[13px] font-primary font-semibold text-text leading-snug tracking-tight select-none group-hover:text-primary transition-colors duration-200 line-clamp-2">
            {title}
          </h3>
        </a>
        <div className="flex items-center gap-2 mt-0.5">
          {date && (
            <div className="flex items-center gap-1 text-text/40">
              <CalendarIcon className="w-2.5 h-2.5" />
              <span className="text-[10px] font-primary italic select-none">{date}</span>
            </div>
          )}
          {readTime && (
            <div className="flex items-center gap-1 text-text/40">
              <ClockIcon className="w-2.5 h-2.5" />
              <span className="text-[10px] font-primary italic select-none">{readTime}</span>
            </div>
          )}
        </div>
      </div>

      {/* PDF button */}
      {pdf && (
        <a
          href={pdf}
          download
          onClick={e => e.stopPropagation()}
          className="shrink-0 w-8 h-8 rounded-full border border-primary flex items-center justify-center text-bg bg-primary     hover:border-primary hover:text-primary hover:bg-primary/5 transition-colors"
          aria-label="Download PDF"
        >
          <ArrowDownTrayIcon className="w-3.5 h-3.5" />
        </a>
      )}
    </div>
  )
}