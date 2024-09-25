/**
 * @module todoRouter
 * @description This module defines the routes for todo-related operations such as creating, updating, and deleting todos.
 * It uses the todo controller to handle the business logic of the application.
 */

const router = require('express').Router();
const verifyToken = require('../middleware/auth.middleware');

/**
 * Create To-Do Route
 * @name /api/todo/create
 * @description This route handles creating a new to-do item.
 * The specific logic for creating a to-do item is defined in the todo controller.
 * @memberof module:todoRouter
 */
router.post('/', verifyToken, require('../controller/todo.controller').createTodo);

/**
 * Update To-Do Route
 * @name /api/todos/:id
 * @description This route handles updating an existing to-do item.
 * The specific logic for updating a to-do item is defined in the todo controller.
 * @memberof module:todoRouter
 */
router.put('/:id', verifyToken, require('../controller/todo.controller').updateTodo);

module.exports = router;
