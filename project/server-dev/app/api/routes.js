'use strict';

// Import used modules
const express = require('express');
const jwt = require('jsonwebtoken');

// Main route setup function exported
module.exports = function apiRouteSetup(app, passport) {

	const apiRoutes = express.Router();
	/**
	 * API Base route
	 */
	apiRoutes.get('/', (req, res) => {
		res.end('Awesome API ready to Rock & Roll!');
	});

	/**
	 * Google Auth Routes
	 */
	apiRoutes.get('/auth/google',
		passport.authenticate(
			'google', {
				scope: ['profile', 'email'],
				accessType: 'offline'
			}
		)
	);

	apiRoutes.get('/auth/google/callback',
		passport.authenticate('google', { session: false, failureRedirect: '/api/auth/failure' }),
		(req, res) => {
			var state;
			if (req.user.error) {
				res.render('after-auth', {
					state: 'failure',
					token: null,
					userData: null,
					message: 'You are not a Beeva employee'
				});
			} else {
				const googleUsr = req.user.google;
				const userData = {
					id: req.user._id,
					displayName: googleUsr.displayName,
					email: googleUsr.email,
					gender: googleUsr.fullProfile.gender,
					lang: googleUsr.fullProfile.language,
					img: googleUsr.fullProfile.image.url,
					plusUser: googleUsr.fullProfile.isPlusUser,
					personalUrl: googleUsr.fullProfile.url,
					role: req.user.role
				};
				res.render('after-auth', {
					state: 'success',
					token: req.token,
					userData,
					message: 'Authentication correct'
				});
			}
		}
	);

	apiRoutes.get('/auth/failure', function(req, res) {
		res.render('after-auth', { state: 'failure', user: null, token: null, message: 'Error in Google Auth process' });
	});

	/**
	 * Authentication middleware (AWESOMEEE!!)
	 */
	apiRoutes.use((req, res, next) => {
		const token = req.body.token || req.query.token || req.headers['x-access-token'];

		// if token found, decode it
		if (token) {
			jwt.verify(token, app.get('secret'), (err, decodedToken) => {
				if (err) {
					const wrongTokenAnswer = {
						success: false,
						message: 'Bad token!'
					};
					return res.end(JSON.stringify(wrongTokenAnswer));
				} else {
					req.decoded = decodedToken;
					next();
				}
			})
		} else {
			const noTokenAnswer = {
				success: false,
				message: 'No token provided'
			};
			return res.status(403).end(JSON.stringify(noTokenAnswer));
		}
	});

	// ====================================================================
	// ====================================================================
	/*

	                      _
	                     : \
	                     ;\ \_                   _
	                     ;@: ~:              _,-;@)
	                     ;@: ;~:          _,' _,'@;
	                     ;@;  ;~;      ,-'  _,@@@,'
	                    |@(     ;      ) ,-'@@@-;
	                    ;@;   |~~(   _/ /@@@@@@/
	                    \@\   ; _/ _/ /@@@@@@;~
	                     \@\   /  / ,'@@@,-'~
	                       \\  (  ) :@@(~
	                    ___ )-'~~~~`--/ ___
	                   (   `--_    _,--'   )
	                  (~`- ___ \  / ___ -'~)
	                 __~\_(   \_~~_/   )_/~__
	 /\ /\ /\     ,-'~~~~~`-._ 0\/0 _,-'~~~~~`-.
	| |:  ::|    ;     ______ `----'  ______    :
	| `'  `'|    ;    {      \   ~   /      }   |
	 \_   _/     `-._      ,-,' ~~  `.-.      _,'        |\
	   \ /_          `----' ,'       `, `----'           : \
	   |_( )                `-._/#\_,-'                  :  )
	 ,-'  ~)           _,--./  (###)__                   :  :
	 (~~~~_)          /       ; `-'   `--,               |  ;
	 (~~~' )         ;       /@@@@@@.    `.              | /
	 `.HH~;        ,-'  ,-   |@@@ @@@@.   `.             .')
	  `HH `.      ,'   /     |@@@@@ @@@@.  `.           / /(~)
	   HH   \_   ,'  _/`.    |@@@@@ @@@@@;  `.          ; (~~)
	   ~~`.   \_,'  /   ;   .@@@@@ @@@@@@;\_  \___      ; H~\)
	       \_     _/    `.  |@@@@@@ @@@@@;  \     `----'_HH[~)
	         \___/       `. :@@@@@ @@@@@@'   \__,------' HH ~
	        ______        ; |@@@@@@ @@@'                 HH
	      _)      \_,     ; :@@@@@@@@@;                  ~~
	    _;          \\   ,' |@@@@@@@@@:
	  ,'     ; :      \_,   :@@@@@@@@@@.
	  `.__,-'~~`._,-.  ,    :@@@@@@@@@@`.
	                 \/    /@@@@@@@@@@@@:
	                 /    ,@@@@@@@@@@@@@@.
	                |    ,@@@@@@@@@@@@@@@:
	                |    :@@@@@@@@@@@@@@@'
	                `.   \@@@@/  `@@@@@/(
	                  )   ~~~/    \~~~~  \
	                  :     /       \_    \
	                  (    /          \_   `.
	                  /   ;             \_  `.
	                 /   /                \  `.
	                /   /                  `.  \
	              ,'  ,'/~~)                ;  /
	              {   `'   (               /  /
	              `.___,-'  \             /  /
	                 __/     |           /  /
	                /        |           : :   __
	                :        |           ; : _;  )__
	                (  |  |  /          /  `,'  ~   )_
	                 `-:__;-'          :  ,'      ~~  ;
	                                  /          (_,--'
	                                 (       ,-'~~
	                                  \__,-'~

	 */
	// ====================================================================
	// ====================================================================

	/**
	 * Protected Routes
	 */
	apiRoutes.get('/getProfileData', (req, res) => {
		res.end(JSON.stringify(req.decoded));
	});

	app.use('/api', apiRoutes);

};
