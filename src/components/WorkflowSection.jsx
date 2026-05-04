import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';

const workflowSteps = [
  { title: "Techpack Upload",     desc: "Structured techpacks are uploaded to begin the workflow." },
  { title: "Review & Approval",   desc: "Brand teams align and approve swiftly." },
  { title: "Sourcing Handoff",    desc: "Sourcing managers coordinate seamlessly." },
  { title: "Vendor Coordination", desc: "Vendors get clear, actionable briefs." },
  { title: "Sample Tracking",     desc: "Samples are tracked without endless emails." },
  { title: "Production Tracking", desc: "Live production visibility from anywhere." },
];

const workflowColors = [
  "#4DA3FF", // Step 1: Techpack (Blue)
  "#4CAF50", // Step 2: Review (Green)
  "#9C6BFF", // Step 3: Sourcing (Purple)
  "#FF8A65", // Step 4: Vendor (Coral)
  "#FFD54F", // Step 5: Sample (Yellow)
  "#26C6DA", // Step 6: Production (Teal)
];

/* ══════════════════════════════════════════════
   HIGH-CLARITY INDUSTRY ANIMATIONS
   ══════════════════════════════════════════════ */

// 1. Techpack: File to Data Breakdown
const TechpackAnim = ({ active }) => (
  <div className="relative w-full h-full flex flex-col items-center justify-center">
    <div className="relative w-24 h-24 flex items-center justify-center">
      <motion.div
        animate={active ? { y: [-5, 0, -5] } : {}}
        transition={{ duration: 3, repeat: Infinity }}
        className="w-12 h-16 bg-white/5 border border-brand-yellow/30 rounded-lg flex items-center justify-center z-10"
      >
        <span className="text-xl">📄</span>
      </motion.div>
      {active && [
        { label: '📏', x: -40, y: -30 },
        { label: '🧵', x: 40, y: -20 },
        { label: '🎨', x: 35, y: 30 },
        { label: '✂️', x: -35, y: 25 }
      ].map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5], x: item.x, y: item.y }}
          transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
          className="absolute z-20 bg-white/10 w-6 h-6 rounded-full flex items-center justify-center border border-white/10"
        >
          <span className="text-[10px]">{item.label}</span>
        </motion.div>
      ))}
    </div>
    <div className="mt-2 flex gap-1 items-center">
      <div className="w-1 h-1 rounded-full bg-brand-yellow animate-pulse" />
      <span className="text-[7px] font-black text-black/40 tracking-[0.2em]">STRUCTURED EXTRACTION</span>
    </div>
  </div>
);

// 2. Review: Designer to Vendor Approval
const ReviewAnim = ({ active }) => (
  <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
    <div className="w-full h-32 bg-white/5 rounded-2xl border border-white/10 relative overflow-hidden flex items-center justify-between px-6">
      {/* Designer Node */}
      <div className="flex flex-col items-center gap-1 z-10">
        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
          <span className="text-xl">🎨</span>
        </div>
        <span className="text-[7px] text-black/50 font-black uppercase">DESIGNER</span>
      </div>

      {/* Sending Animation */}
      {active && (
        <motion.div
          animate={{ 
            x: [-60, 60],
            opacity: [0, 1, 1, 0]
          }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          className="absolute left-1/2 -translate-x-1/2 z-20"
        >
          <div className="w-8 h-10 bg-brand-yellow/20 border border-brand-yellow/40 rounded flex items-center justify-center">
            <span className="text-xs text-brand-yellow">📄</span>
          </div>
        </motion.div>
      )}

      {/* Vendor Node */}
      <div className="flex flex-col items-center gap-1 z-10">
        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center relative">
          <span className="text-xl">🏢</span>
          {/* Approval Checkmark */}
          <AnimatePresence>
            {active && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.5, repeat: Infinity, repeatDelay: 1 }}
                className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border border-white flex items-center justify-center"
              >
                <span className="text-[8px] text-white font-bold">✓</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <span className="text-[7px] text-black/50 font-black uppercase">VENDOR</span>
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.02)_0%,transparent_70%)] pointer-events-none" />
    </div>
  </div>
);

// 3. Sourcing: Global Handshake
const SourcingAnim = ({ active }) => (
  <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
    <div className="w-full h-32 bg-white/5 rounded-2xl border border-white/10 relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
      <div className="flex items-center gap-6 z-10 relative">
        <div className="flex flex-col items-center gap-1">
          <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shadow-inner">
            <span className="text-lg">📍</span>
          </div>
          <span className="text-[7px] font-black text-black/40 uppercase">BRAND</span>
        </div>
        <div className="relative w-10 h-px bg-black/10">
          <motion.div
            initial={{ width: 0 }}
            animate={active ? { width: '100%' } : {}}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="h-full bg-brand-yellow/60"
          />
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shadow-inner">
            <span className="text-lg">🏭</span>
          </div>
          <span className="text-[7px] font-black text-black/40 uppercase">VENDOR</span>
        </div>
        {active && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-yellow text-brand-navy p-2 rounded-full shadow-[0_0_20px_rgba(255,215,0,0.5)] z-20"
          >
            <span className="text-xl">🤝</span>
          </motion.div>
        )}
      </div>
    </div>
  </div>
);

// 4. Vendor: Actionable Checklist (Understandable Specs)
const VendorAnim = ({ active }) => (
  <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
    <div className="w-full bg-white/5 rounded-2xl border border-white/10 p-4 flex flex-col gap-3 relative">
      <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/5">
        <span className="text-lg">📋</span>
        <span className="text-[10px] font-black text-black/80 uppercase tracking-tight">Technical Brief</span>
      </div>
      
      {[
        { label: 'Materials Match', val: 'PREMIUM SILK' },
        { label: 'Quantity Check', val: '1,200 UNITS' },
        { label: 'Deadline Sync', val: 'JUN 24' }
      ].map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0.3, x: -10 }}
          animate={active ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: i * 0.4 }}
          className="flex items-center justify-between"
        >
          <div className="flex flex-col">
            <span className="text-[6px] font-black text-black/30 uppercase tracking-tighter">{item.label}</span>
            <span className="text-[8px] font-bold text-black/70">{item.val}</span>
          </div>
          <motion.div
            animate={active ? { 
              backgroundColor: "#22c55e",
              borderColor: "#22c55e",
              scale: [1, 1.2, 1]
            } : {}}
            transition={{ delay: i * 0.4 + 0.3 }}
            className="w-4 h-4 rounded border-2 border-white/10 flex items-center justify-center"
          >
            {active && (
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[8px] text-white font-bold"
              >
                ✓
              </motion.span>
            )}
          </motion.div>
        </motion.div>
      ))}
    </div>
  </div>
);

// 5. Sample: The Stage-by-Stage Journey
const SampleAnim = ({ active }) => {
  const stages = [
    { label: 'REQ', icon: '📝' },
    { label: 'QC', icon: '🔍' },
    { label: 'REV', icon: '👀' },
    { label: 'SHIP', icon: '📦' }
  ];
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
      <div className="w-full flex justify-between relative px-2 mb-4">
        <div className="absolute top-[11px] left-5 right-5 h-[2px] bg-white/5" />
        {stages.map((stage, i) => (
          <div key={i} className="flex flex-col items-center gap-2 z-10 relative">
            <motion.div
              animate={active && i <= 2 ? { 
                backgroundColor: i === 2 ? '#FFD700' : 'rgba(34, 197, 94, 0.4)',
                borderColor: i === 2 ? '#FFD700' : '#22c55e',
                boxShadow: i === 2 ? '0 0 15px rgba(255,215,0,0.3)' : 'none'
              } : { backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}
              className="w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors duration-500"
            >
              <span className="text-[10px]">{stage.icon}</span>
            </motion.div>
            <span className={`text-[6px] font-black uppercase tracking-widest ${active && i === 2 ? 'text-black' : 'text-black/30'}`}>
              {stage.label}
            </span>
            {active && i === 2 && (
              <motion.div
                layoutId="sample-jump"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute -top-8 w-8 h-8 flex items-center justify-center"
              >
                <motion.span animate={{ y: [-2, 2, -2] }} transition={{ duration: 1.5, repeat: Infinity }} className="text-lg">👕</motion.span>
              </motion.div>
            )}
          </div>
        ))}
      </div>
      {active && (
        <div className="px-3 py-1 bg-black/5 rounded border border-black/10">
          <span className="text-[9px] font-bold text-black uppercase tracking-widest">In-House Review</span>
        </div>
      )}
    </div>
  );
};

// 6. Production: Advanced Factory Visibility (Dashboard Style)
const ProductionAnim = ({ active }) => (
  <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
    <div className="w-full bg-white/5 rounded-2xl border border-white/10 p-4 flex flex-col gap-4 relative overflow-hidden">
      {/* Real-time Stage Indicators */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: 'CUTTING', val: 92, icon: '✂️' },
          { label: 'SEWING', val: 78, icon: '🧵' },
          { label: 'PACKING', val: 45, icon: '📦' }
        ].map((stage, i) => (
          <div key={i} className="flex flex-col gap-2 p-2 bg-white/5 rounded-lg border border-white/5">
            <div className="flex justify-between items-center">
              <span className="text-[10px]">{stage.icon}</span>
              <span className="text-[8px] font-black text-brand-yellow">{stage.val}%</span>
            </div>
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={active ? { width: `${stage.val}%` } : {}}
                transition={{ delay: i * 0.4, duration: 1.5 }}
                className="h-full bg-brand-yellow/60"
              />
            </div>
            <span className="text-[6px] font-black text-black/40 text-center uppercase tracking-tighter">{stage.label}</span>
          </div>
        ))}
      </div>

      {/* Live Stream Simulation */}
      <div className="w-full h-16 bg-black/40 rounded-lg border border-white/5 relative flex items-center justify-center">
        <div className="absolute top-1 left-1 flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[6px] font-black text-black/70 tracking-widest">LIVE FLOOR FEED</span>
        </div>
        {/* Weaving/Production Pattern */}
        <div className="flex gap-2">
          {[0, 1, 2, 3].map(i => (
            <motion.div
              key={i}
              animate={active ? { y: [-2, 2, -2], opacity: [0.3, 1, 0.3] } : {}}
              transition={{ delay: i * 0.2, duration: 2, repeat: Infinity }}
              className="w-4 h-6 bg-white/10 rounded-sm border border-white/10"
            />
          ))}
        </div>
      </div>
    </div>
    <div className="mt-2 text-[7px] font-black text-black/30 uppercase tracking-[0.3em]">SUPPLY CHAIN REAL-TIME MONITOR</div>
  </div>
);

const STEP_ANIMATIONS = [ TechpackAnim, ReviewAnim, SourcingAnim, VendorAnim, SampleAnim, ProductionAnim ];

const WorkflowCard = ({ index, x, y, scale, opacity, isActive, isMobile }) => {
  const content = workflowSteps[index];
  const accentColor = workflowColors[index];
  const Anim = STEP_ANIMATIONS[index];

  return (
    <motion.div
      style={{ x, y, scale, opacity, zIndex: 50 - index }}
      className={`absolute flex flex-col items-center justify-start py-6 px-5 rounded-[2.5rem] shadow-2xl backdrop-blur-xl ${
        isMobile ? 'w-[200px] h-[320px]' : 'w-[260px] h-[460px]'
      } shrink-0 overflow-hidden`}
    >
      {/* Premium Glass Background with Gradient Border */}
      <div className="absolute inset-0 bg-[#FFFDE7]/95" />
      <div className="absolute inset-0 border-2 border-[#FFD84D]/30 rounded-[2.5rem] pointer-events-none" />
      
      {/* Scroll-Triggered Shimmer Effect */}
      <motion.div 
        animate={{ x: ['-100%', '200%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 pointer-events-none z-20"
      />

      <div className="relative z-30 flex flex-col items-center w-full h-full">
        <div className="px-3 py-1 bg-brand-navy/5 rounded-full border border-brand-navy/20 mb-2 md:mb-4">
          <span className="font-black text-[9px] uppercase tracking-[0.2em] text-black">
            Step {index + 1}
          </span>
        </div>
        
        <h3 className="text-lg md:text-2xl font-black text-black leading-tight mb-2 md:mb-3 text-center tracking-tighter">
          {content.title}
        </h3>
        
        <p className="text-black font-semibold text-[10px] md:text-[11px] leading-relaxed text-center px-1 h-12 flex items-center justify-center">
          {content.desc}
        </p>

        <div className="w-full flex-1 flex items-center justify-center min-h-[100px] md:min-h-[160px] mt-2 md:mt-4 bg-brand-navy/[0.03] rounded-3xl border border-brand-navy/10">
          <Anim active={isActive} />
        </div>
      </div>
    </motion.div>
  );
};

const WorkflowSection = () => {
  const containerRef = useRef(null);
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 });
  const isMobile = windowSize.width < 1024;
  const isSmallMobile = windowSize.width < 640;

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  });

  const dispersion = useTransform(smoothProgress, [0.1, 0.8], [0, 1]);

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-transparent">
      <div className="sticky top-0 h-[100svh] w-full flex flex-col items-center justify-start overflow-hidden pt-20 md:pt-24 px-4">
        
        {/* Header */}
        <div className="text-center z-50 w-full px-4 mb-8 md:mb-16 relative">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tighter font-serif"
          >
            A Clear Flow From Design to Production
          </motion.h2>
          <p className="text-[#8FA3C8] text-xs sm:text-sm md:text-lg font-medium max-w-2xl mx-auto">
            Experience a synchronized workflow where every transition is seamless and every step is visible.
          </p>
        </div>

        {/* Cards Container */}
        <div className={`relative w-full ${isSmallMobile ? 'h-[750px]' : isMobile ? 'h-[600px]' : 'h-[500px]'} flex items-center justify-center`}>
          {workflowSteps.map((_, i) => {
            let targetX, targetY, endScale = 1;
            
            if (isSmallMobile) {
              targetX = 0;
              targetY = (i - 2.5) * 280; 
            } else if (isMobile) {
              targetX = (i % 2 - 0.5) * 220; 
              targetY = (Math.floor(i / 2) - 1) * 340;
            } else {
              const baseCardWidth = 260;
              const targetGap = 24;
              const maxTotalWidth = windowSize.width - 80;
              const maxStepSize = maxTotalWidth / 6;
              const finalStepSize = Math.min(baseCardWidth + targetGap, maxStepSize);
              
              targetX = (i - 2.5) * finalStepSize;
              targetY = 0;
              
              const availableWidthPerCard = finalStepSize - 12;
              endScale = Math.min(1, availableWidthPerCard / baseCardWidth);
            }
            
            const startY = 0;
            const startX = 0;
            
            const x = useTransform(dispersion, [0, 1], [startX, targetX]);
            const y = useTransform(dispersion, [0, 1], [startY, targetY]);
            
            const opacity = useTransform(dispersion, [0, 0.15], [i === 0 ? 1 : 0, 1]);
            const scale = useTransform(dispersion, [0, 1], [isMobile ? 0.5 : (endScale * 0.85), endScale]);

            return (
              <WorkflowCard 
                key={i} 
                index={i} 
                x={x} 
                y={y}
                scale={scale}
                opacity={opacity}
                isActive={true}
                isMobile={isMobile}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;
