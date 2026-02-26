import React from 'react';
import { useTranslation } from '../context/LanguageContext';
import './Footer.css';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer id="footer" className="s-footer">
      <div className="s-footer-content">
        <div className="s-footer-massive-text">
          <h1>TEST</h1>
          <h1 className="accent">RESTO</h1>
        </div>
        
        <div className="s-footer-grid">
          <div className="s-footer-col">
            <h4>{t('footer.visit')}</h4>
            <p>{t('footer.street')}</p>
            <p>{t('footer.city')}</p>
            <p>{t('footer.country')}</p>
          </div>
          
          <div className="s-footer-col">
            <h4>{t('footer.contact')}</h4>
            <p className="interactive">info@testresto.nl</p>
            <p className="interactive">+31 (0)6 1234 5678</p>
          </div>

          <div className="s-footer-col">
            <h4>{t('footer.hoursTitle')}</h4>
            <p>{t('footer.hoursDays')}: 17:30 - 23:00</p>
          </div>
        </div>
      </div>
      
      <div className="s-footer-bottom">
        <p>&copy; {new Date().getFullYear()} {t('footer.copyright')}</p>
        <div className="s-footer-links">
          <span className="interactive">{t('footer.privacy')}</span>
          <span className="interactive">{t('footer.terms')}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
