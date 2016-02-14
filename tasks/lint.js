var jshint = require('gulp-jshint');

module.exports = function (gulp, options, plugins) {
    gulp.task('lint', function () {
        return gulp.src(['./app/**/*.js', '!app/js/templates.js'])
            .pipe(jshint())
            .pipe(jshint.reporter('default'))
            .pipe(jshint.reporter('fail'));
    });
};