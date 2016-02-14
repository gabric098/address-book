// gulp
var gulp = require('gulp');

// plugins
var runSequence = require('run-sequence');

//load tasks
require('load-gulp-tasks')(gulp);

// *** default task *** //
gulp.task('default', function () {
    runSequence(
        ['clean', 'lint', 'templateCache'],
        ['browserify'],
        ['ngannotate'],
        ['watch'],
        ['connect']
    );
});

// *** build task *** //
gulp.task('build', function () {
    runSequence(
        ['clean', 'lint', 'templateCache', 'minify-css', 'copy-html-files', 'copy-assets-files'],
        ['browserifyDist'],
        ['ngannotate'],
        ['minify-js'],
        ['connectDist']
    );
});