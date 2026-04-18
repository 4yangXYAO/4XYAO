# Portfolio React + Node + Tailwind

Project portfolio dengan tampilan dark minimal, dibangun menggunakan React, Tailwind CSS, Vite, dan Node.js/Express.

## Fitur

- Tampilan portfolio responsif dengan layout yang dijaga tetap mirip versi awal
- Section: About, Services, Skills, Portfolio, Contact, dan Footer
- Music player modal
- Animasi scroll reveal dan efek interaktif
- Form kontak yang mengirim data ke backend Node.js

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Node.js
- Express

## Struktur Project

```bash
project/
├── index.html
├── package.json
├── postcss.config.cjs
├── tailwind.config.cjs
├── vite.config.js
├── server/
│   └── index.js
├── src/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── assets/
│   ├── css/style.css
│   ├── font/
│   └── img/
└── struktur.md
```

## Cara Menjalankan

### 1. Install dependency

```bash
npm install
```

### 2. Jalankan frontend + backend bersamaan

```bash
npm run dev
```

- Frontend Vite: `http://localhost:5173`
- Backend Express: `http://localhost:3001`

### 3. Build production

```bash
npm run build
```

### 4. Jalankan server production

```bash
npm run start
```

## Script

- `npm run dev` - jalankan frontend dan backend sekaligus
- `npm run dev:client` - jalankan Vite saja
- `npm run dev:server` - jalankan Express saja
- `npm run build` - build production frontend
- `npm run start` - jalankan backend Express

## API Endpoint

### `GET /api/health`

Cek status backend.

Contoh respons:

```json
{
  "ok": true,
  "service": "portfolio-api"
}
```

### `POST /api/contact`

Menerima data form kontak.

Body:

```json
{
  "name": "Nama Anda",
  "email": "email@domain.com",
  "service": "Web Development",
  "message": "Pesan Anda"
}
```

## Catatan

- Playlist musik masih berupa UI player. Jika ingin audio asli, isi properti `src` di `src/App.jsx`.
- Backend saat ini hanya menerima dan memvalidasi pesan, belum menyimpan ke database.
- Tampilan utama tetap mengikuti bentuk web lama, hanya strukturnya sudah dipindah ke React + Tailwind + Node.
