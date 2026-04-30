import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useTransform, useMotionValue, useAnimationFrame, useScroll, useMotionValueEvent } from 'framer-motion';

// Import images from assets 
import logoNew from '../assets/logo4.png';
import techpackImg from '../assets/hero1.png';
import approvalsImg from '../assets/hero2.png';
import vendorsImg from '../assets/hero3.png';
import samplesImg from '../assets/hero4.png';
import productionImg from '../assets/hero5.png';

const Navbar = () => {
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 50) {
      // Scrolling down the page -> hide
      setIsHidden(true);
    } else if (latest < previous) {
      // Scrolling up the page -> visible
      setIsHidden(false);
    } else if (latest <= 50) {
      // Top of page
      setIsHidden(false);
    }
  });

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Workflow Challenges', href: '#challenges' },
    { name: 'Lack of Structure', href: '#structure' },
    { name: 'Solution', href: '#solution' },
    { name: 'Workflow', href: '#workflow' },
    { name: 'Features', href: '#features' },
    { name: 'Impact', href: '#impact' },
  ];

  return (
    <motion.nav 
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" }
      }}
      animate={isHidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between px-4 sm:px-6 py-4 bg-[#0E2545]/90 backdrop-blur-lg shadow-sm border-b border-white/5"
    >
      <div className="flex items-center min-w-[120px] md:min-w-[150px]">
        <a href="#home" className="flex items-center">
          <div className="relative flex flex-col items-start">
            <img
              src={logoNew}
              alt="Modozo"
              onLoad={() => setLogoLoaded(true)}
              className={`h-[35px] sm:h-[45px] md:h-[55px] w-auto object-contain transition-transform hover:scale-105 ${!logoLoaded ? 'absolute opacity-0' : 'opacity-100'}`}
            />
            {!logoLoaded && <span className="text-lg md:text-xl font-bold tracking-tighter text-white uppercase">Modozo</span>}
          </div>
        </a>
      </div>

      <div className="hidden xl:flex absolute left-1/2 -translate-x-1/2 items-center justify-center gap-6 2xl:gap-10">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="text-sm 2xl:text-base font-medium text-white/80 hover:text-[#FFD84D] transition-all duration-300 ease-in-out"
          >
            {link.name}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        <div className="hidden md:flex items-center gap-4 mr-2">
          <a href="#login" className="text-sm font-bold text-white/80 hover:text-[#FFD84D] transition-colors">Login</a>
          <a href="#signup" className="text-sm font-bold bg-[#FFD84D] text-[#0E2545] px-5 py-2.5 rounded-full hover:scale-105 transition-transform shadow-sm active:scale-95">Sign Up</a>
        </div>
        <button onClick={scrollToContact}
          className="hidden sm:block px-4 md:px-6 py-2 md:py-2.5 bg-[#FFD84D] text-[#0E2545] font-semibold text-xs md:text-sm rounded-full shadow-sm hover:scale-105 transition-all duration-300 active:scale-95 whitespace-nowrap">
          Contact Us
        </button>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="xl:hidden flex items-center justify-center p-2 text-white hover:text-[#FFD84D] focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-[#0E2545]/98 backdrop-blur-2xl shadow-2xl border-b border-white/10 flex flex-col py-6 px-6 xl:hidden z-50 overflow-y-auto max-h-[80vh]"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-4 text-base font-medium text-white/90 border-b border-white/5 last:border-none hover:text-[#FFD84D] transition-all duration-300 ease-in-out"
              >
                {link.name}
              </a>
            ))}
            <div className="flex flex-col gap-4 mt-6 md:hidden">
              <a href="#login" onClick={() => setIsMobileMenuOpen(false)} className="py-4 text-center text-sm font-bold text-white border border-white/10 rounded-full">Login</a>
              <button onClick={() => { setIsMobileMenuOpen(false); scrollToContact(); }}
                className="px-6 py-4 bg-[#FFD84D] text-[#0E2545] font-bold text-sm rounded-full shadow-md w-full text-center">
                Contact Us
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const CarouselItem = ({ src, index, total, baseX, isMobile }) => {
  const offset = (index / total) * 100;

  const xPos = useTransform(baseX, (value) => {
    let raw = (value + offset) % 100;
    if (raw > 50) raw -= 100;
    if (raw < -50) raw += 100;
    return raw;
  });

  // RESPONSIVE TRANSFORM VALUES
  const xRange = isMobile ? ["-70vw", "0vw", "70vw"] : ["-50vw", "0vw", "50vw"];
  const yRange = isMobile ? [15, 0, 15] : [30, 0, 30];
  const zRange = isMobile ? [-200, 0, -200] : [-400, 0, -400];
  const rotRange = isMobile ? [45, 0, -45] : [75, 0, -75];
  const scaleRange = isMobile ? [0.6, 1, 0.6] : [0.65, 1, 0.65];

  const x = useTransform(xPos, [-50, 0, 50], xRange);
  const y = useTransform(xPos, [-50, 0, 50], yRange);
  const z = useTransform(xPos, [-50, 0, 50], zRange);
  const rotateY = useTransform(xPos, [-50, 0, 50], rotRange);
  const scale = useTransform(xPos, [-50, 0, 50], scaleRange);
  const opacity = useTransform(xPos, [-50, -40, 0, 40, 50], [0, 1, 1, 1, 0]);
  const zIndex = useTransform(xPos, [-50, 0, 50], [0, 10, 0]);

  return (
    <motion.div
      className="absolute flex items-center justify-center pointer-events-none"
      style={{ x, y, z, rotateY, scale, opacity, zIndex, transformStyle: "preserve-3d" }}
    >
      <img
        src={src}
        alt={`Workflow step ${index + 1}`}
        className="w-[70vw] sm:w-[45vw] md:w-[30vw] min-w-[200px] sm:min-w-[280px] max-w-[650px] h-auto object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.4)] md:drop-shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
      />
    </motion.div>
  );
};

const HeroSection = () => {
  const baseX = useMotionValue(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useAnimationFrame((t, delta) => {
    const moveBy = delta * 0.002;
    baseX.set(baseX.get() - moveBy);
  });

  const images = [
    techpackImg,
    approvalsImg,
    vendorsImg,
    samplesImg,
    productionImg,
  ];

  return (
    <section id="home" className="relative min-h-[100svh] flex flex-col justify-center items-center overflow-hidden bg-gradient-to-br from-[#0E2545] to-[#122E54]">
      <Navbar />

      {/* 3D Cylindrical Carousel Background */}
      <div
        className="absolute inset-0 z-0 flex items-center justify-center pt-32 sm:pt-20 overflow-visible"
        style={{ perspective: isMobile ? '600px' : '1500px' }}
      >
        {images.map((src, i) => (
          <CarouselItem
            key={i}
            src={src}
            index={i}
            total={images.length}
            baseX={baseX}
            isMobile={isMobile}
          />
        ))}
      </div>

      {/* Soft overlay to balance visibility and readability */}
      <div className="absolute inset-0 bg-[#0E2545]/70 md:bg-[#0E2545]/50 z-10 pointer-events-none" />

      {/* Centered Content */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 flex flex-col items-center text-center justify-center w-full mt-16 md:mt-0">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-[72px] font-bold tracking-tight text-white leading-[1.2] md:leading-[1.1] mb-6 md:mb-8 font-serif"
        >
          Supercharge Your Fashion Supply Chain
        </motion.h1>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="max-w-2xl flex flex-col items-center mb-8 md:mb-10"
        >
          <p className="text-base md:text-xl text-[#B8C7E0] leading-relaxed font-medium">
            From techpacks to production tracking — Modozo brings your entire fashion workflow into one connected system.
          </p>
        </motion.div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 md:px-0">
          <button className="px-8 py-3.5 md:py-4 bg-[#FFD84D] text-[#0E2545] rounded-full shadow-lg font-bold hover:scale-105 transition-all duration-300 active:scale-95 text-sm md:text-base">
            Book a Demo
          </button>
          <button className="px-8 py-3.5 md:py-4 bg-transparent text-white border-2 border-white/10 rounded-full font-bold hover:scale-105 hover:bg-white/5 transition-all duration-300 active:scale-95 text-sm md:text-base">
            See How It Works
          </button>
        </motion.div>
      </div>

    </section>
  );
};

export default HeroSection;
