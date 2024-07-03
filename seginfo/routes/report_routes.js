module.exports = app => {
    const express = require('express');
    const ReportController = require('../controller/report_controller');
    const router = express.Router();
    // GET /users
    router.get('/reports', ReportController.getAllReports);
    
    // POST /users
    router.post('/reports/create', ReportController.createReport);

    router.put('/reports/sign', ReportController.signReport);

    router.put('/reports/validate', ReportController.validateReport);

    router.post('/reports/pdf', ReportController.generatePDF);
    app.use(router);
}