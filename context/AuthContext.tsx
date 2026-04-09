"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, User, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { toast } from 'sonner';

interface AuthContextProps {
  user: User | null;
  isAuthReady: boolean;
  isAdminLoggedIn: boolean;
  login: (email: string, pass: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    // We only listen for auth changes, no more automatic anonymous login
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthReady(true);
    });
    return () => unsubscribe();
  }, []);

  const login = async (email: string, pass: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      toast.success("Sesión iniciada");
    } catch (error: any) {
      console.error("Login Error:", error.code, error.message);
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        throw new Error("Credenciales inválidas. Revisá tu email y contraseña.");
      } else if (error.code === 'auth/too-many-requests') {
        throw new Error("Demasiados intentos fallidos. Reintentá más tarde.");
      } else {
        throw new Error("Error al iniciar sesión: " + error.message);
      }
    }
  };

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success("Sesión iniciada con Google");
    } catch (error: any) {
      console.error("Google Login Error:", error);
      throw new Error("Error al iniciar sesión con Google.");
    }
  };
  
  const logout = async () => {
    await signOut(auth);
    toast.info("Sesión cerrada");
    window.location.reload();
  };

  const isAdminLoggedIn = user ? !user.isAnonymous : false;

  return (
    <AuthContext.Provider value={{ user, isAuthReady, isAdminLoggedIn, login, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
