import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

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
   ANIMATIONS
   ══════════════════════════════════════════════ */

const TechpackAnim = ({ active, accentColor }) => (
  <div className="flex flex-col items-center w-full mt-2 gap-4">
    <div className="relative">
      <motion.div
        animate={active ? { y: 0, opacity: 1 } : { y: 15, opacity: 0.3 }}
        className="relative z-10"
      >
        <svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="12" y1="18" x2="12" y2="12" />
          <polyline points="9 15 12 12 15 15" />
        </svg>
      </motion.div>
    </div>
    <div className="w-40 h-1.5 bg-white/10 rounded-full overflow-hidden border border-white/5">
      <motion.div
        className="h-full"
        style={{ backgroundColor: accentColor }}
        animate={active ? { width: "100%" } : { width: "20%" }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
    </div>
  </div>
);

const ReviewAnim = ({ active, accentColor }) => (
  <div className="flex flex-col items-center gap-4 mt-2 w-full">
    <div className="flex -space-x-3">
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          animate={active ? { opacity: 1, scale: 1 } : { opacity: 0.4, scale: 0.8 }}
          style={{ borderColor: accentColor }}
          className="w-10 h-10 rounded-full bg-white/10 border-2 flex items-center justify-center overflow-hidden"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="rgba(255,255,255,0.25)">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </motion.div>
      ))}
    </div>
    <motion.div
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0.3, y: 5 }}
      style={{ backgroundColor: accentColor, color: "white" }}
      className="px-3 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase shadow-sm"
    >
      Approved
    </motion.div>
  </div>
);

const SourcingAnim = ({ active, accentColor }) => (
  <div className="relative w-full h-24 mt-2 flex items-center justify-center px-4">
    <div className="w-full h-px bg-white/10 absolute top-1/2 left-0" />
    <motion.div
      animate={active ? { x: [ -40, 40 ], opacity: [0, 1, 1, 0] } : { opacity: 0 }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      style={{ backgroundColor: accentColor }}
      className="z-20 w-8 h-8 rounded-lg shadow-lg flex items-center justify-center"
    >
      <svg viewBox="0 0 24 24" width="14" height="14" stroke="white" strokeWidth="3" fill="none">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    </motion.div>
  </div>
);

const VendorAnim = ({ active, accentColor }) => (
  <div className="flex flex-col items-center w-full mt-4 gap-4">
    <div className="flex items-center gap-6 relative">
      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border-2" style={{ borderColor: accentColor }}>
         <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke={accentColor} strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></svg>
      </div>
    </div>
    <div className="flex gap-1.5">
      {[0, 1, 2].map(i => (
        <motion.div key={i} animate={active ? { opacity: [0.2, 1, 0.2] } : { opacity: 0.2 }} transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }} style={{ backgroundColor: accentColor }} className="w-1.5 h-1.5 rounded-full" />
      ))}
    </div>
  </div>
);

const SampleAnim = ({ active, accentColor }) => (
  <div className="w-full mt-6 flex flex-col gap-4 px-4">
    <div className="relative h-1 bg-white/10 rounded-full">
      <motion.div animate={active ? { width: "100%" } : { width: "10%" }} style={{ backgroundColor: accentColor }} className="absolute h-full rounded-full" />
    </div>
    <div className="flex items-center justify-center gap-2 bg-white/5 py-1.5 rounded-lg border border-white/5">
       <span className="text-[9px] font-extrabold">DHL PKG #4829</span>
    </div>
  </div>
);

const ProductionAnim = ({ active, accentColor }) => {
  const [percent, setPercent] = useState(65);
  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => setPercent(p => (p < 95 ? p + 1 : 65)), 2000);
    return () => clearInterval(interval);
  }, [active]);

  return (
    <div className="w-full mt-4 flex flex-col gap-3 px-4">
      <div className="flex flex-col gap-1.5">
        {[ { label: "Fabrication", p: 92 }, { label: "Construction", p: percent } ].map((item, i) => (
          <div key={i} className="flex flex-col gap-1">
            <div className="flex justify-between text-[7px] font-bold opacity-60"><span>{item.label}</span><span>{item.p}%</span></div>
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
               <motion.div animate={active ? { width: `${item.p}%` } : { width: "10%" }} style={{ backgroundColor: accentColor, opacity: 0.7 }} className="h-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const STEP_ANIMATIONS = [ TechpackAnim, ReviewAnim, SourcingAnim, VendorAnim, SampleAnim, ProductionAnim ];

const WorkflowCard = ({ index, x, y, scale, opacity, isActive, isMobile }) => {
  const content = workflowSteps[index];
  const accentColor = workflowColors[index];
  const Anim = STEP_ANIMATIONS[index];

  return (
    <motion.div
      style={{ x, y, scale, opacity, zIndex: 50 - index }}
      className={`absolute flex flex-col items-center justify-start py-6 px-5 rounded-[2rem] bg-[#EAF1FA]/10 backdrop-blur-md border border-[#EAF1FA]/20 shadow-2xl ${
        isMobile ? 'w-[200px] h-[320px]' : 'w-[260px] h-[460px]'
      } shrink-0`}
    >
      <div className="relative z-10 flex flex-col items-center w-full">
        <span className="font-extrabold text-[9px] uppercase tracking-[0.2em] mb-2 md:mb-4 block text-[#B8C7E0]">
          Step {index + 1}
        </span>
        <h3 className="text-lg md:text-2xl font-extrabold text-white leading-tight mb-2 md:mb-3 text-center tracking-tight">
          {content.title}
        </h3>
        <p className="text-[#B8C7E0] font-medium text-[10px] md:text-[11px] leading-relaxed text-center px-1">
          {content.desc}
        </p>

        <div className="w-full flex-1 flex items-center justify-center min-h-[100px] md:min-h-[160px] mt-2 md:mt-4">
          <Anim active={isActive} accentColor={accentColor} />
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
    <section ref={containerRef} className="relative h-[400vh] bg-[#0E2545]">
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
            // X & Y logic for three different states: Row (Desktop), 2x3 Grid (Tablet), 1x6 Stack (Small Mobile)
            let targetX, targetY, endScale = 1;
            
            if (isSmallMobile) {
              targetX = 0;
              targetY = (i - 2.5) * 280; // Single column stack
            } else if (isMobile) {
              targetX = (i % 2 - 0.5) * 220; // 2 column grid
              targetY = (Math.floor(i / 2) - 1) * 340;
            } else {
              // Desktop dynamic scaling
              const baseCardWidth = 260;
              const targetGap = 24;
              const maxTotalWidth = windowSize.width - 80; // 40px padding on each side
              const maxStepSize = maxTotalWidth / 6;
              const finalStepSize = Math.min(baseCardWidth + targetGap, maxStepSize);
              
              targetX = (i - 2.5) * finalStepSize;
              targetY = 0;
              
              // Scale down card if screen is too narrow to fit them all
              const availableWidthPerCard = finalStepSize - 12; // ensure at least 12px gap
              endScale = Math.min(1, availableWidthPerCard / baseCardWidth);
            }
            
            // All cards start stacked exactly in the center.
            // Opacity keeps the hidden cards invisible to prevent glassmorphic bleed-through on the face card.
            const startY = 0;
            const startX = 0;
            
            const x = useTransform(dispersion, [0, 1], [startX, targetX]);
            const y = useTransform(dispersion, [0, 1], [startY, targetY]);
            
            // Hidden cards fade in as they disperse from the stack
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
