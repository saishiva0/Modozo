import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const AmbientBackground = () => {
  const { scrollYProgress } = useScroll();
  
  // Smooth the scroll progress to avoid jittery movements
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001
  });

  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ─── BLOB 1: Deep Gold/Yellow (Represents energy/activity) ───
  // Starts top left, moves to bottom right, expands
  const blob1X = useTransform(smoothProgress, [0, 1], ['-10%', '60%']);
  const blob1Y = useTransform(smoothProgress, [0, 1], ['-20%', '80%']);
  const blob1Scale = useTransform(smoothProgress, [0, 0.5, 1], [1, 1.5, 1.2]);
  const blob1Opacity = useTransform(smoothProgress, [0, 0.5, 1], [0.15, 0.3, 0.2]);

  // ─── BLOB 2: Pale Ice Blue (Represents structure/flow) ───
  // Starts middle right, moves to bottom left, pulses
  const blob2X = useTransform(smoothProgress, [0, 1], ['80%', '-20%']);
  const blob2Y = useTransform(smoothProgress, [0, 1], ['40%', '90%']);
  const blob2Scale = useTransform(smoothProgress, [0, 0.5, 1], [1.2, 1, 1.8]);
  const blob2Opacity = useTransform(smoothProgress, [0, 0.5, 1], [0.2, 0.4, 0.15]);

  // ─── BLOB 3: Deep Cyan/Indigo (Provides depth against the navy) ───
  // Starts bottom left, moves to top right
  const blob3X = useTransform(smoothProgress, [0, 1], ['-30%', '70%']);
  const blob3Y = useTransform(smoothProgress, [0, 1], ['80%', '10%']);
  const blob3Scale = useTransform(smoothProgress, [0, 0.5, 1], [1.5, 1.2, 1.5]);
  const blob3Opacity = useTransform(smoothProgress, [0, 0.5, 1], [0.15, 0.25, 0.2]);

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-transparent">
      {/* Base Noise Texture for premium feel */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Blob 1: Gold */}
      <motion.div
        style={{
          x: blob1X,
          y: blob1Y,
          scale: blob1Scale,
          opacity: blob1Opacity,
        }}
        className="absolute w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-[#FFD84D] blur-[100px] md:blur-[140px] mix-blend-screen"
      />

      {/* Blob 2: Pale Blue */}
      <motion.div
        style={{
          x: blob2X,
          y: blob2Y,
          scale: blob2Scale,
          opacity: blob2Opacity,
        }}
        className="absolute w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full bg-[#EAF1FA] blur-[90px] md:blur-[120px] mix-blend-screen"
      />

      {/* Blob 3: Deep Cyan */}
      <motion.div
        style={{
          x: blob3X,
          y: blob3Y,
          scale: blob3Scale,
          opacity: blob3Opacity,
        }}
        className="absolute w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] rounded-full bg-[#26C6DA] blur-[120px] md:blur-[160px] mix-blend-screen"
      />
    </div>
  );
};

export default AmbientBackground;
