var gulp = require("gulp");
var babel = require("gulp-babel");
var livereload = require('gulp-livereload');

gulp.task('watch', ['javascript'], function () {
    livereload({start: true});
    gulp.watch('./js/**/*.js', ['javascript']);
    gulp.watch('./index.html', ['html']);
});

gulp.task("javascript", function () {
  return gulp.src("./js/*.js")
    .pipe(babel({
        presets: ['es2015', 'stage-2']
    }))
    .pipe(gulp.dest("dist/js"))
    .pipe(livereload());
});

gulp.task('html', function() {
    return gulp.src([
        './index.html'
    ])
    .pipe(livereload());
});