import React, { useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';

// --- Premium Relevant Animations ---

const DesignersAnim = () => (
  <div className="w-full h-full bg-[#0E2545] flex items-center justify-center p-8 relative overflow-hidden rounded-[2rem]">
    {/* Blueprint Grid */}
    <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
    {/* Techpack Outline (T-shirt) */}
    <motion.svg viewBox="0 0 100 100" className="w-48 h-48 relative z-10" fill="none" stroke="#FFD84D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <motion.path 
        d="M20 30 L40 20 L60 20 L80 30 L90 60 L75 65 L70 90 L30 90 L25 65 L10 60 Z" 
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.path 
        d="M35 25 Q50 35 65 25" 
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
      />
      {/* Dynamic measurement lines */}
      <motion.line x1="15" y1="95" x2="85" y2="95" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="2 2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} />
      <motion.text x="50" y="99" fill="rgba(255,255,255,0.5)" fontSize="4" textAnchor="middle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>Width: 45cm</motion.text>
    </motion.svg>
  </div>
);

const BrandTeamsAnim = () => (
  <div className="w-full h-full bg-[#0E2545] flex items-center justify-center p-8 relative overflow-hidden rounded-[2rem]">
    <motion.div 
      initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="w-56 h-36 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md flex flex-col p-5 gap-4 relative shadow-2xl"
    >
      <div className="flex gap-3 items-center">
        <div className="w-10 h-10 bg-white/10 rounded-lg"></div>
        <div className="flex flex-col gap-2">
          <div className="w-24 h-2 bg-white/20 rounded-full"></div>
          <div className="w-16 h-2 bg-white/10 rounded-full"></div>
        </div>
      </div>
      <div className="w-full h-2 bg-white/10 rounded-full mt-2"></div>
      
      <motion.div 
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
        className="absolute -bottom-5 -right-5 w-14 h-14 bg-[#FFD84D] rounded-full border-4 border-[#0E2545] flex items-center justify-center shadow-[0_0_20px_rgba(255,216,77,0.4)]"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="#0E2545" strokeWidth="3" className="w-7 h-7"><polyline points="20 6 9 17 4 12"/></svg>
      </motion.div>
    </motion.div>
  </div>
);

const SourcingAnim = () => (
  <div className="w-full h-full bg-[#0E2545] flex items-end justify-center p-8 gap-4 relative overflow-hidden rounded-[2rem]">
    {/* Background Grid */}
    <div className="absolute inset-x-8 inset-y-12 border-b border-l border-white/10"></div>
    {[
      { h: 45, c: "bg-white/10" },
      { h: 70, c: "bg-white/10" },
      { h: 30, c: "bg-[#FFD84D]" }, // The lowest quote (best)
      { h: 85, c: "bg-white/10" }
    ].map((item, i) => (
      <motion.div 
        key={i}
        initial={{ height: 0 }}
        animate={{ height: `${item.h}%` }}
        transition={{ duration: 1.2, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
        className={`w-12 rounded-t-md relative z-10 ${item.c}`}
      >
        {i === 2 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white/10 border border-white/20 backdrop-blur-md text-[#FFD84D] text-[10px] font-bold px-2 py-1 rounded-md whitespace-nowrap"
          >
            Best Quote
          </motion.div>
        )}
      </motion.div>
    ))}
  </div>
);

const VendorsAnim = () => (
  <div className="w-full h-full bg-[#0E2545] flex flex-col justify-center gap-5 p-6 relative overflow-hidden rounded-[2rem]">
    <motion.div 
      initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="w-[85%] bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-sm relative self-start flex flex-col gap-3 shadow-lg"
    >
      <div className="text-[#B8C7E0] text-[9px] font-bold uppercase tracking-wider mb-1">Production Brief</div>
      <div className="w-1/3 h-2 bg-white/40 rounded-full"></div>
      <div className="w-full h-2 bg-white/20 rounded-full"></div>
      <div className="w-2/3 h-2 bg-white/20 rounded-full"></div>
    </motion.div>
    
    <motion.div 
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
      className="w-[70%] bg-[#FFD84D] p-4 rounded-2xl rounded-tr-sm relative self-end shadow-[0_10px_20px_rgba(255,216,77,0.2)] flex flex-col gap-3"
    >
      <div className="text-[#0E2545]/70 text-[9px] font-bold uppercase tracking-wider mb-1">Vendor Reply</div>
      <div className="w-1/2 h-2 bg-[#0E2545]/60 rounded-full"></div>
      <div className="w-full h-2 bg-[#0E2545]/40 rounded-full"></div>
    </motion.div>
  </div>
);

const QAAnim = () => (
  <div className="w-full h-full bg-[#0E2545] flex flex-col items-center justify-center gap-6 p-8 relative overflow-hidden rounded-[2rem]">
    <div className="flex flex-col gap-4 w-full max-w-[180px] z-10">
      {["Measurements", "Stitching", "Color Match"].map((label, i) => (
        <div key={i} className="flex items-center gap-4 bg-white/5 p-3 rounded-xl border border-white/10">
          <motion.div 
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.3 + 0.2, type: "spring" }}
            className="w-6 h-6 shrink-0 rounded-md border-2 border-[#FFD84D] flex items-center justify-center bg-[#FFD84D]/20"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="#FFD84D" strokeWidth="3" className="w-4 h-4"><polyline points="20 6 9 17 4 12"/></svg>
          </motion.div>
          <div className="flex flex-col gap-1 w-full">
            <span className="text-[10px] text-[#B8C7E0] font-bold uppercase">{label}</span>
            <div className="w-full h-1.5 bg-white/20 rounded-full">
              <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ delay: i * 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="h-full bg-[#FFD84D] rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const TechAnim = () => (
  <div className="w-full h-full bg-[#0E2545] flex items-center justify-center p-8 relative overflow-hidden rounded-[2rem]">
    {/* ERP Node (Left) */}
    <motion.div 
      animate={{ y: [-5, 5, -5] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      className="absolute left-6 w-16 h-16 bg-white/5 border border-white/20 rounded-xl flex flex-col items-center justify-center z-20 backdrop-blur-md shadow-lg"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" className="w-6 h-6 mb-1 opacity-60"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
      <span className="text-white/60 text-[10px] font-bold">ERP</span>
    </motion.div>
    
    {/* Connection Line & Packets */}
    <div className="absolute w-full h-0.5 bg-white/10 z-10 flex items-center">
      <motion.div 
        initial={{ x: "-100%" }} animate={{ x: "200%" }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        className="w-1/3 h-1 bg-[#FFD84D] rounded-full shadow-[0_0_15px_#FFD84D]"
      />
    </div>

    {/* API/Modozo Node (Right) */}
    <motion.div 
      animate={{ y: [5, -5, 5] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      className="absolute right-6 w-16 h-16 bg-[#FFD84D] rounded-full flex flex-col items-center justify-center z-20 shadow-[0_0_30px_rgba(255,216,77,0.4)]"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="#0B1B33" strokeWidth="2" className="w-6 h-6 mb-1"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
      <span className="text-[#0B1B33] text-[10px] font-bold">API</span>
    </motion.div>
  </div>
);


const stakeholdersData = [
  { 
    id: "designers", 
    title: "Designers", 
    desc: "Seamlessly upload techpacks and collaborate on design files in real-time. Say goodbye to scattered versions and fragmented feedback.",
    AnimComponent: DesignersAnim
  },
  { 
    id: "brand", 
    title: "Brand Teams", 
    desc: "Gain complete visibility over the product lifecycle, ensuring every detail aligns with the brand vision before final approval.",
    AnimComponent: BrandTeamsAnim
  },
  { 
    id: "sourcing", 
    title: "Sourcing Managers", 
    desc: "Instantly compare vendor quotes and manage material sourcing within a single, unified financial dashboard.",
    AnimComponent: SourcingAnim
  },
  { 
    id: "vendors", 
    title: "Vendors", 
    desc: "Receive crystal-clear production briefs and instantly communicate sample statuses without endless email threads.",
    AnimComponent: VendorsAnim
  },
  { 
    id: "qa", 
    title: "QA Teams", 
    desc: "Log quality control metrics directly against the techpack, tracking defect rates and ensuring total compliance.",
    AnimComponent: QAAnim
  },
  { 
    id: "tech", 
    title: "Tech Teams", 
    desc: "Integrate with existing ERPs through robust APIs, maintaining a secure, scalable, and fully synchronized architecture.",
    AnimComponent: TechAnim
  }
];

const StakeholdersSection = () => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const newIndex = Math.min(5, Math.floor(latest * 6));
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  });

  return (
    <section ref={containerRef} className="relative h-[600vh] bg-transparent" id="stakeholders">
      {/* Sticky Container - Adjusted padding so header stays visible */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden px-4 sm:px-6 lg:px-12 py-4 lg:py-8">
        
        {/* Header - Kept compact */}
        <div className="text-center w-full mb-6 lg:mb-10 z-10 shrink-0 mt-16 md:mt-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 tracking-tighter font-serif">
            One Platform. All Stakeholders.
          </h2>
          <p className="text-[#8FA3C8] text-sm md:text-lg font-medium max-w-2xl mx-auto px-4">
            A single source of truth that aligns every team seamlessly across the entire supply chain.
          </p>
        </div>

        {/* 3-Column Layout */}
        <div className="max-w-7xl w-full mx-auto flex flex-col lg:grid lg:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-16 items-center flex-1 min-h-0 pb-10">
          
          {/* Left Column: Feature List */}
          <div className="hidden lg:flex flex-col gap-1 w-full justify-center">
            {stakeholdersData.map((item, i) => (
              <div 
                key={item.id} 
                className={`px-4 py-3 rounded-xl transition-all duration-300 ease-out cursor-default
                  ${activeIndex === i 
                    ? 'bg-white/10 border border-white/20 shadow-lg translate-x-2' 
                    : 'opacity-40 hover:opacity-60 border border-transparent'
                  }
                `}
              >
                <div className="flex items-center">
                  <h3 className="text-xl xl:text-2xl font-bold text-white tracking-tight">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Center Column: Elegant Bordered Card (Not a phone) */}
          <div className="relative flex justify-center items-center w-full lg:w-[360px] xl:w-[420px] h-[40vh] sm:h-[50vh] lg:h-[500px] shrink-0">
            {/* 
              This replaces the "mobile phone" look with a sleek, 
              geometric card similar to the user's reference image. 
            */}
            <div className="relative w-full h-full border border-white/20 rounded-[2rem] bg-[#0E2545] overflow-hidden shadow-2xl shrink-0 p-1">
              
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeIndex} 
                  initial={{ opacity: 0, scale: 0.95 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  exit={{ opacity: 0, scale: 1.05 }} 
                  transition={{ duration: 0.4, ease: "easeOut" }} 
                  className="absolute inset-1 rounded-[1.8rem] overflow-hidden"
                >
                  {(() => {
                    const ActiveComponent = stakeholdersData[activeIndex].AnimComponent;
                    return <ActiveComponent />;
                  })()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Descriptions */}
          <div className="w-full flex flex-col justify-center items-center lg:items-start text-center lg:text-left h-[20vh] lg:h-[300px]">
            {/* Mobile Title (Hidden on Desktop) */}
            <h3 className="lg:hidden text-2xl font-bold text-[#FFD84D] mb-4">
              {stakeholdersData[activeIndex].title}
            </h3>

            {/* Description Text */}
            <div className="relative w-full max-w-sm overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeIndex} 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -20 }} 
                  transition={{ duration: 0.5, ease: "easeOut" }} 
                  className="w-full flex flex-col items-center lg:items-start"
                >
                  <p className="text-[#B8C7E0] text-base sm:text-lg lg:text-xl leading-relaxed font-medium">
                    {stakeholdersData[activeIndex].desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default StakeholdersSection;
