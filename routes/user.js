const express = require('express');
const pagesController = require('../controllers/pagesController');

const router = express.Router();

// Page d'acceuil pour l'utilisateur => GET
router.get('/', pagesController.getHomePage)
router.get('/about', pagesController.getAboutPage)
router.get('/contact', pagesController.getContactPage)
router.get('/faq', pagesController.getFaqPage)

module.exports = router;