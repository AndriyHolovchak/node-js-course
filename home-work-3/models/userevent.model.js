module.exports = (sequelize, DataTypes) => {
	const UserEvent = sequelize.define('UserEvent', {
		userId: {
			allowNull: false,
			type: DataTypes.INTEGER,
		},
		eventId: {
			allowNull: false,
			type: DataTypes.INTEGER,
		},
	});

	return UserEvent;
};
