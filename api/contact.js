import validator from "validator";

function sanitizeInput(input) {
  if (typeof input !== "string") return "";

  return validator.escape(validator.stripLow(input)).trim();
}

function isValidEmail(email) {
  return validator.isEmail(email, {
    allow_display_name: false,
    require_tld: true,
    allow_utf8_local_part: false,
  });
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10kb",
    },
  },
};

export default function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({
      ok: false,
      message: "Method tidak diizinkan.",
    });
  }

  let body = req.body ?? {};

  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({
        ok: false,
        message: "Format JSON tidak valid.",
      });
    }
  }

  const { name, email, service, message } = body;

  if (!name || !email || !message) {
    return res.status(400).json({
      ok: false,
      message: "Nama, email, dan pesan wajib diisi.",
    });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({
      ok: false,
      message: "Format email tidak valid.",
    });
  }

  const sanitizedName = sanitizeInput(name);
  const sanitizedEmail = validator.normalizeEmail(email) || email;
  const sanitizedService = service ? sanitizeInput(service) : "";
  const sanitizedMessage = sanitizeInput(message);

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

  console.log("[CONTACT FORM]", {
    name: sanitizedName,
    email: sanitizedEmail,
    service: sanitizedService,
    timestamp: new Date().toISOString(),
    ip: req.headers?.["x-forwarded-for"] ?? req.socket?.remoteAddress ?? "",
  });

  return res.status(200).json({
    ok: true,
    message:
      "Pesan diterima. Saya akan tindak lanjuti lewat kontak yang Anda kirim.",
  });
}
