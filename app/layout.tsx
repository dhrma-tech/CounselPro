import type { Metadata } from 'next';
import { DM_Serif_Display, Outfit } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import GlobalBackground from '@/components/layout/GlobalBackground';
import PageTransition from '@/components/layout/PageTransition';

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-display',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-ui',
});

export const metadata: Metadata = {
  title: 'CounselPro | Expert College Admission Counselling',
  description: 'Expert Engineering, Medical and more admission counselling for students across India. Choose the right college for your rank, category, and future.',
  openGraph: {
    title: 'CounselPro | Expert College Admission Counselling',
    description: 'Expert guidance for Engineering, Medical and more.',
    url: 'https://counselpro.in',
    siteName: 'CounselPro',
    images: [{ url: '/images/og-image.png', width: 1200, height: 630 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${outfit.variable}`}>
      <body className="antialiased flex flex-col min-h-screen relative">
        <GlobalBackground />
        <Header />
        <PageTransition>
          <main className="pt-[var(--header-height,80px)]">
            {children}
          </main>
        </PageTransition>
        <Footer />
      </body>
    </html>
  );
}
