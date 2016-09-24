'use strict';
const jwt = require('jsonwebtoken');
const config = require('../../../config/server');

exports.returnWithToken = (req, res) => {
	if(req.user){
		const encryptData = {
			id: req.user._id,
			googleId: req.user.google.id,
			displayName: req.user.google.displayName,
			role: req.user.role
		};
		const token = jwt.sign(encryptData, config.serverSecret, { expiresIn: 1200 }); // in seconds (20 minutes)
		const responseObj = {
			token
		};
		res.end(JSON.stringify(responseObj));
	} else {
		res.status(500).end(JSON.stringify({msg: 'No dev user created. Server error'}));
	}
};