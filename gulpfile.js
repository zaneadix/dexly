var gulp        = require('gulp'),
	browserify  = require('browserify'),
	babelify    = require('babelify'),
	babel       = require('gulp-babel'),
	browserSync = require('browser-sync'),
	concat		= require('gulp-concat'),
	imagemin	= require('gulp-imagemin'),
	nodemon     = require('gulp-nodemon'),
	plumber     = require('gulp-plumber'),
	sass		= require('gulp-sass'),
	shell		= require('gulp-shell'),
	sourceMaps  = require('gulp-sourcemaps'),
	useref		= require('gulp-useref'),
	vinyl       = require('vinyl-source-stream');


var expressServer = 'http://localhost:2000',
	syncPort      = 3000;


/*************
	Paths
*************/
var zrc = {

	node: 'node_modules/**/*.*',

	dev: {
		images   : 'dev/client/images/**/*.*',
		index    : 'dev/client/index.html',
		sass     : 'dev/client/styles/sass/**/*.scss',
		css      : 'dev/client/styles/css/**/*.css',
		cssDest  : 'dev/client/styles/css',
		jsIndex  : 'dev/client/scripts/index.js',
		jsClient : 'dev/client/scripts/**/*.js',
		jsServer : 'dev/server/**/*.js',
		client   : 'dev/client'
	},

	dist: {
		all         : 'dist/**/*.*',
		images      : 'dist/client/images',
		client      : 'dist/client',
		css         : 'dist/client/styles',
		jsClient    : 'dist/client/scripts',
		server      : 'dist/server',
		serverIndex : 'dist/server/index.js'
	}
};


/*************
	Tasks
*************/
gulp.task('client-js', function () {
	
	browserify({ 
		entries: zrc.dev.jsIndex
	})
	.transform(babelify)
	.bundle()
	.pipe(vinyl('bundle.js'))
	.pipe(gulp.dest(zrc.dist.jsClient));
});


gulp.task('server-js', function () {

	gulp.src(zrc.dev.jsServer)
		.pipe(plumber())
		.pipe(sourceMaps.init())
		.pipe(babel())
		.pipe(gulp.dest(zrc.dist.server));
})


gulp.task('sass', function () {

	return gulp.src(zrc.dev.sass)
	    .pipe(plumber())
	    .pipe(sass({ outputStyle: 'expanded' }))
	    .pipe(gulp.dest(zrc.dev.cssDest));
});


gulp.task('css', ['sass'], function () {

	return gulp.src(zrc.dev.css)
	    .pipe(plumber())
	    .pipe(concat('bundle.css'))
	    .pipe(gulp.dest(zrc.dist.css))
});


gulp.task('img', function () {

	gulp.src(zrc.dev.images)
		.pipe(gulp.dest(zrc.dist.images));
})


gulp.task('html', function () {

    var assets = useref.assets();
    
    return gulp.src(zrc.dev.index)
        .pipe(assets)
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest(zrc.dist.client));
});


gulp.task('sync', function () {

	browserSync.init({
    	files    : [zrc.dist.all],
	    proxy    : 'http://localhost:2000',
	    port     : 3000,
	    browser  : ['google-chrome'],
	    logLevel : 'silent'
	});
})


gulp.task('serve', function (callBack) {

	var called = false;

	setTimeout(function () {

		nodemon({
			script: zrc.dist.serverIndex, 
			ignore: [zrc.node]
		})
		.on('start', function onStart() {

			if (!called) {

			  callBack();
			}

			called = true;
		})
		.on('restart', function onRestart() {

			setTimeout(function reload() {

				browserSync.reload({ stream: false });

			}, 500);

		});

	}, 3000)

	
});


gulp.task('watch', function () {

	gulp.watch(zrc.dev.jsClient, ['client-js']);
	gulp.watch(zrc.dev.jsServer, ['server-js']);
	gulp.watch(zrc.dev.sass, ['css']);
	gulp.watch(zrc.dev.index, ['html']);
});


gulp.task('shell', shell.task(['ulimit -n 2048']));

gulp.task('start', ['shell', 'default', 'serve', 'sync', 'watch']);

gulp.task('default', ['server-js', 'client-js', 'css', 'html']);