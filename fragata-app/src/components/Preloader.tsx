import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

interface PreloaderProps {
  onComplete: () => void
  minDuration?: number
}

const BAR_LENGTH = 12

export function Preloader({ onComplete, minDuration = 2500 }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const leftPanelRef = useRef<HTMLDivElement>(null)
  const rightPanelRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
      )
    })

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    let currentProgress = 0
    const startTime = Date.now()

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const timeRatio = Math.min(elapsed / minDuration, 1)
      const targetProgress = Math.floor(timeRatio * 100)

      if (currentProgress < targetProgress) {
        currentProgress += 1
        setProgress(currentProgress)
      }

      if (elapsed >= minDuration && currentProgress >= 100) {
        clearInterval(interval)

        // Fade out content first
        gsap.to(contentRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
        })

        // Split panels after content fades
        setTimeout(() => {
          gsap.to(leftPanelRef.current, {
            x: '-100%',
            duration: 0.8,
            ease: 'power3.inOut',
          })
          gsap.to(rightPanelRef.current, {
            x: '100%',
            duration: 0.8,
            ease: 'power3.inOut',
            onComplete: () => {
              onComplete()
            },
          })
        }, 300)
      }
    }, 25)

    return () => clearInterval(interval)
  }, [minDuration, onComplete])

  const filled = Math.round((progress / 100) * BAR_LENGTH)
  const empty = BAR_LENGTH - filled
  const bar = '-'.repeat(filled) + ' '.repeat(empty)

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100] pointer-events-none">
      {/* Left panel */}
      <div
        ref={leftPanelRef}
        className="absolute top-0 left-0 w-1/2 h-full bg-black"
      />

      {/* Right panel */}
      <div
        ref={rightPanelRef}
        className="absolute top-0 right-0 w-1/2 h-full bg-black"
      />

      {/* Content centered */}
      <div
        ref={contentRef}
        className="absolute inset-0 flex flex-col items-center justify-center"
      >
        {/* Scanlines */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            background:
              'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)',
          }}
        />

        {/* Radial gradient */}
        <div
          className="absolute inset-0 pointer-events-none opacity-60"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(148,204,255,0.05) 0%, #000 70%)',
          }}
        />

        {/* Text and progress */}
        <div className="relative z-10 flex flex-col items-center px-6">
          <h1
            ref={textRef}
            className="font-headline text-4xl md:text-5xl tracking-widest text-primary uppercase mb-8"
            style={{ textShadow: '0 0 20px rgba(148, 204, 255, 0.4)' }}
          >
            FRAGATA
          </h1>

          <div className="flex items-center gap-3" style={{ whiteSpace: 'nowrap' }}>
            <span className="font-mono text-secondary/60">[</span>
            <span
              className="font-mono text-secondary tracking-wider"
              style={{ textShadow: '0 0 8px rgba(131, 211, 225, 0.3)' }}
            >
              {bar}
            </span>
            <span className="font-mono text-secondary/60">]</span>
            <span className="font-mono text-secondary tabular-nums ml-2">
              {progress}%
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
