// Supabase Client
// Tích hợp Supabase để lưu trữ dữ liệu

let supabaseClient = null;

/**
 * Khởi tạo Supabase client
 */
const initSupabase = () => {
	try {
		// Kiểm tra config
		if (!window.CONFIG || !window.CONFIG.isSupabaseConfigured()) {
			console.warn('⚠️ Supabase chưa được cấu hình trong .env!');
			return null;
		}

		// Kiểm tra xem Supabase JS đã được load chưa
		if (typeof window.supabase === 'undefined') {
			console.error('❌ Supabase JS library chưa được load. Vui lòng thêm script tag.');
			return null;
		}

		// Tạo Supabase client
		supabaseClient = window.supabase.createClient(
			window.CONFIG.supabaseUrl,
			window.CONFIG.supabaseAnonKey
		);

		console.log('✅ Supabase client đã được khởi tạo');
		return supabaseClient;
	} catch (error) {
		console.error('❌ Lỗi khởi tạo Supabase client:', error);
		return null;
	}
};

/**
 * Lấy Supabase client (lazy init)
 */
const getSupabaseClient = () => {
	if (!supabaseClient) {
		supabaseClient = initSupabase();
	}
	return supabaseClient;
};

/**
 * Lưu transaction vào Supabase
 * @param {Object} transactionData - Dữ liệu transaction
 */
const saveTransaction = async (transactionData) => {
	try {
		const client = getSupabaseClient();
		if (!client) {
			console.warn('Supabase không khả dụng, bỏ qua lưu transaction');
			return { success: false, error: 'Supabase not configured' };
		}

		const { data, error } = await client
			.from('transactions')
			.insert([{
				wallet_address: transactionData.walletAddress,
				transaction_signature: transactionData.signature,
				transaction_type: transactionData.transactionType || 'case_payment',
				case_name: transactionData.caseName || null,
				game_mode: transactionData.gameMode || null,
				amount_sol: transactionData.amountSol || transactionData.casePriceSol || 0,
				amount_usd: transactionData.amountUsd || transactionData.casePriceUsd || null,
				sol_price_usd: transactionData.solPriceUsd || null,
				status: transactionData.status || 'confirmed',
				metadata: transactionData.metadata || null,
				created_at: new Date().toISOString(),
				confirmed_at: transactionData.status === 'confirmed' ? new Date().toISOString() : null
			}]);

		if (error) {
			console.error('Lỗi lưu transaction:', error);
			return { success: false, error: error.message };
		}

		return { success: true, data };
	} catch (error) {
		console.error('Lỗi khi lưu transaction:', error);
		return { success: false, error: error.message };
	}
};

/**
 * Lưu case opening vào Supabase
 * @param {Object} caseData - Dữ liệu case opening
 */
const saveCaseOpening = async (caseData) => {
	try {
		const client = getSupabaseClient();
		if (!client) {
			console.warn('Supabase không khả dụng, bỏ qua lưu case opening');
			return { success: false, error: 'Supabase not configured' };
		}

		// Tính profit/loss
		const profitLoss = (caseData.itemPrice || 0) - (caseData.casePriceUsd || 0);

		const { data, error } = await client
			.from('case_openings')
			.insert([{
				wallet_address: caseData.walletAddress,
				transaction_id: caseData.transactionId || null,
				case_name: caseData.caseName,
				case_price_usd: caseData.casePriceUsd || null,
				case_price_sol: caseData.casePriceSol || null,
				item_won_id: caseData.itemWonId || null,
				item_won_name: caseData.itemWonName,
				item_won_image: caseData.itemWonImage || null,
				item_rarity: caseData.itemRarity || null,
				item_price_usd: caseData.itemPrice || null,
				profit_loss: profitLoss,
				created_at: new Date().toISOString()
			}]);

		if (error) {
			console.error('Lỗi lưu case opening:', error);
			return { success: false, error: error.message };
		}

		// Lưu item vào inventory
		if (data && data[0] && caseData.itemWonId) {
			await saveInventoryItem({
				walletAddress: caseData.walletAddress,
				itemId: caseData.itemWonId,
				itemName: caseData.itemWonName,
				itemImage: caseData.itemWonImage,
				itemRarity: caseData.itemRarity,
				itemPrice: caseData.itemPrice,
				source: 'case_opening',
				caseOpeningId: data[0].id
			});
		}

		return { success: true, data };
	} catch (error) {
		console.error('Lỗi khi lưu case opening:', error);
		return { success: false, error: error.message };
	}
};

/**
 * Lấy lịch sử transactions của user
 * @param {string} walletAddress - Địa chỉ ví
 * @param {number} limit - Số lượng records
 */
const getUserTransactions = async (walletAddress, limit = 50) => {
	try {
		const client = getSupabaseClient();
		if (!client) {
			return { success: false, error: 'Supabase not configured' };
		}

		const { data, error } = await client
			.from('transactions')
			.select('*')
			.eq('wallet_address', walletAddress)
			.order('created_at', { ascending: false })
			.limit(limit);

		if (error) {
			console.error('Lỗi lấy transactions:', error);
			return { success: false, error: error.message };
		}

		return { success: true, data };
	} catch (error) {
		console.error('Lỗi khi lấy transactions:', error);
		return { success: false, error: error.message };
	}
};

/**
 * Lưu game transaction vào Supabase
 * @param {Object} gameData - Dữ liệu game transaction
 */
const saveGameTransaction = async (gameData) => {
	try {
		const client = getSupabaseClient();
		if (!client) {
			console.warn('Supabase không khả dụng, bỏ qua lưu game transaction');
			return { success: false, error: 'Supabase not configured' };
		}

		const profitLoss = (gameData.winAmountUsd || 0) - (gameData.betAmountUsd || 0);

		const { data, error } = await client
			.from('game_transactions')
			.insert([{
				wallet_address: gameData.walletAddress,
				transaction_id: gameData.transactionId || null,
				game_mode: gameData.gameMode,
				bet_amount_usd: gameData.betAmountUsd,
				bet_amount_sol: gameData.betAmountSol || null,
				win_amount_usd: gameData.winAmountUsd || 0,
				win_amount_sol: gameData.winAmountSol || 0,
				result: gameData.result,
				profit_loss: profitLoss,
				game_data: gameData.gameData || null,
				created_at: new Date().toISOString()
			}]);

		if (error) {
			console.error('Lỗi lưu game transaction:', error);
			return { success: false, error: error.message };
		}

		return { success: true, data };
	} catch (error) {
		console.error('Lỗi khi lưu game transaction:', error);
		return { success: false, error: error.message };
	}
};

/**
 * Lưu item vào inventory
 * @param {Object} itemData - Dữ liệu item
 */
const saveInventoryItem = async (itemData) => {
	try {
		const client = getSupabaseClient();
		if (!client) {
			console.warn('Supabase không khả dụng, bỏ qua lưu inventory');
			return { success: false, error: 'Supabase not configured' };
		}

		const { data, error } = await client
			.from('inventory')
			.insert([{
				wallet_address: itemData.walletAddress,
				item_id: itemData.itemId,
				item_name: itemData.itemName,
				item_image: itemData.itemImage || null,
				item_rarity: itemData.itemRarity || null,
				item_price_usd: itemData.itemPrice || null,
				source: itemData.source || 'case_opening',
				case_opening_id: itemData.caseOpeningId || null,
				created_at: new Date().toISOString()
			}]);

		if (error) {
			console.error('Lỗi lưu inventory:', error);
			return { success: false, error: error.message };
		}

		return { success: true, data };
	} catch (error) {
		console.error('Lỗi khi lưu inventory:', error);
		return { success: false, error: error.message };
	}
};

/**
 * Lấy inventory của user
 * @param {string} walletAddress - Địa chỉ ví
 * @param {boolean} includeSold - Bao gồm items đã bán
 */
const getUserInventory = async (walletAddress, includeSold = false) => {
	try {
		const client = getSupabaseClient();
		if (!client) {
			return { success: false, error: 'Supabase not configured' };
		}

		let query = client
			.from('inventory')
			.select('*')
			.eq('wallet_address', walletAddress);

		if (!includeSold) {
			query = query.eq('is_sold', false);
		}

		const { data, error } = await query
			.order('created_at', { ascending: false });

		if (error) {
			console.error('Lỗi lấy inventory:', error);
			return { success: false, error: error.message };
		}

		return { success: true, data };
	} catch (error) {
		console.error('Lỗi khi lấy inventory:', error);
		return { success: false, error: error.message };
	}
};

/**
 * Lấy lịch sử case openings của user
 * @param {string} walletAddress - Địa chỉ ví
 * @param {number} limit - Số lượng records
 */
const getUserCaseOpenings = async (walletAddress, limit = 50) => {
	try {
		const client = getSupabaseClient();
		if (!client) {
			return { success: false, error: 'Supabase not configured' };
		}

		const { data, error } = await client
			.from('case_openings')
			.select('*')
			.eq('wallet_address', walletAddress)
			.order('created_at', { ascending: false })
			.limit(limit);

		if (error) {
			console.error('Lỗi lấy case openings:', error);
			return { success: false, error: error.message };
		}

		return { success: true, data };
	} catch (error) {
		console.error('Lỗi khi lấy case openings:', error);
		return { success: false, error: error.message };
	}
};

/**
 * Lấy thống kê của user
 * @param {string} walletAddress - Địa chỉ ví
 */
const getUserStatistics = async (walletAddress) => {
	try {
		const client = getSupabaseClient();
		if (!client) {
			return { success: false, error: 'Supabase not configured' };
		}

		const { data, error } = await client
			.from('statistics')
			.select('*')
			.eq('wallet_address', walletAddress)
			.single();

		if (error) {
			// Nếu chưa có statistics, tạo mới
			if (error.code === 'PGRST116') {
				const { data: newData, error: insertError } = await client
					.from('statistics')
					.insert([{
						wallet_address: walletAddress
					}])
					.select()
					.single();

				if (insertError) {
					console.error('Lỗi tạo statistics:', insertError);
					return { success: false, error: insertError.message };
				}

				return { success: true, data: newData };
			}

			console.error('Lỗi lấy statistics:', error);
			return { success: false, error: error.message };
		}

		return { success: true, data };
	} catch (error) {
		console.error('Lỗi khi lấy statistics:', error);
		return { success: false, error: error.message };
	}
};

// Export API
if (typeof window !== 'undefined') {
	window.supabaseClient = {
		init: initSupabase,
		getClient: getSupabaseClient,
		saveTransaction: saveTransaction,
		saveCaseOpening: saveCaseOpening,
		saveGameTransaction: saveGameTransaction,
		saveInventoryItem: saveInventoryItem,
		getUserTransactions: getUserTransactions,
		getUserCaseOpenings: getUserCaseOpenings,
		getUserInventory: getUserInventory,
		getUserStatistics: getUserStatistics
	};
}

// Tự động khởi tạo khi load
if (typeof window !== 'undefined' && window.CONFIG && window.CONFIG.isSupabaseConfigured()) {
	// Đợi Supabase library load xong
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', () => {
			setTimeout(initSupabase, 1000); // Đợi 1s để đảm bảo script đã load
		});
	} else {
		setTimeout(initSupabase, 1000);
	}
}

