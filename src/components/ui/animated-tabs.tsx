"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

export const AnimatedTabs = ({ tabs }: { tabs: Tab[] }) => {
  const [activeIdx, setActiveIdx] = useState(0);

  // Circular positioning helper
  const getPosition = (index: number) => {
    const total = tabs.length;
    let diff = index - activeIdx;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  // Only show 5 cards max
  const visibleTabs = tabs.filter((_, idx) => {
    const offset = Math.abs(getPosition(idx));
    return offset <= 2;
  });

  return (
    <div className="w-full flex flex-col items-center gap-8 sm:gap-12 md:gap-16 px-2 sm:px-4 md:px-6 mb-8 sm:mb-0">
      {/* Navigation Pills */}
      <div className="mx-auto p-1.5 sm:p-2 bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl z-50 w-full max-w-[940px] overflow-hidden">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-1">
          {tabs.map((tab, idx) => (
            <button
              key={tab.id}
              onClick={() => setActiveIdx(idx)}
              className={cn(
                "relative px-4 sm:px-5 py-2.5 text-sm sm:text-base font-medium transition-all duration-300 rounded-xl whitespace-nowrap bg-black/50 hover:bg-black/70",
                "min-w-[clamp(80px,10vw,120px)] sm:min-w-[clamp(100px,12vw,140px)]",
                activeIdx === idx
                  ? "text-white"
                  : "text-white/60 hover:text-white"
              )}
            >
              {activeIdx === idx && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-black/80 border-2 border-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.6)] rounded-xl"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 text-[clamp(0.75rem,1.1vw,1rem)]">
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 3D Stacked Carousel */}
      <div className="relative w-full max-w-[95vw] sm:max-w-5xl xl:max-w-7xl h-[320px] sm:h-[400px] md:h-[450px] lg:h-[500px] xl:h-[550px] flex items-center justify-center [perspective:1200px] overflow-visible mt-8 sm:mt-12 md:mt-0">
        {visibleTabs.map((tab) => {
          const originalIdx = tabs.findIndex((t) => t.id === tab.id);
          const offset = getPosition(originalIdx);
          const isCenter = originalIdx === activeIdx;

          // Responsive-safe motion values (NO window usage)
          const xPos = offset * 140;
          const scale = 1 - Math.abs(offset) * 0.12;
          const zIndex = 50 - Math.abs(offset) * 10;
          const rotateY = offset * -15;

          return (
            <motion.div
              key={tab.id}
              initial={false}
              animate={{
                x: xPos,
                scale,
                zIndex,
                opacity: 1,
                rotateY,
                y: Math.abs(offset) * 8,
              }}
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 24,
                mass: 1,
              }}
              onClick={() => setActiveIdx(originalIdx)}
              className={cn(
                "absolute w-[85vw] max-w-[300px] sm:max-w-[340px] md:max-w-[380px] lg:max-w-[420px] xl:max-w-[500px] origin-center",
                isCenter
                  ? "cursor-default"
                  : "cursor-pointer hover:brightness-110"
              )}
            >
             <div className={cn(
  "relative w-full h-full rounded-3xl sm:rounded-3xl lg:rounded-[2.5rem] overflow-hidden shadow-lg sm:shadow-xl lg:shadow-[0_40px_100px_rgba(0,0,0,0.8)] border-2",
  isCenter ? "border-yellow-400" : "border-white/10"
)}>
  {tab.content}
</div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
