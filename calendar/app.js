const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const db = require('./models');

app.use(bodyParser.json());

db.sequelize.sync();

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/event.routes')(app);

app.listen(3000, () => {
	console.log('server start at port 3000');
});

process.on('unhandledRejection', (reason) => {
	console.log(`Unhandled Rejection at Promise: ${reason}`);
});
process.on('uncaughtException', (err) => {
	console.log(`Uncaught Exception thrown: ${err.stack}`);
	process.exit(1);
});
