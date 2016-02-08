var templateCache = require('gulp-angular-templatecache');

module.exports = function (gulp, options, plugins) {
    gulp.task('templateCache', function () {
        return gulp.src('app/js/**/views/*.html')
            .pipe(templateCache({
                module: 'app.addressbook.templates',
                standalone: true,
                moduleSystem: 'Browserify'
            }))
            .pipe(gulp.dest('app/js'));
    });
};