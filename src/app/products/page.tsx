// src/app//page.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { SparklesCore } from '@/components/ui/sparkles-core';
import { AnimatedTabs } from '@/components/ui/animated-tabs';
import { getCardStyles } from '@/lib/card-styles';

const products = [
  {
    id: 'tab1',
    label: 'Stalume',
    content: (() => {
      const styles = getCardStyles();
      return (
        <div className={styles.container}>
          <div className={styles.imageContainer}>
            <Image 
              src="/main product/beauty.jpg" 
              className={styles.image}
              alt="Stalume"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          </div>
          <div className={styles.content}>
            <div>
              <p className={styles.brand}>Beauty tech</p>
              <h2 className={styles.title}>Stalume</h2>
              <p className={styles.description}>
               Glow smarter with Stalume — an intelligent beauty tech solution designed to help users achieve radiant skin and healthier hair through cutting-edge tech innovations that support beauty routines
              </p>
            </div>
            <button 
              className={styles.button}
              onClick={() => window.location.href = '/contact'}
            >
              Explore <span className="ml-1">→</span> 
            </button>
          </div>
        </div>
      );
    })(),
  },
  {
    id: 'tab2',
    label: 'SnapCard',
    content: (() => {
      const styles = getCardStyles();
      return (
        <div className={styles.container}>
          <div className={styles.imageContainer}>
            <Image 
              src="/main product/nfc.jpg"
              className={styles.image}
              alt="SnapCard"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className={styles.content}>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <p className={styles.brand}>NFC Business Card</p>
              </div>
              <h2 className={styles.title}>SnapCard</h2>
              <p className={styles.description}>
               Tap, share, shine — Nexcard is a smart NFC business card that creates instant, 
               unforgettable digital connections. Share contact details, portfolios, and social links with just a tap.
              </p>
            </div>
            <button 
              className={styles.button}
              onClick={() => window.location.href = '/contact'}
            >
              Explore <span className="ml-1">→</span> 
            </button>
          </div>
        </div>
      );
    })(),
  },
  {
    id: 'tab3',
    label: 'Evenza',
    content: (() => {
      const styles = getCardStyles();
      return (
        <div className={styles.container}>
          <div className={styles.imageContainer}>
            <Image 
               src="/main product/event.jpg"
              className={styles.image}
              alt="Evenza"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className={styles.content}>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <p className={styles.brand}>Event Management</p>
              </div>
              <h2 className={styles.title}>Evenza</h2>
              <p className={styles.description}>
             Plan, manage, and elevate events with ease.
              Evenza simplifies event management with smart tools that help you organize attendees, schedules, and logistics seamlessly.
              </p>
            </div>
            <button 
              className={styles.button}
              onClick={() => window.location.href = '/contact'}
            >
              Explore <span className="ml-1">→</span> 
            </button>
          </div>
        </div>
      );
    })(),
  },
  {
    id: 'tab4',
    label: 'Rentix',
    content: (() => {
      const styles = getCardStyles();
      return (
        <div className={styles.container}>
          <div className={styles.imageContainer}>
            <Image 
               src="/main product/car.jpg"  
              className={styles.image}
              alt="Rentix"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className={styles.content}>
            <div>
              <p className={styles.brand}>vehicles rentals</p>
              <h2 className={styles.title}>Rentix</h2>
              <p className={styles.description}>
                A complete solution for car rentals — Rentix helps businesses manage vehicles, bookings, 
                and customer interactions in one intuitive platform
              </p>
            </div>
            <button 
              className={styles.button}
              onClick={() => window.location.href = '/contact'}
            >
              Explore <span className="ml-1">→</span> 
            </button>
          </div>
        </div>
      );
    })(),
  },
  {
    id: 'tab5',
    label: 'Salonix',
    content: (() => {
      const styles = getCardStyles();
      return (
        <div className={styles.container}>
          <div className={styles.imageContainer}>
            <Image 
              src="/main product/salon.jpg" 
              className={styles.image}
              alt="Salonix"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className={styles.content}>
            <div>
              <p className={styles.brand}>Salon management</p>
              <h2 className={styles.title}>Salonix</h2>
              <p className={styles.description}>
                A complete salon management solution that brings together stylist bookings, services and sub-services, token-based appointments, exclusive offers, reward point redemption, customer reviews, 
                and personalized user profile settings in one seamless platform.
              </p>
            </div>
            <button 
              className={styles.button}
              onClick={() => window.location.href = '/contact'}
            >
              Explore <span className="ml-1">→</span> 
            </button>
          </div>
        </div>
      );
    })(),
  },
  {
    id: 'tab6',
    label: 'Dinecard',
    content: (() => {
      const styles = getCardStyles();
      return (
        <div className={styles.container}>
          <div className={styles.imageContainer}>
            <Image 
              src="/main product/dine.jpg"
              className={styles.image}
              alt="Dinecard"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className={styles.content}>
            <div>
              <p className={styles.brand}>restaurant software</p>
              <h2 className={styles.title}>Dinecard</h2>
              <p className={styles.description}>
               Effortless Tabletop Ordering
Elevate your dining experience with Dine Card, our innovative digital menu solution.
 Customers simply scan the QR code on their table to instantly access a vibrant, interactive menu showcasing your latest dishes, specials, and visuals.
              </p>
            </div>
            <button 
              className={styles.button}
              onClick={() => window.location.href = '/contact'}
            >
              Explore <span className="ml-1">→</span> 
            </button>
          </div>
        </div>
      );
    })(),
  },
];

export default function Page() {
  return (
    <div className="min-h-screen text-white relative bg-black">
      <div className="fixed inset-0 z-0 bg-black" />

      <main className="relative z-10">
        <section className="relative h-[50vh] md:h-[70vh] w-full bg-black flex flex-col items-center justify-center overflow-hidden mt-16">
          <div className="relative z-20 flex flex-col items-center gap-4 px-4 text-center">
            <motion.h1 
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-white"><span className="text-yellow-400">P</span>roducts</span>
            </motion.h1>
            <motion.p 
              className="text-neutral-400 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Discover our exclusive collection of premium products
            </motion.p>
          </div>

          <div className="w-full max-w-3xl h-32 md:h-40 relative mt-10">
            {/* GOLD Accent Lines */}
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-amber-400 to-transparent h-[2px] w-3/4 blur-sm" />
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-amber-400 to-transparent h-px w-3/4" />

            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-yellow-300 to-transparent h-[5px] w-1/4 blur-sm" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-yellow-300 to-transparent h-px w-1/4" />

            {/* Sparkles */}
            <SparklesCore
              background="transparent"
              minSize={0.4}
              maxSize={1}
              particleDensity={1200}
              className="w-full h-full"
              particleColor="#FFFFFF"
            />

            {/* Radial Fade */}
            <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]" />
          </div>
        </section>

        <div className="relative z-10 w-full pb-24 -mt-10">
          <AnimatedTabs tabs={products} />
        </div>
      </main>
    </div>
  );
}