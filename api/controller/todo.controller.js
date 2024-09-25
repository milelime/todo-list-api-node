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

		// Insert a new to-do item
		const SQL = `
            INSERT INTO todo (title, description, user_id, create_time)
            VALUES (?, ?, ?, date_format(now(), '%Y-%m-%d %H:%i:%s'))
        `;

		// Execute the query
		const [results] = await pool.query(SQL, [title, description, decoded.id]);

		// Send the response
		return res.status(200).json({ id: results.insertId, title, description });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: error.message });
	}
};

/**
 * The function `updateTodo` handles updating an existing to-do item by validating input, updating the data in the database, and sending a response.
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
const updateTodo = async (req, res) => {
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

		// Extract the to-do item ID from the request parameters
		const { id } = req.params;

		// Check if the user has permission to update the to-do item
		const [todo] = await pool.query('SELECT * FROM todo WHERE id = ?', [id]);

		if (todo.length === 0) {
			return res.status(404).json({ error: 'To-Do item not found' });
		}

		if (todo[0].user_id !== decoded.id) {
			return res.status(403).json({ message: 'Forbidden' });
		}

		// Update the to-do item
		const SQL = `
			UPDATE todo
			SET title = ?, description = ?
			WHERE id = ?
		`;

		// Execute the query
		await pool.query(SQL, [title, description, id]);

		// Send the response
		return res.status(200).json({ id, title, description });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: error.message });
	}
};

/**
 * The function `deleteTodo` handles deleting an existing to-do item by deleting the data from the database and sending a response.
 * @param {Object} req - The HTTP request object, containing information about the incoming request.
 * @param {Object} req.headers - The headers of the request, containing the JWT token for authentication.
 * @param {string} req.headers.authorization - The JWT token for authentication.
 * @param {Object} res - The HTTP response object, used to send the response back to the client.
 * @returns {Promise<void>} - A promise that resolves to sending a response to the client.
 * @throws {Error} - Throws an error if there is an issue with database interaction.
 * @memberof module:todoController
 */
const deleteTodo = async (req, res) => {
	try {
		// Extract the JWT token from the headers
		const token = req.headers.authorization;

		// Verify the JWT token
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		// Extract the to-do item ID from the request parameters
		const { id } = req.params;

		// Check if the user has permission to delete the to-do item
		const [todo] = await pool.query('SELECT * FROM todo WHERE id = ?', [id]);

		if (todo.length === 0) {
			return res.status(404).json({ error: 'To-Do item not found' });
		}

		if (todo[0].user_id !== decoded.id) {
			return res.status(403).json({ message: 'Forbidden' });
		}

		// Delete the to-do item
		const SQL = 'DELETE FROM todo WHERE id = ?';

		// Execute the query
		await pool.query(SQL, [id]);

		// Send the response
		return res.status(204).send();
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: error.message });
	}
};

/**
 * Get To-Do Items

Get the list of to-do items using the following request:

GET /todos?page=1&limit=10

User must be authenticated to access the tasks and the response should be paginated. Respond with the list of to-do items along with the pagination details.

{
  "data": [
    {
      "id": 1,
      "title": "Buy groceries",
      "description": "Buy milk, eggs, bread"
    },
    {
      "id": 2,
      "title": "Pay bills",
      "description": "Pay electricity and water bills"
    }
  ],
  "page": 1,
  "limit": 10,
  "total": 2
}
 */

/**
 * The function `getTodos` handles retrieving a list of to-do items from the database and sending a response.
 * @param {Object} req - The HTTP request object, containing information about the incoming request.
 * @param {Object} req.query - The query parameters of the request, containing pagination details.
 * @param {number} req.query.page - The page number for pagination.
 * @param {number} req.query.limit - The limit of items per page for pagination.
 * @param {Object} req.headers - The headers of the request, containing the JWT token for authentication.
 * @param {string} req.headers.authorization - The JWT token for authentication.
 * @param {Object} res - The HTTP response object, used to send the response back to the client.
 * @returns {Promise<void>} - A promise that resolves to sending a response to the client.
 * @throws {Error} - Throws an error if there is an issue with database interaction.
 * @memberof module:todoController
 */
const getTodos = async (req, res) => {
	try {
		// Extract the JWT token from the headers
		const token = req.headers.authorization;

		// Verify the JWT token
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		// Extract the pagination parameters from the query
		const { page = 1, limit = 10 } = req.query;

		// Calculate the offset based on the page and limit
		const offset = (page - 1) * limit;

		// Get the total count of to-do items
		const [total] = await pool.query('SELECT COUNT(*) AS total FROM todo WHERE user_id = ?', [decoded.id]);

		// Get the list of to-do items
		const SQL = `
            SELECT id, title, description
            FROM todo
            WHERE user_id = ?
            LIMIT ?
            OFFSET ?
        `;

		// Execute the query
		const [todos] = await pool.query(SQL, [decoded.id, parseInt(limit), parseInt(offset)]);

		// Send the response
		return res.status(200).json({ data: todos, page, limit, total: total[0].total });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: error.message });
	}
};

module.exports = {
	createTodo,
	updateTodo,
	deleteTodo,
	getTodos,
};
