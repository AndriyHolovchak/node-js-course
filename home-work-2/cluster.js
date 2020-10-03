const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

const { log } = require('../logger');

if (cluster.isMaster) {
	log(`Master ${process.pid} is running`);
	for (let index = 0; index < numCPUs; index++) {
		cluster.fork();
	}

	cluster.on('exit', () => {
		log(`worker ${worker.process.pid} died`);
	});
} else {
	http
		.createServer((req, res) => {
			res.writeHead(200);
			res.end(`hello world\nFrom ${process.pid}\n`);
		})
		.listen(8000);
	log(`Worker ${process.pid} started`);
}
