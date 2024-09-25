/**
 * @module connectionUtility
 * @description This module provides a connection utility for interacting with a MySQL database.
 * It uses the mysql2 package to create a connection pool and exports the pool for use in other modules.
 */

const mysql = require('mysql2');
require('dotenv').config();

/**
 * The connection pool that will be used to interact with the database.
 * @type {Pool}
 * @memberof module:connectionUtility
 */
const pool = mysql.createPool({
	host: process.env.MYSQL_HOST,
	port: process.env.MYSQL_PORT,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE,
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
});

module.exports = pool.promise();
