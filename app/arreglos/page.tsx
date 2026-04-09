"use client";
import React from 'react';
import { Ruler, Shirt, Scissors, ShoppingBag, MessageCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';

const INITIAL_SERVICES = [
  { id: 's1', name: 'Ruedo de Pantalón o Falda', basePrice: 4500, desc: 'Ajuste de largo estándar para pantalones de vestir, jeans o faldas.', icon: <Ruler strokeWidth={1.5} className="w-8 h-8" /> },
  { id: 's2', name: 'Entalle de Vestido o Camisa', basePrice: 8000, desc: '¿Compraste online y te queda grande? Lo ajustamos a tu silueta de forma perfecta.', icon: <Shirt strokeWidth={1.5} className="w-8 h-8" /> },
  { id: 's3', name: 'Cambio de Cierre', basePrice: 5500, desc: 'Reemplazo de cierres en camperas, pantalones o mochilas con costura reforzada.', icon: <Scissors strokeWidth={1.5} className="w-8 h-8" /> },
];

export default function ServicesPage() {
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen bg-[#FCFAFA] flex flex-col">
      <Navbar />
      <main className="grow max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16 w-full">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-rose-950 tracking-tight">Arreglos a Medida</h2>
            <p className="text-rose-950/60 text-lg font-light">Precios base estimados. El valor final se confirma al ver la prenda, pero podés ir armando tu pedido para agilizar.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {INITIAL_SERVICES.map(service => (
              <div key={service.id} className="group bg-white p-8 rounded-4xl border border-rose-50 hover:border-rose-100 hover:shadow-2xl hover:shadow-rose-100/50 transition-all duration-500 flex flex-col h-full relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-rose-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-8 text-rose-300 group-hover:text-rose-400 group-hover:scale-110 transition-all duration-500 origin-left">{service.icon}</div>
                  <h3 className="text-2xl font-serif text-rose-950 mb-3 leading-tight">{service.name}</h3>
                  <p className="text-rose-950/60 font-light leading-relaxed grow mb-10">{service.desc}</p>
                  <div className="flex items-end justify-between mt-auto">
                    <div>
                      <span className="text-[10px] tracking-widest uppercase text-rose-400 font-semibold mb-1 block">DESDE</span>
                      <span className="text-3xl font-serif text-rose-950">${service.basePrice}</span>
                    </div>
                    <button onClick={() => addToCart(service, 'service')} className="w-12 h-12 rounded-full bg-rose-50 text-rose-900 flex items-center justify-center hover:bg-rose-900 hover:text-white transition-all shadow-sm">
                      <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-20 bg-rose-950 rounded-[2.5rem] p-10 md:p-16 text-center flex flex-col items-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-rose-400 via-transparent to-transparent"></div>
            <Scissors className="w-10 h-10 text-rose-300 mb-6 relative z-10" strokeWidth={1} />
            <h3 className="text-3xl md:text-4xl font-serif text-white mb-4 relative z-10">¿Necesitas algo específico?</h3>
            <p className="text-rose-100/70 font-light max-w-lg mb-10 relative z-10 text-lg">Si tu prenda necesita una transformación completa, mandanos un mensaje directo con fotos para una cotización.</p>
            <button onClick={() => window.open('https://wa.me/5491100000000', '_blank')} className="bg-rose-300 text-rose-950 px-8 py-4 rounded-full text-sm tracking-wide font-bold hover:bg-rose-200 transition-colors flex items-center gap-2 relative z-10 shadow-xl shadow-rose-950/50">
              <MessageCircle className="w-5 h-5" strokeWidth={2} /> CONSULTAR POR WHATSAPP
            </button>
          </div>
        </div>
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}