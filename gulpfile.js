var gulp 		= require("gulp"),
		sass 		= require("gulp-sass"),
		brSync 	= require("browser-sync"),
		concat  = require("gulp-concat"),
		uglify  = require("gulp-uglifyjs"),
		cssnano = require("gulp-cssnano"),
		rename  = require("gulp-rename"),
		del 		= require('del'),
		imageMin= require('gulp-imagemin'),
		pngQuand= require('imagemin-pngquant'),
		cache   = require('gulp-cache'),
		prefix  = require('gulp-autoprefixer');

gulp.task("sasstask", function(){
	return gulp.src("app/sass/**/*.sass")
	.pipe(sass())
	.pipe(prefix({
		browsers:['last 15 version', '> 1%', 'ie 8', 'ie 7'], 
		cascade: true
	}))
	.pipe(gulp.dest("app/css"))
	.pipe(brSync.reload({stream: true}))
});

gulp.task("script", function(){
	return gulp.src('app/libs/jquery/dist/jquery.min.js')
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest("app/js"));
});

gulp.task("css-libs",['sasstask'], function(){
	return gulp.src('app/libs/jquery-timepicker-wvega/jquery.timepicker.css')
	.pipe(cssnano())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('app/css'));
});

gulp.task("js-libs", function(){
	return gulp.src('app/libs/jquery-timepicker-wvega/jquery.timepicker.js')
	.pipe(gulp.dest('app/js'));
});

gulp.task("br-Sync", function(){
	brSync({
		server: {
			baseDir: "app"
		},
		notify: false
	});
});

gulp.task('clean', function(){
	return del.sync('dist');
});

gulp.task('clear', function(){
	return cache.clearAll();
});

gulp.task('img', function(){
	return gulp.src('app/img/**/*')
	.pipe(cache(imageMin({
		interlaced: true,
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngQuand()]
	})))
	.pipe(gulp.dest('dist/img'));
});

gulp.task("watchtask",["br-Sync","css-libs", "script", "js-libs"], function(){
	gulp.watch("app/sass/**/*.sass", ["sasstask"]);
	gulp.watch("app/*.html", brSync.reload);
	gulp.watch("app/js/*.js", brSync.reload);
});

gulp.task('build',['clean', 'sasstask', 'script', 'img', "js-libs"], function(){
	var buildcss = gulp.src([
		'app/css/main.css',
		'app/css/jquery.timepicker.min.css',
		'app/css/jquery-ui.css'
		])
	.pipe(gulp.dest('dist/css'));

	var buildFonts = gulp.src('app/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'));

	var buildJs = gulp.src('app/js/**/*')
	.pipe(gulp.dest('dist/js'));

	var buildHtml = gulp.src('app/*.html')
	.pipe(gulp.dest('dist'));
});