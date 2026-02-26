import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
  nl: {
    nav: {
      menu: 'Menu',
      contact: 'Contact',
      order: 'Bestel',
      reserve: 'Reserveer'
    },
    hero: {
      subtitle1: 'Een culinaire revolutie verpakt in bescheidenheid.',
      subtitle2: 'Est. 2026',
      cta: 'Bestel Nu Direct'
    },
    menu: {
      title: 'Menu',
      allergies: 'Allergieën? Laat het ons weten.',
      orderNow: 'Bestel via Orderflow'
    },
    footer: {
      visit: 'Bezoek Ons',
      street: 'Straatnaam 123',
      city: '1234 AB Stad',
      country: 'Nederland',
      contact: 'Contact',
      hoursTitle: 'Openingstijden',
      hoursDays: 'Wo - Zo',
      copyright: 'Test Resto. Created by The ConcisNetwork.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service'
    },
    reservation: {
      title: 'RESERVEER',
      step1Title: '1. Datum & Tijd',
      guests: 'Aantal Personen',
      person: 'Persoon',
      people: 'Personen',
      date: 'Datum',
      time: 'Tijd',
      chooseTable: 'Kies een Tafel',
      step2Title: '2. Selecteer een Tafel',
      step2Sub: 'Kies je gewenste plek in het restaurant.',
      back: 'Terug',
      confirm: 'Bevestig Reservering',
      step3Title: 'Tafel Bevestigd.',
      step3Desc1: 'We kijken ernaar uit je te verwelkomen op',
      step3Desc2: 'om',
      step3Desc3: 'uur aan tafel',
      step3Desc4: 'Een bevestiging is (niet echt) verzonden naar je email.',
      close: 'Sluiten',
      seats: 'seats'
    }
  },
  en: {
    nav: {
      menu: 'Menu',
      contact: 'Contact',
      order: 'Order',
      reserve: 'Book'
    },
    hero: {
      subtitle1: 'A culinary revolution wrapped in modesty.',
      subtitle2: 'Est. 2026',
      cta: 'Order Right Now'
    },
    menu: {
      title: 'Menu',
      allergies: 'Allergies? Please let us know.',
      orderNow: 'Order via Orderflow'
    },
    footer: {
      visit: 'Visit Us',
      street: 'Streetname 123',
      city: '1234 AB City',
      country: 'Netherlands',
      contact: 'Contact',
      hoursTitle: 'Opening Hours',
      hoursDays: 'Wed - Sun',
      copyright: 'Test Resto. Created by The ConcisNetwork.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service'
    },
    reservation: {
      title: 'RESERVATION',
      step1Title: '1. Date & Time',
      guests: 'Number of Guests',
      person: 'Person',
      people: 'People',
      date: 'Date',
      time: 'Time',
      chooseTable: 'Choose a Table',
      step2Title: '2. Select a Table',
      step2Sub: 'Choose your desired spot in the restaurant.',
      back: 'Back',
      confirm: 'Confirm Booking',
      step3Title: 'Table Confirmed.',
      step3Desc1: 'We look forward to welcoming you on',
      step3Desc2: 'at',
      step3Desc3: 'at table',
      step3Desc4: 'A confirmation has (not really) been sent to your email.',
      close: 'Close',
      seats: 'seats'
    }
  }
};

export const LanguageProvider = ({ children }) => {
  // Check local storage for language preference, robust fallback to 'nl'
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('site_language');
    return saved === 'en' ? 'en' : 'nl';
  });

  useEffect(() => {
    localStorage.setItem('site_language', language);
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'nl' ? 'en' : 'nl');
  };

  const t = (path) => {
    const keys = path.split('.');
    let result = translations[language];
    for (const key of keys) {
      if (result[key] === undefined) return path; // Fallback to key if missing
      result = result[key];
    }
    return result;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => useContext(LanguageContext);
