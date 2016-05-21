var express = require('express');
var router = express.Router();
var ctlAuth = require('../controllers/ctlAuth'); // Controller

// Login
router.get('/login', ctlAuth.getLogin);
router.post('/login', ctlAuth.postLogin);

// Logout
router.get('/logout', ctlAuth.getLogout);

module.exports = router;