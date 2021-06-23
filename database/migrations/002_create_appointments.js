/**
 * A module to create and delete data from the appointments table in the database
 * @module migrations/002_create_appointments
 * @author Abdullaahi Farah
 * @see migrations/* for other database migration files
 * @see seeds/* for database seeds files
 */

/**
 * Creates appointments table to the database
 * @param {Object} knex - The Knex object with the configuration file applied to it
 * @returns {Promise} - Promise object representing the new table
 */
exports.up = function up(knex) {
	return knex.schema.createTable('appointment', (table) => {
		table.increments('ID').unique();
		table.integer('userID').unsigned();
		table.integer('staffID').unsigned();
		table.date('date');
		table.time('startTime');
		table.time('endTime');
		table.datetime('dateCreated').defaultTo(knex.fn.now());
		table.foreign('userID').references('users.ID').onDelete('CASCADE');
		table.foreign('staffID').references('users.ID').onDelete('CASCADE');
	});
};

/**
 * Deletes appointments table from the database
 * @param {Object} knex - The Knex object with the configuration file applied to it
 * @returns {Promise} - Promise object representing the deleted table
 */
exports.down = function down(knex) {
	return knex.schema.dropTableIfExists('appointment');
};
