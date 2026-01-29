"use client";

import React, { useEffect, useId, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Container, SingleOrMultiple } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { motion, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";

type ParticlesProps = {
  id?: string;
  className?: string;
  background?: string;
  particleSize?: number;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  particleDensity?: number;
};

const SparklesCore = (props: ParticlesProps) => {
  const {
    id,
    className,
    background,
    minSize,
    maxSize,
    speed,
    particleColor,
    particleDensity,
  } = props;

  const [init, setInit] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container) => {
    if (container) {
      controls.start({
        opacity: 1,
        transition: { duration: 1 },
      });
    }
  };

  const generatedId = useId();

  return (
    <motion.div animate={controls} className={cn("opacity-0", className)}>
      {init && (
        <Particles
          id={id || generatedId}
          className="h-full w-full"
          particlesLoaded={particlesLoaded}
          options={{
            background: {
              color: {
                value: background || "#000000",
              },
            },
            fullScreen: {
              enable: false,
              zIndex: 1,
            },
            fpsLimit: 120,
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: "push",
                },
                onHover: {
                  enable: false,
                  mode: "repulse",
                },
              resize: { enable: true },
              },
              modes: {
                push: { quantity: 4 },
                repulse: { distance: 200, duration: 0.4 },
              },
            },
            particles: {
              bounce: {
                horizontal: { value: 1 },
                vertical: { value: 1 },
              },
              collisions: {
                absorb: { speed: 2 },
                bounce: {
                  horizontal: { value: 1 },
                  vertical: { value: 1 },
                },
                enable: false,
                maxSpeed: 50,
                mode: "bounce",
                overlap: {
                  enable: true,
                  retries: 0,
                },
              },
              color: {
                value: particleColor || "#ffffff",
              },
              effect: {
                close: true,
                fill: true,
                options: {},
                type: {} as SingleOrMultiple<string> | undefined,
              },
              move: {
                angle: { offset: 0, value: 90 },
                attract: {
                  distance: 200,
                  enable: false,
                  rotate: { x: 3000, y: 3000 },
                },
                center: {
                  x: 50,
                  y: 50,
                  mode: "percent",
                  radius: 0,
                },
                decay: 0,
                direction: "none",
                drift: 0,
                enable: true,
                gravity: {
                  acceleration: 9.81,
                  enable: false,
                  inverse: false,
                  maxSpeed: 50,
                },
                outModes: { default: "out" },
                random: false,
                size: false,
                speed: { min: 0.1, max: 1 },
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  width: 400,
                  height: 400,
                },
                limit: {
                  mode: "delete",
                  value: 0,
                },
                value: particleDensity || 120,
              },
              opacity: {
                value: { min: 0.1, max: 1 },
                animation: {
                  count: 0,
                  enable: true,
                  speed: speed || 4,
                  decay: 0,
                  delay: 0,
                  sync: false,
                  mode: "auto",
                  startValue: "random",
                  destroy: "none",
                },
              },
              shape: {
                close: true,
                fill: true,
                options: {},
                type: "circle",
              },
              size: {
                value: {
                  min: minSize || 1,
                  max: maxSize || 3,
                },
              },
              zIndex: {
                value: 0,
                opacityRate: 1,
                sizeRate: 1,
                velocityRate: 1,
              },
            },
            detectRetina: true,
          }}
        />
      )}
    </motion.div>
  );
};

export default function ContactHero() {
  return (
    <section className="relative h-[50vh] md:h-[70vh] w-full bg-black flex flex-col items-center justify-center overflow-hidden">     
      <div className="relative z-20 flex flex-col items-center gap-4 px-4 mt-25 text-center">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white">
                       <span className="text-yellow-300">C</span>ontact<span className="text-yellow-300">U</span>s
        </h1>
      <p className="text-neutral-400 max-w-xl">
  Ready to start your next project? Our team is here to help you bring your vision to life with innovative solutions.
</p>
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
  );
}
