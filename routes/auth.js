const express = require('express');
const authController = require('../controllers/authController')
    // const authController = require('../controllers/userController')

const routers = express.Router();

routers.get('/register', authController.getRegisterPage);
routers.post('/register', authController.createUser);
routers.get('/getUsers', authController.getAllUser)
routers.get('/getUser/:id', authController.getUser)
routers.get('/deleteUser/:id', authController.deleteUser)
module.exports = routers;