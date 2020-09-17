require('dotenv').config();
const express = require('express');
const { v4: uuid } = require('uuid');
//const logger = require('../logger')
const { NODE_ENV } = require('../config');
const InputService = require('./service');
const pdfDocument = require('pdfkit');
const app = express();
const approvalEmail = require('../email');

const inputRouter = express.Router();
const bodyParser = express.json();

const fs = require('fs');

inputRouter
	.route('/')
	// This is a post for the incident
	.post((req, res, next) => {
		const knexInstance = req.app.get('db');
		const newIncident = { ...req.body };

		InputService.addIncident(req.app.get('db'), newIncident)
			.then((incident) => {
				res.status(201).json(incident.id);
			})
			.catch(next);
	});

inputRouter
	.route('/studentcheck/:marss/:student_last_name')
	.get((req, res, next) => {
		const knexInstance = req.app.get('db');
		if (!req.params.marss || !req.params.student_last_name) {
			return res.status(404);
		}
		InputService.getStudentVerification(
			knexInstance,
			req.params.marss,
			req.params.student_last_name
		)
			.then((student) => {
				res.status(200).json('Students Presence Confirmed');
			})
			.catch(next);
	});

inputRouter.route('/staffcheck/:staff_name').get((req, res, next) => {
	const knexInstance = req.app.get('db');
	if (!req.params.staff_name) {
		return res.status(404);
	}
	InputService.getStaffVerification(knexInstance, req.params.staff_name)
		.then((staff) => {
			if (!staff[0]) {
				res.status(404).json('Not a valid Staff member');
			}
			res.status(200).json(staff[0]);
		})
		.catch(next);
});

inputRouter.route('/hold').post((req, res, next) => {
	const knexInstance = req.app.get('db');
	const { hold_type, start_time, stop_time, duration } = req.body;
	const newHold = { hold_type, start_time, stop_time, duration };
	const id = uuid();

	InputService.addHold(knexInstance, newHold)
		.then((hold) => {
			res.status(201).json(hold.id);
		})
		.catch(next);
});

inputRouter.route('/pdf/:id').get((req, res, next) => {
	const knexInstance = req.app.get('db');
	InputService.getById(knexInstance, req.params.id)
		.then((incident) => {
			const doc = new pdfDocument();
			doc.pipe(
				fs.createWriteStream(
					'C:/projects/school-server/IRF/IRF' + req.params.id + '.pdf'
				)
			);
			doc.fontSize(12).text(incident.date, 100, 100);

			doc.pipe(res);
			doc.end();
			approvalEmail(req.params.id).catch(console.error);
			res.status(200);
		})
		.catch(next);
});

module.exports = inputRouter;
