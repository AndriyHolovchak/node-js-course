module.exports = (app) => {
	const events = require('../controllers/event.controller.js');

	var router = require('express').Router();

	// Create a new events
	router.post('/', events.create);

	// Retrieve all events
	router.get('/', events.findAll);

	// Retrieve a single events with id
	router.get('/:id', events.findOne);

	// Delete a events with id
	router.delete('/:id', events.delete);

	app.use('/api/events', router);
};
