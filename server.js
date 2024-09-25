const express = require('express');
const app = express();
const bodyparser = require('body-parser');

const port = 6969;

app.use(bodyparser.json({ limit: '50mb' }));
app.use(bodyparser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

app.listen(port, () => {
	console.log(`listening on ${port}`);
});

app.use('/', require('./api/router/app.router'));

module.exports = app;
