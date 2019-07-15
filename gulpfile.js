const { src, dest, watch, task, parallel } = require('gulp');
const uglify = require('gulp-uglify');
const less = require('gulp-less');
const browserSync = require('browser-sync').create();
const typescript = require('gulp-typescript');
const autoprefixer = require('gulp-autoprefixer');

task('scripts', () => {
  return src('src/**/*.ts')
          .pipe(typescript())
          .pipe(dest('output/'))
          .pipe(browserSync.stream());
});

task('less', () => {
  return src('src/**/*.less')
          .pipe(less())
          .pipe(autoprefixer({
            cascade: false
          }))
          .pipe(dest('output/'))
          .pipe(browserSync.stream());
});

task('html', () => {
  return src('src/**/*.html')
          .pipe(dest('output/'))
          .pipe(browserSync.stream());
});

task('watch', () => {
  watch("src/**/*.less", parallel('less'));
  watch("src/**/*.ts", parallel('scripts'));
  watch("src/**/*.html", parallel('html'));
})

task('browser-sync', () => {
  browserSync.init({
    server: './output'
  });
});

exports.default = parallel('less', 'scripts', 'html', 'watch', 'browser-sync');
