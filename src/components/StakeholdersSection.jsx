import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import logoImg from '../assets/logo3.png';

/* ═══════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════ */
const stakeholders = [
  { title: "Designers", id: "designers", desc: "Techpack creation" },
  { title: "Brand Teams", id: "brand", desc: "Review & approvals" },
  { title: "Sourcing\nManagers", id: "sourcing", desc: "Vendor coordination" },
  { title: "Vendors", id: "vendors", desc: "Production briefs" },
  { title: "QA Teams", id: "qa", desc: "Quality assurance" },
  { title: "Tech Teams", id: "tech", desc: "System integration" }
];

/* Node positions (% of container) — organic arc layout */
const nodePositions = [
  { x: 10, y: 18 },   // Designers — far left
  { x: 27, y: 8 },    // Brand Teams — upper-left
  { x: 46, y: 4 },    // Sourcing — top center-left
  { x: 54, y: 4 },    // Vendors — top center-right
  { x: 73, y: 8 },    // QA Teams — upper-right
  { x: 90, y: 18 },   // Tech Teams — far right
];

const CENTER = { x: 48, y: 78 }; // Logo center position — shifted left to align with line convergence

/* ═══════════════════════════════════════════════════════
   NETWORK NODE — Glowing dot + floating label
═══════════════════════════════════════════════════════ */
const NetworkNode = ({ item, index, pos, isInView, isTicked, isLoading, isHovered, onHover, onLeave }) => {
  const labelLeft = pos.x < 50;

  return (
    <motion.div
      className="nw-node"
      style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: 0.3 + index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={onLeave}
    >
      {/* Floating animation wrapper */}
      <div className="nw-node-float" style={{ animationDelay: `${index * 0.8}s` }}>

        {/* Outer pulse ring on activation */}
        <AnimatePresence>
          {(isLoading || isTicked) && (
            <motion.div
              className="nw-pulse-ring"
              initial={{ scale: 0.5, opacity: 0.8 }}
              animate={{ scale: 2.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            />
          )}
        </AnimatePresence>

        {/* The dot itself */}
        <div className={`nw-dot ${isTicked ? 'nw-dot--active' : ''} ${isLoading ? 'nw-dot--loading' : ''} ${isHovered ? 'nw-dot--hover' : ''}`}>
          {/* Loading spinner */}
          {isLoading && (
            <motion.svg className="nw-spinner" width="28" height="28" viewBox="0 0 28 28"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            >
              <motion.circle cx="14" cy="14" r="11" fill="none" stroke="#7B61FF" strokeWidth="2"
                strokeLinecap="round" strokeDasharray="69" strokeDashoffset="52" />
            </motion.svg>
          )}

          {/* Checkmark */}
          <AnimatePresence>
            {isTicked && (
              <motion.svg width="14" height="14" viewBox="0 0 16 16" fill="none"
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 18 }}
              >
                <motion.path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="white" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, delay: 0.05 }}
                />
              </motion.svg>
            )}
          </AnimatePresence>
        </div>

        {/* Floating label */}
        <div className={`nw-label ${labelLeft ? 'nw-label--left' : 'nw-label--right'}`}>
          <span className={`nw-label-title ${isTicked ? 'nw-label-title--active' : ''}`}>
            {item.title}
          </span>
          <span className="nw-label-desc">{item.desc}</span>
        </div>
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════
   SVG CONNECTIONS — Lines from nodes to center
═══════════════════════════════════════════════════════ */
const ConnectionLines = ({ isInView, activePulseCard, allTicked, hoveredCard, showFinalPulse }) => {
  /* Generate curved paths from each node to center */
  const generatePath = (from, to) => {
    const fx = from.x * 9.6; // Scale % to viewBox (960 wide)
    const fy = from.y * 5.5; // Scale % to viewBox (550 tall)
    const tx = to.x * 9.6;
    const ty = to.y * 5.5;
    const midY = fy + (ty - fy) * 0.65;
    return `M ${fx} ${fy} C ${fx} ${midY}, ${tx} ${midY}, ${tx} ${ty}`;
  };

  const paths = nodePositions.map(pos => generatePath(pos, CENTER));

  return (
    <svg className="nw-svg" viewBox="0 0 960 550" fill="none" preserveAspectRatio="none">
      <defs>
        <linearGradient id="nwLineGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.03)" />
        </linearGradient>
        <linearGradient id="nwLineActive" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF59D" />
          <stop offset="50%" stopColor="rgba(255,245,157,0.5)" />
          <stop offset="100%" stopColor="rgba(255,245,157,0.15)" />
        </linearGradient>
        <linearGradient id="nwLineHover" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7B61FF" />
          <stop offset="100%" stopColor="rgba(123,97,255,0.2)" />
        </linearGradient>
        <filter id="nwGlow">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="nwPulseGlow">
          <feGaussianBlur stdDeviation="5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Connection paths */}
      {paths.map((d, i) => (
        <React.Fragment key={i}>
          {/* Base dim line */}
          <motion.path
            d={d}
            stroke="url(#nwLineGrad)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.6 + i * 0.1 }}
          />

          {/* Hover highlight */}
          {hoveredCard === i && (
            <motion.path d={d} stroke="url(#nwLineHover)" strokeWidth="1.5" fill="none"
              filter="url(#nwGlow)"
              initial={{ opacity: 0 }} animate={{ opacity: 0.9 }}
              transition={{ duration: 0.3 }}
            />
          )}

          {/* Active pulse line */}
          {activePulseCard === i && (
            <motion.path d={d} stroke="url(#nwLineActive)" strokeWidth="2" fill="none"
              filter="url(#nwGlow)"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
            />
          )}
        </React.Fragment>
      ))}

      {/* Traveling pulse dot */}
      {activePulseCard !== null && activePulseCard >= 0 && activePulseCard < 6 && (
        <motion.circle r="4" fill="#22C55E" filter="url(#nwPulseGlow)"
          initial={{ offsetDistance: '0%', opacity: 1 }}
          animate={{ offsetDistance: '100%', opacity: [1, 1, 0.4] }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          style={{ offsetPath: `path("${paths[activePulseCard]}")` }}
        />
      )}
    </svg>
  );
};

/* ═══════════════════════════════════════════════════════
   MAIN SECTION
═══════════════════════════════════════════════════════ */
const StakeholdersSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.15 });

  const [tickedCards, setTickedCards] = useState([]);
  const [loadingCard, setLoadingCard] = useState(null);
  const [activePulseCard, setActivePulseCard] = useState(null);
  const [showFinalPulse, setShowFinalPulse] = useState(false);
  const [logoPulse, setLogoPulse] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  const allTicked = tickedCards.length === 6;

  const runSequence = useCallback(() => {
    if (animating) return;
    setAnimating(true);

    setTickedCards([]);
    setLoadingCard(null);
    setActivePulseCard(null);
    setShowFinalPulse(false);
    setLogoPulse(false);

    const cardDelay = 1100;
    const loadDur = 700;
    const pulseDur = 650;

    stakeholders.forEach((_, i) => {
      setTimeout(() => setLoadingCard(i), i * cardDelay);
      setTimeout(() => {
        setLoadingCard(null);
        setTickedCards(prev => [...prev, i]);
        setActivePulseCard(i);
      }, i * cardDelay + loadDur);
      setTimeout(() => {
        if (i < 5) setActivePulseCard(null);
      }, i * cardDelay + loadDur + pulseDur);
    });

    const allDoneTime = 6 * cardDelay + loadDur;

    setTimeout(() => setActivePulseCard(null), allDoneTime + 300);
    setTimeout(() => setShowFinalPulse(true), allDoneTime + 500);
    setTimeout(() => { setShowFinalPulse(false); setLogoPulse(true); }, allDoneTime + 950);
    setTimeout(() => {
      setLogoPulse(false);
      setTickedCards([]);
      setLoadingCard(null);
      setActivePulseCard(null);
      setShowFinalPulse(false);
      setAnimating(false);
    }, allDoneTime + 3500);
  }, [animating]);

  useEffect(() => {
    if (!isInView) {
      setAnimating(false);
      setTickedCards([]);
      setLoadingCard(null);
      setActivePulseCard(null);
      setShowFinalPulse(false);
      setLogoPulse(false);
      return;
    }
    const t = setTimeout(() => runSequence(), 800);
    return () => clearTimeout(t);
  }, [isInView]);

  useEffect(() => {
    if (isInView && !animating) {
      const t = setTimeout(() => runSequence(), 800);
      return () => clearTimeout(t);
    }
  }, [animating, isInView, runSequence]);

  return (
    <section ref={sectionRef} className="nw-section" id="stakeholders">
      {/* Ambient glow */}
      <div className="nw-bg-orb nw-bg-orb--1" />
      <div className="nw-bg-orb nw-bg-orb--2" />
      <div className="nw-bg-orb nw-bg-orb--3" />

      {/* Heading */}
      <motion.div
        className="nw-heading"
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="nw-title">One Platform. All Stakeholders.</h2>
        <p className="nw-sub">
          A single source of truth that aligns every team seamlessly across the entire supply chain.
        </p>
      </motion.div>

      {/* Network canvas */}
      <div className="nw-canvas">
        {/* SVG connections layer (background) */}
        <ConnectionLines
          isInView={isInView}
          activePulseCard={activePulseCard}
          allTicked={allTicked}
          hoveredCard={hoveredCard}
          showFinalPulse={showFinalPulse}
        />

        {/* Nodes layer (foreground) */}
        {stakeholders.map((item, i) => (
          <NetworkNode
            key={item.id}
            item={item}
            index={i}
            pos={nodePositions[i]}
            isInView={isInView}
            isTicked={tickedCards.includes(i)}
            isLoading={loadingCard === i}
            isHovered={hoveredCard === i}
            onHover={setHoveredCard}
            onLeave={() => setHoveredCard(null)}
          />
        ))}

        {/* Central logo node */}
        <motion.div
          className={`nw-logo-node ${logoPulse ? 'nw-logo-node--pulse' : ''}`}
          style={{ left: `${CENTER.x}%`, top: `${CENTER.y}%` }}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={isInView ? {
            opacity: 1,
            scale: logoPulse ? 1.12 : 1
          } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <img src={logoImg} alt="Modozo" className="nw-logo-img" />
        </motion.div>
      </div>

      {/* ═══════ STYLES ═══════ */}
      <style>{`
        .nw-section {
          background: #163563;
          min-height: 100vh;
          margin: 20px;
          padding: 70px 32px 40px;
          border-radius: 32px;
          border: 1px solid rgba(255,255,255,0.06);
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          overflow: hidden;
          box-shadow: 0 0 80px rgba(0,0,0,0.4);
        }

        /* Ambient background orbs */
        .nw-bg-orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(120px);
        }
        .nw-bg-orb--1 { width: 500px; height: 500px; top: -150px; left: -100px; background: rgba(123,97,255,0.05); }
        .nw-bg-orb--2 { width: 400px; height: 400px; bottom: -100px; right: -80px; background: rgba(255,245,157,0.04); }
        .nw-bg-orb--3 { width: 300px; height: 300px; top: 40%; left: 40%; background: rgba(255,255,255,0.015); }

        /* ═══════ HEADING ═══════ */
        .nw-heading {
          text-align: center;
          margin-bottom: 20px;
          position: relative;
          z-index: 10;
        }
        .nw-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 700;
          color: #FFFFFF;
          margin: 0 0 14px;
          line-height: 1.12;
          letter-spacing: -0.02em;
        }
        .nw-sub {
          font-size: clamp(0.85rem, 1.3vw, 1rem);
          color: rgba(255,255,255,0.4);
          max-width: 480px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* ═══════ NETWORK CANVAS ═══════ */
        .nw-canvas {
          position: relative;
          width: 100%;
          max-width: 1000px;
          aspect-ratio: 1.75;
          margin: 0 auto;
        }

        /* SVG layer — sits behind everything */
        .nw-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        /* ═══════ NODE ═══════ */
        .nw-node {
          position: absolute;
          transform: translate(-50%, -50%);
          z-index: 5;
          cursor: pointer;
        }

        .nw-node-float {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          animation: nw-float 7s ease-in-out infinite;
        }

        @keyframes nw-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }

        /* ═══════ DOT ═══════ */
        .nw-dot {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: rgba(255,255,255,0.08);
          border: 1.5px solid rgba(255,255,255,0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 6;
          transition: all 0.4s ease;
          box-shadow: 0 0 0 rgba(255,255,255,0);
        }
        .nw-dot--hover {
          background: rgba(123,97,255,0.25);
          border-color: rgba(123,97,255,0.6);
          box-shadow: 0 0 20px rgba(123,97,255,0.3);
          transform: scale(1.3);
        }
        .nw-dot--loading {
          background: rgba(123,97,255,0.1);
          border-color: transparent;
        }
        .nw-dot--active {
          background: #FFF59D;
          border-color: rgba(255,245,157,0.8);
          box-shadow: 0 0 18px rgba(255,245,157,0.4), 0 0 40px rgba(255,245,157,0.15);
        }

        .nw-spinner {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .nw-pulse-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: rgba(255,245,157,0.3);
          pointer-events: none;
          z-index: 4;
        }

        /* ═══════ LABEL ═══════ */
        .nw-label {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          gap: 2px;
          white-space: pre-line;
          pointer-events: none;
          z-index: 7;
        }
        .nw-label--left {
          right: calc(100% + 14px);
          text-align: right;
          align-items: flex-end;
        }
        .nw-label--right {
          left: calc(100% + 14px);
          text-align: left;
          align-items: flex-start;
        }
        .nw-label-title {
          font-size: 13px;
          font-weight: 600;
          color: rgba(255,255,255,0.75);
          letter-spacing: 0.01em;
          line-height: 1.2;
          transition: color 0.4s, text-shadow 0.4s;
        }
        .nw-label-title--active {
          color: rgba(255,255,255,0.95);
          text-shadow: 0 0 12px rgba(255,245,157,0.3);
        }
        .nw-label-desc {
          font-size: 10px;
          font-weight: 400;
          color: rgba(255,255,255,0.25);
          line-height: 1.3;
        }

        /* ═══════ CENTRAL LOGO ═══════ */
        .nw-logo-node {
          position: absolute;
          transform: translate(-50%, -50%);
          z-index: 8;
          padding: 14px 32px;
          border-radius: 100px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          transition: all 0.5s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .nw-logo-node--pulse {
          border-color: rgba(255,245,157,0.5);
          box-shadow: 0 0 30px rgba(255,245,157,0.15), 0 0 60px rgba(255,245,157,0.05);
          background: rgba(255,245,157,0.05);
        }
        .nw-logo-img {
          height: 34px;
          width: auto;
          opacity: 0.85;
          transition: all 0.4s;
        }
        .nw-logo-node--pulse .nw-logo-img {
          opacity: 1;
        }

        /* ═══════ RESPONSIVE ═══════ */
        @media (max-width: 1024px) {
          .nw-section { padding: 50px 20px 30px; }
          .nw-canvas { aspect-ratio: 1.5; }
        }
        @media (max-width: 900px) {
          .nw-section { padding: 40px 16px 24px; margin: 12px; border-radius: 24px; }
          .nw-canvas { aspect-ratio: 1.3; }
          .nw-label-title { font-size: 11px; }
          .nw-label-desc { font-size: 9px; }
          .nw-dot { width: 14px; height: 14px; }
          .nw-logo-img { height: 26px; }
          .nw-logo-node { padding: 10px 24px; }
          .nw-title { margin-bottom: 10px; }
        }
        @media (max-width: 600px) {
          .nw-section { padding: 32px 10px 20px; margin: 6px; border-radius: 18px; min-height: auto; }
          .nw-canvas { aspect-ratio: 1.0; min-height: 320px; }
          .nw-label-title { font-size: 9px; }
          .nw-label-desc { display: none; }
          .nw-dot { width: 12px; height: 12px; }
          .nw-label--left { right: calc(100% + 6px); }
          .nw-label--right { left: calc(100% + 6px); }
          .nw-logo-img { height: 20px; }
          .nw-logo-node { padding: 8px 18px; }
          .nw-heading { margin-bottom: 10px; }
          .nw-sub { font-size: 0.8rem; }
        }
        @media (max-width: 420px) {
          .nw-section { padding: 24px 8px 16px; margin: 4px; border-radius: 14px; }
          .nw-canvas { aspect-ratio: 0.9; min-height: 280px; }
          .nw-label-title { font-size: 8px; }
          .nw-dot { width: 10px; height: 10px; }
          .nw-label--left { right: calc(100% + 4px); }
          .nw-label--right { left: calc(100% + 4px); }
          .nw-logo-img { height: 16px; }
          .nw-logo-node { padding: 6px 14px; }
          .nw-title { font-size: 1.5rem; }
          .nw-sub { font-size: 0.75rem; max-width: 280px; }
        }
      `}</style>
    </section>
  );
};

export default StakeholdersSection;
