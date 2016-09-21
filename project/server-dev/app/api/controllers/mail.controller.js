'use strict';

const Mail = require('../../models/mail');
const handlers = require('./handlers');

exports.listAllMails = (res, req) => {
	const query = Mail.find();
	query.exec((err, mails) => {
		if (err){
			return handlers.handleQueryError(err, res, 'listAllMails');
		}

		handlers.handleQueryResult(mails, res);
	});
};


exports.listMyMail = (res, req) => {
	// TODO
	req.end('GET PENDING MAILS');
};

exports.listPendingMails = (res, req) => {
	// TODO
	req.end('GET PENDING MAILS');
};

exports.createMail = (res, req) => {
	// TODO
	req.end('POSTED AND SAVED A NEW MAIL');
};

exports.findById = (req, res, next) => {
	// FIND EXISTING MAIL AND ADD IT TO THE RESPONSE OBJECT
	res.newMail = {found: true};
	next();
};

exports.extendMail = (res, req) => {
	// TODO
	req.end('EXTENDED EXISITING MAIL INFO WITH A RESPONSE OR READ STATUS');
};

exports.deleteMail = (res, req) => {
	// TODO
	req.end('DELETE EXISITING MAIL ENTRY');
};