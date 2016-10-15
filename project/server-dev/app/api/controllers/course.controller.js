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
	const query = Course.find({
		$or: [ { date: { $gt: Date.now() } }, { date: {$lt: 10 } } ],
		state: 'active'});
	query.exec((err, courses) => {
		if (err){
			return handleQueryError(err, res, 'listActiveCourses');
		}

		handlers.handleQueryResult(courses, res);
	});
};


exports.listOldCourses = (req, res) => {
	const query = Course.find({
		$and: [ { date: { $lt: Date.now() } }, { date: {$gt: 10 } } ],
		state: 'active'});
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
	// entity: 'boom',
	// url: 'http://www.boom.com',
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
	// save course to the database
	course.save((err) => {
		if (err) {
			return handlers.handleQueryError(err, res, 'createCourse');
		}
		handlers.handleCreateAndEdit(course, res);
	});
};


exports.editCourse = (req, res) => {
	if(req.data && req.data.length) {
		const forbiddenFields = [
			'_id',
			'__v',
			'num_attendees',
			'num_inscriptions',
			'votes',
			'created_date',
			'updated_date'
		];
		let course = req.data[0];
		for (let entry in req.body) {
			if (forbiddenFields.indexOf(entry) === -1){
				course[entry] = req.body[entry];
			}
		}
		course.updated_date = Date.now();
		course.save((err) => {
			if (err) {
				return handlers.handleQueryError(err, res, 'editCourse');
			}
			handlers.handleCreateAndEdit(course, res);
		});
	} else {
		handlers.handle404(res);
	}
};


exports.deleteCourse = (req, res) => {
	if (req.data && req.data.length) {
		let course = req.data[0];
		if(course.state !== 'draft'){
			res.status(403).end(JSON.stringify({message: 'You can not delete an active / blocked course.'}));
			return;
		}
		course.remove((err) => {
			if (err) {
				return handlers.handleQueryError(err, res, 'deleteCourse');
			}
			handlers.handleDelete(res);
		});
	} else {
		handlers.handle404(res);
	}
};


exports.activateCourse = (req, res) => {
	if(req.data && req.data.length) {
		let course = req.data[0];
		course.state = 'active';
		course.save((err) => {
			if (err) {
				return handlers.handleQueryError(err, res, 'activateCourse');
			}
			handlers.handleCreateAndEdit(course, res);
		});
	} else {
		handlers.handle404(res);
	}
};

exports.blockCourse = (req, res) => {
	if(req.data && req.data.length) {
		let course = req.data[0];
		course.state = 'blocked';
		course.save((err) => {
			if (err) {
				return handlers.handleQueryError(err, res, 'blockCourse');
			}
			handlers.handleCreateAndEdit(course, res);
		});
	} else {
		handlers.handle404(res);
	}
};


exports.findById = (req, res, next) => {
	if (req.body._id) {
		const query = Course.find({_id: req.body._id});
		query.exec((err, course) => {
			if (err){
				return handleQueryError(err, res, 'findCourseById');
			}

			handlers.handleMiddlewareQuery(course, req, next);
		})
	} else {
		res.status(400).end(JSON.stringify({message: 'No course ID sent'}));
	}
};