import { Scissors } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-rose-100/50 py-16 text-center mt-auto">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-center items-center gap-2 mb-6">
          <Scissors className="h-6 w-6 text-rose-400" strokeWidth={1.5} />
          <span className="text-2xl font-serif font-bold text-rose-950">Chany.</span>
        </div>
        <p className="mb-8 text-rose-950/60 font-light">Taller de costura industrial. Soluciones a medida.</p>
        <div className="flex justify-center gap-8">
          <Link href="#" className="text-xs tracking-widest font-medium text-rose-950/50 hover:text-rose-400 transition-colors">INSTAGRAM</Link>
          <Link href="#" className="text-xs tracking-widest font-medium text-rose-950/50 hover:text-rose-400 transition-colors">FACEBOOK</Link>
          <Link href="#" className="text-xs tracking-widest font-medium text-rose-950/50 hover:text-rose-400 transition-colors">WHATSAPP</Link>
        </div>
        <p className="mt-16 text-xs text-rose-950/30">© {new Date().getFullYear()} Chany. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
