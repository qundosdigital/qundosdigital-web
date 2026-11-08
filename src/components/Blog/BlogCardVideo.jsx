import React, { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { client_images } from '../../assets/assets'
import CTAButton from '../CTAButton'
import {
  ArrowUpRightIcon, XMarkIcon, CalendarIcon,
  PlayIcon, PauseIcon, SpeakerWaveIcon, SpeakerXMarkIcon,
  ArrowsPointingOutIcon, PlayCircleIcon,
} from '@heroicons/react/20/solid'

const DEFAULT_POST = {
  tags: ["UI/UX", "Design System", "Sleep & Care"],
  title: "Why Systems are Trending Again - Even with AI",
  author: {
    avatar:      client_images.client1,
    name:        "Mohammad Assaf",
    description: "Qundos Co-CEO",
    date:        "Jun 25, 2025",
  },
  thumbnail: "https://picsum.photos/seed/vs3/1200/675",
  video:     "https://assets.mixkit.co/active_storage/video_items/100415/1724198576/100415-video-720.mp4",
}

// ── Animation variants ────────────────────────────────────────────────────────

const cardVariants = {
  tilted:   { rotate: 1 },
  straight: { rotate: 0 },
}

const overlayVariants = {
  hidden:  { scale: 0.06, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 260, damping: 24 } },
  exit:    { scale: 0.06, opacity: 0, transition: { type: 'spring', stiffness: 320, damping: 28 } },
}

const fadeVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit:    { opacity: 0, transition: { duration: 0.2 } },
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatTime(s) {
  if (!isFinite(s)) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

// ── Custom video controls bar ─────────────────────────────────────────────────
// Accepts a videoRef so both inline and PiP share the same component.

function VideoControls({ videoRef }) {
  const [playing, setPlaying]   = useState(true)
  const [muted, setMuted]       = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [current, setCurrent]   = useState(0)
  const scrubRef = useRef(null)

  // Sync state when video fires events
  useEffect(() => {
    const v = videoRef.current
    if (!v) return

    const onTimeUpdate = () => {
      setCurrent(v.currentTime)
      setProgress(v.duration ? (v.currentTime / v.duration) * 100 : 0)
    }
    const onDuration  = () => setDuration(v.duration)
    const onPlay      = () => setPlaying(true)
    const onPause     = () => setPlaying(false)
    const onVolumeChg = () => setMuted(v.muted)

    v.addEventListener('timeupdate',    onTimeUpdate)
    v.addEventListener('loadedmetadata', onDuration)
    v.addEventListener('play',          onPlay)
    v.addEventListener('pause',         onPause)
    v.addEventListener('volumechange',  onVolumeChg)

    return () => {
      v.removeEventListener('timeupdate',    onTimeUpdate)
      v.removeEventListener('loadedmetadata', onDuration)
      v.removeEventListener('play',          onPlay)
      v.removeEventListener('pause',         onPause)
      v.removeEventListener('volumechange',  onVolumeChg)
    }
  }, [videoRef])

  const togglePlay = useCallback((e) => {
    e.stopPropagation()
    const v = videoRef.current
    if (!v) return
    playing ? v.pause() : v.play()
  }, [playing, videoRef])

  const toggleMute = useCallback((e) => {
    e.stopPropagation()
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
  }, [videoRef])

  const goFullscreen = useCallback((e) => {
    e.stopPropagation()
    const v = videoRef.current
    if (!v) return
    if (v.requestFullscreen)            v.requestFullscreen()
    else if (v.webkitRequestFullscreen) v.webkitRequestFullscreen()
  }, [videoRef])

  // Scrubber click / drag
  const seek = useCallback((e) => {
    e.stopPropagation()
    const v    = videoRef.current
    const bar  = scrubRef.current
    if (!v || !bar) return
    const rect = bar.getBoundingClientRect()
    const pct  = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    v.currentTime = pct * v.duration
  }, [videoRef])

  return (
    // Stops click bubbling so the card toggle doesn't fire when using controls
    <div
      onClick={e => e.stopPropagation()}
      className="absolute bottom-0 inset-x-0 px-5 md:px-8 pb-4 pt-6 flex flex-col gap-4 z-10"
      style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 100%)' }}
    >
      {/* Scrubber */}
      <div
        ref={scrubRef}
        onClick={seek}
        className="w-full h-1 rounded-full bg-white/30 cursor-pointer relative group"
      >
        <div
          className="h-full rounded-full bg-white/80 transition-all"
          style={{ width: `${progress}%` }}
        />
        {/* Thumb */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          style={{ left: `calc(${progress}% - 6px)` }}
        />
      </div>

      {/* Buttons row */}
      <div className="flex items-center gap-4">
        {/* Play / Pause */}
        <button onClick={togglePlay} className="text-white hover:text-white/80 transition-colors p-0.5">
          {playing
            ? <PauseIcon className="w-5 h-5" />
            : <PlayIcon  className="w- h-5" />}
        </button>

        {/* Time */}
        <span className="text-white/80 text-[11px] font-primary tabular-nums select-none overflow-hidden shrink-0">
          {formatTime(current)} / {formatTime(duration)}
        </span>

        <div className="flex-1" />

        {/* Mute */}
        <button onClick={toggleMute} className="text-white hover:text-white/80 transition-colors p-0.5">
          {muted
            ? <SpeakerXMarkIcon className="w-5 h-5" />
            : <SpeakerWaveIcon  className="w-5 h-5" />}
        </button>

        {/* Fullscreen */}
        <button onClick={goFullscreen} className="text-white hover:text-white/80 transition-colors p-0.5">
          <ArrowsPointingOutIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

function HeroSection_Blog({ featuredPost = DEFAULT_POST }) {
  const [mode, setMode] = useState('idle') // 'idle' | 'inline' | 'overlay'

  const { title, subtitle, tags, author, thumbnail, video } = featuredPost
  const inlineVideoRef  = useRef(null)
  const overlayVideoRef = useRef(null)

  const openOverlay = (e) => {
    e.stopPropagation()
    if (video) setMode('overlay')
  }

  const openInline = () => {
    if (video) setMode(prev => prev === 'inline' ? 'idle' : 'inline')
  }

  const closeOverlay = () => setMode('idle')

  return (
    <>
      <section className="flex flex-col items-stretch justify-between px-8 md:px-12 lg:px-20 xl:px-44 2xl:px-56 pt-8 sm:pt-12 w-full gap-5 bg-bg overflow-hidden">

        {/* ── Copy ── */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end gap-5 sm:py-8 lg:gap-10">
          <div className='flex flex-col justify-center items-start gap-5 lg:gap-10 w-full flex-2'>
            <div className='flex flex-col gap-5'>
              <div className='border border-primary px-3 py-0.5 w-min rounded-full'>
                <p className="text-[12px] sm:text-[13px] text-primary max-w-md font-medium text-justify leading-[22.4px] opacity-90 w-max select-none">
                  Free <span className='italic'>Resources</span> & Assets
                </p>
              </div>
              <h1 className="text-[29px] sm:text-[44px] text-text leading-tight tracking-tight font-primary font-normal min-w-xl select-none">
                <span className="text-primary font-secondary">
                  <span className='text-text'>Learn The </span>
                  <span className='mr-0'>Art </span>
                  <span className='md:mx-1 mr-1'>Of Money.</span>
                </span>
              </h1>
            </div>
            <p className="text-[14px] sm:text-[16px] text-text max-w-md font-primary font-normal text-justify leading-5 select-none -mt-1">
              A resource hub focused on <em className="font-semibold italic text-primary">systems & insights that drive revenue</em> & teach you how to scale digital experiences.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-end w-min justify-between gap-5 sm:gap-8 wrap-anywhere">
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
            <div className="flex items-center gap-4">
              <CTAButton variant='filled' radius={12} showArrow={true} link='/letstalk'>Let's Talk</CTAButton>
              <CTAButton variant='outlined' link='/ourwork'>See Our Work</CTAButton>
            </div>
          </div>
        </div>

        {/* ── Hero Card ── */}
        <motion.div
          className="w-full aspect-4/5 md:aspect-video shrink-0 md:min-h-0 mt-3 sm:mt-10 my-8 cursor-pointer rounded-xl"
          variants={cardVariants}
          animate={mode === 'inline' ? 'straight' : 'tilted'}
          transition={{ type: 'spring', stiffness: 180, damping: 22 }}
          onClick={openInline}
        >
          <div className="relative rounded-xl overflow-hidden w-full h-full">

            <AnimatePresence mode="wait">
              {mode === 'inline' && video ? (

                // ── Inline video ──
                <motion.div
                  key="inline-video"
                  className="absolute inset-0"
                  variants={fadeVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <video
                    ref={inlineVideoRef}
                    src={video}
                    autoPlay
                    preload
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover rounded-xl"
                  />
                  <VideoControls videoRef={inlineVideoRef} />
                </motion.div>

              ) : (

                // ── Thumbnail ──
                <motion.div
                  key="thumbnail"
                  className="absolute inset-0"
                  variants={fadeVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <img
                    src={thumbnail}
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover object-center brightness-80 opacity-90 hover:opacity-95 rounded-xl"
                  />
                </motion.div>

              )}
            </AnimatePresence>

            {/* Overlays — only when not playing inline */}
            {mode !== 'inline' && (
              <>
                <div className="absolute inset-0 bg-linear-to-t from-text/80 via-text/30 to-transparent rounded-xl pointer-events-none" />

                {/* Arrow → opens PiP overlay */}
                <div
                  className="absolute top-4 right-4 w-10 h-10 md:w-15 md:h-15 rounded-full border border-white/30 flex items-center justify-center cursor-pointer z-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                  onClick={openOverlay}
                >
                  <ArrowUpRightIcon className="w-5 h-5 md:w-7 md:h-7 text-white" />
                </div>

                {/* Play icon — centre */}
                {thumbnail && (
                  <div className="absolute inset-0 flex items-center justify-center pb-10 pointer-events-none">
                    <PlayCircleIcon className='h-20 w-20 md:h-40 md:w-40 text-bg/60' />
                  </div>
                )}

                {/* Bottom meta */}
                <div className="absolute bottom-0 inset-x-0 p-5 md:p-8 flex flex-col gap-5 md:gap-6 bg-white/10 backdrop-blur-xs transition-colors border-t border-border/20 ">
                  <div className="flex items-end justify-between gap-4">
                    <span className="hidden lg:block text-subPrimary md:text-[18px] font-secondary select-none">{title}</span>
                    <div className="flex flex-wrap gap-1.5 justify-end  w-full">
                      {tags.map(tag => (
                        <span key={tag} className="px-2.5 py-1 font-primary font-medium rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-bg text-[11px] select-none whitespace-nowrap">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>


                  <div className="flex items-center gap-3 md:gap-4 border-bg/40 ">
                    <img src={author.avatar} alt={author.name} className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border border-border/60" />
                    <div className="flex flex-col">
                      <span className="text-bg/80 text-[11px] md:text-[13px] font-semibold font-primary select-none">{author.name}</span>
                      <span className="text-bg/60 text-[11px] md:text-[13px] font-medium italic font-primary select-none">{author.description}</span>
                    </div>
                    <div className="flex items-center gap-2 ml-auto text-bg/60">
                      <CalendarIcon className='h-4 w-4 md:h-5 md:w-5' />
                      <span className="text-[11px] md:text-[13px] italic font-primary font-medium select-none">{author.date}</span>
                    </div>
                  </div>
                </div>
              </>
            )}

          </div>
        </motion.div>
      </section>

      {/* ── PiP overlay player ── */}
      <AnimatePresence>
        {mode === 'overlay' && (
          <motion.div
            key="overlay-player"
            className="fixed top-32 sm:top-34 right-5 z-50 rounded-lg overflow-hidden bg-text/80 w-[min(60vw,260px)] sm:w-72 md:w-80"
            style={{ aspectRatio: '16 / 9', transformOrigin: 'top right' }}
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <video
              ref={overlayVideoRef}
              src={video}
              autoPlay
              preload
              playsInline
              className="w-full h-full object-cover"
            />
            <VideoControls videoRef={overlayVideoRef} />
            <button
              onClick={closeOverlay}
              className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/80 transition-colors z-20"
            >
              <XMarkIcon className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default HeroSection_Blog