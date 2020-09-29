const args = process.argv.slice(2);
const data = {};

args.forEach((item) => {
	const [key, value] = item.split('=');
	data[key.slice(1)] = value;
});

const { env } = data;

module.exports.ENV = env;
module.exports.PORT = +process.env.PORT;
