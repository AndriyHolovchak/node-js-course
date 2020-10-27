const dbConfig = require('../config/db.config.js');

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
	host: dbConfig.HOST,
	dialect: dbConfig.dialect,
	operatorsAliases: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user.model.js')(sequelize, DataTypes);
db.Event = require('./event.model.js')(sequelize, DataTypes);
db.UserEvent = require('./userevent.model.js')(sequelize, DataTypes);

db.Event.associate(db);

module.exports = db;
