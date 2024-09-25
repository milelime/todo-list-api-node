/**
 * @module UserController
 * @description Handles user-related operations such as registration.
 */

const pool = require('../utility/connection.utility');
const { validateUserRegistration, validateRequestBody } = require('../utility/user.utility');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * The function `registerUser` handles user registration by validating input, hashing the password,
 * inserting user data into a database, generating a JWT token, and sending a response.
 * @param {Object} req - The HTTP request object, containing information about the incoming request.
 * @param {Object} req.body - The body of the request, containing user registration data.
 * @param {string} req.body.name - The name of the user.
 * @param {string} req.body.email - The email of the user.
 * @param {string} req.body.password - The password of the user.
 * @param {Object} res - The HTTP response object, used to send the response back to the client.
 * @returns {Promise<void>} - A promise that resolves to sending a response to the client.
 * @throws {Error} - Throws an error if validation fails or if there is an issue with database interaction.
 */
const registerUser = async (req, res) => {
	try {
		// Validate request body
		const requiredFields = ['name', 'email', 'password'];
		validateRequestBody(req.body, requiredFields);

		// Extract the required fields from the request body
		const { name, email, password } = req.body;

		// Validate the user registration input
		validateUserRegistration(name, email, password);

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Register a new user
		const SQL = `
            INSERT INTO user (name, email, password, create_time)
            VALUES (?, ?, ?, date_format(now(), '%Y-%m-%d %H:%i:%s'))
        `;

		// Execute the query
		const [results] = await pool.query(SQL, [name, email, hashedPassword]);

		// Generate a JWT token
		const token = jwt.sign({ name, email }, process.env.JWT_SECRET, { expiresIn: '1h' });

		// Send the response
		return res.status(200).json({ message: 'User registered successfully', token });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: error.message });
	}
};

module.exports = {
	registerUser,
};
