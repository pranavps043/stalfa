"use client"

import React from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { motion, PanInfo } from "framer-motion"

// ---------------------------
//   TESTIMONIAL DATA
// ---------------------------
const TESTIMONIAL_DATA = [
  {
    id: 1,
    name: "Website & App Development",
    avatar:  "/chooseus/w.jpg",
    description:
      "We design and develop fast, secure, and scalable websites and mobile applications using modern technologies tailored to your business needs.",
  },
  {
    id: 2,
    name: "UI/UX & Graphic Design",
    avatar:   "/chooseus/u.jpg",
    description:
      "Our design team creates intuitive user experiences, clean interfaces, and impactful graphic designs that strengthen your brand identity.",
  },
  {
    id: 3,
    name: "SEO & Digital Growth",
    avatar:   "/chooseus/se.jpg",
    description:
      "We implement SEO best practices and digital optimization strategies to improve search visibility, traffic, and conversion rates.",
  },
  {
    id: 4,
    name: "End-to-End IT Solutions",
    avatar:  "/chooseus/end.jpg",
    description:
      "From planning and development to deployment and maintenance, we deliver complete IT solutions with reliable long-term support.",
  },
]


// ---------------------------
//   CAROUSEL COMPONENT
// ---------------------------
function TestimonialCarousel({
  testimonials,
  externalIndex,
  disableInteractions,
  className,
}: {
  testimonials: { id: number | string; name: string; avatar: string; description: string }[]
  externalIndex?: number
  disableInteractions?: boolean
  className?: string
}) {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const activeIndex = externalIndex ?? currentIndex
  const [exitX, setExitX] = React.useState(0)

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (disableInteractions || externalIndex !== undefined) return
    if (Math.abs(info.offset.x) > 100) {
      setExitX(info.offset.x)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
        setExitX(0)
      }, 200)
    }
  }

  return (
    <div className={`h-72 w-full flex items-center justify-center pt-20 ${className}`}>
      <div className="relative w-150 h-90">
        {testimonials.map((testimonial, index) => {
          const isCurrent = index === activeIndex
          const isPrev =
            index === (activeIndex - 1 + testimonials.length) % testimonials.length
          const isNext = index === (activeIndex + 1) % testimonials.length

          if (!isCurrent && !isPrev && !isNext) return null

          return (
            <motion.div
              key={testimonial.id}
              className="absolute w-full h-full rounded-3xl overflow-hidden 
                bg-gradient-to-br from-[#0b0b0b] to-[#121212] 
                border border-[#FFD700]/20 shadow-[0_0_20px_rgba(255,215,0,0.08)]"
              style={{ zIndex: isCurrent ? 3 : isPrev ? 2 : 1 }}
              drag={isCurrent && !disableInteractions && externalIndex === undefined ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.7}
              onDragEnd={handleDragEnd}
              initial={{
                scale: 0.95,
                opacity: 0,
                y: isCurrent ? 0 : isPrev ? 8 : 16,
              }}
              animate={{
                scale: isCurrent ? 1 : 0.95,
                opacity: isCurrent ? 1 : isPrev ? 0.6 : 0.3,
                x: isCurrent ? exitX : 0,
                y: isCurrent ? 0 : isPrev ? 8 : 16,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="relative flex h-full w-full items-center justify-center">
                <div className="relative z-10 p-8 md:p-10 flex flex-col items-center gap-5 text-center">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={64}
                    height={64}
                    className="w-26 h-20 rounded-lg object-cover ring-2 ring-[#FFD700]/60"
                  />
                  <h3 className="text-transparent bg-clip-text bg-gradient-to-b from-[#fffac7] via-[#ffd700] to-[#b8860b] text-2xl font-bold">
                    {testimonial.name}
                  </h3>
                  <p className="max-w-xl text-base md:text-lg leading-relaxed text-neutral-200/90">
                    {testimonial.description}
                  </p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

// ---------------------------
//   MAIN SECTION: CHOOSE US
// ---------------------------
export function ChooseUs() {
  const sectionRef = React.useRef(null)
  const [scrollIndex, setScrollIndex] = React.useState(0)

  React.useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const el = sectionRef.current
    if (!el) return

    const total = TESTIMONIAL_DATA.length
    const distance = () => "+=" + Math.max(1000, Math.min(2400, window.innerHeight * 2))

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: distance,
      scrub: true,
      pin: true,
      pinSpacing: true,
      onUpdate: (self) => {
        const i = Math.floor(self.progress * total)
        setScrollIndex(Math.min(total - 1, Math.max(0, i)))
      },
    })

    return () => trigger.kill()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-20 overflow-hidden bg-black"
      style={{
        background:
          "linear-gradient(to bottom, #000000 0%, #0d0d0d 15%, #f8e49a55 60%, #f8e49a22 85%, #00000000 100%)",
      }}
    >
      <div className="relative z-10 pb-40">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2
            className="text-4xl md:text-5xl font-bold 
            bg-clip-text text-transparent 
            bg-gradient-to-b from-[#fffac7] via-[#ffd700] to-[#b8860b] text-balance"
          >
            Why Choose Us
          </h2>

          <p className="max-w-xl mx-auto text-white/70 md:text-lg mt-4 text-balance">
            Don&apos;t just take our word for it — see what clients say.
          </p>

          <div className="w-full max-w-4xl mx-auto mt-12">
            <TestimonialCarousel
              testimonials={TESTIMONIAL_DATA}
              externalIndex={scrollIndex}
              disableInteractions
            />
          </div>
        </div>
      </div>
    </section>
  )
}