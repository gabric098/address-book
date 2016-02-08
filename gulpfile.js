// gulp
var gulp = require('gulp');

// plugins
var runSequence = require('run-sequence');

//load tasks
require('load-gulp-tasks')(gulp);

// *** default task *** //
gulp.task('default', function () {
    runSequence(
        ['clean'],
        ['bundle'],
        ['connect'],
        ['watch']
    );
});

// *** build task *** //
gulp.task('build', function () {
    runSequence(
        ['clean'],
        ['minify-css', 'bundle', 'copy-html-files', 'copy-bower-components', 'connectDist']
    );
});

gulp.task('bundle', function () {
    runSequence(
        ['templateCache'],
        ['browserify'],
        ['ngannotate']
    );
});
