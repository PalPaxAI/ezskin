// Hệ thống đăng nhập đơn giản với mock users
// Thay thế Firebase Authentication

// Mock users database (có thể mở rộng sau)
const mockUsers = {
	"admin@test.com": {
		email: "admin@test.com",
		password: "admin123",
		nickname: "Admin",
		avatar: "https://i.pravatar.cc/150?img=1",
		balance: 10000000.00 // $10,000,000 for testing
	},
	"user@test.com": {
		email: "user@test.com",
		password: "user123",
		nickname: "TestUser",
		avatar: "https://i.pravatar.cc/150?img=2",
		balance: 10000000.00 // $10,000,000 for testing
	},
	"demo@test.com": {
		email: "demo@test.com",
		password: "demo123",
		nickname: "Demo",
		avatar: "https://i.pravatar.cc/150?img=3",
		balance: 10000000.00 // $10,000,000 for testing
	}
};

// Lưu user hiện tại vào localStorage
const saveCurrentUser = (user) => {
	// Kiểm tra và set avatar mặc định nếu chưa có hoặc là URL cũ hoặc giá trị không hợp lệ
	let userAvatar = user.avatar;
	if (!userAvatar || 
		userAvatar.trim() === "" || 
		userAvatar.includes("pravatar.cc") || 
		userAvatar === "ad" ||
		(!userAvatar.startsWith("http") && !userAvatar.startsWith("./") && !userAvatar.startsWith("../") && !userAvatar.startsWith("/"))) {
		// Tự động detect đường dẫn đúng
		const currentPath = window.location.pathname;
		if (currentPath === '/' || currentPath === '/index.html' || currentPath.endsWith('index.html')) {
			userAvatar = "./dist/img/avatars/avatar.png";
		} else {
			userAvatar = "../dist/img/avatars/avatar.png";
		}
	}
	
	localStorage.setItem("currentUser", JSON.stringify({
		email: user.email,
		nickname: user.nickname,
		avatar: userAvatar
	}));
	
	// Cập nhật các giá trị cũ để tương thích với code hiện tại
	localStorage.setItem("createdAccount", "1");
	localStorage.setItem("nickname", user.nickname);
	localStorage.setItem("avatar", userAvatar);
	localStorage.setItem("Balance", user.balance + "$");
};

// Lấy user hiện tại
const getCurrentUser = () => {
	const userStr = localStorage.getItem("currentUser");
	if (userStr) {
		return JSON.parse(userStr);
	}
	return null;
};

// Đăng nhập
const login = (email, password) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const user = mockUsers[email.toLowerCase()];
			
			if (user && user.password === password) {
				saveCurrentUser(user);
				resolve({
					success: true,
					user: {
						email: user.email,
						nickname: user.nickname,
						avatar: user.avatar
					}
				});
			} else {
				reject({
					success: false,
					message: "Email hoặc mật khẩu không đúng!"
				});
			}
		}, 500); // Simulate network delay
	});
};

// Đăng ký (tạo user mới)
const register = (email, password, nickname, avatar) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const emailLower = email.toLowerCase();
			
			if (mockUsers[emailLower]) {
				reject({
					success: false,
					message: "Email đã tồn tại!"
				});
				return;
			}
			
			// Tạo user mới
			// Avatar mặc định: nếu không có avatar hoặc avatar rỗng hoặc là URL cũ, dùng avatar mặc định
			let defaultAvatarPath;
			const currentPath = window.location.pathname;
			if (currentPath === '/' || currentPath === '/index.html' || currentPath.endsWith('index.html')) {
				defaultAvatarPath = "./dist/img/avatars/avatar.png";
			} else {
				defaultAvatarPath = "../dist/img/avatars/avatar.png";
			}
			
			const userAvatar = (avatar && avatar.trim() !== "" && !avatar.includes("pravatar.cc")) 
				? avatar 
				: defaultAvatarPath;
			
			const newUser = {
				email: emailLower,
				password: password,
				nickname: nickname || "User",
				avatar: userAvatar, // Luôn dùng avatar mặc định nếu không nhập
				balance: 100.00 // Starting balance
			};
			
			mockUsers[emailLower] = newUser;
			saveCurrentUser(newUser);
			
			resolve({
				success: true,
				user: {
					email: newUser.email,
					nickname: newUser.nickname,
					avatar: newUser.avatar
				}
			});
		}, 500);
	});
};

// Đăng xuất
const logout = () => {
	localStorage.removeItem("currentUser");
	localStorage.removeItem("createdAccount");
	localStorage.removeItem("nickname");
	localStorage.removeItem("avatar");
	localStorage.setItem("Balance", "00.00$");
	
	// Clear all user stats
	const statsKeys = [
		"battlesWon", "casesOpened", "upgradesDone", 
		"rouletteWon", "crashWon", "jackpotWon", 
		"coinflipWon", "saperWon"
	];
	
	statsKeys.forEach(key => {
		localStorage.removeItem(key);
	});
	
	// Clear inventory
	for (let i = 0; i < 200; i++) {
		localStorage.removeItem(`id${i}`);
	}
};

// Kiểm tra đã đăng nhập chưa
const isLoggedIn = () => {
	return localStorage.getItem("currentUser") !== null;
};

// Export API
window.auth = {
	login: login,
	register: register,
	logout: logout,
	isLoggedIn: isLoggedIn,
	getCurrentUser: getCurrentUser,
	mockUsers: mockUsers // Export để có thể thêm users từ console
};

