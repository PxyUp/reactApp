var gulp = require('gulp');
var react = require('gulp-react');

gulp.task("default", function () {
    return gulp.src("public/assets/js/src/babel/*.jsx")
        .pipe(react({harmony: true}))
        .pipe(gulp.dest('public/assets/js/src/build/'))
});