'use strict';

exports.handleQueryError = (err, res, ep /* end Point*/) => {
	console.err('Error: ' + err);
	res.status(500).end(JSON.stringify({query: ep, error: err}));
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

exports.createHandler = (result, res) => {
	let responseObj = {
		data: result,
		meta: Date.now()
	};
	res.status(200).end(JSON.stringify(responseObj));
};