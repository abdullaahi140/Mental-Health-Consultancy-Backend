/**
 * A module to defines routes for appointments in the API.
 * @module routes/appointments
 * @author Abdullaahi Farah
 * @see routes/* for other routes in the API
 */

const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const model = require('../models/appointments.js');
const { auth } = require('../controllers/auth.js');

/**
 * Route that adds an appointment to the database
 * @param {Object} ctx - The Koa request/response context object
 */
async function createAppt(ctx) {
	try {
		const appt = {
			userID: ctx.state.user.ID,
			...ctx.request.body
		};
		await model.addAppt(appt);
		ctx.body = { created: true };
		ctx.status = 201;
	} catch (err) {
		ctx.body = { created: false };
		ctx.status = 404;
	}
}

/**
 * Route that gets all appointments for a date from the database
 * @param {Object} ctx - The Koa request/response context object
 */
async function getByDate(ctx) {
	const { date } = ctx.params;
	ctx.body = await model.getByDate(date);
	ctx.status = 200;
}

/**
 * Route that gets all appointments for a staff at a date from the database
 * @param {Object} ctx - The Koa request/response context object
 */
async function getByDateAndStaff(ctx) {
	const { date, staffID } = ctx.params;
	ctx.body = await model.getByDateAndStaff(date, staffID);
	ctx.status = 200;
}

// Adding URI prefix
const router = Router({ prefix: '/api/v1/appt' });

router.post('/', bodyParser(), auth, createAppt);
router.get('/:date', auth, getByDate);
router.get('/:staffID([0-9]{1,})/:date', auth, getByDateAndStaff);

module.exports = router;
