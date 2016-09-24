'use strict';

// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const passport = require('passport');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// Import my configuration objects
const serverConf = require('./config/server');
const databaseConf = require('./config/database');
const passportConf = require('./config/passport');

// Create express server instance
const app = express();

// Application configuration
app.set('secret', serverConf.serverSecret);

// Connect to Database
if(process.env.NODE_ENV === 'dev'){
	mongoose.connect(databaseConf.devUrl);
} else {
	mongoose.connect(databaseConf.url);
}

const serverPort = process.env.PORT || 3000;

// Setup general use middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.urlencoded({ extended: false }));

// Configure Passport
passportConf(passport, app);
app.use(passport.initialize());

// Setup static file access
if(process.env.NODE_ENV === 'dev'){
	console.log('App Started in DEVELOPMENT MODE');
	app.use(express.static(path.join(__dirname, '../front-dev')));
} else {
	app.use(express.static(path.join(__dirname, 'public')));
}

app.set('views', __dirname + '/app/views');
app.set('view engine', 'ejs');

// Setup App Routing
require('./app/routes')(app, passport);

// Start server
app.listen(serverPort, (err) => {
	if (err) throw err;

	console.log(`Server setup and listening on port ${serverPort} ...`);
});