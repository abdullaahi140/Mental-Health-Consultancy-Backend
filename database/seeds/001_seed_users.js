/**
 * A module to seed users to the database
 * @module seeds/001_seed_users
 * @author Abdullaahi Farah
 * @see migrations/* for database migration files
 * @see seeds/* for other database seeds files
 */

const hashPassword = require('../../helpers/hashPassword.js');

/**
 * Seeds default users to the database
 * @param {Object} knex - The Knex object with the configuration file applied to it
 * @returns {Promise} - Promise object representing the seeded table
 */
exports.seed = async function seed(knex) {
	const admin = await hashPassword({
		firstName: 'Admin',
		lastName: 'User',
		username: 'admin',
		password: 'admin',
		role: 'admin'
	});

	const staff = await hashPassword({
		firstName: 'Staff',
		lastName: 'User',
		username: 'staff',
		password: 'password',
		role: 'staff'
	});

	const staff2 = await hashPassword({
		firstName: 'Another',
		lastName: 'Staff',
		username: 'staff2',
		password: 'password',
		role: 'staff'
	});

	const user = await hashPassword({
		firstName: 'Example',
		lastName: 'User',
		username: 'user',
		password: 'password',
		role: 'user'
	});

	// Deletes ALL existing entries
	return knex('users').del()
		// Inserts seed entries
		.then(() => knex('users').insert([admin, staff, staff2, user]));
};
