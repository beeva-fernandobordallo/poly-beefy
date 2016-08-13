'use strict';

const mongoose = require('mongoose');

/**
 * Define the user model Schema
 */

const userSchema = mongoose.Schema({

	google: {
		id: String,
		token: String,
		email: String,
		displayName: String,
		fullProfile: Object
	}

});


/**
 * Add methods to the user Schema
 */

// Abstract


/**
 * Create and export the user model
 */

module.exports = mongoose.model('User', userSchema);