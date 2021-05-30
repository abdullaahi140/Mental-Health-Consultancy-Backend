/**
 * A module to manipulate data in the users table from the database.
 * @module models/users
 * @author Abdullaahi Farah
 * @see database/* for database management files
 */

const { knex } = require('../database/knex.js');

/**
 * Function that gets user using ID.
 * @param {string} ID - ID of the user
 * @returns {Object} - Object with user's information
 * @throws {KnexError} - Re-raise and sanitise DB errors
 */
exports.getById = async function getById(ID) {
	return knex.from('users').select('*').where({ ID });
};

/**
 * Function that gets user using username.
 * @param {string} username - username of the user
 * @returns {Object} - Object with user's information
 * @throws {KnexError} - Re-raise and sanitise DB errors
 */
exports.getByUsername = async function getByUsername(username) {
	return knex.from('users').select('*').where({ username });
};

/**
 * Function that adds user to the database.
 * @param {Object} user - Object with user's information
 * @returns {Array} - Array with ID's of users added
 * @throws {KnexError} - Re-raise and sanitise DB errors
 */
exports.add = async function add(user) {
	return knex.from('users').insert(user);
};
