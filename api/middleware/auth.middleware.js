const jwt = require('jsonwebtoken');

/**
 * Middleware to verify JWT token.
 * @module authMiddleware
 * @description This middleware verifies the JWT token and attaches the decoded user information to the request object.
 * If the token is invalid or missing, it sends a 401 Unauthorized response.
 */

/**
 * Verify JWT token.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} - 401 Unauthorized response if token is invalid or missing
 */
const verifyToken = (req, res, next) => {
	const token = req.headers['authorization'];

	if (!token) {
		return res.status(401).json({ error: 'No token provided' });
	}

	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) {
			return res.status(401).json({ error: 'Unauthorized' });
		}

		// Attach the decoded user information to the request object
		req.user = decoded;
		next();
	});
};

module.exports = verifyToken;
