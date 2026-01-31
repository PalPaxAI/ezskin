const balanceAmount = document.querySelector(".user__balance--amount");
const balanceAmountMobile = document.querySelector(
	".user-mobile__balance--amount"
);

const setBalance = async () => {
	// Kiểm tra xem ví đã kết nối chưa
	if (window.wallet && window.wallet.isConnected()) {
		try {
			// Lấy SOL balance từ ví thật
			const solBalance = await window.wallet.getBalance();
			
			if (balanceAmount) {
				balanceAmount.textContent = solBalance.toFixed(4) + " SOL";
			}
			if (balanceAmountMobile) {
				balanceAmountMobile.textContent = solBalance.toFixed(4) + " SOL";
			}
			
			// Lưu vào localStorage để cache (optional)
			localStorage.setItem("solBalance", solBalance.toString());
		} catch (error) {
			console.error("Error setting balance:", error);
			// Fallback: hiển thị 0 SOL
			if (balanceAmount) {
				balanceAmount.textContent = "0.0000 SOL";
			}
			if (balanceAmountMobile) {
				balanceAmountMobile.textContent = "0.0000 SOL";
			}
		}
	} else {
		// Nếu chưa kết nối ví, hiển thị 0 SOL
		if (balanceAmount) {
			balanceAmount.textContent = "0.0000 SOL";
		}
		if (balanceAmountMobile) {
			balanceAmountMobile.textContent = "0.0000 SOL";
		}
	}
};

// Tự động refresh balance mỗi 10 giây nếu ví đã kết nối
let balanceInterval = null;

const startBalanceRefresh = () => {
	if (balanceInterval) {
		clearInterval(balanceInterval);
	}
	
	if (window.wallet && window.wallet.isConnected()) {
		balanceInterval = setInterval(() => {
			setBalance();
		}, 10000); // Refresh mỗi 10 giây
	}
};

const stopBalanceRefresh = () => {
	if (balanceInterval) {
		clearInterval(balanceInterval);
		balanceInterval = null;
	}
};

// Lắng nghe sự kiện ví kết nối/ngắt kết nối
if (window.wallet) {
	// Override connect để tự động refresh balance
	const originalConnect = window.wallet.connect;
	window.wallet.connect = async (...args) => {
		const result = await originalConnect(...args);
		if (result && result.success) {
			await setBalance();
			startBalanceRefresh();
		}
		return result;
	};
	
	// Override disconnect để dừng refresh
	const originalDisconnect = window.wallet.disconnect;
	window.wallet.disconnect = async (...args) => {
		const result = await originalDisconnect(...args);
		stopBalanceRefresh();
		await setBalance();
		return result;
	};
}

// Khởi tạo balance khi load
setBalance().then(() => {
	if (window.wallet && window.wallet.isConnected()) {
		startBalanceRefresh();
	}
});
