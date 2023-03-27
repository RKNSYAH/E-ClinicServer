const express = require('express');
const login = require('../controller/LoginControl');

const router = express.Router();

router.post('/login', login.login);
router.post('/auth', login.auth);
router.get('/rememberauth', login.rememberauth);
router.post('/logout', login.logout);

module.exports = router