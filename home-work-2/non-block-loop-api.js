const http = require('http');
const cp = require('child_process');
const { log } = require('../logger');

const PORT = 3000;

const n = cp.fork(`${__dirname}/sub-repeat.js`);

http
	.createServer((req, res) => {
		log('New incoming request');
		res.writeHeader(200, { 'Content-Type': 'application/json' });
		n.send({ num: 10000 });
		res.end(JSON.stringify({ message: 'Hello world!' }));
	})
	.listen(PORT, () => log(`Listening on port ${PORT}`));
