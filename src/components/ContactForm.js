'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
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
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({ type: 'success', message: 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.' });
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setStatus({ type: 'error', message: data.error || 'Bir hata oluştu. Lütfen tekrar deneyin.' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Bir hata oluştu. Lütfen tekrar deneyin.' });
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-white text-xs font-medium tracking-wide uppercase mb-3">
            Ad Soyad
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full bg-white/[0.02] border border-white/[0.08] px-5 py-4 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-red-600/50 transition-colors"
            placeholder="Adınız Soyadınız"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-white text-xs font-medium tracking-wide uppercase mb-3">
            E-posta
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-white/[0.02] border border-white/[0.08] px-5 py-4 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-red-600/50 transition-colors"
            placeholder="ornek@email.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className="block text-white text-xs font-medium tracking-wide uppercase mb-3">
            Telefon
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full bg-white/[0.02] border border-white/[0.08] px-5 py-4 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-red-600/50 transition-colors"
            placeholder="+90 5XX XXX XX XX"
          />
        </div>
        <div>
          <label htmlFor="subject" className="block text-white text-xs font-medium tracking-wide uppercase mb-3">
            Konu
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full bg-white/[0.02] border border-white/[0.08] px-5 py-4 text-white text-sm focus:outline-none focus:border-red-600/50 transition-colors appearance-none cursor-pointer"
          >
            <option value="" className="bg-[#0a0a0a]">Seçiniz</option>
            <option value="yazilim" className="bg-[#0a0a0a]">Yazılım Hizmetleri</option>
            <option value="sosyal-medya" className="bg-[#0a0a0a]">Sosyal Medya</option>
            <option value="kurumsal-kimlik" className="bg-[#0a0a0a]">Kurumsal Kimlik</option>
            <option value="dijital-pazarlama" className="bg-[#0a0a0a]">Dijital Pazarlama</option>
            <option value="diger" className="bg-[#0a0a0a]">Diğer</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-white text-xs font-medium tracking-wide uppercase mb-3">
          Mesajınız
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="w-full bg-white/[0.02] border border-white/[0.08] px-5 py-4 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-red-600/50 transition-colors resize-none"
          placeholder="Projeniz hakkında kısa bilgi verin..."
        />
      </div>

      {status.message && (
        <div className={`p-4 text-sm ${status.type === 'success' ? 'bg-green-600/10 border border-green-600/20 text-green-500' : 'bg-red-600/10 border border-red-600/20 text-red-500'}`}>
          {status.message}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full px-10 py-5 bg-red-600 text-white text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:bg-red-700 hover:shadow-xl hover:shadow-red-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Gönderiliyor...' : 'Mesaj Gönder'}
      </button>
    </form>
  );
}
