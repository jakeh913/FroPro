var gulp = require('gulp');
var stylus = require('gulp-stylus');

var plugins = require("gulp-load-plugins")({
	pattern: ['gulp-*', 'gulp.*', 'main-bower-files'],
	replaceString: /\bgulp[\-.]/,
	lazy: false
});

gulp.task('css', function () {
    gulp.src('css/**/*.styl')
    .pipe(plugins.stylus())
    .pipe(gulp.dest('assets'));
});

gulp.task('watch:css', ['css'], function () {
    gulp.watch('css/**/*.styl', ['css']);
});


//gulp.task('bowercss', function () {
//    gulp.src(plugins.mainBowerFiles())
//	.pipe(plugins.filter('**/*.css'))
//	.pipe(gulp.dest('assets/css'));
//});

//gulp.task('watch:bowercss', ['bowercss'], function () {
//   gulp.watch('bower_components/**/*.css', ['bowercss']);
//});
