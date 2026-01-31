// SOL Price Converter
// Chuyển đổi giá USD sang SOL dựa trên giá SOL hiện tại

/**
 * Lấy giá SOL hiện tại từ API
 * @returns {Promise<number>} Giá SOL tính bằng USD
 */
const getSolPrice = async () => {
	try {
		// Sử dụng CoinGecko API (free, không cần API key)
		const response = await fetch(
			'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd'
		);
		
		if (!response.ok) {
			throw new Error('Failed to fetch SOL price');
		}
		
		const data = await response.json();
		return data.solana?.usd || 0;
	} catch (error) {
		console.error('Lỗi lấy giá SOL:', error);
		// Fallback: sử dụng giá mặc định nếu API fail
		return 150; // Giá SOL mặc định (có thể cập nhật)
	}
};

// Cache giá SOL để tránh gọi API quá nhiều
let cachedSolPrice = null;
let cacheTimestamp = null;
const CACHE_DURATION = 60000; // Cache 1 phút

/**
 * Lấy giá SOL với cache
 * @returns {Promise<number>} Giá SOL tính bằng USD
 */
const getCachedSolPrice = async () => {
	const now = Date.now();
	
	// Nếu cache còn hiệu lực, trả về giá cached
	if (cachedSolPrice && cacheTimestamp && (now - cacheTimestamp) < CACHE_DURATION) {
		return cachedSolPrice;
	}
	
	// Lấy giá mới và cache
	cachedSolPrice = await getSolPrice();
	cacheTimestamp = now;
	
	return cachedSolPrice;
};

/**
 * Chuyển đổi USD sang SOL
 * @param {number} usdAmount - Số tiền USD
 * @returns {Promise<number>} Số SOL tương ứng
 */
const usdToSol = async (usdAmount) => {
	try {
		const solPrice = await getCachedSolPrice();
		if (solPrice === 0) {
			throw new Error('Không thể lấy giá SOL');
		}
		
		// Chuyển đổi và làm tròn đến 4 chữ số thập phân
		const solAmount = usdAmount / solPrice;
		return parseFloat(solAmount.toFixed(4));
	} catch (error) {
		console.error('Lỗi chuyển đổi USD sang SOL:', error);
		throw error;
	}
};

/**
 * Chuyển đổi SOL sang USD
 * @param {number} solAmount - Số SOL
 * @returns {Promise<number>} Số USD tương ứng
 */
const solToUsd = async (solAmount) => {
	try {
		const solPrice = await getCachedSolPrice();
		if (solPrice === 0) {
			throw new Error('Không thể lấy giá SOL');
		}
		
		return solAmount * solPrice;
	} catch (error) {
		console.error('Lỗi chuyển đổi SOL sang USD:', error);
		throw error;
	}
};

/**
 * Format số SOL để hiển thị
 * @param {number} solAmount - Số SOL
 * @returns {string} String đã format
 */
const formatSol = (solAmount) => {
	return solAmount.toFixed(4) + ' SOL';
};

/**
 * Format số USD để hiển thị
 * @param {number} usdAmount - Số USD
 * @returns {string} String đã format
 */
const formatUsd = (usdAmount) => {
	return '$' + usdAmount.toFixed(2);
};

// Export API
if (typeof window !== 'undefined') {
	window.solPriceConverter = {
		getSolPrice: getCachedSolPrice,
		usdToSol: usdToSol,
		solToUsd: solToUsd,
		formatSol: formatSol,
		formatUsd: formatUsd
	};
}

