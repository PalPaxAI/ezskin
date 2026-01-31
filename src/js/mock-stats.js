// Mock Stats System - Thay thế Firebase bằng localStorage
// Quản lý global stats và cung cấp API tương tự Firebase

const casesOpenedText = document.querySelector("#casesopened");
const battlesCreatedText = document.querySelector("#battlescreated");
const upgradesText = document.querySelector("#upgrades");
const jackpotsWonText = document.querySelector("#jackpotswon");

// Khởi tạo stats trong localStorage nếu chưa có
const initStats = () => {
	// Mỗi lần load trang đều đảm bảo reset về 0
	localStorage.setItem("globalStats", JSON.stringify({
		caseopened: 0,
		battlecreated: 0,
		upgrades: 0,
		jackpotwon: 0
	}));
};

// Lấy stats từ localStorage
const getStats = () => {
	return JSON.parse(localStorage.getItem("globalStats") || '{"caseopened":0,"battlecreated":0,"upgrades":0,"jackpotwon":0}');
};

// Cập nhật stats
const updateStats = (key, value) => {
	const stats = getStats();
	stats[key] = value;
	localStorage.setItem("globalStats", JSON.stringify(stats));
	updateDisplay();
};

// Tăng stats lên 1
const incrementStat = (key) => {
	const stats = getStats();
	stats[key] = (stats[key] || 0) + 1;
	localStorage.setItem("globalStats", JSON.stringify(stats));
	updateDisplay();
};

// Cập nhật hiển thị
const updateDisplay = () => {
	const stats = getStats();
	if (casesOpenedText) casesOpenedText.textContent = stats.caseopened || 0;
	if (battlesCreatedText) battlesCreatedText.textContent = stats.battlecreated || 0;
	if (upgradesText) upgradesText.textContent = stats.upgrades || 0;
	if (jackpotsWonText) jackpotsWonText.textContent = stats.jackpotwon || 0;
};

// API tương tự Firebase để dễ thay thế
const mockDatabase = {
	ref: (path) => {
		return {
			on: (event, callback) => {
				// Simulate real-time updates
				updateDisplay();
				// Call callback với current value
				const stats = getStats();
				const value = stats[path] || 0;
				callback({ val: () => value });
			},
			once: (event, callback) => {
				const stats = getStats();
				const value = stats[path] || 0;
				callback({ val: () => value });
			},
			set: (value) => {
				updateStats(path, value);
				return Promise.resolve();
			}
		};
	}
};

// Khởi tạo
initStats();
updateDisplay();

// Export functions để các file khác sử dụng
window.mockStats = {
	incrementCases: () => incrementStat("caseopened"),
	incrementBattles: () => incrementStat("battlecreated"),
	incrementUpgrades: () => incrementStat("upgrades"),
	incrementJackpot: () => incrementStat("jackpotwon"),
	getStats: getStats,
	updateDisplay: updateDisplay
};

