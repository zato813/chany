import Link from 'next/link';
import { Scissors } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-[#FCFAFA] p-6 text-center">
      <Scissors className="w-20 h-20 text-rose-200 mb-6 -rotate-45" strokeWidth={1} />
      <h2 className="text-6xl font-serif text-rose-950 mb-4">404</h2>
      <p className="text-xl text-rose-950/60 font-light mb-8">
        No pudimos encontrar la prenda que buscas.
      </p>
      <Link href="/" className="bg-white text-rose-950 border border-rose-200 px-8 py-3 rounded-full text-sm font-bold tracking-wide hover:bg-rose-50 transition-colors">
        VOLVER AL INICIO
      </Link>
    </div>
  );
}