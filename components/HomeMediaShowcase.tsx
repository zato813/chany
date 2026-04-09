"use client";

import { useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useHomeShowcase } from '@/context/HomeShowcaseContext';

export function HomeHeroShowcase() {
  const {
    heroSlides,
    activeHeroIndex,
    setActiveHeroIndex,
    nextHero,
  } = useHomeShowcase();

  const activeHero = heroSlides[activeHeroIndex];

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      nextHero();
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [nextHero]);

  return (
    <div className="space-y-4">
      <div className="relative group">
        <div className="aspect-4/5 md:aspect-square lg:aspect-4/5 rounded-4xl overflow-hidden relative shadow-2xl shadow-rose-900/5 border-4 border-white bg-rose-100/40">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.src}
              className={`absolute inset-0 transition-all duration-700 ease-out ${
                index === activeHeroIndex
                  ? 'translate-x-0 opacity-100'
                  : index < activeHeroIndex
                    ? '-translate-x-full opacity-0'
                    : 'translate-x-full opacity-0'
              }`}
              aria-hidden={index !== activeHeroIndex}
            >
              <Image
                fill
                src={slide.src}
                alt={slide.alt}
                className="object-cover"
                priority={index === 0}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          ))}

          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 bg-linear-to-t from-black/55 via-black/20 to-transparent text-white z-10">
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.28em] text-white/70 mb-2">{activeHero.eyebrow}</p>
            <p className="text-lg sm:text-xl font-serif max-w-xs leading-tight">{activeHero.title}</p>
          </div>
        </div>
        <div className="absolute -inset-4 bg-rose-100/40 rounded-5xl -z-10 rotate-3 transition-transform group-hover:rotate-6 duration-700"></div>
      </div>

      <div className="flex items-center justify-center gap-2">
        {heroSlides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => setActiveHeroIndex(index)}
            className={`h-2.5 rounded-full transition-all ${
              index === activeHeroIndex
                ? 'w-10 bg-rose-500'
                : 'w-2.5 bg-rose-200 hover:bg-rose-300'
            }`}
            aria-label={`Mostrar imagen destacada ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export function WorkshopCarouselSection() {
  const {
    carouselSlides,
    activeCarouselIndex,
    setActiveCarouselIndex,
    nextCarousel,
    prevCarousel,
  } = useHomeShowcase();

  const activeCarousel = carouselSlides[activeCarouselIndex];

  return (
    <section className="pt-20 border-t border-rose-100/50">
      <div className="flex items-center justify-between gap-4 mb-8">
        <div>
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.28em] text-rose-400 mb-2">Slider del taller</p>
          <h2 className="text-3xl sm:text-4xl font-serif text-rose-950">Otra mirada del espacio y los materiales</h2>
          <p className="text-rose-950/55 mt-3 max-w-2xl font-light text-base sm:text-lg">
            Acá se ve mejor el universo del taller: textura, color, costura y stock real para trabajar cada pedido.
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={prevCarousel}
            className="w-10 h-10 rounded-full border border-rose-200 text-rose-900 flex items-center justify-center hover:bg-rose-50 transition-colors"
            aria-label="Imagen anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={nextCarousel}
            className="w-10 h-10 rounded-full border border-rose-200 text-rose-900 flex items-center justify-center hover:bg-rose-50 transition-colors"
            aria-label="Siguiente imagen"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="rounded-4xl border border-rose-100 bg-white/80 backdrop-blur-sm p-4 sm:p-5 shadow-sm">
        <div className="grid lg:grid-cols-[minmax(0,1.35fr)_minmax(240px,0.85fr)] gap-4 items-stretch">
          <div className="relative rounded-3xl overflow-hidden min-h-80 sm:min-h-95 bg-rose-100/40">
            <Image
              fill
              src={activeCarousel.src}
              alt={activeCarousel.alt}
              className="object-cover"
              loading="eager"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <div className="absolute inset-x-0 bottom-0 p-5 bg-linear-to-t from-black/60 via-black/25 to-transparent text-white">
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.28em] text-white/70 mb-2">{activeCarousel.eyebrow}</p>
              <p className="text-lg font-serif max-w-sm leading-tight">{activeCarousel.title}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 lg:grid-cols-1 gap-3">
            {carouselSlides.map((slide, index) => (
              <button
                key={slide.src}
                type="button"
                onClick={() => setActiveCarouselIndex(index)}
                className={`group rounded-2xl overflow-hidden border text-left transition-all ${
                  index === activeCarouselIndex
                    ? 'border-rose-300 shadow-lg shadow-rose-900/10'
                    : 'border-rose-100 hover:border-rose-200'
                }`}
                aria-label={`Mostrar imagen del slider ${index + 1}`}
              >
                <div className="relative aspect-4/5 lg:aspect-4/3 bg-rose-100/40">
                  <Image
                    fill
                    src={slide.src}
                    alt={slide.alt}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="eager"
                    sizes="(max-width: 1024px) 33vw, 18vw"
                  />
                </div>
                <div className="hidden lg:block p-3">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-rose-400 mb-1">{slide.eyebrow}</p>
                  <p className="text-sm text-rose-950/70 leading-snug">{slide.title}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex sm:hidden items-center justify-center gap-2 mt-4">
          <button
            type="button"
            onClick={prevCarousel}
            className="w-10 h-10 rounded-full border border-rose-200 text-rose-900 flex items-center justify-center hover:bg-rose-50 transition-colors"
            aria-label="Imagen anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={nextCarousel}
            className="w-10 h-10 rounded-full border border-rose-200 text-rose-900 flex items-center justify-center hover:bg-rose-50 transition-colors"
            aria-label="Siguiente imagen"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default HomeHeroShowcase;