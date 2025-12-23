'use client';

import { useState } from 'react';
import { SlideLeft, SlideRight, FadeUp } from '@/components/ScrollAnimations';

export default function ContactCTA() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, subject: 'Hızlı İletişim Formu' }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({ type: 'success', message: 'Mesajınız gönderildi!' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus({ type: 'error', message: 'Bir hata oluştu.' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Bir hata oluştu.' });
    }

    setLoading(false);
  };

  return (
    <section className="py-28 sm:py-36 bg-[#0a0a0a] border-t border-white/[0.04] relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-red-600/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="relative max-w-6xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left - Text Content */}
          <SlideLeft duration={1}>
            <div className="text-center lg:text-left">
              <span className="inline-block text-red-500 text-[11px] sm:text-xs font-semibold tracking-[0.35em] uppercase mb-6">
                Hemen Başlayalım
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
                Projeniz İçin <span className="text-red-600">Teklif</span> Alın
              </h2>
              <p className="text-white/40 text-sm sm:text-base font-light leading-relaxed mb-8">
                Markanızı bir adım öne taşımak için bizimle iletişime geçin. Size özel çözümler sunmak için sabırsızlanıyoruz.
              </p>
              
              {/* Features */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                <FadeUp delay={0.3}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-600/10 border border-red-600/20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-white/50 text-sm">Ücretsiz Danışmanlık</span>
                  </div>
                </FadeUp>
                <FadeUp delay={0.4}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-600/10 border border-red-600/20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-white/50 text-sm">Hızlı Dönüş</span>
                  </div>
                </FadeUp>
                <FadeUp delay={0.5}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-600/10 border border-red-600/20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-white/50 text-sm">Profesyonel Ekip</span>
                  </div>
                </FadeUp>
              </div>
            </div>
          </SlideLeft>
          
          {/* Right - Form */}
          <SlideRight duration={1} delay={0.2}>
            <div className="bg-white/[0.02] border border-white/[0.06] p-8 sm:p-10">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/[0.03] border border-white/[0.08] px-5 py-4 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-red-600/50 transition-colors"
                    placeholder="Ad Soyad *"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/[0.03] border border-white/[0.08] px-5 py-4 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-red-600/50 transition-colors"
                    placeholder="E-posta Adresi *"
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full bg-white/[0.03] border border-white/[0.08] px-5 py-4 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-red-600/50 transition-colors resize-none"
                    placeholder="Projeniz hakkında kısaca bilgi verin *"
                  />
                </div>
                
                {/* Status */}
                {status.message && (
                  <div className={`p-3 text-sm text-center ${status.type === 'success' ? 'bg-green-600/10 text-green-500' : 'bg-red-600/10 text-red-500'}`}>
                    {status.message}
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-8 py-4 bg-red-600 text-white text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:bg-red-700 hover:shadow-lg hover:shadow-red-600/20 disabled:opacity-50"
                >
                  {loading ? 'Gönderiliyor...' : 'Teklif Al'}
                </button>
              </form>
            </div>
          </SlideRight>
          
        </div>
      </div>
    </section>
  );
}