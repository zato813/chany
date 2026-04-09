"use client";
import { ShoppingBag, X, ArrowLeft, Trash2, ChevronRight, MessageCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function CartDrawer() {
  const { 
    cart, isCartOpen, setIsCartOpen, isCheckoutStep, setIsCheckoutStep, 
    customer, setCustomer, cartTotal, removeFromCart, handleCheckout 
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-rose-950/20 backdrop-blur-sm transition-opacity" onClick={() => { setIsCartOpen(false); setIsCheckoutStep(false); }}></div>
      <div className="relative w-full sm:max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-500">
        <div className="p-6 md:p-8 border-b border-rose-50 flex items-center justify-between">
          {isCheckoutStep ? (
            <button onClick={() => setIsCheckoutStep(false)} className="flex items-center gap-2 text-rose-950 hover:text-rose-400 transition-colors">
              <ArrowLeft className="w-5 h-5" strokeWidth={2} /> <span className="text-lg font-serif">Volver</span>
            </button>
          ) : (
            <h2 className="text-xl md:text-2xl font-serif text-rose-950 flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-rose-400" strokeWidth={2} /> Tu Pedido
            </h2>
          )}
          <button onClick={() => { setIsCartOpen(false); setIsCheckoutStep(false); }} className="p-2 text-rose-950/40 hover:text-rose-950 bg-rose-50/50 rounded-full transition-colors">
            <X className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>
        
        <div className="flex-grow overflow-y-auto p-6 md:p-8">
          {!isCheckoutStep ? (
            <div className="space-y-6 h-full">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-rose-950/30 space-y-6">
                  <ShoppingBag className="w-16 h-16 opacity-20" strokeWidth={1} />
                  <p className="font-light">Tu carrito está vacío</p>
                  <Link href="/arreglos" onClick={() => setIsCartOpen(false)} className="text-sm tracking-wide font-medium text-rose-400 hover:text-rose-500 transition-colors">VER SERVICIOS</Link>
                </div>
              ) : (
                cart.map((item: any) => (
                  <div key={item.cartId} className="group flex gap-4 pb-6 border-b border-rose-50 last:border-0 last:pb-0">
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-rose-950 pr-4">{item.name}</h4>
                        <button onClick={() => removeFromCart(item.cartId)} className="text-rose-950/20 hover:text-rose-400 transition-colors mt-1"><Trash2 className="w-4 h-4" /></button>
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <span className="text-[10px] font-semibold uppercase tracking-widest text-rose-400 bg-rose-50 px-2.5 py-1 rounded-full">{item.type === 'service' ? 'Arreglo' : 'Producto'}</span>
                        <span className="font-serif text-rose-950 text-xl">${item.type === 'service' ? item.basePrice : item.price}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <h3 className="text-2xl font-serif text-rose-950 mb-2">Tus Datos</h3>
              <p className="text-rose-950/60 font-light text-sm mb-6">Completá esta información para armar tu pedido antes de enviarlo por WhatsApp.</p>
              <div className="space-y-4">
                <div><label className="block text-xs font-semibold uppercase tracking-widest text-rose-950/50 mb-2">Nombre</label><input type="text" value={customer.firstName} onChange={(e) => setCustomer({...customer, firstName: e.target.value})} className="w-full bg-[#FCFAFA] border border-rose-100 rounded-xl px-4 py-3 text-rose-950 focus:outline-none focus:border-rose-300" placeholder="Ej: María" /></div>
                <div><label className="block text-xs font-semibold uppercase tracking-widest text-rose-950/50 mb-2">Apellido</label><input type="text" value={customer.lastName} onChange={(e) => setCustomer({...customer, lastName: e.target.value})} className="w-full bg-[#FCFAFA] border border-rose-100 rounded-xl px-4 py-3 text-rose-950 focus:outline-none focus:border-rose-300" placeholder="Ej: González" /></div>
                <div className="pt-2">
                  <label className="block text-xs font-semibold uppercase tracking-widest text-rose-950/50 mb-3">Método de entrega</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => setCustomer({...customer, delivery: 'taller'})} className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all ${customer.delivery === 'taller' ? 'bg-rose-50 border-rose-200 text-rose-900' : 'bg-white border-rose-100 text-rose-950/50 hover:bg-rose-50/50'}`}>Retiro en Taller</button>
                    <button onClick={() => setCustomer({...customer, delivery: 'envio'})} className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all ${customer.delivery === 'envio' ? 'bg-rose-50 border-rose-200 text-rose-900' : 'bg-white border-rose-100 text-rose-950/50 hover:bg-rose-50/50'}`}>Envío</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 md:p-8 bg-white border-t border-rose-50">
            {!isCheckoutStep && ( <div className="flex justify-between items-end mb-6 md:mb-8"><span className="text-rose-950/60 font-light">Total Estimado</span><span className="text-3xl md:text-4xl font-serif text-rose-950">${cartTotal}</span></div> )}
            {!isCheckoutStep ? (
              <button onClick={() => setIsCheckoutStep(true)} className="w-full bg-rose-900 text-white py-4 rounded-full text-xs md:text-sm tracking-widest font-bold hover:bg-rose-800 transition-all shadow-xl shadow-rose-900/20 flex items-center justify-center gap-2">CONTINUAR PEDIDO <ChevronRight className="w-4 h-4" /></button>
            ) : (
              <button onClick={handleCheckout} className="w-full bg-rose-900 text-white py-4 rounded-full text-xs md:text-sm tracking-widest font-bold hover:bg-rose-800 transition-all shadow-xl shadow-rose-900/20 flex items-center justify-center gap-2"><MessageCircle className="w-5 h-5 text-rose-300" /> CONFIRMAR Y ENVIAR</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
