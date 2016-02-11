var templateCache = require('gulp-angular-templatecache');


module.exports = function (gulp, options, plugins) {
    gulp.task('templateCache', function () {
        var TEMPLATE_HEADER = '(function () {\'use strict\';module.exports=angular.module("<%= module %>"<%= standalone %>).run(["$templateCache", function($templateCache) {';
        var TEMPLATE_FOOTER = '}]);})();';
        return gulp.src('app/js/**/views/*.html')
            .pipe(templateCache({
                module: 'app.addressbook.templates',
                standalone: true,

                templateHeader: TEMPLATE_HEADER,
                templateFooter: TEMPLATE_FOOTER
            }))
            .pipe(gulp.dest('app/js'));
    });
};