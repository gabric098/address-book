var uglify = require('gulp-uglify');

module.exports = function (gulp, options, plugins) {
    gulp.task('minify-js', function() {
        return gulp.src(['./app/**/*.js', '!./app/bower_components/**'])
            .pipe(uglify({
                // inSourceMap:
                // outSourceMap: "app.js.map"
            }))
            .pipe(gulp.dest('./dist/'));
    });
};