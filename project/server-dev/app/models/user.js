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
	},
	courses: {
		type: Array // Should contain ID, Name and Date
	},
	role: {
		type: String,
		default: 'user'
	}
});


/**
 * Add methods to the user Instance
 */

// Abstract


/**
 * Create and export the user model
 */

module.exports = mongoose.model('User', userSchema);