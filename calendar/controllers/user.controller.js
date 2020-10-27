const db = require('../models');
const User = db.User;

// Create and Save a new User
exports.create = async (req, res) => {
	// Validate request
	if (!req.body.email) {
		res.status(400).send({
			message: 'Content can not be empty!',
		});
		return;
	}

	// Create a User
	const user = {
		email: req.body.email,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
	};

	// Save User in the database
	try {
		const data = await User.create(user);
		res.send(data);
	} catch (err) {
		res.status(500).send({
			message: err.message || 'Some error occurred while creating the User.',
		});
	}
};

// Retrieve all Users from the database.
exports.findAll = async (req, res) => {
	try {
		const data = await User.findAll();
		res.send(data);
	} catch (err) {
		res.status(500).send({
			message: err.message || 'Some error occurred while retrieving users.',
		});
	}
};

// Find a single User with an id
exports.findOne = async (req, res) => {
	const id = req.params.id;

	try {
		const data = await User.findByPk(id);
		if (!data) {
			res.status(404).send({
				message: 'User not found',
			});
		} else {
			res.send(data);
		}
	} catch (error) {
		res.status(500).send({
			message: 'Error retrieving User with id=' + id,
		});
	}
};

// Update a User by the id
exports.update = async (req, res) => {
	const id = req.params.id;

	try {
		const num = await User.update(req.body, {
			where: { id: id },
		});

		if (num == 1) {
			res.send({
				message: 'User was updated successfully.',
			});
		} else {
			res.send({
				message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
			});
		}
	} catch (err) {
		res.status(500).send({
			message: `Error updating User with id = ${id}`,
			data: err.errors,
		});
	}
};

// Delete a User with the specified id
exports.delete = async (req, res) => {
	const id = req.params.id;

	try {
		const num = await User.destroy({
			where: { id: id },
		});
		if (num == 1) {
			res.send({
				message: 'User was deleted successfully!',
			});
		} else {
			res.send({
				message: `Cannot delete User with id=${id}. Maybe User was not found!`,
			});
		}
	} catch (error) {
		res.status(500).send({
			message: 'Could not delete User with id=' + id,
		});
	}
};
