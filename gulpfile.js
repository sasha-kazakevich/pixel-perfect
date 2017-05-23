var gulp = require('gulp'),
    log = require('gulp-util').log,
    jade = require('gulp-jade'),
    stylus = require('gulp-stylus'),
    rename = require('gulp-rename'),
    rupture = require('rupture'),
    autoprefixer = require('autoprefixer-stylus'),
    connect = require('gulp-connect');

var config = {
  watch: './src/**/*.*',
  server: {
    port: '8000',
    path: './dist'
  },
  html: {
    src: './src/templates/index.jade',
    destination: 'dist/'
  },
  css: {
    src: './src/styles/style.styl',
    destination: 'dist/css'
  },
  reloadcss: {
    src: './src/styles/**/.styl',
  },
  js: {
    src: './src/js/**',
    destination: 'dist/js'
  },
  fonts: {
    src: './src/fonts/**',
    destination: 'dist/fonts'
  },
  img: {
    src: './src/img/**',
    destination: 'dist/img'
  }
};

gulp.task("connect",function(){
  connect.server({
    port:config.server.port,
    livereload:true,
    root:config.server.path});
});

gulp.task('templates', function () {
  gulp.src(config.html.src)
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest(config.html.destination))
    .pipe(connect.reload());
});

gulp.task('styles', function () {
  gulp.src(config.css.src)
    .pipe(stylus({
      include: ['./node_modules/normalize-styl/','./src/styles/site'],
      'include css': true,
      use: [autoprefixer("iOS >=7","last 1 Chrome version")]
    }))
    .pipe(stylus({
      use: [rupture()]
    }))
    .pipe(rename('main.css'))
    .pipe(gulp.dest(config.css.destination))
    .pipe(connect.reload());
});

gulp.task('reloadcss', function() {
    gulp.src(config.reloadcss.src)
        .pipe(connect.reload())
})

gulp.task('scripts', function () {
  gulp.src(config.js.src)
    .pipe(gulp.dest(config.js.destination))
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  log('Watching file');
  gulp.watch(config.watch, ['build']);
});

gulp.task('fonts', function() {
  gulp.src(config.fonts.src)
    .pipe(gulp.dest(config.fonts.destination))
});

gulp.task('img', function() {
  gulp.src(config.img.src)
    .pipe(gulp.dest(config.img.destination))
});

gulp.task('build', ['templates','styles','scripts','fonts','img','reloadcss']);
gulp.task('default',['build','connect','watch']);
