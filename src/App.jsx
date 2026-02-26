import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Menu from './components/Menu';
import Footer from './components/Footer';
import Reservation from './components/Reservation';
import { LanguageProvider } from './context/LanguageContext';
import './App.css';

function App() {
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  return (
    <LanguageProvider>
      <div className="App" id="home">
        <Navbar onOpenReservation={() => setIsReservationOpen(true)} />
        <Hero />
        <Menu />
        <Footer />
        
        {/* Framer motion handles exit animations inside Reservation component */}
        <Reservation 
          isOpen={isReservationOpen} 
          onClose={() => setIsReservationOpen(false)} 
        />
      </div>
    </LanguageProvider>
  );
}

export default App;
