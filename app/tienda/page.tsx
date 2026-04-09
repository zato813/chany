"use client";
import React, { useState } from 'react';
import { ShoppingBag, Loader2 } from 'lucide-react';
import { useData } from '@/context/DataContext';
import { useCart } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import ProductModal from '@/components/ProductModal';

export default function ShopPage() {
  const { productsList, productsLoading } = useData();
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  return (
    <div className="min-h-screen bg-[#FCFAFA] flex flex-col">
      <Navbar />
      <main className="grow max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16 w-full">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-rose-950 tracking-tight">Creaciones</h2>
            <p className="text-rose-950/60 text-lg font-light">Diseños exclusivos confeccionados en nuestro taller con calidad industrial y mucho amor.</p>
          </div>
          {productsLoading ? (
            <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-rose-300 animate-spin" /></div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {productsList.length === 0 ? (
                <div className="col-span-full text-center py-12 text-rose-950/40">No hay productos publicados actualmente.</div>
              ) : (
                productsList.map(product => (
                  <div key={product.id} className="group cursor-pointer flex flex-col" onClick={() => setSelectedProduct(product)}>
                    <div className="aspect-4/5 rounded-4xl overflow-hidden mb-6 relative shadow-sm group-hover:shadow-2xl group-hover:shadow-rose-100/50 transition-all duration-500">
                      <img src={product.images?.[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                      <div className="absolute inset-0 bg-rose-950/0 group-hover:bg-rose-950/10 transition-colors duration-500"></div>
                      <button onClick={(e) => { e.stopPropagation(); addToCart(product, 'product'); }} className="absolute bottom-5 right-5 w-14 h-14 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-rose-950 hover:bg-rose-900 hover:text-white transition-all shadow-lg opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 duration-500">
                        <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
                      </button>
                    </div>
                    <h3 className="text-xl font-serif text-rose-950 mb-2 leading-tight">{product.name}</h3>
                    <p className="text-rose-950/50 font-light text-sm mb-4 line-clamp-2 leading-relaxed">{product.desc}</p>
                    <span className="text-2xl font-serif text-rose-950 mt-auto">${product.price}</span>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
      <CartDrawer />
      <ProductModal selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} />
    </div>
  );
}