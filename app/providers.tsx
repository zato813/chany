"use client";
import React from 'react';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/context/AuthContext';
import { DataProvider } from '@/context/DataContext';
import { CartProvider } from '@/context/CartContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <DataProvider>
        <CartProvider>
          {children}
          <Toaster position="bottom-right" richColors expand={true} style={{ fontFamily: 'var(--font-sans)' }} />
        </CartProvider>
      </DataProvider>
    </AuthProvider>
  );
}