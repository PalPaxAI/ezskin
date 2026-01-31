const { src, dest, series, parallel, watch } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cssnano = require("gulp-cssnano");
const autoprefixer = require("gulp-autoprefixer");
const rename = require("gulp-rename");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const imagemin = require("gulp-imagemin");
const sourcemaps = require("gulp-sourcemaps");
const clean = require("gulp-clean");
const kit = require("gulp-kit");
const browserSync = require("browser-sync").create();
const reload = browserSync.reload;
const { createEnvJs } = require("./inject-env");

const paths = {
    html: "./html/**/*.kit",
	sass: "./src/sass/**/*.scss",
	js: "./src/js/**/*.js",
	img: "./src/img/**/*",
	dist: "./dist",
	sassDest: "./dist/css",
	jsDest: "./dist/js",
	imgDest: "./dist/img",
};

function sassCompiler() {
	return src(paths.sass)
		.pipe(sourcemaps.init())
		.pipe(sass().on("error", sass.logError))
		.pipe(autoprefixer())
		.pipe(cssnano())
		.pipe(
			rename({
				suffix: ".min",
			})
		)
		.pipe(sourcemaps.write())
		.pipe(dest(paths.sassDest));
}

function injectEnv(done) {
	// Inject environment variables từ .env vào frontend
	createEnvJs();
	done();
}

function javaScript() {
	return src(paths.js)
		.pipe(sourcemaps.init())
		.pipe(
			babel({
				presets: ["@babel/env"],
			})
		)
		.pipe(uglify())
		.pipe(
			rename({
				suffix: ".min",
			})
		)
		.pipe(sourcemaps.write())
		.pipe(dest(paths.jsDest));
}

function convertImages() {
	return src(paths.img).pipe(imagemin()).pipe(dest(paths.imgDest));
}

function handleKits() {
	return src(paths.html).pipe(kit()).pipe(dest("./"));
}

function cleanStuff() {
	return src(paths.dist, { read: false }).pipe(clean());
}

function startBrowerSync(done) {
	browserSync.init({
		server: {
			baseDir: "./",
			middleware: [
				function(req, res, next) {
					// URL mapping - map clean URLs to actual file paths
					const urlMap = {
						// Modes pages
						'/battles': '/modes/battles.html',
						'/upgrader': '/modes/upgrader.html',
						'/roulette': '/modes/roulette.html',
						'/crash': '/modes/crash.html',
						'/jackpot': '/modes/jackpot.html',
						'/coinflip': '/modes/coinflip.html',
						'/saper': '/modes/saper.html',
						
						// Cases pages
						'/redline': '/cases/redline.html',
						'/luckylore': '/cases/luckylore.html',
						'/blaze': '/cases/blaze.html',
						'/tigertooth': '/cases/tigertooth.html',
						'/deserteagle': '/cases/deserteagle.html',
						'/ak47': '/cases/ak47.html',
						'/m4a4': '/cases/m4a4.html',
						'/awp': '/cases/awp.html',
						'/1profit': '/cases/1profit.html',
						'/poseidon': '/cases/poseidon.html',
						'/25knife': '/cases/25knife.html',
						'/10k': '/cases/10k.html',
						
						// Diff pages
						'/profile': '/diff/profile.html',
						'/deposit': '/diff/deposit.html',
						'/terms': '/diff/terms.html',
						'/privacy': '/diff/privacy.html'
					};
					
					// Check if URL needs rewriting
					if (urlMap[req.url]) {
						req.url = urlMap[req.url];
					}
					
					next();
				}
			]
		},
		// Disable BrowserSync UI to avoid eazy-logger crash on newer Node versions.
		ui: false,
	});
	done();
}

function watchForChanges(done) {
	watch("./*.html").on("change", reload);
	watch([paths.html, paths.sass, paths.js], parallel(handleKits, sassCompiler, javaScript)).on(
		"change",
		reload
	);
	watch(paths.img, convertImages).on("change", reload);
	done();
}

const mainFunctions = parallel(handleKits, sassCompiler, javaScript, convertImages);
exports.default = series(injectEnv, mainFunctions, startBrowerSync, watchForChanges);
// Build once (no browserSync/watch) - used by npm run build
exports.build = series(injectEnv, mainFunctions);
exports.clean = cleanStuff
