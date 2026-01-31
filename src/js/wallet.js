// Solana Wallet Integration
// Tích hợp nhiều ví Solana: Phantom, Solflare, Backpack, Glow

// Danh sách các ví được hỗ trợ
const WALLET_CONFIGS = {
	phantom: {
		name: "Phantom",
		url: "https://phantom.app/",
		getProvider: () => {
			if ('solana' in window) {
				const provider = window.solana;
				if (provider.isPhantom) {
					return provider;
				}
			}
			return null;
		}
	},
	solflare: {
		name: "Solflare",
		url: "https://solflare.com/",
		getProvider: () => {
			if ('solflare' in window) {
				return window.solflare;
			}
			return null;
		}
	},
	backpack: {
		name: "Backpack",
		url: "https://www.backpack.app/",
		getProvider: () => {
			if ('backpack' in window) {
				return window.backpack;
			}
			return null;
		}
	},
	glow: {
		name: "Glow",
		url: "https://glow.app/",
		getProvider: () => {
			if ('glow' in window) {
				return window.glow;
			}
			return null;
		}
	}
};

// Kiểm tra ví nào đã được cài đặt
const checkWalletInstalled = (walletName) => {
	const config = WALLET_CONFIGS[walletName];
	if (!config) return false;
	
	const provider = config.getProvider();
	return provider !== null;
};

// Kết nối ví cụ thể
const connectWallet = async (walletName) => {
	try {
		const config = WALLET_CONFIGS[walletName];
		if (!config) {
			throw new Error(`Wallet ${walletName} không được hỗ trợ`);
		}
		
		const provider = config.getProvider();
		
		if (!provider) {
			// Nếu chưa cài ví, hướng dẫn người dùng cài đặt
			const installWallet = confirm(
				`${config.name} chưa được cài đặt!\n\n` +
				`Bạn có muốn mở trang tải ${config.name} không?`
			);
			
			if (installWallet) {
				window.open(config.url, "_blank");
			}
			return null;
		}
		
		// Yêu cầu kết nối ví
		let response;
		if (walletName === 'phantom' || walletName === 'solflare' || walletName === 'backpack') {
			// Các ví này dùng API chuẩn Solana
			response = await provider.connect();
		} else if (walletName === 'glow') {
			// Glow có thể có API khác
			response = await provider.connect();
		} else {
			response = await provider.connect();
		}
		
		if (response && response.publicKey) {
			const publicKey = response.publicKey.toString();
			
			// Lưu thông tin ví vào localStorage
			localStorage.setItem("walletConnected", "true");
			localStorage.setItem("walletAddress", publicKey);
			localStorage.setItem("walletProvider", walletName);
			
			// Tạo nickname từ địa chỉ ví (lấy 4 ký tự đầu + 4 ký tự cuối)
			const shortAddress = `${publicKey.slice(0, 4)}...${publicKey.slice(-4)}`;
			const nickname = shortAddress;
			
			// Lưu thông tin user
			localStorage.setItem("createdAccount", "1");
			localStorage.setItem("nickname", nickname);
			
			// Avatar mặc định
			const currentPath = window.location.pathname;
			const defaultAvatar = (currentPath === '/' || currentPath === '/index.html' || currentPath.endsWith('index.html'))
				? "./dist/img/avatars/avatar.png"
				: "../dist/img/avatars/avatar.png";
			localStorage.setItem("avatar", defaultAvatar);
			
			// Khởi tạo balance nếu chưa có
			if (!localStorage.getItem("Balance") || localStorage.getItem("Balance") === "00.00$") {
				localStorage.setItem("Balance", "100.00$");
			}
			
			// Khởi tạo stats nếu chưa có
			if (!localStorage.getItem("battlesWon")) localStorage.setItem("battlesWon", 0);
			if (!localStorage.getItem("casesOpened")) localStorage.setItem("casesOpened", 0);
			if (!localStorage.getItem("upgradesDone")) localStorage.setItem("upgradesDone", 0);
			if (!localStorage.getItem("rouletteWon")) localStorage.setItem("rouletteWon", 0);
			if (!localStorage.getItem("crashWon")) localStorage.setItem("crashWon", 0);
			if (!localStorage.getItem("jackpotWon")) localStorage.setItem("jackpotWon", 0);
			if (!localStorage.getItem("coinflipWon")) localStorage.setItem("coinflipWon", 0);
			if (!localStorage.getItem("saperWon")) localStorage.setItem("saperWon", 0);
			if (!localStorage.getItem("muted")) localStorage.setItem("muted", 0);
			
			return {
				success: true,
				publicKey: publicKey,
				nickname: nickname,
				walletName: walletName
			};
		}
		
		return null;
	} catch (error) {
		console.error(`Error connecting to ${walletName} Wallet:`, error);
		
		if (error.code === 4001) {
			// User rejected the request
			alert("Bạn đã từ chối kết nối ví!");
		} else {
			alert(`Lỗi kết nối ví: ${error.message}`);
		}
		
		return null;
	}
};

// Ngắt kết nối ví
const disconnectWallet = async () => {
	try {
		const walletProvider = localStorage.getItem("walletProvider");
		if (walletProvider && WALLET_CONFIGS[walletProvider]) {
			const provider = WALLET_CONFIGS[walletProvider].getProvider();
			if (provider && provider.isConnected) {
				await provider.disconnect();
			}
		}
		
		// Xóa thông tin ví khỏi localStorage
		localStorage.removeItem("walletConnected");
		localStorage.removeItem("walletAddress");
		localStorage.removeItem("walletProvider");
		
		return true;
	} catch (error) {
		console.error("Error disconnecting from wallet:", error);
		return false;
	}
};

// Kiểm tra xem ví đã được kết nối chưa
const isWalletConnected = () => {
	const walletProvider = localStorage.getItem("walletProvider");
	if (walletProvider && WALLET_CONFIGS[walletProvider]) {
		const provider = WALLET_CONFIGS[walletProvider].getProvider();
		if (provider && provider.isConnected) {
			const storedAddress = localStorage.getItem("walletAddress");
			if (storedAddress && provider.publicKey) {
				return provider.publicKey.toString() === storedAddress;
			}
		}
	}
	
	return localStorage.getItem("walletConnected") === "true";
};

// Lấy địa chỉ ví hiện tại
const getWalletAddress = () => {
	const walletProvider = localStorage.getItem("walletProvider");
	if (walletProvider && WALLET_CONFIGS[walletProvider]) {
		const provider = WALLET_CONFIGS[walletProvider].getProvider();
		if (provider && provider.isConnected && provider.publicKey) {
			return provider.publicKey.toString();
		}
	}
	
	return localStorage.getItem("walletAddress") || null;
};

// Lấy SOL balance từ ví
const getWalletBalance = async () => {
	try {
		const walletProvider = localStorage.getItem("walletProvider");
		if (!walletProvider || !WALLET_CONFIGS[walletProvider]) {
			return 0;
		}
		
		const provider = WALLET_CONFIGS[walletProvider].getProvider();
		if (!provider || !provider.isConnected || !provider.publicKey) {
			return 0;
		}
		
		const publicKey = provider.publicKey.toString();
		
		// Sử dụng Solana Web3.js nếu có, nếu không thì dùng RPC trực tiếp
		if (typeof window.solanaWeb3 !== 'undefined' && window.solanaWeb3.Connection) {
			try {
				// Sử dụng RPC URL từ CONFIG nếu có, nếu không thì dùng default
				const rpcUrl = (window.CONFIG && window.CONFIG.solanaRpcUrl) 
					? window.CONFIG.solanaRpcUrl 
					: 'https://api.mainnet-beta.solana.com';
				
				const connection = new window.solanaWeb3.Connection(
					rpcUrl,
					'confirmed'
				);
				const publicKeyObj = new window.solanaWeb3.PublicKey(publicKey);
				const balance = await connection.getBalance(publicKeyObj);
				// Chuyển từ lamports sang SOL (1 SOL = 1,000,000,000 lamports)
				const solBalance = balance / 1_000_000_000;
				return solBalance;
			} catch (web3Error) {
				console.warn("Solana Web3.js error, falling back to RPC:", web3Error);
			}
		}
		
		// Fallback: sử dụng RPC endpoint trực tiếp
		const rpcUrl = (window.CONFIG && window.CONFIG.solanaRpcUrl) 
			? window.CONFIG.solanaRpcUrl 
			: 'https://api.mainnet-beta.solana.com';
		
		const response = await fetch(rpcUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				jsonrpc: '2.0',
				id: 1,
				method: 'getBalance',
				params: [publicKey],
			}),
		});
		
		const data = await response.json();
		if (data.result && data.result.value !== undefined) {
			// Chuyển từ lamports sang SOL (1 SOL = 1,000,000,000 lamports)
			const solBalance = data.result.value / 1_000_000_000;
			return solBalance;
		}
		
		return 0;
	} catch (error) {
		console.error("Error fetching wallet balance:", error);
		return 0;
	}
};

// Lắng nghe sự kiện khi ví bị ngắt kết nối
const setupWalletListeners = () => {
	const walletProvider = localStorage.getItem("walletProvider");
	if (walletProvider && WALLET_CONFIGS[walletProvider]) {
		const provider = WALLET_CONFIGS[walletProvider].getProvider();
		
		if (provider) {
			// Lắng nghe sự kiện disconnect
			provider.on("disconnect", () => {
				localStorage.removeItem("walletConnected");
				localStorage.removeItem("walletAddress");
				localStorage.removeItem("walletProvider");
				
				if (typeof checkIfUserCreatedAccount === 'function') {
					checkIfUserCreatedAccount();
				}
			});
			
			// Lắng nghe sự kiện accountChanged
			provider.on("accountChanged", (publicKey) => {
				if (publicKey) {
					const newAddress = publicKey.toString();
					localStorage.setItem("walletAddress", newAddress);
					const shortAddress = `${newAddress.slice(0, 4)}...${newAddress.slice(-4)}`;
					localStorage.setItem("nickname", shortAddress);
				} else {
					disconnectWallet();
				}
				
				if (typeof checkIfUserCreatedAccount === 'function') {
					checkIfUserCreatedAccount();
				}
			});
		}
	}
};

// Cập nhật trạng thái các ví trong modal
const updateWalletStatus = () => {
	Object.keys(WALLET_CONFIGS).forEach(walletName => {
		const statusEl = document.getElementById(`${walletName}-status`);
		if (statusEl) {
			const isInstalled = checkWalletInstalled(walletName);
			statusEl.textContent = isInstalled ? "Installed" : "Not installed";
			statusEl.style.color = isInstalled ? "#4ade80" : "#ef4444";
		}
	});
};

// Export API
window.wallet = {
	connect: connectWallet,
	disconnect: disconnectWallet,
	isConnected: isWalletConnected,
	getAddress: getWalletAddress,
	getBalance: getWalletBalance,
	setupListeners: setupWalletListeners,
	checkInstalled: checkWalletInstalled,
	updateStatus: updateWalletStatus,
	configs: WALLET_CONFIGS
};

// Tự động setup listeners khi load
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', () => {
		setupWalletListeners();
		setTimeout(updateWalletStatus, 500); // Đợi một chút để các extension load
	});
} else {
	setupWalletListeners();
	setTimeout(updateWalletStatus, 500);
}
