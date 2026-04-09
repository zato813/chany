"use client";

import React, { useState } from 'react';
import { Star, ChevronRight } from 'lucide-react';
import ProductModal from '@/components/ProductModal';
import CartDrawer from '@/components/CartDrawer';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { HomeHeroShowcase, WorkshopCarouselSection } from '@/components/HomeMediaShowcase';
import { HomeShowcaseProvider } from '@/context/HomeShowcaseContext';

/* ============================================================================
   1. HOME VIEW 
   ============================================================================ */
const HomeView = () => (
  <div className="space-y-16 md:space-y-24 animate-in fade-in duration-700">
    <section className="relative flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-20">
      <div className="w-full md:w-1/2 space-y-6 md:space-y-8 z-10 order-2 md:order-1 text-center md:text-left flex flex-col items-center md:items-start">
        <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-rose-400 mb-2 bg-rose-50 px-3 py-1.5 rounded-full md:bg-transparent md:p-0 md:rounded-none">
          <Star className="w-3.5 h-3.5" strokeWidth={2} /> Más de 30 años de experiencia
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-rose-950 leading-[1.1] tracking-tight">
          Tu ropa, <br className="hidden sm:block"/><span className="text-rose-400 italic font-light">hecha a tu medida.</span>
        </h1>
        <p className="text-base sm:text-lg text-rose-950/60 leading-relaxed font-light max-w-md">
          Transformamos tus compras de Shein, Temu o cualquier tienda con costura industrial y terminaciones de calidad boutique.
        </p>
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-4 w-full sm:w-auto">
          <button onClick={() => window.location.href = '/arreglos'} className="w-full sm:w-auto justify-center bg-rose-900 text-white px-8 py-4 rounded-full text-sm tracking-wide font-medium hover:bg-rose-800 transition-all shadow-xl shadow-rose-900/10 flex items-center gap-2">
            VER ARREGLOS <ChevronRight className="w-4 h-4" />
          </button>
          <button onClick={() => window.location.href = '/tienda'} className="w-full sm:w-auto justify-center bg-transparent text-rose-950 px-8 py-4 rounded-full text-sm tracking-wide font-medium hover:bg-rose-50 transition-colors border border-rose-200">
            LA TIENDA
          </button>
        </div>
      </div>
      <div className="w-full md:w-1/2 relative order-1 md:order-2">
        <HomeHeroShowcase />
      </div>
    </section>

    <section className="pt-20 border-t border-rose-100/50">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-serif text-rose-950">El proceso</h2>
        <p className="text-rose-950/50 mt-3 font-light text-lg">Simple, rápido y personalizado.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto">
        {[
          { step: '01', title: 'Elegí', desc: 'Seleccioná el arreglo o pedí tu presupuesto online.' },
          { step: '02', title: 'Cotizá', desc: 'Armá el carrito y envianos el pedido con tus fotos.' },
          { step: '03', title: 'Transformá', desc: 'Magia en el taller con terminaciones premium.' }
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center text-center space-y-4 group">
            <span className="text-5xl font-serif text-rose-200 italic group-hover:text-rose-300 transition-colors duration-500">{item.step}</span>
            <h3 className="text-lg tracking-wide font-medium text-rose-950">{item.title}</h3>
            <p className="text-rose-950/60 font-light max-w-50 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>

    <WorkshopCarouselSection />
  </div>
);

export default function HomePage() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  return (
    <div className="min-h-screen bg-[#FCFAFA] font-sans text-rose-950 selection:bg-rose-200 selection:text-rose-900 flex flex-col">
      <Navbar />
      
      <main className="grow max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16 w-full">
        <HomeShowcaseProvider>
          <HomeView />
        </HomeShowcaseProvider>
      </main>

      <Footer />
      
      <ProductModal selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} />
      <CartDrawer />
    </div>
  );
}