const http = require('http');
const url = require('url');

const { log } = require('../logger');
const { createEvent } = require('./parse-body');

http
	.createServer((req, res) => {
		res.writeHeader(200, { 'Content-Type': 'application/json' });

		const method = req.method;
		const current_url = url.parse(req.url, true);
		const pathname = current_url.pathname;
		const query = current_url.query;

		if (method === 'GET' && pathname === '/events' && !query.location) {
			// GET request to /events
			const message = 'Hello from GET events';
			res.end(JSON.stringify({ message }));
		} else if (method === 'GET' && pathname === '/events' && query.location) {
			// GET request to /events?location=lviv
			const message = `Hello from GET /events?location=${query.location}`;
			res.end(JSON.stringify({ message }));
		} else if (method === 'POST' && pathname === '/events') {
			createEvent(req, res);
		} else {
			res.statusCode = 404;
			res.end(JSON.stringify('wrong endpoint'));
		}
	})
	.listen(3000, () => log('Listening on port 3000...'));
