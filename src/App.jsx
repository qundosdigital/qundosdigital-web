import React from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Home from './Home'
import TypeformLeadForm from './components/Form'
import PageTransition from './components/PageTransition'
import { BASE_QUESTIONS, AUTHORITY_PLUS_QUESTIONS, AUTHORITY_PLUS_SECTIONS, BRAND_IDENTITY_QUESTIONS, BRAND_IDENTITY_SECTIONS, CUSTOM_INTERNAL_SYSTEM_QUESTIONS, CUSTOM_INTERNAL_SYSTEM_SECTIONS, DIGITAL_PRESENCE_QUESTIONS, DIGITAL_PRESENCE_SECTIONS, FULL_BRAND_GUIDELINE_QUESTIONS, FULL_BRAND_GUIDELINE_SECTIONS, ITEM_ORDER_COMMERCE_QUESTIONS, ITEM_ORDER_COMMERCE_SECTIONS, LETSTALK_SECTIONS, MARKETING_SYSTEM_QUESTIONS, MARKETING_SYSTEM_SECTIONS, TOTAL_INFRASTRUCTURE_QUESTIONS, TOTAL_INFRASTRUCTURE_SECTIONS, VISUAL_FOUNDATION_QUESTIONS, VISUAL_FOUNDATION_SECTIONS, INQUIRY_QUESTIONS, INQUIRY_SECTIONS, WRITEAREVIEW_QUESTIONS, WRITEAREVIEW_SECTIONS } from './assets/questionnaires'
import OurWork from './OurWork'
import FAQ from './FAQ'
import Blog from './Blog'
import About from './About'


// 1. Create a wrapper for your routes
const AnimatedRoutes = () => {
  const location = useLocation(); // Now this works because it's inside <BrowserRouter>

  return (
    /* mode="wait" is CRITICAL for luxury transitions */
    <AnimatePresence mode="wait">
      {/* 2. Add the location and key here! This is the "trigger" */}
      <Routes location={location} key={location.key}>
        {/* HOMEPAGE */}
        <Route path="/" element={<><PageTransition/><Home /></>} />
        {/* OURWORK */}
        <Route path="/ourwork" element={<><PageTransition/><OurWork /></>} />
        {/* FAQS */}
        <Route path="/faqs" element={<><PageTransition/><FAQ /></>} />
        {/* BLOG */}
        <Route path="/resources" element={<><PageTransition/><Blog /></>} />
        {/* About */}
        <Route path="/about" element={<><PageTransition/><About /></>} />
        {/* LETSTALK */}
        <Route path="/letstalk" element={<TypeformLeadForm title="Let's Talk — Intro Call" showBackButton questions={BASE_QUESTIONS} sections={LETSTALK_SECTIONS}/>} />
        {/* SENDINQUIRY */}
        <Route path="/sendinquiry" element={<TypeformLeadForm title="Ask Us a Question" showBackButton questions={INQUIRY_QUESTIONS} sections={INQUIRY_SECTIONS} formType='inquiry'/>} />
        <Route path="/writeareview" element={<TypeformLeadForm title="Write a Review" showBackButton questions={WRITEAREVIEW_QUESTIONS} sections={WRITEAREVIEW_SECTIONS} formType='inquiry'/>} />
        {/* BRANDING */}
        <Route path="/visualfoundation" element={<TypeformLeadForm title="Visual Foundation" showBackButton questions={VISUAL_FOUNDATION_QUESTIONS} sections={VISUAL_FOUNDATION_SECTIONS}/>} />
        <Route path="/brandidentity" element={<TypeformLeadForm title="Brand Identity" showBackButton questions={BRAND_IDENTITY_QUESTIONS} sections={BRAND_IDENTITY_SECTIONS}/>} />
        <Route path="/fullbranding" element={<TypeformLeadForm title="Full Brand Guideline" showBackButton questions={FULL_BRAND_GUIDELINE_QUESTIONS} sections={FULL_BRAND_GUIDELINE_SECTIONS}/>} />
        {/* WEBSITES */}
        <Route path="/marketingsystem" element={<TypeformLeadForm title="Marketing System" showBackButton questions={MARKETING_SYSTEM_QUESTIONS} sections={MARKETING_SYSTEM_SECTIONS}/>} />
        <Route path="/itemandordercommerce" element={<TypeformLeadForm title="Item & Order Commerce" showBackButton questions={ITEM_ORDER_COMMERCE_QUESTIONS} sections={ITEM_ORDER_COMMERCE_SECTIONS}/>} />
        <Route path="/custominternalsystem" element={<TypeformLeadForm title="Custom Internal System" showBackButton questions={CUSTOM_INTERNAL_SYSTEM_QUESTIONS} sections={CUSTOM_INTERNAL_SYSTEM_SECTIONS}/>} />
        {/* BUNDLES */}
        <Route path="/digitalpresence-bundle" element={<TypeformLeadForm title="Digital Presence" showBackButton questions={DIGITAL_PRESENCE_QUESTIONS} sections={DIGITAL_PRESENCE_SECTIONS}/>} />
        <Route path="/authorityplus-bundle" element={<TypeformLeadForm title="Authority+" showBackButton questions={AUTHORITY_PLUS_QUESTIONS} sections={AUTHORITY_PLUS_SECTIONS}/>} />
        <Route path="/totalinfastructure-bundle" element={<TypeformLeadForm title="Total Infastructure" showBackButton questions={TOTAL_INFRASTRUCTURE_QUESTIONS} sections={TOTAL_INFRASTRUCTURE_SECTIONS}/>} />
      </Routes>
    </AnimatePresence>
  );
}

// 3. Keep the Router at the very top level
const App = () => {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  )
}

export default App