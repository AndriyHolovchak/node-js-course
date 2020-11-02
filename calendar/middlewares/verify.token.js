const jwt = require('jsonwebtoken');
const { revokedAccessTokens } = require('../controllers/auth.controller');

module.exports = (req, res, next) => {
	const token = req.headers['authorization'];
	if (token) {
		jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
			if (err || token in revokedAccessTokens) {
				return res
					.status(401)
					.json({ error: true, message: 'Unauthorized access.' });
			}
			next();
		});
	} else {
		return res.status(403).send({
			error: true,
			message: 'No token provided.',
		});
	}
};
