const gulp = require('gulp');
const babel = require('gulp-babel');
const linter = require('gulp-eslint');


gulp.task('default', () => {
    return gulp.src('src/bundle.js')
               .pipe(babel())
               .pipe(gulp.dest('dist'));
});

gulp.task('lint-js', () => {
    return gulp.src(['src/javascript/**/*.js', '!node_modules/**'])
               .pipe(linter())
               .pipe(linter.format());
});
