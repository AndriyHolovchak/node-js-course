'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	User.init(
		{
			id: {
				allowNull: false,
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			email: {
				allowNull: false,
				type: DataTypes.STRING,
				unique: true,
				validate: {
					isEmail: {
						msg: 'Must be a valid email address',
					},
				},
			},
			firstName: {
				type: DataTypes.STRING,
			},
			lastName: {
				type: DataTypes.STRING,
			},
		},
		{
			sequelize,
			modelName: 'User',
		},
	);
	return User;
};
