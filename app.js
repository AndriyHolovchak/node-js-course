const http = require('http');

const { log } = require('./logger');
const { ENV, PORT } = require('./config');

http
	.createServer((req, res) => {
		log('New incoming request');
		res.writeHeader(200, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify({ message: 'Hello world!' }));
	})
	.listen(PORT, () => log(`Listening on port ${PORT}... (${ENV})`));
