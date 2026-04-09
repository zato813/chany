"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Scissors, ShoppingBag, Menu, X, Settings } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const { cart, setIsCartOpen } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { name: 'INICIO', path: '/' },
    { name: 'ARREGLOS', path: '/arreglos' },
    { name: 'TIENDA', path: '/tienda' },
  ];

  const NavLinks = () => (
    <>
      {links.map(l => (
        <Link key={l.path} href={l.path} onClick={() => setIsMenuOpen(false)} className={`text-xs tracking-widest font-medium transition-colors hover:text-rose-500 ${pathname === l.path ? 'text-rose-900' : 'text-rose-950/50'}`}>
          {l.name}
        </Link>
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-40 bg-[#FCFAFA]/80 backdrop-blur-md border-b border-rose-100/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 md:h-24 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <Scissors className="text-rose-400 h-7 w-7 group-hover:rotate-180 transition-transform duration-700" strokeWidth={1.5} />
          <span className="text-2xl font-serif font-bold tracking-tight text-rose-950">Chany.</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-10">
          <NavLinks />
          <button onClick={() => setIsCartOpen(true)} className="relative p-2 text-rose-950/70 hover:text-rose-900 transition-colors">
            <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
            {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-rose-400 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-sm">{cart.length}</span>}
          </button>
        </nav>

        <div className="flex items-center gap-6 md:hidden">
          <button onClick={() => setIsCartOpen(true)} className="relative p-2 text-rose-950/70">
            <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
            {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-rose-400 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-sm">{cart.length}</span>}
          </button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-rose-950/70 p-2">
            {isMenuOpen ? <X className="w-6 h-6" strokeWidth={1.5} /> : <Menu className="w-6 h-6" strokeWidth={1.5} />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-[#FCFAFA]/95 backdrop-blur-md border-b border-rose-100/50 shadow-xl py-8 flex flex-col items-center gap-8 z-40">
          <NavLinks />
        </div>
      )}
    </header>
  );
}