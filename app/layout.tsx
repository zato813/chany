import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif', display: 'swap' });
const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });

export const metadata: Metadata = {
  title: 'Chany - Taller de Alta Costura en San Juan',
  description: 'Arreglos de ropa a medida y alta costura.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-[#FCFAFA] font-sans text-rose-950 antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
