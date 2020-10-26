module.exports.createEvent = (req, res) => {
	let body = Buffer.from([]);

	req.on('data', (chunk) => {
		body = Buffer.concat([body, chunk]);
	});

	req.on('end', () => {
		const parsedBody = JSON.parse(body.toString());
		const response = {
			...parsedBody,
			message: 'Hello from POST events',
		};

		res.statusCode = 201;
		res.end(JSON.stringify(response));
	});
};
