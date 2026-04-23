# Portfolio Next.js

Portfolio ini sekarang sudah dimigrasikan penuh ke **Next.js App Router** dengan tampilan yang tetap mengikuti versi lama.

## Fitur

- Layout portfolio responsif
- Section: About, Services, Skills, Portfolio, Contact, dan Footer
- Music player modal
- Animasi scroll reveal dan efek interaktif
- Form kontak yang memanggil API route Next.js
- Validasi input dan proteksi spam dasar

## Tech Stack

- Next.js 15
- React 18
- Tailwind CSS
- Route Handler API di App Router

## Struktur Project

```bash
project/
├── app/
│   ├── api/
│   │   ├── contact/
│   │   │   └── route.js
│   │   └── health/
│   │       └── route.js
│   ├── globals.css
│   ├── layout.jsx
│   └── page.jsx
├── assets/
│   ├── css/style.css
│   ├── font/
│   └── img/
├── package.json
├── next.config.mjs
└── postcss.config.cjs
```

## Cara Menjalankan

```bash
npm install
npm run dev
```

Default menjalankan Next.js di `http://localhost:3000`.

## Script

- `npm run dev` - jalankan Next.js mode development
- `npm run build` - build production Next.js
- `npm run start` - jalankan hasil production build

## API Route

### `GET /api/health`

Contoh respons:

```json
{
  "ok": true,
  "service": "portfolio-api",
  "timestamp": "2026-04-22T12:57:55.822Z"
}
```

### `POST /api/contact`

Request body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "service": "Web Development",
  "message": "Your message here"
}
```

## Deployment

Project ini bisa dideploy ke platform apa pun yang mendukung Next.js:

- Vercel
- Netlify
- Render
- Railway
- VPS / Docker

Karena frontend dan API ada di satu framework, cukup jalankan build Next.js dan deploy hasilnya.

## Catatan

- File `server/` dan `vite.config.js` sudah tidak dipakai lagi setelah migrasi ini.
- Jika Anda ingin ikon/favicon lama, pindahkan file statisnya ke folder `public/`.
