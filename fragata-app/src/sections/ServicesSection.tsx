import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    id: '01',
    category: 'PRESENÇA DIGITAL',
    title: 'Websites & Landing Pages de Alta Conversão',
    description:
      'Construímos superfícies digitais imersivas focadas em performance, velocidade e conversão, projetadas para capturar a atenção e gerar resultados.',
    features: [
      'Arquitetura de Alta Performance',
      'Design System Escalável',
      'Otimização Extrema para Buscadores (SEO)',
    ],
    tags: ['Next.js', 'Tailwind CSS', 'SEO', 'UI/UX'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBC_hx2dA4XPxAiyMerUKDk7jU85wE_uzbAGZY3NxYaEwKD3vK15L5mwBmYibSMigKdXokODKjBxGR9cdIFmmwt9abOKyRgVfZ-v_VEt_kI5retr9BtpChGqbIJvARPWDOsrd7T6ZuKuvXIER5r8ayGW32xnsPRADnvVGYj4IYsOqG9ZaWCa-pCHDJxxh7NgrtL2mjjC8d3bS2m5Q2ZxO2nwopTTKRo5cx0hHhLb8wK3-mmkuMV_nFS',
  },
  {
    id: '02',
    category: 'E-COMMERCE',
    title: 'Lojas Virtuais & Plataformas de Vendas',
    description:
      'Desenvolvemos ecossistemas de vendas robustos, seguros e projetados para escalar. Foco absoluto na jornada do usuário para maximizar o ticket médio e a retenção.',
    features: [
      'Integrações de Pagamento e Logística',
      'Gestão de Inventário Sincronizada',
      'Dashboards Analíticos em Tempo Real',
    ],
    tags: ['E-Commerce', 'Checkout Seguro', 'UX de Vendas'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpgKsx8_510QVa-hRnbPBQoJOR0WBENbL3qdQVDCniKBrhTDXQMvq9hSssFbN25sXzSra72DYz92d71X-htr41Kl5CRq5aOffaoC6q-P6QYN2p-FrtwkztzYNBryKRWoKnXwcTNk1iOOLjknSQr4G2Db_7eaWckhbSJV8dVcgWZFEVhsdwbgGeOTRIhdaDx-QQadPxAO53X2DwlIF0BQioEzchkfftx6M5kU_wI1VnZRw8YWy0iVfM',
  },
  {
    id: '03',
    category: 'SOFTWARES SOB MEDIDA',
    title: 'Sistemas Web & Automação de Processos',
    description:
      'Sistemas complexos simplificados. Criamos ferramentas operacionais, plataformas SaaS e integrações de API que transformam gargalos em fluxos otimizados.',
    features: [
      'Painéis de Controle Intuitivos',
      'Automação de Tarefas Repetitivas',
      'Arquitetura Baseada em Microserviços',
    ],
    tags: ['Full-Stack', 'Dashboards', 'Automação', 'APIs'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBl6PO6ezOr9ihLcLkRk1UUCZOFqEZOoHdSNDG7U-fn6_4pcMFkHenQxZyHrmP3XIWDoxJiC0vbzwRS3S243mMWl5yRv-cFeZhrrniBlSSaOWxt12L-hTWNjHFhjeXHn2e-qiorw1ZVK1uDDBI4ZbHQsarNmvYmsHVlZhakliaedH5vEJSDEobYWeIKLnkvwgwOib3VFDbjv4I6fxQDAnX8YD1XY3axXxvu-bAXYI11IJ3a5xXHz-7L',
  },
]

export function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const sectionHeaderRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[]
      const totalCards = cards.length
      const totalScroll = totalCards + 1

      // ===== Unified Timeline =====
      // Phase 1 (0% → 1/totalScroll): Expanding line fills the screen
      // Phase 2 (1/totalScroll → 100%): Card carousel

      // Line initial state
      gsap.set(lineRef.current, {
        width: '100vw',
        height: '100vh',
        top: 0,
        left: '50%',
        xPercent: -50,
        scaleX: 0,
        opacity: 0,
      })

      // Card carousel setup
      gsap.set(sectionHeaderRef.current, { opacity: 0, y: 30 })
      gsap.set(cards, {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backfaceVisibility: 'hidden',
        opacity: 0,
        x: '100vw',
        scale: 0.8,
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${totalScroll * 100}%`,
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
        },
      })

      // --- Phase 1: Expanding line ---
      const lineEnd = 1 / totalScroll

      tl.to(lineRef.current, {
        opacity: 1,
        duration: 0.02,
      }, 0)

      tl.to(lineRef.current, {
        scaleX: 1,
        duration: lineEnd,
        ease: 'power2.inOut',
      }, 0)

      // --- Phase 2: Cards appear ---
      const cardEntranceEnd = lineEnd + 0.15

      // Section header fades in right after the line fills
      tl.to(sectionHeaderRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.1,
        ease: 'power3.out',
      }, lineEnd)

      // Card 0 enters from the right
      tl.to(cards[0], {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 0.15,
        ease: 'power2.out',
      }, lineEnd)

      // Cards 1..N transition — starts AFTER card 0 is fully visible
      const remainingTime = 1 - cardEntranceEnd
      const segmentDuration = remainingTime / (totalCards - 1)
      const exitDuration = segmentDuration * 0.5
      const entranceDuration = segmentDuration * 0.5

      for (let i = 0; i < totalCards - 1; i++) {
        const currentCard = cards[i]
        const nextCard = cards[i + 1]
        const segmentStart = cardEntranceEnd + segmentDuration * i

        // Current card exits: black hole effect (first half of segment)
        tl.to(currentCard, {
          keyframes: [
            { scale: 0.5, x: '-30vw', y: '-30vh', opacity: 0.7, duration: exitDuration * 0.5 },
            { scale: 0, x: 0, y: 0, opacity: 0, duration: exitDuration * 0.5 },
          ],
          ease: 'power3.in',
        }, segmentStart)

        // Next card enters from the right (second half of segment, after exit finishes)
        tl.to(nextCard, {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: entranceDuration,
          ease: 'power2.out',
        }, segmentStart + exitDuration)
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* Phase 1: Expanding Line - must be outside pinned container */}
      <div
        ref={lineRef}
        className="fixed z-30 pointer-events-none"
        style={{
          backgroundImage: 'url(/blackvortex.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div ref={containerRef} className="relative z-40">
        {/* Phase 2: Card Carousel */}
      <section
        id="servicos"
        className="relative h-screen overflow-hidden z-50"
      >
        {/* Section header */}
        <div ref={sectionHeaderRef} className=" mt-25 z-20 text-center px-4 pt-6">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-white mb-2">
            Nossos <span className="text-secondary">Serviços</span>
          </h2>
          <p className="text-on-surface-variant text-base md:text-lg mx-auto">
            Soluções tecnológicas de alta performance desenhadas para
            impulsionar o seu negócio na era digital.
          </p>
        </div>

        {/* Carousel container */}
        <div
          ref={carouselRef}
          className="absolute inset-0 flex items-center justify-center px-4 md:px-16 lg:px-margin-desktop"
        >
          {services.map((service, index) => (
            <div
              key={service.id}
              ref={(el) => { cardsRef.current[index] = el }}
              className="inset-0 flex items-center justify-center"
            >
              <article
                className="w-full max-w-5xl mx-auto bg-slate-900/80 backdrop-blur-2xl border border-slate-800 rounded-[1.5rem] p-6 md:p-10 shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center"
                style={{
                  boxShadow:
                    '0 20px 40px -10px rgba(144, 224, 239, 0.1), inset 0 0 20px rgba(144, 224, 239, 0.05)',
                }}
              >
                {/* Text content */}
                <div className="col-span-1 md:col-span-7 flex flex-col gap-5">
                  <div>
                    <span className="font-mono text-secondary text-sm font-medium tracking-wider uppercase mb-2 block">
                      // {service.id}. {service.category}
                    </span>
                    <h3 className="font-headline text-2xl md:text-3xl font-bold text-white leading-tight mb-3">
                      {service.title}
                    </h3>
                    <p className="text-on-surface-variant text-sm md:text-base leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-secondary text-xl mt-0.5">
                          check_circle
                        </span>
                        <span className="text-on-surface text-sm md:text-base">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 mt-1">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-xs font-label border border-secondary/20 bg-secondary/10 text-secondary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Image */}
                <div className="col-span-1 md:col-span-5 relative group">
                  <div className="absolute inset-0 bg-secondary/10 rounded-2xl blur-xl group-hover:bg-secondary/20 transition-all duration-500" />
                  <img
                    alt={service.title}
                    className="w-full h-auto rounded-2xl border border-slate-800 relative z-10 object-cover shadow-lg transform group-hover:scale-[1.02] transition-transform duration-500"
                    src={service.image}
                  />
                </div>
              </article>
            </div>
          ))}
        </div>

      </section>
      </div>
    </>
  )
}
