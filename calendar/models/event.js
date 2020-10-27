'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Event extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Event.belongsTo(models.User, {
				as: 'creator',
				foreignKey: 'creator_id',
			});

			Event.belongsToMany(models.User, {
				as: 'participants',
				through: 'UserEvents',
				foreignKey: 'eventId',
				otherKey: 'userId',
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			});
		}
	}
	Event.init(
		{
			id: {
				allowNull: false,
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			creator_id: DataTypes.INTEGER,
			title: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			location: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			date: {
				type: DataTypes.DATE,
			},
			hour: {
				type: DataTypes.INTEGER,
			},
		},
		{
			sequelize,
			modelName: 'Event',
		},
	);
	return Event;
};
