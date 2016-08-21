'use strict';

const Course = require('../../models/course');
const handlers = require('./handlers');

exports.listAllCourses = (req, res) => {
	const query = Course.find();
	query.exec((err, courses) => {
		if (err){
			return handlers.handleQueryError(err, res, 'listAllCourses');
		}

		handlers.handleQueryResult(courses, res);
	});
};


exports.listActiveCourses = (req, res) => {
	const query = Course.find({ date: { $gt: Date.now() }});
	query.exec((err, courses) => {
		if (err){
			return handleQueryError(err, res, 'listActiveCourses');
		}

		handlers.handleQueryResult(courses, res);
	});
};


exports.listOldCourses = (req, res) => {
	const query = Course.find({ date: { $lt: Date.now() }});
	query.exec((err, courses) => {
		if (err){
			return handleQueryError(err, res, 'listOldCourses');
		}

		handlers.handleQueryResult(courses, res);
	});
};


exports.createCourse = (req, res) => {
	// req.body example:
	// { name: 'Test Course',
	// description: 'This course will be focused on teaching software developers good practices and cleanCode standards',
	// entity: 'Beeva',
	// url: 'http://www.beeva.com',
	// cost: '200',
	// date: '1471893529251',
	// inscription_limit: '30' }
	
	let course = new Course();
	course.name = req.body.name;
	course.description = req.body.description;
	course.entity = req.body.entity || 'Unknown';
	course.url = req.body.url || 'Unknown';
	course.cost = req.body.cost;
	course.date = req.body.date;
	course.inscription_limit = req.body.inscription_limit;
	// save our user to the database
	course.save((err) => {
		if (err) {
			return handlers.handleQueryError(err, res, 'createCourse');
		}
		handlers.createHandler(course, res);
	});
};