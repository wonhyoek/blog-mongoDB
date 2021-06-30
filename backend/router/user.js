const express = require('express');
const router = express.Router();
const userController = require('../controller/user');
const auth = require('../middleware/auth');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/logout', auth, userController.logout);

module.exports = router;