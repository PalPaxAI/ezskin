// Script để inject environment variables từ .env vào frontend
const fs = require('fs');
const path = require('path');

// Đọc .env file hoặc environment variables
function loadEnv() {
	const env = {};
	
	// Ưu tiên đọc từ process.env (Vercel, CI/CD, etc.)
	// Các biến môi trường cần thiết
	const envVars = [
		'SOLANA_RPC_URL',
		'SOLANA_NETWORK',
		'WALLET_ADDRESS',
		'SUPABASE_URL',
		'SUPABASE_ANON_KEY',
		'SUPABASE_SERVICE_ROLE_KEY',
		'NODE_ENV'
	];
	
	// Đọc từ process.env trước (cho Vercel)
	envVars.forEach(key => {
		if (process.env[key]) {
			env[key] = process.env[key];
		}
	});
	
	// Nếu có file .env, đọc từ file (cho local development)
	// Chỉ đọc từ file nếu chưa có trong process.env
	const envPath = path.join(__dirname, '.env');
	if (fs.existsSync(envPath)) {
		const envContent = fs.readFileSync(envPath, 'utf8');
		
		envContent.split('\n').forEach(line => {
			line = line.trim();
			// Bỏ qua comment và dòng trống
			if (line && !line.startsWith('#')) {
				const [key, ...valueParts] = line.split('=');
				if (key && valueParts.length > 0) {
					const keyTrimmed = key.trim();
					// Chỉ dùng giá trị từ file nếu chưa có trong process.env
					if (!process.env[keyTrimmed]) {
						const value = valueParts.join('=').trim();
						// Remove quotes nếu có
						env[keyTrimmed] = value.replace(/^["']|["']$/g, '');
					}
				}
			}
		});
	}
	
	return env;
}

// Tạo file env.js để inject vào frontend
function createEnvJs() {
	const env = loadEnv();
	
	const envJsContent = `// Auto-generated file - DO NOT EDIT
// This file is generated from .env during build process
window.ENV = ${JSON.stringify(env, null, 2)};
`;
	
	const outputPath = path.join(__dirname, 'dist', 'js', 'env.js');
	
	// Đảm bảo thư mục tồn tại
	const distJsPath = path.join(__dirname, 'dist', 'js');
	if (!fs.existsSync(distJsPath)) {
		fs.mkdirSync(distJsPath, { recursive: true });
	}
	
	fs.writeFileSync(outputPath, envJsContent, 'utf8');
	console.log('✅ Đã tạo file env.js từ .env');
	
	return env;
}

// Export để dùng trong gulpfile
module.exports = { loadEnv, createEnvJs };

// Nếu chạy trực tiếp
if (require.main === module) {
	createEnvJs();
}

