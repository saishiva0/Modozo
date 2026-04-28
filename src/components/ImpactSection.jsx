import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

/** 
 * ANIMATED COUNTER COMPONENT
 * Counts up to a target number when in view.
 */
const AnimatedCounter = ({ value, suffix = "", duration = 2, delay = 0 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const target = parseFloat(value);
  const isInteger = Number.isInteger(target);

  useEffect(() => {
    if (isInView) {
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
    }
  }, [isInView, target, duration, delay, isInteger]);

  return <span ref={ref}>{count}{suffix}</span>;
};

/**
 * MICRO-ANIMATION: Faster Approvals
 */
const ApprovalsAnimation = ({ active }) => (
  <div className="relative w-full h-16 flex items-center justify-center overflow-hidden">
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
        className="absolute w-8 h-10 bg-white/10 border border-white/20 rounded-md flex items-center justify-center"
      >
        <div className="w-4 h-1 bg-white/20 rounded-full" />
      </motion.div>
    ))}
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={active ? { scale: [0, 1.2, 1], opacity: 1 } : { scale: 0, opacity: 0 }}
      transition={{ delay: 1.2, duration: 0.5 }}
      className="absolute bg-brand-yellow w-6 h-6 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(255,215,0,0.5)]"
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </motion.div>
  </div>
);

/**
 * MICRO-ANIMATION: Reduced Delays
 */
const DelaysAnimation = ({ active }) => (
  <div className="w-full h-16 flex items-center justify-center px-6">
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
        className="absolute h-full bg-brand-yellow/30"
      />
    </div>
  </div>
);

/**
 * MICRO-ANIMATION: Improved Visibility
 */
const VisibilityAnimation = ({ active }) => (
  <div className="relative w-full h-16 flex items-center justify-center gap-2">
    {[0, 1, 2].map(i => (
      <div key={i} className="relative">
        <motion.div 
          animate={active ? { opacity: 0 } : { opacity: 0.2 }}
          className="w-10 h-10 border border-white/10 rounded-lg"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
          transition={{ delay: i * 0.3, duration: 0.5 }}
          className="absolute inset-0 bg-brand-yellow/20 border border-brand-yellow/50 rounded-lg flex items-center justify-center"
        >
          <div className="w-4 h-4 text-brand-yellow">
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
  <div className="relative w-full h-16 flex items-center justify-center">
    {[
      { y: -20, delay: 0 },
      { y: 0, delay: 0.2 },
      { y: 20, delay: 0.4 }
    ].map((pos, i) => (
      <motion.div
        key={i}
        initial={{ x: -40, y: pos.y, opacity: 0 }}
        animate={active ? { 
          x: [null, 0, 80], 
          y: [pos.y, 0, 0],
          opacity: [0, 1, 0] 
        } : { opacity: 0 }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          delay: pos.delay,
          ease: "easeInOut"
        }}
        className="absolute w-3 h-3 bg-brand-yellow rounded-full shadow-[0_0_10px_rgba(255,215,0,0.4)]"
      />
    ))}
    <motion.div 
      animate={active ? { scaleX: [0, 1], opacity: [0, 0.2, 0] } : { opacity: 0 }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      className="w-32 h-0.5 bg-brand-yellow origin-left"
    />
  </div>
);

/* ══════════════════════════════════════════════
   CANVAS ANIMATION (BEFORE/AFTER VISUAL)
══════════════════════════════════════════════ */
const CW = 600, CH = 200, CY = 100;
const LX0 = 10, LX1 = 580;
const dotXs = [0,1,2,3].map(i => LX0 + (i/3)*(LX1-LX0));

const threads = [
  [[10,45],[88,12],[170,98],[244,30],[322,108],[396,48],[466,22],[580,58]],
  [[10,75],[82,115],[162,52],[222,105],[284,30],[365,82],[450,38],[580,72]],
  [[10,105],[95,128],[175,72],[258,118],[325,55],[408,100],[472,80],[580,80]],
  [[10,88],[87,32],[155,100],[230,50],[310,115],[384,35],[458,95],[580,65]],
];

const spline = (ctx, pts) => {
  ctx.moveTo(pts[0][0], pts[0][1]);
  for (let i=0; i<pts.length-1; i++) {
    const p0=pts[Math.max(0,i-1)],p1=pts[i],p2=pts[i+1],p3=pts[Math.min(pts.length-1,i+2)];
    ctx.bezierCurveTo(
      p1[0]+(p2[0]-p0[0])/6, p1[1]+(p2[1]-p0[1])/6,
      p2[0]-(p3[0]-p1[0])/6, p2[1]-(p3[1]-p1[1])/6,
      p2[0], p2[1]);
  }
};

const C0 = 'rgba(255, 255, 255, 0.38)';
const eio  = t => t<0.5 ? 2*t*t : -1+(4-2*t)*t;

const BeforeAfterVisual = ({ started = false }) => {
  const canvasRef = useRef(null);
  const beforeLabelsRef = useRef(null);
  const afterLabelsRef = useRef(null);
  const beforeTxtRef = useRef(null);
  const afterTxtRef = useRef(null);
  const wipeLineRef = useRef(null);
  const S = useRef({ phase: 'before', phaseT: 0, frame: 0 });

  const noiseRef = useRef(threads.map(pts => pts.map(() => ({
    sx: 0.22 + Math.random()*0.52, sy: 0.28 + Math.random()*0.55,
    fx: 0.75 + Math.random()*0.80, fy: 0.55 + Math.random()*0.85,
    px: Math.random()*Math.PI*2,   py: Math.random()*Math.PI*2,
  }))));

  useEffect(() => {
    const canvas = canvasRef.current;
    const bLabels = beforeLabelsRef.current;
    const aLabels = afterLabelsRef.current;
    const bTxt = beforeTxtRef.current;
    const aTxt = afterTxtRef.current;
    const wLine = wipeLineRef.current;
    if (!canvas || !bLabels || !aLabels || !bTxt || !aTxt || !wLine) return;
    const ctx = canvas.getContext('2d');

    const drawInitial = () => {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      ctx.save();
      ctx.scale(W/CW, H/CH);
      threads.forEach((base, ti) => {
        ctx.beginPath();
        const pts = base.map(bp => [bp[0], bp[1]]);
        spline(ctx, pts);
        ctx.strokeStyle = C0;
        ctx.lineWidth = 1.4 + (ti % 2) * 0.5;
        ctx.globalAlpha = 1;
        ctx.stroke();
      });
      ctx.restore();
      bTxt.style.clipPath = 'inset(0 0 0 0%)';
      aTxt.style.clipPath = 'inset(0 100% 0 0)';
      wLine.style.opacity = '0';
    };

    if (!started) { drawInitial(); return; }

    const noise = noiseRef.current;
    const DUR = { before: 150, wiping: 60, after: 150, reset: 30 };
    let rafId;

    const tick = () => {
      const s = S.current;
      s.frame++;
      const t = s.frame * 0.016;

      s.phaseT += 1/DUR[s.phase];
      if (s.phaseT >= 1) {
        s.phaseT = 0;
        if (s.phase === 'before') s.phase = 'wiping';
        else if (s.phase === 'wiping') s.phase = 'after';
        else if (s.phase === 'after') s.phase = 'reset';
        else s.phase = 'before';
      }

      let wipePct = 0;
      if (s.phase === 'before') wipePct = 0;
      else if (s.phase === 'wiping') wipePct = eio(s.phaseT) * 100;
      else if (s.phase === 'after') wipePct = 100;
      else wipePct = (1 - eio(s.phaseT)) * 100;

      const wipeX = (wipePct / 100) * CW;
      const W=canvas.width, H=canvas.height;
      ctx.clearRect(0,0,W,H);
      ctx.save();
      ctx.scale(W/CW, H/CH);

      if (wipePct > 0) {
        ctx.save();
        ctx.beginPath(); ctx.rect(0, 0, wipeX, CH); ctx.clip();
        ctx.beginPath(); ctx.moveTo(LX0, CY); ctx.lineTo(LX1, CY);
        ctx.strokeStyle = '#FFD54F'; ctx.lineWidth = 2.5;
        ctx.globalAlpha = 1; ctx.stroke();
        dotXs.forEach((dx) => {
          ctx.beginPath(); ctx.arc(dx, CY, 5.5, 0, Math.PI * 2);
          ctx.fillStyle = '#FFD54F'; ctx.fill();
        });
        ctx.restore();
      }

      if (wipePct < 100) {
        ctx.save();
        ctx.beginPath(); ctx.rect(wipeX, 0, CW, CH); ctx.clip();
        const amp = 1;
        threads.forEach((base, ti) => {
          ctx.beginPath();
          const pts = base.map((bp, pi) => {
            const n = noise[ti][pi];
            const nx = (Math.sin(t*n.sx+n.px)*5.5 + Math.cos(t*n.fx*n.sx+n.px*1.3)*2.5) * amp * 0.45;
            const ny = (Math.sin(t*n.sy+n.py)*7 + Math.cos(t*n.fy*n.sy+n.py*0.9)*3.5) * amp;
            return [bp[0] + nx, bp[1] + ny];
          });
          spline(ctx, pts);
          ctx.strokeStyle = C0;
          ctx.lineWidth = 1.4 + (ti % 2) * 0.5;
          ctx.globalAlpha = 1;
          ctx.stroke();
        });
        ctx.restore();
      }

      ctx.restore();

      const afterSideClip  = `inset(0 ${100 - wipePct}% 0 0)`;
      const beforeSideClip = `inset(0 0 0 ${wipePct}%)`;
      bLabels.style.clipPath = beforeSideClip;
      aLabels.style.clipPath = afterSideClip;
      bTxt.style.clipPath = beforeSideClip;
      aTxt.style.clipPath = afterSideClip;
      if (wLine) {
        wLine.style.left = `${wipePct}%`;
        wLine.style.opacity = (s.phase === 'wiping' || s.phase === 'reset') ? '1' : '0';
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [started]);

  const textRow = (items, color, dotColor) => (
    <div className="flex items-center justify-center gap-6 md:gap-10">
      {items.map((label, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dotColor}`} />
          <span className={`text-xs md:text-sm font-medium tracking-wide whitespace-nowrap ${color}`}>
            {label}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="relative w-full max-w-3xl mx-auto mb-10 md:mb-16 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden bg-white/5 border border-white/10 bg-brand-navy shadow-inner flex flex-col">
      <div 
        ref={wipeLineRef} 
        className="absolute inset-y-0 pointer-events-none z-30" 
        style={{ width: '2px', left: '0%', opacity: 0, background: 'linear-gradient(to bottom, transparent, #FFD54F, transparent)', boxShadow: '0 0 15px rgba(255,213,79,0.5)' }} 
      />
      <div className="relative px-6 pt-5 pb-2 flex-shrink-0 h-12">
        <div ref={beforeLabelsRef} className="absolute inset-0 px-6 pt-5 flex justify-between">
          <span className="text-xs uppercase tracking-widest font-bold text-gray-400">Before</span>
          <div />
        </div>
        <div ref={afterLabelsRef} className="absolute inset-0 px-6 pt-5 flex justify-between z-10" style={{ clipPath: 'inset(0 100% 0 0)' }}>
          <div />
          <span className="text-xs uppercase tracking-widest font-bold text-brand-yellow">With Modozo</span>
        </div>
      </div>
      <div className="px-4 flex-grow relative">
        <canvas ref={canvasRef} width={600} height={200} className="w-full block" style={{ height: 'clamp(120px, 25vw, 200px)' }} />
      </div>
      <div className="relative px-6 py-5 flex-shrink-0 overflow-hidden" style={{ height: '72px' }}>
        <div ref={beforeTxtRef} className="absolute inset-0 flex items-center justify-center">
          {textRow(['Scattered Tools', 'Stalled Approvals', 'Blind Spots'], 'text-white/38', 'bg-white/25')}
        </div>
        <div ref={afterTxtRef} className="absolute inset-0 flex items-center justify-center z-10" style={{ clipPath: 'inset(0 100% 0 0)' }}>
          {textRow(['One Workspace', 'Full Visibility', 'Live Sync'], 'text-brand-yellow', 'bg-brand-yellow')}
        </div>
      </div>
    </div>
  );
};


/* ═════════════════════════════════════════════
   BEFORE / AFTER COLUMNS
═════════════════════════════════════════════ */

const beforeBullets = [
  "Techpacks buried in email threads — every revision starts a scavenger hunt.",
  "Approvals stall for days while stakeholders chase updates across tools.",
  "Sample status is a mystery until someone remembers to ask.",
  "Vendors work from outdated specs, leading to costly rework.",
];

const afterBullets = [
  "One live workspace from techpack upload to final shipment.",
  "Approvals route automatically — no chasing, no bottlenecks.",
  "100% real-time status on every sample, PO, and production run.",
  "Vendors and internal teams share one single source of truth.",
  "Every handoff is tracked, every milestone is visible.",
];


const ImpactSection = () => {
  const impacts = [
    { title: "Faster Sign-offs", value: "3", suffix: "x", label: "Approval Speed", Animation: ApprovalsAnimation },
    { title: "Fewer Production Delays", value: "40", suffix: "%", label: "Delay Reduction", Animation: DelaysAnimation },
    { title: "Live Status Coverage", value: "100", suffix: "%", label: "Visibility", Animation: VisibilityAnimation },
    { title: "Team Throughput", value: "2.5", suffix: "x", label: "Output Per Cycle", Animation: EfficiencyAnimation }
  ];

  const sectionRef = useRef(null);
  const cardControls = useAnimation();
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [animStarted, setAnimStarted] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    cardControls.start({
      opacity: 1,
      scale: 1,
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
    });
    const t = setTimeout(() => setAnimStarted(true), 1400);
    return () => clearTimeout(t);
  }, [isInView, cardControls]);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-brand-navy text-white rounded-t-[2rem] md:rounded-t-[3.5rem] relative overflow-hidden w-full max-w-[100vw]"
    >
      {/* Background glow elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-yellow/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-yellow/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        animate={cardControls}
        initial={{ opacity: 0, scale: 0.9 }}
        style={{ transformOrigin: 'center center' }}
        className="max-w-5xl mx-auto relative z-10 w-full"
      >
        {/* ── SECTION HEADER ── */}
        <div className="text-center mb-10 md:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 md:mb-6 tracking-tight font-serif text-white px-2">
            Your Supply Chain, Before and After
          </h2>
          <p className="text-gray-400 text-sm md:text-xl font-light max-w-2xl mx-auto px-2">
            Replace scattered spreadsheets and email threads with a single live workspace — and watch approvals, visibility, and velocity transform overnight.
          </p>
        </div>

        {/* ── CANVAS VISUAL ── */}
        <BeforeAfterVisual started={animStarted} />

        {/* ── BEFORE / AFTER COLUMNS ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={animStarted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10 mb-10 md:mb-16 lg:mb-20 max-w-4xl mx-auto px-1"
        >
          {/* Before Column */}
          <div className="p-6 md:p-8 rounded-[1.5rem] bg-white/5 border border-white/10">
            <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-gray-400 mb-5">Before Modozo</h3>
            <ul className="space-y-4">
              {beforeBullets.map((b, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={animStarted ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  className="flex items-start gap-3 text-white/50 text-sm leading-relaxed"
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/25 flex-shrink-0" />
                  {b}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* After Column */}
          <div className="p-6 md:p-8 rounded-[1.5rem] bg-brand-yellow/5 border border-brand-yellow/20">
            <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-brand-yellow mb-5">With Modozo</h3>
            <ul className="space-y-4">
              {afterBullets.map((b, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  animate={animStarted ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.15 + i * 0.1 }}
                  className="flex items-start gap-3 text-white/80 text-sm leading-relaxed"
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-yellow flex-shrink-0" />
                  {b}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* ── METRICS ROW ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 px-1">
          {impacts.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={animStarted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative p-4 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-brand-yellow/30 transition-colors group flex flex-col items-center text-center backdrop-blur-sm"
            >
              <div className="w-full mb-4">
                <item.Animation active={true} />
              </div>
              
              <div className="mb-2">
                <span className="text-3xl md:text-5xl font-black text-brand-yellow tracking-tighter">
                  <AnimatedCounter value={item.value} delay={i * 0.2} />
                </span>
                <span className="text-lg font-bold ml-1 text-white/90">{item.suffix}</span>
              </div>
              
              <p className="text-xs md:text-sm font-semibold text-white/60 uppercase tracking-widest">
                {item.title}
              </p>

              {/* Progress bar decoration */}
              <div className="mt-6 w-full h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={animStarted ? { x: "0%" } : {}}
                  transition={{ duration: 1.5, delay: i * 0.2 + 0.5, ease: "easeOut" }}
                  className="h-full bg-brand-yellow w-full"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── TESTIMONIAL ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={animStarted ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="mt-20 md:mt-24 text-center border-t border-white/10 pt-16"
        >
          <p className="text-xl md:text-3xl font-light italic text-white/80 max-w-3xl mx-auto leading-relaxed">
            "We stopped asking 'where are we on this?' — every sample, every approval, every vendor update is just there. Launches went from stressful to predictable."
          </p>
          <p className="mt-6 text-sm text-white/40 font-medium tracking-wide">
            — Head of Sourcing, mid-size apparel brand
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ImpactSection;
