"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                         TYPE DEFINITIONS                                    */
/* -------------------------------------------------------------------------- */

interface FooterLink {
  label: string;
  href: string;
  pulse?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface ContactItem {
  icon: React.ReactNode;
  text: string;
  href?: string;
}

interface SocialLink {
  icon: React.ReactNode;
  href: string;
}

interface TextHoverEffectProps {
  text: string;
  className?: string;
  hovered: boolean;
}

/* -------------------------------------------------------------------------- */
/*                         TEXT HOVER EFFECT                                   */
/* -------------------------------------------------------------------------- */

export const TextHoverEffect: React.FC<TextHoverEffectProps> = ({
  text,
  className,
  hovered,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const cx = useMotionValue(50);
  const cy = useMotionValue(50);

  const handleMove = (e: React.MouseEvent) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    cx.set(((e.clientX - rect.left) / rect.width) * 100);
    cy.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  return (
    <motion.svg
      ref={svgRef}
      viewBox="0 0 300 100"
      className={`select-none uppercase transition-opacity duration-300 ${
        hovered ? "opacity-100" : "opacity-20"
      } ${className || ""}`}
      onMouseMove={handleMove}
    >
      <defs>
        <radialGradient id="revealMask" r="25%">
          <motion.stop offset="0%" stopColor="white" />
          <motion.stop offset="100%" stopColor="black" />
        </radialGradient>

        <mask id="textMask">
          <rect width="100%" height="100%" fill="url(#revealMask)" />
        </mask>

        <linearGradient id="textGradient">
          {hovered && (
            <>
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="25%" stopColor="#FFA500" />
              <stop offset="50%" stopColor="#FFD700" />
              <stop offset="75%" stopColor="#DAA520" />
              <stop offset="100%" stopColor="#FFD700" />
            </>
          )}
        </linearGradient>
      </defs>

      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.35"
        className="fill-transparent text-7xl font-bold"
        style={{ stroke: hovered ? "#ffffff55" : "#ffffff22" }}
      >
        {text}
      </text>

      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#textGradient)"
        strokeWidth="0.4"
        mask="url(#textMask)"
        className="fill-transparent text-7xl font-bold"
      >
        {text}
      </text>
    </motion.svg>
  );
};

/* -------------------------------------------------------------------------- */
/*                         FOOTER BACKGROUND                                   */
/* -------------------------------------------------------------------------- */

export const FooterBackgroundGradient: React.FC = () => (
  <div
    className="absolute inset-0 z-0"
    style={{
      background:
        "radial-gradient(120% 120% at 50% 10%, #0F0F1166 40%, #FFD70022 100%)",
    }}
  />
);

/* -------------------------------------------------------------------------- */
/*                                FOOTER                                      */
/* -------------------------------------------------------------------------- */

export default function HoverFooter() {
  const [hovered, setHovered] = useState(false);

  const footerLinks: FooterSection[] = [
    {
      title: "Links",
      links: [
        { label: "Home", href: "/" },
        { label: "About Us", href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: "Services", href: "/services" },
        { label: "Contact Us", href: "/contact" },
      ],
    },
  ];

  const contactInfo: ContactItem[] = [
    {
      icon: <Mail size={18} className="text-[#FFD700]" />,
      text: "stalfatech@gmail.com",
      href: "mailto:stalfatech@gmail.com",
    },
    {
      icon: <Phone size={18} className="text-[#FFD700]" />,
      text: "+91 88911 00447",
      href: "tel:+918891100447",
    },
    {
      icon: <MapPin size={18} className="text-[#FFD700]" />,
      text: "Kerala, India",
      href: "https://maps.app.goo.gl/mx7BdHko17UuHGM26",
    },
  ];

  const socialLinks: SocialLink[] = [
    { icon: <Facebook size={20} />, href: "#" },
    { icon: <Instagram size={20} />, href: "https://www.instagram.com/stalfatech?igsh=MXBreXE2MmR5eWxkcw==" },
    { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/company/stalfa-tech-private-limited/" },
  
  ];

  return (
    <footer
      className="relative w-full min-h-[400px] lg:h-[40vh] overflow-hidden py-10 z-10 border-t"
      style={{
        borderImage:
          "linear-gradient(90deg, transparent, #FFD700, #B8860B, #FFD700, transparent) 1",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="absolute inset-0 bg-[#0F0F11]/30 z-0" />

      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
        <TextHoverEffect
          text="STALFA"
          hovered={hovered}
          className="w-full max-w-4xl mx-auto h-full"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col h-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8 flex-grow">
          <div className="space-y-4 text-left">
            <span className="text-white text-3xl font-bold">Stalfa</span>
            <p className="text-gray-300 text-sm max-w-xs">
              Stalfa Tech provides modern web solutions, 3D experiences and
              high-quality UI.
            </p>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title} className="lg:text-center">
              <h4 className="text-white text-lg font-semibold mb-6">
                {section.title}
              </h4>
              <ul className="space-y-3 inline-block lg:text-left">
                {section.links.map((link) => (
                  <li key={link.label} className="relative">
                    <a
                      href={link.href}
                      className="hover:text-[#FFD700] transition"
                    >
                      {link.label}
                    </a>
                    {link.pulse && (
                      <span className="absolute top-0 right-[-10px] w-2 h-2 bg-[#FFD700] rounded-full animate-pulse" />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:text-right">
            <h4 className="text-white text-lg font-semibold mb-6">
              Contact Us
            </h4>
            <ul className="space-y-4 flex flex-col lg:items-end">
              {contactInfo.map((item, i) => (
                <li key={i} className="flex items-center space-x-3 lg:space-x-reverse">
                  <div className="flex items-center space-x-3">
                    {item.icon}
                    {item.href ? (
                      <a
                        href={item.href}
                        className="hover:text-[#FFD700]"
                      >
                        {item.text}
                      </a>
                    ) : (
                      <span>{item.text}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="border-gray-700 my-6" />

        <div className="flex flex-col md:flex-row justify-between items-center text-gray-400">
          <div className="flex gap-6">
            {socialLinks.map((item, index) => (
              <a key={index} href={item.href} className="hover:text-[#FFD700]">
                {item.icon}
              </a>
            ))}
          </div>
          <p>© 2025 Stalfa. All rights reserved.</p>
        </div>
      </div>

      <FooterBackgroundGradient />
    </footer>
  );
}