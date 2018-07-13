let gulp = require('gulp'),
  pug = require('gulp-pug'),
  sass = require ('gulp-sass'),
  concat = require ('gulp-concat'),
  cleanCSS = require('gulp-clean-css'),
  autoprefixer = require('gulp-autoprefixer'),
  uglify = require('gulp-uglify'),
  imagemin = require('gulp-imagemin'),
  watch = require('gulp-watch'),
  browserSync = require('browser-sync').create();


// Dev Tasks
gulp.task('pug-dev', () => {
  return gulp.src('index.pug')
    .pipe(pug())
    .pipe(gulp.dest('./'));
});

gulp.task('sass-dev', () => {
  return gulp.src(['assets/sass/*.sass', 'assets/sass/partials/*.sass'])
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('assets/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('js-dev', () => {
  return gulp.src('js/modules/*.js')
    //.pipe(uglify())
    .pipe(concat('index.min.js'))
    .pipe(gulp.dest('js'));
});


// Build Tasks
gulp.task('pug-build', () => {
  return gulp.src('index.pug')
    .pipe(pug())
    .pipe(gulp.dest('./'));
});

gulp.task('sass-build', () => {
  return gulp.src(['assets/sass/*.sass', 'assets/sass/partials/*.sass'])
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('assets/css'));
});

gulp.task('js-build', () => {
  return gulp.src('js/modules/*.js')
    //.pipe(uglify())
    .pipe(concat('index.min.js'))
    .pipe(gulp.dest('js'));
});

gulp.task('image-build', () => {
  return gulp.src('assets/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('assets/img'));
});


// Server Tasks
gulp.task('watch', ['browserSync', 'pug-dev', 'sass-dev', 'js-dev'], () => {

  gulp.watch(['index.pug', 'includes/**/*.pug'], ['pug-dev', browserSync.reload]);
  gulp.watch('assets/sass/**/*.sass', ['sass-dev']);
  gulp.watch('js/modules/*.js', ['js-dev', browserSync.reload]);

});

gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: './'
    },
  });
});


// Main Tasks
gulp.task('default', ['watch'], () => {});
gulp.task('build', ['pug-build', 'sass-build', 'js-build', 'image-build'], () => {});
