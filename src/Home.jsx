import React from 'react'
import Footer from './components/Footer'
import FAQSection from './components/Home/FaqSection'
import OfferBanner, { OFFER_CARDS } from './components/OfferBanner'
import PricingSection from './components/Home/PricingSection'
import ReviewsSection from './components/Home/Reviews'
import BrandingBento from './components/Home/BrandingBento'
import Issues from './components/Home/Issues'
import HeroSection from './components/Home/HeroSection'
import Navbar from './components/Navbar'
import MarqueeBanner from './components/MarqueeBanner'
import PageTexture from './components/PageTexture'
import BrandMarquee from './components/Home/BrandsMarquee'
import WorkWrapper from './components/OurWork/WorkWrapper'
import OurWorkMobile from './components/Home/OurWorkMobile'

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

function Home() {
  return (
    <div className='bg-bg relative'>
      {/* ── Full-page scrollable contour background ── */}
      {/* ── Everything else stacks on top ── */}
      <PageTexture />
      <Scans/>
      <MarqueeBanner/>
      <Navbar/>
      <section id="hero"><HeroSection/></section>
      {/* <BrandMarquee/> */}
      <section id="issues"><Issues/></section>
      {/* <div className="block md:hidden"><OfferBanner card={OFFER_CARDS[1]}/></div> */}
      <section id="ourwork" className='sm:hidden block'><OurWorkMobile/></section>
      <section id="whatwedo" className='sm:block hidden'><BrandingBento/></section>
      {/* <div className="hidden md:block"><OfferBanner card={OFFER_CARDS[1]}/></div> */}

      {/* <section id="work"><WorkWrapper/></section> */}
      <section id="reviews"><ReviewsSection/></section>
      <section id="pricing"><PricingSection/></section>
      {/* <OfferBanner/> */}
      <section id="faq"><FAQSection/></section>
      <Footer/>
    </div>
  )
}

export default Home