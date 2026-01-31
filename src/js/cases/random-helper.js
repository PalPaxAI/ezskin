// Helper function để random item theo dropPercent
// Sử dụng trong tất cả các case files

/**
 * Random một item key dựa trên dropPercent của các items
 * @param {Object} items - Object chứa các items (items2)
 * @returns {number} - Index của item được chọn (0, 1, 2, ...) để dùng với `item${index}`
 */
const getRandomItemByDropPercent = (items) => {
	const itemKeys = Object.keys(items);
	
	// Tính tổng dropPercent
	const totalPercent = itemKeys.reduce((sum, key) => {
		return sum + (items[key].dropPercent || 0);
	}, 0);
	
	if (totalPercent === 0) {
		// Nếu không có dropPercent, random đều
		const randomIndex = Math.floor(Math.random() * itemKeys.length);
		// Trả về số từ key (ví dụ: "item0" -> 0, "item1" -> 1)
		return parseInt(itemKeys[randomIndex].replace('item', '')) || randomIndex;
	}
	
	// Random một số từ 0 đến totalPercent
	const random = Math.random() * totalPercent;
	
	// Tìm item dựa trên cumulative probability
	let cumulative = 0;
	for (let i = 0; i < itemKeys.length; i++) {
		cumulative += items[itemKeys[i]].dropPercent || 0;
		if (random <= cumulative) {
			// Trả về số từ key (ví dụ: "item0" -> 0, "item1" -> 1)
			const key = itemKeys[i];
			return parseInt(key.replace('item', '')) || i;
		}
	}
	
	// Fallback: return last item index
	const lastKey = itemKeys[itemKeys.length - 1];
	return parseInt(lastKey.replace('item', '')) || (itemKeys.length - 1);
};

// Export để các file khác sử dụng
if (typeof window !== 'undefined') {
	window.getRandomItemByDropPercent = getRandomItemByDropPercent;
}

// Export cho Node.js environment (nếu cần)
if (typeof module !== 'undefined' && module.exports) {
	module.exports = { getRandomItemByDropPercent };
}

