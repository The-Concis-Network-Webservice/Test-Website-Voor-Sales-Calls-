import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';
import './Reservation.css';

const Reservation = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: '2',
    table: null
  });
  const { t } = useTranslation();

  // Mock tables
  const tables = [
    { id: 'T1', type: 'Window', seats: 2 },
    { id: 'T2', type: 'Window', seats: 4 },
    { id: 'T3', type: 'Center', seats: 2 },
    { id: 'T4', type: 'Center', seats: 6 },
    { id: 'T5', type: 'Private', seats: 4 },
    { id: 'T6', type: 'Bar', seats: 2 },
  ];

  const handleClose = () => {
    setTimeout(() => {
      setStep(1);
      setFormData({ date: '', time: '', guests: '2', table: null });
    }, 500);
    onClose();
  };

  const handleNext = () => setStep(step + 1);
  
  const handleSelectTable = (id) => {
    setFormData({ ...formData, table: id });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(3); // Success step
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="res-overlay"
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: "0%" }}
          exit={{ opacity: 0, y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
        >
          <button className="res-close-btn interactive" onClick={handleClose}>
            <X size={32} />
          </button>

          <div className="res-content">
            <div className="res-header">
              <h1>{t('reservation.title')}</h1>
            </div>

            <div className="res-body">
              {step === 1 && (
                <motion.div 
                  className="res-step"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                >
                  <h2 className="step-title">{t('reservation.step1Title')}</h2>
                  <div className="form-group">
                    <label>{t('reservation.guests')}</label>
                    <select 
                      value={formData.guests}
                      onChange={(e) => setFormData({...formData, guests: e.target.value})}
                      className="res-input"
                    >
                      {[1,2,3,4,5,6,7,8].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? t('reservation.person') : t('reservation.people')}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-row">
                    <div className="form-group flex-1">
                      <label>{t('reservation.date')}</label>
                      <input 
                        type="date" 
                        className="res-input"
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                      />
                    </div>
                    <div className="form-group flex-1">
                      <label>{t('reservation.time')}</label>
                      <input 
                        type="time" 
                        className="res-input"
                        min="17:30" max="23:00"
                        value={formData.time}
                        onChange={(e) => setFormData({...formData, time: e.target.value})}
                      />
                    </div>
                  </div>
                  <button 
                    className="res-btn-primary interactive"
                    onClick={handleNext}
                    disabled={!formData.date || !formData.time}
                  >
                    {t('reservation.chooseTable')}
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                  className="res-step"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <h2 className="step-title">{t('reservation.step2Title')}</h2>
                  <p className="res-subtitle">{t('reservation.step2Sub')}</p>
                  
                  <div className="table-grid">
                    {tables.map(table => (
                      <div 
                        key={table.id}
                        className={`table-node interactive ${formData.table === table.id ? 'selected' : ''}`}
                        onClick={() => handleSelectTable(table.id)}
                      >
                        <span className="table-id">{table.id}</span>
                        <span className="table-type">{table.type}</span>
                        <span className="table-seats">{table.seats} {t('reservation.seats')}</span>
                      </div>
                    ))}
                  </div>

                  <div className="step-actions">
                    <button className="res-btn-secondary interactive" onClick={() => setStep(1)}>
                      {t('reservation.back')}
                    </button>
                    <button 
                      className="res-btn-primary interactive"
                      onClick={handleSubmit}
                      disabled={!formData.table}
                    >
                      {t('reservation.confirm')}
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div 
                  className="res-step success-step"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="success-icon">
                    <Check size={64} />
                  </div>
                  <h2 className="step-title">{t('reservation.step3Title')}</h2>
                  <p className="res-subtitle">
                    {t('reservation.step3Desc1')} {formData.date} {t('reservation.step3Desc2')} {formData.time} {t('reservation.step3Desc3')} {formData.table}. 
                    <br/><br/>{t('reservation.step3Desc4')}
                  </p>
                  <button className="res-btn-primary interactive mt-8" onClick={handleClose}>
                    {t('reservation.close')}
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Reservation;
