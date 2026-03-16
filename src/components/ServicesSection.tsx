"use client"

import * as React from "react"
import { HTMLMotionProps, motion } from "framer-motion"
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
  isMobile: boolean
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
    const [isMobile, setIsMobile] = React.useState(false)
    const changeSlide = (i: number) => setActiveSlide(i)

    React.useEffect(() => {
      const checkIfMobile = () => setIsMobile(window.innerWidth < 1024)
      checkIfMobile()
      window.addEventListener('resize', checkIfMobile)
      return () => window.removeEventListener('resize', checkIfMobile)
    }, [])

    return (
      <HoverSliderContext.Provider value={{ activeSlide, changeSlide, isMobile }}>
        <section ref={ref} className={cn("relative", className)} {...props}>
          {children}
        </section>
      </HoverSliderContext.Provider>
    )
  }
)

HoverSlider.displayName = "HoverSlider"

export const TextStaggerHover = React.memo(React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement> & TextStaggerHoverProps
>(({ text, index, className, ...props }, ref) => {
  const { activeSlide, changeSlide, isMobile } = useHoverSliderContext()
  const { characters } = React.useMemo(() => splitText(text), [text])
  const isActive = activeSlide === index

  // For mobile, show plain text without hover effects
  if (isMobile) {
    return (
      <span
        ref={ref}
        className={cn("block w-full text-center py-2", className)}
        {...props}
      >
        {text}
      </span>
    )
  }

  // Optimized transition for instant feel
  const sharedTransition = {
    duration: 0.1,    // Faster animation
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ease: "easeOut" as any,  // Direct and snappy
  }

  return (
    <span
      ref={ref}
      onMouseEnter={() => changeSlide(index)}
      className={cn("relative inline-block cursor-default select-none", className)}
      {...props}
    >
      {characters.map((char, i) => (
        <span key={i} className="relative inline-block overflow-hidden">
          <motion.span
            className="inline-block opacity-20"
            initial={false}
            animate={isActive ? { y: "-100%" } : { y: "0%" }}
            transition={{ ...sharedTransition, delay: i * 0.005 }}
          >
            {char}
            {char === " " && i < characters.length - 1 && <>&nbsp;</>}
          </motion.span>

          <motion.span
            className="absolute left-0 top-0 inline-block text-[#FFD700]"
            initial={false}
            animate={isActive ? { y: "0%" } : { y: "100%" }}
            transition={{ ...sharedTransition, delay: i * 0.005 }}
          >
            {char}
          </motion.span>
        </span>
      ))}
    </span>
  )
}))

TextStaggerHover.displayName = "TextStaggerHover"

const fadeVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
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
        loading="eager"
        variants={fadeVariants}
        initial="hidden"
        animate={activeSlide === index ? "visible" : "hidden"}
        transition={{ ease: "easeInOut", duration: 0.2 }}
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
  // Preload Images for instant hover feedback
  React.useLayoutEffect(() => {
    SLIDES.forEach((slide) => {
      const img = new Image()
      img.src = slide.imageUrl
    })
  }, [])

  return (
    <section className="w-full py-12 md:py-20" style={{
      background:
        "linear-gradient(to bottom, #000000 0%, #0d0d0d 15%, #00000000 100%)"
    }}>
      <HoverSlider className="w-full min-h-[50vh] md:min-h-[60vh] flex flex-col items-center px-4 sm:px-6 md:px-12">
        <h2 className="text-center mb-8 md:mb-12 text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-[#fffac7] via-[#ffd700] to-[#b8860b] text-balance">
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
