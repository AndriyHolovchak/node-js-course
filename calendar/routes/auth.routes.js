module.exports = (app) => {
	const auth = require('../controllers/auth.controller.js');

	var router = require('express').Router();

	router.post('/login', auth.login);
	router.post('/refresh_tokens', auth.refreshTokens);

	app.use('/', router);

	router.use(require('../middlewares/verify.token'));
	router.get('/check_access', auth.checkAccess);
};
