/**
 * @module todoController
 * @description Handles todo-related operations such as creating, updating, and deleting todos.
 */

const pool = require('../utility/connection.utility');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { validateCreateRequestBody, validateCreateTodoInput } = require('../utility/todo.utility');

/**
 * The function `createTodo` handles creating a new to-do item by validating input, inserting the data into the database, and sending a response.
 * @param {Object} req - The HTTP request object, containing information about the incoming request.
 * @param {Object} req.body - The body of the request, containing to-do item data.
 * @param {string} req.body.title - The title of the to-do item.
 * @param {string} req.body.description - The description of the to-do item.
 * @param {Object} req.headers - The headers of the request, containing the JWT token for authentication.
 * @param {string} req.headers.authorization - The JWT token for authentication.
 * @param {Object} res - The HTTP response object, used to send the response back to the client.
 * @returns {Promise<void>} - A promise that resolves to sending a response to the client.
 * @throws {Error} - Throws an error if validation fails or if there is an issue with database interaction.
 * @memberof module:todoController
 */
const createTodo = async (req, res) => {
	try {
		// Validate request body
		const requiredFields = ['title', 'description'];
		validateCreateRequestBody(req.body, requiredFields);

		// Extract the required fields from the request body
		const { title, description } = req.body;

		// Validate the to-do item input
		validateCreateTodoInput(title, description);

		// Extract the JWT token from the headers
		const token = req.headers.authorization;

		// Verify the JWT token
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		console.log(decoded);

		// Insert a new to-do item
		const SQL = `
            INSERT INTO todo (title, description, user_id, create_time)
            VALUES (?, ?, ?, date_format(now(), '%Y-%m-%d %H:%i:%s'))
        `;

		// Execute the query
		const [results] = await pool.query(SQL, [title, description, decoded.id]);

		// Send the response
		return res.status(200).json({ message: 'To-do item created successfully' });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: error.message });
	}
};

module.exports = {
	createTodo,
};
