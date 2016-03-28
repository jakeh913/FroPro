var gulp = require('gulp');
var ngAnnotate = require('gulp-ng-annotate');

var plugins = require("gulp-load-plugins")({
	pattern: ['gulp-*', 'gulp.*', 'main-bower-files'],
	replaceString: /\bgulp[\-.]/,
	lazy: false
});

gulp.task('ngJs', function () {
	
    gulp.src(['ng/module.js', 'ng/**/*.js'])
        .pipe(plugins.concat('ngApp.js'))
        .pipe(gulp.dest('assets'));
});

gulp.task('watch:ngJs', ['ngJs'], function () {
    gulp.watch('ng/**/*.js', ['ngJs']);
});

gulp.task('bower', function () {
    gulp.src(plugins.mainBowerFiles(), {base: 'bower_components/**/*'})
	.pipe(gulp.dest('assets/main/**/*'));
});

gulp.task('watch:bower', ['bower'], function () {
    gulp.watch('bower_components/**/*', ['bower']);
});