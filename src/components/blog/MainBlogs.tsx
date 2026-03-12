"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

/* ------------------------ TYPES ------------------------ */
interface BlogPost {
  id: number;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  date: string;
  tag: string;
  image: string;
}

/* ------------------------ MAIN BLOG PAGE ------------------------ */
export default function Blog() {
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (activePost) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [activePost]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden selection:bg-yellow-400 selection:text-black">
      
      <main className="relative z-10 pt-10 pb-20 px-6 md:px-12 lg:px-24 max-w-[1800px] mx-auto">
        {/* Simple Header */}
        <div className="mb-20">
          
          <motion.h1 
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.1 }}
  className="text-6xl md:text-9xl font-medium tracking-tighter"
>
  Latest <span className="font-light opacity-40 text-5xl md:text-8xl text-neutral-300">Insights</span>
</motion.h1>
        </div>

        {/* The Typography List */}
        <div className="border-t border-white/10">
          {blogData.map((post) => (
            <motion.div
              key={post.id}
              onClick={() => setActivePost(post)}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="group relative border-b border-white/10 py-12 md:py-20 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-8 transition-colors hover:bg-white/[0.02]"
            >
              <div className="flex items-center gap-6 md:w-1/4">
                <span className="text-white/20 font-mono text-sm group-hover:text-yellow-400 transition-colors">
                    0{post.id}
                </span>
                <span className="text-xs uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">
                  {post.category}
                </span>
              </div>

              <div className="md:w-2/4">
                <h2 className="text-4xl md:text-7xl font-bold tracking-tight transition-all duration-500 group-hover:translate-x-4 group-hover:text-yellow-400">
                  {post.title}
                </h2>
              </div>

              <div className="md:w-1/4 text-right flex items-center justify-end gap-8">
                <div className="hidden lg:block text-left">
                    <p className="text-sm font-mono opacity-30 group-hover:opacity-100 transition-opacity">{post.date}</p>
                    <p className="text-[10px] text-white/20 uppercase tracking-tighter transition-colors group-hover:text-yellow-400 group-hover:opacity-100">{post.tag}</p>
                </div>
                <div className="h-12 w-12 rounded-full border border-white/10 flex items-center justify-center opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
                    <span className="text-xl">↗</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* FULL-SCREEN CONTENT OVERLAY */}
      {createPortal(
        <AnimatePresence>
          {activePost && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100000] bg-[#0a0a0a] text-white overflow-y-auto no-scrollbar"
            >
              {/* Navbar-style Close Button */}
              <div className="sticky top-0 w-full flex justify-end p-6 md:p-10 z-[100002] pointer-events-none">
                <button 
                  onClick={() => setActivePost(null)}
                  className="w-12 h-12 md:w-16 md:h-16 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-yellow-400 hover:text-black transition-all pointer-events-auto shadow-2xl"
                >
                  ✕
                </button>
              </div>

              <div className="max-w-7xl mx-auto px-6 pt-10 pb-32">
                {/* Header Section: Always on top */}
                <header className="mb-16 md:mb-24">
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    className="text-yellow-400 font-mono text-xs uppercase mb-6 tracking-[0.4em]"
                  >
                    {activePost.category}
                  </motion.p>
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                    className="text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9] max-w-5xl"
                  >
                    {activePost.title}
                  </motion.h2>
                </header>

                {/* Content Grid: Below the title */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
                  
                  {/* Metadata Sidebar */}
                  <div className="lg:col-span-4 space-y-8">
                    <div className="h-[1px] w-full bg-white/10 mb-8" />
                    <div className="grid grid-cols-2 lg:grid-cols-1 gap-8 opacity-50">
                      <div>
                        <p className="text-[10px] font-mono uppercase tracking-[0.2em] mb-1">Published</p>
                        <p className="text-sm font-medium">{activePost.date}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-mono uppercase tracking-[0.2em] mb-1">Specialization</p>
                        <p className="text-sm font-medium">{activePost.tag}</p>
                      </div>
                    </div>
                  </div>

                  {/* Main Visuals & Reading Area */}
                  <div className="lg:col-span-8">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4, duration: 0.8 }}
                    >
                      <img 
                        src={activePost.image} 
                        className="w-full aspect-video object-cover rounded-[2rem] mb-20 grayscale hover:grayscale-0 transition-all duration-1000 border border-white/5" 
                        alt={activePost.title}
                      />
                      
                      <div className="prose prose-invert prose-xl md:prose-2xl max-w-none space-y-4 text-white/80 leading-relaxed font-light">
                        {activePost.content.split('\n').map((para, i) => (
                          <p key={i}>
                            {para}
                          </p>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}

const blogData: BlogPost[] = [
  {
    id: 1,
    tag: "#GenerativeAI",
    category: "AI",
    title: "The Next Frontier of Generative AI",
    excerpt: "How multimodal AI is transforming creative industries and beyond.",
    image: "/blog/ai.jpg",
    content: `The latest advancements in generative AI are pushing the boundaries of what's possible in creative industries. In 2026, we're seeing AI systems that can generate not just static images but fully animated 3D models and even short films from simple text descriptions. \n\nWhat makes this particularly groundbreaking is the emergence of multimodal AI systems that understand and generate content across text, images, audio, and video simultaneously. For instance, platforms now allow creators to describe a scene in natural language and receive a complete 3D environment ready for use in games or virtual reality. \n\nIn the design world, AI is being used to generate thousands of design variations in seconds, allowing designers to focus on refinement rather than starting from scratch. The technology has also made significant strides in understanding context and style, enabling it to create content that aligns with specific brand guidelines or artistic directions. \n\nBusinesses are leveraging these capabilities in numerous ways: marketing teams are creating personalized content at scale, educators are developing interactive learning materials, and product designers are rapidly prototyping new concepts. The key advantage is the dramatic reduction in time and resources required to bring creative visions to life. \n\nHowever, this rapid advancement also brings important considerations around intellectual property, authenticity, and the evolving role of human creativity. As we move forward, the most successful implementations will be those that find the right balance between AI-generated content and human oversight.`,
    date: "05 JAN 2026",
  },
  {
    id: 2,
    tag: "#CyberSecurity",
    category: "Security",
    title: "Zero Trust Architecture in 2026",
    excerpt: "Next-gen security frameworks for modern enterprises.",
    image: "/blog/cy.jpg",
    content: `In today's rapidly evolving threat landscape, Zero Trust Architecture (ZTA) has emerged as the gold standard for enterprise security. Unlike traditional security models that operate on the outdated "trust but verify" principle, ZTA enforces "never trust, always verify" across all access requests, regardless of their origin.\n\nModern implementations now leverage advanced behavioral analytics and machine learning to continuously monitor user and device behavior, automatically adjusting access privileges in real-time. The latest frameworks incorporate decentralized identity verification, quantum-resistant encryption, and AI-powered anomaly detection to combat increasingly sophisticated cyber threats.\n\nKey components of next-gen ZTA include:\n• Continuous authentication through biometric and behavioral factors\n• Micro-segmentation of network resources\n• Just-in-time access provisioning\n• Automated threat response systems\n\nLeading organizations are reporting up to 70% reduction in security breaches after implementing comprehensive Zero Trust strategies. However, successful adoption requires careful planning, employee training, and integration with existing security infrastructure.`,
    date: "03 JAN 2026",
},
{
    id: 3,
    tag: "#QuantumComputing",
    category: "Emerging Tech",
    title: "Quantum Breakthroughs Reshaping Tech",
    excerpt: "The race for quantum supremacy and its implications.",
    image: "/blog/qn.jpg",
    content: `2026 has emerged as a watershed year for quantum computing, with multiple tech giants achieving practical quantum advantage in specialized applications. These quantum systems are now solving complex problems that were previously considered computationally infeasible, operating at scales exceeding 1,000 qubits with unprecedented stability.\n\nKey breakthroughs include:\n• Quantum simulations accelerating drug discovery by modeling molecular interactions with atomic precision\n• Optimization algorithms revolutionizing supply chain logistics and financial modeling\n• Breakthroughs in quantum cryptography creating unbreakable encryption methods\n\nIn the financial sector, quantum algorithms are optimizing trading strategies and risk assessment models, while in material science, researchers are designing new superconductors and battery materials at an accelerated pace. The technology is also making waves in climate modeling, helping scientists develop more accurate predictions for climate change scenarios.\n\nHowever, the quantum revolution also brings challenges, particularly in cybersecurity, where quantum computers threaten to break current encryption standards. Organizations are now racing to implement post-quantum cryptography to secure their digital assets against future quantum attacks.`,
    date: "01 JAN 2026",
}
];