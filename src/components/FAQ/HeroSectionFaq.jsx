import React from 'react'
import { client_images, hero_image } from '../../assets/assets'
import CTAButton from '../CTAButton'

const handleClick = () => {
    const pricingSection = document.getElementById('pricing')
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

function HeroSection_FAQ() {
  return (
    <section className="flex flex-col lg:flex-row lg:items-stretch justify-between px-8 md:px-12 lg:px-20 xl:px-44 2xl:px-56 pt-8 sm:pt-12 lg:pt-20 w-full gap-5 sm:gap-10 bg-bg overflow-hidden">

      {/* ── Left: Copy ── */}
      <div className="flex flex-col justify-center items-start gap-5 lg:gap-10 w-full lg:max-w-xl">
        <div className="flex flex-col gap-4 sm:gap-5">
          <div className="border border-primary px-3 py-0.5 w-min rounded-full">
            <p className="text-[12px] sm:text-[13px] text-primary font-medium leading-[22.4px] opacity-90 whitespace-nowrap select-none">
              What People <span className="italic">Ask</span> Us
            </p>
          </div>
          <h1 className="text-[28px] sm:text-[38px] lg:text-[44px] text-text leading-tight tracking-tight font-secondary font-normal select-none">
            <span className="text-primary font-secondary">Frequently </span>
            <span className="text-text">Asked Questions</span>
          </h1>
        </div>
        <p className="text-[14px] sm:text-[16px] text-text font-primary font-normal leading-relaxed select-none -mt-1 max-w-[520px]">
          Discover answers to questions people ask us most often. This page has been {" "}
          <em className="font-semibold italic text-primary">created to help you understand how everything works.</em>
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-end w-min justify-between gap-5 sm:gap-8 wrap-anywhere">

          {/* Avatar stack + count */}
          {/* <div className="flex items-center gap-3 w-max">
            <div className="flex -space-x-3">
              <img src={client_images.client1} alt="Client 1" className="w-10 h-10 rounded-full border-2 border-bg object-cover" />
              <img src={client_images.client2} alt="Client 2" className="w-10 h-10 rounded-full border-2 border-bg object-cover" />
              <img src={client_images.client3} alt="Client 3" className="w-10 h-10 rounded-full border-2 border-bg object-cover" />
            </div>
            <div className="flex flex-col leading-tight gap-0.5">
              <span className="text-[16px] sm:text-[18px] font-bold text-text select-none">15+</span>
              <span className="text-[12px] md:text-[14px] text-text font-normal opacity-75 select-none">Satisfied Founders</span>
            </div>
          </div> */}

          {/* CTA Buttons */}
          <div className="flex items-center gap-4">
            <CTAButton variant='filled' radius={12} showArrow = {true} link='/sendinquiry'>Send Inquiry</CTAButton>
            <CTAButton variant='outlined' onClick={handleClick}>See Plans</CTAButton>
          </div>

        </div>
      </div>

      {/* ── Right: Image ── */}
      <div className="w-full lg:w-1/2 xl:w-2/5 flex-shrink-0 h-25 sm:h-72 lg:h-auto">
        <div className="relative rounded-xl overflow-hidden w-full h-full">
          <img
            src={hero_image}
            alt="Person holding branded products"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
      </div>

    </section>
  )
}

export default HeroSection_FAQ