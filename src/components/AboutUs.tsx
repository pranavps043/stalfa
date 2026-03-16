"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Feature {
  step: string;
  title?: string;
  content: string;
  image: string;
}

interface FeatureStepsProps {
  features: Feature[];
  className?: string;
  title?: string;
  autoPlayInterval?: number;
  imageHeight?: string;
}

export function FeatureSteps({
  features,
  className,
  title = "How to get Started",
  autoPlayInterval = 3000, // 3 seconds
  imageHeight = "h-[400px]",
}: FeatureStepsProps) {
  const [currentFeature, setCurrentFeature] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  // --- Preload Images for instant feedback ---
  useEffect(() => {
    features.forEach((feature) => {
      const img = document.createElement("img")
      img.src = feature.image
    })
  }, [features])

  // --- AutoPlay Logic ---
  useEffect(() => {
    if (isHovered) return

    const timeout = setTimeout(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length)
    }, autoPlayInterval)

    return () => clearTimeout(timeout)
  }, [currentFeature, isHovered, autoPlayInterval, features.length])

  return (
    <div
      className={cn(
        "w-full bg-gradient-to-b from-black via-[#0d0d0d] to-transparent py-16",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="px-4 md:px-8">
        {/* FIXED GRADIENT HEADING */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-b from-[#fffac7] via-[#ffd700] to-[#b8860b] bg-clip-text text-transparent inline-block text-balance">
            {title}
          </h2>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-10">
          {/* LEFT SIDE — STEPS LIST */}
          <div className="order-2 md:order-1 space-y-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-6 md:gap-8 cursor-pointer"
                initial={{ opacity: 0.3 }}
                animate={{ opacity: index === currentFeature ? 1 : 0.3 }}
                transition={{ duration: 0.3 }}
                onClick={() => setCurrentFeature(index)}
              >
                {/* Number Circle */}
                <motion.div
                  className={cn(
                    "w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                    index === currentFeature
                      ? "bg-primary border-primary text-primary-foreground scale-110"
                      : "bg-muted border-muted-foreground hover:bg-muted/50"
                  )}
                >
                  {index === currentFeature ? (
                    <span className="text-lg font-bold">•</span>
                  ) : (
                    <span className="text-lg font-semibold">{index + 1}</span>
                  )}
                </motion.div>

                {/* Text */}
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-semibold">
                    {feature.title || feature.step}
                  </h3>
                  <p className="text-sm md:text-lg text-muted-foreground">
                    {feature.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* RIGHT SIDE — IMAGE */}
          <div
            className={cn(
              "hidden md:block order-1 md:order-2 relative h-[200px] md:h-[400px] overflow-hidden rounded-lg",
              imageHeight
            )}
          >
            <AnimatePresence mode="popLayout">
              <motion.div
                key={currentFeature}
                className="absolute inset-0 rounded-lg overflow-hidden"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <Image
                  src={features[currentFeature].image}
                  alt={features[currentFeature].step}
                  className="w-full h-full object-cover"
                  width={1000}
                  height={500}
                  priority={currentFeature === 0}
                  loading={currentFeature === 0 ? "eager" : "lazy"}
                />
                <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-background via-background/50 to-transparent pointer-events-none z-0" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------
   ABOUT SECTION CONTENT
------------------------------------------- */

const features = [
 {
  step: "About Us",
  title: "Custom Software Solutions",
  content:
    "We create tailor-made software solutions that drive business growth and efficiency, leveraging cutting-edge technologies to solve complex challenges.",
  image: "/aboutus/meta.jpg",  // Changed from imgSrc to image
},
{
    step: "Our Approach",
    title: "Innovation & Precision",
    content:
      "Our methodology combines innovative thinking with meticulous attention to detail, ensuring every solution is both groundbreaking and reliable.",
    image:
      "/aboutus/inn.jpg",
  },
  {
    step: "Our Services",
    title: "Comprehensive Digital Solutions",
    content:
      "From UI/UX design to full-stack development and cloud integration, we deliver scalable, future-ready digital solutions.",
    image:
       "/aboutus/uu.jpg",
  },
];

export default function AboutUs() {
  return (
    <FeatureSteps
      features={features}
      title="About Us"
      autoPlayInterval={3000} // 3 seconds autoplay
      imageHeight="h-[500px]"
    />
  );
}
