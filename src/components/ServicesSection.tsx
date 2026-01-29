"use client"

import * as React from "react"
import { HTMLMotionProps, MotionConfig, motion } from "framer-motion"
import { cn } from "@/lib/utils"

/* -----------------------------------------------------------
   SHARED LOGIC (HoverSlider + TextStagger + Images)
----------------------------------------------------------- */

interface TextStaggerHoverProps {
  text: string
  index: number
  className?: string
}

interface HoverSliderImageProps extends Omit<HTMLMotionProps<"img">, "src"> {
  index: number
  imageUrl: string
}

interface HoverSliderContextValue {
  activeSlide: number
  changeSlide: (index: number) => void
}

function splitText(text: string) {
  const words = text.split(" ").map((word) => word.concat(" "))
  const characters = words.map((word) => word.split("")).flat(1)
  return { characters }
}

const HoverSliderContext = React.createContext<HoverSliderContextValue | undefined>(undefined)

function useHoverSliderContext() {
  const ctx = React.useContext(HoverSliderContext)
  if (!ctx) throw new Error("useHoverSliderContext must be used inside provider")
  return ctx
}

export const HoverSlider = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ children, className, ...props }, ref) => {
    const [activeSlide, setActiveSlide] = React.useState(0)
    const changeSlide = (i: number) => setActiveSlide(i)

    return (
      <HoverSliderContext.Provider value={{ activeSlide, changeSlide }}>
        <section ref={ref} className={cn("relative", className)} {...props}>
          {children}
        </section>
      </HoverSliderContext.Provider>
    )
  }
)

HoverSlider.displayName = "HoverSlider"

export const TextStaggerHover = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement> & TextStaggerHoverProps
>(({ text, index, className, ...props }, ref) => {
  const { activeSlide, changeSlide } = useHoverSliderContext()
  const { characters } = splitText(text)
  const isActive = activeSlide === index
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768) // md breakpoint
    }
    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  // For mobile, show plain text without hover effects
  if (isMobile) {
    return (
      <span
        ref={ref}
        className={cn("block w-full text-left py-2", className)}
        {...props}
      >
        {text}
      </span>
    )
  }

  // For desktop, show with hover effects
  return (
    <span
      ref={ref}
      onMouseEnter={() => changeSlide(index)}
      className={cn("relative inline-block overflow-hidden", className)}
      {...props}
    >
      {characters.map((char, i) => (
        <span key={i} className="relative inline-block overflow-hidden">
          <MotionConfig
            transition={{
              delay: i * 0.01,  // Slightly faster delay
              duration: 0.15,   // Faster animation (reduced from 0.3s)
              ease: [0.4, 0, 0.2, 1],  // Snappier easing
            }}
          >
            <motion.span
              className="inline-block opacity-20"
              initial={{ y: "0%" }}
              animate={isActive ? { y: "-110%" } : { y: "0%" }}
            >
              {char}
              {char === " " && i < characters.length - 1 && <>&nbsp;</>}
            </motion.span>

            <motion.span
              className="absolute left-0 top-0 inline-block opacity-100"
              initial={{ y: "110%" }}
              animate={isActive ? { y: "0%" } : { y: "110%" }}
            >
              {char}
            </motion.span>
          </MotionConfig>
        </span>
      ))}
    </span>
  )
})

TextStaggerHover.displayName = "TextStaggerHover"

const clipPathVariants = {
  visible: { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" },
  hidden: { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" },
}

export const HoverSliderImageWrap = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("relative w-full h-64 md:h-96 overflow-hidden rounded-xl", className)}
    {...props}
  />
))

HoverSliderImageWrap.displayName = "HoverSliderImageWrap"

export const HoverSliderImage = React.forwardRef<HTMLImageElement, HoverSliderImageProps>(
  ({ index, imageUrl, className, ...props }, ref) => {
    const { activeSlide } = useHoverSliderContext()
    return (
      <motion.img
        ref={ref}
        src={imageUrl}
        loading="lazy"
        variants={clipPathVariants}
        initial="hidden"
        animate={activeSlide === index ? "visible" : "hidden"}
        transition={{ ease: [0.4, 0, 0.2, 1], duration: 0.3 }}
        className={cn("absolute inset-0 w-full h-full object-cover", className)}
        {...props}
      />
    )
  }
)

HoverSliderImage.displayName = "HoverSliderImage"

/* -----------------------------------------------------------
   SERVICES SECTION (merged)
----------------------------------------------------------- */

const SLIDES = [
  {
    id: "s1",
    title: "web development",
    imageUrl:
      "/our services/web.jpg",
  },
  {
    id: "s2",
    title: "digital marketing",
    imageUrl:
       "/our services/digital.jpg"
  },
  {
    id: "s3",
    title: "branding & identity",
    imageUrl:
      "/our services/branding.jpg",
  },
  {
    id: "s4",
    title: "creative design",
    imageUrl:
       "/our services/creative.jpg"
  },
  {
    id: "s5",
    title: "ui/ux & designing",
    imageUrl:
      "/our services/uiux.jpg"
  },
    {
    id: "s6",
    title: "cyber security",
    imageUrl:
      "/our services/cb.jpg"
  },
]

export default function ServicesSection() {
  return (
    <section className="w-full py-12 md:py-20" style={{
      background:
        "linear-gradient(to bottom, #000000 0%, #0d0d0d 15%, #00000000 100%)"
    }}>
      <HoverSlider className="w-full min-h-[50vh] md:min-h-[60vh] flex flex-col items-center px-4 sm:px-6 md:px-12">
        <h2 className="text-center mb-8 md:mb-12 text-4xl sm:text-5xl font-bold bg-clip-text text-transparent 
          bg-gradient-to-b from-[#fffac7] via-[#ffd700] to-[#b8860b] text-balance">
          Our Services
        </h2>

        <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12">
          <div className="w-full flex flex-col space-y-2 sm:space-y-3 items-start text-left px-4 lg:px-0 max-w-2xl mx-auto lg:max-w-none">
            {SLIDES.map((slide, index) => (
              <TextStaggerHover
                key={slide.id}
                index={index}
                text={slide.title}
                className="w-full text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold uppercase hover:text-[#FFD700] py-2 sm:py-2 text-center lg:text-left"
              />
            ))}
          </div>

          <HoverSliderImageWrap className="hidden lg:block w-full h-64 sm:h-80 md:h-96 mt-6 lg:mt-0">
            {SLIDES.map((slide, index) => (
              <HoverSliderImage 
                key={slide.id} 
                index={index} 
                imageUrl={slide.imageUrl} 
                alt={slide.title} 
                className="object-cover"
              />
            ))}
          </HoverSliderImageWrap>
        </div>
      </HoverSlider>
    </section>
  )
}
