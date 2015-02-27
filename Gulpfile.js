"user strict";
var gulp        = require('gulp'),
    bower       = require('gulp-bower'),
    jshint      = require('gulp-jshint'),
    refresh     = require('gulp-livereload'),
    notify      = require('gulp-notify'),
    nodemon     = require('gulp-nodemon'),
    plumber     = require('gulp-plumber'),
    sass        = require('gulp-sass');

    browserify  = require('browserify'),
    source      = require('vinyl-source-stream'),
    watchify    = require('watchify'),
    client      = require('tiny-lr')(),
    lr_port     = 35678,
    watch       = false;


var paths = {

  scripts : {

    lint: ['!client/lib/**/*.js', '!client/ampersand/bundle.js', 'client/**/*.js'],

    browserify : {

      entry: './client/ampersand/app.js',

      build: 'bundle.js',

      dest : './client/ampersand/'
    }
  },

  Views   : ['!client/lib/*.html', 'client/**/*.html', 'client/index.html'],

  styles  : {

    css   : ['!client/lib/**/*.css', 'client/styles/css/*.css', 'client/**/*.css'],

    sass  : ['client/styles/sass/*.scss', 'client/**/*.scss'],

    dest  : 'client/styles/css'
  }
};

var build = ['css', 'lint', 'browserify'];


gulp.task('sass', function () {
  return gulp.src(paths.styles.sass)
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(refresh(client))
    .pipe(notify({message: 'Sass done'}));
});

gulp.task('bowerInstall', function  () {
  bower()
  .pipe();
});

gulp.task('html', function () {
  return gulp.src(paths.views)
    .pipe(plumber())
    .pipe(refresh(client))
    .pipe(notify({message: 'Views refreshed'}));
});

gulp.task('css', function () {
  return gulp.src(paths.styles.css)
    .pipe(plumber())
    .pipe(refresh(client))
    .pipe(notify({message: 'CSS refreshed'}));
});

gulp.task('lint', function () {
  return gulp.src(paths.scripts.lint)
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(refresh(client))
    // .pipe(notify({message: 'Lint done'}));
});

//for the ampersand project
gulp.task('browserify', function () {

  var bundler = watchify(browserify(watchify.args));

  var bundle = function () {

    bundler.transform('jadeify').bundle()
      .pipe(source(paths.scripts.browserify.build))
      .pipe(gulp.dest(paths.scripts.browserify.dest))
      .pipe(notify({message: 'Browserified'}));
  };

  bundler.add(paths.scripts.browserify.entry)
  bundler.on('update', bundle);
  bundler.on('update', function (ids) {console.log(ids);})

  bundle();
})

gulp.task('serve', function () {
  nodemon({script: 'server/server.js', ignore: ['node_modules/**/*.js']})
    .on('restart', function () {
      refresh(client);
    });
});

gulp.task('live', function () {
  client.listen(lr_port, function (err) {
    if (err) {
      return console.error(err);
    }
  });
});

gulp.task('watch', function () {
  gulp.watch(paths.views, ['html']);
  gulp.watch(paths.scripts.lint, ['lint']);
});

gulp.task('build', build);

gulp.task('default', ['build', 'live', 'serve', 'watch']);
