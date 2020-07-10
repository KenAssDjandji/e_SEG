const express = require('express');
const pagesController = require('../controllers/pagesController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Page d'acceuil pour l'utilisateur => GET
router.get('/', pagesController.getHomePage)
router.get('/about', pagesController.getAboutPage)
router.get('/contact', protect, pagesController.getContactPage)
router.get('/faq', protect, pagesController.getFaqPage)

module.exports = router;