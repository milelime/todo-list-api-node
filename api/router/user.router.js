/**
 * @module userRouter
 * @description This module defines the routes for user-related operations such as registration.
 * It uses the user controller to handle the business logic of the application.
 */

const router = require('express').Router();

/**
 * User Registration Route
 * @name /api/user/register
 * @description This route handles user registration requests.
 * The specific logic for user registration is defined in the user controller.
 * @memberof module:userRouter
 */
router.post('/register', require('../controller/user.controller').registerUser);

/**
 * User Login Route
 * @name /api/user/login
 * @description This route handles user login requests.
 * The specific logic for user login is defined in the user controller.
 * @memberof module:userRouter
 */
router.post('/login', require('../controller/user.controller').loginUser);

module.exports = router;
