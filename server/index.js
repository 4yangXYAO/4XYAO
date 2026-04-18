import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = process.env.PORT || 3001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ ok: true, service: 'portfolio-api' });
});

app.post('/api/contact', (req, res) => {
  const { name, email, service, message } = req.body ?? {};

  if (!name || !email || !message) {
    return res.status(400).json({
      ok: false,
      message: 'Nama, email, dan pesan wajib diisi.',
    });
  }

  return res.json({
    ok: true,
    message: 'Pesan diterima. Saya akan tindak lanjuti lewat kontak yang Anda kirim.',
    data: { name, email, service, message },
  });
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(distDir));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distDir, 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`API server running on http://localhost:${port}`);
});
