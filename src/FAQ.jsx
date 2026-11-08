import React from 'react'
import PageTexture from './components/PageTexture'
import MarqueeBanner from './components/MarqueeBanner'
import Navbar from './components/Navbar'
import PricingSection from './components/Home/PricingSection'
import HeroSection_FAQ from './components/FAQ/HeroSectionFaq'
import Footer from './components/Footer'
import FAQWrapper from './components/FAQ/FAQWrapper'

function Scans() {
  return (
    <svg
      viewBox="0 0 1 1"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 2,
        opacity: 0.05,
      }}
    >
      <defs>
        <pattern id="scan" x="0" y="0" width="1" height="4" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="1" height="1" fill="white"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#scan)"/>
    </svg>
  )
}


function FAQ() {
  return (
    <div className='bg-bg relative'>
        <PageTexture/>
        <Scans/>
        <MarqueeBanner/>
        <Navbar/>
        <HeroSection_FAQ/>
        <FAQWrapper/>
        <section id='pricing'><PricingSection/></section>
        <Footer/>
    </div>
  )
}

export default FAQ