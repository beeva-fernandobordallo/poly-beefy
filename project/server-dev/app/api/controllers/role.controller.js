'use strict';

exports.isAdmin = (req, res, next) => {
	if(req.decoded.role.indexOf('admin') !== -1 || req.decoded.role.indexOf('webmaster') !== -1) {
		return next();
	}
	res.status(403).end(JSON.stringify({ message: 'Unauthorized access attempt', meta: Date.now() }));
}

exports.isMaster = (req, res, next) => {
	if(req.decoded.role.indexOf('webmaster') !== -1) {
		return next();
	}
	res.status(403).end(JSON.stringify({ message: 'Unauthorized access attempt', meta: Date.now() }));
}