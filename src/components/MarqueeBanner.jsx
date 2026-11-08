import React, { useEffect, useRef } from 'react'

const BANNER_ITEMS = [
  {
    spotsLeft: '9 out of 15 spots left',
    bundleName: 'Bundled Offers',
    percentageOff: 'up to 25% off',
  },
]

const PIXELS_PER_SECOND = 50

function MarqueeBanner() {
  const trackRef = useRef(null)
  const positionRef = useRef(0)
  const lastTimeRef = useRef(null)
  const rafRef = useRef(null)

  const items = Array(20).fill(BANNER_ITEMS).flat()

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    function step(timestamp) {
      if (lastTimeRef.current === null) lastTimeRef.current = timestamp
      const delta = timestamp - lastTimeRef.current
      lastTimeRef.current = timestamp
      positionRef.current -= (PIXELS_PER_SECOND * delta) / 1000
      const halfWidth = track.scrollWidth / 2
      if (Math.abs(positionRef.current) >= halfWidth) positionRef.current = 0
      track.style.transform = `translateX(${positionRef.current}px)`
      rafRef.current = requestAnimationFrame(step)
    }

    rafRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const handleClick = () => {
    const pricingSection = document.getElementById('pricing')
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div
      onClick={handleClick}
      className="font-secondary bg-subPrimary/40 text-primary overflow-hidden whitespace-nowrap py-2 text-[13px] sm:text-[14px] tracking-wide cursor-pointer"
    >
      <div ref={trackRef} className="flex will-change-transform">
        {items.map((item, i) => (
          <div key={i} className="flex items-center whitespace-nowrap">
            <span className="font-secondary not-italic mx-2 select-none">{item.spotsLeft}</span>
            <span>✦</span>
            <span className="flex items-center mx-2">
              <span className="font-primary italic font-medium select-none">{item.bundleName}</span>
              <span className="mx-1">||</span>
              <span className="font-primary not-italic font-bold select-none">{item.percentageOff}</span>
            </span>
            <span>✦</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MarqueeBanner