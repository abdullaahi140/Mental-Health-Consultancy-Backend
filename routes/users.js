/**
 * A module to defines routes for users in the API.
 * @module routes/users
 * @author Abdullaahi Farah
 * @see routes/* for other routes in the API
 */

const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const model = require('../models/users.js');
const hashPassword = require('../helpers/hashPassword.js');
const { auth } = require('../controllers/auth.js');

/**
 * Route that gets a user by their ID from the database
 * @param {Object} ctx - The Koa request/response context object
 */
async function getById(ctx) {
	const { provider } = ctx.state.user;
	const { ID } = ctx.params;
	const user = await model.getById(ID, provider);
	if (user.length) {
		[ctx.body] = user;
	} else {
		ctx.status = 404;
	}
}

/**
 * Route that gets all users from the database
 * @param {Object} ctx - The Koa request/response context object
 */
async function createUser(ctx) {
	const { username, password } = ctx.request.body;
	const body = await hashPassword(ctx.request.body);
	body.role = !body.role && 'user';

	try {
		const result = await model.add(body);
		if (result.length) {
			const ID = result[0];
			const link = `${ctx.protocol}://${ctx.request.header.host}${ctx.originalUrl}/${ID}`;
			ctx.body = {
				ID,
				username,
				password,
				role: body.role,
				created: true,
				links: { account: link }
			};
			ctx.status = 201;
		}
	} catch (err) {
		ctx.body = { created: false };
		if (err.code === 'ER_DUP_ENTRY') {
			ctx.body.message = 'Username is already taken';
		}
		ctx.status = 404;
	}
}

// Adding URI prefix
const router = Router({ prefix: '/api/v1/users' });

router.post('/', bodyParser(), createUser);
router.get('/:ID([0-9]{1,})', auth, getById);

module.exports = router;
