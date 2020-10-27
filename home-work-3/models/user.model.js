module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define('user', {
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
	});

	return User;
};
