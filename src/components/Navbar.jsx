import React, { useEffect, useRef, useState, memo } from 'react'
import { ArrowUpRightIcon, ArrowTurnDownRightIcon } from '@heroicons/react/24/outline'
import { brand_logos } from '../assets/assets'
import CTAButton from './CTAButton'
import { Link } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'Home',     href: '/'        },
  { label: 'Projects', href: '/ourwork' },
  { label: 'About',    href: '/about'   },
  { label: 'FAQs',     href: '/faqs'    },
]

function useActiveLink() {
  const [active, setActive] = useState(() => window.location.pathname || '/')

  useEffect(() => {
    const update = () => setActive(window.location.pathname || '/')
    window.addEventListener('popstate', update)
    return () => window.removeEventListener('popstate', update)
  }, [])

  return active
}

const NavLink = memo(({ label, href, isActive }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <li>
      <Link to={href}>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="relative flex items-center gap-1 text-[14px] font-primary font-semibold no-underline transition-colors duration-200 leading-6 group z-50"
          style={{ color: isActive || hovered ? 'var(--color-primary)' : 'var(--color-text)' }}
        >
          <span
            className="inline-flex items-center justify-center transition-all duration-200 ease-out"
            style={{
              opacity:   isActive ? 1 : 0,
              transform: isActive ? 'translateX(0) translateY(0)' : 'translateX(-6px) translateY(-4px)',
              width: '14px',
              flexShrink: 0,
            }}
          >
            <ArrowTurnDownRightIcon className="w-3 h-3" strokeWidth={2.5} />
          </span>
          <span>{label}</span>
          <span
            className="inline-flex items-center justify-center transition-all duration-200 ease-out"
            style={{
              opacity:   !isActive && hovered ? 1 : 0,
              transform: !isActive && hovered
                ? 'translateX(0) translateY(-2px)'
                : 'translateX(-4px) translateY(4px)',
            }}
          >
            <ArrowUpRightIcon className="w-3 h-3" strokeWidth={2.5} />
          </span>
        </div>
      </Link>
    </li>
  )
})

// ── Floating mobile menu ────────────────────────────────────────────────────
const MobileMenu = ({ open, onClose, active }) => {
  return (
    <>
      {/* Backdrop — subtle, dismisses on tap */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 md:hidden transition-opacity duration-300"
        style={{
          opacity:        open ? 1 : 0,
          pointerEvents:  open ? 'auto' : 'none',
          background:     'transparent',
        }}
      />

      {/* Floating card */}
      <div
        className="absolute -right-4 top-[calc(100%+32px)] z-50 md:hidden"
        style={{
          // Enter/exit via scale + opacity + blur
          transform:      open ? 'scale(1) translateY(0)'   : 'scale(0.88) translateY(-8px)',
          opacity:        open ? 1 : 0,
          pointerEvents:  open ? 'auto' : 'none',
          transformOrigin: 'top right',
          transition:     'transform 0.25s cubic-bezier(0.34,1.4,0.64,1), opacity 0.2s ease',

          // Card look
          background:     'rgba(var(--bg-rgb, 255,255,255), 1)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border:         '1px solid var(--color-border, rgba(0,0,0,0.08))',
          borderRadius:   '16px',
          minWidth:       '160px',
          padding:        '8px',
          overflow:       'hidden',
        }}
      >
        {NAV_LINKS.map(({ label, href }, i) => {
          const isActive = active === href
          return (
            <Link
              key={label}
              to={href}
              onClick={onClose}
              style={{
                // Staggered slide-in per item
                transform:  open ? 'translateY(0)'   : 'translateY(-6px)',
                opacity:    open ? 1 : 0,
                transition: `transform 0.28s cubic-bezier(0.34,1.3,0.64,1) ${open ? i * 45 : 0}ms,
                             opacity   0.22s ease                           ${open ? i * 45 : 0}ms`,

                display:        'flex',
                alignItems:     'center',
                justifyContent: 'space-between',
                gap:            '10px',
                padding:        '9px 14px',
                borderRadius:   '10px',
                fontSize:       '14px',
                fontWeight:     600,
                textDecoration: 'none',
                color:          isActive ? 'var(--color-primary)' : 'var(--color-text)',
                background:     isActive ? 'rgba(var(--primary-rgb, 0,128,80), 0.07)' : 'transparent',
                marginBottom:   i < NAV_LINKS.length - 1 ? '2px' : '0',
                transition: `background 0.15s ease, color 0.15s ease,
                             transform 0.28s cubic-bezier(0.34,1.3,0.64,1) ${open ? i * 45 : 0}ms,
                             opacity   0.22s ease                           ${open ? i * 45 : 0}ms`,
              }}
              // Hover via inline event — keeps it dependency-free
              onMouseEnter={e => {
                if (!isActive) {
                  e.currentTarget.style.background = 'rgba(0,0,0,0.04)'
                  e.currentTarget.style.color      = 'var(--color-primary)'
                }
              }}
              onMouseLeave={e => {
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color      = 'var(--color-text)'
                }
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {isActive && (
                  <ArrowTurnDownRightIcon
                    style={{ width: '11px', height: '11px', flexShrink: 0 }}
                    strokeWidth={2.5}
                  />
                )}
                {label}
              </span>
              <ArrowUpRightIcon
                style={{
                  width:     '11px',
                  height:    '11px',
                  flexShrink: 0,
                  opacity:   isActive ? 0.4 : 0.2,
                }}
                strokeWidth={2}
              />
            </Link>
          )
        })}
      </div>
    </>
  )
}
// ───────────────────────────────────────────────────────────────────────────

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef   = useRef()
  const active   = useActiveLink()

  // Close on outside click
  useEffect(() => {
    const handle = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setMenuOpen(false)
    }
    if (menuOpen) document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [menuOpen])

  // Close on Escape
  useEffect(() => {
    const handle = (e) => { if (e.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [])

  // Close on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [active])

  return (
    <nav
      ref={navRef}
      className="flex items-center justify-between px-8 md:px-12 lg:px-20 xl:px-44 2xl:px-56 py-3.5 sticky top-0 z-50 bg-bg backdrop-blur-xl border-b border-border font-medium"
    >
      {/* Logo */}
      <Link to={'/'}><img src={brand_logos.qundos_full_logo} alt="Qundos" width="80" /></Link>

      {/* Desktop Nav */}
      <ul className="hidden md:flex gap-6 list-none m-0 p-0">
        {NAV_LINKS.map(({ label, href }) => (
          <NavLink key={label} label={label} href={href} isActive={active === href} />
        ))}
      </ul>

      {/* Desktop CTA */}
      <div className="hidden md:block">
        <CTAButton variant="filled" showArrow href="#contact" link='/letstalk'>Let's Talk</CTAButton>
      </div>

      {/* Mobile Controls — `relative` anchors the floating menu */}
      <div className="flex md:hidden items-center gap-5 relative">
        <CTAButton variant="outlined" href="#contact" link='/letstalk'>Let's Talk</CTAButton>

        {/* Hamburger */}
        <button
  onClick={() => window.open('https://www.instagram.com/qundosdigital?igsh=c2IzZGQ4djVwOXZx', '_blank')}
  aria-label="Visit Instagram"
  className="flex items-center justify-center pl-3 pr-0"
>
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4.5" />
    <circle cx="17.5" cy="6.5" r="0.875" fill="currentColor" stroke="none" />
  </svg>
</button>

        {/* Floating dropdown */}
        <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} active={active} />
      </div>
    </nav>
  )
}

export default Navbar