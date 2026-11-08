import React from 'react'
import WorkWrapper from '../OurWork/WorkWrapper'

function OurWorkMobile() {
  return (
    <section className="w-full  bg-bg">

      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 md:gap-16 px-8 md:px-12 lg:px-20 xl:px-44 2xl:px-56 pt-8 sm:pt-12 ">
        <div className="flex flex-col gap-5 shrink-0">
          <div className="border border-primary px-3 py-0.5 w-min rounded-full">
            <p className="text-[12px] sm:text-[13px] text-primary font-primary font-semibold italic w-max select-none">Work We're <span className="italic">Proud</span> Of</p>
          </div>
          <h2 className="text-[25px] sm:text-[36px] font-primary font-normal text-text leading-[32.5px] sm:leading-11 tracking-tight select-none">
            <span className="italic font-semibold">Our </span>
            <span className="italic font-medium">Clients' </span>
            <span className="font-secondary text-primary">Success Stories </span>
            <br/>
          </h2>
        </div>
        <p className="text-[14px] sm:text-[16px] font-primary text-text leading-6 text-justify md:max-w-lg md:pt-12 select-none">
         Every business closed at least 2x more deals.{" "}
          <em className="font-semibold italic text-primary">That will always be the only metric that matters.</em>
        </p>
      </div>

      <WorkWrapper/>

    </section>
  )
}

export default OurWorkMobile