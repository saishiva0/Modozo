import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ───────────────────────────────────────────── 
   PREMIUM GLASSMORPHIC ASSETS (Tone: Hero Section)
───────────────────────────────────────────── */

const DisconnectedFullscreen = () => {
  const blocks = [
    { label: 'Excel', x: '18%', y: '22%', w: 180, h: 140, dx: -20, dy: -15, rot: -8 },
    { label: 'Email', x: '62%', y: '15%', w: 160, h: 120, dx: 15, dy: 12, rot: 5 },
    { label: 'Files', x: '15%', y: '58%', w: 150, h: 110, dx: -12, dy: 18, rot: -4 },
    { label: 'WhatsApp', x: '65%', y: '55%', w: 170, h: 130, dx: 18, dy: -10, rot: 7 },
  ];

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      {blocks.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-[2.5rem] bg-[#163563]/30 backdrop-blur-3xl border border-white/10 shadow-2xl flex flex-col items-center justify-center gap-4 px-6 overflow-hidden"
          style={{ left: b.x, top: b.y, width: b.w, height: b.h }}
          animate={{
            x: [0, b.dx, 0],
            y: [0, b.dy, 0],
            rotate: [0, b.rot, 0],
          }}
          transition={{ duration: 10 + i * 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center relative">
            <div className="w-6 h-6 border-2 border-brand-yellow/40 rounded-lg shadow-[0_0_20px_rgba(255,216,77,0.3)]" />
            <div className="absolute inset-0 bg-gradient-to-br from-brand-yellow/5 to-transparent" />
          </div>
          <div className="flex flex-col gap-2 w-full px-4">
            <div className="h-2 bg-white/10 rounded-full w-full" />
            <div className="h-2 bg-white/5 rounded-full w-3/4" />
          </div>
          <span className="text-white/40 text-[10px] font-black tracking-[0.2em] uppercase mt-2">{b.label}</span>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-y-full animate-shimmer" />
        </motion.div>
      ))}

      <svg className="absolute inset-0 w-full h-full opacity-20" fill="none">
        {[
          { x1: '30%', y1: '30%', x2: '60%', y2: '22%' },
          { x1: '25%', y1: '65%', x2: '62%', y2: '62%' },
        ].map((l, i) => (
          <motion.line
            key={i}
            x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke="#FFD84D"
            strokeWidth="1.5"
            strokeDasharray="12 16"
            animate={{ strokeDashoffset: [0, -60], opacity: [0.1, 0.4, 0.1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </svg>
    </motion.div>
  );
};

const ScatteredFullscreen = () => {
  const items = [
    { label: 'Feedback Loop', x: '12%', y: '18%', w: 320, dx: -25, dy: 15 },
    { label: 'Vendor Sync', x: '68%', y: '15%', w: 280, dx: 20, dy: -12 },
    { label: 'Sample Tracker', x: '18%', y: '58%', w: 240, dx: -15, dy: -20 },
    { label: 'Approval Status', x: '62%', y: '55%', w: 300, dx: 35, dy: 15 },
  ];

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      {items.map((item, i) => (
        <motion.div
          key={i}
          className="absolute rounded-[2rem] bg-[#1D4073]/20 backdrop-blur-2xl border border-white/5 shadow-2xl p-6"
          style={{ left: item.x, top: item.y, width: item.w }}
          animate={{
            x: [0, item.dx, 0],
            y: [0, item.dy, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 12 + i * 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-yellow/10 border border-brand-yellow/30 flex items-center justify-center shadow-inner">
                <div className="w-3 h-3 rounded-full bg-brand-yellow/60 animate-pulse" />
              </div>
              <div className="h-2.5 bg-white/20 rounded-full w-32" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-2 bg-white/10 rounded-full w-full" />
              <div className="h-2 bg-white/5 rounded-full w-2/3" />
            </div>
            <span className="text-[9px] font-black text-brand-yellow/60 uppercase tracking-[0.3em]">{item.label}</span>
          </div>
        </motion.div>
      ))}
      
      {[0, 1, 2, 3].map(i => (
        <motion.div
          key={i}
          className="absolute w-64 h-64 bg-brand-yellow/[0.03] rounded-full blur-[100px]"
          style={{ left: `${10 + i * 25}%`, top: `${20 + i * 15}%` }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 10 + i * 3, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </motion.div>
  );
};

const VisibilityFullscreen = () => {
  const steps = ['Concept', 'Design', 'Sample', 'Production'];
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
      <div className="w-full max-w-6xl flex justify-between px-20 relative">
        <div className="absolute top-1/2 left-20 right-20 h-px bg-white/5" />
        {steps.map((s, i) => (
          <motion.div
            key={i}
            animate={{ 
              opacity: [0.2, 0.8, 0.2],
              scale: [0.95, 1.05, 0.95]
            }}
            transition={{ duration: 4, repeat: Infinity, delay: i * 1 }}
            className="flex flex-col items-center gap-6 z-10"
          >
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col items-center justify-center gap-3">
              <div className="w-10 h-10 border border-brand-yellow/30 rounded-xl bg-brand-yellow/5" />
              <div className="w-12 h-1 bg-white/10 rounded-full" />
            </div>
            <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">{s}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const FULLSCREEN_ANIMATIONS = {
  tools: DisconnectedFullscreen,
  comm: ScatteredFullscreen,
  visibility: VisibilityFullscreen,
};

/* ───────────────────────────────────────────── 
   PROBLEM DATA 
───────────────────────────────────────────── */

const problems = [
  {
    id: 'tools',
    title: 'Disconnected Tools',
    brief: 'No central source of truth.',
    description: 'Teams juggle Excel, WhatsApp, and scattered folders. Every tool holds a piece of the puzzle — but none of them talk to each other. Critical updates get buried, and no one knows which file is truly final.',
    color: '#FFD84D',
  },
  {
    id: 'comm',
    title: 'Scattered Communication',
    brief: 'Conversations happen everywhere.',
    description: 'Design feedback lives in emails. Vendor updates come through chat. Context gets lost between every handoff, and teams spend more time chasing updates than making progress.',
    color: '#FFD84D',
  },
  {
    id: 'visibility',
    title: 'Lack of Visibility',
    brief: 'Zero real-time clarity.',
    description: 'Without a unified view, you can\'t see which styles are delayed or which approvals are pending. Decisions stall because the info exists — just not where it\'s needed.',
    color: '#FFD84D',
  },
];

/* ───────────────────────────────────────────── 
   MAIN COMPONENT
───────────────────────────────────────────── */

const BreakdownSection = () => {
  const [active, setActive] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const hoverTimeoutRef = useRef(null);
  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    const handleScroll = () => {
      setIsScrolling(true);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => setIsScrolling(false), 150);
    };

    check();
    window.addEventListener('resize', check);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('resize', check);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleActivate = (id) => {
    // Clear any pending activation or deactivation
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    
    if (isMobile) {
      setActive(prev => prev === id ? null : id);
    } else {
      if (isScrolling) return;

      // Responsive but intentional delay
      hoverTimeoutRef.current = setTimeout(() => {
        setActive(id);
      }, 150); 
    }
  };

  const handleDeactivate = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    if (!isMobile) {
      // Small delay before closing to allow moving between cards
      hoverTimeoutRef.current = setTimeout(() => setActive(null), 150);
    }
  };

  const activeProblem = problems.find(p => p.id === active);

  return (
    <>
      <section className="py-24 md:py-32 px-6 bg-[#0E2545] relative overflow-hidden" id="structure">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-yellow/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-brand-yellow/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white font-serif leading-tight mb-6 tracking-tighter">
              It&apos;s Not Just Delay.<br />It&apos;s Lack of Structure.
            </h2>
            <p className="text-brand-text-secondary text-lg md:text-xl max-w-2xl mx-auto font-medium">
              Hover on a challenge to explore why your current workflow is breaking.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {problems.map((problem, i) => (
              <motion.div
                key={problem.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onMouseEnter={() => !isMobile && handleActivate(problem.id)}
                onMouseLeave={handleDeactivate}
                onClick={() => isMobile && handleActivate(problem.id)}
                className={`
                  relative p-10 md:p-12 rounded-[3rem] border bg-[#163563]/40 backdrop-blur-xl cursor-pointer select-none
                  transition-all duration-500 group overflow-hidden
                  ${active === problem.id 
                    ? 'border-brand-yellow/50 shadow-[0_20px_50px_rgba(0,0,0,0.5)] scale-[1.02]' 
                    : 'border-white/10 shadow-sm hover:border-brand-yellow/30 hover:bg-[#1D4073]/60'
                  }
                `}
              >
                <div className="relative z-10">
                  <h3 className="text-2xl font-black text-white mb-4 tracking-tight group-hover:text-brand-yellow transition-colors">{problem.title}</h3>
                  <p className="text-brand-text-muted font-bold text-sm md:text-base leading-relaxed group-hover:text-white/80 transition-colors">{problem.brief}</p>
                </div>
                
                {/* Visual Indicator */}
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 h-2 bg-brand-yellow origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: active === problem.id ? 1 : 0 }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-brand-yellow/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {activeProblem && (
          <motion.div
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0E2545]/98 backdrop-blur-3xl"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1, pointerEvents: 'auto' }}
            exit={{ opacity: 0, scale: 1.05, pointerEvents: 'none' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} // Majestic "Slow-Fast-Slow" curve
            onMouseEnter={() => hoverTimeoutRef.current && clearTimeout(hoverTimeoutRef.current)}
            onMouseLeave={handleDeactivate}
          >
            {/* Explicit Close Button */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                setActive(null);
              }}
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-8 right-8 md:top-12 md:right-12 z-[100] w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl flex items-center justify-center text-white/40 hover:text-brand-yellow hover:border-brand-yellow/30 transition-colors shadow-2xl"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </motion.button>

            <div className="absolute inset-0 z-0">
              {React.createElement(FULLSCREEN_ANIMATIONS[activeProblem.id])}
            </div>
            
            <div className="relative z-10 text-center px-8 max-w-4xl">
              <motion.h2 
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl md:text-7xl font-bold text-white font-serif leading-tight mb-8 tracking-tighter"
              >
                {activeProblem.title}
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-xl md:text-2xl text-brand-text-secondary font-medium leading-relaxed"
              >
                {activeProblem.description}
              </motion.p>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1.2 }}
                className="mt-12 text-white/20 text-[10px] font-black uppercase tracking-[0.5em]"
              >
                Click button or move mouse to exit
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BreakdownSection;
