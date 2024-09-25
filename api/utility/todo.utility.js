/**
 * @module todoUtility
 * @description Provides utility functions for to-do validation.
 */

/**
 * Validates the request body for required fields.
 * @param {Object} body - The request body.
 * @param {string[]} requiredFields - The list of required fields.
 * @throws {Error} - Throws an error if any of the required fields are missing.
 * @memberof module:todoUtility
 */
const validateCreateRequestBody = (body, requiredFields) => {
	for (const field of requiredFields) {
		if (!body?.[field]) {
			throw new Error(`Please provide a ${field}`);
		}
	}
};

/**
 * validateCreateTodoInput
 * @param {string} title - The title of the to-do item.
 * @param {string} description - The description of the to-do item.
 * @throws {Error} - Throws an error if the title or description is invalid.
 * @memberof module:todoUtility
 */
const validateCreateTodoInput = (title, description) => {
	if (!title) {
		throw new Error('Title is required');
	}
	if (!description) {
		throw new Error('Description is required');
	}
};

module.exports = {
	validateCreateRequestBody,
	validateCreateTodoInput,
};
