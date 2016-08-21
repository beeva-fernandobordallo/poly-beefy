'use strict';

const User = require('../../models/user');


exports.devUser = function(req, res, next){
	User.findOne({ 'google.id': 'dev_user' }, (err, user) => {
		if (err) {
			return next(err);
		}

		if (!user) {
			let devUser = new User();
			devUser.google.id = 'dev_user';
			devUser.google.displayName = 'Dev User';
			devUser.google.email = 'pfe-user@beeva.com';
			// save our user to the database
			devUser.save((err) => {
				if (err) {
					next(err);
				}
				req.user = devUser;
				next();
			});
		} else {
			req.user = user;
			next();
		}
	});
};


exports.adminUser = function(req, res, next){
	User.findOne({ 'google.id': 'admin_user' }, (err, user) => {
		if (err) {
			return next(err);
		}

		if (!user) {
			let adminUser = new User();
			adminUser.google.id = 'admin_user';
			adminUser.google.displayName = 'Admin User';
			adminUser.google.email = 'pfe-admin@beeva.com';
			adminUser.role = 'admin';
			// save our user to the database
			adminUser.save((err) => {
				if (err) {
					next(err);
				}
				req.user = adminUser;
				next();
			});
		} else {
			req.user = user;
			next();
		}
	});
};


exports.financeUser = function(req, res, next){
	User.findOne({ 'google.id': 'finance_user' }, (err, user) => {
		if (err) {
			return next(err);
		}

		if (!user) {
			let financeUser = new User();
			financeUser.google.id = 'finance_user';
			financeUser.google.displayName = 'Finance User';
			financeUser.google.email = 'pfe-finance@beeva.com';
			financeUser.role = 'financial';
			// save our user to the database
			financeUser.save((err) => {
				if (err) {
					next(err);
				}
				req.user = financeUser;
				next();
			});
		} else {
			req.user = user;
			next();
		}
	});
};


exports.webmasterUser = function(req, res, next){
	User.findOne({ 'google.id': 'master_user' }, (err, user) => {
		if (err) {
			return next(err);
		}

		if (!user) {
			let webmasterUser = new User();
			webmasterUser.google.id = 'master_user';
			webmasterUser.google.displayName = 'Master User';
			webmasterUser.google.email = 'pfe-master@beeva.com';
			webmasterUser.role = 'webmaster';
			// save our user to the database
			webmasterUser.save((err) => {
				if (err) {
					next(err);
				}
				req.user = webmasterUser;
				next();
			});
		} else {
			req.user = user;
			next();
		}
	});
};