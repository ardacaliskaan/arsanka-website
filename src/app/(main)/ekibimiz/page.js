import TeamGrid from '@/components/TeamGrid';

export const metadata = {
  title: 'Ekibimiz | Arsanka Medya - Yaratıcı ve Deneyimli Kadro',
  description: 'Arsanka Medya\'nın yaratıcı ekibiyle tanışın. Deneyimli tasarımcılar, geliştiriciler ve pazarlama uzmanlarımızla markanızı öne çıkarıyoruz.',
  keywords: 'arsanka ekip, dijital ajans ekibi, tasarımcı, geliştirici, pazarlama uzmanı',
  alternates: {
    canonical: 'https://arsanka.com/ekibimiz',
  },
};

export default function Ekibimiz() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 sm:pt-40 sm:pb-28 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-red-600/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative max-w-4xl mx-auto px-6 sm:px-8">
          <div className="flex flex-col items-center text-center">
            <span className="inline-block text-red-500 text-[11px] sm:text-xs font-semibold tracking-[0.35em] uppercase mb-6">
              Ekibimiz
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight mb-8">
              Yaratıcı <span className="text-red-600">Ekibimiz</span>
            </h1>
            <p className="max-w-xl text-base sm:text-lg text-white/50 font-light leading-relaxed">
              Deneyimli ve tutkulu ekibimizle markanızı dijital dünyada öne çıkarıyoruz.
            </p>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-28 sm:py-36 bg-[#0a0a0a] border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <TeamGrid />
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-28 sm:py-36 bg-[#0a0a0a] border-t border-white/[0.04] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-red-600/5 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="relative max-w-3xl mx-auto px-6 sm:px-8">
          <div className="flex flex-col items-center text-center">
            <span className="inline-block text-red-500 text-[11px] sm:text-xs font-semibold tracking-[0.35em] uppercase mb-6">
              Kariyer
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">
              Ekibimize Katılın
            </h2>
            <p className="max-w-lg text-white/40 text-sm sm:text-base font-light leading-relaxed mb-10">
              Yetenekli ve tutkulu profesyonellerle çalışmak ister misiniz? Açık pozisyonlarımız için bizimle iletişime geçin.
            </p>
            <a
              href="/iletisim"
              className="px-10 py-4 bg-red-600 text-white text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:bg-red-700 hover:shadow-xl hover:shadow-red-600/20 hover:-translate-y-0.5"
            >
              Başvur
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
