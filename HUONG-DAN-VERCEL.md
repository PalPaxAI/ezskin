# Hướng dẫn Deploy lên Vercel

## Cách 1: Deploy qua Vercel Dashboard (Khuyến nghị)

### Bước 1: Đăng nhập Vercel

1. Truy cập [https://vercel.com](https://vercel.com)
2. Đăng nhập bằng GitHub account của bạn

### Bước 2: Import Project

1. Click **Add New...** → **Project**
2. Chọn repository **PalPaxAI/ezskin** từ danh sách
3. Click **Import**

### Bước 3: Cấu hình Build Settings

Vercel sẽ tự động detect cấu hình từ `vercel.json`, nhưng bạn cần kiểm tra:

- **Framework Preset**: Other
- **Build Command**: `npm run build`
- **Output Directory**: `.` (root directory)
- **Install Command**: `npm install`

### Bước 4: Thêm Environment Variables

Trong phần **Environment Variables**, thêm các biến từ file `.env`:

```
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
SOLANA_NETWORK=mainnet-beta
WALLET_ADDRESS=your-wallet-address-here
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
NODE_ENV=production
```

⚠️ **Lưu ý**: 
- KHÔNG commit file `.env` vào Git
- Chỉ thêm environment variables trong Vercel Dashboard
- `SUPABASE_SERVICE_ROLE_KEY` chỉ dùng cho server-side (nếu có)

### Bước 5: Deploy

1. Click **Deploy**
2. Đợi build hoàn tất (thường mất 2-5 phút)
3. Sau khi deploy thành công, bạn sẽ nhận được URL: `https://your-project.vercel.app`

## Cách 2: Deploy qua Vercel CLI

### Bước 1: Cài đặt Vercel CLI

```bash
npm install -g vercel
```

### Bước 2: Đăng nhập

```bash
vercel login
```

### Bước 3: Deploy

```bash
# Deploy lần đầu (sẽ hỏi các câu hỏi cấu hình)
vercel

# Deploy production
vercel --prod
```

### Bước 4: Thêm Environment Variables

```bash
vercel env add SOLANA_RPC_URL
vercel env add SOLANA_NETWORK
vercel env add WALLET_ADDRESS
vercel env add SUPABASE_URL
vercel env add SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add NODE_ENV
```

Sau đó chạy lại:
```bash
vercel --prod
```

## Kiểm tra sau khi Deploy

1. ✅ Truy cập URL được cung cấp
2. ✅ Kiểm tra console browser (F12) xem có lỗi không
3. ✅ Test kết nối ví Solana
4. ✅ Test mở hòm (nếu đã config đầy đủ)
5. ✅ Kiểm tra Supabase connection

## Troubleshooting

### Lỗi: Build failed

**Nguyên nhân**: Thiếu dependencies hoặc build command sai

**Giải pháp**:
- Kiểm tra `package.json` có đầy đủ dependencies
- Đảm bảo `npm run build` chạy thành công ở local
- Kiểm tra logs trong Vercel Dashboard

### Lỗi: Environment variables not found

**Nguyên nhân**: Chưa thêm environment variables trong Vercel

**Giải pháp**:
- Vào Project Settings → Environment Variables
- Thêm tất cả các biến cần thiết
- Redeploy project

### Lỗi: 404 Not Found

**Nguyên nhân**: Routes không được cấu hình đúng

**Giải pháp**:
- Kiểm tra file `vercel.json`
- Đảm bảo các routes đã được định nghĩa
- Kiểm tra file HTML có tồn tại không

### Lỗi: Supabase connection failed

**Nguyên nhân**: SUPABASE_URL hoặc SUPABASE_ANON_KEY sai

**Giải pháp**:
- Kiểm tra lại environment variables trong Vercel
- Đảm bảo đã chạy migration SQL trong Supabase
- Kiểm tra RLS policies trong Supabase

## Custom Domain (Tùy chọn)

1. Vào Project Settings → Domains
2. Thêm domain của bạn
3. Follow hướng dẫn để cấu hình DNS

## Continuous Deployment

Sau khi kết nối với GitHub, mỗi lần push code lên `main` branch, Vercel sẽ tự động deploy lại.

## Lưu ý quan trọng

1. ⚠️ **Environment Variables**: KHÔNG commit `.env` vào Git
2. ⚠️ **Build**: Phải chạy `npm run build` trước khi deploy
3. ⚠️ **Supabase**: Đảm bảo đã chạy migration SQL
4. ⚠️ **Wallet Address**: Phải điền đúng địa chỉ ví Solana
5. ⚠️ **CORS**: Nếu có lỗi CORS, kiểm tra cấu hình Supabase

## Next Steps

Sau khi deploy thành công:

1. ✅ Test tất cả các tính năng
2. ✅ Kiểm tra performance
3. ✅ Setup custom domain (nếu cần)
4. ✅ Monitor logs và errors
5. ✅ Setup analytics (nếu cần)

---

**Hỗ trợ**: Nếu gặp vấn đề, kiểm tra:
- Vercel Dashboard → Deployments → Logs
- Browser Console (F12)
- Supabase Dashboard → Logs

