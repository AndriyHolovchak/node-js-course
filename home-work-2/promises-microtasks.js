const { log } = require('../logger');

setTimeout(() => log('setTimeout'), 0);

process.nextTick(() => log('next tick 1'));

globalThis.queueMicrotask(() => log('queueMicrotask'));

process.nextTick(() => log('next tick 2'));

Promise.resolve().then(() => log('Promise'));

log('simple log');
