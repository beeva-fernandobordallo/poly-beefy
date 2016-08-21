'use strict';

exports.isAdmin = (req, res, next) => {
	if(req.decoded.role === 'admin') {
		return next();
	}
	res.status(403).end(JSON.stringify({ message: 'Unauthorized access attempt', meta: Date.now() }));
}