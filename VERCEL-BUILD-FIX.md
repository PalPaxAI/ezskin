# Fix Vercel Build - Static Files Not Serving

## Vấn đề
Vercel đang trả về HTML thay vì static files (JS, CSS, images) từ thư mục `dist/`.

## Nguyên nhân có thể
1. Build không tạo ra `dist/` folder
2. Environment variables thiếu khiến build fail
3. Vercel không serve static files đúng cách

## Cách sửa

### Bước 1: Kiểm tra Build Logs trên Vercel

1. Vào Vercel Dashboard → Project → Deployments
2. Click vào deployment mới nhất
3. Xem **Build Logs**
4. Tìm các dòng:
   - `✅ Đã tạo file env.js từ .env` - Nếu không thấy, env variables chưa được set
   - `Finished 'build'` - Nếu không thấy, build đã fail
   - Lỗi về missing dependencies

### Bước 2: Đảm bảo Environment Variables đã được set

Vào **Settings → Environment Variables** và thêm:

```
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
SOLANA_NETWORK=mainnet-beta
WALLET_ADDRESS=your-wallet-address
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NODE_ENV=production
```

### Bước 3: Kiểm tra Build Command

Trong Vercel Dashboard → Settings → General:
- **Build Command**: `npm run build`
- **Output Directory**: `.` (root)
- **Install Command**: `npm install`

### Bước 4: Test Build Local

Chạy local để đảm bảo build hoạt động:

```bash
# Set environment variables (Windows PowerShell)
$env:SOLANA_RPC_URL="https://api.mainnet-beta.solana.com"
$env:SOLANA_NETWORK="mainnet-beta"
$env:WALLET_ADDRESS="your-wallet-address"
$env:SUPABASE_URL="https://your-project.supabase.co"
$env:SUPABASE_ANON_KEY="your-anon-key"
$env:SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
$env:NODE_ENV="production"

# Build
npm run build

# Kiểm tra dist/ folder đã được tạo
dir dist
dir dist\js
dir dist\css
dir dist\img
```

Nếu build thành công, bạn sẽ thấy:
- `dist/js/env.js` - File env đã được tạo
- `dist/js/*.min.js` - Các file JS đã được minify
- `dist/css/*.min.css` - Các file CSS đã được minify
- `dist/img/` - Các file images

### Bước 5: Redeploy trên Vercel

1. Vào Deployments
2. Click **Redeploy** trên deployment mới nhất
3. Hoặc push code mới lên GitHub (Vercel sẽ auto-deploy)

## Nếu vẫn lỗi

### Kiểm tra Build Logs

Tìm trong Build Logs:
- `Error:` - Có lỗi gì không?
- `dist/` - Folder có được tạo không?
- `env.js` - File có được tạo không?

### Kiểm tra Network Tab

1. Mở website trên browser
2. F12 → Network tab
3. Refresh page
4. Click vào một file bị lỗi (ví dụ: `env.js`)
5. Xem Response:
   - Nếu là HTML → Vercel không tìm thấy file
   - Nếu là 404 → File không tồn tại
   - Nếu là JS/CSS → File đã được serve đúng

### Debug Steps

1. **Kiểm tra file có tồn tại không:**
   - Truy cập: `https://ezskin-voam.vercel.app/dist/js/env.js`
   - Nếu thấy HTML → File không tồn tại hoặc Vercel serve sai

2. **Kiểm tra build output:**
   - Vào Vercel Dashboard → Deployments → View Function Logs
   - Xem có lỗi gì không

3. **Thử build lại:**
   - Vào Settings → General
   - Clear Build Cache
   - Redeploy

## Solution cuối cùng

Nếu vẫn không được, có thể cần:

1. **Commit dist/ folder** (tạm thời để test):
   ```bash
   # Sửa .gitignore, comment dòng dist/
   # Build local
   npm run build
   # Commit dist/
   git add dist/
   git commit -m "Add dist folder for Vercel"
   git push
   ```

2. **Hoặc sử dụng Vercel CLI để debug:**
   ```bash
   npm install -g vercel
   vercel --prod
   ```

## Liên hệ

Nếu vẫn gặp vấn đề, cung cấp:
1. Build Logs từ Vercel
2. Console errors từ browser
3. Network tab screenshot

