'use strict';

const mongoose = require('mongoose');

/**
 * Define the user model Schema
 */

const courseSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	entity: {
		type: String
	},
	url: {
		type: String
	},
	cost: {
		type: Number,
		required: true
	},
	date: {
		type: Number,
		required: true
	},
	inscription_limit: {
		type: Number,
		required: true // 0 = Sin limite
	},
	created_date: {
		type: Date,
		default: Date.now
	},
	votes: {
		type: Number,
		default: 0
	},
	num_inscriptions: {
		type: Number,
		default: 0
	},
	num_attendees: {
		type: Number,
		default: 0
	}
});


/**
 * Add methods to the course Instance
 */

// Abstract


/**
 * Create and export the course model
 */

module.exports = mongoose.model('Course', courseSchema);