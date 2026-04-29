import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useTransform, useMotionValue, useAnimationFrame } from 'framer-motion';

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
    <nav className="fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between px-6 py-4 bg-[#0E2545]/85 backdrop-blur-md shadow-sm border-b border-white/5 transition-transform duration-300">
      <div className="flex items-center min-w-[150px]">
        <a href="#home" className="flex items-center">
          <div className="relative flex flex-col items-start">
            <img
              src={logoNew}
              alt="Modozo"
              onLoad={() => setLogoLoaded(true)}
              className={`h-[45px] md:h-[55px] w-auto object-contain transition-transform hover:scale-105 ${!logoLoaded ? 'absolute opacity-0' : 'opacity-100'}`}
            />
            {!logoLoaded && <span className="text-xl font-bold tracking-tighter text-white uppercase">Modozo</span>}
          </div>
        </a>
      </div>

      <div className="hidden xl:flex items-center gap-8 ml-4">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="text-sm font-medium text-white/80 hover:text-[#FFD84D] transition-all duration-300 ease-in-out"
          >
            {link.name}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-4 mr-2">
          <a href="#login" className="text-sm font-bold text-white/80 hover:text-[#FFD84D] transition-colors">Login</a>
          <a href="#signup" className="text-sm font-bold bg-[#FFD84D] text-[#0E2545] px-5 py-2.5 rounded-full hover:scale-105 transition-transform shadow-sm active:scale-95">Sign Up</a>
        </div>
        <button onClick={scrollToContact}
          className="hidden md:block px-6 py-2.5 bg-[#FFD84D] text-[#0E2545] font-semibold text-sm rounded-full shadow-sm hover:scale-105 transition-all duration-300 active:scale-95 whitespace-nowrap">
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

      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#122E54]/95 backdrop-blur-md shadow-lg border-b border-white/5 flex flex-col py-4 px-6 xl:hidden z-50">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-3 text-sm font-medium text-white/80 border-b border-white/5 last:border-none hover:text-[#FFD84D] transition-all duration-300 ease-in-out"
            >
              {link.name}
            </a>
          ))}
          <button onClick={() => { setIsMobileMenuOpen(false); scrollToContact(); }}
            className="mt-4 px-6 py-3 bg-[#FFD84D] text-[#0E2545] font-semibold text-sm rounded-full shadow-md w-full md:hidden text-center">
            Contact Us
          </button>
        </div>
      )}
    </nav>
  );
};

const CarouselItem = ({ src, index, total, baseX }) => {
  // Initial offset for each item to distribute them evenly in the 100% track
  const offset = (index / total) * 100;
  
  // Calculate a looped position from -50 to 50
  const xPos = useTransform(baseX, (value) => {
    let raw = (value + offset) % 100;
    // Normalize to range [-50, 50]
    if (raw > 50) raw -= 100;
    if (raw < -50) raw += 100;
    return raw;
  });

  // Map the normalized position to 3D transformations with a slight vertical curve
  const x = useTransform(xPos, [-50, 0, 50], ["-120vw", "0vw", "120vw"]);
  const y = useTransform(xPos, [-50, 0, 50], [50, 0, 50]); // Creates a slight upward arc (smile curve)
  const rotateY = useTransform(xPos, [-50, 0, 50], [65, 0, -65]);
  const scale = useTransform(xPos, [-50, 0, 50], [0.45, 1, 0.45]);
  const opacity = useTransform(xPos, [-50, -35, 0, 35, 50], [0, 1, 1, 1, 0]);
  const zIndex = useTransform(xPos, [-50, 0, 50], [0, 10, 0]);

  return (
    <motion.div
      className="absolute flex items-center justify-center pointer-events-none"
      style={{ x, y, rotateY, scale, opacity, zIndex, transformStyle: "preserve-3d" }}
    >
      <img 
        src={src} 
        alt={`Workflow step ${index + 1}`}
        className="w-[30vw] min-w-[280px] max-w-[650px] h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.4)]" 
      />
    </motion.div>
  );
};

const HeroSection = () => {
  const baseX = useMotionValue(0);
  
  // Continuous animation loop
  useAnimationFrame((t, delta) => {
    // Speed: moves 2% of the track per second (adjust as needed)
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
        className="absolute inset-0 z-0 flex items-center justify-center pt-20 overflow-visible"
        style={{ perspective: '1500px' }}
      >
        {images.map((src, i) => (
          <CarouselItem 
            key={i} 
            src={src} 
            index={i} 
            total={images.length} 
            baseX={baseX}
          />
        ))}
      </div>

      {/* Soft overlay to balance visibility and readability */}
      <div className="absolute inset-0 bg-[#0E2545]/50 z-10 pointer-events-none" />

      {/* Centered Content */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 flex flex-col items-center text-center justify-center w-full">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-bold tracking-tight text-white leading-[1.1] mb-8 font-serif"
        >
          Supercharge Your Fashion Supply Chain with Modozo
        </motion.h1>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="max-w-3xl flex flex-col items-center"
        >
          <p className="text-lg md:text-xl text-[#B8C7E0] leading-relaxed font-medium mb-6">
            From techpacks and approvals to vendors, samples, and production tracking — Modozo brings your entire fashion workflow into one connected system.
          </p>
        </motion.div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button className="px-8 py-4 bg-[#FFD84D] text-[#0E2545] rounded-full shadow-lg font-bold hover:scale-105 transition-all duration-300 active:scale-95">
            Book a Demo
          </button>
          <button className="px-8 py-4 bg-transparent text-white border-2 border-white/10 rounded-full font-bold hover:scale-105 hover:bg-white/5 transition-all duration-300 active:scale-95">
            See How It Works
          </button>
        </motion.div>
      </div>

    </section>
  );
};

export default HeroSection;
