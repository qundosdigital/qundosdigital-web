import React from 'react'
import { brand_logos, client_images, hero_image } from '../../assets/assets'
import CTAButton from '../CTAButton'

function HeroSection_About() {
  return (
    <section className="flex flex-col lg:flex-row items-stretch justify-between px-8 md:px-12 lg:px-20 xl:px-44 2xl:px-56 pt-8 sm:pt-12 lg:pt-20 w-full gap-5 sm:gap-10 bg-bg overflow-hidden">

      {/* ── Left: Copy ── */}
      <div className="flex flex-col justify-center items-start gap-5 sm:py-8 lg:gap-10 max-w-xl">

        {/* Headline */}
        <div className='flex flex-col gap-5'>
            <div className='border border-primary px-3 py-0.5 w-min rounded-full'>
                <p className="text-[12px] sm:text-[13px] text-primary max-w-md font-medium text-justify leading-[22.4px] opacity-90 w-max select-none">
                    About <span className='italic'>Us</span>
                </p>
            </div>
            <h1 className="text-[29px] sm:text-[44px] text-text leading-tight tracking-tight font-primary font-normal min-w-xl select-none">
              <span className="text-primary font-secondary">
                <span className='text-text'>Digital </span>
                {/* <br className='hidden md:block'/> */}
                <span className='mr-0'>Infrastructure </span>
                <br className='block md:hidden'/>
                <span className='md:mx-1 mr-1'></span>
              </span>
              {/* <br className='hidden md:block'/> */}
              <br className='hidden md:block'/> 
              <span className='font-medium sm:mr-0  not-italic'>For Growing </span>
              <span className='font-semibold italic'> Businesses</span>
            </h1>
        </div>

        {/* Subheadline */}
        <p className="text-[14px] sm:text-[16px] text-text max-w-md font-primary font-normal text-justify leading-5 select-none -mt-1">
          We work with <em className="font-semibold italic text-primary">founders, brands, and businesses from all niches</em> to create excellence; Something worth owning for generations.
        </p>

        {/* Social proof + CTAs */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end w-min justify-between gap-5 sm:gap-8 wrap-anywhere">

          {/* Avatar stack + count */}
          <div className="flex items-center gap-3 w-max">
            <div className="flex -space-x-3">
              <img src={client_images.client1} alt="Client 1" className="w-10 h-10 rounded-full border-2 border-bg object-cover" />
              <img src={client_images.client2} alt="Client 2" className="w-10 h-10 rounded-full border-2 border-bg object-cover" />
              <img src={client_images.client3} alt="Client 3" className="w-10 h-10 rounded-full border-2 border-bg object-cover" />
            </div>
            <div className="flex flex-col leading-tight gap-0.5">
              <span className="text-[16px] sm:text-[18px] font-bold text-text select-none">15+</span>
              <span className="text-[12px] md:text-[14px] text-text font-normal opacity-75 select-none">Satisfied Founders</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-4">
            <CTAButton variant='filled' radius={12} showArrow = {true} link='/letstalk'>Let's Talk</CTAButton>
            <CTAButton variant='outlined' link='/ourwork'>See Our Work</CTAButton>
          </div>

        </div>
      </div>

      {/* ── Right: Hero Image ── */}
      <div className="w-full lg:w-[35%] 2xl:w-[44%] aspect-5/4 md:aspect-video shrink-0 md:min-h-0 mt-3">
        <div className="relative rounded-xl overflow-hidden bg-bg border border-border w-full h-full">

            {/* Image */}
            <img
            src={hero_image}
            alt="Person holding branded products"
            className="absolute inset-0 w-full h-full object-cover object-center"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-text/30 to-transparent" />

        </div>
      </div>
    </section>
  )
}

export default HeroSection_About