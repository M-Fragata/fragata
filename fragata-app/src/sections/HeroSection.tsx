import { useEffect, useRef } from 'react'
import gsap from 'gsap'

function splitTextToChars(text: string, className: string): string {
  return text
    .split('')
    .map((char) =>
      char === ' '
        ? ' '
        : `<span class="${className} inline-block">${char}</span>`
    )
    .join('')
}

export function HeroSection() {
  const mainRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split FRAGATA by characters
      if (titleRef.current) {
        const originalText = titleRef.current.textContent || 'FRAGATA'
        titleRef.current.innerHTML = splitTextToChars(originalText, 'char-fragata')
      }

      // Split SOLUÇÕES DIGITAIS by words
      if (subtitleRef.current) {
        const words = subtitleRef.current.querySelectorAll('.subtitle-word')
        subtitleRef.current.innerHTML = ''
        words.forEach((word) => {
          const span = document.createElement('span')
          span.className = 'subtitle-word inline-block'
          span.textContent = word.textContent
          subtitleRef.current?.appendChild(span)
          subtitleRef.current?.appendChild(document.createTextNode(' '))
        })
      }

      // Split description by lines (sentences)
      if (descriptionRef.current) {
        const text = descriptionRef.current.textContent || ''
        const sentences = text.match(/[^.!?]+[.!?]+/g) || [text]
        descriptionRef.current.innerHTML = sentences
          .map(
            (sentence) =>
              `<span class="line-block inline-block">${sentence.trim()}</span>`
          )
          .join(' ')
      }

      // Initial states
      gsap.set([titleRef.current, subtitleRef.current, descriptionRef.current, buttonsRef.current], { opacity: 0 })
      gsap.set('.char-fragata', { opacity: 0, y: 50, rotationX: -90 })
      gsap.set('.subtitle-word', { opacity: 0, y: 30 })
      gsap.set('.line-block', { opacity: 0, y: 20 })
      gsap.set(buttonsRef.current, { y: 30 })

      // Animation timeline - starts after header animation finishes (~1.5s)
      const tl = gsap.timeline({ delay: 1.5 })

      // Show parent containers & animate FRAGATA characters
      gsap.set(titleRef.current, { opacity: 1 })
      tl.to('.char-fragata', {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: 'back.out(1.7)',
      })

      // Animate SOLUÇÕES DIGITAIS words
      gsap.set(subtitleRef.current, { opacity: 1 })
      tl.to(
        '.subtitle-word',
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
        },
        '-=0.3'
      )

      // Animate description lines
      gsap.set(descriptionRef.current, { opacity: 1 })
      tl.to(
        '.line-block',
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
        },
        '-=0.2'
      )

      // Animate buttons
      tl.to(
        buttonsRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
        },
        '-=0.3'
      )


    })

    return () => ctx.revert()
  }, [])

  return (
    <main
      ref={mainRef}
      id="home"
      className="fixed inset-0 z-10 flex flex-col justify-center px-4 sm:px-6 md:px-16 lg:px-margin-desktop max-w-[1440px] mx-auto w-full min-h-screen items-start"
    >
      <div className="w-full md:w-[45%] text-center md:text-left">
        <div className="mb-6 md:mb-10 flex flex-col items-center md:items-start">
          <h1
            ref={titleRef}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-bold text-primary tracking-tighter leading-none font-headline opacity-0"
          >
            FRAGATA
          </h1>
          <div
            ref={subtitleRef}
            className="w-full flex justify-center md:justify-start gap-2 sm:gap-5 text-white font-semibold uppercase text-xl sm:text-2xl md:text-3xl lg:text-4xl mt-2 font-label opacity-0"
            style={{ letterSpacing: '0.2em' }}
          >
            <span className="subtitle-word">SOLUÇÕES</span>
            <span className="subtitle-word">DIGITAIS</span>
          </div>
        </div>

        <p
          ref={descriptionRef}
          className="font-body text-sm sm:text-base md:text-body-lg text-secondary-fixed-dim/90 mb-6 md:mb-10 max-w-2xl mx-auto md:mx-0 opacity-0"
        >
          Desenvolvimento de software sob medida, arquitetura de sistemas escaláveis e infraestrutura robusta para acelerar o seu negócio.
        </p>

        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center md:justify-start opacity-0">
          <button className="cursor-pointer primary-glow-button bg-primary-container text-white font-label text-sm sm:text-label-md px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold flex items-center justify-center gap-2 group">
            Solicitar Orçamento
          </button>
          <button className="cursor-pointer glass-outline-button text-white font-label text-sm sm:text-label-md px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold flex items-center justify-center gap-2">
            Conhecer Soluções
          </button>
        </div>
      </div>
    </main>
  )
}
