const router = require('express').Router();
const path = require('path');

router.get('/', (req, res) => {
	try {
		res.send({ message: 'API' });
	} catch (err) {
		console.error(err);
		res.status(500).send({ message: 'Server Error' });
	}
});

module.exports = router;
