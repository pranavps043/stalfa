"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// -------------------- DATA --------------------
// Update image sources in the testimonials array
const testimonials = [
  {
    id: 1,
    testimonial: "Transform your beauty routine with AI-powered skincare and haircare solutions.",
    by: "Stalume",
    role: "Beauty Tech",
    imgSrc: "/main product/beauty.jpg",
  },
  {
    id: 2,
    testimonial: "Share your digital business card with just a tap - the smart way to network.",
    by: "SnapCard",
    role: "NFC Business Card",
    imgSrc: "/main product/nfc.jpg",
  },
  {
    id: 3,
    testimonial: "Plan, manage, and elevate events with ease using our smart event management tools.",
    by: "Evenza",
    role: "Event Management",
    imgSrc: "/main product/event.jpg",
  },
  {
    id: 4,
    testimonial: "A complete solution for car rentals with seamless vehicle and booking management.",
    by: "Rentix",
    role: "Vehicle Rentals",
    imgSrc: "/main product/car.jpg",
  },
  {
    id: 5,
    testimonial: "Comprehensive salon management solution for bookings, services, and customer engagement.",
    by: "Salonix",
    role: "Salon Management",
    imgSrc: "/main product/salon.jpg",
  },
  {
    id: 6,
    testimonial: "Revolutionize restaurant dining with our digital menu and ordering system.",
    by: "Dinecard",
    role: "Digital Menu Solution",
    imgSrc: "/main product/dine.jpg",
  }
];

// -------------------- CARD --------------------
interface TestimonialCardProps {
  position: number;
  testimonial: (typeof testimonials)[0];
  handleMove: (steps: number) => void;
  cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  position,
  testimonial,
  handleMove,
  cardSize,
}) => {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const isCenter = position === 0;
  
  // Show only 1 card on mobile, 2 cards on desktop
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const isVisible = isMobile ? isCenter : (position === 0 || position === 1);
  const isActive = isMobile ? isCenter : (position === 0 || position === 1);

  // PREMIUM GSAP TRANSITION
  useEffect(() => {
    if (!cardRef.current || !isVisible) return;

    // Ensure initial centering
    gsap.set(cardRef.current, { xPercent: -50, yPercent: -50 });

    let xPos = 0;
    if (!isMobile) {
      if (position === 0) xPos = -(cardSize / 2 + 15);
      if (position === 1) xPos = (cardSize / 2 + 15);
    }
    
    const yPos = isActive ? -20 : 0;
    const rotation = isMobile ? (isCenter ? 0 : position * 10) : 0;
    const scale = isActive ? 1.05 : 0.9;
    const opacity = isActive ? 1 : 0.4;
    const blur = isActive ? 0 : 2;

    gsap.to(cardRef.current, {
      x: xPos,
      y: yPos,
      rotation: rotation,
      scale: scale,
      opacity: opacity,
      filter: `blur(${blur}px)`,
      duration: 0.6,
      ease: "power4.out", // Snappy and premium feeling
      overwrite: true // Prevent animation conflicts on fast clicks
    });
  }, [position, isCenter, isActive, isMobile, cardSize, isVisible]);

  if (!isVisible) return null;

  return (
    <div
      ref={cardRef}
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer p-6 bg-black rounded-xl overflow-hidden",
        isActive ? "z-10 shadow-[0_30px_60px_-12px_rgba(255,215,0,0.3)]" : "z-0"
      )}
      style={{
        border: "2px solid transparent",
        backgroundImage: isActive
          ? "linear-gradient(black, black), linear-gradient(45deg, #ffd700, #6c6c6c86, #ffd700)"
          : "linear-gradient(black, black), linear-gradient(45deg, rgba(255, 215, 0, 0.1), rgba(255, 255, 255, 0.1), rgba(255, 215, 0, 0.1))",
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, border-box",
        width: cardSize,
        height: cardSize * 1.45,
        willChange: "transform, opacity, filter",
        transform: "translate(-50%, -50%)", // CSS fallback
      }}
    >
      <div className="relative h-full flex flex-col items-center text-center overflow-hidden">
        {/* ✅ DYNAMIC IMAGE SIZE */}
        <div className="relative mb-3 sm:mb-5 group w-full" style={{ perspective: "1200px" }}>
          <div
            className="relative transition-all duration-700 group-hover:scale-[1.03] group-hover:rotate-1 w-full"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="relative overflow-hidden rounded-lg w-full">
              <img
                src={testimonial.imgSrc}
                alt={testimonial.by}
                className="w-full h-[160px] sm:h-[180px] md:h-[220px] rounded-lg mx-auto object-cover transition-transform duration-1000 group-hover:scale-[1.07]"
                loading="lazy"
                style={{
                  transform: "translateZ(0)",
                  boxShadow: "0 20px 40px -10px rgba(0,0,0,0.5)",
                  backfaceVisibility: "hidden",
                  willChange: "transform",
                  imageRendering: "auto",
                }}
                srcSet={
                  testimonial.imgSrc.startsWith("http")
                    ? `${testimonial.imgSrc} 2000w`
                    : undefined
                }
                sizes="(max-width: 640px) 100vw, 360px"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = "/placeholder-image.jpg";
                }}
              />
            </div>
          </div>
        </div>

        <div className="w-full mb-1 sm:mb-3 px-1">
          <h4
            className={cn(
              "text-lg sm:text-2xl font-bold mb-0 sm:mb-1 line-clamp-1",
              isActive
                ? "text-transparent bg-clip-text bg-gradient-to-b from-[#fffac7] via-[#ffd700] to-[#b8860b]"
                : "text-gray-600"
            )}
          >
            {testimonial.by}
          </h4>

          <p className={cn("text-[10px] sm:text-sm text-gray-400 line-clamp-1")}>
            {testimonial.role}
          </p>
        </div>

        <p
          className={cn(
            "text-sm sm:text-base leading-tight sm:leading-relaxed px-1",
            isActive ? "text-gray-200" : "text-gray-600 line-clamp-3 overflow-hidden"
          )}
        >
          {testimonial.testimonial}
        </p>
      </div>
    </div>
  );
};

// -------------------- MAIN --------------------
const StaggerTestimonials: React.FC = () => {
  const [cardSize, setCardSize] = useState(350);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);

  const handleMove = (steps: number) => {
    const newList = [...testimonialsList];

    if (steps > 0) {
      for (let i = 0; i < steps; i++) {
        const item = newList.shift();
        if (item) newList.push(item);
      }
    } else {
      for (let i = 0; i > steps; i--) {
        const item = newList.pop();
        if (item) newList.unshift(item);
      }
    }

    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      setCardSize(width < 640 ? 240 : width < 768 ? 280 : width < 1024 ? 310 : 350);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const centerIndex = Math.floor(testimonialsList.length / 2);

  return (
    <section 
      className="relative w-full overflow-hidden py-20 bg-black"
      style={{
        background: "linear-gradient(to bottom, #000000 0%, #0d0d0d 15%, #000000 100%)"
      }}
    >
      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center min-h-[800px]">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-[#fffac7] via-[#ffd700] to-[#b8860b] mb-4 uppercase tracking-tight">
            Our Products
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
            Explore our innovative digital solutions designed to transform your business and enhance customer experiences.
          </p>
        </div>

        {/* Carousel Container with Side Arrows */}
        <div className="relative w-full h-[500px] flex items-center justify-center group/carousel max-w-6xl mx-auto">
          {/* Previous Button - Absolute Left */}
          <button
            onClick={() => handleMove(window.innerWidth < 1024 ? -1 : -2)}
            aria-label="Previous Product"
            className="absolute left-2 md:left-4 lg:left-0 z-30 group relative flex items-center justify-center w-14 h-14 rounded-full border-2 border-[#ffd700] bg-black text-[#ffd700] transition-all hover:scale-110 hover:shadow-[0_0_30px_rgba(255,215,0,0.6)] active:scale-95"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            <div className="absolute -inset-2 rounded-full bg-[#ffd700]/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          {/* Card Stack */}
          <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
            <div className="pointer-events-auto">
              {testimonialsList.map((testimonial, index) => {
                const position = index - centerIndex;

                return (
                  <TestimonialCard
                    key={testimonial.id}
                    testimonial={testimonial}
                    handleMove={handleMove}
                    position={position}
                    cardSize={cardSize}
                  />
                );
              })}
            </div>
          </div>

          {/* Next Button - Absolute Right */}
          <button
            onClick={() => handleMove(window.innerWidth < 1024 ? 1 : 2)}
            aria-label="Next Product"
            className="absolute right-4 md:right-8 lg:right-0 z-30 group relative flex items-center justify-center w-14 h-14 rounded-full border-2 border-[#ffd700] bg-black text-[#ffd700] transition-all hover:scale-110 hover:shadow-[0_0_30px_rgba(255,215,0,0.6)] active:scale-95"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
            <div className="absolute -inset-2 rounded-full bg-[#ffd700]/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>

        {/* Dot Indicators - Center Bottom */}
        <div className="flex gap-2 mt-8">
          {testimonials.map((t, i) => {
             const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
             const isActive = isMobile 
               ? t.id === testimonialsList[centerIndex].id 
               : (t.id === testimonialsList[centerIndex].id || t.id === testimonialsList[centerIndex + 1]?.id);

             return (
               <div 
                 key={i} 
                 className={cn(
                   "w-2 h-2 rounded-full transition-all duration-300",
                   isActive ? "w-8 bg-[#ffd700]" : "bg-neutral-800"
                 )}
               />
             );
          })}
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] pointer-events-none z-0">
         <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] rounded-full bg-[#ffd700]/5 blur-[120px] animate-pulse" />
         <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] rounded-full bg-neutral-900/40 blur-[100px]" />
      </div>
    </section>
  );
};

export { StaggerTestimonials };
