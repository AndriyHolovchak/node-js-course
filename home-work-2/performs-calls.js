const http = require('http');

const { log } = require('../logger');

const COUNT = 100;

const handledRequestsData = {};

const performCalls = (count) => {
	return new Array(count).fill(undefined).map(() => {
		return new Promise((resolve, reject) => {
			http
				.get('http://localhost:8000', (res) => {
					let data = '';
					res.on('data', (chunk) => (data += chunk));
					res.on('end', () => {
						const response = JSON.parse(data);

						const {
							handledRequests: { worker_pid, count },
						} = response;

						handledRequestsData[`worker_${worker_pid}`] = count;
						resolve();
					});
				})
				.on('error', (err) => {
					reject();
					log('Error: ' + err.message);
				});
		});
	});
};

const promises = performCalls(COUNT);

Promise.all(promises).then((data) => {
	log(`Count of handled requests ${JSON.stringify(handledRequestsData)}`);
});
