# jsg-photography — Starter Next.js + TypeScript + Tailwind

This is a minimal JAMstack starter built for a photography portfolio.
It uses Next.js + TypeScript + Tailwind and fetches images from Cloudinary.

## Quick start

1. Install dependencies
```bash
npm install
```

2. Copy `.env.example` to `.env.local` and set your Cloudinary cloud name:
```bash
cp .env.example .env.local
# edit .env.local and set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
```

3. Run the dev server
```bash
npm run dev
```

4. Build for production
```bash
npm run build
```

## What’s included

- Masonry-style gallery (CSS columns)  
- Vertical left sidebar for desktop + responsive mobile layout  
- Cloudinary fetch helper (src/lib/cloudinary.ts)  
- Example category pages: commercial, fashion, portraits, weddings  
- SEO-friendly skeleton (SEOHead component)

