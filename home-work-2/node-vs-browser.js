const { log } = require('../logger');

setTimeout(() => log('timeout 1'));
setTimeout(() => {
	log('timeout 2');
	Promise.resolve().then(() => log('promise resolve'));
});
setTimeout(() => log('timeout 3'));
setTimeout(() => log('timeout 4'));

// setImmediate(() => log('immediate 1'));
// setImmediate(() => {
// 	log('immediate 2');
// 	process.nextTick(() => log('nextTick'));
// });
// setImmediate(() => log('immediate 3'));
// setImmediate(() => log('immediate 4'));
