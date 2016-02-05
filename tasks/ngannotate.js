var ngAnnotate = require('gulp-ng-annotate');
var livereload = require('gulp-livereload');

module.exports = function (gulp, options, plugins) {
    gulp.task('ngannotate', function () {
        return gulp.src('app/js/app.js')
            .pipe(ngAnnotate())
            .pipe(gulp.dest('app/js'))
            .pipe(livereload());
    });
};