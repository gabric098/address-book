// gulp
var gulp = require('gulp');

// plugins
var runSequence = require('run-sequence');

//load tasks
require('load-gulp-tasks')(gulp);

// *** default task *** //
gulp.task('default', function() {
  runSequence(
    ['clean'],
    ['lint', 'browserify', 'connect'],
    ['watch']
  );
});

// *** build task *** //
gulp.task('build', function() {
  runSequence(
    ['clean'],
    ['lint', 'minify-css', 'browserifyDist', 'copy-html-files', 'copy-bower-components', 'connectDist']
  );
});
