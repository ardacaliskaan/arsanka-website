'use client';

import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
      
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/arsanka-hero.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay - daha az karanlık */}
        <div className="absolute inset-0 bg-black/50" />
        {/* Bottom gradient - sadece alta doğru */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a]" />
      </div>
      
      {/* Main content container */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* All content centered */}
        <div className="flex flex-col items-center text-center">
          
          {/* Top label */}
          <span className="inline-block text-red-500 text-[11px] sm:text-xs font-semibold tracking-[0.35em] uppercase mb-8 drop-shadow-lg">
            Türkiye'nin Reklam Ajansı
          </span>
          
          {/* Logo */}
          <div className="mb-8">
            <Image 
              src="/arsanka-logo.avif" 
              alt="Arsanka Medya" 
              width={400} 
              height={100} 
              className="h-16 sm:h-20 md:h-24 w-auto drop-shadow-2xl"
              priority
            />
          </div>
          
          {/* Subtitle */}
          <p className="max-w-xl text-base sm:text-lg text-white/80 font-light leading-relaxed mb-14 drop-shadow-lg">
            Markanıza dair her şey mevcut. Kaliteli görseller ve doğru pazarlama stratejileriyle markanızın değerine değer katıyoruz.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <a 
              href="/hizmetlerimiz"
              className="group relative w-full sm:w-auto px-10 py-4 bg-red-600 text-white text-sm font-semibold tracking-wider uppercase text-center overflow-hidden transition-all duration-300 hover:bg-red-700 hover:shadow-xl hover:shadow-red-600/20 hover:-translate-y-0.5"
            >
              <span className="relative z-10">Hizmetlerimiz</span>
            </a>
            <a 
              href="/iletisim"
              className="w-full sm:w-auto px-10 py-4 bg-white/10 backdrop-blur-sm text-white text-sm font-semibold tracking-wider uppercase text-center border border-white/30 transition-all duration-300 hover:bg-white/20 hover:border-white/50 hover:-translate-y-0.5"
            >
              İletişim
            </a>
          </div>
          
        </div>
      </div>
      
      {/* Bottom scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-[1px] h-16 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
      
    </section>
  );
}