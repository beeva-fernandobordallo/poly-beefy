'use strict';

// Import used modules
const jwt = require('jsonwebtoken');

// Import API route definitions module
const apiRouteDefinitions = require('./api/routes');


// Main route setup function exported
module.exports = function routeSetup(app, passport) {


	// Create routes bound the api router
	apiRouteDefinitions(app, passport);

	app.get('*', (req, res) => {
		var opts = {
			root: './public/',
			headers: {
				'x-timestamp': Date.now(),
				'x-sent': true
			}
		};
		res.sendFile('index.html', opts, (err) => {
			if(err){
				console.log(err);
				res.status(err.status).end();
			} else {
				console.log('index.html served');
			}

		});
	})

};

// General use middleware functions
