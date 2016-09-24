var gulp = require('gulp');
var concat = require('gulp-concat');
var react = require('gulp-react');

gulp.task("default", function () {
    return gulp.src("public/assets/js/src/babel/*.jsx")
        .pipe(react({harmony: true}))
        .pipe(gulp.dest('public/assets/js/src/build/'))
});

gulp.task('scripts', function() {
    return gulp.src('public/assets/js/src/build/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('public/assets/js/src/final/'));
});