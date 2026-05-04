import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/** 
 * ANIMATED COUNTER COMPONENT
 * Counts up to a target number when active.
 */
const AnimatedCounter = ({ value, suffix = "", duration = 2, delay = 0, active }) => {
  const [count, setCount] = useState(0);
  const target = parseFloat(value);
  const isInteger = Number.isInteger(target);

  useEffect(() => {
    if (active) {
      let startTime;
      const animate = (now) => {
        if (!startTime) startTime = now;
        const progress = Math.min((now - startTime) / (duration * 1000), 1);
        const currentCount = progress * target;

        setCount(isInteger ? Math.floor(currentCount) : currentCount.toFixed(1));

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(target);
        }
      };

      const timeoutId = setTimeout(() => {
        requestAnimationFrame(animate);
      }, delay * 1000);

      return () => clearTimeout(timeoutId);
    } else {
      setCount(0);
    }
  }, [active, target, duration, delay, isInteger]);

  return <span>{count}{suffix}</span>;
};

/**
 * MICRO-ANIMATION: Faster Approvals
 */
const ApprovalsAnimation = ({ active }) => (
  <div className="relative w-full h-12 flex items-center justify-center overflow-hidden">
    {[0, 1, 2].map(i => (
      <motion.div
        key={i}
        initial={{ x: -60, opacity: 0 }}
        animate={active ? {
          x: [null, -20 + i * 20, 100],
          opacity: [0, 1, 1, 0]
        } : { opacity: 0 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: i * 0.4,
          times: [0, 0.2, 0.8, 1]
        }}
        className="absolute w-6 h-8 bg-white/5 border border-yellow-400/30 rounded-md flex items-center justify-center"
      >
        <div className="w-3 h-0.5 bg-white/20 rounded-full" />
      </motion.div>
    ))}
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={active ? { scale: [0, 1.2, 1], opacity: 1 } : { scale: 0, opacity: 0 }}
      transition={{ delay: 1.2, duration: 0.5 }}
      className="absolute bg-brand-yellow w-5 h-5 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(255,215,0,0.5)]"
    >
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </motion.div>
  </div>
);

/**
 * MICRO-ANIMATION: Reduced Delays
 */
const DelaysAnimation = ({ active }) => (
  <div className="w-full h-12 flex items-center justify-center px-4">
    <div className="w-full h-1 bg-white/10 rounded-full relative overflow-hidden">
      <motion.div
        initial={{ left: "-100%" }}
        animate={active ? { left: ["-100%", "100%"] } : { left: "-100%" }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "circIn" }}
        className="absolute h-full w-full bg-gradient-to-r from-transparent via-brand-yellow to-transparent"
      />
      <motion.div
        initial={{ width: 0 }}
        animate={active ? { width: "100%" } : { width: 0 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "circIn" }}
        className="absolute h-full bg-brand-yellow/50"
      />
    </div>
  </div>
);

/**
 * MICRO-ANIMATION: Improved Visibility
 */
const VisibilityAnimation = ({ active }) => (
  <div className="relative w-full h-12 flex items-center justify-center gap-1.5">
    {[0, 1, 2].map(i => (
      <div key={i} className="relative">
        <motion.div
          animate={active ? { opacity: 0 } : { opacity: 0.2 }}
          className="w-8 h-8 border border-white/10 rounded-lg"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
          transition={{ delay: i * 0.3, duration: 0.5 }}
          className="absolute inset-0 bg-brand-yellow/20 border border-brand-yellow/80 rounded-lg flex items-center justify-center"
        >
          <div className="w-3 h-3 text-brand-yellow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
        </motion.div>
      </div>
    ))}
  </div>
);

/**
 * MICRO-ANIMATION: Efficiency Boost
 */
const EfficiencyAnimation = ({ active }) => (
  <div className="relative w-full h-12 flex items-center justify-center">
    {[
      { y: -12, delay: 0 },
      { y: 0, delay: 0.2 },
      { y: 12, delay: 0.4 }
    ].map((pos, i) => (
      <motion.div
        key={i}
        initial={{ x: -30, y: pos.y, opacity: 0 }}
        animate={active ? {
          x: [null, 0, 60],
          y: [pos.y, 0, 0],
          opacity: [0, 1, 0]
        } : { opacity: 0 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: pos.delay,
          ease: "easeInOut"
        }}
        className="absolute w-2 h-2 bg-brand-yellow rounded-full shadow-[0_0_10px_rgba(255,215,0,0.6)]"
      />
    ))}
    <motion.div
      animate={active ? { scaleX: [0, 1], opacity: [0, 0.5, 0] } : { opacity: 0 }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      className="w-24 h-0.5 bg-brand-yellow origin-left"
    />
  </div>
);

/* ══════════════════════════════════════════════
   CHAOS TO ORDER BACKGROUND SVG
══════════════════════════════════════════════ */
const AnimatedPath = ({ phase, chaosDs, orderedD, delay = 0 }) => {
  return (
    <motion.path
      vectorEffect="non-scaling-stroke"
      variants={{
        chaos: {
          d: chaosDs,
          stroke: "rgba(0, 0, 0, 0.08)",
          strokeWidth: 2,
          transition: { duration: 6, repeat: Infinity, ease: "easeInOut", delay }
        },
        ordered: {
          d: orderedD,
          stroke: "rgba(250, 204, 21, 0.6)", // Tailwind yellow-400
          strokeWidth: 4,
          transition: { duration: 1.5, ease: "easeInOut" }
        }
      }}
      initial="chaos"
      animate={phase}
      fill="transparent"
      strokeLinecap="round"
    />
  );
};

const SvgLines = ({ phase }) => {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 hidden md:block" viewBox="0 0 100 100" preserveAspectRatio="none">
      <AnimatedPath
        phase={phase}
        chaosDs={[
          "M 12.5 30 Q 25 90 37.5 20",
          "M 12.5 70 Q 25 -10 37.5 80",
          "M 12.5 30 Q 25 90 37.5 20"
        ]}
        orderedD="M 12.5 50 Q 25 50 37.5 50"
        delay={0}
      />
      <AnimatedPath
        phase={phase}
        chaosDs={[
          "M 37.5 20 Q 50 -20 62.5 90",
          "M 37.5 80 Q 50 120 62.5 10",
          "M 37.5 20 Q 50 -20 62.5 90"
        ]}
        orderedD="M 37.5 50 Q 50 50 62.5 50"
        delay={0.5}
      />
      <AnimatedPath
        phase={phase}
        chaosDs={[
          "M 62.5 90 Q 75 10 87.5 30",
          "M 62.5 10 Q 75 90 87.5 70",
          "M 62.5 90 Q 75 10 87.5 30"
        ]}
        orderedD="M 62.5 50 Q 75 50 87.5 50"
        delay={1}
      />
    </svg>
  );
};

/* ══════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════ */
const ImpactSection = () => {
  const impacts = [
    { title: "Faster Sign-offs", value: "3", suffix: "x", label: "Approval Speed", Animation: ApprovalsAnimation },
    { title: "Fewer Production Delays", value: "40", suffix: "%", label: "Delay Reduction", Animation: DelaysAnimation },
    { title: "Live Status Coverage", value: "100", suffix: "%", label: "Visibility", Animation: VisibilityAnimation },
    { title: "Team Throughput", value: "2.5", suffix: "x", label: "Output Per Cycle", Animation: EfficiencyAnimation }
  ];

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  const [phase, setPhase] = useState("chaos"); // "chaos" | "ordered"

  useEffect(() => {
    if (isInView) {
      const t = setTimeout(() => setPhase("ordered"), 800);
      return () => clearTimeout(t);
    } else {
      setPhase("chaos");
    }
  }, [isInView]);

  const cardVariants = {
    chaos: (i) => {
      // Different random-feeling offsets for horizontal layout
      const offsets = [
        { x: -30, y: -40, r: -6 },
        { x: 10, y: 50, r: 8 },
        { x: 20, y: -50, r: -4 },
        { x: -20, y: 40, r: 5 }
      ];
      const off = offsets[i];
      return {
        x: [off.x, off.x * 0.2, off.x],
        y: [off.y, off.y * 1.2, off.y],
        rotate: [off.r, off.r * -0.5, off.r],
        scale: 0.9,
        opacity: 0.5,
        transition: {
          duration: 5 + i,
          repeat: Infinity,
          ease: "easeInOut"
        }
      };
    },
    ordered: {
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: "backOut"
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      className="flex flex-col justify-center py-16 md:py-24 px-4 sm:px-6 bg-[#0E2545] text-white rounded-t-[2rem] md:rounded-t-[3.5rem] relative w-full overflow-hidden max-w-[100vw]"
    >
      {/* Background glow elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-yellow-400/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-yellow-400/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10 w-full flex flex-col">

        {/* ── HEADER WITH TOP-RIGHT INDICATOR ── */}
        <div className="relative w-full flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 px-2">
          <div className="max-w-2xl text-left">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight font-serif text-white">
              Your Supply Chain, Before and After
            </h2>
            <p className="text-[#8FA3C8] text-sm md:text-lg font-light">
              Replace scattered spreadsheets and email threads with a single live workspace — and watch approvals, visibility, and velocity transform overnight.
            </p>
          </div>

          {/* Status Badge */}
          <div className="mt-8 md:mt-0 flex items-center justify-center gap-3 bg-white/5 px-5 py-2.5 rounded-full border border-white/10 backdrop-blur-md shadow-sm self-start md:self-end">
            <span className={`text-xs font-bold uppercase tracking-widest transition-colors duration-1000 ${phase === 'chaos' ? 'text-white' : 'text-gray-500'}`}>
              Before
            </span>

            {/* Pill Indicator */}
            <div className="w-12 h-5 bg-white/10 rounded-full p-0.5 relative flex items-center">
              <motion.div
                className="w-4 h-4 bg-yellow-400 rounded-full shadow-sm absolute"
                initial={{ left: "2px" }}
                animate={{ left: phase === 'ordered' ? "calc(100% - 18px)" : "2px" }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
            </div>

            <span className={`text-xs font-bold uppercase tracking-widest transition-colors duration-1000 ${phase === 'ordered' ? 'text-yellow-400' : 'text-gray-500'}`}>
              With Modozo
            </span>
          </div>
        </div>

        {/* ── INTERACTIVE NETWORK AREA (Horizontal) ── */}
        <div className="relative w-full py-10 md:py-16">
          <SvgLines phase={phase} />

          <div className="flex flex-col md:flex-row items-stretch justify-center gap-4 lg:gap-6 relative z-10 w-full">
            {impacts.map((item, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={cardVariants}
                initial="chaos"
                animate={phase}
                className={`relative flex-1 p-5 lg:p-8 rounded-[1.5rem] bg-[#163563]/50 border transition-all duration-500 flex flex-col items-center text-center backdrop-blur-xl shadow-xl cursor-pointer group ${phase === 'ordered'
                    ? 'border-yellow-400/50 shadow-yellow-400/10 hover:border-yellow-400 hover:bg-[#1C417A]/80 hover:-translate-y-2 hover:shadow-yellow-400/20'
                    : 'border-white/5 shadow-black/20'
                  }`}
              >
                <div className="w-full mb-6 transition-transform duration-300 group-hover:scale-110">
                  <item.Animation active={phase === 'ordered'} />
                </div>

                <div className="mb-2">
                  <span className={`text-4xl lg:text-5xl font-black tracking-tighter transition-colors duration-300 ${phase === 'ordered' ? 'text-yellow-400 drop-shadow-sm group-hover:text-yellow-300' : 'text-gray-500'}`}>
                    <AnimatedCounter value={item.value} delay={i * 0.15} active={phase === 'ordered'} />
                  </span>
                  <span className={`text-xl lg:text-2xl font-bold ml-1 transition-colors duration-300 ${phase === 'ordered' ? 'text-white' : 'text-gray-500'}`}>{item.suffix}</span>
                </div>

                <p className={`text-xs lg:text-sm font-bold uppercase tracking-widest transition-colors duration-300 ${phase === 'ordered' ? 'text-white/80 group-hover:text-white' : 'text-gray-500'}`}>
                  {item.title}
                </p>

                {/* Progress bar decoration */}
                <div className="mt-6 w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ x: "-100%" }}
                    animate={phase === 'ordered' ? { x: "0%" } : { x: "-100%" }}
                    transition={{ duration: 1.5, delay: i * 0.2 + 0.5, ease: "easeOut" }}
                    className="h-full bg-yellow-400 w-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ImpactSection;