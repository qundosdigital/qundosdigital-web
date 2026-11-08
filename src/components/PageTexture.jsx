import React from 'react'

// Pre-encoded at module load — zero runtime cost, no re-renders
const halftone = encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="5" height="5">
    <circle cx="5" cy="5" r="1" fill="#0E513C" opacity="0.025"/>
  </svg>`
)

// feTurbulence with stitchTiles="stitch" makes the 256×256 tile seamless —
// browser caches the rasterised bitmap and repeats it, no per-scroll work.
const grain = encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256">
    <filter id="g" color-interpolation-filters="linearRGB">
      <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="4" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
    </filter>
    <rect width="256" height="256" filter="url(#g)" opacity="0.1"/>
  </svg>`
)

// Wider tile — fine diagonal lines like aged manga screentone paper
const screentone = encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="6" height="6">
    <line x1="0" y1="6" x2="6" y2="0" stroke="#0E513C" stroke-width="0.35" opacity="0.02"/>
  </svg>`
)

export default function PageTexture() {
  return (
    <div
      aria-hidden="true"
      style={{
        // Fixed = renders once, never repaints on scroll
        position: 'fixed',
        inset: 0,
        // Above all page content visually, but never blocks pointer events
        zIndex: 9998,
        pointerEvents: 'none',
        // multiply: white pixels in overlay → fully transparent,
        // textured pixels → very slight darkening. Works on any light bg.
        mixBlendMode: 'multiply',
        // Three layers, back to front:
        // 1. fractalNoise grain (large tile, cached bitmap)
        // 2. diagonal screentone lines (6px tile — manga paper feel)
        // 3. halftone dot grid (14px tile)
        backgroundImage: [
          `url("data:image/svg+xml,${grain}")`, 
          `url("data:image/svg+xml,${screentone}")`,
         /*  `url("data:image/svg+xml,${halftone}")`, */
        ].join(', '),
        backgroundRepeat: 'repeat, repeat, repeat',
        backgroundSize: '256px 256px, 6px 6px, 14px 14px',
        // Force GPU compositing layer — no CPU repaints whatsoever
        willChange: 'transform',
        transform: 'translateZ(0)',
      }}
    />
  )
}