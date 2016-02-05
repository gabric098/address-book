var browserify = require('gulp-browserify');
var concat = require('gulp-concat');

module.exports = function (gulp, options, plugins) {
    gulp.task('browserify', function () {
        return gulp.src(['app/js/init.js'])
            .pipe(browserify({
                insertGlobals: true,
                debug: true
            }))
            .pipe(concat('app.js'))
            .pipe(gulp.dest('./app/js'));
    });
    gulp.task('browserifyDist', function () {
        return gulp.src(['app/js/init.js'])
            .pipe(browserify({
                insertGlobals: true,
                debug: true
            }))
            .pipe(concat('app.js'))
            .pipe(gulp.dest('./dist/js'));
    });
};