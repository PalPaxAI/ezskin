# Hướng dẫn tạo Database trên Supabase

## Bước 1: Truy cập Supabase Dashboard

1. Đăng nhập vào [Supabase Dashboard](https://app.supabase.com)
2. Chọn project của bạn (hoặc tạo project mới nếu chưa có)

## Bước 2: Mở SQL Editor

1. Trong sidebar bên trái, click vào **SQL Editor**
2. Click vào **New query** để tạo query mới

## Bước 3: Chạy Migration Script

1. Mở file `supabase-migration.sql` trong project của bạn
2. Copy toàn bộ nội dung file
3. Paste vào SQL Editor trong Supabase
4. Click **Run** hoặc nhấn `Ctrl + Enter` (Windows) / `Cmd + Enter` (Mac)

## Bước 4: Kiểm tra kết quả

Sau khi chạy script thành công, bạn sẽ thấy:

### Các bảng đã được tạo:

1. **users** - Lưu thông tin người dùng
2. **transactions** - Lưu tất cả giao dịch SOL
3. **case_openings** - Lịch sử mở hòm
4. **inventory** - Inventory của người chơi
5. **game_transactions** - Giao dịch từ các game modes
6. **coinflip_games** - Chi tiết game coinflip
7. **crash_games** - Chi tiết game crash
8. **roulette_games** - Chi tiết game roulette
9. **jackpot_games** - Chi tiết game jackpot
10. **battles_games** - Chi tiết game battles
11. **saper_games** - Chi tiết game saper
12. **upgrader_games** - Chi tiết game upgrader
13. **statistics** - Thống kê tổng hợp

### Kiểm tra trong Supabase:

1. Vào **Table Editor** trong sidebar
2. Bạn sẽ thấy tất cả các bảng đã được tạo
3. Click vào từng bảng để xem cấu trúc columns

## Bước 5: Cấu hình Row Level Security (RLS)

⚠️ **Lưu ý quan trọng về bảo mật:**

File migration đã tạo các RLS policies cơ bản. Tuy nhiên, bạn có thể cần điều chỉnh dựa trên nhu cầu bảo mật của mình:

### Option 1: Cho phép public access (Development)
- Các policies hiện tại đã cho phép public read/write
- Phù hợp cho development và testing

### Option 2: Chỉ cho phép authenticated users (Production)
Nếu bạn muốn chỉ cho phép authenticated users, bạn cần:

1. Vào **Authentication** > **Policies** trong Supabase
2. Điều chỉnh các policies để chỉ cho phép authenticated users
3. Hoặc sử dụng service_role_key cho server-side operations

## Bước 6: Lấy API Keys

1. Vào **Settings** > **API** trong Supabase Dashboard
2. Copy các thông tin sau:
   - **Project URL** → Điền vào `SUPABASE_URL` trong `.env`
   - **anon public key** → Điền vào `SUPABASE_ANON_KEY` trong `.env`
   - **service_role key** → Điền vào `SUPABASE_SERVICE_ROLE_KEY` trong `.env`

⚠️ **Cảnh báo:** `service_role key` có quyền cao, KHÔNG expose ra frontend!

## Bước 7: Cập nhật .env file

Mở file `.env` và cập nhật:

```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

## Bước 8: Rebuild project

Sau khi cập nhật `.env`, chạy:

```bash
npm run build
```

## Cấu trúc Database

### Users Table
- Lưu thông tin người dùng
- Wallet address, email, nickname, avatar
- Balance (USD và SOL)
- Thống kê tổng hợp

### Transactions Table
- Tất cả giao dịch SOL
- Transaction signature (unique)
- Loại giao dịch: deposit, withdrawal, case_payment, game_payment, reward, refund
- Status: pending, confirmed, failed, cancelled

### Case Openings Table
- Lịch sử mở hòm
- Item nhận được
- Giá trị và profit/loss

### Inventory Table
- Items trong inventory của người chơi
- Source: case_opening, game_reward, purchase, trade
- Trạng thái đã bán chưa

### Game Transactions Table
- Giao dịch từ tất cả game modes
- Bet amount, win amount, result
- Profit/loss

### Game-specific Tables
- Chi tiết từng loại game
- Lưu thông tin cụ thể của từng game mode

### Statistics Table
- Thống kê tổng hợp
- Số lần mở hòm, số game đã chơi
- Số lần thắng/thua theo từng game mode

## Troubleshooting

### Lỗi: "permission denied"
- Kiểm tra RLS policies
- Đảm bảo đã enable RLS trên các bảng
- Kiểm tra API keys có đúng không

### Lỗi: "relation already exists"
- Các bảng đã tồn tại
- Có thể bỏ qua hoặc drop và tạo lại

### Lỗi: "extension uuid-ossp does not exist"
- Supabase đã có sẵn extension này
- Nếu vẫn lỗi, có thể bỏ qua dòng CREATE EXTENSION

### Không thấy dữ liệu
- Kiểm tra RLS policies có cho phép insert không
- Kiểm tra API keys trong `.env`
- Kiểm tra console log trong browser để xem lỗi

## Next Steps

1. ✅ Database đã được tạo
2. ✅ Cấu hình `.env` với Supabase keys
3. ✅ Rebuild project
4. ✅ Test kết nối Supabase từ frontend
5. ✅ Test lưu transaction và case opening

## Support

Nếu gặp vấn đề, kiểm tra:
- Supabase Dashboard > Logs để xem lỗi
- Browser Console để xem lỗi frontend
- Network tab để xem API requests

