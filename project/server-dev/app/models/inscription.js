'use strict';

const mongoose = require('mongoose');

/**
 * Define the user model Schema
 */

const inscriptionSchema = mongoose.Schema({
	student_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	course_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	state: {
		type: String,
		default: 'inscrito'
	},
	entry_date: {
		type: Date,
		default: Date.now
	},
	confirmation_date: {
		type: Date
	},
	cancel_date: {
		type: Date
	},
	cancel_user_id: {
		type: Schema.Types.ObjectId
	},
	comments: {
		type: String
	},
	payed_by_student: {
		type: Boolean,
		default: false
	},
	payed: {
		type: Boolean,
		default: false
	}
});


/**
 * Add methods to the inscription Instance
 */

// Abstract


/**
 * Create and export the inscription model
 */

module.exports = mongoose.model('Inscription', inscriptionSchema);