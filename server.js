const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static(__dirname));

// URL mapping - map clean URLs to actual file paths
const urlMap = {
	// Modes pages
	'battles': '/modes/battles.html',
	'upgrader': '/modes/upgrader.html',
	'roulette': '/modes/roulette.html',
	'crash': '/modes/crash.html',
	'jackpot': '/modes/jackpot.html',
	'coinflip': '/modes/coinflip.html',
	'saper': '/modes/saper.html',
	
	// Cases pages
	'redline': '/cases/redline.html',
	'luckylore': '/cases/luckylore.html',
	'blaze': '/cases/blaze.html',
	'tigertooth': '/cases/tigertooth.html',
	'deserteagle': '/cases/deserteagle.html',
	'ak47': '/cases/ak47.html',
	'm4a4': '/cases/m4a4.html',
	'awp': '/cases/awp.html',
	'1profit': '/cases/1profit.html',
	'poseidon': '/cases/poseidon.html',
	'25knife': '/cases/25knife.html',
	'10k': '/cases/10k.html',
	
	// Diff pages
	'profile': '/diff/profile.html',
	'deposit': '/diff/deposit.html',
	'terms': '/diff/terms.html',
	'privacy': '/diff/privacy.html'
};

// Rewrite clean URLs to actual file paths
app.get('/:page', (req, res, next) => {
	const page = req.params.page;
	
	// If it's a mapped page, serve the actual file
	if (urlMap[page]) {
		return res.sendFile(path.join(__dirname, urlMap[page]));
	}
	
	// Otherwise, try to serve as static file or 404
	next();
});

// Root route
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
	console.log('Clean URLs enabled (e.g., /battles, /upgrader, /profile)');
});

