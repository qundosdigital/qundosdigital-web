import { brand_logos } from '../assets/assets'
import CTAButton from './CTAButton'

// ─── Social icon SVGs ────────────────────────────────────────────────────────
function IconFacebook() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  )
}

function IconInstagram() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
  )
}

function IconX() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )
}

function IconDiscord() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.032.054a19.9 19.9 0 0 0 5.993 3.03.077.077 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
    </svg>
  )
}

// ─── Corner bracket decoration ───────────────────────────────────────────────
function CornerBracket({ position }) {
  const isRight = position === 'right'
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        [isRight ? 'right' : 'left']: 0,
        bottom: 0,
        width: 28,
        height: 28,
      }}
      aria-hidden="true"
    >
      <svg
        width="28" height="28" viewBox="0 0 28 28" fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: isRight ? 'scaleX(-1)' : 'none' }}
      >
        <path
          d="M2 26 L2 4 M2 26 L24 26"
          stroke="currentColor"
          strokeWidth="1"
          className="text-text"
          opacity="0.4"
          strokeLinecap="square"
        />
      </svg>
    </div>
  )
}

const SOCIAL = [
  { icon: <IconFacebook />,  label: 'Facebook',  href: '#' },
  { icon: <IconInstagram />, label: 'Instagram', href: '#' },
  { icon: <IconX />,         label: 'X',         href: '#' },
  { icon: <IconDiscord />,   label: 'Discord',   href: '#' },
]

const LEGAL = [
  { label: 'Terms of Service', href: '#' },
  { label: 'Privacy Policy',   href: '#' },
]

export default function Footer() {
  return (
    <footer className="w-full px-8 md:px-12 lg:px-20 xl:px-44 2xl:px-56 py-8 sm:py-25  font-primary">
      {/* ── Outer container with corner brackets ── */}
      <div className="relative mx-auto">
        {/* Top-left corner bracket */}
        <div
          className="absolute pointer-events-none"
          aria-hidden="true"
          style={{ left: 0, top: 0, width: 28, height: 28 }}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 2 L2 24 M2 2 L24 2" stroke="currentColor" strokeWidth="1"
              className="text-text" opacity="0.4" strokeLinecap="square"/>
          </svg>
        </div>

        {/* Top-right corner bracket */}
        <div
          className="absolute pointer-events-none"
          aria-hidden="true"
          style={{ right: 0, top: 0, width: 28, height: 28 }}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M26 2 L26 24 M26 2 L4 2" stroke="currentColor" strokeWidth="1"
              className="text-text" opacity="0.4" strokeLinecap="square"/>
          </svg>
        </div>

        {/* Bottom-left corner bracket */}
        <CornerBracket position="left"/>

        {/* Bottom-right corner bracket */}
        <CornerBracket position="right"/>

        {/* ══ Top row: logo + tagline / social icons ══════════════════════ */}
        <div className="px-8 sm:px-12 pt-10 pb-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 sm:gap-4">

            {/* Logo + tagline */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <img src={brand_logos.qundos_full_logo} alt="Qundos logo" className="h-5 w-auto select-none"/>
              </div>
              <p className="text-[14px] font-primary text-text leading-6 text-justify md:max-w-lg md:pt-2 select-none">
                Stop settling, start closing, <br className="hidden sm:block"/>
                and build something worth owning.
              </p>
            </div>

            {/* Social icons */}
            <div className="flex flex-col gap-8">
                {/* <div className="flex items-center gap-2 sm:mt-1">
                  {SOCIAL.map(({ icon, label, href }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      className="w-9 h-9 flex items-center justify-center border border-border rounded-md
                        text-text opacity-60 hover:opacity-100 hover:border-primary hover:text-primary
                        transition-all duration-200"
                    >
                      {icon}
                    </a>
                  ))}
                </div> */}
                <CTAButton variant='filled' showArrow={true} radius={12} link='/letstalk'><span className="font-primary font-semibold">Let's Talk</span></CTAButton>
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="mx-8 sm:mx-12 border-t border-border"/>

        {/* ══ Bottom row: nav links / legal / copyright ═══════════════════ */}
        <div className="px-8 sm:px-12 py-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 sm:gap-4">

             <div className="flex gap-8">
               {LEGAL.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="text-[12px] sm:text-[14px] font-primary italic font-semibold text-text leading-6 text-justify md:max-w-lg opacity-80 hover:opacity-100 hover:text-primary
                      transition-colors duration-150 select-none whitespace-nowrap"
                  >
                    {label}
                  </a>
                ))}
             </div>

            {/* Copyright */}
            <p className="text-[12px] font-primary font-semibold italic text-text leading-6 text-justify md:max-w-lg opacity-60 select-none  whitespace-nowrap">
              All rights reserved 2026-Qundos.
            </p>
          </div>
        </div>

      </div>
    </footer>
  )
}