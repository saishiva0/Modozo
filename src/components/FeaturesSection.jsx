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
    <div className="relative w-full h-full bg-white/5 rounded-xl border border-white/10 flex flex-col p-2 gap-1.5 overflow-hidden">
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
          className={`flex flex-col gap-0.5 p-1.5 rounded border border-white/5 ${chat.color}`}
        >
          <div className="flex justify-between items-center">
            <span className="text-[7px] font-bold text-brand-yellow uppercase">{chat.user}</span>
            <span className="text-[6px] text-white/30">Just now</span>
          </div>
          <p className="text-[8px] text-white/80 leading-tight">{chat.msg}</p>
        </motion.div>
      ))}
      {active && (
        <motion.div 
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="mt-auto text-[7px] text-brand-yellow font-mono italic"
        >
          Typing...
        </motion.div>
      )}
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
      <div className="w-full h-full bg-white/5 rounded-xl border border-white/10 flex flex-col justify-center p-2 gap-1.5">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-2">
            <motion.div
              animate={active ? { 
                backgroundColor: i <= 2 ? '#FFD700' : 'rgba(255,255,255,0.1)',
                scale: i === 2 ? [1, 1.1, 1] : 1
              } : {}}
              className="w-4 h-4 rounded-full flex items-center justify-center text-[8px] text-brand-navy font-bold"
            >
              {step.icon}
            </motion.div>
            <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={active && i <= 2 ? { width: "100%" } : { width: "0%" }}
                transition={{ duration: 1, delay: i * 0.3 }}
                className="h-full bg-brand-yellow/60"
              />
            </div>
            <span className={`text-[8px] uppercase tracking-tighter ${active && i === 2 ? 'text-brand-yellow font-bold' : 'text-white/40'}`}>
              {step.label}
            </span>
          </div>
        ))}
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-1 text-center"
          >
            <span className="text-[8px] text-brand-yellow animate-pulse font-mono">● LIVE UPDATING</span>
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
  const nodeRadius = 50;
  const center = 64; // half of w-32 (128px)

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
        <div className="relative w-32 h-32">
          {/* Connection Lines — single SVG layer for perfect alignment */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" viewBox="0 0 128 128">
            {active && nodePositions.map((node, i) => (
              <motion.line
                key={i}
                x1={center} y1={center}
                x2={node.cx} y2={node.cy}
                stroke="rgba(255,215,0,0.4)"
                strokeWidth="1"
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
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 z-20 flex items-center justify-center"
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
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-7 h-7"
            >
              <div className="w-7 h-7 bg-white/5 rounded-full flex items-center justify-center">
                <span className="text-[11px]">{node.icon}</span>
              </div>
              <span className="absolute top-full left-1/2 -translate-x-1/2 mt-0.5 text-[6px] text-white/60 font-bold tracking-wider uppercase whitespace-nowrap">{node.label}</span>
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
      <div className="w-full h-full bg-white/5 rounded-xl border border-white/10 flex flex-col items-center justify-center p-2 gap-3 overflow-hidden">
        {/* Document Path Visualization */}
        <div className="relative w-full flex justify-between items-center px-2">
          {levels.map((level, i) => (
            <div key={i} className="flex flex-col items-center gap-1 z-10">
              <motion.div
                animate={active ? { 
                  backgroundColor: i === 0 ? 'rgba(255,215,0,0.2)' : 'rgba(255,255,255,0.05)',
                  borderColor: i === 0 ? '#FFD700' : 'rgba(255,255,255,0.1)'
                } : {}}
                className="w-10 h-10 rounded-lg border flex items-center justify-center bg-white/5"
              >
                <span className="text-sm">{level.icon}</span>
              </motion.div>
              <span className="text-[6px] text-white/40 font-bold text-center uppercase leading-none w-10">
                {level.label}
              </span>
            </div>
          ))}
          
          <div className="absolute top-5 left-10 right-10 h-px bg-white/10 -z-0" />
          
          {active && (
            <motion.div
              animate={{ 
                left: ["15%", "50%", "85%", "15%"],
                opacity: [0, 1, 1, 0]
              }}
              transition={{ duration: 4, repeat: Infinity, times: [0, 0.3, 0.7, 1] }}
              className="absolute top-2 w-6 h-6 bg-brand-yellow rounded shadow-[0_0_15px_rgba(255,215,0,0.5)] flex items-center justify-center z-20"
            >
              <span className="text-[10px] text-brand-navy font-bold">📄</span>
            </motion.div>
          )}
        </div>

        <div className="w-full flex flex-col gap-1.5 px-1">
          {levels.map((level, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0.2 }}
              animate={active ? { 
                opacity: 1,
                x: [0, 5, 0]
              } : {}}
              transition={{ delay: i * 1, repeat: Infinity, repeatDelay: 3 }}
              className="flex items-center gap-2"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-brand-yellow" />
              <div className="flex-1 h-1 bg-white/5 rounded-full">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={active ? { width: "100%" } : {}}
                  transition={{ delay: i * 1, duration: 1, repeat: Infinity, repeatDelay: 3 }}
                  className="h-full bg-brand-yellow/60 rounded-full"
                />
              </div>
              <span className="text-[7px] text-brand-yellow/60 font-mono">VERIFIED</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
});

const featureData = [
  {
    id: "workflow",
    title: "Unified Workflow",
    desc: "Seamless synchronization from design techpacks to production floors.",
    image: featureWorkflow,
    Animation: FashionWorkflowAnimation
  },
  {
    id: "communication",
    title: "Communication",
    desc: "Eliminate email chains. Every update and file in a single thread.",
    image: featureCommunication,
    Animation: FashionCommAnimation
  },
  {
    id: "visibility",
    title: "Real-time Visibility",
    desc: "Instant live updates on status changes across your supply chain.",
    image: featureVisibility,
    Animation: FashionVisibilityAnimation
  },
  {
    id: "collaboration",
    title: "Dynamic Collaboration",
    desc: "Connect your entire design team and global vendor ecosystem.",
    image: featureCollaboration,
    Animation: FashionCollabAnimation
  },
  {
    id: "control",
    title: "Precision Control",
    desc: "Maintain strict quality standards with automated checks and live oversight.",
    image: featureControl,
    Animation: FashionControlAnimation
  }
];

const FeatureCard = ({ feature, index, isActive, onHover, radius }) => {
  const angle = (index * (360 / featureData.length) - 90) * (Math.PI / 180);
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;

  return (
    <motion.div
      onMouseEnter={() => onHover(feature)}
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: 1, 
        x: x,
        y: y,
        zIndex: isActive ? 100 : 10
      }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
    >
      <div className={`
        relative w-24 h-[72px] md:w-44 md:h-32 rounded-xl overflow-hidden border bg-[#163563]/40 z-10
        ${isActive 
          ? 'border-brand-yellow/50 shadow-[0_8px_24px_rgba(255,215,0,0.15)]' 
          : 'border-white/10 opacity-80'
        }
      `}>
        {/* The Image Container */}
        <div className="absolute inset-0 flex items-center justify-center p-2">
          <img 
            src={feature.image} 
            alt={feature.title} 
            loading="lazy"
            className="w-full h-full object-contain will-change-transform"
          />
        </div>

        {/* Premium Shimmer */}
        <motion.div 
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 pointer-events-none"
        />
      </div>
    </motion.div>
  );
};

const CentralHub = ({ activeFeature }) => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] md:w-[380px] max-h-[280px] md:max-h-[340px] flex flex-col items-center justify-center text-center overflow-hidden">
      <AnimatePresence mode="wait">
        {activeFeature ? (
          <motion.div
            key={activeFeature.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center"
          >
            <div className="w-28 h-28 md:w-36 md:h-36 mb-4 flex-shrink-0">
              <activeFeature.Animation active={true} />
            </div>
            
            <div className="max-w-[320px]">
              <h3 className="text-lg md:text-xl font-bold text-white mb-2 font-serif tracking-tight">
                {activeFeature.title}
              </h3>
              <p className="text-[10px] md:text-xs text-white/50 font-light leading-snug">
                {activeFeature.desc}
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="default"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center opacity-20"
          >
            <h3 className="text-3xl font-bold text-white font-serif uppercase tracking-[0.3em]">
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

  const [radius, setRadius] = useState(400);

  useEffect(() => {
    const handleResize = () => {
      const h = window.innerHeight;
      const w = window.innerWidth;
      if (w < 768) {
        setRadius(180);
      } else {
        const baseW = w * 0.30;
        const baseH = h * 0.38;
        setRadius(Math.min(baseW, baseH));
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section 
      className="relative min-h-0 h-screen pt-10 md:pt-14 pb-4 md:pb-8 bg-transparent flex flex-col justify-center overflow-hidden" 
      ref={containerRef}
    >
      <div className="max-w-[1400px] mx-auto px-6 w-full">
        <div className="mb-4 md:mb-6 text-center z-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tighter font-serif text-white mb-2"
          >
            What Makes This Powerful
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-brand-yellow/60 text-xs md:text-sm uppercase tracking-[0.3em] font-bold"
          >
            Hover through the cards to see the features in detail
          </motion.p>
          <div className="h-0.5 w-16 bg-brand-yellow mx-auto mt-6 rounded-full opacity-30" />
        </div>

        <div className="relative mt-12 md:mt-20 h-[380px] md:h-[480px] w-full flex items-center justify-center">
          {isInView && featureData.map((feature, index) => (
            <FeatureCard 
              key={feature.id}
              feature={feature}
              index={index}
              isActive={activeFeature?.id === feature.id}
              onHover={setActiveFeature}
              radius={radius}
            />
          ))}

          <CentralHub activeFeature={activeFeature} />
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[550px] h-[400px] md:h-[550px] bg-brand-yellow/[0.02] blur-[120px] rounded-full z-0" />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
