const gulp = require('gulp');
const linter = require('gulp-eslint');
const browserify = require('browserify');
const babelify = require('babelify');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const source = require('vinyl-source-stream');

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

/* Development */
gulp.task('dev:js', ['lint:js'], () => {
    return browserify('./app/src/javascript/main.js', {debug: true})
                .transform(babelify)
                .bundle()
                .pipe(source('bundle.js'))
                .pipe(gulp.dest('./app/dist/javascript/'));
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
               .pipe(gulp.dest('./app/dist/css'));
});

gulp.task('watch:sass', () => gulp.watch('./app/src/scss/**/*.scss', ['dev:sass']));

gulp.task('default', () => {

});
