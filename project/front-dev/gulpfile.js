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
 * 	deploy-dev 	=>	only sends dev code to serve-public folder
 * 	deploy-pro 	=>	runs 'polymer build' and copies bundled version and assets to the serve
 * 					public folder
 */


/**
 * Deploy-Dev
 */
gulp.task('deploy-dev', ['clear-public'], function(){
	gulp.src([
		'./index.html',
		'./manifest.json',
		'./css/**/*',
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
		'./css/**/*',
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