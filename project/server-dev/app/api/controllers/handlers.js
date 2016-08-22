'use strict';

exports.handleQueryError = (err, res, ep /* endpoint */) => {
	console.log('ERROR LOG:: ' + err);
	const errorObj = {
		query: ep,
		error: err
	};
	res.status(500).end(JSON.stringify(errorObj));
};

exports.handleQueryResult = (result, res) => {
	let responseObj = {
		data: null,
		meta: Date.now()
	};
	if(result && result.length){
		responseObj.data = result;
		res.status(200).end(JSON.stringify(responseObj));
	} else if (result) {
		responseObj.data = [];
		res.status(204).end();
	} else {
		responseObj.message = 'No information found';
		res.status(404).end(JSON.stringify(responseObj));
	}
};

exports.handleMiddlewareQuery = (result, req, next) => {
	req.data = result;
	next();
};

exports.handleCreateAndEdit = (result, res) => {
	let responseObj = {
		data: result,
		meta: Date.now()
	};
	res.status(200).end(JSON.stringify(responseObj));
};

exports.handleDelete = (res) => {
	let responseObj = {
		data: null,
		message: 'Information deleted correctly',
		meta: Date.now()
	};
	res.status(200).end(JSON.stringify(responseObj));
};

exports.handle404 = (res) => {
	let responseObj = {
		data: null,
		message: 'No information found',
		meta: Date.now(),
	};
	res.status(404);
	res.end(JSON.stringify(responseObj));
};