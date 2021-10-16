const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/utilisateur');

router.get('/', userCtrl.getAllUser)
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.signin);

module.exports = router;