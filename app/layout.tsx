import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFab from '@/components/WhatsAppFab';

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif', display: 'swap' });
const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });

export const metadata: Metadata = {
  title: 'Chany - Taller de Alta Costura en San Juan',
  description: 'Arreglos de ropa a medida, costura industrial y terminaciones boutique en San Juan. Pedidos online vía WhatsApp.',
  openGraph: {
    title: 'Chany - Taller de Alta Costura',
    description: 'Transformamos tus prendas con calidad premium. Pedí tu presupuesto por WhatsApp.',
    url: 'https://chany.com.ar', // TODO: Reemplazar por tu dominio real
    siteName: 'Chany Alta Costura',
    images: [
      {
        url: '/hero/hero-hilos.jpg',
        width: 1200,
        height: 630,
        alt: 'Chany Taller de Alta Costura - Hilos de colores',
      },
    ],
    locale: 'es_AR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chany - Taller de Alta Costura',
    description: 'Arreglos de ropa a medida y costura industrial en San Juan.',
    images: ['/hero/hero-hilos.jpg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-[#FCFAFA] font-sans text-rose-950 antialiased overflow-x-hidden">
        <Providers>
          {children}
          <WhatsAppFab />
        </Providers>
      </body>
    </html>
  );
}
