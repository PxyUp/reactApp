var gulp         = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var babel        = require('gulp-babel');
var browserSync  = require('browser-sync');
var concat       = require('gulp-concat');
var eslint       = require('gulp-eslint');
var filter       = require('gulp-filter');
var newer        = require('gulp-newer');
var notify       = require('gulp-notify');
var plumber      = require('gulp-plumber');
var reload       = browserSync.reload;
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');

var onError = function(err) {
    notify.onError({
        title:    "Error",
        message:  "<%= error %>",
    })(err);
    this.emit('end');
};

var plumberOptions = {
    errorHandler: onError,
};

var jsFiles = {
    vendor: [

    ],
    source: [
        'public/assets/js/src/Utility.js',
        'public/assets/js/src/components/ComponentForm.jsx',
        'public/assets/js/src/components/Component.jsx',
    ]
};

// Lint JS/JSX files
gulp.task('eslint', function() {
    return gulp.src(jsFiles.source)
        .pipe(eslint({
            baseConfig: {
                "ecmaFeatures": {
                    "jsx": true
                }
            }
        }))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

// Copy react.js and react-dom.js to assets/js/src/vendor
// only if the copy in node_modules is "newer"
gulp.task('copy-react', function() {
    return gulp.src('node_modules/react/dist/react.js')
        .pipe(newer('public/assets/js/src/vendor/react.js'))
        .pipe(gulp.dest('public/assets/js/src/vendor'));
});
gulp.task('copy-react-dom', function() {
    return gulp.src('node_modules/react-dom/dist/react-dom.js')
        .pipe(newer('public/assets/js/src/vendor/react-dom.js'))
        .pipe(gulp.dest('public/assets/js/src/vendor'));
});

// Copy assets/js/vendor/* to assets/js
gulp.task('copy-js-vendor', function() {
    return gulp
        .src([
            'public/assets/js/src/vendor/react.js',
            'public/assets/js/src/vendor/react-dom.js'
        ])
        .pipe(gulp.dest('assets/js'));
});

// Concatenate jsFiles.vendor and jsFiles.source into one JS file.
// Run copy-react and eslint before concatenating
gulp.task('concat', ['copy-react', 'copy-react-dom', 'eslint'], function() {
    return gulp.src(jsFiles.vendor.concat(jsFiles.source))
        .pipe(sourcemaps.init())
        .pipe(babel({
            only: [
                'public/assets/js/src/components',
            ],
            compact: false
        }))
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('public/assets/js'));
});

// Compile Sass to CSS
gulp.task('sass', function() {
    var autoprefixerOptions = {
        browsers: ['last 2 versions'],
    };

    var filterOptions = '**/*.css';

    var reloadOptions = {
        stream: true,
    };

    var sassOptions = {
        includePaths: [

        ]
    };

    return gulp.src('public/assets/sass/**/*.scss')
        .pipe(plumber(plumberOptions))
        .pipe(sourcemaps.init())
        .pipe(sass(sassOptions))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('public/assets/css'))
        .pipe(filter(filterOptions))
        .pipe(reload(reloadOptions));
});

// Watch JS/JSX and Sass files
gulp.task('watch', function() {
    gulp.watch('public/assets/js/src/**/*.{js,jsx}', ['concat']);
    gulp.watch('public/assets/sass/**/*.scss', ['sass']);
});

// BrowserSync
gulp.task('browsersync', function() {
    browserSync({
        server: {
            baseDir: 'public'
        },
        open: false,
        online: false,
        notify: false,
    });
});

gulp.task('build', ['sass', 'copy-js-vendor', 'concat']);
gulp.task('default', ['build', 'browsersync', 'watch']);