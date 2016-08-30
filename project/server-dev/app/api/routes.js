'use strict';

// Import used modules
const express = require('express');
const jwt = require('jsonwebtoken');

const courseCtrl = require('./controllers/course.controller');
const roleCtrl = require('./controllers/role.controller');

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
		res.render('after-auth', { state: 'failure', userData: null, token: null, message: 'Error in Google Auth process' });
	});

	/**
	 * Authentication middleware
	 */
	apiRoutes.use((req, res, next) => {
		const token = req.body.token || req.query.token || req.headers['x-access-token'];

		// if token found, decode it
		if (token) {
			jwt.verify(token, app.get('secret'), (err, decodedToken) => {
				if (err) {
					const wrongTokenAnswer = {
						message: 'Bad token'
					};
					res.status(401);
					return res.end(JSON.stringify(wrongTokenAnswer));
				} else {
					req.decoded = decodedToken;
					next();
				}
			})
		} else {
			const noTokenAnswer = {
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
	// ==========================Protected Routes==========================
	// ====================================================================

	// All routes from here down require a serverSigned token in order to pass our middleware
	// Any authentication levels from here on are checked with the decoded token which has the
	// user's role data encrypted inside it

	/**
	 * Course CRUD Routes
	 */
	// Lists
	apiRoutes.get('/courses', courseCtrl.listAllCourses);
	apiRoutes.get('/courses/active', courseCtrl.listActiveCourses);
	apiRoutes.get('/courses/old', courseCtrl.listOldCourses);

	// Create
	apiRoutes.post('/courses/create', roleCtrl.isAdmin, courseCtrl.createCourse);

	// Update
	apiRoutes.put('/courses/edit', roleCtrl.isAdmin, courseCtrl.findById, courseCtrl.editCourse);

	// Toggle state - Active / Blocked
	apiRoutes.put('/courses/activate', roleCtrl.isAdmin, courseCtrl.findById, courseCtrl.activateCourse);
	apiRoutes.put('/courses/block', roleCtrl.isAdmin, courseCtrl.findById, courseCtrl.blockCourse);

	// Detele
	apiRoutes.delete('/courses/delete', roleCtrl.isAdmin, courseCtrl.findById, courseCtrl.deleteCourse);


	 // Testing route - Send decoded token to user
	 // 
	 // apiRoutes.get('/getDecodedToken', (req, res) => {
	 // 	res.end(JSON.stringify(req.decoded));
	 // });

	/*
	 * Bind routes to base route '/api'
	 */

	app.use('/api', apiRoutes);

};
