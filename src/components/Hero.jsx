import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';
import './Hero.css';

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  const { t } = useTranslation();

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const scrollToMenu = () => {
    document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={containerRef} className="hero-container s-tier">
      <motion.div 
        className="hero-background"
        style={{ y: yBg }}
      >
        <div className="hero-vignette"></div>
      </motion.div>
      
      <motion.div 
        className="hero-content-wrapper"
        style={{ y: yText, opacity: opacityText }}
      >
        <div className="hero-text-block">
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="overflow-hidden"
          >
            <h1 className="hero-title-main">TEST</h1>
          </motion.div>
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
            className="overflow-hidden"
          >
            <h1 className="hero-title-main accent">RESTO</h1>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="hero-subtitle interactive"
        >
          <p>{t('hero.subtitle1')}</p>
          <p className="small-caps">{t('hero.subtitle2')}</p>
          
          <a 
            href="https://www.concisorderflow.com/test" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hero-bestel-btn interactive"
          >
            {t('hero.cta')}
          </a>
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, type: "spring" }}
        className="scroll-down-circle interactive"
        onClick={scrollToMenu}
      >
        <ChevronDown size={24} strokeWidth={1.5} />
      </motion.div>
    </section>
  );
};

export default Hero;
