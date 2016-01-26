const gulp = require('gulp');
const linter = require('gulp-eslint');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
//const sourcemaps =  require('gulp-sourcemaps');

gulp.task('lint:js', () => {
    return gulp.src(['app/src/javascript/**/*.js', '!node_modules/**'])
               .pipe(linter())
               .pipe(linter.format())
               .pipe(linter.failAfterError());
});

gulp.task('build:dev', ['lint:js'], () => {
    return browserify('./app/src/javascript/main.js', {debug: true})
                .transform(babelify)
                .bundle()
                .pipe(source('bundle.js'))
                .pipe(gulp.dest('./app/dist/javascript/'));
});

gulp.task('watch:js', ['lint:js'], () => {
    return gulp.watch('./app/src/javascript/**/*.js', ['build:dev']);
});

gulp.task('default', () => {

});
