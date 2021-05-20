/**
 * A module to authenicate users in routes of the API.
 * @module controllers/auth
 * @author Abdullaahi Farah
 * @see strategies/* for Passport.js strategies
 */

const passport = require('koa-passport');
const basic = require('../strategies/basic.js');

passport.use(basic);

// Export auth for all routes
exports.auth = passport.authenticate(['basic'], { session: false });
