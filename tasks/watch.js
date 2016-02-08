var livereload = require('gulp-livereload');

module.exports = function (gulp, options, plugins) {
    gulp.task('watch', function () {
        livereload.listen();
        gulp.watch(['./app/js/**/*.js', './app/js/**/*.html', '!./app/js/app.js'], ['bundle']);
    });
};