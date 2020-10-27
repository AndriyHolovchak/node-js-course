'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Events', {
			id: {
				allowNull: false,
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			creator_id: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: 'Users',
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			},
			title: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			location: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			date: {
				type: Sequelize.DATE,
			},
			hour: {
				type: Sequelize.INTEGER,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('Events');
	},
};
