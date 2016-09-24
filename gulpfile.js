var gulp = require('gulp');
var concat = require('gulp-concat');
var react = require('gulp-react');
var sass = require('gulp-sass');

gulp.task("jsx", function () {
    return gulp.src("public/assets/js/src/babel/*.jsx")
        .pipe(react({harmony: true}))
        .pipe(gulp.dest('public/assets/js/src/build/'))
});

gulp.task('scripts', function () {
    return gulp.src('public/assets/js/src/build/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('public/assets/js/src/final/'));
});

gulp.task('sass', function () {
    return gulp.src('public/assets/sass/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('public/assets/css/build'));
});

gulp.task('css', function () {
    return gulp.src('public/assets/css/build/*.css')
        .pipe(concat('main.css'))
        .pipe(gulp.dest('public/assets/css/'));
});