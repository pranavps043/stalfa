"use client";

import * as React from "react";
import { useEffect, useRef, Suspense, lazy, useState, useCallback } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";

// Error Boundary component
class ErrorBoundary extends React.Component<
  { fallback: React.ReactNode; children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

/* --------------------------- LAZY LOAD SPLINE --------------------------- */

const Spline = lazy(() => import("@splinetool/react-spline"));

/* --------------------------- THREE BACKGROUND --------------------------- */

export function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip if window is not available (SSR)
    if (typeof window === 'undefined') return;
    
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));

    container.appendChild(renderer.domElement);

    const particlesGeometry = new THREE.BufferGeometry();
    const count = 900;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 100;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.2,
      color: "#ffffff",
      transparent: true,
      opacity: 0.7,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    let rafId = 0;
    let isPaused = false;

    const animate = () => {
      if (isPaused) return;
      particles.rotation.x += 0.0008;
      particles.rotation.y += 0.001;

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };
    animate();

    const start = () => {
      isPaused = false;
      rafId = requestAnimationFrame(animate);
    };

    const stop = () => {
      isPaused = true;
      cancelAnimationFrame(rafId);
    };

    const handleResize = () => {
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(innerWidth, innerHeight);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stop();
      } else {
        start();
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      stop();
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      renderer.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();

      if (container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full bg-black" />
  );
}

/* --------------------------- SPLINE WRAPPER --------------------------- */

interface SplineSceneProps {
  scene: string;
  className?: string;
  style?: React.CSSProperties;
}

function SplineScene({ scene, className = '', style = {} }: SplineSceneProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [hasError, setHasError] = useState(false);
  
  // Handle errors in a separate function to avoid React warnings
  const handleError = useCallback((error: unknown) => {
    console.error('Error in SplineScene:', error);
    setHasError(true);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let t: NodeJS.Timeout;
    
    const initCanvas = () => {
      try {
        const canvas = el.querySelector("canvas");
        if (canvas) {
          canvas.style.position = "relative";
          canvas.style.zIndex = "10";
        }
      } catch (error) {
        // Queue the error handling to avoid React warnings
        setTimeout(() => handleError(error), 0);
      }
    };

    try {
      t = setTimeout(initCanvas, 50);
    } catch (error) {
      // Queue the error handling to avoid React warnings
      setTimeout(() => handleError(error), 0);
    }

    return () => {
      if (t) clearTimeout(t);
    };
  }, [scene, handleError]);

  if (hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center text-white bg-black/50">
        <div className="text-center p-4">
          <p className="text-red-400 mb-2">Failed to load 3D scene</p>
          <button 
            onClick={() => setHasError(false)}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className={`w-full h-full relative ${className}`} style={style}>
      <ErrorBoundary 
        fallback={
          <div className="w-full h-full flex items-center justify-center text-white bg-black/50">
            <p>Something went wrong loading the 3D scene</p>
          </div>
        }
      >
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center text-white">
              <div className="animate-pulse">Loading 3D scene...</div>
            </div>
          }
        >
<Spline 
            scene={scene} 
            className="w-full h-full"
            onError={handleError}
          />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

/* --------------------------- ANIMATIONS --------------------------- */

const containerVariants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0 },
};

/* --------------------------- MAIN COMPONENT --------------------------- */

interface SplineSceneBasicProps {
  className?: string;
  sceneUrl?: string;
}

export function SplineSceneBasic({ 
  className = '',
  sceneUrl = "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
}: SplineSceneBasicProps) {
  return (
    <div className={`relative w-full h-screen overflow-hidden ${className}`}>

      {/* BACKGROUND */}
      <ThreeBackground />

      {/* SPLINE MODEL */}
      <div className="absolute inset-0 z-20 pointer-events-auto mt-[20px] h-[calc(100%-20px)]">
        <SplineScene 
          scene={sceneUrl}
          className="w-full h-full"
        />
      </div>

      {/* TEXT */}
      <div className="absolute inset-0 z-40 flex items-center justify-end p-8 pointer-events-none">
        <motion.div
          className="max-w-xl text-right pointer-events-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-[#fffac7] via-[#ffd700] to-[#b8860b]"
          >
            Building Digital Experiences
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 text-lg text-neutral-300 max-w-md ml-auto"
          >
            We design and develop modern software, scalable web platforms, and
            intelligent digital solutions that help businesses grow.
          </motion.p>

        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black to-transparent z-30 pointer-events-none" />
    </div>
  );
}
