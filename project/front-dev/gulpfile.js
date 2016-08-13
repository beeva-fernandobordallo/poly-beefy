'use strict';

// Node Modules
const exec = require('child_process').exec;

// Gulp Pluggins
const gulp = require('gulp');
const gutil = require('gulp-util');


/**
 * ----------
 * Main tasks
 * ----------
 *
 * 	dev			=>	send dev code to server-public folder and watches for changes
 * 	deploy-dev 	=>	only sends dev code to serve-public folder
 * 	deploy-pro 	=>	runs 'polymer build' and copies bundled version and assets to the serve
 * 					public folder
 */


/**
 * Dev
 * ---
 *
 * Main development mode task
 */
gulp.task('dev', ['clear-public', 'deploy-dev'], function(){
	var cssWatcher = gulp.watch('./css/*.css', ['css-reload']);
	cssWatcher.on('change', function(event){
		gutil.log('CSS watcher alerted:');
		gutil.log('File ' + event.path + ' was ' + event.type);
		gutil.log('Copy new version');
	});
	gutil.log('CSS Watcher created');

	var jsWatcher = gulp.watch('./js/*.js', ['js-reload']);
	jsWatcher.on('change', function(event){
		gutil.log('JS watcher alerted:');
		gutil.log('File ' + event.path + ' was ' + event.type);
		gutil.log('Copy new version');
	});
	gutil.log('JS Watcher created');

	var imgWatcher = gulp.watch('./img/*.*', ['img-reload']);
	imgWatcher.on('change', function(event){
		gutil.log('IMG watcher alerted:');
		gutil.log('File ' + event.path + ' was ' + event.type);
		gutil.log('Copy new version');
	});
	gutil.log('IMG Watcher created');

	var srcWatcher = gulp.watch('./src/**/*', ['src-reload']);
	srcWatcher.on('change', function(event){
		gutil.log('SRC watcher alerted:');
		gutil.log('File ' + event.path + ' was ' + event.type);
		gutil.log('Copy new version');
	});
	gutil.log('SRC Watcher created');

	var elemWatcher = gulp.watch('./pfe_elements/**/*', ['elem-reload']);
	elemWatcher.on('change', function(event){
		gutil.log('Element watcher alerted:');
		gutil.log('File ' + event.path + ' was ' + event.type);
		gutil.log('Copy new version');
	});
	gutil.log('Element Watcher created');

	
});


/**
 * Deploy-Dev
 */
gulp.task('deploy-dev', ['clear-public'], function(){
	gulp.src([
		'./index.html',
		'./manifest.json',
		'./css/*.css',
		'./js/*.js',
		'./img/*.*',
		'./src/**/*.html',
		'./bower_components/**/*'
	], { base: './'})
	.pipe(gulp.dest('../server-dev/public'));
	gutil.log('Copied all files dev files to public!')
});


/**
 * Deploy-Production
 */
gulp.task('deploy-pro', ['clear-public', 'poly-build'], function(){
	gulp.src([
		'./build/bundled/**/*'
	], { base: './build/bundled'})
	.pipe(gulp.dest('../server-dev/public'));
	gutil.log('Copied bundled webApp version to public!');

	gulp.src([
		'./css/*.css',
		'./js/*.js',
		'./img/*.*'
	], { base: './'})
	.pipe(gulp.dest('../server-dev/public'));
	gutil.log('Copied all file dependecies to public!')
});

/*________________________HELPER TASKS_______________________*/

/**
 * Clear server public folder
 * --------------------------
 *
 * Runs a child process to clean the server-dev public folder
 */

gulp.task('clear-public', function(done){
	const indexClear = exec('cd ../server-dev && rm -rf public && mkdir public');

	indexClear.on('close', (code) => {
		gutil.log('Public folder clear successful');
		done();
	});

	indexClear.on('error', (error) => {
		gutil.log('Public folder clear exited with error');
		done();
	});
});


/**
 * Polymer build task
 * ------------------
 *
 * Runs `polymer build` in a child process
 */
gulp.task('poly-build', function(done) {
	const polyBuild = exec('polymer build');

	polyBuild.on('close', (code) => {
		gutil.log('Polymer build successful');
		done();
	});

	polyBuild.on('error', (error) => {
		gutil.log('Polymer build exited with error');
		done();
	});
});

gulp.task('css-reload', function(done){
	const cssClear = exec('cd ../server-dev/public && rm -rf css/');

	cssClear.on('close', (code) => {
		gutil.log('Css clear successful');
		done();
	});

	cssClear.on('error', (error) => {
		gutil.log('Css clear exited with error');
		done();
	});

	gulp.src([
		'./css/*.css',
		'./js/*.js',
		'./img/*.*'
	], { base: './'})
	.pipe(gulp.dest('../server-dev/public'));
	gutil.log('Copied CSS file dependecies to public!')
});

gulp.task('js-reload', function(done){
	const jsClear = exec('cd ../server-dev/public && rm -rf js/');

	jsClear.on('close', (code) => {
		gutil.log('Js clear successful');
		done();
	});

	jsClear.on('error', (error) => {
		gutil.log('Js clear exited with error');
		done();
	});

	gulp.src([
		'./js/*.js'
	], { base: './'})
	.pipe(gulp.dest('../server-dev/public'));
	gutil.log('Copied JS file dependecies to public!')
});

gulp.task('img-reload', function(done){
	const imgClear = exec('cd ../server-dev/public && rm -rf img/');

	imgClear.on('close', (code) => {
		gutil.log('Img clear successful');
		done();
	});

	imgClear.on('error', (error) => {
		gutil.log('Img clear exited with error');
		done();
	});

	gulp.src([
		'./img/*.*'
	], { base: './'})
	.pipe(gulp.dest('../server-dev/public'));
	gutil.log('Copied image file dependecies to public!')
});

gulp.task('src-reload', function(done){
	const imgClear = exec('cd ../server-dev/public && rm -rf src/');

	imgClear.on('close', (code) => {
		gutil.log('SRC clear successful');
		done();
	});

	imgClear.on('error', (error) => {
		gutil.log('SRC clear exited with error');
		done();
	});

	gulp.src([
		'./src/**/*'
	], { base: './'})
	.pipe(gulp.dest('../server-dev/public'));
	gutil.log('Copied src file dependecies to public!')
});

gulp.task('elem-reload', function(done){
	const imgClear = exec('cd ../server-dev/public && rm -rf pfe_elements/');

	imgClear.on('close', (code) => {
		gutil.log('PFE_ELEMENTS clear successful');
		done();
	});

	imgClear.on('error', (error) => {
		gutil.log('PFE_ELEMENTS clear exited with error');
		done();
	});

	gulp.src([
		'./pfe_elements/**/*'
	], { base: './'})
	.pipe(gulp.dest('../server-dev/public'));
	gutil.log('Copied pfe_elements file dependecies to public!')
});