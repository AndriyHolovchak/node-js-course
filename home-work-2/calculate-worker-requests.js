const cluster = require('cluster');
const http = require('http');

const { log } = require('../logger');

const COUNT_OF_WORKERS = 6;

if (cluster.isMaster) {
	log(`Master ${process.pid} is running`);
	for (let index = 0; index < COUNT_OF_WORKERS; index++) {
		cluster.fork();
	}

	cluster.on('exit', () => {
		log(`worker ${worker.process.pid} died`);
	});
} else {
	let countHandledRequests = 0;

	http
		.createServer((req, res) => {
			res.writeHead(200);
			countHandledRequests += 1;
			res.end(
				JSON.stringify({
					messsage: `hello world\nFrom ${process.pid}\n`,
					handledRequests: {
						worker_pid: process.pid,
						count: countHandledRequests,
					},
				}),
			);
		})
		.listen(8000);
	log(`Worker ${process.pid} started`);
}
