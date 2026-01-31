// Script để inject environment variables từ .env vào frontend
const fs = require('fs');
const path = require('path');

// Đọc .env file
function loadEnv() {
	const envPath = path.join(__dirname, '.env');
	
	if (!fs.existsSync(envPath)) {
		console.warn('⚠️  File .env không tồn tại. Sử dụng giá trị mặc định.');
		return {};
	}
	
	const envContent = fs.readFileSync(envPath, 'utf8');
	const env = {};
	
	envContent.split('\n').forEach(line => {
		line = line.trim();
		// Bỏ qua comment và dòng trống
		if (line && !line.startsWith('#')) {
			const [key, ...valueParts] = line.split('=');
			if (key && valueParts.length > 0) {
				const value = valueParts.join('=').trim();
				// Remove quotes nếu có
				env[key.trim()] = value.replace(/^["']|["']$/g, '');
			}
		}
	});
	
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

