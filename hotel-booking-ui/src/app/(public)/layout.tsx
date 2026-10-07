import type { Metadata } from 'next';
import '../globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';

export const metadata: Metadata = {
  title: 'Tantor Resort — luxury beach & jungle sanctuary',
  description:
    'Experience oceanfront villas, private pools, holistic wellness, and tropical elegance at Tantor Resort.',
  keywords: ['resort', 'hotel booking', 'ocean villa', 'beachfront chalet', 'luxury stay'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#faf8f5] text-[#1e293b]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
