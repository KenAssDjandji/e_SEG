const express = require('express');
// const ejs = require('ejs');
// const path = require('path');
// const rootDir = require('../helpers/path');
const pagesController = require('../controllers/pagesController');
const registerController = require('../controllers/registerController');
const router = express.Router();

// Page d'acceuil pour l'utilisateur => GET
router.get('/', pagesController.getHomePage)
router.get('/about', pagesController.getAboutPage)
router.get('/contact', pagesController.getContactPage)
router.get('/login', pagesController.getLoginPage)
router.get('/signUp', pagesController.getSignUpPage)
router.get('/faq', pagesController.getFaqPage)

router.post('/signUp', registerController.postSignUp)
module.exports = router;