const express = require('express');
const authController = require('../controllers/authController')
    // const authController = require('../controllers/userController')
const { protect } = require('../middleware/auth');

const routers = express.Router();

routers.get('/register', authController.getRegisterPage);
routers.get('/login', authController.getloginPage);
routers.post('/register', authController.createUser);
// routers.post('/login', authController.login);
routers.get('/getUsers', authController.getAllUser)
routers.get('/getUser/:id', authController.getUser)
routers.get('/deleteUser/:id', authController.deleteUser)
routers.get('/dashbord', protect, authController.getDashboardPAge)
module.exports = routers;