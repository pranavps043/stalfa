"use client"

import React from "react"
import Image from "next/image"
import { motion, PanInfo } from "framer-motion"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"

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
    <div className={`h-[380px] w-full flex items-center justify-center ${className}`}>
      <div className="relative w-[85vw] md:w-150 h-80">
        {testimonials.map((testimonial, index) => {
          const isCurrent = index === activeIndex
          const isPrev =
            index === (activeIndex - 1 + testimonials.length) % testimonials.length
          const isNext = index === (activeIndex + 1) % testimonials.length

          if (!isCurrent && !isPrev && !isNext) return null

          return (
            <motion.div
              key={testimonial.id}
              className="absolute w-full h-full rounded-2xl md:rounded-3xl overflow-hidden 
                bg-gradient-to-br from-[#0b0b0b] to-[#121212] 
                border border-[#FFD700]/20 shadow-[0_5px_30px_rgba(255,215,0,0.12)]"
              style={{ zIndex: isCurrent ? 5 : isPrev ? 3 : 1 }}
              drag={isCurrent && !disableInteractions && externalIndex === undefined ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.7}
              onDragEnd={handleDragEnd}
              initial={{
                scale: 0.9,
                opacity: 0,
                y: isCurrent ? 0 : isPrev ? 12 : 24,
              }}
              animate={{
                scale: isCurrent ? 1 : 0.9,
                opacity: isCurrent ? 1 : isPrev ? 0.6 : 0.3,
                x: isCurrent ? exitX : 0,
                y: isCurrent ? 0 : isPrev ? 12 : 24,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <div className="relative flex h-full w-full items-center justify-center">
                <div className="relative z-10 p-6 md:p-10 flex flex-col items-center gap-3 md:gap-4 text-center">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={80}
                    height={64}
                    className="w-16 h-14 md:w-20 md:h-16 rounded-xl object-cover ring-2 ring-[#FFD700] p-1 bg-black/50"
                  />
                  <h3 className="text-transparent bg-clip-text bg-gradient-to-b from-[#fffac7] via-[#ffd700] to-[#b8860b] text-xl md:text-2xl font-bold">
                    {testimonial.name}
                  </h3>
                  <p className="max-w-xl text-sm md:text-lg leading-relaxed text-white/90 px-2">
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
  const [scrollIndex, setScrollIndex] = React.useState(0)
  const [isHovered, setIsHovered] = React.useState(false)

  const nextSlide = React.useCallback(() => {
    setScrollIndex((prev) => (prev + 1) % TESTIMONIAL_DATA.length)
  }, [])

  const prevSlide = React.useCallback(() => {
    setScrollIndex((prev) => (prev - 1 + TESTIMONIAL_DATA.length) % TESTIMONIAL_DATA.length)
  }, [])

  // Auto-play logic
  React.useEffect(() => {
    if (isHovered) return

    const interval = setInterval(nextSlide, 4000)

    return () => clearInterval(interval)
  }, [isHovered, nextSlide])

  return (
    <section
      className="relative py-16 md:py-20 overflow-hidden bg-black"
      style={{
        background:
          "linear-gradient(to bottom, #000000 0%, #0d0d0d 15%, #f8e49a11 60%, #f8e49a08 85%, #00000000 100%)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
        <h2
          className="text-3xl md:text-5xl font-bold 
          bg-clip-text text-transparent 
          bg-gradient-to-b from-[#fffac7] via-[#ffd700] to-[#b8860b] text-balance"
        >
          Why Choose Us
        </h2>

        <p className="max-w-xl mx-auto text-white/70 text-sm md:text-lg mt-3 md:mt-4 text-balance">
          Discover why industry leaders trust Stalfa for their digital transformation.
        </p>

        <div className="relative w-full max-w-5xl mx-auto mt-4 mb-4 flex items-center justify-center group/nav">
          {/* Arrow Buttons */}
          <button
            onClick={prevSlide}
            className="flex absolute -left-2 md:-left-12 z-40 w-10 h-10 md:w-14 md:h-14 items-center justify-center rounded-full border border-[#FFD700]/30 bg-black/60 backdrop-blur-md text-white/70 hover:text-[#FFD700] hover:border-[#FFD700] hover:shadow-[0_0_20px_rgba(255,215,0,0.3)] transition-all md:opacity-0 md:group-hover/nav:opacity-100"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
          </button>

          <div className="flex-1 max-w-4xl px-8 md:px-0">
            <TestimonialCarousel
              testimonials={TESTIMONIAL_DATA}
              externalIndex={scrollIndex}
              disableInteractions
            />
          </div>

          <button
            onClick={nextSlide}
            className="flex absolute -right-2 md:-right-12 z-40 w-10 h-10 md:w-14 md:h-14 items-center justify-center rounded-full border border-[#FFD700]/30 bg-black/60 backdrop-blur-md text-white/70 hover:text-[#FFD700] hover:border-[#FFD700] hover:shadow-[0_0_20px_rgba(255,215,0,0.3)] transition-all md:opacity-0 md:group-hover/nav:opacity-100"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
          </button>
        </div>

        {/* Navigation Dots */}
        <div className="relative z-50 flex justify-center items-center gap-3 md:gap-4 mt-0">
          {TESTIMONIAL_DATA.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setScrollIndex(idx)}
              className={cn(
                "w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300",
                scrollIndex === idx 
                  ? "bg-[#FFD700] w-8 md:w-10 shadow-[0_0_15px_rgba(255,215,0,0.6)]" 
                  : "bg-white/10 hover:bg-white/30"
              )}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}