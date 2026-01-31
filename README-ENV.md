# Hướng dẫn cấu hình Web3 và Supabase

## 1. Cấu hình Environment Variables

### Tạo file .env

Copy file `.env.example` thành `.env`:

```bash
cp .env.example .env
```

### Cấu hình các biến trong .env

Mở file `.env` và điền các thông tin sau:

```env
# Solana Configuration
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
SOLANA_NETWORK=mainnet-beta

# Website Wallet Address (địa chỉ ví của website để nhận SOL)
# QUAN TRỌNG: Điền địa chỉ ví Solana của bạn để nhận SOL từ người dùng
WALLET_ADDRESS=YourWalletAddressHere

# Supabase Configuration
# Lấy từ Supabase Dashboard: https://app.supabase.com
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Environment
NODE_ENV=development
```

### Lưu ý quan trọng:

1. **WALLET_ADDRESS**: Đây là địa chỉ ví Solana của website để nhận SOL từ người dùng khi họ mở hòm. Bạn cần:
   - Tạo một ví Solana mới (có thể dùng Phantom, Solflare, v.v.)
   - Copy địa chỉ ví (public key)
   - Điền vào `WALLET_ADDRESS` trong file `.env`

2. **SOLANA_RPC_URL**: 
   - Mainnet: `https://api.mainnet-beta.solana.com` (cho production)
   - Devnet: `https://api.devnet.solana.com` (cho testing)

3. **File .env**: KHÔNG commit file `.env` vào Git! File này chứa thông tin nhạy cảm.

## 2. Build Project

Sau khi cấu hình `.env`, chạy build để inject environment variables:

```bash
npm run build
```

Hoặc nếu đang development:

```bash
npm run dev
```

Script sẽ tự động:
- Đọc file `.env`
- Tạo file `dist/js/env.js` với các biến môi trường
- Inject vào frontend để sử dụng

## 3. Sử dụng trong Code

### Kiểm tra config

```javascript
// Kiểm tra xem đã config đầy đủ chưa
if (window.CONFIG && window.CONFIG.isConfigured()) {
    console.log('Config OK!');
} else {
    console.error('Chưa config đầy đủ!');
}
```

### Lấy giá trị config

```javascript
// Lấy địa chỉ ví nhận
const walletAddress = window.CONFIG.walletAddress;

// Lấy RPC URL
const rpcUrl = window.CONFIG.solanaRpcUrl;
```

### Mở hòm với SOL thật

```javascript
// Giá hòm tính bằng SOL (ví dụ: 0.1 SOL)
const casePriceSol = 0.1;

// Mở hòm với SOL thật
window.solanaPayment.openCase(
    casePriceSol,
    // Callback khi thành công
    (signature) => {
        console.log('Thanh toán thành công!', signature);
        // Tiếp tục mở hòm...
    },
    // Callback khi lỗi
    (error) => {
        console.error('Lỗi thanh toán:', error);
        alert(error);
    }
);
```

## 4. Tích hợp Supabase

### Tạo Supabase Project

1. Truy cập https://app.supabase.com và tạo project mới
2. Lấy URL và keys từ Settings > API:
   - `SUPABASE_URL`: Project URL
   - `SUPABASE_ANON_KEY`: anon/public key
   - `SUPABASE_SERVICE_ROLE_KEY`: service_role key (bảo mật!)

### Tạo Database Tables

Chạy SQL sau trong Supabase SQL Editor:

```sql
-- Bảng lưu transactions
CREATE TABLE IF NOT EXISTS transactions (
  id BIGSERIAL PRIMARY KEY,
  wallet_address TEXT NOT NULL,
  transaction_signature TEXT UNIQUE NOT NULL,
  case_name TEXT,
  case_price_usd DECIMAL(10, 2),
  case_price_sol DECIMAL(10, 6),
  item_won TEXT,
  item_price DECIMAL(10, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bảng lưu case openings
CREATE TABLE IF NOT EXISTS case_openings (
  id BIGSERIAL PRIMARY KEY,
  wallet_address TEXT NOT NULL,
  case_name TEXT NOT NULL,
  item_won_id INTEGER,
  item_won_name TEXT,
  item_price DECIMAL(10, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index để query nhanh hơn
CREATE INDEX IF NOT EXISTS idx_transactions_wallet ON transactions(wallet_address);
CREATE INDEX IF NOT EXISTS idx_transactions_created ON transactions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_case_openings_wallet ON case_openings(wallet_address);
CREATE INDEX IF NOT EXISTS idx_case_openings_created ON case_openings(created_at DESC);
```

### Cấu hình .env

Điền thông tin Supabase vào `.env`:
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### Rebuild Project

```bash
npm run build
```

## 5. Cấu trúc Files

```
.
├── .env                    # Environment variables (KHÔNG commit)
├── .env.example            # Template cho .env
├── inject-env.js           # Script inject env vào frontend
├── src/js/
│   ├── config.js           # Module đọc config từ window.ENV
│   └── solana-payment.js   # Module xử lý thanh toán SOL
└── dist/js/
    └── env.js              # File được generate từ .env (auto-generated)
```

## 6. Troubleshooting

### Lỗi: "WALLET_ADDRESS chưa được cấu hình"

- Kiểm tra file `.env` có tồn tại không
- Kiểm tra `WALLET_ADDRESS` đã được điền chưa
- Chạy lại `npm run build`

### Lỗi: "Địa chỉ ví nhận chưa được cấu hình"

- Đảm bảo đã build project sau khi cấu hình `.env`
- Kiểm tra file `dist/js/env.js` có được tạo không
- Kiểm tra script `env.js` được load trước `config.js`

### Transaction thất bại

- Kiểm tra user có đủ SOL không
- Kiểm tra network (mainnet/devnet) có đúng không
- Kiểm tra địa chỉ ví nhận có hợp lệ không

## 7. Security Notes

⚠️ **QUAN TRỌNG:**

1. **KHÔNG** commit file `.env` vào Git
2. **KHÔNG** expose private key của ví trong code
3. **KHÔNG** hardcode địa chỉ ví trong code
4. Sử dụng environment variables cho tất cả config nhạy cảm

## 8. Cách hoạt động khi quay hòm

### Với SOL thật (đã kết nối ví):

1. **Kiểm tra balance**: Hệ thống kiểm tra SOL balance từ ví thật
2. **Chuyển đổi giá**: Tự động chuyển giá USD sang SOL dựa trên giá SOL hiện tại
3. **Thanh toán**: Gửi SOL từ ví user đến ví website qua Solana blockchain
4. **Lưu transaction**: Lưu transaction vào Supabase (nếu đã config)
5. **Quay hòm**: Sau khi thanh toán thành công, mới bắt đầu quay hòm
6. **Lưu kết quả**: Lưu item nhận được vào Supabase

### Với mock balance (chưa kết nối ví):

- Sử dụng localStorage để lưu balance USD giả lập
- Không có transaction thật trên blockchain
- Không lưu vào Supabase

## 9. Next Steps

1. ✅ Cấu hình `.env` với `WALLET_ADDRESS` và `SOLANA_RPC_URL`
2. ✅ Cấu hình Supabase (optional nhưng khuyến nghị)
3. ✅ Install dependencies: `npm install`
4. ✅ Build project: `npm run build`
5. ✅ Test kết nối ví và thanh toán SOL
6. ✅ Test quay hòm với SOL thật

