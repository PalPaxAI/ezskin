-- ============================================
-- Supabase Database Migration Script
-- EZSkin - CS:GO Case Opening Platform
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. USERS TABLE
-- Lưu thông tin người dùng
-- ============================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  wallet_address TEXT UNIQUE,
  email TEXT UNIQUE,
  nickname TEXT,
  avatar TEXT,
  balance_usd DECIMAL(12, 2) DEFAULT 0.00,
  balance_sol DECIMAL(12, 6) DEFAULT 0.000000,
  total_deposited DECIMAL(12, 2) DEFAULT 0.00,
  total_withdrawn DECIMAL(12, 2) DEFAULT 0.00,
  total_won DECIMAL(12, 2) DEFAULT 0.00,
  total_lost DECIMAL(12, 2) DEFAULT 0.00,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE
);

-- ============================================
-- 2. TRANSACTIONS TABLE
-- Lưu tất cả các giao dịch SOL
-- ============================================
CREATE TABLE IF NOT EXISTS transactions (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  wallet_address TEXT NOT NULL,
  transaction_signature TEXT UNIQUE NOT NULL,
  transaction_type TEXT NOT NULL CHECK (transaction_type IN ('deposit', 'withdrawal', 'case_payment', 'game_payment', 'reward', 'refund')),
  case_name TEXT,
  game_mode TEXT CHECK (game_mode IN ('coinflip', 'crash', 'roulette', 'jackpot', 'battles', 'saper', 'upgrader', NULL)),
  amount_sol DECIMAL(12, 6) NOT NULL,
  amount_usd DECIMAL(12, 2),
  sol_price_usd DECIMAL(10, 2),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'failed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  confirmed_at TIMESTAMP WITH TIME ZONE,
  metadata JSONB
);

-- ============================================
-- 3. CASE_OPENINGS TABLE
-- Lưu lịch sử mở hòm
-- ============================================
CREATE TABLE IF NOT EXISTS case_openings (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  wallet_address TEXT NOT NULL,
  transaction_id BIGINT REFERENCES transactions(id) ON DELETE SET NULL,
  case_name TEXT NOT NULL,
  case_price_usd DECIMAL(10, 2),
  case_price_sol DECIMAL(10, 6),
  item_won_id INTEGER,
  item_won_name TEXT NOT NULL,
  item_won_image TEXT,
  item_rarity TEXT CHECK (item_rarity IN ('common', 'uncommon', 'rare', 'epic', 'legendary', 'mythic')),
  item_price_usd DECIMAL(10, 2),
  profit_loss DECIMAL(10, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 4. INVENTORY TABLE
-- Lưu inventory của người chơi
-- ============================================
CREATE TABLE IF NOT EXISTS inventory (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  wallet_address TEXT NOT NULL,
  item_id INTEGER NOT NULL,
  item_name TEXT NOT NULL,
  item_image TEXT,
  item_rarity TEXT CHECK (item_rarity IN ('common', 'uncommon', 'rare', 'epic', 'legendary', 'mythic')),
  item_price_usd DECIMAL(10, 2),
  source TEXT CHECK (source IN ('case_opening', 'game_reward', 'purchase', 'trade')),
  case_opening_id BIGINT REFERENCES case_openings(id) ON DELETE SET NULL,
  is_sold BOOLEAN DEFAULT FALSE,
  sold_at TIMESTAMP WITH TIME ZONE,
  sold_price_usd DECIMAL(10, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 5. GAME_TRANSACTIONS TABLE
-- Lưu giao dịch từ các game modes
-- ============================================
CREATE TABLE IF NOT EXISTS game_transactions (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  wallet_address TEXT NOT NULL,
  transaction_id BIGINT REFERENCES transactions(id) ON DELETE SET NULL,
  game_mode TEXT NOT NULL CHECK (game_mode IN ('coinflip', 'crash', 'roulette', 'jackpot', 'battles', 'saper', 'upgrader')),
  bet_amount_usd DECIMAL(10, 2) NOT NULL,
  bet_amount_sol DECIMAL(10, 6),
  win_amount_usd DECIMAL(10, 2) DEFAULT 0.00,
  win_amount_sol DECIMAL(10, 6) DEFAULT 0.000000,
  result TEXT NOT NULL CHECK (result IN ('win', 'lose', 'draw')),
  profit_loss DECIMAL(10, 2),
  game_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 6. COINFLIP_GAMES TABLE
-- Chi tiết các game coinflip
-- ============================================
CREATE TABLE IF NOT EXISTS coinflip_games (
  id BIGSERIAL PRIMARY KEY,
  game_transaction_id BIGINT REFERENCES game_transactions(id) ON DELETE SET NULL,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  wallet_address TEXT NOT NULL,
  bet_side TEXT NOT NULL CHECK (bet_side IN ('ct', 't')),
  result_side TEXT NOT NULL CHECK (result_side IN ('heads', 'tails')),
  bet_amount DECIMAL(10, 2) NOT NULL,
  multiplier DECIMAL(4, 2) DEFAULT 2.00,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 7. CRASH_GAMES TABLE
-- Chi tiết các game crash
-- ============================================
CREATE TABLE IF NOT EXISTS crash_games (
  id BIGSERIAL PRIMARY KEY,
  game_transaction_id BIGINT REFERENCES game_transactions(id) ON DELETE SET NULL,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  wallet_address TEXT NOT NULL,
  bet_amount DECIMAL(10, 2) NOT NULL,
  cashout_multiplier DECIMAL(6, 2),
  crash_point DECIMAL(6, 2),
  result TEXT CHECK (result IN ('win', 'lose')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 8. ROULETTE_GAMES TABLE
-- Chi tiết các game roulette
-- ============================================
CREATE TABLE IF NOT EXISTS roulette_games (
  id BIGSERIAL PRIMARY KEY,
  game_transaction_id BIGINT REFERENCES game_transactions(id) ON DELETE SET NULL,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  wallet_address TEXT NOT NULL,
  bet_color TEXT CHECK (bet_color IN ('red', 'black', 'green')),
  bet_number INTEGER CHECK (bet_number >= 0 AND bet_number <= 36),
  result_number INTEGER NOT NULL CHECK (result_number >= 0 AND result_number <= 36),
  result_color TEXT NOT NULL CHECK (result_color IN ('red', 'black', 'green')),
  bet_amount DECIMAL(10, 2) NOT NULL,
  multiplier DECIMAL(4, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 9. JACKPOT_GAMES TABLE
-- Chi tiết các game jackpot
-- ============================================
CREATE TABLE IF NOT EXISTS jackpot_games (
  id BIGSERIAL PRIMARY KEY,
  game_transaction_id BIGINT REFERENCES game_transactions(id) ON DELETE SET NULL,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  wallet_address TEXT NOT NULL,
  bet_amount DECIMAL(10, 2) NOT NULL,
  total_pot DECIMAL(10, 2) NOT NULL,
  is_winner BOOLEAN DEFAULT FALSE,
  win_amount DECIMAL(10, 2) DEFAULT 0.00,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 10. BATTLES_GAMES TABLE
-- Chi tiết các game battles
-- ============================================
CREATE TABLE IF NOT EXISTS battles_games (
  id BIGSERIAL PRIMARY KEY,
  game_transaction_id BIGINT REFERENCES game_transactions(id) ON DELETE SET NULL,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  wallet_address TEXT NOT NULL,
  bet_amount DECIMAL(10, 2) NOT NULL,
  opponent_wallet TEXT,
  result TEXT CHECK (result IN ('win', 'lose', 'draw')),
  win_amount DECIMAL(10, 2) DEFAULT 0.00,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 11. SAPER_GAMES TABLE
-- Chi tiết các game saper (minesweeper)
-- ============================================
CREATE TABLE IF NOT EXISTS saper_games (
  id BIGSERIAL PRIMARY KEY,
  game_transaction_id BIGINT REFERENCES game_transactions(id) ON DELETE SET NULL,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  wallet_address TEXT NOT NULL,
  bet_amount DECIMAL(10, 2) NOT NULL,
  mines_count INTEGER NOT NULL,
  tiles_opened INTEGER DEFAULT 0,
  result TEXT CHECK (result IN ('win', 'lose', 'in_progress')),
  win_amount DECIMAL(10, 2) DEFAULT 0.00,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 12. UPGRADER_GAMES TABLE
-- Chi tiết các game upgrader
-- ============================================
CREATE TABLE IF NOT EXISTS upgrader_games (
  id BIGSERIAL PRIMARY KEY,
  game_transaction_id BIGINT REFERENCES game_transactions(id) ON DELETE SET NULL,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  wallet_address TEXT NOT NULL,
  bet_amount DECIMAL(10, 2) NOT NULL,
  item_id INTEGER,
  item_name TEXT,
  upgrade_level INTEGER DEFAULT 1,
  result TEXT CHECK (result IN ('win', 'lose')),
  win_amount DECIMAL(10, 2) DEFAULT 0.00,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 13. STATISTICS TABLE
-- Lưu thống kê tổng hợp
-- ============================================
CREATE TABLE IF NOT EXISTS statistics (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  wallet_address TEXT NOT NULL,
  total_cases_opened INTEGER DEFAULT 0,
  total_games_played INTEGER DEFAULT 0,
  total_wins INTEGER DEFAULT 0,
  total_losses INTEGER DEFAULT 0,
  coinflip_wins INTEGER DEFAULT 0,
  crash_wins INTEGER DEFAULT 0,
  roulette_wins INTEGER DEFAULT 0,
  jackpot_wins INTEGER DEFAULT 0,
  battles_wins INTEGER DEFAULT 0,
  saper_wins INTEGER DEFAULT 0,
  upgrader_wins INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- INDEXES for Performance
-- ============================================

-- Users indexes
CREATE INDEX IF NOT EXISTS idx_users_wallet ON users(wallet_address);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_created ON users(created_at DESC);

-- Transactions indexes
CREATE INDEX IF NOT EXISTS idx_transactions_user ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_wallet ON transactions(wallet_address);
CREATE INDEX IF NOT EXISTS idx_transactions_signature ON transactions(transaction_signature);
CREATE INDEX IF NOT EXISTS idx_transactions_type ON transactions(transaction_type);
CREATE INDEX IF NOT EXISTS idx_transactions_created ON transactions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON transactions(status);

-- Case openings indexes
CREATE INDEX IF NOT EXISTS idx_case_openings_user ON case_openings(user_id);
CREATE INDEX IF NOT EXISTS idx_case_openings_wallet ON case_openings(wallet_address);
CREATE INDEX IF NOT EXISTS idx_case_openings_case_name ON case_openings(case_name);
CREATE INDEX IF NOT EXISTS idx_case_openings_created ON case_openings(created_at DESC);

-- Inventory indexes
CREATE INDEX IF NOT EXISTS idx_inventory_user ON inventory(user_id);
CREATE INDEX IF NOT EXISTS idx_inventory_wallet ON inventory(wallet_address);
CREATE INDEX IF NOT EXISTS idx_inventory_sold ON inventory(is_sold);
CREATE INDEX IF NOT EXISTS idx_inventory_created ON inventory(created_at DESC);

-- Game transactions indexes
CREATE INDEX IF NOT EXISTS idx_game_transactions_user ON game_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_game_transactions_wallet ON game_transactions(wallet_address);
CREATE INDEX IF NOT EXISTS idx_game_transactions_game_mode ON game_transactions(game_mode);
CREATE INDEX IF NOT EXISTS idx_game_transactions_created ON game_transactions(created_at DESC);

-- Game-specific indexes
CREATE INDEX IF NOT EXISTS idx_coinflip_wallet ON coinflip_games(wallet_address);
CREATE INDEX IF NOT EXISTS idx_crash_wallet ON crash_games(wallet_address);
CREATE INDEX IF NOT EXISTS idx_roulette_wallet ON roulette_games(wallet_address);
CREATE INDEX IF NOT EXISTS idx_jackpot_wallet ON jackpot_games(wallet_address);
CREATE INDEX IF NOT EXISTS idx_battles_wallet ON battles_games(wallet_address);
CREATE INDEX IF NOT EXISTS idx_saper_wallet ON saper_games(wallet_address);
CREATE INDEX IF NOT EXISTS idx_upgrader_wallet ON upgrader_games(wallet_address);

-- Statistics indexes
CREATE INDEX IF NOT EXISTS idx_statistics_user ON statistics(user_id);
CREATE INDEX IF NOT EXISTS idx_statistics_wallet ON statistics(wallet_address);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for users table
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger for statistics table
DROP TRIGGER IF EXISTS update_statistics_updated_at ON statistics;
CREATE TRIGGER update_statistics_updated_at
    BEFORE UPDATE ON statistics
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS) Policies
-- ============================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_openings ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE coinflip_games ENABLE ROW LEVEL SECURITY;
ALTER TABLE crash_games ENABLE ROW LEVEL SECURITY;
ALTER TABLE roulette_games ENABLE ROW LEVEL SECURITY;
ALTER TABLE jackpot_games ENABLE ROW LEVEL SECURITY;
ALTER TABLE battles_games ENABLE ROW LEVEL SECURITY;
ALTER TABLE saper_games ENABLE ROW LEVEL SECURITY;
ALTER TABLE upgrader_games ENABLE ROW LEVEL SECURITY;
ALTER TABLE statistics ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own data
CREATE POLICY "Users can view own data" ON users
    FOR SELECT
    USING (auth.uid()::text = id::text OR wallet_address = current_setting('request.jwt.claims', true)::json->>'wallet_address');

-- Policy: Users can insert their own data
CREATE POLICY "Users can insert own data" ON users
    FOR INSERT
    WITH CHECK (true); -- Allow anyone to create account

-- Policy: Users can update their own data
CREATE POLICY "Users can update own data" ON users
    FOR UPDATE
    USING (auth.uid()::text = id::text OR wallet_address = current_setting('request.jwt.claims', true)::json->>'wallet_address');

-- Policy: Allow public read/write for transactions (adjust based on your security needs)
CREATE POLICY "Public transactions access" ON transactions
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- Policy: Allow public read/write for case_openings
CREATE POLICY "Public case_openings access" ON case_openings
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- Policy: Allow public read/write for inventory
CREATE POLICY "Public inventory access" ON inventory
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- Policy: Allow public read/write for game_transactions
CREATE POLICY "Public game_transactions access" ON game_transactions
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- Policy: Allow public read/write for all game tables
CREATE POLICY "Public coinflip_games access" ON coinflip_games
    FOR ALL
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Public crash_games access" ON crash_games
    FOR ALL
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Public roulette_games access" ON roulette_games
    FOR ALL
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Public jackpot_games access" ON jackpot_games
    FOR ALL
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Public battles_games access" ON battles_games
    FOR ALL
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Public saper_games access" ON saper_games
    FOR ALL
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Public upgrader_games access" ON upgrader_games
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- Policy: Allow public read/write for statistics
CREATE POLICY "Public statistics access" ON statistics
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- ============================================
-- COMMENTS for Documentation
-- ============================================

COMMENT ON TABLE users IS 'Lưu thông tin người dùng và số dư';
COMMENT ON TABLE transactions IS 'Lưu tất cả các giao dịch SOL';
COMMENT ON TABLE case_openings IS 'Lịch sử mở hòm';
COMMENT ON TABLE inventory IS 'Inventory của người chơi';
COMMENT ON TABLE game_transactions IS 'Giao dịch từ các game modes';
COMMENT ON TABLE coinflip_games IS 'Chi tiết các game coinflip';
COMMENT ON TABLE crash_games IS 'Chi tiết các game crash';
COMMENT ON TABLE roulette_games IS 'Chi tiết các game roulette';
COMMENT ON TABLE jackpot_games IS 'Chi tiết các game jackpot';
COMMENT ON TABLE battles_games IS 'Chi tiết các game battles';
COMMENT ON TABLE saper_games IS 'Chi tiết các game saper (minesweeper)';
COMMENT ON TABLE upgrader_games IS 'Chi tiết các game upgrader';
COMMENT ON TABLE statistics IS 'Thống kê tổng hợp của người chơi';

-- ============================================
-- END OF MIGRATION
-- ============================================

