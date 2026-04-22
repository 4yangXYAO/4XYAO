import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import validator from "validator";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");

// ============================================
// SECURITY MIDDLEWARE
// ============================================

// 1. Helmet - Security headers
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
  }),
);

// 2. CORS - Only allow specific origins
const allowedOrigins = (
  process.env.ALLOWED_ORIGINS || "http://localhost:5173,http://localhost:3001"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (mobile apps, Postman, etc.)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(new Error("CORS policy: Origin not allowed"), false);
      }
      return callback(null, true);
    },
    credentials: true,
  }),
);

// 3. Request size limit
app.use(express.json({ limit: "10kb" })); // Max 10KB JSON payload

// 4. Rate limiting - Global
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Max 100 requests per 15 minutes
  message: {
    ok: false,
    message: "Terlalu banyak request. Coba lagi nanti.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(globalLimiter);

// 5. Rate limiting - Contact endpoint (stricter)
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Max 5 contact submissions per hour
  message: {
    ok: false,
    message: "Anda sudah mengirim terlalu banyak pesan. Coba lagi dalam 1 jam.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// ============================================
// HELPER FUNCTIONS
// ============================================

// Input sanitization
function sanitizeInput(input) {
  if (typeof input !== "string") return "";

  // Remove HTML tags
  let sanitized = validator.stripLow(input);
  sanitized = validator.escape(sanitized);

  // Trim whitespace
  sanitized = sanitized.trim();

  return sanitized;
}

// Email validation
function isValidEmail(email) {
  return validator.isEmail(email, {
    allow_display_name: false,
    require_tld: true,
    allow_utf8_local_part: false,
  });
}

// ============================================
// API ROUTES
// ============================================

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    service: "portfolio-api",
    timestamp: new Date().toISOString(),
  });
});

app.post("/api/contact", contactLimiter, (req, res) => {
  const { name, email, service, message } = req.body ?? {};

  // 1. Check required fields
  if (!name || !email || !message) {
    return res.status(400).json({
      ok: false,
      message: "Nama, email, dan pesan wajib diisi.",
    });
  }

  // 2. Validate email format
  if (!isValidEmail(email)) {
    return res.status(400).json({
      ok: false,
      message: "Format email tidak valid.",
    });
  }

  // 3. Sanitize inputs
  const sanitizedName = sanitizeInput(name);
  const sanitizedEmail = validator.normalizeEmail(email);
  const sanitizedService = service ? sanitizeInput(service) : "";
  const sanitizedMessage = sanitizeInput(message);

  // 4. Validate length
  if (sanitizedName.length < 2 || sanitizedName.length > 100) {
    return res.status(400).json({
      ok: false,
      message: "Nama harus antara 2-100 karakter.",
    });
  }

  if (sanitizedMessage.length < 10 || sanitizedMessage.length > 1000) {
    return res.status(400).json({
      ok: false,
      message: "Pesan harus antara 10-1000 karakter.",
    });
  }

  // 5. Check for suspicious patterns (basic spam detection)
  const spamPatterns = [
    /viagra/i,
    /casino/i,
    /lottery/i,
    /click here/i,
    /buy now/i,
  ];

  const combinedText = `${sanitizedName} ${sanitizedMessage}`.toLowerCase();
  const isSpam = spamPatterns.some((pattern) => pattern.test(combinedText));

  if (isSpam) {
    return res.status(400).json({
      ok: false,
      message: "Pesan terdeteksi sebagai spam.",
    });
  }

  // 6. Log the contact (in production, save to database)
  console.log("[CONTACT FORM]", {
    name: sanitizedName,
    email: sanitizedEmail,
    service: sanitizedService,
    timestamp: new Date().toISOString(),
    ip: req.ip,
  });

  // 7. Success response (don't echo back user input for security)
  return res.json({
    ok: true,
    message:
      "Pesan diterima. Saya akan tindak lanjuti lewat kontak yang Anda kirim.",
  });
});

// ============================================
// STATIC FILES & SPA ROUTING
// ============================================

if (process.env.NODE_ENV === "production") {
  app.use(express.static(distDir));
  app.get("*", (req, res) => {
    res.sendFile(path.join(distDir, "index.html"));
  });
}

// ============================================
// ERROR HANDLING
// ============================================

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    ok: false,
    message: "Endpoint tidak ditemukan.",
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("[ERROR]", err);

  // CORS error
  if (err.message.includes("CORS")) {
    return res.status(403).json({
      ok: false,
      message: "Akses ditolak: Origin tidak diizinkan.",
    });
  }

  // Generic error
  res.status(500).json({
    ok: false,
    message: "Terjadi kesalahan server.",
  });
});

// ============================================
// START SERVER
// ============================================

app.listen(port, () => {
  console.log(`✅ API server running on http://localhost:${port}`);
  console.log(`🌍 Allowed origins: ${allowedOrigins.join(", ")}`);
  console.log(`🔒 Security features enabled:`);
  console.log(`   - Helmet (security headers)`);
  console.log(`   - CORS protection`);
  console.log(`   - Rate limiting (100 req/15min global, 5 req/hour contact)`);
  console.log(`   - Input sanitization`);
  console.log(`   - Email validation`);
  console.log(`   - Request size limit (10KB)`);
  console.log(`   - Spam detection`);
});
