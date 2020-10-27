const { log } = require('../logger');
const { repeat } = require('./repeat');

process.on('message', ({ num }) => {
	log(`ON CHILD MESSAGE num = ${num}`);
	repeat(num);
});
