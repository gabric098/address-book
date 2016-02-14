module.exports = function (gulp, options, plugins) {
    gulp.task('copy-html-files', function () {
        return gulp.src('./app/index.html')
            .pipe(gulp.dest('dist/'));
    });
    gulp.task('copy-assets-files', function () {
        return gulp.src('./app/assets/**')
            .pipe(gulp.dest('dist/assets'));
    });
};