const jwt = require('jsonwebtoken');

// TODO - use db
const tokenList = {};
const revokedAccessTokens = {};

module.exports.revokedAccessTokens = revokedAccessTokens;

module.exports.login = (req, res) => {
	const body = req.body;
	const user = {
		email: body?.email,
		name: body?.name,
	};
	const token = jwt.sign(user, process.env.TOKEN_SECRET, {
		expiresIn: process.env.TOKEN_LIFE,
	});
	const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: process.env.REFRESH_TOKEN_LIFE,
	});

	const response = {
		access_token: token,
		refresh_token: refreshToken,
	};
	tokenList[refreshToken] = response;

	res.status(200).json(response);
};

module.exports.refreshTokens = (req, res) => {
	const body = req.body;
	const refreshToken = req.headers['authorization'];

	if (refreshToken && refreshToken in tokenList) {
		const user = {
			email: body?.email,
			name: body?.name,
		};
		const token = jwt.sign(user, process.env.TOKEN_SECRET, {
			expiresIn: process.env.TOKEN_LIFE,
		});

		const newRefreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
			expiresIn: process.env.REFRESH_TOKEN_LIFE,
		});

		const response = {
			access_token: token,
			refresh_token: newRefreshToken,
		};

		const revokedToken = tokenList[refreshToken].access_token;

		revokedAccessTokens[revokedToken] = 'revoked';

		delete tokenList[refreshToken];

		tokenList[newRefreshToken] = response;

		res.status(200).json(response);
	} else {
		res.status(404).send('Invalid request');
	}
};

module.exports.checkAccess = (req, res) => {
	res.status(200).json({ message: 'Access granted' });
};
