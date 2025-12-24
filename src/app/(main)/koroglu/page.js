export const metadata = {
  title: 'Köroğlu | Arsanka Medya',
  description: 'Köroğlu projesi detayları',
  robots: {
    index: false,
    follow: false,
  },
};

export default function Koroglu() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Köroğlu</h1>
          <p className="text-white/40">Proje Dokümanı</p>
        </div>
        
        <div className="bg-white/[0.02] border border-white/[0.06] p-2">
          <iframe 
            src="https://drive.google.com/file/d/1k8-WvSvm7oDRbraaIhhImThS-YX6K55b/preview"
            width="100%" 
            height="800px"
            style={{ border: 'none' }}
            allow="autoplay"
            title="Köroğlu PDF"
          />
        </div>
      </div>
    </main>
  );
}
