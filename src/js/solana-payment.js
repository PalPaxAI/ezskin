// Solana Payment Handler
// Xử lý thanh toán SOL thật từ ví người dùng đến ví website

const { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } = window.solanaWeb3 || {};

/**
 * Kiểm tra xem user có đủ SOL để mở hòm không
 * @param {number} requiredSol - Số SOL cần thiết
 * @returns {Promise<boolean>}
 */
const checkSolBalance = async (requiredSol) => {
	try {
		if (!window.wallet || !window.wallet.isConnected()) {
			console.error('Ví chưa được kết nối');
			return false;
		}
		
		const currentBalance = await window.wallet.getBalance();
		return currentBalance >= requiredSol;
	} catch (error) {
		console.error('Error checking SOL balance:', error);
		return false;
	}
};

/**
 * Gửi SOL từ ví user đến ví website
 * @param {number} amountSol - Số SOL cần gửi
 * @param {string} recipientAddress - Địa chỉ ví nhận (từ CONFIG)
 * @returns {Promise<{success: boolean, signature?: string, error?: string}>}
 */
const sendSolPayment = async (amountSol, recipientAddress = null) => {
	try {
		// Kiểm tra ví đã kết nối
		if (!window.wallet || !window.wallet.isConnected()) {
			return {
				success: false,
				error: 'Ví chưa được kết nối. Vui lòng kết nối ví trước.'
			};
		}
		
		// Lấy địa chỉ ví nhận từ CONFIG
		const walletAddress = recipientAddress || (window.CONFIG && window.CONFIG.walletAddress);
		
		if (!walletAddress) {
			return {
				success: false,
				error: 'Địa chỉ ví nhận chưa được cấu hình. Vui lòng liên hệ admin.'
			};
		}
		
		// Kiểm tra CONFIG
		if (!window.CONFIG || !window.CONFIG.isConfigured()) {
			return {
				success: false,
				error: 'Hệ thống chưa được cấu hình đầy đủ.'
			};
		}
		
		// Lấy provider từ wallet
		const walletProvider = localStorage.getItem('walletProvider');
		if (!walletProvider || !window.wallet.configs[walletProvider]) {
			return {
				success: false,
				error: 'Không tìm thấy ví provider.'
			};
		}
		
		const provider = window.wallet.configs[walletProvider].getProvider();
		if (!provider || !provider.publicKey) {
			return {
				success: false,
				error: 'Không thể truy cập ví. Vui lòng thử lại.'
			};
		}
		
		// Kiểm tra balance trước
		const currentBalance = await window.wallet.getBalance();
		if (currentBalance < amountSol) {
			return {
				success: false,
				error: `Số dư không đủ. Bạn cần ${amountSol.toFixed(4)} SOL nhưng chỉ có ${currentBalance.toFixed(4)} SOL.`
			};
		}
		
		// Tạo connection
		const connection = new Connection(
			window.CONFIG.solanaRpcUrl,
			'confirmed'
		);
		
		// Tạo transaction
		const transaction = new Transaction();
		
		const recipientPubkey = new PublicKey(walletAddress);
		const senderPubkey = provider.publicKey;
		
		// Chuyển SOL
		transaction.add(
			SystemProgram.transfer({
				fromPubkey: senderPubkey,
				toPubkey: recipientPubkey,
				lamports: amountSol * LAMPORTS_PER_SOL, // Chuyển từ SOL sang lamports
			})
		);
		
		// Lấy recent blockhash
		const { blockhash } = await connection.getRecentBlockhash();
		transaction.recentBlockhash = blockhash;
		transaction.feePayer = senderPubkey;
		
		// Ký transaction
		const signedTransaction = await provider.signTransaction(transaction);
		
		// Gửi transaction
		const signature = await connection.sendRawTransaction(
			signedTransaction.serialize()
		);
		
		// Đợi xác nhận
		await connection.confirmTransaction(signature, 'confirmed');
		
		return {
			success: true,
			signature: signature
		};
		
	} catch (error) {
		console.error('Error sending SOL payment:', error);
		
		let errorMessage = 'Lỗi khi gửi thanh toán.';
		
		if (error.code === 4001) {
			errorMessage = 'Bạn đã từ chối giao dịch.';
		} else if (error.message) {
			errorMessage = error.message;
		}
		
		return {
			success: false,
			error: errorMessage
		};
	}
};

/**
 * Mở hòm với SOL thật
 * @param {number} casePriceSol - Giá hòm tính bằng SOL
 * @param {Function} onSuccess - Callback khi thành công
 * @param {Function} onError - Callback khi lỗi
 */
const openCaseWithSol = async (casePriceSol, onSuccess, onError) => {
	try {
		// Kiểm tra balance
		const hasEnoughBalance = await checkSolBalance(casePriceSol);
		if (!hasEnoughBalance) {
			if (onError) {
				onError('Số dư SOL không đủ để mở hòm này.');
			}
			return;
		}
		
		// Gửi SOL payment
		const paymentResult = await sendSolPayment(casePriceSol);
		
		if (paymentResult.success) {
			// Thanh toán thành công, có thể mở hòm
			if (onSuccess) {
				onSuccess(paymentResult.signature);
			}
		} else {
			// Thanh toán thất bại
			if (onError) {
				onError(paymentResult.error || 'Thanh toán thất bại.');
			}
		}
	} catch (error) {
		console.error('Error in openCaseWithSol:', error);
		if (onError) {
			onError('Đã xảy ra lỗi khi mở hòm. Vui lòng thử lại.');
		}
	}
};

// Export API
if (typeof window !== 'undefined') {
	window.solanaPayment = {
		checkBalance: checkSolBalance,
		sendPayment: sendSolPayment,
		openCase: openCaseWithSol
	};
}

