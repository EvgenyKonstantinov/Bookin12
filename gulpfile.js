var syntax        = 'sass'; // Syntax: sass or scss;

var gulp          = require('gulp'),
		sass          = require('gulp-sass'),
		browsersync   = require('browser-sync'),
		concat        = require('gulp-concat'),
		notify        = require("gulp-notify"),
		autoprefixer  = require('gulp-autoprefixer');

		gulp.task('browser-sync', function() {
			browsersync({
				server: {
					baseDir: 'app'
				},
				notify: false,
				// open: false,
				// tunnel: true,
				// tunnel: "projectname", //Demonstration page: http://projectname.localtunnel.me
			})
		});

		gulp.task('styles', function() {
			return gulp.src('app/'+syntax+'/**/*.'+syntax+'')
			.pipe(sass({ outputStyle: 'expand' }).on("error", notify.onError()))
			.pipe(autoprefixer(['last 15 versions']))
			.pipe(concat("/main.css"))
			.pipe(gulp.dest('app/css/'))
			.pipe(browsersync.reload( {stream: true} ))
		});

		gulp.task('js', function() {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/libs/maskedinput/jquery.maskedinput.min.js',
		'app/libs/fancybox/jquery.fancybox.min.js',
		'app/js/common.js', // Always at the end
		])
	.pipe(concat('scripts.min.js'))
	// .pipe(uglify()) // Mifify js (opt.)
	.pipe(gulp.dest('app/js'))
	.pipe(browsersync.reload({ stream: true }))
});



		gulp.task('watch', ['styles','js','browser-sync'], function() {
			gulp.watch('app/'+syntax+'/**/*.'+syntax+'', ['styles']);
			gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['js']);
			gulp.watch('app/*.html', browsersync.reload)
		});
		
		gulp.task('default', ['watch']);