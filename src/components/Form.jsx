"use client";

import { useState, useEffect, useRef, useCallback, useMemo, Fragment } from "react";
import CTAButton from "./CTAButton";
import { brand_logos } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import PageTexture from "./PageTexture";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";

// ─── YOUR APPS SCRIPT WEB APP URL ────────────────────────────────────────────
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxBQeKOmWgcU4y67Uvt8SWacy29KwvSuO-WD_Vp7MfAeTqA70Exxru5rjawJvj3U0Y9/exec";

// ─── SLIDE ANIMATIONS ────────────────────────────────────────────────────────
const ANIM_CSS = `
  @keyframes slideEnterUp   { from { opacity:0; transform:translateY(48px);  } to { opacity:1; transform:none; } }
  @keyframes slideEnterDown { from { opacity:0; transform:translateY(-48px); } to { opacity:1; transform:none; } }
  @keyframes slideExitUp    { from { opacity:1; transform:none; } to { opacity:0; transform:translateY(-48px); } }
  @keyframes slideExitDown  { from { opacity:1; transform:none; } to { opacity:0; transform:translateY(48px);  } }
  .slide-enter-up   { animation: slideEnterUp   0.55s cubic-bezier(0.22,1,0.36,1) forwards; }
  .slide-enter-down { animation: slideEnterDown 0.55s cubic-bezier(0.22,1,0.36,1) forwards; }
  .slide-exit-up    { animation: slideExitUp    0.45s cubic-bezier(0.22,1,0.36,1) forwards; pointer-events:none; }
  .slide-exit-down  { animation: slideExitDown  0.45s cubic-bezier(0.22,1,0.36,1) forwards; pointer-events:none; }
  @keyframes panelSlideIn { from { opacity:0; transform:translateX(16px); } to { opacity:1; transform:none; } }
  .panel-slide-in { animation: panelSlideIn 0.32s cubic-bezier(0.22,1,0.36,1) forwards; }
  @keyframes introEnter { from { opacity:0; transform:translateY(32px); } to { opacity:1; transform:none; } }
  .intro-enter { animation: introEnter 0.65s cubic-bezier(0.22,1,0.36,1) forwards; }
  @keyframes checkPop { 0% { transform:scale(0.5); opacity:0; } 60% { transform:scale(1.15); } 100% { transform:scale(1); opacity:1; } }
  .check-pop { animation: checkPop 0.22s cubic-bezier(0.22,1,0.36,1) forwards; }
  @keyframes sectionBadgePop { 0% { transform:scale(0.88) translateY(6px); opacity:0; } 70% { transform:scale(1.04); } 100% { transform:none; opacity:1; } }
  .section-badge-pop { animation: sectionBadgePop 0.5s cubic-bezier(0.22,1,0.36,1) forwards; }
  @keyframes stepFill { from { transform:scale(0); opacity:0; } to { transform:scale(1); opacity:1; } }
  .step-fill { animation: stepFill 0.3s cubic-bezier(0.22,1,0.36,1) forwards; }
  @keyframes dotTrailIn { from { opacity:0; transform:translateX(-6px); } to { opacity:1; transform:none; } }

  /* ── Stepper rail / node transitions ── */
  .stepper-rail-fill {
    transition: width 0.7s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .stepper-node {
    transition: background-color 0.28s ease, border-color 0.28s ease, transform 0.28s ease;
  }
  .stepper-node-dot {
    transition: opacity 0.2s ease, transform 0.25s cubic-bezier(0.22,1,0.36,1);
  }
  .stepper-label-num {
    transition: color 0.2s ease;
  }
  .stepper-label-name {
    transition: color 0.2s ease, font-weight 0.2s ease;
  }
  .stepper-hover-line {
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.18s ease;
  }
  .stepper-step:hover .stepper-hover-line {
    transform: scaleX(1);
  }
`;

// ─── QUESTION SCHEMA ──────────────────────────────────────────────────────────
const SAMPLE_QUESTIONS = [
  { id:"name",      type:"text",             question:"What's your name?",                          placeholder:"Type your answer here...", required:true },
  { id:"email",     type:"text",             inputType:"email", question:"Best email to reach you?", placeholder:"name@company.com",        required:true },
  { id:"challenge", type:"multiple_choice",  question:"What's your biggest challenge right now?",   required:true,
    choices:[
      { key:"A", label:"Losing deals to cheaper competitors" },
      { key:"B", label:"Can't raise my prices" },
      { key:"C", label:"Every sale depends on me being there" },
      { key:"D", label:"Marketing spend that doesn't convert" },
    ],
  },
  { id:"goals", type:"multiple_choice_multi", question:"Which outcomes matter most to you? Pick all that apply.", required:true,
    choices:[
      { key:"A", label:"Close deals at a higher price point" },
      { key:"B", label:"Build a brand that works without me" },
      { key:"C", label:"Reduce wasted spend on agencies" },
      { key:"D", label:"Increase referrals and word of mouth" },
      { key:"E", label:"Prepare the business for an exit" },
    ],
  },
  { id:"meeting", type:"calendar", question:"Pick a time that works for you.", required:true, workingHours:{ start:9, end:18 }, daysAhead:60, timezone:"Asia/Beirut" },
  { id:"notes",   type:"textarea", question:"Anything else before we talk?",  placeholder:"Optional — What's on your mind?", required:false },
];

export const SAMPLE_SECTIONS = [
  { id:"about",    title:"About You",     description:"A few basics before we dive in.",                           questionIds:["name","email"] },
  { id:"situation",title:"Your Situation",description:"Help us understand what you're working with right now.",    questionIds:["challenge","goals"] },
  { id:"booking",  title:"Book a Time",   description:"Find a slot that works and we'll take it from there.",     questionIds:["meeting","notes"] },
];

// ─── SECTION MAP BUILDER ──────────────────────────────────────────────────────
function buildSectionMap(questions, sections) {
  if (!sections || sections.length === 0) return null;
  const idToSection = {};
  sections.forEach((sec, i) => { (sec.questionIds || []).forEach((qId) => { idToSection[qId] = i; }); });
  return questions.map((q) => idToSection[q.id] ?? 0);
}

// ─── APPS SCRIPT CALLER ───────────────────────────────────────────────────────
async function callScript(action, payload = {}) {
  const res  = await fetch(APPS_SCRIPT_URL, { method:"POST", redirect:"follow", headers:{ "Content-Type":"text/plain" }, body:JSON.stringify({ action, ...payload }) });
  const json = await res.json();
  if (json.error) throw new Error(json.error);
  return json;
}

// ─── BUILD READABLE SUBMISSION ROWS ──────────────────────────────────────────
function buildSubmissionRows(questions, answers) {
  return questions.map((q) => {
    const raw = answers[q.id];
    let answer = "";
    if (raw === undefined || raw === null || raw === "") { answer = "—"; }
    else if (q.type === "calendar") {
      if (raw?.start instanceof Date) answer = `${raw.start.toLocaleString()} – ${raw.end.toLocaleString()}`;
      else answer = String(raw);
    } else if (q.type === "multiple_choice_multi") {
      answer = Array.isArray(raw) && raw.length > 0 ? raw.join(", ") : "—";
    } else { answer = String(raw); }
    return { id:q.id, question:q.question, answer };
  });
}

// ─── CALENDAR HELPERS ─────────────────────────────────────────────────────────
const DAYS   = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
function isSameDay(a,b) { return a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate(); }
function buildGrid(year,month) {
  const first  = new Date(year,month,1);
  const lastDay= new Date(year,month+1,0).getDate();
  const cells  = [];
  for (let i=0;i<first.getDay();i++) cells.push(null);
  for (let d=1;d<=lastDay;d++) cells.push(new Date(year,month,d));
  while (cells.length%7!==0) cells.push(null);
  return cells;
}
function fmtTimeInZone(date,timezone) { return date.toLocaleTimeString([],{ hour:"numeric", minute:"2-digit", timeZone:timezone }); }
function toLocalDateString(d) { return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`; }

// ─── MOBILE DETECTION HOOK ────────────────────────────────────────────────────
function useIsMobile(breakpoint=640) {
  const [isMobile,setIsMobile] = useState(typeof window!=="undefined" ? window.innerWidth<breakpoint : false);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth<breakpoint);
    window.addEventListener("resize",handler);
    return () => window.removeEventListener("resize",handler);
  },[breakpoint]);
  return isMobile;
}

// ─── CALENDLY-STYLE PICKER ────────────────────────────────────────────────────
function CalendarPicker({ q, value, onChange }) {
  const { workingHours={start:9,end:18}, daysAhead=60, timezone=Intl.DateTimeFormat().resolvedOptions().timeZone } = q;
  const isMobile = useIsMobile();
  const today = new Date(); today.setHours(0,0,0,0);
  const maxDate = new Date(today); maxDate.setDate(maxDate.getDate()+daysAhead);
  const [viewYear,setViewYear]   = useState(today.getFullYear());
  const [viewMonth,setViewMonth] = useState(today.getMonth());
  const [selDate,setSelDate]     = useState(null);
  const [slots,setSlots]         = useState([]);
  const [loading,setLoading]     = useState(false);
  const [fetchErr,setFetchErr]   = useState("");
  const [panelKey,setPanelKey]   = useState(0);

  useEffect(() => {
    if (!selDate) return;
    setLoading(true); setFetchErr(""); setSlots([]); onChange(null);
    callScript("getSlots",{ date:toLocalDateString(selDate), workingHours, timezone })
      .then(({ slots:raw }) => { setSlots((raw||[]).map((s) => ({ start:new Date(s.start), end:new Date(s.end) }))); })
      .catch((err) => setFetchErr(err.message||"Couldn't load availability. Try again."))
      .finally(() => setLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[selDate]);

  const cells   = buildGrid(viewYear,viewMonth);
  const canPrev = !(viewYear===today.getFullYear()&&viewMonth===today.getMonth());
  const canNext = new Date(viewYear,viewMonth+1,1)<=maxDate;
  const prevMonth = () => { if (!canPrev) return; if (viewMonth===0){setViewYear(y=>y-1);setViewMonth(11);}else setViewMonth(m=>m-1); };
  const nextMonth = () => { if (!canNext) return; if (viewMonth===11){setViewYear(y=>y+1);setViewMonth(0);}else setViewMonth(m=>m+1); };
  const isAvailable = (d) => d && d>=today && d<=maxDate && d.getDay()!==0;
  const handleDateClick = (d) => { if (!isAvailable(d)) return; setSelDate(d); setPanelKey(k=>k+1); };
  const fmtTime   = useCallback((d) => fmtTimeInZone(d,timezone),[timezone]);
  const selKey    = value?.start?.toISOString?.()??null;
  const handleDropdownChange = (e) => {
    const iso = e.target.value; if (!iso){onChange(null);return;}
    const slot = slots.find(s=>s.start.toISOString()===iso); if (slot) onChange({ start:slot.start, end:slot.end });
  };

  return (
    <div className="flex flex-col sm:flex-row w-full border border-text/10 rounded-2xl overflow-hidden bg-bg/60 backdrop-blur-sm">
      <div className={["flex flex-col p-5 sm:p-6 transition-all duration-300", selDate?"sm:border-r border-b sm:border-b-0 border-text/8 sm:w-[56%]":"w-full"].join(" ")}>
        <div className="flex items-center justify-between mb-5">
          <span className="text-[15px] font-semibold tracking-[-0.02em] text-text">{MONTHS[viewMonth]} {viewYear}</span>
          <div className="flex gap-1">
            <button onClick={prevMonth} disabled={!canPrev} className="w-8 h-8 rounded-full flex items-center justify-center text-text/50 hover:bg-text/8 hover:text-text disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-150">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button onClick={nextMonth} disabled={!canNext} className="w-8 h-8 rounded-full flex items-center justify-center text-text/50 hover:bg-text/8 hover:text-text disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-150">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 mb-1">
          {DAYS.map(d=><div key={d} className="text-center text-[11px] font-medium text-text/25 tracking-[0.06em] uppercase py-1">{d}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-y-1">
          {cells.map((d,i) => {
            if (!d) return <div key={`e${i}`}/>;
            const avail = isAvailable(d); const isToday = isSameDay(d,today); const isSel = selDate&&isSameDay(d,selDate);
            return (
              <div key={d.toISOString()} className="flex items-center justify-center aspect-square">
                <button onClick={() => handleDateClick(d)} disabled={!avail}
                  className={["w-9 h-9 rounded-full text-[13px] font-medium flex items-center justify-center transition-all duration-150",
                    isSel?"bg-primary text-bg font-semibold":isToday&&avail?"border border-primary/50 text-text hover:bg-primary/10":avail?"text-text font-semibold hover:bg-text/8":"text-text/15 cursor-not-allowed"].join(" ")}>
                  {d.getDate()}
                </button>
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-1.5 mt-5 text-text/25 text-[12px] font-medium">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          {timezone}
        </div>
      </div>
      {selDate && (
        <div key={panelKey} className="panel-slide-in flex flex-col sm:w-[44%] p-5 sm:p-6 sm:overflow-y-auto sm:max-h-[400px]">
          <div className="mb-4">
            <p className="text-[11px] font-semibold text-text/30 uppercase tracking-[0.08em] mb-0.5">{selDate.toLocaleDateString([],{ weekday:"long", timeZone:timezone })}</p>
            <p className="text-[15px] font-semibold text-text tracking-[-0.02em]">{selDate.toLocaleDateString([],{ month:"long", day:"numeric", timeZone:timezone })}</p>
          </div>
          {loading && <div className="flex flex-col gap-2">{[...Array(6)].map((_,i)=><div key={i} className="h-10 rounded-xl bg-text/5 animate-pulse" style={{ animationDelay:`${i*60}ms`}}/>)}</div>}
          {fetchErr&&!loading&&<div className="flex items-center gap-2 text-rose-400 text-[13px] font-medium py-1"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>{fetchErr}</div>}
          {!loading&&!fetchErr&&slots.length===0&&<p className="text-text/25 text-[13px] font-medium py-1">No availability on this day.</p>}
          {!loading&&!fetchErr&&slots.length>0&&isMobile&&(
            <div className="relative">
              <select value={selKey??""} onChange={handleDropdownChange}
                className={["w-full appearance-none py-3 pl-4 pr-10 rounded-xl border text-[14px] font-semibold bg-bg text-text outline-none cursor-pointer transition-all duration-150",selKey?"border-primary bg-primary/5":"border-text/12 text-text/50"].join(" ")}>
                <option value="">Select a time…</option>
                {slots.map(slot=><option key={slot.start.toISOString()} value={slot.start.toISOString()}>{fmtTime(slot.start)}</option>)}
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text/40"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg></div>
            </div>
          )}
          {!loading&&!fetchErr&&slots.length>0&&!isMobile&&(
            <div className="flex flex-col gap-2">
              {slots.map(slot=>{
                const key=slot.start.toISOString(); const isSel=selKey===key;
                return (
                  <button key={key} onClick={()=>onChange({ start:slot.start, end:slot.end })}
                    className={["w-full py-2.5 px-4 rounded-xl border text-[14px] font-semibold tracking-[-0.01em] text-left transition-all duration-150",isSel?"border-primary bg-primary/10 text-text":"border-text/10 text-text/60 hover:border-text/25 hover:text-text hover:bg-text/4"].join(" ")}>
                    <span className="flex items-center justify-between">
                      <span>{fmtTime(slot.start)}</span>
                      {isSel&&<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-primary"><polyline points="20 6 9 17 4 12"/></svg>}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── MULTI-SELECT CHOICE ──────────────────────────────────────────────────────
function MultiSelectChoices({ q, value=[], onChange }) {
  const selected = Array.isArray(value) ? value : [];
  const toggle = (label) => { const next = selected.includes(label) ? selected.filter(v=>v!==label) : [...selected,label]; onChange(next); };
  return (
    <div className="flex flex-col gap-2">
      {q.choices.map(choice=>{
        const isSel = selected.includes(choice.label);
        return (
          <button key={choice.key} onClick={()=>toggle(choice.label)}
            className={["group flex items-center gap-4 px-5 py-4 rounded-xl border text-left transition-all duration-200",isSel?"border-border bg-bg":"border-border bg-subPrimary/5 hover:border-text/16 hover:bg-subPrimary/20 hover:translate-x-1.5"].join(" ")}>
            <span className={["w-6 h-6 rounded-md border flex items-center justify-center shrink-0 transition-all duration-200",isSel?"bg-primary border-primary":"border-primary/20 group-hover:border-text/30"].join(" ")}>
              {isSel
                ? <svg className="check-pop text-bg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                : <span className="text-[11px] font-medium text-text/60 font-secondary group-hover:text-text/80 transition-colors duration-150">{choice.key}</span>
              }
            </span>
            <span className="text-[14px] font-medium leading-snug tracking-[-0.005em] text-text">{choice.label}</span>
          </button>
        );
      })}
      {selected.length>0&&<p className="text-[12px] font-semibold text-primary/70 mt-1 tracking-[-0.01em]">{selected.length} selected</p>}
    </div>
  );
}

// ─── SECTION INTRO SCREEN ─────────────────────────────────────────────────────
function SectionIntroScreen({ section, sectionNumber, totalSections, questionCount, onContinue }) {
  useEffect(() => {
    const handler = (e) => { if (e.key==="Enter"){ e.preventDefault(); onContinue(); } };
    window.addEventListener("keydown",handler);
    return () => window.removeEventListener("keydown",handler);
  },[onContinue]);

  return (
    <div className="w-full flex flex-col gap-7 intro-enter">
      <div className="section-badge-pop inline-flex items-center border border-primary px-3 py-0.5 w-min rounded-full gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-primary"/>
        <span className="text-[12px] sm:text-[13px] text-primary max-w-md font-semibold text-justify leading-[22.4px] opacity-90 w-max select-none italic">
          Section {sectionNumber} of {totalSections}
        </span>
      </div>
      <div className="relative">
        <span aria-hidden="true" className="absolute -top-3 -left-1 text-[88px] leading-none font-bold select-none pointer-events-none font-secondary text-text/[0.08]">
          {String(sectionNumber).padStart(2,"0")}
        </span>
        <h2 className="relative text-[clamp(28px,5vw,46px)] leading-[1.12] tracking-[-0.03em] font-secondary text-text">
          {section.title}
        </h2>
      </div>
      {section.description&&(
        <p className="text-[16px] font-medium text-text/50 leading-relaxed max-w-[500px] tracking-[-0.01em]">{section.description}</p>
      )}
      <div className="flex items-center gap-2.5 text-text/40">
        <div className="flex gap-1">
          {Array.from({ length:questionCount }).map((_,i)=>(
            <span key={i} className="w-1.5 h-1.5 rounded-full bg-primary/30" style={{ animationDelay:`${i*60}ms`}}/>
          ))}
        </div>
        <span className="text-[13px] font-medium italic">{questionCount} question{questionCount!==1?"s":""} in this section</span>
      </div>
      <div className="w-10 h-px bg-primary/20"/>
      <div className="flex items-center gap-10">
        <CTAButton variant="filled" onClick={onContinue} radius={12} showArrow>
          <span className="font-primary font-semibold">Continue</span>
        </CTAButton>
        <span className="text-text/50 font-primary text-[12px] font-semibold italic hidden md:flex items-center gap-2">
          press <kbd className="bg-text/5 border border-text/8 rounded-md px-2 py-1 ml-1 text-[12px]">Enter ↵</kbd>
        </span>
      </div>
    </div>
  );
}

// ─── ANIMATED SECTION STEPPER ─────────────────────────────────────────────────
// Full-width horizontal stepper. Scrolls if steps overflow the container.
// Uses CSS transitions (no framer-motion) to match the rest of the file.
function SectionStepper({ sections, currentSectionIdx, showingSectionIntro, upcomingSectionIdx }) {
  const scrollRef = useRef(null);

  // The "active" visual index: when showing a section intro, highlight the
  // upcoming section so the user sees where they're headed.
  const visualIdx = showingSectionIntro ? upcomingSectionIdx : currentSectionIdx;

  // Auto-scroll active step into view on narrow screens
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const activeNode = el.querySelector("[data-stepper-active='true']");
    if (activeNode) activeNode.scrollIntoView({ behavior:"smooth", block:"nearest", inline:"center" });
  },[visualIdx]);

  const totalSections = sections.length;
  // Progress rail fills from step 0 to the visual active step
  const progressPct = totalSections > 1 ? (visualIdx / (totalSections - 1)) * 100 : 0;

  return (
    <div
      ref={scrollRef}
      className="overflow-x-auto mb-0"
      style={{ scrollbarWidth:"none", WebkitOverflowScrolling:"touch" }}
    >
      {/* min-w-max: never shrinks below natural size (enables scroll on mobile)
          w-full: expands to fill container on desktop */}
      <div className="relative flex items-start min-w-max w-full" style={{ paddingBottom:4 }}>

        {/* Background rail */}
        <div
          className="absolute left-0 right-0 bg-border pointer-events-none"
          style={{ top:9, height:1 }}
        />

        {/* Animated progress rail */}
        <div
          className="absolute left-0 bg-primary pointer-events-none stepper-rail-fill"
          style={{ top:9, height:1, width:`${progressPct}%` }}
        />

        {/* Steps */}
        {sections.map((sec, i) => {
          const isActive = i === visualIdx;
          const isPast   = i < visualIdx;

          return (
            <div
              key={sec.id ?? i}
              data-stepper-active={isActive}
              className="stepper-step relative flex flex-col items-start flex-1"
              style={{ minWidth:110 }}
            >
              {/* Node */}
              <div className="relative mb-3.5" style={{ width:20, height:20 }}>
                {/* Outer ring */}
                <div
                  className="stepper-node absolute inset-0 rounded-full border"
                  style={{
                    backgroundColor: isActive || isPast ? "var(--color-primary, #0E513C)" : "transparent",
                    borderColor:     isActive || isPast ? "var(--color-primary, #0E513C)" : "#D1D5DB",
                    transform:       isActive ? "scale(1.1)" : "scale(1)",
                  }}
                />
                {/* Inner white dot — active only */}
                <div
                  className="stepper-node-dot absolute rounded-full bg-bg"
                  style={{
                    width:7, height:7,
                    top:"50%", left:"50%",
                    transform:"translate(-50%,-50%)",
                    opacity: isActive ? 1 : 0,
                  }}
                />
                {/* Checkmark — past sections */}
                {isPast && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                )}
              </div>

              {/* Labels */}
              <div className="flex flex-col gap-[3px] pr-6 md:pr-10">
                <span
                  className="stepper-label-num font-primary text-[10px] tabular-nums leading-none"
                  style={{ color: isActive ? "var(--color-primary, #0E513C)" : "#9CA3AF" }}
                >
                  {String(i + 1).padStart(2,"0")}
                </span>
                <span
                  className="stepper-label-name font-primary text-[13px] md:text-[14px] leading-snug whitespace-nowrap"
                  style={{
                    color:      isActive ? "var(--color-primary, #0E513C)" : isPast ? "#6B7280" : "#6B7280",
                    fontWeight: isActive ? 600 : 400,
                  }}
                >
                  {sec.title}
                </span>
              </div>

              {/* Hover underline (inactive steps only) */}
              {!isActive && (
                <div
                  className="stepper-hover-line absolute bg-primary"
                  style={{ bottom:0, left:0, height:1, width:"70%" }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── MAIN FORM ────────────────────────────────────────────────────────────────
export default function TypeformLeadForm({
  questions      = SAMPLE_QUESTIONS,
  sections       = null,
  showBackButton = false,
  onSubmit,
  title          = "Qundos Form",
  thankYouTitle  = "You're in! Thank you.",
  thankYouSub    = "We'll review your answers and be in touch within 24 hours.",
  // "application" → books a slot if a calendar question exists, otherwise sends
  //                  an email to the admin (existing behaviour, unchanged).
  // "inquiry"     → calls sendInquiry on the Apps Script. No calendar. No client
  //                  confirmation email. Admin-only notification.
  formType       = "application",
}) {
  // ── State ───────────────────────────────────────────────────────────────────
  const [current,   setCurrent]   = useState(0);
  const [answers,   setAnswers]   = useState({});
  const [direction, setDirection] = useState("up");
  const [phase,     setPhase]     = useState("idle");
  const [submitted, setSubmitted] = useState(false);
  const [error,     setError]     = useState("");
  const [booking,   setBooking]   = useState(false);

  // Section state
  // If sections are provided, always start by showing the first section intro.
  const [showingSectionIntro, setShowingSectionIntro] = useState(Boolean(sections && sections.length > 0));
  const [upcomingSectionIdx,  setUpcomingSectionIdx]  = useState(0);
  const [upcomingFirstQIdx,   setUpcomingFirstQIdx]   = useState(0);

  const inputRef = useRef(null);
  const busy     = useRef(false);
  const total    = questions.length;
  const q        = questions[current];

  // ── Section data ────────────────────────────────────────────────────────────
  const sectionMap = useMemo(() => buildSectionMap(questions, sections), [questions, sections]);
  const resolvedSections = useMemo(() => {
    if (!sections || !sectionMap) return null;
    return sections.map((sec, i) => ({ ...sec, questionCount: sectionMap.filter(s => s === i).length }));
  },[sections, sectionMap]);

  const currentSectionIdx = sectionMap ? sectionMap[current] : 0;

  // ── Progress bar ────────────────────────────────────────────────────────────
  const pct = submitted ? 100 : (current / total) * 100;

  // ── Inject CSS ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const tag = document.createElement("style");
    tag.textContent = ANIM_CSS;
    document.head.appendChild(tag);
    return () => document.head.removeChild(tag);
  },[]);

  // ── Auto-focus ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (phase === "idle" && !showingSectionIntro && inputRef.current) {
      const t = setTimeout(() => inputRef.current?.focus(), 300);
      return () => clearTimeout(t);
    }
  },[phase, current, showingSectionIntro]);

  // ── Validation ───────────────────────────────────────────────────────────────
  const validate = useCallback(() => {
    if (!q) return true;
    const val = answers[q.id];
    if (q.type === "multiple_choice_multi") {
      if (q.required && (!Array.isArray(val) || val.length === 0)) { setError("Please select at least one option."); return false; }
      setError(""); return true;
    }
    if (q.required && (!val || (typeof val === "string" && !val.trim()))) {
      setError(q.type === "calendar" ? "Please select an available time slot." : "This question requires an answer.");
      return false;
    }
    if (q.inputType === "email" && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) { setError("Please enter a valid email address."); return false; }
    setError(""); return true;
  },[answers, q]);

  // ── Core navigation ─────────────────────────────────────────────────────────
  const goTo = useCallback((nextIdx, dir) => {
    if (busy.current) return;
    busy.current = true;
    setDirection(dir); setPhase("exiting");
    setTimeout(() => { setCurrent(nextIdx); setPhase("entering"); setTimeout(() => { setPhase("idle"); busy.current = false; }, 560); }, 450);
  },[]);

  // ── Section intro → first question ─────────────────────────────────────────
  const handleSectionContinue = useCallback(() => {
    if (busy.current) return;
    busy.current = true;
    setDirection("up"); setPhase("exiting");
    setTimeout(() => {
      setShowingSectionIntro(false);
      setCurrent(upcomingFirstQIdx);
      setPhase("entering");
      setTimeout(() => { setPhase("idle"); busy.current = false; }, 560);
    }, 450);
  },[upcomingFirstQIdx]);

  // ── Final submit ─────────────────────────────────────────────────────────────
  const submitForm = useCallback(async (finalAnswers) => {
    const submissionRows = buildSubmissionRows(questions, finalAnswers);
    setBooking(true);
 
    try {
      // ── INQUIRY — admin-only notification, no calendar ──────────────────
      if (formType === "inquiry") {
        await callScript("sendInquiry", {
          name:           finalAnswers.name  || "Unknown",
          email:          finalAnswers.email || "",
          submissionRows,
        });
 
      // ── APPLICATION — existing behaviour ────────────────────────────────
      } else {
        const calQ        = questions.find(q => q.type === "calendar");
        const hasCalendar = Boolean(calQ);
        const slot        = hasCalendar ? finalAnswers[calQ.id] : null;
 
        if (hasCalendar && slot) {
          await callScript("bookSlot", {
            start:          slot.start.toISOString(),
            end:            slot.end.toISOString(),
            name:           finalAnswers.name  || "Unknown",
            email:          finalAnswers.email?.trim() || "noreply@placeholder.invalid",
            notes:          finalAnswers.notes || "",
            submissionRows,
          });
        } else {
          await callScript("sendEmail", {
            name:           finalAnswers.name  || "Unknown",
            email:          finalAnswers.email || "",
            submissionRows,
          });
        }
      }
    } catch (err) {
      // If a calendar booking fails, bounce the user back to the calendar step
      if (formType === "application") {
        const calIdx = questions.findIndex(q => q.type === "calendar");
        if (calIdx >= 0) {
          setError(err.message || "Booking failed. Please pick another time.");
          setBooking(false);
          busy.current = false;
          goTo(calIdx, "down");
          return;
        }
      }
      // For inquiry or non-calendar application failures, log and continue
      console.error("submitForm failed:", err.message);
    }
 
    setBooking(false);
    setSubmitted(true);
    busy.current = false;
    onSubmit?.(finalAnswers, submissionRows);
  }, [questions, onSubmit, goTo, formType]); 

  // ── Section boundary helper ─────────────────────────────────────────────────
  const triggerSectionIntro = useCallback((nextIdx) => {
    if (busy.current) return;
    busy.current = true;
    setDirection("up"); setPhase("exiting");
    setTimeout(() => {
      setUpcomingSectionIdx(sectionMap[nextIdx]);
      setUpcomingFirstQIdx(nextIdx);
      setShowingSectionIntro(true);
      setPhase("entering");
      setTimeout(() => { setPhase("idle"); busy.current = false; }, 560);
    }, 450);
  },[sectionMap]);

  // ── Next / submit ─────────────────────────────────────────────────────────────
  const tryNext = useCallback(() => {
    if (!validate()) return;
    if (current < total - 1) {
      const nextIdx = current + 1;
      if (sectionMap && sectionMap[nextIdx] !== sectionMap[current]) { triggerSectionIntro(nextIdx); return; }
      goTo(nextIdx,"up");
    } else {
      if (busy.current) return;
      busy.current = true;
      setPhase("exiting"); setDirection("up");
      setTimeout(() => { submitForm(answers); }, 450);
    }
  },[validate, current, total, goTo, answers, submitForm, sectionMap, triggerSectionIntro]);

  const prev = useCallback(() => {
    if (busy.current || current === 0) return;
    setError(""); goTo(current - 1,"down");
  },[current, goTo]);

  // ── Single-choice auto-advance ───────────────────────────────────────────────
  const pick = useCallback((id, label) => {
    const next = { ...answers, [id]: label };
    setAnswers(next); setError("");
    setTimeout(() => {
      if (current < total - 1) {
        const nextIdx = current + 1;
        if (sectionMap && sectionMap[nextIdx] !== sectionMap[current]) { triggerSectionIntro(nextIdx); return; }
        goTo(nextIdx,"up");
      } else {
        if (busy.current) return;
        busy.current = true; setPhase("exiting"); setDirection("up");
        setTimeout(() => submitForm(next), 450);
      }
    }, 320);
  },[current, total, goTo, answers, submitForm, sectionMap, triggerSectionIntro]);

  // ── Keyboard shortcuts ───────────────────────────────────────────────────────
  useEffect(() => {
    if (submitted || showingSectionIntro) return;
    const handler = (e) => {
      if (!q) return;
      const isLast = current === total - 1;
      if (q.type === "calendar") { if (e.key==="Enter"&&answers[q.id]){ e.preventDefault(); tryNext(); } return; }
      if (q.type === "multiple_choice_multi") {
        const match = q.choices?.find(c=>c.key===e.key.toUpperCase());
        if (match) { const cur=Array.isArray(answers[q.id])?answers[q.id]:[]; const next=cur.includes(match.label)?cur.filter(v=>v!==match.label):[...cur,match.label]; setAnswers(a=>({...a,[q.id]:next})); setError(""); return; }
        if (e.key==="Enter"){ e.preventDefault(); tryNext(); }
        return;
      }
      if (e.key === "Enter" && !e.shiftKey && q.type !== "textarea") {
        if (q.type==="multiple_choice"&&!answers[q.id]) return;
        e.preventDefault(); tryNext();
      }
      if (q.type==="multiple_choice") {
        const match = q.choices?.find(c=>c.key===e.key.toUpperCase());
        if (match){ pick(q.id,match.label); return; }
        if (e.key==="ArrowDown"){ e.preventDefault(); const idx=q.choices.findIndex(c=>c.label===answers[q.id]); const nxt=q.choices[Math.min(idx+1,q.choices.length-1)]; if (nxt) setAnswers(a=>({...a,[q.id]:nxt.label})); }
        if (e.key==="ArrowUp"){ e.preventDefault(); const idx=q.choices.findIndex(c=>c.label===answers[q.id]); const prv=q.choices[Math.max(idx-1,0)]; if (prv) setAnswers(a=>({...a,[q.id]:prv.label})); }
      }
    };
    window.addEventListener("keydown",handler);
    return () => window.removeEventListener("keydown",handler);
  },[q, answers, tryNext, pick, submitted, current, total, showingSectionIntro]);

  // ── Animation class ──────────────────────────────────────────────────────────
  const slideClass = () => {
    if (phase==="exiting")  return direction==="up" ? "slide-exit-up"   : "slide-exit-down";
    if (phase==="entering") return direction==="up" ? "slide-enter-up"  : "slide-enter-down";
    return "";
  };

  const restart = () => {
    setAnswers({}); setCurrent(0); setSubmitted(false);
    // Reset to first section intro if sections exist
    if (sections && sections.length > 0) {
      setUpcomingSectionIdx(0); setUpcomingFirstQIdx(0); setShowingSectionIntro(true);
    } else {
      setShowingSectionIntro(false);
    }
    setPhase("entering"); setDirection("up");
    setTimeout(() => setPhase("idle"), 560);
  };

  // ── Derived flags ────────────────────────────────────────────────────────────
  const showNextButton = q?.type==="text" || q?.type==="textarea" || q?.type==="calendar" || q?.type==="multiple_choice_multi";
  const isMultiSelect  = q?.type==="multiple_choice_multi";
  const multiSelCount  = isMultiSelect && Array.isArray(answers[q?.id]) ? answers[q.id].length : 0;

  // Topbar counter — question number only, hidden on section intro and thank-you
  const counterLabel = !submitted && !showingSectionIntro
    ? `${current + 1} / ${total}`
    : null;

    const navigate = useNavigate();

  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <div className="font-primary bg-bg text-text min-h-screen flex flex-col relative overflow-hidden">
      <PageTexture />

      {/* ── Progress bar ── */}
      <div className="fixed top-0 left-0 right-0 h-1.5 bg-text/2 z-50">
        <div className="h-full bg-primary transition-all duration-700 ease-out" style={{ width:`${pct}%`}}/>
      </div>

      {/* ── Top bar ── */}
      <div className="fixed top-0 left-0 right-0 px-8 py-6 flex items-center justify-between z-40 border-b border-border bg-bg">
        <div className="flex items-center justify-start gap-8">
          <div className={`${showBackButton?"flex":"hidden"} cursor-pointer`} onClick={() => navigate(-1)}>
            <ArrowLeftIcon className="h-4 w-4"/>
          </div>
          <Link to="/"><img src={brand_logos.qundos_logo} alt="Qundos" width="18"/></Link>
        </div>
        <span className="text-text text-[14px] md:text-[16px] tracking-[-0.01em] font-primary font-semibold">{title}</span>
        {counterLabel
          ? <span className="text-text text-[12px] tracking-[0.1em] uppercase font-secondary">{counterLabel}</span>
          : <span className="w-[48px]"/>
        }
      </div>

      {/* ── Main viewport ── */}
      <div className="flex-1 flex items-center justify-center px-8 pt-28 pb-28 relative z-10">
        <div className="w-full max-w-[680px] relative min-h-[320px] flex items-start">

          {/* ── THANK YOU ── */}
          {submitted ? (
            <ThankYouScreen title={thankYouTitle} sub={thankYouSub} onRestart={restart}/>

          /* ── SECTION INTRO ── */
          ) : showingSectionIntro && resolvedSections ? (
            <div key={`section-intro-${upcomingSectionIdx}`} className={`w-full ${slideClass()}`}>
              <SectionIntroScreen
                section={resolvedSections[upcomingSectionIdx]}
                sectionNumber={upcomingSectionIdx+1}
                totalSections={resolvedSections.length}
                questionCount={resolvedSections[upcomingSectionIdx]?.questionCount??0}
                onContinue={handleSectionContinue}
              />
            </div>

          /* ── QUESTIONS ── */
          ) : (
            <div key={current} className={`w-full flex flex-col gap-9 ${slideClass()}`}>

              {/* Step tag */}
              <div className="flex items-center gap-2 text-text/25 text-[11px] tracking-[0.1em] uppercase font-medium">
                <span className="w-[18px] h-[18px] rounded-full bg-subPrimary/60 font-secondary text-primary text-[10px] flex items-center justify-center font-medium">
                  {current + 1}
                </span>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>

              {/* Question text */}
              <h2 className="text-[clamp(22px,3.8vw,34px)] leading-[1.25] tracking-[-0.025em] font-secondary text-text">
                {q.question}
                {q.required && <span className="text-primary ml-1 text-[36px]">*</span>}
              </h2>

              {/* Text input */}
              {q.type==="text"&&(
                <div className="font-primary border-b border-text/10 pb-1.5 transition-colors duration-200 focus-within:border-primary/50">
                  <input ref={inputRef} type={q.inputType||"text"} placeholder={q.placeholder} value={answers[q.id]||""}
                    onChange={e=>{ setAnswers(a=>({...a,[q.id]:e.target.value})); setError(""); }}
                    onKeyDown={e=>{ if(e.key==="Enter"){ e.stopPropagation(); tryNext(); }}}
                    className="w-full bg-transparent text-text text-[18px] font-medium placeholder:text-text/40 outline-none caret-primary py-1.5 tracking-[-0.01em]"/>
                </div>
              )}

              {/* Textarea */}
              {q.type==="textarea"&&(
                <div className="font-primary border-b border-text/10 pb-1.5 transition-colors duration-200 focus-within:border-primary/50">
                  <textarea ref={inputRef} placeholder={q.placeholder} value={answers[q.id]||""} rows={3}
                    onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); tryNext(); } }}
                    onChange={e=>{ setAnswers(a=>({...a,[q.id]:e.target.value})); setError(""); }}
                    className="w-full bg-transparent text-text text-[18px] font-medium placeholder:text-text/40 outline-none caret-primary py-1.5 resize-none leading-relaxed tracking-[-0.01em]"/>
                </div>
              )}

              {/* Single choice */}
              {q.type==="multiple_choice"&&(
                <div className="flex flex-col gap-2">
                  {q.choices.map(choice=>{
                    const sel = answers[q.id]===choice.label;
                    return (
                      <button key={choice.key} onClick={()=>pick(q.id,choice.label)}
                        className={["group flex items-center gap-4 px-5 py-4 rounded-xl border text-left transition-all duration-200",sel?"border-border bg-bg":"border-border bg-subPrimary/5 hover:border-text/16 hover:bg-subPrimary/20 hover:translate-x-1.5"].join(" ")}>
                        <span className={["w-6 h-6 rounded-md border flex items-center justify-center text-[11px] font-medium shrink-0 transition-all duration-200",sel?"bg-primary border-primary text-bg font-secondary":"border-primary/20 text-text/60 font-secondary group-hover:border-text/30"].join(" ")}>{choice.key}</span>
                        <span className="text-[14px] font-medium leading-snug tracking-[-0.005em] text-text">{choice.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Multi-select */}
              {q.type==="multiple_choice_multi"&&(
                <MultiSelectChoices q={q} value={answers[q.id]} onChange={val=>{ setAnswers(a=>({...a,[q.id]:val})); setError(""); }}/>
              )}

              {/* Calendar */}
              {q.type==="calendar"&&(
                <CalendarPicker q={q} value={answers[q.id]??null} onChange={slot=>{ setAnswers(a=>({...a,[q.id]:slot})); setError(""); }}/>
              )}

              {/* Error */}
              {error&&(
                <div className="flex items-center gap-2 text-rose-400 text-[14px] font-medium -mt-2">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  {error}
                </div>
              )}

              {/* Next / Submit */}
              {showNextButton&&(
                <div className="flex items-center gap-10">
                  <CTAButton variant="filled" onClick={tryNext} radius={12} showArrow={!booking} disabled={booking}>
                    <span className="font-primary font-semibold flex items-center gap-2">
                      {booking ? (
                        <>
                          <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                          </svg>
                          {formType === "inquiry"
                            ? "Sending…"
                            : questions.find(q => q.type === "calendar") ? "Booking…" : "Sending…"}
                        </>
                      ) : current === total - 1 ? "Submit" : "Next"}
                    </span>
                  </CTAButton>
                  {q.type!=="calendar"&&!booking&&(
                    <span className="text-text/50 font-primary text-[12px] font-semibold italic hidden md:flex">
                      {q.type==="textarea" ? (
                        <div className="flex items-center gap-2">press <kbd className="bg-text/5 border border-text/8 rounded-md px-1.5 py-0.5 mx-1 text-[12px]">Enter ↵</kbd> to {current===total-1?"submit":"continue"}, <kbd className="bg-text/5 border border-text/8 rounded-md px-1.5 py-0.5 ml-5 mr-1 text-[12px]">Shift+Enter</kbd> for new line</div>
                      ) : q.type==="multiple_choice_multi" ? (
                        multiSelCount>0
                          ? <div className="flex items-center gap-2">press <kbd className="bg-text/5 border border-text/8 rounded-md px-2 py-1 ml-1 text-[12px]">Enter ↵</kbd> to continue</div>
                          : <div className="flex items-center gap-1">use keys <kbd className="bg-text/5 border border-text/8 rounded-md px-1.5 py-0.5 mx-0.5 text-[12px]">A</kbd>–<kbd className="bg-text/5 border border-text/8 rounded-md px-1.5 py-0.5 mx-0.5 text-[12px]">{q.choices[q.choices.length-1]?.key??"E"}</kbd> to toggle</div>
                      ) : (
                        <div className="flex items-center gap-2">press <kbd className="bg-text/5 border border-text/8 rounded-md px-2 py-1 ml-1 text-[12px]">Enter ↵</kbd></div>
                      )}
                    </span>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Nav arrows — hidden on section intro and thank-you ── */}
      {!submitted&&!showingSectionIntro&&(
        <div className="fixed bottom-6 right-6 flex gap-2 z-40">
          <button onClick={prev} disabled={current===0||booking}
            className="w-9 h-9 rounded-[12px] border border-text/8 bg-bg text-text flex items-center justify-center hover:border-text/20 hover:text-text/60 disabled:opacity-15 disabled:cursor-not-allowed transition-all duration-200">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 15l-6-6-6 6"/></svg>
          </button>
          <button onClick={tryNext} disabled={booking}
            className="w-9 h-9 rounded-[12px] border border-text/8 bg-bg text-text flex items-center justify-center hover:border-text/20 hover:text-text/60 disabled:opacity-15 disabled:cursor-not-allowed transition-all duration-200">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 9l6 6 6-6"/></svg>
          </button>
        </div>
      )}
    </div>
  );
}

// ─── THANK YOU ────────────────────────────────────────────────────────────────
function ThankYouScreen({ title, sub, onRestart }) {
  return (
    <div className="w-full flex flex-col gap-8 slide-enter-up">
      <h2 className="text-[clamp(26px,4.5vw,40px)] font-secondary leading-[1.2] tracking-[-0.025em] text-text">{title}</h2>
      <p className="text-[15px] font-medium text-text/50 leading-relaxed max-w-[420px] tracking-[-0.005em]">{sub}</p>
      <CTAButton variant="outlined" radius={12} showArrow={true} link="/">
        <span className="font-primary font-semibold">Back to Home Page</span>
      </CTAButton>
    </div>
  );
}