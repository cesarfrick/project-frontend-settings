const gulp = require('gulp');
const linter = require('gulp-eslint');
const browserify = require('browserify');
const babelify = require('babelify');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const source = require('vinyl-source-stream');
const browserSync = require('browser-sync').create();

/**
 * Javascript Tasks *
 */
/* General */
gulp.task('lint:js', () => {
    return gulp.src(['app/src/javascript/**/*.js', '!node_modules/**'])
               .pipe(linter())
               .pipe(linter.format())
               .pipe(linter.failAfterError());
});

gulp.task('server', () => {
    browserSync.init({
        server: {
            baseDir: './app'
        }
    });

    gulp.watch('./app/**/*.html').on('change', browserSync.reload);
});

/* Development */
gulp.task('dev:js', ['lint:js'], () => {
    return browserify('./app/src/javascript/main.js', {debug: true})
                .transform(babelify)
                .bundle()
                .pipe(source('bundle.js'))
                .pipe(gulp.dest('./app/dist/javascript/'))
                .pipe(browserSync.stream());
});

gulp.task('watch:js', ['lint:js'], () => {
    return gulp.watch('./app/src/javascript/**/*.js', ['dev:js']);
});

/* Production */

/**
 * CSS Tasks *
 */

gulp.task('dev:sass', () => {
    return gulp.src('./app/src/scss/main.scss')
               .pipe(sourcemaps.init())
               .pipe(sass.sync().on('error', sass.logError))
               .pipe(autoprefixer({browsers: ['last 2 versions', 'ie >= 9']}))
               .pipe(sourcemaps.write())
               .pipe(gulp.dest('./app/dist/css'))
               .pipe(browserSync.stream());
});

gulp.task('watch:sass', () => gulp.watch('./app/src/scss/**/*.scss', ['dev:sass']));

gulp.task('default', () => {

});

gulp.task('dev', ['watch:sass', 'watch:js', 'server']);
