const path = require('path');
const rootDir = require('../helpers/path');
exports.getHomePage = (req, res) => {
    res.render(path.join(rootDir, 'views', 'index'), { title: 'La bibliothèque virtuelle' })
};
exports.getContactPage = (req, res) => {
    res.render(path.join(rootDir, 'views', 'contact'), { title: 'Contactez-nous !' })
};
exports.getAboutPage = (req, res) => {
    res.render(path.join(rootDir, 'views', 'about'), { title: 'A prpos de nous !' })
};
exports.getFaqPage = (req, res) => {
    res.render(path.join(rootDir, 'views', 'faq'), { title: 'La foire aux questions' })
};
// exports.getRegisterPage = (req, res) => res.render(path.join(rootDir, 'views', 'register'), { title: 'Inscrivez-vous !' });
// exports.getLoginPage = (req, res) => res.render(path.join(rootDir, 'views', 'connexion'), { title: 'Connectez-vous !' });