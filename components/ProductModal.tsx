"use client";
import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Star, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

interface ProductModalProps {
  selectedProduct: any;
  setSelectedProduct: (product: any) => void;
}

export default function ProductModal({ selectedProduct, setSelectedProduct }: ProductModalProps) {
  const { addToCart } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => { setCurrentImageIndex(0); }, [selectedProduct]);

  if (!selectedProduct) return null;

  const nextImage = (e: any) => { e.stopPropagation(); setCurrentImageIndex((prev) => (prev + 1) % selectedProduct.images.length); };
  const prevImage = (e: any) => { e.stopPropagation(); setCurrentImageIndex((prev) => (prev - 1 + selectedProduct.images.length) % selectedProduct.images.length); };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-rose-950/40 backdrop-blur-sm transition-opacity" onClick={() => setSelectedProduct(null)}></div>
      <div className="relative w-full max-w-5xl bg-white rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row overflow-hidden animate-in fade-in zoom-in-95 duration-500 max-h-[95vh] md:max-h-[85vh]">
        <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 md:top-6 md:right-6 z-20 p-2.5 bg-white/80 backdrop-blur-md rounded-full text-rose-950/50 hover:text-rose-950 transition-colors shadow-sm"><X className="w-5 h-5" strokeWidth={1.5} /></button>
        
        <div className="w-full md:w-1/2 h-64 sm:h-80 md:h-auto relative bg-rose-50 flex-shrink-0 group">
          <Image src={selectedProduct.images[currentImageIndex]} alt={selectedProduct.name} fill className="object-cover transition-opacity duration-500" sizes="(max-width: 768px) 100vw, 50vw" />
          {selectedProduct.images.length > 1 && (
            <>
              <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-rose-950 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all shadow-lg hover:bg-rose-900 hover:text-white"><ChevronLeft className="w-5 h-5" /></button>
              <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-rose-950 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all shadow-lg hover:bg-rose-900 hover:text-white"><ChevronRight className="w-5 h-5" /></button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {selectedProduct.images.map((_: any, i: number) => ( <button key={i} onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(i); }} className={`transition-all duration-300 rounded-full z-10 ${i === currentImageIndex ? 'w-6 h-2 bg-rose-900' : 'w-2 h-2 bg-rose-900/30 hover:bg-rose-900/50'}`} /> ))}
              </div>
            </>
          )}
        </div>
        
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col overflow-y-auto">
          <div className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-rose-400 mb-6 bg-rose-50 px-3 py-1.5 rounded-full w-fit"><Star className="w-3.5 h-3.5" strokeWidth={2} /> Diseño Exclusivo</div>
          <h3 className="text-3xl md:text-4xl font-serif text-rose-950 mb-4 leading-tight">{selectedProduct.name}</h3>
          <span className="text-3xl font-serif text-rose-950 mb-8 block">${selectedProduct.price}</span>
          <div className="w-12 h-px bg-rose-100 mb-8"></div>
          <p className="text-rose-950/60 font-light leading-relaxed mb-8 flex-grow">{selectedProduct.desc}</p>
          <button onClick={() => { addToCart(selectedProduct, 'product'); setSelectedProduct(null); }} className="w-full bg-rose-900 text-white py-4 rounded-full text-xs sm:text-sm tracking-widest font-bold hover:bg-rose-800 transition-all shadow-xl shadow-rose-900/20 flex items-center justify-center gap-2 mt-auto">
            <ShoppingBag className="w-5 h-5" strokeWidth={1.5} /> AGREGAR AL CARRITO
          </button>
        </div>
      </div>
    </div>
  );
}