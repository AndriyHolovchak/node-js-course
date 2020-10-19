const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const stream = require('stream');
const fs = require('fs');
const { AsyncLocalStorage } = require('async_hooks');
const { v4: uuidv4 } = require('uuid');
const { createLogger, transports, format } = require('winston');

const {
	getEventsJson,
	addNewEvent,
	updateEvent,
	convertCSVToJSON,
} = require('./utils');

const fileName = 'events.csv';

const asyncLocalStorage = new AsyncLocalStorage();

const { combine, timestamp, json } = format;

const logger = createLogger({
	format: combine(timestamp(), json()),
	transports: [
		new transports.Console(),
		new transports.File({ filename: 'errors.log', level: 'error' }),
		new transports.File({ filename: 'combined.log' }),
	],
	rejectionHandlers: [new transports.File({ filename: 'rejections.log' })],
});

const log = (message) => {
	const req = asyncLocalStorage.getStore();

	logger.info({
		message,
		requestId: req?.id,
		hostname: req?.hostname,
		url: req?.url,
	});
};

const logError = (message) => {
	const req = asyncLocalStorage.getStore();

	logger.error({
		message,
		requestId: req?.id,
		hostname: req?.hostname,
		url: req?.url,
	});
};

app.use(bodyParser.json());

app.get('/events', async (req, res, next) => {
	const location = req.query.location;

	req.id = uuidv4();

	asyncLocalStorage.run(req, async () => {
		log('Start processing');

		try {
			const events = await getEventsJson(fileName);

			if (location) {
				return res.json(
					events.filter(
						({ location: eventLocation }) =>
							eventLocation.toLowerCase() === location.toLowerCase(),
					),
				);
			}

			res.json(events);
		} catch (error) {
			logError(error);
			res.sendStatus(400);
		}
	});
});

app.get('/events/:eventId', async (req, res) => {
	req.id = uuidv4();

	asyncLocalStorage.run(req, async () => {
		const eventId = req.params.eventId;
		log('Start processing');

		try {
			const events = await getEventsJson(fileName);
			const [event] = events.filter(({ id }) => id.toString() === eventId);

			if (!event) {
				logError('event not found');
				return res.sendStatus(404);
			}

			res.json(event);
		} catch (error) {
			logError(error);
			res.sendStatus(404);
		}
	});
});

app.post('/events', async (req, res, next) => {
	const { id, title, location, date, hour } = req.body;
	try {
		const events = await getEventsJson(fileName);
		const [event] = events.filter(
			({ id: eventId }) => id.toString() === eventId,
		);

		if (!id || event) {
			return res.status(400).send('The event already exist or missing id');
		}

		const newEvent = { id, title, location, date, hour };
		await addNewEvent(fileName, events, newEvent);
		res.json(newEvent);
	} catch (error) {
		logError(error);
		res.sendStatus(400);
	}
});

app.put('/events/:eventId', async (req, res) => {
	const eventId = req.params.eventId;

	try {
		const events = await getEventsJson(fileName);
		const eventIndex = events.findIndex(({ id }) => id.toString() === eventId);

		if (eventIndex < 0) {
			return res.sendStatus(404);
		}

		const { title, location, date, hour } = req.body;
		const event = { title, location, date, hour };

		await updateEvent(fileName, eventId, events, event);
		res.json(event);
	} catch (error) {
		logError(error);
		res.sendStatus(400);
	}
});

app.get('/events-batch', async (req, res) => {
	const transformerToJSONStream = new stream.Transform({
		transform(chunk, encoding, callback) {
			const newChunk = convertCSVToJSON(chunk.toString());
			callback(null, JSON.stringify(newChunk));
		},
	});

	const fileStream = fs.createReadStream(fileName);
	fileStream.pipe(transformerToJSONStream).pipe(res);
});

app.listen(3000, () => {
	log('server start at port 3000');
});

process
	.on('unhandledRejection', () => {
		logError('Unhandled Rejection at Promise');
	})
	.on('uncaughtException', () => {
		logError('Uncaught Exception thrown');
	});
