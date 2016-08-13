'use strict';

// Node Modules
const exec = require('child_process').exec;

// Gulp Pluggins
const gulp = require('gulp');
const gutil = require('gulp-util');

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
