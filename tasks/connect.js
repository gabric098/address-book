var connect = require('gulp-connect');

module.exports = function (gulp, options, plugins) {
    gulp.task('connect', function () {
        connect.server({
            root: 'app/',
            port: 8888
        });
    });
    gulp.task('connectDist', function () {
        connect.server({
            root: 'dist/',
            port: 9999
        });
    });
};