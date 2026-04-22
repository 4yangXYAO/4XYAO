# Production Setup Script
# Run this to configure production deployment

param(
    [Parameter(Mandatory=$true)]
    [string]$Domain
)

Write-Host "`n=== PORTFOLIO PRODUCTION SETUP ===" -ForegroundColor Magenta
Write-Host "Domain: $Domain`n" -ForegroundColor Cyan

# 1. Create .env file
Write-Host "[1/5] Creating .env file..." -ForegroundColor Yellow
$envContent = @"
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://$Domain
API_URL=https://$Domain/api
"@
Set-Content -Path ".env" -Value $envContent
Write-Host "✅ .env created" -ForegroundColor Green

# 2. Create .env.production for Vite
Write-Host "`n[2/5] Creating .env.production..." -ForegroundColor Yellow
$envProdContent = @"
VITE_API_URL=https://$Domain
"@
Set-Content -Path ".env.production" -Value $envProdContent
Write-Host "✅ .env.production created" -ForegroundColor Green

# 3. Update CORS in server/index.js
Write-Host "`n[3/5] Updating CORS configuration..." -ForegroundColor Yellow
$serverContent = Get-Content "server/index.js" -Raw
$newOrigins = @"
const allowedOrigins = [
  'http://localhost:5173', // Dev
  'http://localhost:3001', // Dev
  'https://$Domain', // Production
  'https://www.$Domain', // Production with www
  process.env.FRONTEND_URL, // From .env
];
"@

if ($serverContent -match "const allowedOrigins = \[[^\]]+\];") {
    $serverContent = $serverContent -replace "const allowedOrigins = \[[^\]]+\];", $newOrigins
    Set-Content -Path "server/index.js" -Value $serverContent
    Write-Host "✅ CORS updated" -ForegroundColor Green
} else {
    Write-Host "⚠️  Could not update CORS automatically. Please update manually." -ForegroundColor Yellow
}

# 4. Build frontend
Write-Host "`n[4/5] Building frontend..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Frontend built successfully" -ForegroundColor Green
} else {
    Write-Host "❌ Build failed" -ForegroundColor Red
    exit 1
}

# 5. Create deployment info
Write-Host "`n[5/5] Creating deployment info..." -ForegroundColor Yellow
$deployInfo = @"
# Deployment Information

**Domain:** https://$Domain
**API Endpoint:** https://$Domain/api
**Generated:** $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")

## Files Ready for Deployment:

- ✅ dist/ (frontend build)
- ✅ server/ (backend)
- ✅ .env (environment variables)
- ✅ package.json
- ✅ node_modules/ (run 'npm install --production' on server)

## Next Steps:

### Option A: VPS Deployment

1. Upload files to server:
   ``````bash
   scp -r dist server package.json .env user@server:/path/to/app
   ``````

2. On server, install dependencies:
   ``````bash
   npm install --production
   ``````

3. Start with PM2:
   ``````bash
   pm2 start server/index.js --name portfolio
   pm2 save
   ``````

4. Configure Nginx (see DEPLOYMENT.md)

5. Enable HTTPS:
   ``````bash
   sudo certbot --nginx -d $Domain
   ``````

### Option B: Platform Deployment

**Frontend (Vercel/Netlify):**
- Build command: npm run build
- Output directory: dist
- Environment: VITE_API_URL=https://$Domain

**Backend (Railway/Render):**
- Start command: npm start
- Environment: NODE_ENV=production, FRONTEND_URL=https://$Domain

## Test Production Build Locally:

``````bash
npm start
# Visit: http://localhost:3001
``````

## Security Checklist:

- [ ] HTTPS enabled
- [ ] CORS configured for production domain
- [ ] Environment variables set
- [ ] Rate limiting active
- [ ] Firewall configured
- [ ] PM2 monitoring enabled

---

**Ready to deploy! 🚀**
"@
Set-Content -Path "DEPLOYMENT.md" -Value $deployInfo
Write-Host "✅ DEPLOYMENT.md created" -ForegroundColor Green

Write-Host "`n=== SETUP COMPLETE! ===" -ForegroundColor Magenta
Write-Host "`nNext steps:" -ForegroundColor Cyan
Write-Host "1. Review DEPLOYMENT.md for deployment instructions" -ForegroundColor White
Write-Host "2. Test locally: npm start" -ForegroundColor White
Write-Host "3. Deploy to your server or platform" -ForegroundColor White
Write-Host "`nDomain configured: https://$Domain" -ForegroundColor Green
Write-Host ""
