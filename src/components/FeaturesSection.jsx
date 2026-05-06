import React, { useRef, useState, useEffect, memo } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

// Import Feature-specific premium assets provided by designer
import featureWorkflow from '../assets/feature_workflow_new.png';
import featureCommunication from '../assets/feature_communication_new.png';
import featureVisibility from '../assets/feature_visibility_new.png';
import featureCollaboration from '../assets/feature_collaboration_new.png';
import featureControl from '../assets/feature_control_new.png';
import logo4 from '../assets/logo4.png';

/** 
 * HIGH-CLARITY INDUSTRY ANIMATIONS
 */

const FashionWorkflowAnimation = memo(({ active }) => (
  <div className="relative w-full h-full flex items-center justify-center p-2 will-change-transform">
    <div className="relative w-full h-full bg-white/5 rounded-xl border border-white/10 flex items-center justify-center overflow-hidden">
      <svg className="w-20 h-20 md:w-28 md:h-28" viewBox="0 0 100 100">
        <motion.path
          d="M20,25 L35,25 L40,35 L60,35 L65,25 L80,25 L85,45 L75,50 L75,85 L25,85 L25,50 L15,45 Z"
          fill="none"
          stroke="#FFD700"
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={active ? { pathLength: 1, opacity: 1 } : { pathLength: 0.3, opacity: 0.3 }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        {active && [30, 50, 70].map((y, i) => (
          <motion.circle
            key={i}
            cx="50" cy={y} r="1"
            fill="#FFD700"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.5, 0] }}
            transition={{ delay: i * 0.4, duration: 1.5, repeat: Infinity }}
          />
        ))}
      </svg>
      {active && (
        <motion.div 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="absolute bottom-3 text-[9px] font-mono text-brand-yellow uppercase tracking-widest"
        >
          SYNCING TECH-PACK...
        </motion.div>
      )}
    </div>
  </div>
));

// 2. Communication: Unified Thread / Chat Flow
const FashionCommAnimation = memo(({ active }) => (
  <div className="relative w-full h-full flex items-center justify-center p-2 will-change-transform">
    <div className="relative w-full h-full bg-white/5 rounded-xl border border-white/10 flex flex-col p-4 gap-3 overflow-hidden">
      {[
        { user: 'DES', msg: 'Fabric swatch updated', color: 'bg-brand-yellow/20' },
        { user: 'VND', msg: 'Sample sent for review', color: 'bg-white/5' },
        { user: 'FAC', msg: 'Production ready', color: 'bg-brand-yellow/40' }
      ].map((chat, i) => (
        <motion.div
          key={i}
          initial={{ x: -20, opacity: 0 }}
          animate={active ? { x: 0, opacity: 1 } : {}}
          transition={{ delay: i * 0.4 }}
          className={`flex flex-col gap-1 p-3 rounded-lg border border-white/10 ${chat.color} shadow-sm backdrop-blur-sm`}
        >
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] font-extrabold text-brand-yellow uppercase tracking-wider drop-shadow-sm">{chat.user}</span>
            <span className="text-[9px] text-white/50 font-medium">Just now</span>
          </div>
          <p className="text-[12px] md:text-[14px] text-white font-medium leading-relaxed drop-shadow-sm">{chat.msg}</p>
        </motion.div>
      ))}
    </div>
  </div>
));

// 3. Real-time Visibility: Live Tracking / Status Board
const FashionVisibilityAnimation = memo(({ active }) => {
  const steps = [
    { label: 'Designing', icon: '✎' },
    { label: 'Sampling', icon: '✂' },
    { label: 'Production', icon: '⚙' },
    { label: 'Shipped', icon: '✈' }
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center p-2 will-change-transform">
      <div className="w-full h-full bg-white/5 rounded-xl border border-white/10 flex flex-col justify-center p-5 gap-5">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-4">
            <motion.div
              animate={active ? { 
                backgroundColor: i <= 2 ? '#FFD700' : 'rgba(255,255,255,0.1)',
                scale: i === 2 ? [1, 1.15, 1] : 1
              } : {}}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[14px] text-brand-navy font-bold shadow-md shrink-0"
            >
              {step.icon}
            </motion.div>
            <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={active && i <= 2 ? { width: "100%" } : { width: "0%" }}
                transition={{ duration: 1, delay: i * 0.3 }}
                className="h-full bg-brand-yellow/80 shadow-[0_0_10px_rgba(255,215,0,0.5)]"
              />
            </div>
            <span className={`text-[11px] md:text-[12px] uppercase tracking-widest w-24 text-right shrink-0 ${active && i === 2 ? 'text-brand-yellow font-extrabold drop-shadow-md' : 'text-white/40 font-semibold'}`}>
              {step.label}
            </span>
          </div>
        ))}
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-3 text-center"
          >
            <span className="text-[12px] md:text-[13px] text-brand-yellow animate-pulse font-mono font-bold tracking-widest drop-shadow-md">● LIVE UPDATING</span>
          </motion.div>
        )}
      </div>
    </div>
  );
});

// 4. Dynamic Collaboration: MODOZO Active Hub
const collabNodes = [
  { label: 'DESIGNER', icon: '🎨', angle: -90 },
  { label: 'VENDOR', icon: '🏢', angle: 30 },
  { label: 'QA ANALYST', icon: '🔍', angle: 150 }
];

const FashionCollabAnimation = memo(({ active }) => {
  const nodeRadius = 105;
  const center = 128; // half of w-64 (256px)

  const nodePositions = collabNodes.map(node => {
    const rad = node.angle * (Math.PI / 180);
    return {
      ...node,
      x: Math.cos(rad) * nodeRadius,
      y: Math.sin(rad) * nodeRadius,
      cx: center + Math.cos(rad) * nodeRadius,
      cy: center + Math.sin(rad) * nodeRadius
    };
  });

  return (
    <div className="relative w-full h-full flex items-center justify-center p-2 will-change-transform">
      <div className="w-full h-full bg-white/5 rounded-xl flex items-center justify-center overflow-hidden">
        <div className="relative w-64 h-64">
          {/* Connection Lines — single SVG layer for perfect alignment */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" viewBox="0 0 256 256">
            {active && nodePositions.map((node, i) => (
              <motion.line
                key={i}
                x1={center} y1={center}
                x2={node.cx} y2={node.cy}
                stroke="rgba(255,215,0,0.6)"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: i * 0.2 }}
              />
            ))}
          </svg>

          {/* Central MODOZO Logo */}
          <motion.div 
            animate={active ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 z-20 flex items-center justify-center bg-[#0E2545]/80 rounded-full shadow-[0_0_30px_rgba(255,215,0,0.2)] p-2 border border-brand-yellow/30 backdrop-blur-md"
          >
            <img src={logo4} alt="Modozo" className="w-full h-full object-contain" />
          </motion.div>
          
          {/* Stakeholder Nodes */}
          {nodePositions.map((node, i) => (
            <motion.div
              key={i}
              animate={active ? { 
                x: node.x, y: node.y, opacity: 1
              } : { x: 0, y: 0, opacity: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-14 h-14"
            >
              <div className="w-14 h-14 bg-[#163563] rounded-full flex items-center justify-center border-2 border-white/20 shadow-[0_10px_20px_rgba(0,0,0,0.4)] backdrop-blur-md">
                <span className="text-[24px]">{node.icon}</span>
              </div>
              <span className="absolute top-full left-1/2 -translate-x-1/2 mt-3 text-[11px] text-white/90 font-extrabold tracking-[0.2em] uppercase whitespace-nowrap drop-shadow-lg">{node.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
});

// 5. Precision Control: Multi-Level Document Approval
const FashionControlAnimation = memo(({ active }) => {
  const levels = [
    { label: 'FACTORY CHECK', icon: '🏭' },
    { label: 'QC AUDIT', icon: '📋' },
    { label: 'FINAL APPROVAL', icon: '✨' }
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center p-2 will-change-transform">
      <div className="w-full h-full bg-white/5 rounded-xl border border-white/10 flex flex-col items-center justify-center p-4 gap-6 overflow-hidden">
        {/* Document Path Visualization */}
        <div className="relative w-full flex justify-between items-center px-4">
          {levels.map((level, i) => (
            <div key={i} className="flex flex-col items-center gap-2 z-10">
              <motion.div
                animate={active ? { 
                  backgroundColor: i === 0 ? 'rgba(255,215,0,0.2)' : 'rgba(255,255,255,0.05)',
                  borderColor: i === 0 ? '#FFD700' : 'rgba(255,255,255,0.2)'
                } : {}}
                className="w-14 h-14 rounded-xl border-2 flex items-center justify-center bg-white/10 shadow-lg backdrop-blur-sm"
              >
                <span className="text-2xl">{level.icon}</span>
              </motion.div>
              <span className="text-[9px] text-white/90 font-extrabold text-center uppercase leading-tight w-20 drop-shadow-md tracking-widest">
                {level.label}
              </span>
            </div>
          ))}
          
          <div className="absolute top-7 left-14 right-14 h-1 bg-white/10 rounded-full -z-0" />
          
          {active && (
            <motion.div
              animate={{ 
                left: ["15%", "50%", "85%", "15%"],
                opacity: [0, 1, 1, 0]
              }}
              transition={{ duration: 4, repeat: Infinity, times: [0, 0.3, 0.7, 1] }}
              className="absolute top-3 w-8 h-8 bg-brand-yellow rounded shadow-[0_0_20px_rgba(255,215,0,0.6)] flex items-center justify-center z-20"
            >
              <span className="text-[14px] text-brand-navy font-bold">📄</span>
            </motion.div>
          )}
        </div>

        <div className="w-full flex flex-col gap-3 px-2">
          {levels.map((level, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0.2 }}
              animate={active ? { 
                opacity: 1,
                x: [0, 5, 0]
              } : {}}
              transition={{ delay: i * 1, repeat: Infinity, repeatDelay: 3 }}
              className="flex items-center gap-3"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-brand-yellow shadow-[0_0_10px_rgba(255,215,0,0.5)]" />
              <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={active ? { width: "100%" } : {}}
                  transition={{ delay: i * 1, duration: 1, repeat: Infinity, repeatDelay: 3 }}
                  className="h-full bg-brand-yellow rounded-full"
                />
              </div>
              <span className="text-[10px] text-brand-yellow font-extrabold font-mono tracking-widest w-16 text-right drop-shadow-md">VERIFIED</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
});

const featureIcons = {
  workflow: (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
  ),
  communication: (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
  ),
  visibility: (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
  ),
  collaboration: (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
  ),
  control: (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
  )
};

const featureData = [
  {
    id: "workflow",
    title: "Unified Workflow",
    desc: "Seamless synchronization from design techpacks to production floors.",
    image: featureWorkflow,
    icon: featureIcons.workflow,
    Animation: FashionWorkflowAnimation
  },
  {
    id: "communication",
    title: "Communication",
    desc: "Eliminate email chains. Every update and file in a single thread.",
    image: featureCommunication,
    icon: featureIcons.communication,
    Animation: FashionCommAnimation
  },
  {
    id: "visibility",
    title: "Real-time Visibility",
    desc: "Instant live updates on status changes across your supply chain.",
    image: featureVisibility,
    icon: featureIcons.visibility,
    Animation: FashionVisibilityAnimation
  },
  {
    id: "collaboration",
    title: "Dynamic Collaboration",
    desc: "Connect your entire design team and global vendor ecosystem.",
    image: featureCollaboration,
    icon: featureIcons.collaboration,
    Animation: FashionCollabAnimation
  },
  {
    id: "control",
    title: "Precision Control",
    desc: "Maintain strict quality standards with automated checks and live oversight.",
    image: featureControl,
    icon: featureIcons.control,
    Animation: FashionControlAnimation
  }
];

<<<<<<< HEAD
const FeaturesSection = () => {
  const [activeFeature, setActiveFeature] = useState(featureData[0]);

  return (
    <section 
      className="relative min-h-0 py-12 md:py-16 bg-transparent flex flex-col justify-center overflow-hidden" 
      id="features"
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 w-full flex flex-col gap-6">
        
        {/* Header */}
        <div className="text-center z-20">
=======
const FeatureCard = ({ feature, index, isActive, onHover }) => {
  const [viewState, setViewState] = useState({ isMobile: false, isShort: false, isWide: false });

  useEffect(() => {
    const handleResize = () => {
      setViewState({ 
        isMobile: window.innerWidth < 1024,
        isShort: window.innerHeight < 800,
        isWide: window.innerWidth > 1400
      });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Positions based on the user's architectural sketch, with high-fidelity spacing
  const getPosition = (idx) => {
    const { isMobile, isShort, isWide } = viewState;
    if (isMobile) {
      const mobileOffsets = [
        { x: 0, y: isShort ? -160 : -220 },    // Top
        { x: -160, y: -40 },                    // Left Top
        { x: -160, y: isShort ? 80 : 120 },     // Left Bottom
        { x: 160, y: -40 },                     // Right Top
        { x: 160, y: isShort ? 80 : 120 }       // Right Bottom
      ];
      return mobileOffsets[idx];
    }
    const desktopOffsets = [
      { x: 0, y: isShort ? -280 : -340 },      // Top Center (moved further up)
      { x: isWide ? -420 : -380, y: -60 },     // Left Top
      { x: isWide ? -420 : -380, y: 180 },     // Left Bottom
      { x: isWide ? 420 : 380, y: -60 },      // Right Top
      { x: isWide ? 420 : 380, y: 180 }       // Right Bottom
    ];
    return desktopOffsets[idx];
  };
  
  const pos = getPosition(index);

  return (
    <motion.div
      onMouseEnter={() => onHover(feature)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        x: pos.x,
        y: pos.y,
        zIndex: isActive ? 100 : 10
      }}
      transition={{ type: "spring", stiffness: 80, damping: 20 }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
    >
      <div className={`
        relative w-24 h-20 md:w-52 md:h-40 rounded-2xl md:rounded-[2.2rem] overflow-hidden border transition-all duration-500
        ${isActive 
          ? 'bg-white border-brand-yellow shadow-[0_30px_60px_rgba(255,215,0,0.35)] scale-110 z-50' 
          : 'bg-white/90 backdrop-blur-md border-white/20 opacity-40 grayscale-[0.3] hover:opacity-100 hover:grayscale-0'
        }
      `}>
        {/* The Image Container - Refined for maximum visibility while maintaining surgical focus */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <div className="relative w-full h-full scale-[1.15] -translate-y-[5%]">
            <img 
              src={feature.image} 
              alt={feature.title} 
              loading="lazy"
              className="w-full h-full object-contain will-change-transform"
            />
          </div>
        </div>

        {/* Glossy Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none z-30" />
      </div>
    </motion.div>
  );
};

const CentralHub = ({ activeFeature }) => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] md:w-[400px] h-[220px] md:h-[400px] flex flex-col items-center justify-center text-center overflow-hidden bg-white/5 rounded-[2rem] md:rounded-[3.5rem] border border-white/10 backdrop-blur-md shadow-2xl">
      <AnimatePresence mode="wait">
        {activeFeature ? (
          <motion.div
            key={activeFeature.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col items-center p-6 md:p-10"
          >
            <div className="w-24 h-24 md:w-40 md:h-40 mb-6 md:mb-6 flex-shrink-0">
              <activeFeature.Animation active={true} />
            </div>
            
            <div className="max-w-[340px]">
              <h3 className="text-xl md:text-3xl font-bold text-white mb-2 md:mb-3 font-serif tracking-tight">
                {activeFeature.title}
              </h3>
              <p className="text-[10px] md:text-sm text-white/70 font-medium leading-relaxed">
                {activeFeature.desc}
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="default"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center opacity-10"
          >
            <h3 className="text-2xl md:text-4xl font-bold text-white font-serif uppercase tracking-[0.6em]">
              MODOZO
            </h3>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FeaturesSection = () => {
  const [activeFeature, setActiveFeature] = useState(featureData[0]);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  return (
    <section 
      className="relative h-screen min-h-[700px] md:min-h-[900px] pt-24 md:pt-40 flex flex-col items-center overflow-hidden bg-transparent" 
      ref={containerRef}
    >
      <div className="max-w-[1600px] mx-auto px-6 w-full flex flex-col items-center">
        <div className="mb-8 md:mb-12 text-center z-20">
>>>>>>> c68fdfe2ce3766afb60c97e1f8cda2475d81c085
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
<<<<<<< HEAD
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter font-serif text-white mb-1"
=======
            className="text-4xl md:text-6xl font-bold tracking-tighter font-serif text-white mb-3"
>>>>>>> c68fdfe2ce3766afb60c97e1f8cda2475d81c085
          >
            What Makes This Powerful
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
<<<<<<< HEAD
            className="text-[#8FA3C8] text-sm md:text-base max-w-2xl mx-auto mt-2"
=======
            className="text-brand-yellow/60 text-[10px] md:text-sm uppercase tracking-[0.5em] font-black"
>>>>>>> c68fdfe2ce3766afb60c97e1f8cda2475d81c085
          >
            Hover to explore the precision behind our unified hub
          </motion.p>
<<<<<<< HEAD
        </div>

        {/* TOP FEATURE ROW */}
        <div className="w-full flex overflow-x-auto lg:justify-center items-center gap-4 pb-2 pt-2 snap-x no-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {featureData.map((feature) => {
            const isActive = activeFeature.id === feature.id;
            return (
              <motion.div
                key={feature.id}
                onHoverStart={() => setActiveFeature(feature)}
                onClick={() => setActiveFeature(feature)}
                whileHover={{ y: -4, scale: 1.02 }}
                className={`
                  shrink-0 snap-center flex items-center justify-center px-6 py-3 rounded-xl cursor-pointer transition-all duration-300
                  ${isActive 
                    ? 'bg-[#FDFBF7] border-[#FFD700] shadow-[0_8px_20px_rgba(255,215,0,0.3)] border-2' 
                    : 'bg-[#FDFBF7]/80 border-transparent border-2 shadow-sm opacity-60 hover:opacity-100'
                  }
                `}
                style={{ minWidth: '140px' }}
              >
                <span className={`font-bold text-[14px] md:text-[15px] tracking-wide ${isActive ? 'text-[#0E2545]' : 'text-[#4A5568]'}`}>
                  {feature.title}
                </span>
              </motion.div>
            );
          })}
=======
          <div className="h-1 w-24 bg-brand-yellow mx-auto mt-6 rounded-full opacity-40 shadow-[0_0_20px_rgba(255,215,0,0.5)]" />
        </div>

        <div className="relative w-full h-[450px] md:h-[650px] flex items-center justify-center">
          <CentralHub activeFeature={activeFeature} />

          {isInView && featureData.map((feature, index) => (
            <FeatureCard 
              key={feature.id}
              feature={feature}
              index={index}
              isActive={activeFeature?.id === feature.id}
              onHover={setActiveFeature}
            />
          ))}
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[900px] h-[600px] md:h-[900px] bg-brand-yellow/[0.03] blur-[150px] rounded-full -z-10" />
>>>>>>> c68fdfe2ce3766afb60c97e1f8cda2475d81c085
        </div>

        {/* PREVIEW CARD BELOW */}
        <div className="w-full max-w-5xl mx-auto mt-0">
          {/* Static Preview Container */}
          <div className="relative w-full bg-[#0B1B33]/60 border border-white/10 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-md h-[480px] md:h-[380px]">
            
            <AnimatePresence mode="wait">
              {/* Dynamic Inner Content */}
              <motion.div
                key={activeFeature.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 flex flex-col md:flex-row items-center justify-between p-6 md:p-10 gap-6 md:gap-10"
              >
                {/* Left side: Text */}
                <div className="w-full md:w-1/2 flex flex-col justify-center h-full gap-3 relative z-10 text-center md:text-left items-center md:items-start">
                  <div className="w-14 h-14 rounded-2xl bg-[#FFD700]/10 border border-[#FFD700]/20 flex items-center justify-center text-[#FFD700] mb-1 md:mb-2 shrink-0">
                    {activeFeature.icon}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white font-serif tracking-tight leading-tight">
                    {activeFeature.title}
                  </h3>
                  <p className="text-[#8FA3C8] text-sm md:text-base leading-relaxed max-w-md mt-1">
                    {activeFeature.desc}
                  </p>
                </div>

                {/* Right side: Illustration + Animation */}
                <div className="w-full md:w-1/2 h-[220px] md:h-full flex items-center justify-center relative">
                  {/* Subtle Illustration Background */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none transition-opacity duration-500 mix-blend-screen">
                    <img 
                      src={activeFeature.image} 
                      alt="" 
                      className="object-contain w-full h-full max-h-[120%]"
                    />
                  </div>
                  
                  {/* High Clarity Animation */}
                  <div className="relative z-20 w-full h-full max-w-[280px] max-h-[280px] shadow-2xl rounded-2xl bg-[#0E2545]/40 backdrop-blur-sm border border-white/5">
                    <activeFeature.Animation active={true} />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
          </div>
        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;
