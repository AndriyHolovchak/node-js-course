const { log } = require('../logger');

Promise.resolve().then(() => log('promise 1 resolved'));
Promise.resolve().then(() => log('promise 2 resolved'));
Promise.resolve().then(() => {
	log('promise 3 resolved');
	process.nextTick(() => log('next tick inside promise'));
});

Promise.resolve().then(() => log('promise 4 resolved'));
Promise.resolve().then(() => log('promise 5 resolved'));

setImmediate(() => log('set immediate 1'));
setImmediate(() => log('set immediate 2'));

process.nextTick(() => log('next tick 1'));
process.nextTick(() => log('next tick 2'));
process.nextTick(() => log('next tick 3'));

setTimeout(() => log('set timeout'));
setImmediate(() => log('set immediate 3'));
setImmediate(() => log('set immediate 4'));
