// Using the sticky side navigation design
import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from '../context/LanguageContext';
import './Menu.css';

const API_URL = 'https://beaming-crow-316.convex.site/api/menu?slug=test';

const formatPrice = (cents) => {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
  }).format(cents / 100);
};

const MenuItem = ({ item, showImages }) => {
  return (
    <motion.div 
      className="s-menu-card interactive"
      whileHover="hover"
      initial="rest"
    >
      <div className="s-menu-card-content">
        <div className="s-menu-card-header">
          <h3 className="s-menu-item-name">{item.name}</h3>
          <span className="s-menu-item-price">{formatPrice(item.price_cents)}</span>
        </div>
        {item.description && (
          <p className="s-menu-item-desc">{item.description}</p>
        )}
      </div>
      
      {showImages && (item.image_url || item.imageUrl) && (
        <motion.div 
          className="s-menu-card-image-wrap"
          variants={{
            rest: { width: "0%", opacity: 0 },
            hover: { width: "160px", opacity: 1 }
          }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          <img 
            src={item.image_url || item.imageUrl} 
            alt={item.name}
            className="s-menu-img"
            loading="lazy"
          />
        </motion.div>
      )}
    </motion.div>
  );
};

const MenuCategory = ({ group, showImages }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

  return (
    <section ref={ref} id={`category-${group.name.replace(/\s+/g, '-').toLowerCase()}`} className="s-menu-section">
      <motion.h2 
        className="s-category-title"
        initial={{ y: 50, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {group.name}
      </motion.h2>
      <div className="s-menu-items-list">
        {group.items.map((item, idx) => (
          <motion.div
            key={item._id || idx}
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <MenuItem item={item} showImages={showImages} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Menu = () => {
  const [data, setData] = useState(null);
  const [activeCategory, setActiveCategory] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch("https://beaming-crow-316.convex.site/api/menu?slug=test", {
          cache: 'no-store'
        });
        const result = await response.json();
        
        if (result.error) {
          console.error("Failed to load menu:", result.error);
          return;
        }

        const showImages = result.restaurant?.show_menu_images ?? result.restaurant?.showMenuImages ?? false;
        
        // Group items by category_id directly from the items array
        const grouped = {};
        if (result.items && Array.isArray(result.items)) {
          result.items.forEach(item => {
            if (!grouped[item.category_id]) {
              grouped[item.category_id] = [];
            }
            grouped[item.category_id].push(item);
          });
        }

        setData({
          restaurantName: result.restaurant?.name || "Restaurant",
          categories: result.categories || [],
          itemsByCategory: grouped,
          showImages: showImages
        });

        if (result.categories && result.categories.length > 0) {
          setActiveCategory(result.categories[0]._id);
        }

      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };

    fetchMenu();
  }, []);

  useEffect(() => {
    if (!data) return;
    const handleScroll = () => {
      const sections = document.querySelectorAll('.s-menu-section');
      let currentId = '';
      
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 250) {
          currentId = section.getAttribute('id');
        }
      });

      if (!currentId && sections.length > 0) {
        currentId = sections[0].getAttribute('id');
      }

      if (currentId) setActiveCategory(currentId);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [data]);

  const scrollToCategory = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 150;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  if (!data) return <div className="s-menu-loading">Loading pure aesthetics...</div>;

  return (
    <section id="menu-section" className="s-menu-container">
      <div className="s-menu-layout">
        <aside className="s-menu-sidebar">
          <div className="s-sidebar-sticky">
            <h4 className="s-sidebar-title">{t('menu.title')}</h4>
            <nav className="s-sidebar-nav">
              {data.categories.map(cat => (
                <button
                  key={cat._id}
                  className={`s-nav-btn interactive ${activeCategory === cat._id ? 'active' : ''}`}
                  onClick={() => scrollToCategory(cat._id)}
                >
                  {cat.name}
                </button>
              ))}
            </nav>

            {/* Menu CTA added here per user request */}
            <a 
              href="https://www.concisorderflow.com/test" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="s-special-order-cta interactive"
            >
              {t('menu.orderNow')}
            </a>

            <div className="s-sidebar-info" style={{ marginTop: '2.5rem' }}>
              <p>{t('menu.allergies')}</p>
            </div>
          </div>
        </aside>

        <main className="s-menu-main">
          {data.categories.map(cat => (
            <section key={cat._id} id={cat._id} className="s-menu-section">
              <h2 className="s-category-title">{cat.name}</h2>
              <div className="s-menu-items-list">
                {data.itemsByCategory[cat._id]?.map(item => (
                  <motion.div 
                    key={item._id} 
                    className="s-menu-card interactive"
                    initial="rest"
                    whileHover="hover"
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    style={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="s-menu-card-content">
                      <div className="s-menu-card-header">
                        <h3 className="s-menu-item-name">{item.name}</h3>
                        <span className="s-menu-item-price">€{(item.price_cents / 100).toFixed(2)}</span>
                      </div>
                      {item.description && <p className="s-menu-item-desc">{item.description}</p>}
                    </div>
                    
                    {data.showImages && (item.image_url || item.imageUrl) && (
                      <motion.div 
                        className="s-menu-card-image-wrap"
                        variants={{
                          rest: { width: "0%", opacity: 0 },
                          hover: { width: "160px", opacity: 1 }
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      >
                        <img 
                          src={item.image_url || item.imageUrl} 
                          alt={item.name} 
                          className="s-menu-img"
                          loading="lazy"
                        />
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </section>
          ))}
        </main>
      </div>
    </section>
  );
};

export default Menu;
