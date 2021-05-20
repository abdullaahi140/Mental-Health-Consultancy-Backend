/**
 * A module to create a configured Knex object using ./knexfile.js
 * @module database/knex
 * @author Abdullaahi Farah
 * @see database/knexfile.js for database config options
 * @see database/migrations/* for database migration files
 * @see database/seeds/* for database seeds files
 */

const knex = require('knex');
const knexfile = require('./knexfile.js');
require('dotenv').config();

const config = knexfile[process.env.NODE_ENV];
exports.knex = knex(config);
