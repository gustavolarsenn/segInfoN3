module.exports = app => {
    const express = require('express');
    const ReportController = require('../controller/report_controller');
    const router = express.Router();
    const jwtRules = require('../config/jwt');

    // GET /users
    router.post('/reports', jwtRules.colaboradorAuth, ReportController.getAllReports);

    // POST /user_id
    router.post('/reports/id', jwtRules.colaboradorAuth, ReportController.getById);
    
    // POST /users
    router.post('/reports/create', jwtRules.colaboradorAuth, ReportController.createReport);

    router.put('/reports/sign', jwtRules.gerenteAuth, ReportController.signReport);

    router.put('/reports/validate', jwtRules.diretorAuth, ReportController.validateReport);

    router.post('/reports/pdf', jwtRules.colaboradorAuth, ReportController.generatePDF);


    app.use(router);
}