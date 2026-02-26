import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from '../context/LanguageContext';
import './Navbar.css';

const Navbar = ({ onOpenReservation }) => {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const { t, language, toggleLanguage } = useTranslation();
  
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  // Condense navbar width on scroll for a cool floating pill effect
  const navWidth = useTransform(scrollY, [0, 200], [isMobile ? "100%" : "100%", isMobile ? "100%" : "70%"]);
  const navY = useTransform(scrollY, [0, 200], [0, isMobile ? 0 : 20]);
  const navRadius = useTransform(scrollY, [0, 200], ["0px", isMobile ? "0px" : "50px"]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="s-navbar-wrapper">
      <motion.nav 
        className={`s-navbar ${scrolled ? 'scrolled' : ''}`}
        style={{ 
          width: navWidth, 
          y: navY,
          borderRadius: navRadius
        }}
      >
        <div className="s-navbar-content">
          <div className="s-navbar-logo interactive" onClick={() => scrollTo('home')}>
            TEST <span>RESTO</span>
          </div>
          <div className="s-navbar-links">
            <button className="interactive" onClick={() => scrollTo('menu-section')}>{t('nav.menu')}</button>
            <button className="interactive" onClick={() => scrollTo('footer')}>{t('nav.contact')}</button>
            
            <a 
              href="https://www.concisorderflow.com/test" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="s-nav-cta-secondary interactive"
            >
              {t('nav.order')}
            </a>
            <button className="s-nav-cta interactive" onClick={onOpenReservation}>
              {t('nav.reserve')}
            </button>
            
            {/* Language Toggle moved to the far right */}
            <button className="s-lang-toggle interactive" onClick={toggleLanguage} style={{ marginLeft: '1rem', marginRight: 0 }}>
              {language === 'nl' ? 'EN' : 'NL'}
            </button>
          </div>
        </div>
      </motion.nav>
    </div>
  );
};

export default Navbar;
