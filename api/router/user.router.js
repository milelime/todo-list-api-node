const router = require('express').Router();

router.post('/register', require('../controller/user.controller').registerUser);

module.exports = router;
