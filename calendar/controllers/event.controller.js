const db = require('../models');
const Event = db.Event;
const User = db.User;
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;

const userAttributes = ['id', 'email', 'firstName', 'lastName'];
const creator = { model: User, as: 'creator', attributes: userAttributes };
const participants = {
	model: User,
	as: 'participants',
	attributes: userAttributes,
	through: {
		attributes: [],
	},
};

module.exports.create = async (req, res) => {
	try {
		if (!req.body.title) {
			res.status(400).send({
				message: 'Content can not be empty!',
			});
			return;
		}
		const newEvent = await sequelize.transaction(async (transaction) => {
			const event = await Event.create(
				{
					creator_id: req.body.creator_id,
					title: req.body.title,
					location: req.body.location,
					date: req.body.date,
					hour: req.body.hour,
				},
				{
					transaction,
				},
			);

			const eventParticipants = await User.findAll(
				{
					where: { id: req.body.participantsIds },
				},
				{ transaction },
			);

			await event.addParticipants(eventParticipants, { transaction });

			return event;
		});

		const { id } = newEvent;
		const data = await Event.findByPk(id, {
			attributes: { exclude: ['creator_id'] },
			include: [participants, creator],
		});

		res.status(201).json(data);
	} catch (error) {
		res.status(500).send({
			message: error.message || 'Some error occurred while creating the Event.',
		});
	}
};

module.exports.findAll = async (req, res) => {
	try {
		const { location } = req.query;
		const where = location ? { location: { [Op.like]: location } } : null;
		const events = await Event.findAll({
			where,
			attributes: { exclude: ['creator_id'] },
			include: [creator, participants],
		});
		res.json(events);
	} catch (error) {
		res.status(500).send({
			message: error.message || 'Some error occurred while getting the Events.',
		});
	}
};

module.exports.findOne = async (req, res) => {
	try {
		const { id } = req.params;

		const event = await Event.findByPk(id, {
			attributes: { exclude: ['creator_id'] },
			include: [creator, participants],
		});
		if (!event) {
			return res.sendStatus(404);
		}
		res.json(event);
	} catch (error) {
		res.status(500).send({
			message: error.message || 'Some error occurred while getting the Event.',
		});
	}
};

module.exports.delete = async (req, res) => {
	try {
		const { id } = req.params;
		await Event.destroy({
			where: { id: id },
		});
		res.sendStatus(204);
	} catch (error) {
		res.status(500).send({
			message: error.message || 'Some error occurred while getting the Event.',
		});
	}
};
