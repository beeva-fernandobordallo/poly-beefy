'use strict';

exports.isAdmin = (req, res, next) => {
	if(req.decoded.role === 'admin' || req.decoded.role === 'webmaster') {
		return next();
	}
	res.status(403).end(JSON.stringify({ message: 'Unauthorized access attempt', meta: Date.now() }));
}

exports.isMaster = (req, res, next) => {
	if(req.decoded.role === 'webmaster') {
		return next();
	}
	res.status(403).end(JSON.stringify({ message: 'Unauthorized access attempt', meta: Date.now() }));
}