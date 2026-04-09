"use client";

import React, { createContext, useContext, useMemo, useState } from 'react';

type ShowcaseImage = {
  src: string;
  alt: string;
  eyebrow: string;
  title: string;
};

type HomeShowcaseContextValue = {
  heroSlides: ShowcaseImage[];
  carouselSlides: ShowcaseImage[];
  activeHeroIndex: number;
  activeCarouselIndex: number;
  setActiveHeroIndex: (index: number) => void;
  setActiveCarouselIndex: (index: number) => void;
  nextHero: () => void;
  prevHero: () => void;
  nextCarousel: () => void;
  prevCarousel: () => void;
};

const heroSlides: ShowcaseImage[] = [
  {
    src: '/hero/hero-hilos.jpg',
    alt: 'Conos de hilo de colores en el taller',
    eyebrow: 'Texturas y color',
    title: 'Materiales elegidos para cada prenda.',
  },
  {
    src: '/hero/hero-telas.jpg',
    alt: 'Rollos de telas apilados en el taller',
    eyebrow: 'Selección textil',
    title: 'Telas reales listas para transformar tus ideas.',
  },
];

const carouselSlides: ShowcaseImage[] = [
  {
    src: '/slider_carusel/carusel_1.jpg',
    alt: 'Tela rosa y naranja doblada',
    eyebrow: 'Paleta vibrante',
    title: 'Combinaciones que destacan en cada arreglo.',
  },
  {
    src: '/slider_carusel/carusel_2.jpg',
    alt: 'Primer plano de costura en máquina',
    eyebrow: 'Trabajo de taller',
    title: 'Terminaciones cuidadas con costura industrial.',
  },
  {
    src: '/slider_carusel/carusel_3.jpg',
    alt: 'Telas dobladas en distintos colores',
    eyebrow: 'Base de stock',
    title: 'Opciones textiles para arreglos y confección.',
  },
];

const HomeShowcaseContext = createContext<HomeShowcaseContextValue | null>(null);

export function HomeShowcaseProvider({ children }: { children: React.ReactNode }) {
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);

  const value = useMemo<HomeShowcaseContextValue>(
    () => ({
      heroSlides,
      carouselSlides,
      activeHeroIndex,
      activeCarouselIndex,
      setActiveHeroIndex: (index) => setActiveHeroIndex(index),
      setActiveCarouselIndex: (index) => setActiveCarouselIndex(index),
      nextHero: () => setActiveHeroIndex((current) => (current + 1) % heroSlides.length),
      prevHero: () => setActiveHeroIndex((current) => (current - 1 + heroSlides.length) % heroSlides.length),
      nextCarousel: () => setActiveCarouselIndex((current) => (current + 1) % carouselSlides.length),
      prevCarousel: () => setActiveCarouselIndex((current) => (current - 1 + carouselSlides.length) % carouselSlides.length),
    }),
    [activeHeroIndex, activeCarouselIndex]
  );

  return <HomeShowcaseContext.Provider value={value}>{children}</HomeShowcaseContext.Provider>;
}

export function useHomeShowcase() {
  const context = useContext(HomeShowcaseContext);

  if (!context) {
    throw new Error('useHomeShowcase must be used within HomeShowcaseProvider');
  }

  return context;
}