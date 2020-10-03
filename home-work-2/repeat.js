const { log } = require('../logger');

const repeat = (num) => {
	for (let i = 0; i < num; i++) {
		for (let j = 0; j < num; j++) {
			log(`${i}.${j}`);
		}
	}
};

module.exports.repeat = repeat;
