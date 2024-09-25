const router = require('express').Router();
const API_PATH = '/api';

router.use(API_PATH + '/', require('./api'));
router.use(API_PATH + '/user', require('./user.router'));

module.exports = router;
