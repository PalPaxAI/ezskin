// Configuration từ environment variables
// File này sẽ được inject env variables từ .env khi build

const CONFIG = {
	// Solana RPC URL - có thể override từ window.ENV nếu được inject
	solanaRpcUrl: (typeof window !== 'undefined' && window.ENV?.SOLANA_RPC_URL) 
		? window.ENV.SOLANA_RPC_URL 
		: 'https://api.mainnet-beta.solana.com',
	
	// Solana Network
	solanaNetwork: (typeof window !== 'undefined' && window.ENV?.SOLANA_NETWORK)
		? window.ENV.SOLANA_NETWORK
		: 'mainnet-beta',
	
	// Website wallet address để nhận SOL
	walletAddress: (typeof window !== 'undefined' && window.ENV?.WALLET_ADDRESS)
		? window.ENV.WALLET_ADDRESS
		: null, // Phải set trong .env
	
	// Supabase config (sẽ thêm sau)
	supabaseUrl: (typeof window !== 'undefined' && window.ENV?.SUPABASE_URL)
		? window.ENV.SUPABASE_URL
		: null,
	
	supabaseAnonKey: (typeof window !== 'undefined' && window.ENV?.SUPABASE_ANON_KEY)
		? window.ENV.SUPABASE_ANON_KEY
		: null,
	
	// Environment
	env: (typeof window !== 'undefined' && window.ENV?.NODE_ENV)
		? window.ENV.NODE_ENV
		: 'development',
	
	// Kiểm tra xem đã config đầy đủ chưa
	isConfigured: function() {
		return this.walletAddress !== null && this.walletAddress !== '';
	},
	
	// Kiểm tra Supabase đã config chưa
	isSupabaseConfigured: function() {
		return this.supabaseUrl !== null && 
			   this.supabaseUrl !== '' && 
			   this.supabaseAnonKey !== null && 
			   this.supabaseAnonKey !== '';
	}
};

// Export
if (typeof window !== 'undefined') {
	window.CONFIG = CONFIG;
}

// Log warning nếu chưa config
if (typeof window !== 'undefined' && !CONFIG.isConfigured()) {
	console.warn('⚠️ WALLET_ADDRESS chưa được cấu hình trong .env!');
}

