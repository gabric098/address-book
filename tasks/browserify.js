var browserify = require('gulp-browserify');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');

module.exports = function (gulp, options, plugins) {
    gulp.task('browserify', function () {
        gulp.src(['app/js/main.js'])
            .pipe(browserify({
                insertGlobals: true,
                debug: true
            }))
            .pipe(concat('app.js'))
            .pipe(gulp.dest('./app/js'))
            .pipe(livereload());
    });
    gulp.task('browserifyDist', function () {
        gulp.src(['app/js/main.js'])
            .pipe(browserify({
                insertGlobals: true,
                debug: true
            }))
            .pipe(concat('app.js'))
            .pipe(gulp.dest('./dist/js'));
    });
};