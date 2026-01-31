# Vercel Troubleshooting Guide

## Các lỗi thường gặp và cách sửa

### 1. Lỗi: Website trắng hoặc không load được

**Nguyên nhân**: File `env.js` không được tạo hoặc thiếu environment variables

**Cách sửa**:
1. Vào Vercel Dashboard → Project → Settings → Environment Variables
2. Đảm bảo đã thêm TẤT CẢ các biến sau:
   ```
   SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
   SOLANA_NETWORK=mainnet-beta
   WALLET_ADDRESS=your-wallet-address-here
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_ANON_KEY=your-anon-key-here
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
   NODE_ENV=production
   ```
3. Vào Deployments → Click vào deployment mới nhất → Redeploy

### 2. Lỗi: Build failed

**Nguyên nhân**: Thiếu dependencies hoặc build command sai

**Cách sửa**:
1. Kiểm tra Build Logs trong Vercel Dashboard
2. Đảm bảo `package.json` có đầy đủ dependencies
3. Kiểm tra Build Command: `npm run build`
4. Kiểm tra Output Directory: `.`

### 3. Lỗi: 404 Not Found cho các routes

**Nguyên nhân**: Rewrites không hoạt động đúng

**Cách sửa**:
1. Kiểm tra file `vercel.json` có đúng cấu hình không
2. Đảm bảo các file HTML tồn tại (ví dụ: `/modes/battles.html`)
3. Redeploy project

### 4. Lỗi: env.js is undefined

**Nguyên nhân**: File `dist/js/env.js` không được tạo trong quá trình build

**Cách sửa**:
1. Kiểm tra Build Logs xem có thông báo "✅ Đã tạo file env.js từ .env" không
2. Nếu không có, kiểm tra:
   - Environment variables đã được set chưa
   - `inject-env.js` có chạy trong build process không
3. Thêm vào `package.json`:
   ```json
   "scripts": {
     "vercel-build": "npm run build"
   }
   ```

### 5. Lỗi: Supabase connection failed

**Nguyên nhân**: SUPABASE_URL hoặc SUPABASE_ANON_KEY sai

**Cách sửa**:
1. Kiểm tra lại environment variables trong Vercel
2. Đảm bảo không có khoảng trắng thừa
3. Kiểm tra Supabase Dashboard → Settings → API để lấy đúng keys

### 6. Lỗi: Solana wallet không kết nối được

**Nguyên nhân**: SOLANA_RPC_URL hoặc WALLET_ADDRESS sai

**Cách sửa**:
1. Kiểm tra SOLANA_RPC_URL có đúng không
2. Kiểm tra WALLET_ADDRESS có đúng format Solana address không
3. Test với mainnet hoặc devnet tùy nhu cầu

## Cách kiểm tra Build Logs

1. Vào Vercel Dashboard
2. Chọn project của bạn
3. Vào tab **Deployments**
4. Click vào deployment mới nhất
5. Xem **Build Logs** để tìm lỗi cụ thể

## Cách test local trước khi deploy

```bash
# 1. Set environment variables (Windows PowerShell)
$env:SOLANA_RPC_URL="https://api.mainnet-beta.solana.com"
$env:SOLANA_NETWORK="mainnet-beta"
$env:WALLET_ADDRESS="your-wallet-address"
$env:SUPABASE_URL="https://your-project.supabase.co"
$env:SUPABASE_ANON_KEY="your-anon-key"
$env:SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
$env:NODE_ENV="production"

# 2. Build
npm run build

# 3. Kiểm tra file env.js đã được tạo chưa
# File: dist/js/env.js

# 4. Test local với server
npm start
```

## Checklist trước khi deploy

- [ ] Đã thêm TẤT CẢ environment variables trong Vercel
- [ ] Đã test build local thành công
- [ ] File `vercel.json` đúng cấu hình
- [ ] `package.json` có đầy đủ dependencies
- [ ] Đã chạy migration SQL trong Supabase
- [ ] Đã kiểm tra Build Logs không có lỗi

## Debug trong Browser Console

Mở Browser Console (F12) và kiểm tra:

```javascript
// Kiểm tra env.js đã load chưa
console.log(window.ENV);

// Kiểm tra config
console.log(window.CONFIG);

// Kiểm tra Supabase
console.log(window.supabaseClient);

// Kiểm tra wallet
console.log(window.wallet);
```

Nếu `window.ENV` là `undefined`, có nghĩa là file `env.js` chưa được tạo hoặc chưa load.

## Liên hệ hỗ trợ

Nếu vẫn gặp vấn đề:
1. Copy Build Logs từ Vercel
2. Copy Console errors từ Browser
3. Mô tả chi tiết lỗi gặp phải

