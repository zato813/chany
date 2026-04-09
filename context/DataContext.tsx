"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, doc, setDoc, deleteDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { useAuth } from './AuthContext';

interface DataContextProps {
  productsList: any[];
  productsLoading: boolean;
  ordersList: any[];
  ordersLoading: boolean;
  addProduct: (productData: any) => Promise<{ success: boolean; error?: string }>;
  updateProduct: (id: string, productData: any) => Promise<{ success: boolean; error?: string }>;
  deleteProduct: (id: string) => Promise<{ success: boolean; error?: string }>;
  updateOrderStatus: (id: string, status: string) => Promise<{ success: boolean }>;
}

const DataContext = createContext<DataContextProps>({} as DataContextProps);
export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [productsList, setProductsList] = useState<any[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [ordersList, setOrdersList] = useState<any[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID || 'chany-app';
  // Normalize appId to be used safely as a single path segment if it's the firebase unique ID
  const safePath = appId.replace(/:/g, '_');

  useEffect(() => {
    // Escuchar productos en la ruta anidada solicitada
    const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID || 'chany-app';
    const productsRef = collection(db, 'artifacts', appId, 'public', 'data', 'products');
    const qProd = query(productsRef, orderBy("createdAt", "desc"));
    
    const unsubscribeProd = onSnapshot(qProd, (snapshot) => {
      setProductsList(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setProductsLoading(false);
    });

    let unsubscribeOrders = () => {};
    if (user && !user.isAnonymous) {
      // Escuchar pedidos en la colección raíz 'orders'
      const ordersRef = collection(db, 'orders');
      const qOrders = query(ordersRef, orderBy("createdAt", "desc"));
      unsubscribeOrders = onSnapshot(qOrders, (snapshot) => {
        setOrdersList(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setOrdersLoading(false);
      });
    } else {
      setOrdersLoading(false);
    }

    return () => { unsubscribeProd(); unsubscribeOrders(); };
  }, [user]);

  const addProduct = async (productData: any) => {
    try {
      const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID || 'chany-app';
      const productsRef = collection(db, 'artifacts', appId, 'public', 'data', 'products');
      const newDocRef = doc(productsRef);
      await setDoc(newDocRef, { ...productData, id: newDocRef.id, createdAt: Date.now() });
      return { success: true };
    } catch (err: any) { return { success: false, error: err.message }; }
  };

  const updateProduct = async (id: string, productData: any) => {
    try {
      const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID || 'chany-app';
      const docRef = doc(db, 'artifacts', appId, 'public', 'data', 'products', id);
      await setDoc(docRef, { ...productData, updatedAt: Date.now() }, { merge: true });
      return { success: true };
    } catch (err: any) { return { success: false, error: err.message }; }
  };

  const deleteProduct = async (id: string) => {
    try {
      const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID || 'chany-app';
      const docRef = doc(db, 'artifacts', appId, 'public', 'data', 'products', id);
      await deleteDoc(docRef);
      return { success: true };
    } catch (err: any) { return { success: false, error: err.message }; }
  };

  const updateOrderStatus = async (id: string, status: string) => {
    try {
      const docRef = doc(db, 'orders', id);
      await setDoc(docRef, { status }, { merge: true });
      return { success: true };
    } catch (err: any) { return { success: false }; }
  };

  return (
    <DataContext.Provider value={{ 
      productsList, productsLoading, ordersList, ordersLoading,
      addProduct, updateProduct, deleteProduct, updateOrderStatus 
    }}>
      {children}
    </DataContext.Provider>
  );
};
