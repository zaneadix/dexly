var gulp 		= require('gulp'),
	browserify 	= require('browserify'),
	babelify	= require('babelify'),
	babel 		= require('gulp-babel'),
	sourceMaps	= require('gulp-sourcemaps'),
	liveReload 	= require('gulp-livereload'),
	vinyl		= require('vinyl-source-stream');


/*************
	Paths
*************/
var zrc = {

	dev: {
		index: 'dev/client/index.html',
		jsIndex: 'dev/client/scripts/index.js',
		jsClient: 'dev/client/scripts/**/*.js',
		jsServer: 'dev/server/**/*.js',
	},

	dist: {
		index: 'dist/client',
		jsClient: 'dist/client/scripts',
		server: 'dist/server'
	}
};


/*************
	Tasks
*************/
gulp.task('client-js', function () {
	
	browserify({
		entries: zrc.dev.jsIndex,
		debug: true
	})
	.transform(babelify)
	.bundle()
	.pipe(vinyl('bundle.js'))
	.pipe(gulp.dest(zrc.dist.jsClient))
});

gulp.task('server-js', function () {

	gulp.src(zrc.dev.jsServer)
		.pipe(sourceMaps.init())
		.pipe(babel())
		.pipe(gulp.dest(zrc.dist.server))
})

gulp.task('html', function () {
	
	gulp.src(zrc.dev.index)
		.pipe(gulp.dest(zrc.dist.index))
});


gulp.task('live-reload', function () {

});


gulp.task('start', ['default', 'live-reload']);


gulp.task('default', ['server-js', 'client-js', 'html']);