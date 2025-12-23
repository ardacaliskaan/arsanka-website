'use client';

import { FadeUp, StaggerContainer, StaggerItem, BlurFade } from '@/components/ScrollAnimations';

export default function Services() {
  const services = [
    {
      number: '01',
      title: 'Yazılım Hizmetleri',
      description: 'Markanızın dijital dünyada güçlü bir şekilde var olması için profesyonel yazılım çözümleri sunuyoruz.',
      items: ['Kurumsal Web Sitesi', 'E-Ticaret Sistemleri', 'Mobil Uygulama', 'Özel Yazılım'],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    },
    {
      number: '02',
      title: 'Sosyal Medya',
      description: 'Stratejik sosyal medya yönetimi ile markanızın dijital varlığını güçlendiriyoruz.',
      items: ['İçerik Üretimi', 'Reklam Yönetimi', 'Topluluk Yönetimi', 'Analiz ve Raporlama'],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
        </svg>
      ),
    },
    {
      number: '03',
      title: 'Kurumsal Kimlik',
      description: 'Markanızı doğru temellere oturtarak profesyonel bir kimlik oluşturuyoruz.',
      items: ['Logo Tasarımı', 'Marka Kılavuzu', 'Kartvizit Tasarımı', 'Ambalaj Tasarımı'],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-28 sm:py-36 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <BlurFade>
          <div className="flex flex-col items-center text-center mb-20">
            <span className="inline-block text-red-500 text-[11px] sm:text-xs font-semibold tracking-[0.35em] uppercase mb-6">
              Hizmetlerimiz
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Markanıza Dair Her Şey
            </h2>
          </div>
        </BlurFade>
        
        {/* Services Grid */}
        <StaggerContainer staggerDelay={0.2} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => (
            <StaggerItem key={service.number}>
              <div className="group relative h-full bg-gradient-to-b from-white/[0.03] to-transparent border border-white/[0.06] p-8 sm:p-10 card-glow overflow-hidden">
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Background number */}
                <div className="absolute -right-4 -top-4 text-[120px] font-bold text-white/[0.02] leading-none pointer-events-none select-none">
                  {service.number}
                </div>
                
                {/* Icon */}
                <div className="relative w-12 h-12 bg-red-600/10 border border-red-600/20 flex items-center justify-center mb-8 text-red-500 group-hover:bg-red-600/20 group-hover:border-red-600/40 transition-all duration-500">
                  {service.icon}
                </div>
                
                {/* Number badge */}
                <span className="relative inline-block text-red-600 text-[10px] font-bold tracking-[0.3em] mb-4">
                  {service.number}
                </span>
                
                {/* Title */}
                <h3 className="relative text-lg sm:text-xl font-semibold text-white mb-4 tracking-tight group-hover:text-white transition-colors">
                  {service.title}
                </h3>
                
                {/* Description */}
                <p className="relative text-white/40 text-sm font-light leading-relaxed mb-8">
                  {service.description}
                </p>
                
                {/* Items */}
                <ul className="relative space-y-3">
                  {service.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-white/30 text-sm group-hover:text-white/40 transition-colors">
                      <span className="w-1.5 h-1.5 bg-red-600/60 rounded-full flex-shrink-0 group-hover:bg-red-600 transition-colors" />
                      {item}
                    </li>
                  ))}
                </ul>
                
                {/* Bottom gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-red-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
        
      </div>
    </section>
  );
}