const express = require('express');
const router = express.Router();
const newsCtrl = require('../controllers/news');

// router.get('/', newsCtrl.getAllNews);
// router.get()
router.post('/add-news', newsCtrl.addNews);
router.post('/add-comment', newsCtrl.addComment);
router.post('/add-avis', newsCtrl.addAvis);

module.exports = router;