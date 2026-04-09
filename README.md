# Chany

Sitio de taller y tienda hecho con Next.js usando App Router.

## Stack

- Next.js 16 con App Router
- React 19
- Tailwind CSS 4
- Firebase Auth + Firestore

## Desarrollo local

```bash
npm install
npm run dev
```

El proyecto corre sobre `app/`.
No usa carpeta `pages/`.

## Variables de entorno

Copiá `.env.example` a `.env` y completá:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
NEXT_PUBLIC_WHATSAPP_NUMBER=
```

## Deploy en Vercel

Configuración recomendada:

- Framework Preset: Next.js
- Build Command: `npm run build`
- Install Command: `npm install`
- Output Directory: dejar por defecto
- Node: usar la versión que maneje Vercel para Next 16

Notas importantes:

- El proyecto usa App Router. No hay que crear ni mover nada a `pages/`.
- La optimización de imágenes de Next/Vercel está desactivada en `next.config.ts` con `images.unoptimized: true`.
- Las imágenes locales salen desde `public/` sin transformación automática de Vercel.
- Antes de desplegar, cargá en Vercel las mismas variables de entorno de `.env`.

## Verificación previa

```bash
npm run build
```

Si el build compila localmente, está listo para subir a Vercel.
