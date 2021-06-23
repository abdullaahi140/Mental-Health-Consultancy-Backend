/**
 * A module to manipulate data in the appointments table from the database.
 * @module models/appointments
 * @author Abdullaahi Farah
 * @see database/* for database management files
 */

const { knex } = require('../database/knex.js');

/**
 * Get all appointments by date.
 * @param {String} date - The date of the appointment
 * @returns All appointments for that date
 */
exports.getByDate = async function getByDate(date) {
	return knex.from('appointment').select('*').where({ date });
};

/**
 * Get all appointments by date for a staff member.
 * @param {String} date - The date of the appointment
 * @param {Integer} staffID - The staff's user ID number
 * @returns All appointments for that date
 */

exports.getByDateAndStaff = async function getByDateAndStaff(date, staffID) {
	return knex.from('appointment')
		.select('users.firstName', 'users.lastName', 'appointment.*')
		.leftJoin('users', 'users.ID', 'appointment.userID')
		.where({ date, staffID });
};

/**
 * Add an appointment to the database.
 * @param {Object} appt - Object with details pertaining to an appointment
 * @returns The ID of the appointment added to the database
 */
exports.addAppt = async function addAppt(appt) {
	return knex.from('appointment').insert(appt);
};
