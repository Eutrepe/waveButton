var gulp = require('gulp');
var jade = require('gulp-jade');
var webpack = require('gulp-webpack');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();

var stylus  = require('gulp-stylus');
var postCSS = require('gulp-postcss');
var cssnano = require('cssnano');
var mqpacker = require('css-mqpacker');

gulp.task('browser-sync', function () {
  return browserSync.init({
    server: {
      baseDir: './'
    },
    ghostMode: false
  });
});


gulp.task('js', function () {
  return gulp.src('./source/js/app.js')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/'))
});

gulp.task('css', function () {
  var processors = [
    mqpacker(),
    cssnano(),
  ];
  return gulp.src([
    './source/stylus/style.styl',
    './source/stylus/waveButton.styl'
  ])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(postCSS(processors))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.stream());
});

gulp.task('jade', function () {
  return gulp.src('./source/jade/*.jade')
    .pipe(plumber())
    .pipe(jade())
    .pipe(gulp.dest('./'))
    .pipe( browserSync.stream() );
});

gulp.task('watch', function () {
  gulp.watch('./source/**/*.js', ['js'])
  gulp.watch('./source/**/*.styl', ['css'])
  gulp.watch('./source/**/*.jade', ['jade'])
  gulp.watch('./dist/app.min.js', browserSync.reload);
});

gulp.task('default', ['browser-sync', 'watch']);
