"use client";

import React from "react";
import { Cpu, ArrowUpRight, Palette, Cloud, Wrench, Code2 } from "lucide-react";
import { ShieldCheck } from "lucide-react";
export default function AdaptiveStudioAboutUs() {
  return (
    <div className="relative w-full min-h-screen bg-black">
      <div className="relative z-10 w-full">
        {/* SECTION 1: BENTO GRID */}
        <section className="w-full flex items-center justify-center px-4 py-12 md:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-7xl w-full">
            
            {/* 1. Main Feature: Custom Web Apps */}
            <div className="sm:col-span-2 p-8 md:p-12 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-md flex flex-col justify-between min-h-[280px] md:min-h-[420px] hover:bg-white/[0.1] transition-all group">
              <div>
                <Code2 className="text-yellow-400 mb-6 group-hover:scale-110 transition-transform" size={32} />
                <h3 className="text-2xl md:text-5xl font-black text-white uppercase leading-tight">
                  Custom Web <br/> Applications
                </h3>
              </div>
              <p className="text-gray-300 text-sm md:text-lg max-w-xl mt-6 leading-relaxed">
                We engineer bespoke digital platforms designed for high-concurrency and long-term stability. From fintech to e-commerce, our applications are built to handle complexity.
              </p>
            </div>

            {/* 2. UI/UX Excellence */}
            <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-md flex flex-col justify-between group hover:border-yellow-400/30 transition-all">
              <Palette className="text-yellow-400 mb-4" size={28} />
              <div>
                <h4 className="text-xl font-bold text-white uppercase mb-3">Experience Design</h4>
                <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">
                  Deeply researched interfaces that bridge the gap between human intuition and digital functionality.
                </p>
              </div>
            </div>

            {/* 3. AI Integration */}
            <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-md flex flex-col justify-between group hover:border-yellow-400/30 transition-all">
              <Cpu className="text-yellow-400 mb-4" size={28} />
              <div>
                <h4 className="text-xl font-bold text-white uppercase mb-3">AI Intelligence</h4>
                <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">
                  Harnessing machine learning to automate workflows and move your business to proactive strategies.
                </p>
              </div>
            </div>

            {/* 4. Infrastructure */}
            <div className="bg-yellow-400 p-8 rounded-[2rem] text-black flex flex-col justify-between min-h-[200px] group relative overflow-hidden">
              <Cloud size={28} className="mb-4" />
              <div>
                <div className="flex justify-between items-end mb-3">
                  <h4 className="text-2xl font-black uppercase leading-none">Cloud <br/> Systems</h4>
                  <ArrowUpRight size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
                <p className="text-black/70 text-xs md:text-sm font-medium leading-relaxed">
                  Global serverless deployments ensuring instant delivery with 99.9% uptime.
                </p>
              </div>
            </div>

            {/* 5. Support & Maintenance */}
          <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-md flex flex-col justify-between group hover:border-white/20 transition-all">
 <ShieldCheck className="text-yellow-400 mb-4" size={28} />
  <div>
    <h4 className="text-xl font-bold text-white uppercase mb-3">Cybersecurity First</h4>
    <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">
      Enterprise-grade security protocols, continuous monitoring, and threat intelligence to safeguard your digital presence 24/7.
    </p>
  </div>
</div>
          </div>
        </section>
      </div>
    </div>
  );
}