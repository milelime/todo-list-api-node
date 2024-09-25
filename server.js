const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const port = 6969;

/**
 * Main server file.
 * @module Server
 * @description This module is the main server file for the application.
 * It sets up the server and listens on a specified port.
 * It also includes middleware for parsing JSON and URL-encoded data.
 * The main routing for the application is set up using Express.js.
 * The base API path is defined and specific route handlers are included for different parts of the application.
 */

app.use(bodyparser.json({ limit: '50mb' }));
app.use(bodyparser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // limit each IP to 100 requests per windowMs
	message: 'Too many requests from this IP, please try again later.',
});

app.use(limiter);

app.listen(port, () => {
	console.log(`listening on ${port}`);
});

app.use('/', require('./api/router/app.router'));

module.exports = app;
