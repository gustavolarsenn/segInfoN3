module.exports = app => {
    const express = require('express');
    const UserController = require('../controller/user_controller');
    const jwtRules = require('../config/jwt');
    const router = express.Router();
    // GET /users
    router.get('/users', jwtRules.gerenteAuth ,UserController.getUsers);
    // POST /users
    router.post('/register', jwtRules.gerenteAuth, UserController.registerUser);

    router.post('/users/current', UserController.getCurrentUser)

    // POST /login
    router.post('/login', UserController.loginUser);
    app.use(router);
}