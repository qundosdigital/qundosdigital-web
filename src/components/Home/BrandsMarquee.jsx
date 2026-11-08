import React, { useEffect, useRef } from 'react'
import { brand_logos, trusted_by } from '../../assets/assets'

const PIXELS_PER_SECOND = 50



const BRANDS = [
  { name: 'Amazon',    logo: trusted_by.one },
  { name: 'Calendly',  logo: trusted_by.two },
  { name: 'aarus',    logo: trusted_by.three },
  { name: 'eBay',      logo: trusted_by.four },
]

// 5 copies in each half → seamless endless loop on any screen width
const HALF = Array(5).fill(BRANDS).flat()
const ITEMS = [...HALF, ...HALF]

function BrandMarquee() {
  const trackRef     = useRef(null)
  const containerRef = useRef(null)
  const posRef       = useRef(0)
  const lastRef      = useRef(null)
  const rafRef       = useRef(null)

  useEffect(() => {
    const track     = trackRef.current
    const container = containerRef.current
    if (!track || !container) return

    function step(ts) {
      if (lastRef.current === null) lastRef.current = ts
      const delta = ts - lastRef.current
      lastRef.current = ts

      posRef.current -= (PIXELS_PER_SECOND * delta) / 1000

      const halfWidth = track.scrollWidth / 2
      if (Math.abs(posRef.current) >= halfWidth) posRef.current = 0

      track.style.transform = `translateX(${posRef.current}px)`
      rafRef.current = requestAnimationFrame(step)
    }

    rafRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <div className="w-full flex flex-col items-center px-8 md:px-12 lg:px-20 xl:px-44 2xl:px-56 pt-5 sm:pt-15">

      <p className="
        text-[12px] sm:text-[13px] text-text/80 font-semibold tracking-wide select-none
        md:mb-3
        max-md:relative max-md:z-10 max-md:bg-bg max-md:px-4 max-md:translate-y-[50%] font-primary
      ">
        Trusted by Companies
      </p>

      <div className="w-full border border-border bg-bg rounded-xl overflow-hidden py-5 sm:py-6">
        <div ref={containerRef} className="overflow-hidden w-full">
          <div ref={trackRef} className="flex items-center will-change-transform">
            {ITEMS.map((brand, i) => (
              <div key={i} className="flex items-center justify-center shrink-0 px-8 sm:px-10">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className={`w-auto object-contain opacity-60 grayscale ${brand.name === 'aarus' ? 'h-8 sm:h-10' : 'h-6 sm:h-7'}`}
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}

export default BrandMarquee