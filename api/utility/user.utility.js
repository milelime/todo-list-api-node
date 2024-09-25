const validateRequestBody = (body, requiredFields) => {
	for (const field of requiredFields) {
		if (!body?.[field]) {
			throw new Error(`Please provide a ${field}`);
		}
	}
};

const validateName = (name) => {
	if (!name) {
		throw new Error('Name is required');
	}
	if (name.trim().split(' ').length < 2) {
		throw new Error('Invalid name. Please provide your first and last name');
	}
};

const validateEmail = (email) => {
	if (!email) {
		throw new Error('Email is required');
	}
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
		throw new Error('Invalid email. Please provide a valid email address');
	}
};

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

const validateUserRegistration = (name, email, password) => {
	validateName(name);
	validateEmail(email);
	validatePassword(password);
};

module.exports = {
	validateUserRegistration,
	validateName,
	validateEmail,
	validatePassword,
};
