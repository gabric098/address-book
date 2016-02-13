var uglify = require('gulp-uglify');

module.exports = function (gulp, options, plugins) {
    gulp.task('minify-js', function() {
        return gulp.src(['./dist/js/app.js'])
            .pipe(uglify({
                mangle: false
                // inSourceMap:
                // outSourceMap: "app.js.map"
            }))
            .pipe(gulp.dest('./dist/js'));
    });
};