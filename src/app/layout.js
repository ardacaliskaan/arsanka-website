import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'Arsanka Medya | Dijital Ajans',
  description: 'Markanıza dair her şey mevcut. Yazılım, sosyal medya ve kurumsal kimlik hizmetleriyle yanınızdayız.',
  keywords: 'dijital ajans, web tasarım, sosyal medya, kurumsal kimlik, yazılım, türkiye',
  authors: [{ name: 'Arsanka Medya' }],
  creator: 'Arsanka Medya',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://arsanka.com',
    siteName: 'Arsanka Medya',
    title: 'Arsanka Medya | Dijital Ajans',
    description: 'Markanıza dair her şey mevcut. Yazılım, sosyal medya ve kurumsal kimlik hizmetleriyle yanınızdayız.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arsanka Medya | Dijital Ajans',
    description: 'Markanıza dair her şey mevcut.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
