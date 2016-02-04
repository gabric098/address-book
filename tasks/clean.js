var del = require('del');

module.exports = function (gulp, options, plugins) {
    gulp.task('clean', function () {
        return del([
            './dist/*',
            './app/js/app.js'
        ]);
    });
};