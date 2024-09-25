/**
 * @module appRouter
 * @description This module sets up the main routing for the application using Express.js.
 * It defines the base API path and includes specific route handlers for different parts of the application.
 */

const router = require('express').Router();
const API_PATH = '/api';

/**
 * Base API Route
 * @name /api/
 * @description This route handles all requests to the base API path. The specific routes and logic are defined in the ./api module.
 * @memberof module:appRouter
 */
router.use(API_PATH + '/', require('./api'));

/**
 * User API Route
 * @name /api/user
 * @description This route handles all requests to the /api/user path. The specific routes and logic are defined in the ./user.router module.
 */
router.use(API_PATH + '/user', require('./user.router'));

/**
 * To-Do API Route
 * @name /api/todo
 * @description This route handles all requests to the /api/todos path. The specific routes and logic are defined in the ./todo.router module.
 */
router.use(API_PATH + '/todos', require('./todo.router'));

module.exports = router;
