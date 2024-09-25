const router = require('express').Router();
const path = require('path');

/**
 * API routes.
 * @module apiRouter
 * @description This module provides routes for the base API path.
 * It includes a route to get the API status.
 */

/**
 * Route to get API status.
 * @name GET /
 * @function
 * @memberof module:apiRouter
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
router.get('/', (req, res) => {
	try {
		res.send({ message: 'API' });
	} catch (err) {
		console.error(err);
		res.status(500).send({ message: 'Server Error' });
	}
});

module.exports = router;
