import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import logoImg from '../assets/logo-new.png';

const stakeholders = [
  { title: "Designers", id: "designers" },
  { title: "Brand Teams", id: "brand" },
  { title: "Sourcing\nManagers", id: "sourcing" },
  { title: "Vendors", id: "vendors" },
  { title: "QA Teams", id: "qa" },
  { title: "Tech Teams", id: "tech" }
];

/* ─── Card ─── */
const ServiceCard = ({ item, index, isInView, isTicked, isLoading, isPulsing }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="sh-card"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.15 + index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Notch */}
      <div className={`sh-card-notch ${isTicked ? 'sh-card-notch--ticked' : ''}`} />

      {/* Tick / Loading / Dot indicator */}
      <div className="sh-card-indicator">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              className="sh-card-loading"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.svg width="22" height="22" viewBox="0 0 22 22"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
              >
                <circle cx="11" cy="11" r="9" fill="none" stroke="rgba(255,215,0,0.15)" strokeWidth="2" />
                <motion.circle cx="11" cy="11" r="9" fill="none" stroke="#FFD700" strokeWidth="2"
                  strokeLinecap="round" strokeDasharray="56" strokeDashoffset="42" />
              </motion.svg>
            </motion.div>
          ) : isTicked ? (
            <motion.div
              key="tick"
              className="sh-card-tick"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" fill="#FFD700" />
                <motion.path
                  d="M4.5 8.2L7 10.5L11.5 5.5"
                  stroke="#1A1A1A"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                />
              </svg>
            </motion.div>
          ) : (
            <motion.div
              key="dot"
              className="sh-card-dot-wrap"
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <span className={`sh-card-dot ${isHovered ? 'sh-card-dot--active' : ''}`} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Title — floats on top of the card bottom edge */}
      <div className="sh-card-title-wrap">
        <span className="sh-card-title">{item.title}</span>
      </div>

      {/* Active border glow */}
      <div className={`sh-card-border-glow ${isTicked ? 'sh-card-border-glow--active' : ''}`} />

      {/* Pulse burst when being activated */}
      <AnimatePresence>
        {isPulsing && (
          <motion.div
            className="sh-card-pulse-ring"
            initial={{ scale: 0.5, opacity: 0.8 }}
            animate={{ scale: 2.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ─── SVG Wiring with animated pulses ─── */
const WiringLines = ({ isInView, activePulseCard, showFinalPulse, allTicked }) => {
  /* 6 card centers at x: 80, 240, 400, 560, 720, 880 in viewBox 0 0 960 200 */
  const paths = [
    "M 80 0 L 80 55 Q 80 75 100 75 L 460 75 Q 480 75 480 95 L 480 148",
    "M 240 0 L 240 35 Q 240 55 260 55 L 460 55 Q 480 55 480 75 L 480 148",
    "M 400 0 L 400 18 Q 400 38 420 38 L 460 38 Q 480 38 480 58 L 480 148",
    "M 560 0 L 560 18 Q 560 38 540 38 L 500 38 Q 480 38 480 58 L 480 148",
    "M 720 0 L 720 35 Q 720 55 700 55 L 500 55 Q 480 55 480 75 L 480 148",
    "M 880 0 L 880 55 Q 880 75 860 75 L 500 75 Q 480 75 480 95 L 480 148",
  ];

  return (
    <svg
      className="sh-wiring"
      viewBox="0 0 960 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMeet meet"
    >
      <defs>
        <linearGradient id="wireGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(26,26,26,0.15)" />
          <stop offset="100%" stopColor="rgba(26,26,26,0.05)" />
        </linearGradient>
        <linearGradient id="wireGradActive" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="rgba(255,215,0,0.4)" />
        </linearGradient>
        <filter id="wireGlow">
          <feGaussianBlur stdDeviation="1.5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="pulseGlow">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Static wire paths */}
      {paths.map((d, i) => (
        <React.Fragment key={i}>
          <motion.path
            d={d}
            stroke="url(#wireGrad)"
            strokeWidth="1.2"
            fill="none"
            filter="url(#wireGlow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 + i * 0.08 }}
          />
          {/* Bright overlay when that card's pulse is active */}
          {activePulseCard === i && (
            <motion.path
              d={d}
              stroke="url(#wireGradActive)"
              strokeWidth="2"
              fill="none"
              filter="url(#pulseGlow)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            />
          )}
        </React.Fragment>
      ))}

      {/* Animated pulse dot traveling along the active path */}
      {activePulseCard !== null && activePulseCard >= 0 && activePulseCard < 6 && (
        <motion.circle
          r="5"
          fill="#FFD700"
          filter="url(#pulseGlow)"
          initial={{ offsetDistance: '0%', opacity: 1 }}
          animate={{ offsetDistance: '100%', opacity: [1, 1, 0.6] }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{
            offsetPath: `path("${paths[activePulseCard]}")`,
          }}
        />
      )}
    </svg>
  );
};

/* ─── Main Section ─── */
const StakeholdersSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.15 });

  const [tickedCards, setTickedCards] = useState([]);
  const [loadingCard, setLoadingCard] = useState(null);
  const [activePulseCard, setActivePulseCard] = useState(null);
  const [showFinalPulse, setShowFinalPulse] = useState(false);
  const [logoPulse, setLogoPulse] = useState(false);
  const [animating, setAnimating] = useState(false);

  const allTicked = tickedCards.length === 6;

  /* Sequential: loading → tick → pulse dot, one card at a time */
  const runSequence = useCallback(() => {
    if (animating) return;
    setAnimating(true);

    setTickedCards([]);
    setLoadingCard(null);
    setActivePulseCard(null);
    setLogoPulse(false);

    const cardDelay = 1200;  // total time per card
    const loadDur = 700;     // how long the spinner shows
    const pulseDur = 500;    // how long the dot travels

    stakeholders.forEach((_, i) => {
      // Start loading spinner for this card
      setTimeout(() => setLoadingCard(i), i * cardDelay);

      // Finish loading → show tick → fire pulse dot
      setTimeout(() => {
        setLoadingCard(null);
        setTickedCards(prev => [...prev, i]);
        setActivePulseCard(i);
      }, i * cardDelay + loadDur);

      // Clear pulse after it travels
      setTimeout(() => {
        if (i < 5) setActivePulseCard(null);
      }, i * cardDelay + loadDur + pulseDur);
    });

    // After all cards ticked, pulse logo
    const allDoneTime = 6 * cardDelay;
    setTimeout(() => setActivePulseCard(null), allDoneTime + 200);
    setTimeout(() => {
      setLogoPulse(true);
    }, allDoneTime + 400);

    // Reset and loop after pause
    setTimeout(() => {
      setLogoPulse(false);
      setTickedCards([]);
      setLoadingCard(null);
      setActivePulseCard(null);
      setAnimating(false);
    }, allDoneTime + 3000);
  }, [animating]);

  useEffect(() => {
    if (!isInView) {
      setAnimating(false);
      setTickedCards([]);
      setLoadingCard(null);
      setActivePulseCard(null);
      setLogoPulse(false);
      return;
    }
    const startTimer = setTimeout(() => runSequence(), 800);
    return () => clearTimeout(startTimer);
  }, [isInView, runSequence]);

  useEffect(() => {
    if (isInView && !animating) {
      const loopTimer = setTimeout(() => runSequence(), 600);
      return () => clearTimeout(loopTimer);
    }
  }, [animating, isInView, runSequence]);

  return (
    <section ref={sectionRef} className="sh-section" id="stakeholders">
      {/* Heading */}
      <motion.div
        className="sh-heading"
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        {/* <span className="sh-badge">Our Services</span> */}
        <h2 className="sh-title">One Platform. All Stakeholders.</h2>
        <p className="sh-sub">
          A single source of truth that aligns every team seamlessly across the entire supply chain.
        </p>
      </motion.div>

      {/* Big container */}
      <motion.div
        className="sh-box"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.15 }}
      >
        {/* Single row of cards */}
        <div className="sh-row">
          {stakeholders.map((item, i) => (
            <ServiceCard
              key={item.id}
              item={item}
              index={i}
              isInView={isInView}
              isTicked={tickedCards.includes(i)}
              isLoading={loadingCard === i}
              isPulsing={activePulseCard === i}
            />
          ))}
        </div>

        {/* Wiring lines */}
        <WiringLines
          isInView={isInView}
          activePulseCard={activePulseCard}
          allTicked={allTicked}
        />

        {/* Logo pill */}
        <motion.div
          className={`sh-pill ${logoPulse ? 'sh-pill--pulse' : ''}`}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={isInView ? { opacity: 1, scale: logoPulse ? 1.08 : 1 } : {}}
          transition={{ duration: 0.4 }}
        >
          <img src={logoImg} alt="Modozo" className="sh-pill-logo" />
        </motion.div>
      </motion.div>

      {/* ── Scoped Styles ── */}
      <style>{`
        /* ═══════ SECTION ═══════ */
        .sh-section {
          background: #0E2545;
          min-height: calc(100vh - 40px);
          margin: 20px;
          border-radius: 32px;
          padding: 60px 32px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0,0,0,0.2);
          z-index: 60;
        }
        .sh-section::before {
          content: '';
          position: absolute;
          top: -250px;
          left: 50%;
          transform: translateX(-50%);
          width: 1000px;
          height: 1000px;
          background: radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 65%);
          pointer-events: none;
        }

        /* ═══════ HEADING ═══════ */
        .sh-heading {
          text-align: center;
          margin-bottom: 48px;
          position: relative;
          z-index: 1;
        }
        .sh-badge {
          display: inline-block;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #1A1A1A;
          border: 1px solid rgba(26,26,26,0.15);
          border-radius: 100px;
          padding: 6px 22px;
          margin-bottom: 22px;
          background: rgba(255,215,0,0.2);
        }
        .sh-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 700;
          color: #FFFFFF;
          margin: 0 0 14px;
          line-height: 1.12;
          letter-spacing: -0.02em;
        }
        .sh-sub {
          font-size: clamp(0.88rem, 1.4vw, 1.05rem);
          color: #8FA3C8;
          max-width: 520px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* ═══════ BIG CONTAINER ═══════ */
        .sh-box {
          position: relative;
          width: 100%;
          max-width: 1100px;
          border: 1px solid rgba(26,26,26,0.06);
          border-radius: 24px;
          padding: 48px 36px 36px;
          background: #FFFFFF;
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 1;
          box-shadow: 0 8px 32px rgba(0,0,0,0.03);
        }

        /* ═══════ SINGLE ROW ═══════ */
        .sh-row {
          display: flex;
          gap: 45px;
          width: 100%;
          justify-content: center;
        }

        /* ═══════ CARD ═══════ */
        .sh-card {
          position: relative;
          flex: 1;
          min-width: 0;
          aspect-ratio: 0.85;
          max-width: 130px;
          background: #0E2545;
          border: 1px solid rgba(14,37,69,0.1);
          border-radius: 12px;
          padding: 10px 8px 8px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          cursor: pointer;
          transition: border-color 0.35s, background 0.35s, transform 0.35s, box-shadow 0.35s;
          overflow: visible;
        }
        .sh-card:hover {
          border-color: #FFD700;
          background: #122E54;
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(255,215,0,0.15);
        }

        /* Active border glow */
        .sh-card-border-glow {
          position: absolute;
          inset: -1px;
          border-radius: 14px;
          border: 1.5px solid transparent;
          pointer-events: none;
          transition: border-color 0.4s, box-shadow 0.4s;
        }
        .sh-card-border-glow--active {
          border-color: #FFD700;
          box-shadow: 0 0 15px rgba(255,215,0,0.3);
        }

        /* Notch */
        .sh-card-notch {
          position: absolute;
          top: -1px;
          right: 16px;
          width: 24px;
          height: 12px;
          background: #FFFFFF;
          border-left: 1px solid rgba(26,26,26,0.08);
          border-right: 1px solid rgba(26,26,26,0.08);
          border-bottom: 1px solid rgba(26,26,26,0.08);
          border-radius: 0 0 6px 6px;
          transition: border-color 0.35s;
          z-index: 2;
        }
        .sh-card-notch--ticked { border-color: #FFD700; }
        .sh-card:hover .sh-card-notch { border-color: #FFD700; }

        /* Indicator container */
        .sh-card-indicator {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        /* Loading spinner */
        .sh-card-loading {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Tick */
        .sh-card-tick {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Glowing dot */
        .sh-card-dot-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .sh-card-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: rgba(255,215,0,0.4);
          border: 1.5px solid rgba(255,215,0,0.8);
          box-shadow: 0 0 8px rgba(255,215,0,0.2);
          transition: all 0.3s;
        }
        .sh-card-dot--active {
          background: #FFD700;
          box-shadow: 0 0 12px rgba(255,215,0,0.6);
        }

        /* ═══════ CARD TITLE — Floating on top of bottom edge ═══════ */
        .sh-card-title-wrap {
          position: absolute;
          bottom: 20px;
          left: -6px;
          z-index: 10;
          pointer-events: none;
        }
        .sh-card-title {
          display: inline-block;
          font-size: 12px;
          font-weight: 700;
          color: #1A1A1A;
          letter-spacing: 0.01em;
          line-height: 1.2;
          white-space: pre-line;
          background: #FFD700;
          border: 1px solid rgba(26,26,26,0.1);
          border-radius: 8px;
          padding: 6px 12px;
          box-shadow: 0 3px 12px rgba(0,0,0,0.08);
        }

        /* Pulse ring effect */
        .sh-card-pulse-ring {
          position: absolute;
          top: 12px;
          left: 10px;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: rgba(255,215,0,0.4);
          pointer-events: none;
          z-index: 3;
        }

        /* ═══════ WIRING ═══════ */
        .sh-wiring {
          width: 100%;
          max-width: 960px;
          height: auto;
          margin-top: -2px;
        }

        /* ═══════ LOGO PILL ═══════ */
        .sh-pill {
          display: flex;
          align-items: center;
          justify-content: center;
          background: #FFFFFF;
          border: 1px solid rgba(26,26,26,0.1);
          border-radius: 100px;
          padding: 10px 30px;
          margin-top: -2px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.04);
          transition: border-color 0.4s, box-shadow 0.4s;
        }
        .sh-pill--pulse {
          border-color: #FFD700;
          box-shadow: 0 0 20px rgba(255,215,0,0.3), 0 0 40px rgba(255,215,0,0.15);
        }
        .sh-pill-logo {
          height: 30px;
          width: auto;
          opacity: 1;
          transition: transform 0.3s;
        }
        .sh-pill--pulse .sh-pill-logo {
          transform: scale(1.05);
        }

        /* ═══════ RESPONSIVE ═══════ */
        @media (max-width: 900px) {
          .sh-section { padding: 40px 20px; min-height: calc(100vh - 24px); margin: 12px; border-radius: 24px; }
          .sh-box { padding: 32px 20px 28px; border-radius: 18px; }
          .sh-row { gap: 10px; flex-wrap: wrap; justify-content: center; }
          .sh-card {
            flex: 0 0 calc(33.33% - 8px);
            max-width: none;
            aspect-ratio: 1;
          }
          .sh-wiring { display: none; }
          .sh-pill { margin-top: 24px; }
        }

        @media (max-width: 550px) {
          .sh-section { padding: 30px 14px; min-height: calc(100vh - 16px); margin: 8px; border-radius: 20px; }
          .sh-box { padding: 24px 14px 20px; border-radius: 14px; }
          .sh-row { gap: 8px; }
          .sh-card {
            flex: 0 0 calc(50% - 6px);
            aspect-ratio: 1;
            padding: 10px 8px 8px;
            border-radius: 10px;
          }
          .sh-card-title { font-size: 11px; padding: 4px 8px; }
          .sh-card-notch { width: 20px; height: 10px; right: 12px; }
          .sh-pill { padding: 8px 22px; }
          .sh-pill-logo { height: 24px; }
        }
      `}</style>
    </section>
  );
};

export default StakeholdersSection;
