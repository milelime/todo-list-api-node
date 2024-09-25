const pool = require('../utility/connection.utility');
const { validateUserRegistration, validateRequestBody } = require('../utility/user.utility');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * The function `registerUser` handles user registration by validating input, hashing the password,
 * inserting user data into a database, generating a JWT token, and sending a response.
 * @param req - The `req` parameter in the `registerUser` function represents the HTTP request object,
 * which contains information about the incoming request from the client, such as request headers,
 * parameters, body, and more. It is typically provided by the Express.js framework when handling HTTP
 * requests.
 * @param res - The `res` parameter in the `registerUser` function is the response object that will be
 * used to send the response back to the client making the request. It is typically an instance of the
 * Express response object in Node.js applications. The response object has methods like `res.status()`
 * to set the
 * @returns The `registerUser` function returns a response with status code 200 and a JSON object
 * containing a message indicating successful user registration and a JWT token. If an error occurs
 * during the registration process, it returns a response with status code 500 and an error message in
 * JSON format.
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