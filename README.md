# Portfolio React + Node + Tailwind

Project portfolio dengan tampilan dark minimal, dibangun menggunakan React, Tailwind CSS, Vite, dan Node.js/Express.

## Fitur

- Tampilan portfolio responsif dengan layout yang dijaga tetap mirip versi awal
- Section: About, Services, Skills, Portfolio, Contact, dan Footer
- Music player modal
- Animasi scroll reveal dan efek interaktif
- Form kontak yang mengirim data ke backend Node.js
- **🔒 Full security protection** (Rate limiting, XSS protection, CORS, Input validation)

## Tech Stack

### Frontend

- React 18
- Vite
- Tailwind CSS

### Local Backend

- Node.js
- Express
- **Security:** Helmet, CORS, Rate Limiting, Validator

### Deployment Options

- Static hosting: Vercel, Netlify, GitHub Pages, Cloudflare Pages, atau hosting statis lain
- Node.js hosting: Render, Railway, Fly.io, VPS, atau platform apa pun yang mendukung Express
- API dapat berjalan di origin yang sama atau di domain terpisah lewat environment variable

## 🔒 Security Features

Portfolio ini dilengkapi dengan **7 layer security protection**:

1. **Helmet** - Security headers (XSS, Clickjacking protection)
2. **CORS Protection** - Restricted origins
3. **Rate Limiting** - 5 submissions/hour per contact
4. **Input Sanitization** - XSS & HTML injection protection
5. **Email Validation** - Strict format checking
6. **Request Size Limit** - Max 10KB payload
7. **Spam Detection** - Keyword filtering

📖 **Dokumentasi lengkap:** [SECURITY.md](./SECURITY.md)

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
- Backend Express lokal: `http://localhost:3001`

Jika ingin mencoba flow produksi secara lokal, frontend bisa tetap jalan dari Vite, sementara request API diarahkan ke backend Express lokal atau backend eksternal melalui `VITE_API_BASE_URL`.

### 3. Build production

```bash
npm run build
```

## Script

- `npm run dev` - jalankan frontend dan backend sekaligus
- `npm run dev:client` - jalankan Vite saja
- `npm run dev:server` - jalankan Express saja
- `npm run build` - build production frontend
- `npm run start` - jalankan backend Express lokal untuk testing

## API Endpoint

### `GET /api/health`

Cek status backend. Endpoint ini tersedia jika backend Express atau serverless API dijalankan.

Contoh respons:

```json
{
  "ok": true,
  "service": "portfolio-api",
  "timestamp": "2026-04-22T12:57:55.822Z"
}
```

### `POST /api/contact`

Kirim pesan kontak. Frontend akan memanggil endpoint dari origin yang sama, atau dari `VITE_API_BASE_URL` jika diatur.

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "service": "Web Development",
  "message": "Your message here (min 10 characters)"
}
```

**Success Response (200):**

```json
{
  "ok": true,
  "message": "Pesan diterima. Saya akan tindak lanjuti lewat kontak yang Anda kirim."
}
```

**Error Responses:**

```json
// 400 - Invalid email
{
  "ok": false,
  "message": "Format email tidak valid."
}

// 400 - Message too short
{
  "ok": false,
  "message": "Pesan harus antara 10-1000 karakter."
}

// 400 - Spam detected
{
  "ok": false,
  "message": "Pesan terdeteksi sebagai spam."
}

// 429 - Rate limit exceeded
{
  "ok": false,
  "message": "Anda sudah mengirim terlalu banyak pesan. Coba lagi dalam 1 jam."
}
```

**Validation Rules:**

- **Name:** 2-100 characters, required
- **Email:** Valid email format, required
- **Message:** 10-1000 characters, required
- **Rate Limit:** 5 submissions per hour

## 🧪 Testing

### Run Security Tests

```bash
# Start server
npm run dev:server

# Run tests (in new PowerShell)
powershell -File test-security.ps1
```

### Manual API Test

```powershell
# Valid request
$body = @{
  name = "Test User"
  email = "test@example.com"
  message = "This is a test message"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:3001/api/contact" `
  -Method POST `
  -Body $body `
  -ContentType "application/json"
```

## 📦 Dependencies

### Production

```json
{
  "express": "^4.21.2",
  "helmet": "^7.x.x",
  "express-rate-limit": "^7.x.x",
  "validator": "^13.x.x",
  "cors": "^2.x.x",
  "react": "^18.3.1",
  "react-dom": "^18.3.1"
}
```

### Development

```json
{
  "@vitejs/plugin-react": "^4.3.4",
  "autoprefixer": "^10.4.20",
  "concurrently": "^9.1.2",
  "nodemon": "^3.1.9",
  "postcss": "^8.5.3",
  "tailwindcss": "^3.4.17",
  "vite": "^6.0.11"
}
```

## 🔧 Configuration

### Set API Base URL

Kalau frontend dan backend tidak satu domain, set environment variable berikut saat build frontend:

```env
VITE_API_BASE_URL=https://api.domain-anda.com/api
```

Jika tidak diisi, frontend akan memakai `/api/contact` dari domain yang sama.

### Set Allowed Origins untuk Express

Edit environment backend:

```env
ALLOWED_ORIGINS=http://localhost:5173,https://domain-frontend-anda.com
```

### Adjust Rate Limits

```javascript
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Change max requests per hour
});
```

## 📚 Documentation

- **Security Features:** [SECURITY.md](./SECURITY.md)
- **Project Structure:** [struktur.md](./struktur.md)

## 🚀 Deployment

### Opsi 1: Satu domain

Build frontend dan jalankan backend pada domain yang sama. Ini paling sederhana karena frontend akan memanggil `/api/contact` langsung.

### Opsi 2: Frontend dan backend terpisah

Set `VITE_API_BASE_URL` ke URL backend API, lalu deploy frontend ke static host apa pun.

### Build & Deploy

```bash
# Build frontend
npm run build
```

Untuk static hosting, arahkan output build ke folder `dist`.

### Local Production Preview

Kalau ingin menjalankan backend Express secara lokal, gunakan:

```bash
npm run start
```

Pastikan frontend mengarah ke backend lokal jika dipakai terpisah. Jika memakai backend terpisah, set `VITE_API_BASE_URL` sebelum build frontend.

## ⚠️ Security Notes

- ✅ Rate limiting enabled (5 req/hour for contact)
- ✅ Input sanitization active
- ✅ CORS protection configured
- ✅ XSS protection enabled
- ✅ Spam detection active
- ⚠️ Add HTTPS in production
- ⚠️ Update allowed origins for production domain

## 📞 Support

Jika menemukan bug atau security issue, silakan buat issue di repository ini.

---

**Built with ❤️ using React, Node.js, and Tailwind CSS**  
**Secured with 🔒 7-layer protection**

## Catatan

- Playlist musik masih berupa UI player. Jika ingin audio asli, isi properti `src` di `src/App.jsx`.
- Backend saat ini hanya menerima dan memvalidasi pesan, belum menyimpan ke database.
- Tampilan utama tetap mengikuti bentuk web lama, hanya strukturnya sudah dipindah ke React + Tailwind + Node.
