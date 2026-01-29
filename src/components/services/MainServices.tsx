"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

/* =====================================================
    TYPEWRITER COMPONENT
===================================================== */
function Typewriter({
  text,
  speed = 70,
  deleteSpeed = 40,
  delay = 2000,
  className,
}: {
  text: string[];
  speed?: number;
  deleteSpeed?: number;
  delay?: number;
  className?: string;
}) {
  const [displayText, setDisplayText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < text[textIndex].length) {
          setDisplayText((prev) => prev + text[textIndex][charIndex]);
          setCharIndex((prev) => prev + 1);
        } else {
          setTimeout(() => setIsDeleting(true), delay);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText((prev) => prev.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCharIndex(0);
          setTextIndex((prev) => (prev + 1) % text.length);
        }
      }
    }, isDeleting ? deleteSpeed : speed);
    return () => clearTimeout(timeout);
  }, [charIndex, displayText, isDeleting, textIndex, text]);

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse text-yellow-400">|</span>
    </span>
  );
}

/* -------------------------------------------------------
    DATA (8 SERVICES)
------------------------------------------------------- */
const accordionItems = [
  { id: 1, title: "Software Development", description: "Design and build smart applications tailored to your needs.", imageUrl: "/main service/sw.jpg" },
  { id: 2, title: "Website Designing", description: "Powerful web applications accessible anytime, anywhere.", imageUrl: "/main service/uu.jpg" },
  { id: 3, title: "Digital Marketing", description: "Connect with audiences online fast and smart.", imageUrl: "/main service/dm.jpg" },
  { id: 4, title: "ERP Development", description: "Streamline everything in one seamless system.", imageUrl: "/main service/erp.jpg" },
  { id: 5, title: "Graphic Designing", description: "Bold visuals, striking creativity.", imageUrl: "/main service/gd.jpg" },
  { id: 6, title: "SEO Services", description: "Boost visibility and rank higher.", imageUrl: "/main service/seo.jpg" },
  { id: 7, title: "Personal Branding", description: "Turn passion into a powerful brand.", imageUrl: "/main service/bh.jpg" },
  { id: 8, title: "Cyber Security", description: "Protect your digital assets with advanced security solutions.", imageUrl: "/main service/cyber.jpg" },
];

/* -------------------------------------------------------
    DESKTOP ACCORDION ITEM
------------------------------------------------------- */
function AccordionItem({ item, isActive, onMouseEnter }: { item: any; isActive: boolean; onMouseEnter: () => void }) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      className={`relative h-[500px] rounded-[2rem] overflow-hidden cursor-pointer transition-all duration-700 ease-in-out ${isActive ? "w-[400px]" : "w-[65px]"} border border-white/10`}
    >
      <Image src={item.imageUrl} alt={item.title} fill className={`object-cover transition-opacity duration-700 ${isActive ? 'opacity-50' : 'opacity-10'}`} />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 p-8 flex flex-col justify-between overflow-hidden">
        <span className={`font-bold tracking-tighter transition-all duration-500 ${isActive ? "text-3xl text-white leading-none" : "text-lg text-white/80 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap uppercase tracking-widest font-mono"}`}>
          {item.title}
        </span>
        <div className={`transition-all duration-700 ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <p className="text-gray-300 text-base font-light leading-relaxed italic mb-8 max-w-xs">{item.description}</p>
          <div className="w-12 h-[1px] bg-yellow-400" />
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------
    MAIN PAGE
------------------------------------------------------- */
export default function MainServices() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <main className="min-h-screen bg-black font-sans selection:bg-yellow-400 selection:text-black p-6 md:p-20">
      <div className="max-w-[1600px] mx-auto">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
      
          
          <div className="h-[1px] flex-grow bg-white/10 mx-12 hidden lg:block mb-8" />

          {/* LIVE TYPING PARAGRAPH ONLY */}
          <div className="max-w-xs">
            <Typewriter 
              text={[
                "We build high-impact digital solutions that scale with your business.",
                "Smart technology. Powerful design. Real results."
              ]}
              className="text-gray-400 text-sm leading-relaxed font-light"
            />
          </div>
        </div>

        {/* ACCORDION (Desktop) / GRID (Mobile) */}
        <div className="hidden md:flex items-center justify-center gap-4">
          {accordionItems.map((item, index) => (
            <AccordionItem key={item.id} item={item} isActive={index === activeIndex} onMouseEnter={() => setActiveIndex(index)} />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:hidden">
          {accordionItems.map((item) => (
            <div key={item.id} className="relative h-[250px] rounded-[2rem] overflow-hidden border border-white/10 bg-white/5 p-8 flex flex-col justify-end">
               <Image src={item.imageUrl} alt={item.title} fill className="object-cover opacity-20" />
               <span className="text-yellow-400 font-mono text-[10px] tracking-[0.4em] mb-2 uppercase">0{item.id}</span>
               <h3 className="text-white text-2xl font-bold tracking-tight mb-2">{item.title}</h3>
               <p className="text-gray-400 text-xs font-light italic leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}