'use strict';

const mongoose = require('mongoose');

/**
 * Define the user model Schema
 */

const mailSchema = mongoose.Schema({
	user_id: {
		type: mongoose.Schema.Types.ObjectId
	},
	body: {
		type: String
	},
	mod_date: {
		type: Number
	},
	created_date: {
		type: Date,
		default: Date.now
	},
	comments: {
		type: String
	},
	state: {
		type: String,
		default: 'enviado' // enviado - leido - admitido (caso de sugerencias)
	},
	type: {
		type: String // sugerencia - feedback - mensaje interno - bug
	}
});


/**
 * Add methods to the mail Instance
 */

// Abstract


/**
 * Create and export the mail model
 */

module.exports = mongoose.model('Mail', mailSchema);