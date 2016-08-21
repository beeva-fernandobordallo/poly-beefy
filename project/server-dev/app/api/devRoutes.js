'use strict';

// Import used modules
const express = require('express');
const jwt = require('jsonwebtoken');
const userDevCtrl = require('./devControllers/user.controller');

// Main route setup function exported
module.exports = function devApiRoutesetup(app) {

	const devApiRoutes = express.Router();

	/**
	 * Request USER ROLE TOKEN
	 */
	devApiRoutes.get('/user-token', userDevCtrl.devUser, (req, res) => {
		if(req.user){
			const encryptData = {
				id: req.user._id,
				googleId: req.user.google.id,
				displayName: req.user.google.displayName,
				role: req.user.role
			};
			const token = jwt.sign(encryptData, app.get('secret'), { expiresIn: 120 }); // in seconds (2 minutes)
			const responseObj = {
				token
			};
			res.end(JSON.stringify(responseObj));
		} else {
			res.status(500).end(JSON.stringify({msg: 'No dev user created. Server error'}));
		}
	});

	/**
	 * Request USER ROLE TOKEN
	 */
	devApiRoutes.get('/admin-token', userDevCtrl.adminUser, (req, res) => {
		if(req.user){
			const encryptData = {
				id: req.user._id,
				googleId: req.user.google.id,
				displayName: req.user.google.displayName,
				role: req.user.role
			};
			const token = jwt.sign(encryptData, app.get('secret'), { expiresIn: 120 }); // in seconds (2 minutes)
			const responseObj = {
				token
			};
			res.end(JSON.stringify(responseObj));
		} else {
			res.status(500).end(JSON.stringify({msg: 'No dev user created. Server error'}));
		}
	});

	/**
	 * Request USER ROLE TOKEN
	 */
	devApiRoutes.get('/financial-token', userDevCtrl.financeUser, (req, res) => {
		if(req.user){
			const encryptData = {
				id: req.user._id,
				googleId: req.user.google.id,
				displayName: req.user.google.displayName,
				role: req.user.role
			};
			const token = jwt.sign(encryptData, app.get('secret'), { expiresIn: 120 }); // in seconds (2 minutes)
			const responseObj = {
				token
			};
			res.end(JSON.stringify(responseObj));
		} else {
			res.status(500).end(JSON.stringify({msg: 'No dev user created. Server error'}));
		}
	});

	/**
	 * Request USER ROLE TOKEN
	 */
	devApiRoutes.get('/master-token', userDevCtrl.webmasterUser, (req, res) => {
		if(req.user){
			const encryptData = {
				id: req.user._id,
				googleId: req.user.google.id,
				displayName: req.user.google.displayName,
				role: req.user.role
			};
			const token = jwt.sign(encryptData, app.get('secret'), { expiresIn: 120 }); // in seconds (2 minutes)
			const responseObj = {
				token
			};
			res.end(JSON.stringify(responseObj));
		} else {
			res.status(500).end(JSON.stringify({msg: 'No dev user created. Server error'}));
		}
	});

	app.use('/dev-api', devApiRoutes);

};
