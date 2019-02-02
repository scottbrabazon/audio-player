var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('sass',function(){
  return gulp.src(['scss/style.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass().on('error',sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('css'))
});

gulp.task('watch-sass', function(){
	gulp.watch('scss/*.scss', ['sass']);
});

gulp.task('minify-css', function() {
  return gulp.src('css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('css'))
});