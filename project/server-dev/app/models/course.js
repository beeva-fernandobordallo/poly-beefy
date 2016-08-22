'use strict';

const mongoose = require('mongoose');

/**
 * Define the user model Schema
 */

const courseSchema = mongoose.Schema({
	name: {
		type: String,
		required: 'Course name is required'
	},
	description: {
		type: String,
		required: 'Course description is required'
	},
	entity: {
		type: String
	},
	url: {
		type: String
	},
	cost: {
		type: Number,
		required: 'Course cost is required'
	},
	date: {
		type: Number,
		required: 'Course date is required'
	},
	inscription_limit: {
		type: Number,
		required: 'Course inscription limit is required' // 0 = Sin limite
	},
	created_date: {
		type: Date,
		default: Date.now
	},
	updated_date: {
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