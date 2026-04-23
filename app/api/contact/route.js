import validator from 'validator';

function sanitizeInput(input) {
  if (typeof input !== 'string') return '';

  return validator.escape(validator.stripLow(input)).trim();
}

function isValidEmail(email) {
  return validator.isEmail(email, {
    allow_display_name: false,
    require_tld: true,
    allow_utf8_local_part: false,
  });
}

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return Response.json(
      { ok: false, message: 'Format JSON tidak valid.' },
      { status: 400 },
    );
  }

  const { name, email, service, message } = body ?? {};

  if (!name || !email || !message) {
    return Response.json(
      { ok: false, message: 'Nama, email, dan pesan wajib diisi.' },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return Response.json(
      { ok: false, message: 'Format email tidak valid.' },
      { status: 400 },
    );
  }

  const sanitizedName = sanitizeInput(name);
  const sanitizedEmail = validator.normalizeEmail(email) || email;
  const sanitizedService = service ? sanitizeInput(service) : '';
  const sanitizedMessage = sanitizeInput(message);

  if (sanitizedName.length < 2 || sanitizedName.length > 100) {
    return Response.json(
      { ok: false, message: 'Nama harus antara 2-100 karakter.' },
      { status: 400 },
    );
  }

  if (sanitizedMessage.length < 10 || sanitizedMessage.length > 1000) {
    return Response.json(
      { ok: false, message: 'Pesan harus antara 10-1000 karakter.' },
      { status: 400 },
    );
  }

  const spamPatterns = [/viagra/i, /casino/i, /lottery/i, /click here/i, /buy now/i];
  const combinedText = `${sanitizedName} ${sanitizedMessage}`.toLowerCase();
  const isSpam = spamPatterns.some((pattern) => pattern.test(combinedText));

  if (isSpam) {
    return Response.json(
      { ok: false, message: 'Pesan terdeteksi sebagai spam.' },
      { status: 400 },
    );
  }

  console.log('[CONTACT FORM]', {
    name: sanitizedName,
    email: sanitizedEmail,
    service: sanitizedService,
    timestamp: new Date().toISOString(),
  });

  return Response.json({
    ok: true,
    message: 'Pesan diterima. Saya akan tindak lanjuti lewat kontak yang Anda kirim.',
  });
}