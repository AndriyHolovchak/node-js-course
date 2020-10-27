const http = require('http');
const { log } = require('../logger');
const { repeat } = require('./repeat');

const PORT = 3000;

http
	.createServer((req, res) => {
		log('New incoming request');
		res.writeHeader(200, { 'Content-Type': 'application/json' });
		repeat(10000);
		res.end(JSON.stringify({ message: 'Hello world!' }));
	})
	.listen(PORT, () => log(`Listening on port ${PORT}`));
