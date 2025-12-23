'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FadeUp, BlurFade, StaggerContainer, StaggerItem } from '@/components/ScrollAnimations';

export default function ClientSlider() {
  const [clients, setClients] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch('/api/clients')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setClients(data);
        }
        setIsLoaded(true);
      })
      .catch(() => {
        setIsLoaded(true);
      });
  }, []);

  // Marka sayısına göre ayarlar
  const clientCount = clients.length;
  
  // Minimum 8 kart için duplicate
  const getDisplayClients = () => {
    if (clientCount === 0) return [];
    if (clientCount >= 8) return [...clients, ...clients];
    
    // Az marka varsa çoğalt
    const repeatCount = Math.ceil(16 / clientCount);
    let result = [];
    for (let i = 0; i < repeatCount; i++) {
      result = [...result, ...clients];
    }
    return result;
  };

  // Animasyon hızı - az marka = yavaş, çok marka = hızlı
  const getAnimationDuration = () => {
    if (clientCount <= 3) return 20;
    if (clientCount <= 6) return 25;
    if (clientCount <= 10) return 30;
    return 35;
  };

  const displayClients = getDisplayClients();
  const animationDuration = getAnimationDuration();

  // Hiç müşteri yoksa gösterme
  if (isLoaded && clientCount === 0) {
    return null;
  }

  return (
    <section className="py-28 sm:py-36 bg-[#0a0a0a] border-t border-white/[0.04]">
      
      <BlurFade>
        <div className="max-w-6xl mx-auto px-6 sm:px-8 mb-20">
          <div className="flex flex-col items-center text-center">
            <span className="inline-block text-red-500 text-[11px] sm:text-xs font-semibold tracking-[0.35em] uppercase mb-6">
              Referanslarımız
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Hizmet Sunduğumuz Markalar
            </h2>
          </div>
        </div>
      </BlurFade>
      
      {clientCount > 0 && (
        <FadeUp delay={0.3}>
          <div className="relative overflow-hidden py-6">
            
            <div className="absolute left-0 top-0 bottom-0 w-32 sm:w-56 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 sm:w-56 bg-gradient-to-l from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent z-10 pointer-events-none" />
            
            <motion.div 
              className="flex"
              animate={{ x: [0, -50 * displayClients.length / 2] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: 'loop',
                  duration: animationDuration,
                  ease: 'linear',
                },
              }}
            >
              {displayClients.map((client, idx) => (
                <div
                  key={`${client._id}-${idx}`}
                  className="group relative flex-shrink-0 mx-3 sm:mx-4 w-56 sm:w-64 h-28 sm:h-32 bg-white/[0.02] border border-white/[0.06] overflow-hidden transition-all duration-500 hover:bg-white/[0.04] hover:border-red-600/30"
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    {client.logo ? (
                      <img 
                        src={client.logo} 
                        alt={client.name} 
                        className="max-h-10 sm:max-h-12 max-w-full object-contain opacity-50 group-hover:opacity-80 transition-opacity duration-300"
                      />
                    ) : (
                      <span className="text-white/20 text-sm font-medium tracking-wide group-hover:text-white/30 transition-colors duration-300">
                        {client.name}
                      </span>
                    )}
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-red-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>
              ))}
            </motion.div>
            
          </div>
        </FadeUp>
      )}
      
      <div className="max-w-4xl mx-auto px-6 sm:px-8 mt-20">
        <StaggerContainer staggerDelay={0.15} className="grid grid-cols-3 gap-8 sm:gap-12">
          <StaggerItem>
            <motion.div 
              className="text-center"
              whileInView={{ scale: [0.5, 1.1, 1] }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">100<span className="text-red-600">+</span></div>
              <div className="text-white/30 text-xs sm:text-sm font-light">Mutlu Müşteri</div>
            </motion.div>
          </StaggerItem>
          <StaggerItem>
            <motion.div 
              className="text-center"
              whileInView={{ scale: [0.5, 1.1, 1] }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">250<span className="text-red-600">+</span></div>
              <div className="text-white/30 text-xs sm:text-sm font-light">Tamamlanan Proje</div>
            </motion.div>
          </StaggerItem>
          <StaggerItem>
            <motion.div 
              className="text-center"
              whileInView={{ scale: [0.5, 1.1, 1] }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">5<span className="text-red-600">+</span></div>
              <div className="text-white/30 text-xs sm:text-sm font-light">Yıllık Deneyim</div>
            </motion.div>
          </StaggerItem>
        </StaggerContainer>
      </div>
      
    </section>
  );
}
