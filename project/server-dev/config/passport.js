'use strict';

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const jwt = require('jsonwebtoken');

const User = require('../app/models/user');

const configAuth = require('./auth');


module.exports = (passport, app) => {

	/**
	 * ----------------- GOOGLE STRATEGY ------------------
	 */
	passport.use(new GoogleStrategy({
			clientID: configAuth.googleAuth.clientID,
			clientSecret: configAuth.googleAuth.clientSecret,
			callbackURL: configAuth.googleAuth.callbackURL,
			passReqToCallback: true
		},
		(req, token, refreshToken, profile, done) => {

			console.log('USER LOGGED IN WITH GOOGLE ACCOUNT');

			console.log('Token: ' + token);
			console.log('Refresh Token: ' + refreshToken);
			console.log('Profile:');
			console.log(profile);

			// User.findOne won't fire until we have all our data back from Google
			process.nextTick(function() {

				var beevaRegex = new RegExp("@beeva.com")
				if(!profile.emails[0].value || !beevaRegex.test(profile.emails[0].value)){
					return done(null, {error: true});
				}

				// try to find the user based on their google id
				User.findOne({ 'google.id': profile.id }, function(err, user) {
					if (err) {
						return done(err);
					}

					if (!user) {

						let newUser = new User();

						newUser.google.id = profile.id;
						newUser.google.token = token;
						newUser.google.displayName = profile.displayName;
						newUser.google.email = profile.emails[0].value; // pull the first email
						newUser.google.fullProfile = profile._json;
						// save our user to the database
						newUser.save((err) => {
							if (err) {
								console.error(err);
								done(err);
							}

							// User has been found and correctly authenticated
							// We give him a token
							const encryptData = {
								id: newUser._id,
								googleId: newUser.google.id,
								displayName: newUser.google.displayName
							};
							const token = jwt.sign(encryptData, app.get('secret'), { expiresIn: 200 });
							req.token = token;

							// if successful, return the new user
							return done(null, newUser);
						});
					} else {
						// User has been found and correctly authenticated
						// We give him a token
						const encryptData = {
							id: user._id,
							googleId: user.google.id,
							displayName: user.google.displayName
						};
						const token = jwt.sign(encryptData, app.get('secret'), { expiresIn: 7200000 }); // 2 hours expiration
						req.token = token;
						return done(null, user);
					}
				});

			});

		}));

};
