/**
 * A module to defines routes for the authentication in the API.
 * @module routes/authenticate
 * @author Abdullaahi Farah
 * @see routes/* for other routes in the API
 */

const Router = require('koa-router');
const { auth } = require('../controllers/auth.js');

/**
 * Route to authenticate a user using Basic Authentication or JWTs
 * @param {Object} ctx - The Koa request/response context object
 */
async function login(ctx) {
	if (ctx.state.user) {
		ctx.body = ctx.state.user;
	}
}

// Adding URI prefix
const router = new Router({ prefix: '/api/v1/auth' });

// Authentication for internal accounts
router.post('/login', auth, login);

module.exports = router;
