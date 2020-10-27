module.exports = (sequelize, DataTypes) => {
	const Event = sequelize.define('event', {
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
	});

	Event.associate = (models) => {
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
	};

	return Event;
};
