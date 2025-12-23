import Hero from '@/components/Hero';
import Services from '@/components/Services';
import ClientSlider from '@/components/ClientSlider';
import ContactCTA from '@/components/ContactCTA';

export const metadata = {
  title: 'Arsanka Medya | Dijital Ajans - Web Tasarım & Sosyal Medya',
  description: 'Türkiye\'nin yaratıcı dijital ajansı. Web tasarım, sosyal medya yönetimi, kurumsal kimlik ve yazılım hizmetleri. Markanızı dijitalde öne çıkarıyoruz.',
  keywords: 'dijital ajans, web tasarım, sosyal medya yönetimi, kurumsal kimlik, yazılım geliştirme, türkiye, istanbul',
  alternates: {
    canonical: 'https://arsanka.com',
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <ClientSlider />
      <ContactCTA />
    </>
  );
}
