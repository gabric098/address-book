module.exports = function (gulp, options, plugins) {
    gulp.task('copy-bower-components', function () {
        gulp.src('./app/bower_components/**')
            .pipe(gulp.dest('dist/bower_components'));
    });
    gulp.task('copy-html-files', function () {
        gulp.src('./app/**/*.html')
            .pipe(gulp.dest('dist/'));
    });
};