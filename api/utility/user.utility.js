/**
 * @module UserUtility
 * @description Provides utility functions for user validation.
 */

/**
 * Validates the request body for required fields.
 * @param {Object} body - The request body.
 * @param {string[]} requiredFields - The list of required fields.
 * @throws {Error} - Throws an error if any of the required fields are missing.
 */
const validateRequestBody = (body, requiredFields) => {
	for (const field of requiredFields) {
		if (!body?.[field]) {
			throw new Error(`Please provide a ${field}`);
		}
	}
};

/**
 * Validates the user's name.
 * @param {string} name - The name of the user.
 * @throws {Error} - Throws an error if the name is invalid.
 */
const validateName = (name) => {
	if (!name) {
		throw new Error('Name is required');
	}
	if (name.trim().split(' ').length < 2) {
		throw new Error('Invalid name. Please provide your first and last name');
	}
};

/**
 * Validates the user's email.
 * @param {string} email - The email of the user.
 * @throws {Error} - Throws an error if the email is invalid.
 */
const validateEmail = (email) => {
	if (!email) {
		throw new Error('Email is required');
	}
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
		throw new Error('Invalid email. Please provide a valid email address');
	}
};

/**
 * Validates the user's password.
 * @param {string} password - The password of the user.
 * @throws {Error} - Throws an error if the password is invalid.
 */
const validatePassword = (password) => {
	if (!password) {
		throw new Error('Password is required');
	}
	if (password.length < 5 || !/\d/.test(password)) {
		throw new Error(
			'Invalid password. Password must be at least 5 characters long and contain at least one number',
		);
	}
};

/**
 * Validates the user's registration data.
 * @param {string} name - The name of the user.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @throws {Error} - Throws an error if any of the registration data is invalid.
 */
const validateUserRegistration = (name, email, password) => {
	validateName(name);
	validateEmail(email);
	validatePassword(password);
};

module.exports = {
	validateRequestBody,
	validateUserRegistration,
	validateName,
	validateEmail,
	validatePassword,
};
