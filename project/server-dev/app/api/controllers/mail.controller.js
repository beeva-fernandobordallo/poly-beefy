'use strict';

const Mail = require('../../models/mail');
const handlers = require('./handlers');

exports.listAllMails = (req, res) => {
	const query = Mail.find();
	query.exec((err, mails) => {
		if (err){
			return handlers.handleQueryError(err, res, 'listAllMails');
		}

		handlers.handleQueryResult(mails, res);
	});
};


exports.listMyMail = (req, res) => {
	const query = Mail.find({
		user_id: req.decoded.id
	});
	query.exec((err, mails) => {
		if (err){
			return handlers.handleQueryError(err, res, 'listAllMails');
		}

		handlers.handleQueryResult(mails, res);
	});
};

exports.listPendingMails = (req, res) => {
	const query = Mail.find({
		state: 'enviado'
	});
	query.exec((err, mails) => {
		if (err){
			return handlers.handleQueryError(err, res, 'listAllMails');
		}

		handlers.handleQueryResult(mails, res);
	});
};

exports.createMail = (req, res) => {
	// req.body example:
	// { body: 'Test message sent to the server',
	// type: 'bug' }

	let mail = new Mail();
	mail.user_id = req.decoded.id;
	mail.body = req.body.body;
	mail.type = req.body.type;
	// save mail to the database
	mail.save((err) => {
		if (err) {
			return handlers.handleQueryError(err, res, 'createMail');
		}
		handlers.handleCreateAndEdit(mail, res);
	});
};

exports.findById = (req, res, next) => {
	if (req.body._id) {
		const query = Mail.find({_id: req.body._id});
		query.exec((err, mail) => {
			if (err){
				return handleQueryError(err, res, 'findMailById');
			}

			handlers.handleMiddlewareQuery(mail, req, next);
		})
	} else {
		res.status(400).end(JSON.stringify({message: 'No mail ID sent'}));
	}
};

exports.extendMail = (req, res) => {
	if(req.data && req.data.length) {
		const forbiddenFields = [
			'_id',
			'__v',
			'body',
			'type',
			'user_id',
			'created_date',
			'mod_date'
		];
		let mail = req.data[0];
		for (let entry in req.body) {
			if (forbiddenFields.indexOf(entry) === -1){
				mail[entry] = req.body[entry];
			}
		}
		if(req.body.action === 'admitido'){
			mail.state = 'admitido';
		} else {
			mail.state = 'leido';
		}
		mail.mod_date = Date.now();
		mail.save((err) => {
			if (err) {
				return handlers.handleQueryError(err, res, 'editMail');
			}
			handlers.handleCreateAndEdit(mail, res);
		});
	} else {
		handlers.handle404(res);
	}
};

exports.deleteMail = (req, res) => {
	if (req.data && req.data.length) {
		let mail = req.data[0];
		mail.remove((err) => {
			if (err) {
				return handlers.handleQueryError(err, res, 'deleteMail');
			}
			handlers.handleDelete(res);
		});
	} else {
		handlers.handle404(res);
	}
};