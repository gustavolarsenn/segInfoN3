const Report = require('../model/report_model');
const signatureController = require('./signature_controller');
const decode = require('../config/jwt');

const PDFDocument = require('pdfkit');
const fs  = require('fs');

exports.generatePDF = async (req, res) => {
    try {
        // create a document the same way as above
        const doc = new PDFDocument;
    
        const reportInfo = await Report.findOne({ _id: req.body.reportId });
    
        // add your content to the document here, as usual
        doc.text(`Report ID: ${reportInfo._id} 
                Report Title: ${reportInfo.title} 
                Report Value: ${reportInfo.value} 
                Report Description: ${reportInfo.description}
                Report Created By: ${reportInfo.createdById} 
                Report Signed By: ${reportInfo.signedById} 
                Report Created At: ${reportInfo.createdAt}
                Report Validated: ${reportInfo.validated}`
        );
        // get a blob when you're done
        doc.pipe(fs.createWriteStream('Demo.pdf'));
        doc.end();

        res.status(200).json({ message: 'PDF generated' });
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).json({ message: 'Error generating PDF', error: error });
    }
}

exports.getAllReports = async (req, res) => {
    try {
        const reports = await Report.find();
        res.status(200).json(reports);
    } catch (error) {
        console.error('Error fetching reports:', error);
        res.status(500).json({ message: 'Error fetching reports', error: error });
    }
}

exports.createReport = async (req, res) => {
    try {
        const token = req.cookies.jwt;
        const userInfo = decode.decodeUserInfo(token);
        const report = new Report({ ...req.body, createdById: userInfo._id});
        await report.save();
        res.status(201).json(report);
    } catch (error) {
        console.error('Error creating report:', error);
        res.status(500).json({ message: 'Error creating report', error: error });
    }
};

exports.signReport = async (req, res) => {
    const { reportId, signatureData } = req.body;

    const token = req.cookies.jwt;
    const userInfo = decode.decodeUserInfo(token);
    const userId = userInfo._id;

    try {
        const report = await Report.findById(reportId);
        if (!report) {
            return res.status(404).json({ message: 'Report not found' });
        }
        const signature = await signatureController.createSignature(userId, signatureData);

        report.signedById = userId;
        report.signature = signature;
        await report.save();
        res.status(200).json(report);
    } catch (error) {
        console.error('Error signing report:', error);
        res.status(500).json({ message: 'Error signing report', error: error });
    }
}

exports.validateReport = async (req, res) => {
    const { reportId } = req.body;

    try {
        const report = await Report.findById(reportId);

        const validated = await signatureController.validateSignature('relatório', report);
        if (!report) {
            return res.status(404).json({ message: 'Report not found' });
        }
        if (!validated) {
            return res.status(400).json({ message: 'Invalid signature' });
        }
        report.validated = true;
        await report.save();
        res.status(200).json(report);
    } catch (error) {
        console.error('Error validating report:', error);
        res.status(500).json({ message: 'Error validating report', error: error });
    }
}

exports.getReportById = async (req, res) => {
    const { id } = req.params;

    try {
        const report = await Report.findById(id).populate('digitalSignature');
        if (!report) {
            return res.status(404).json({ message: 'Report not found' });
        }
        res.status(200).json(report);
    } catch (error) {
        console.error('Error fetching report:', error);
        res.status(500).json({ message: 'Error fetching report', error: error });
    }
};