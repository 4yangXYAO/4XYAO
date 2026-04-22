# 🔒 Security Features Documentation

**Portfolio API - Security Implementation**  
**Updated:** 2026-04-22 19:56 WIB

---

## 📋 **Overview**

Portfolio API telah dilengkapi dengan **7 layer security protection** untuk mencegah berbagai jenis serangan cyber.

---

## 🛡️ **Security Features**

### **1. Helmet - Security Headers**

**Protection:**
- XSS (Cross-Site Scripting)
- Clickjacking
- MIME type sniffing
- Content Security Policy

**Implementation:**
```javascript
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));
```

---

### **2. CORS Protection**

**Protection:**
- Unauthorized domain access
- CSRF attacks

**Allowed Origins:**
- `http://localhost:5173` (Vite dev)
- `http://localhost:3001` (Production)

**Implementation:**
```javascript
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('CORS policy: Origin not allowed'), false);
    }
    return callback(null, true);
  },
  credentials: true,
}));
```

---

### **3. Rate Limiting**

**Global Limit:**
- 100 requests per 15 minutes

**Contact Endpoint Limit:**
- 5 submissions per hour

**Protection:**
- DDoS attacks
- Spam attacks
- Brute force

**Implementation:**
```javascript
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: {
    ok: false,
    message: 'Anda sudah mengirim terlalu banyak pesan. Coba lagi dalam 1 jam.',
  },
});
```

---

### **4. Input Sanitization**

**Protection:**
- XSS injection
- HTML injection
- Script injection

**Features:**
- Strip HTML tags
- Escape special characters
- Remove low ASCII characters
- Trim whitespace

**Implementation:**
```javascript
function sanitizeInput(input) {
  let sanitized = validator.stripLow(input);
  sanitized = validator.escape(sanitized);
  sanitized = sanitized.trim();
  return sanitized;
}
```

---

### **5. Email Validation**

**Protection:**
- Invalid email formats
- Email spoofing

**Validation Rules:**
- Must be valid email format
- Require TLD (Top Level Domain)
- No display names
- No UTF-8 local parts

**Implementation:**
```javascript
function isValidEmail(email) {
  return validator.isEmail(email, {
    allow_display_name: false,
    require_tld: true,
    allow_utf8_local_part: false,
  });
}
```

---

### **6. Request Size Limit**

**Protection:**
- Memory exhaustion
- Buffer overflow
- DoS attacks

**Limit:** 10KB per request

**Implementation:**
```javascript
app.use(express.json({ limit: '10kb' }));
```

---

### **7. Spam Detection**

**Protection:**
- Spam messages
- Malicious content

**Blocked Keywords:**
- viagra
- casino
- lottery
- click here
- buy now

**Implementation:**
```javascript
const spamPatterns = [
  /viagra/i,
  /casino/i,
  /lottery/i,
  /click here/i,
  /buy now/i,
];
```

---

## 🎯 **Validation Rules**

### **Name Field:**
- Required: ✅
- Min length: 2 characters
- Max length: 100 characters
- Sanitized: ✅

### **Email Field:**
- Required: ✅
- Valid format: ✅
- Normalized: ✅

### **Message Field:**
- Required: ✅
- Min length: 10 characters
- Max length: 1000 characters
- Sanitized: ✅
- Spam check: ✅

---

## 🧪 **Testing**

### **Run Security Tests:**

```powershell
# Start server
npm run dev:server

# Run tests (in new terminal)
powershell -File test-security.ps1
```

### **Test Cases:**

1. ✅ Health check
2. ✅ Valid contact submission
3. ✅ Invalid email rejection
4. ✅ XSS attack protection
5. ✅ Missing fields rejection
6. ✅ Message length validation
7. ✅ Spam detection
8. ✅ Rate limiting

---

## 📊 **Before vs After**

| Vulnerability | Before | After |
|---------------|--------|-------|
| **Rate Limiting** | ❌ None | ✅ 5 req/hour |
| **Input Validation** | ❌ None | ✅ Full sanitization |
| **XSS Protection** | ❌ Vulnerable | ✅ Protected |
| **CORS** | ❌ Open | ✅ Restricted |
| **Email Validation** | ❌ Weak | ✅ Strict |
| **Request Size** | ❌ Unlimited | ✅ 10KB limit |
| **Spam Detection** | ❌ None | ✅ Pattern matching |

---

## 🚀 **Usage**

### **Start Server:**

```bash
# Development
npm run dev

# Production
npm start
```

### **API Endpoints:**

**Health Check:**
```bash
GET /api/health
```

**Contact Form:**
```bash
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "service": "Web Development",
  "message": "Your message here (min 10 chars)"
}
```

---

## ⚠️ **Error Responses**

### **400 Bad Request:**
```json
{
  "ok": false,
  "message": "Nama, email, dan pesan wajib diisi."
}
```

### **429 Too Many Requests:**
```json
{
  "ok": false,
  "message": "Anda sudah mengirim terlalu banyak pesan. Coba lagi dalam 1 jam."
}
```

### **403 Forbidden:**
```json
{
  "ok": false,
  "message": "Akses ditolak: Origin tidak diizinkan."
}
```

---

## 🔧 **Configuration**

### **Add Production Domain:**

Edit `server/index.js`:

```javascript
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3001',
  'https://yourdomain.com', // Add your domain
];
```

### **Adjust Rate Limits:**

```javascript
// Contact endpoint
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // Change time window
  max: 5, // Change max requests
});
```

---

## 📦 **Dependencies**

```json
{
  "helmet": "^7.x.x",
  "express-rate-limit": "^7.x.x",
  "validator": "^13.x.x",
  "cors": "^2.x.x"
}
```

---

## 🎓 **Best Practices**

1. ✅ Always validate user input
2. ✅ Sanitize before storing/displaying
3. ✅ Use HTTPS in production
4. ✅ Keep dependencies updated
5. ✅ Monitor rate limit logs
6. ✅ Add CAPTCHA for extra protection
7. ✅ Use environment variables for secrets

---

## 🔐 **Security Checklist**

- [x] Helmet security headers
- [x] CORS protection
- [x] Rate limiting
- [x] Input sanitization
- [x] Email validation
- [x] Request size limit
- [x] Spam detection
- [x] Error handling
- [ ] CAPTCHA (optional)
- [ ] Database encryption (if using DB)
- [ ] API authentication (if needed)

---

## 📞 **Support**

Jika menemukan security issue, segera report!

---

**Portfolio API is now secure! 🔒✨**
