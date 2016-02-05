var cssnano = require('gulp-cssnano');

module.exports = function (gulp, options, plugins) {
    gulp.task('minify-css', function() {
        return gulp.src(['./app/**/*.css', '!./app/bower_components/**'])
            .pipe(cssnano())
            .pipe(gulp.dest('./dist/'));
    });
};