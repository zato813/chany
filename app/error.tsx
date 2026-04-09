"use client";
import { AlertTriangle } from 'lucide-react';
import { useEffect } from 'react';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FCFAFA] p-6 text-center">
      <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-rose-50 max-w-lg">
        <AlertTriangle className="w-16 h-16 text-rose-500 mx-auto mb-6" />
        <h2 className="text-3xl font-serif text-rose-950 mb-4">Ups, tuvimos un problema.</h2>
        <p className="text-rose-950/60 font-light mb-8">
          Ha ocurrido un error inesperado al procesar tu solicitud. Nuestro equipo ya fue notificado.
        </p>
        <button onClick={() => reset()} className="bg-rose-900 text-white px-8 py-3 rounded-full text-sm font-bold tracking-wide hover:bg-rose-800 transition-colors shadow-lg">
          INTENTAR DE NUEVO
        </button>
      </div>
    </div>
  );
}