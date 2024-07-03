module.exports = app => {
    const express = require('express');
    const UserController = require('../controller/user_controller');
    const router = express.Router();
    // GET /users
    router.get('/users', UserController.getUsers);
    // POST /users
    router.post('/register', UserController.registerUser);

    // POST /login
    router.post('/login', UserController.loginUser);
    app.use(router);
}