// PageContour.jsx
// Renders once, full document height, position:absolute so it scrolls with the page.
// Drop it as the FIRST child of the outermost div in Home.

export default function PageContour() {
  const INK = '#0E513C'

  // ── Contour path generator ────────────────────────────────────────────────
  // Builds organic closed loops that drift across the canvas.
  // Each "band" is a horizontal wave at a given Y that wanders left/right.
  function band(y, amplitude, frequency, phase, width = 1440) {
    const steps = 80
    const dx = width / steps
    let d = ''
    for (let i = 0; i <= steps; i++) {
      const x = i * dx
      const waveY =
        y +
        Math.sin((i / steps) * Math.PI * frequency + phase) * amplitude +
        Math.sin((i / steps) * Math.PI * frequency * 0.4 + phase * 1.7) * amplitude * 0.4 +
        Math.cos((i / steps) * Math.PI * frequency * 0.7 + phase * 0.9) * amplitude * 0.2
      d += i === 0 ? `M ${x} ${waveY}` : ` L ${x} ${waveY}`
    }
    return d
  }

  // ── Generate bands spread across 6000px of page height ───────────────────
  const PAGE_H = 6000
  const W = 1440
  const bands = []

  // Dense cluster near top (hero area)
  for (let i = 0; i < 12; i++) {
    bands.push({
      y: 80 + i * 55,
      amp: 28 + (i % 3) * 18,
      freq: 1.2 + (i % 5) * 0.4,
      phase: i * 1.1,
      opacity: 0.045 + (i % 4) * 0.12,
      width: 0.4 + (i % 3) * 0.2,
    })
  }

  // Mid-page — looser, bigger waves
  for (let i = 0; i < 18; i++) {
    const y = 780 + i * 240
    bands.push({
      y,
      amp: 50 + (i % 4) * 30,
      freq: 0.8 + (i % 6) * 0.35,
      phase: i * 0.83,
      opacity: 0.03 + (i % 5) * 0.1,
      width: 0.35 + (i % 4) * 0.18,
    })
  }

  // Tight cluster toward bottom
  for (let i = 0; i < 10; i++) {
    const y = PAGE_H - 900 + i * 70
    bands.push({
      y,
      amp: 22 + (i % 3) * 14,
      freq: 1.5 + (i % 4) * 0.3,
      phase: i * 1.4,
      opacity: 0.04 + (i % 3) * 0.15,
      width: 0.3 + (i % 3) * 0.2,
    })
  }

  // A few giant sweeping arcs that cross the full page
  const sweeps = [
    { y: 400,  amp: 180, freq: 0.6, phase: 0.3,  opacity: 0.25, width:1 },
    { y: 1800, amp: 240, freq: 0.5, phase: 1.1,  opacity: 0.2,  width: 1},
    { y: 3200, amp: 200, freq: 0.7, phase: 2.0,  opacity: 0.22, width:1 },
    { y: 4600, amp: 160, freq: 0.55,phase: 0.9,  opacity: 0.2,  width: 1},
  ]

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: `${PAGE_H}px`,   // taller than any realistic page; clips naturally
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden',
      }}
    >
      <svg
        viewBox={`0 0 ${W} ${PAGE_H}`}
        preserveAspectRatio="xMidYTop meet"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%' }}
      >
        {/* Regular bands */}
        {bands.map((b, i) => (
          <path
            key={`b-${i}`}
            d={band(b.y, b.amp, b.freq, b.phase, W)}
            fill="none"
            stroke={INK}
            strokeWidth={b.width}
            opacity={b.opacity}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}

        {/* Giant sweeping arcs */}
        {sweeps.map((b, i) => (
          <path
            key={`s-${i}`}
            d={band(b.y, b.amp, b.freq, b.phase, W)}
            fill="none"
            stroke={INK}
            strokeWidth={b.width}
            opacity={b.opacity}
            strokeLinecap="round"
          />
        ))}

        {/* Vertical drift lines — graffiti pressure marks */}
        {[180, 420, 760, 1020, 1240].map((vx, i) => {
          const pts = Array.from({ length: 40 }, (_, j) => {
            const vy = (PAGE_H / 39) * j
            const drift = Math.sin((j / 39) * Math.PI * 3 + i) * 18 + Math.cos((j / 39) * Math.PI * 5 + i * 0.7) * 8
            return `${j === 0 ? 'M' : 'L'} ${vx + drift} ${vy}`
          }).join(' ')
          return (
            <path
              key={`v-${i}`}
              d={pts}
              fill="none"
              stroke={INK}
              strokeWidth={0.3}
              opacity={0.055}
              strokeLinecap="round"
            />
          )
        })}
      </svg>
    </div>
  )
}