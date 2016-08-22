'use strict';

// Import used modules
const jwt = require('jsonwebtoken');

// Import API route definitions module
const apiRouteDefinitions = require('./api/routes');
const devApiRouteDefinitions = require('./api/devRoutes');


// Main route setup function exported
module.exports = function routeSetup(app, passport) {


	// Create routes bound the api router
	apiRouteDefinitions(app, passport);

	// If in DEVELOPMENT MODE include dev-api router endpoints
	if(process.env.NODE_ENV === 'dev'){
		devApiRouteDefinitions(app);
	}

	app.get('*', (req, res) => {
		var opts = {
			root: './public/',
			headers: {
				'x-timestamp': Date.now(),
				'x-sent': true
			}
		};
		if(process.env.NODE_ENV === 'dev'){
			opts.root = './../front-dev/'
		}
		res.sendFile('index.html', opts, (err) => {
			if(err){
				console.log(err);
				res.status(err.status).end();
			} else {
				console.log('LOG:: index.html served');
			}

		});
	})

};

// General use middleware functions
