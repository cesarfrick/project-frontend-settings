const gulp = require('gulp');
const babel = require('gulp-babel');
const linter = require('gulp-eslint');
const browserify = require('browserify');
const sourcemaps =  require('gulp-sourcemaps');

gulp.task('lint:js', () => {
    return gulp.src(['src/javascript/**/*.js', '!node_modules/**'])
               .pipe(linter())
               .pipe(linter.format())
               .pipe(linter.failAfterError());
});

gulp.task('babel', ['lint:js'], () => {
    return gulp.src(['src/javascript/**/*.js', '!node_modules/**'])
               .pipe(babel())
               .pipe(gulp.dest('dist/javascript'));
});

gulp.task('default', () => {

});
