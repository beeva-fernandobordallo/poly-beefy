'use strict';

// Import used modules
const express = require('express');
const userDevCtrl = require('./devControllers/user.controller');
const generalDevCtrl = require('./devControllers/general.controller')

// Main route setup function exported
module.exports = function devApiRoutesetup(app) {

	const devApiRoutes = express.Router();

	/**
	 * Request TOKENs
	 */
	// User
	devApiRoutes.get('/user-token', userDevCtrl.devUser, generalDevCtrl.returnWithToken);
	// Admin
	devApiRoutes.get('/admin-token', userDevCtrl.adminUser, generalDevCtrl.returnWithToken);
	// Financial
	devApiRoutes.get('/financial-token', userDevCtrl.financeUser, generalDevCtrl.returnWithToken);
	// Web Master
	devApiRoutes.get('/master-token', userDevCtrl.webmasterUser, generalDevCtrl.returnWithToken);


	app.use('/dev-api', devApiRoutes);

};
