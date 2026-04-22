# Security Test Script
# Test all security features of the portfolio API

Write-Host "`n=== PORTFOLIO API SECURITY TEST ===" -ForegroundColor Magenta
Write-Host "Testing: http://localhost:3001`n" -ForegroundColor Cyan

# Test 1: Health Check
Write-Host "[TEST 1] Health Check..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3001/api/health" -Method GET
    Write-Host "✅ PASS - Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "   Response: $($response.Content)" -ForegroundColor Gray
} catch {
    Write-Host "❌ FAIL - $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n"

# Test 2: Valid Contact Submission
Write-Host "[TEST 2] Valid Contact Submission..." -ForegroundColor Yellow
try {
    $body = @{
        name = "Test User"
        email = "test@example.com"
        message = "This is a valid test message from security check."
    } | ConvertTo-Json
    
    $response = Invoke-WebRequest -Uri "http://localhost:3001/api/contact" -Method POST -Body $body -ContentType "application/json"
    Write-Host "✅ PASS - Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "   Response: $($response.Content)" -ForegroundColor Gray
} catch {
    Write-Host "❌ FAIL - $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n"

# Test 3: Invalid Email Format
Write-Host "[TEST 3] Invalid Email Validation..." -ForegroundColor Yellow
try {
    $body = @{
        name = "Test User"
        email = "not-an-email"
        message = "Testing invalid email format"
    } | ConvertTo-Json
    
    $response = Invoke-WebRequest -Uri "http://localhost:3001/api/contact" -Method POST -Body $body -ContentType "application/json" -ErrorAction Stop
    Write-Host "❌ FAIL - Should reject invalid email" -ForegroundColor Red
} catch {
    if ($_.Exception.Response.StatusCode -eq 400) {
        Write-Host "✅ PASS - Correctly rejected invalid email" -ForegroundColor Green
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        Write-Host "   Response: $($reader.ReadToEnd())" -ForegroundColor Gray
    } else {
        Write-Host "❌ FAIL - Wrong error: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "`n"

# Test 4: XSS Attack Protection
Write-Host "[TEST 4] XSS Attack Protection..." -ForegroundColor Yellow
try {
    $body = @{
        name = "<script>alert('XSS')</script>"
        email = "hacker@evil.com"
        message = "<img src=x onerror='alert(1)'>"
    } | ConvertTo-Json
    
    $response = Invoke-WebRequest -Uri "http://localhost:3001/api/contact" -Method POST -Body $body -ContentType "application/json"
    $content = $response.Content | ConvertFrom-Json
    
    # Check if input was sanitized (should not contain script tags)
    if ($content.data -and ($content.data.name -match "<script>" -or $content.data.message -match "<img")) {
        Write-Host "❌ FAIL - XSS payload not sanitized!" -ForegroundColor Red
    } else {
        Write-Host "✅ PASS - XSS payload sanitized" -ForegroundColor Green
    }
    Write-Host "   Response: $($response.Content)" -ForegroundColor Gray
} catch {
    Write-Host "⚠️  Request failed: $($_.Exception.Message)" -ForegroundColor Yellow
}

Write-Host "`n"

# Test 5: Missing Required Fields
Write-Host "[TEST 5] Missing Required Fields..." -ForegroundColor Yellow
try {
    $body = @{
        name = "Test"
        email = ""
        message = ""
    } | ConvertTo-Json
    
    $response = Invoke-WebRequest -Uri "http://localhost:3001/api/contact" -Method POST -Body $body -ContentType "application/json" -ErrorAction Stop
    Write-Host "❌ FAIL - Should reject empty fields" -ForegroundColor Red
} catch {
    if ($_.Exception.Response.StatusCode -eq 400) {
        Write-Host "✅ PASS - Correctly rejected empty fields" -ForegroundColor Green
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        Write-Host "   Response: $($reader.ReadToEnd())" -ForegroundColor Gray
    } else {
        Write-Host "❌ FAIL - Wrong error: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "`n"

# Test 6: Message Too Short
Write-Host "[TEST 6] Message Length Validation..." -ForegroundColor Yellow
try {
    $body = @{
        name = "Test User"
        email = "test@example.com"
        message = "Short"
    } | ConvertTo-Json
    
    $response = Invoke-WebRequest -Uri "http://localhost:3001/api/contact" -Method POST -Body $body -ContentType "application/json" -ErrorAction Stop
    Write-Host "❌ FAIL - Should reject short message" -ForegroundColor Red
} catch {
    if ($_.Exception.Response.StatusCode -eq 400) {
        Write-Host "✅ PASS - Correctly rejected short message" -ForegroundColor Green
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        Write-Host "   Response: $($reader.ReadToEnd())" -ForegroundColor Gray
    } else {
        Write-Host "❌ FAIL - Wrong error: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "`n"

# Test 7: Spam Detection
Write-Host "[TEST 7] Spam Detection..." -ForegroundColor Yellow
try {
    $body = @{
        name = "Spammer"
        email = "spam@test.com"
        message = "Click here to buy viagra and win the lottery at our casino!"
    } | ConvertTo-Json
    
    $response = Invoke-WebRequest -Uri "http://localhost:3001/api/contact" -Method POST -Body $body -ContentType "application/json" -ErrorAction Stop
    Write-Host "❌ FAIL - Should detect spam" -ForegroundColor Red
} catch {
    if ($_.Exception.Response.StatusCode -eq 400) {
        Write-Host "✅ PASS - Spam detected and blocked" -ForegroundColor Green
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        Write-Host "   Response: $($reader.ReadToEnd())" -ForegroundColor Gray
    } else {
        Write-Host "❌ FAIL - Wrong error: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "`n"

# Test 8: Rate Limiting (send 6 requests quickly)
Write-Host "[TEST 8] Rate Limiting (5 req/hour limit)..." -ForegroundColor Yellow
$successCount = 0
for ($i = 1; $i -le 6; $i++) {
    try {
        $body = @{
            name = "Rate Test $i"
            email = "ratetest$i@example.com"
            message = "Testing rate limiting with request number $i"
        } | ConvertTo-Json
        
        $response = Invoke-WebRequest -Uri "http://localhost:3001/api/contact" -Method POST -Body $body -ContentType "application/json" -ErrorAction Stop
        $successCount++
        Write-Host "   Request $i : ✅ Accepted" -ForegroundColor Green
    } catch {
        if ($_.Exception.Response.StatusCode -eq 429) {
            Write-Host "   Request $i : ⛔ Rate limited (expected)" -ForegroundColor Yellow
        } else {
            Write-Host "   Request $i : ❌ Error: $($_.Exception.Message)" -ForegroundColor Red
        }
    }
    Start-Sleep -Milliseconds 100
}

if ($successCount -le 5) {
    Write-Host "✅ PASS - Rate limiting working (accepted $successCount/6 requests)" -ForegroundColor Green
} else {
    Write-Host "❌ FAIL - Rate limiting not working (accepted $successCount/6 requests)" -ForegroundColor Red
}

Write-Host "`n=== TEST COMPLETE ===" -ForegroundColor Magenta
