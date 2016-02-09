var connect = require('gulp-connect');
var historyApiFallback = require('connect-history-api-fallback');

module.exports = function (gulp, options, plugins) {
    gulp.task('connect', function () {
        connect.server({
            root: 'app/',
            port: 8888,
            middleware: function(connect, opt) {
                return [ historyApiFallback() ];
            }
        });
    });
    gulp.task('connectDist', function () {
        connect.server({
            root: 'dist/',
            port: 9999,
            middleware: function(connect, opt) {
                return [ historyApiFallback() ];
            }
        });
    });
};