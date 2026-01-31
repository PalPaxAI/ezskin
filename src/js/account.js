const loginBtn = document.querySelector("#login-btn");
const logoutBtn = document.querySelector("#logout-btn");
const loggedIn = document.querySelector(".user__logged-out");
const loggedOut = document.querySelector(".user__logged-in");
const loginBtnMobile = document.querySelector("#login-btn-mobile");
const logoutBtnMobile = document.querySelector("#logout-btn-mobile");
const loggedInMobile = document.querySelector(
	".user-mobile__logged-out-mobile"
);
const loggedOutMobile = document.querySelector(
	".user-mobile__logged-in-mobile"
);
const loginPopup = document.querySelector(".login-popup");
const loginPopupBackBtn = document.querySelector(".login-popup__icon");
const loginPopupImg = document.querySelector("#login-img");
const loginPopupNickname = document.querySelector("#login-nickname");
const loginPopupSubmitBtn = document.querySelector(".login-popup__btn");
const loginPopupEmail = document.querySelector("#login-email");
const loginPopupPassword = document.querySelector("#login-password");
const nickname = document.querySelector(".user__name");
const avatar = document.querySelector(".user__avatar");
const nicknameMobile = document.querySelector(".user-mobile__name");
const avatarMobile = document.querySelector(".user-mobile__avatar");
const profileMobile = document.querySelector(".user-mobile__top");

// Helper function để lấy avatar mặc định (tự động detect đường dẫn đúng)
const getDefaultAvatar = () => {
	// Kiểm tra đường dẫn hiện tại để xác định đường dẫn tương đối đúng
	const currentPath = window.location.pathname;
	if (currentPath === '/' || currentPath === '/index.html' || currentPath.endsWith('index.html')) {
		// File ở root
		return "./dist/img/avatars/avatar.png";
	} else {
		// File ở subfolder (modes/, cases/, diff/)
		return "../dist/img/avatars/avatar.png";
	}
};

// Helper function để lấy avatar từ localStorage hoặc trả về mặc định
const getUserAvatar = () => {
	let userAvatar = localStorage.getItem("avatar");
	// Kiểm tra nếu avatar không hợp lệ: null, rỗng, URL cũ, hoặc giá trị không hợp lệ như "ad"
	if (!userAvatar || 
		userAvatar.trim() === "" || 
		userAvatar.includes("pravatar.cc") || 
		userAvatar === "ad" ||
		(!userAvatar.startsWith("http") && !userAvatar.startsWith("./") && !userAvatar.startsWith("../") && !userAvatar.startsWith("/"))) {
		userAvatar = getDefaultAvatar();
		localStorage.setItem("avatar", userAvatar);
	}
	return userAvatar;
};

const addListeners = () => {
	loginBtn.addEventListener("click", loginToAccount);
	logoutBtn.addEventListener("click", logoutFromAccount);
	loginBtnMobile.addEventListener("click", loginToAccount);
	logoutBtnMobile.addEventListener("click", logoutFromAccount);
	
	// Wallet modal handlers
	const walletModal = document.querySelector(".wallet-modal");
	const walletModalClose = document.querySelector(".wallet-modal__close");
	const walletModalOverlay = document.querySelector(".wallet-modal__overlay");
	const walletItems = document.querySelectorAll(".wallet-modal__item");
	
	if (walletModalClose) {
		walletModalClose.addEventListener("click", () => {
			if (walletModal) walletModal.classList.add("hidden");
		});
	}
	
	if (walletModalOverlay) {
		walletModalOverlay.addEventListener("click", () => {
			if (walletModal) walletModal.classList.add("hidden");
		});
	}
	
	// Xử lý click vào từng ví
	walletItems.forEach(item => {
		item.addEventListener("click", async () => {
			const walletName = item.getAttribute("data-wallet");
			if (walletName && window.wallet) {
				// Đóng modal
				if (walletModal) walletModal.classList.add("hidden");
				
				// Kết nối ví
				const result = await window.wallet.connect(walletName);
				if (result && result.success) {
					checkIfUserCreatedAccount();
					if (typeof setBalance === 'function') setBalance();
				}
			}
		});
	});
	
	profileMobile.addEventListener("click", changeSiteToProfile);
	
	// Giữ lại các listener cũ cho tương thích (nếu có)
	if (loginPopupSubmitBtn) {
		loginPopupSubmitBtn.addEventListener("click", createAccount);
	}
	if (loginPopupImg) loginPopupImg.addEventListener("click", removeError);
	if (loginPopupNickname) loginPopupNickname.addEventListener("click", removeError);
	if (loginPopupEmail) loginPopupEmail.addEventListener("click", removeError);
	if (loginPopupPassword) loginPopupPassword.addEventListener("click", removeError);
};

function removeError() {
	this.classList.remove("error-input");
}

const checkIfUserCreatedAccount = async () => {
	// Kiểm tra xem ví đã được kết nối chưa hoặc đã tạo tài khoản chưa
	const walletConnected = window.wallet && window.wallet.isConnected();
	const accountCreated = localStorage.getItem("createdAccount") === "1" || localStorage.getItem("createdAccount") === 1;
	
	if (!walletConnected && !accountCreated) {
		// Chưa kết nối ví hoặc tạo tài khoản
		loggedIn.classList.remove("hidden");
		loggedOut.classList.add("hidden");
		loggedInMobile.classList.remove("hidden");
		loggedOutMobile.classList.add("hidden");
	} else {
		// Đã kết nối ví hoặc tạo tài khoản
		loggedIn.classList.add("hidden");
		loggedOut.classList.remove("hidden");
		loggedInMobile.classList.add("hidden");
		loggedOutMobile.classList.remove("hidden");
		
		const userAvatar = getUserAvatar();
		const userNickname = localStorage.getItem("nickname") || "User";
		
		if (avatar) avatar.setAttribute("src", userAvatar);
		if (nickname) nickname.textContent = userNickname;
		if (avatarMobile) avatarMobile.setAttribute("src", userAvatar);
		if (nicknameMobile) nicknameMobile.textContent = userNickname;
		
		// Refresh balance từ ví nếu đã kết nối
		if (walletConnected && typeof setBalance === 'function') {
			await setBalance();
		}
	}

	// if stats are not added but account is created then create them (fixes error that if someone crated account before stats were added it add him stats)
	if (localStorage.getItem("createdAccount") == 1) {
		if (
			localStorage.getItem("battlesWon") === null ||
			localStorage.getItem("battlesWon") === NaN
		) {
			{
				localStorage.setItem("battlesWon", 0);
			}
		}

		if (
			localStorage.getItem("casesOpened") === null ||
			localStorage.getItem("casesOpened") === NaN
		) {
			{
				localStorage.setItem("casesOpened", 0);
			}
		}

		if (
			localStorage.getItem("upgradesDone") === null ||
			localStorage.getItem("upgradesDone") === NaN
		) {
			{
				localStorage.setItem("upgradesDone", 0);
			}
		}

		if (
			localStorage.getItem("rouletteWon") === null ||
			localStorage.getItem("rouletteWon") === NaN
		) {
			{
				localStorage.setItem("rouletteWon", 0);
			}
		}

		if (
			localStorage.getItem("crashWon") === null ||
			localStorage.getItem("crashWon") === NaN
		) {
			{
				localStorage.setItem("crashWon", 0);
			}
		}

		if (
			localStorage.getItem("jackpotWon") === null ||
			localStorage.getItem("jackpotWon") === NaN
		) {
			{
				localStorage.setItem("jackpotWon", 0);
			}
		}

		if (
			localStorage.getItem("coinflipWon") === null ||
			localStorage.getItem("coinflipWon") === NaN
		) {
			{
				localStorage.setItem("coinflipWon", 0);
			}
		}

		if (
			localStorage.getItem("saperWon") === null ||
			localStorage.getItem("saperWon") === NaN
		) {
			{
				localStorage.setItem("saperWon", 0);
			}
		}

		if (
			localStorage.getItem("muted") === null ||
			localStorage.getItem("muted") === NaN
		) {
			{
				localStorage.setItem("muted", 0);
			}
		}
	}
};

const loginToAccount = async () => {
	// Hiển thị modal chọn ví Solana
	if (window.wallet && window.wallet.isConnected()) {
		// Nếu đã kết nối, ngắt kết nối
		await window.wallet.disconnect();
		logoutFromAccount();
	} else {
		// Hiển thị modal chọn ví
		const walletModal = document.querySelector(".wallet-modal");
		if (walletModal) {
			walletModal.classList.remove("hidden");
			// Cập nhật trạng thái các ví
			if (window.wallet && window.wallet.updateStatus) {
				window.wallet.updateStatus();
			}
		}
	}
};

const logoutFromAccount = async () => {
	// Ngắt kết nối ví
	if (window.wallet && window.wallet.isConnected()) {
		await window.wallet.disconnect();
	}
	
	// Xóa thông tin auth cũ nếu có
	if (window.auth) {
		window.auth.logout();
	}
	
	loggedIn.classList.toggle("hidden");
	loggedOut.classList.toggle("hidden");
	loggedInMobile.classList.toggle("hidden");
	loggedOutMobile.classList.toggle("hidden");
	setBalance(); // Reset balance display
};

const createAccount = async () => {
	// Hệ thống đăng nhập mới với email/password
	const email = loginPopupEmail ? loginPopupEmail.value.trim() : "";
	const password = loginPopupPassword ? loginPopupPassword.value : "";
	const nickname = loginPopupNickname ? loginPopupNickname.value.trim() : "";
	const avatarInput = loginPopupImg ? loginPopupImg.value.trim() : "";
	
	// Avatar mặc định: nếu người dùng không nhập hoặc nhập rỗng, dùng avatar mặc định
	// Nếu họ nhập URL hợp lệ, dùng URL đó (họ có thể thay đổi sau trong profile)
	const avatar = (avatarInput && avatarInput.length > 0 && !avatarInput.includes("pravatar.cc")) 
		? avatarInput 
		: getDefaultAvatar();

	// Nếu có email và password thì dùng hệ thống mới
	if (email && password && window.auth) {
		try {
			// Thử đăng ký (hoặc đăng nhập nếu đã tồn tại)
			let result;
			const emailLower = email.toLowerCase();
			
			// Check if user exists
			if (window.auth.mockUsers && window.auth.mockUsers[emailLower]) {
				// User đã tồn tại, thử đăng nhập
				result = await window.auth.login(email, password);
			} else {
				// User mới, đăng ký - LUÔN dùng avatar mặc định khi đăng ký mới
				result = await window.auth.register(
					email, 
					password, 
					nickname || "User", 
					avatar // Đã xử lý ở trên: nếu không nhập thì dùng mặc định
				);
			}
			
			if (result.success) {
				// Khởi tạo stats
				localStorage.setItem("battlesWon", 0);
				localStorage.setItem("casesOpened", 0);
				localStorage.setItem("upgradesDone", 0);
				localStorage.setItem("rouletteWon", 0);
				localStorage.setItem("crashWon", 0);
				localStorage.setItem("jackpotWon", 0);
				localStorage.setItem("coinflipWon", 0);
				localStorage.setItem("saperWon", 0);
				localStorage.setItem("muted", 0);
				
				// Clear inputs
				if (loginPopupEmail) loginPopupEmail.value = "";
				if (loginPopupPassword) loginPopupPassword.value = "";
				if (loginPopupNickname) loginPopupNickname.value = "";
				if (loginPopupImg) loginPopupImg.value = "";
				
				loginPopup.classList.add("hidden");
				checkIfUserCreatedAccount();
				if (typeof setBalance === 'function') setBalance();
			}
		} catch (error) {
			alert(error.message || "Đăng nhập thất bại!");
		}
	} 
	// Fallback: hệ thống cũ (chỉ nickname + avatar) - để tương thích
	else if (loginPopupImg && loginPopupNickname && loginPopupImg.value !== "" && loginPopupNickname.value !== "") {
		localStorage.setItem("createdAccount", 1);
		// Avatar mặc định: nếu không nhập hoặc nhập rỗng, dùng avatar mặc định
		const avatarFallback = (avatarInput && avatarInput.length > 0 && !avatarInput.includes("pravatar.cc")) 
			? avatarInput 
			: getDefaultAvatar();
		localStorage.setItem("avatar", avatarFallback);
		localStorage.setItem("nickname", nickname || "User");
		localStorage.setItem("battlesWon", 0);
		localStorage.setItem("casesOpened", 0);
		localStorage.setItem("upgradesDone", 0);
		localStorage.setItem("rouletteWon", 0);
		localStorage.setItem("crashWon", 0);
		localStorage.setItem("jackpotWon", 0);
		localStorage.setItem("coinflipWon", 0);
		localStorage.setItem("saperWon", 0);
		localStorage.setItem("muted", 0);
		loginToAccount();
		checkIfUserCreatedAccount();
	} else {
		// Show errors
		if (loginPopupEmail && !email) loginPopupEmail.classList.add("error-input");
		if (loginPopupPassword && !password) loginPopupPassword.classList.add("error-input");
		if (loginPopupNickname && !nickname) loginPopupNickname.classList.add("error-input");
		if (loginPopupImg && !avatar) loginPopupImg.classList.add("error-input");
	}
};

const changeSiteToProfile = () => {
	// depending on where we are change link
	if (document.body.id === "index") {
		open("./profile", "_self");
	} else {
		open("../profile", "_self");
	}
};

addListeners();
checkIfUserCreatedAccount();
