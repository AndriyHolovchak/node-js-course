const { Worker, isMainThread, workerData } = require('worker_threads');
const { log } = require('../logger');

const fibonacci = (n) => {
	let a = 1;
	let b = 1;
	for (let i = 3; i <= n; i++) {
		let c = a + b;
		a = b;
		b = c;
	}
	return b;
};

if (isMainThread) {
	new Worker(__filename, { workerData: 8 });
	new Worker(__filename, { workerData: 13 });
	new Worker(__filename, { workerData: 21 });
} else {
	log(`fib(${workerData}) = ${fibonacci(workerData)}`);
}
