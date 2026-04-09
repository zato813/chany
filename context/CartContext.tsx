"use client";
import React, { createContext, useContext, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from './AuthContext';
import { checkCheckoutRateLimit } from '@/lib/rateLimit';
import { toast } from 'sonner';

interface CartContextProps {
  cart: any[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutStep: boolean;
  setIsCheckoutStep: (step: boolean) => void;
  customer: { firstName: string; lastName: string; delivery: string };
  setCustomer: (customer: any) => void;
  cartTotal: number;
  addToCart: (item: any, type: string) => void;
  removeFromCart: (cartId: string) => void;
  handleCheckout: (e: React.FormEvent) => Promise<void>;
}

const CartContext = createContext<CartContextProps>({} as CartContextProps);
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutStep, setIsCheckoutStep] = useState(false);
  const [customer, setCustomer] = useState({ firstName: '', lastName: '', delivery: 'taller' });

  const cartTotal = cart.reduce((sum, item) => sum + (Number(item.price) || Number(item.basePrice)), 0);

  const addToCart = (item: any, type: string) => {
    setCart([...cart, { ...item, type, cartId: Math.random().toString(36).substr(2, 9) }]);
    setIsCartOpen(true);
    setIsCheckoutStep(false);
    toast.success(`${item.name} agregado al carrito`);
  };

  const removeFromCart = (cartId: string) => {
    setCart(cart.filter(item => item.cartId !== cartId));
    toast.info("Item eliminado");
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer.firstName || !customer.lastName) {
      toast.error("Por favor, completá tu nombre y apellido.");
      return;
    }

    if (!checkCheckoutRateLimit()) {
      toast.error("Has alcanzado el límite de pedidos por hora. Intenta más tarde.");
      return;
    }

    const orderId = Math.random().toString(36).substr(2, 6).toUpperCase();
    
    try {
      const ordersRef = collection(db, 'orders');
      const orderData = {
        orderId,
        customerName: `${customer.firstName} ${customer.lastName}`,
        delivery: customer.delivery,
        items: cart.map(item => ({
          name: item.name || "",
          type: item.type || "",
          price: Number(item.price) || Number(item.basePrice) || 0
        })),
        total: Number(cartTotal) || 0,
        status: "pendiente",
        createdAt: serverTimestamp()
      };
      
      console.log("Intentando guardar orden:", orderData);
      await addDoc(ordersRef, orderData);
    } catch (err) {
      console.error("Error guardando orden: ", err);
    }

    let msg = `Nuevo Pedido - Chany Taller de Costura\n`;
    msg += `----------------------------------\n`;
    msg += `Orden de consulta: #${orderId}\n`;
    msg += `Cliente: ${customer.firstName} ${customer.lastName}\n`;
    msg += `Modalidad de entrega: ${customer.delivery === 'taller' ? 'Retiro por taller (San Juan)' : 'Envío a domicilio'}\n`;
    msg += `----------------------------------\n\n`;
    
    const services = cart.filter(i => i.type === 'service');
    const products = cart.filter(i => i.type === 'product');

    if (services.length > 0) {
      msg += `Detalle de arreglos solicitados:\n`;
      services.forEach((i, idx) => msg += `- ${i.name} (Valor base: $${i.basePrice})\n`);
    }
    if (products.length > 0) {
      msg += `\nDetalle de productos de tienda:\n`;
      products.forEach((i, idx) => msg += `- ${i.name} | Valor: $${i.price}\n`);
    }
    
    msg += `\n----------------------------------\n`;
    msg += `Valor total estimado: $${cartTotal}\n`;
    msg += `----------------------------------\n\n`;
    
    if (services.length > 0) {
      msg += `Quedo a la espera de su confirmación. A continuación le adjunto fotos de las prendas para la cotización final de alta costura.`;
    } else {
      msg += `Me interesa concretar esta compra. Por favor, indíquenme los pasos para realizar el pago y coordinar la entrega.`;
    }

    toast.success("¡Pedido generado! Abriendo WhatsApp...");
    setTimeout(() => {
      window.open(`https://wa.me/5492644149147?text=${encodeURIComponent(msg)}`, '_blank');
      setCart([]);
      setIsCartOpen(false);
    }, 1500);
  };

  return (
    <CartContext.Provider value={{ cart, isCartOpen, setIsCartOpen, isCheckoutStep, setIsCheckoutStep, customer, setCustomer, cartTotal, addToCart, removeFromCart, handleCheckout }}>
      {children}
    </CartContext.Provider>
  );
};