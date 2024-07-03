const Report = require('../model/report_model');
const signatureController = require('./signature_controller');

exports.getAllReports = async () => {
    try {
        const reports = await Report.find();
        return reports;
    } catch (error) {
        console.error('Error fetching reports:', error);
        return { message: 'Error fetching reports', status: 500, error: error };
    }
}

exports.createReport = async (reportData, signatureData) => {
    const { title, value } = reportData;

    console.log('Creating report:', title, value)

    // const signature = await signatureController.createSignature(signatureData);
    const report = new Report({ ...reportData });
    return await report.save();
};

exports.signReport = async (reportId, signatureData) => {
    try {
        const report = await
        Report.findById(reportId);
        if (!report) {
            return { message: 'Report not found', status: 404 };
        }
        const signature = await signatureController.createSignature(signatureData);
        report.signature = signature;
        await report.save();
        return report;
    }
    catch (error) {
        console.error('Error signing report:', error);
        return { message: 'Error signing report', status: 500, error: error };
    }
}

exports.validateReport = async (reportId) => {
    try {
        const report = await
        Report.findById(reportId);
        if (!report) {
            return { message: 'Report not found', status: 404 };
        }
        report.validated = true;
        await report.save();
        return report;
    }
    catch (error) {
        console.error('Error validating report:', error);
        return { message: 'Error validating report', status: 500, error: error };
    }
}

exports.getReportById = async (id) => {
    try {
        const report = await Report.findById(id).populate('digitalSignature');
        if (!report) {
            // Handle the case where no report is found
            return { message: 'Report not found', status: 404 };
        }
        return report; // Return the found report
    } catch (error) {
        // Handle any errors that occur during the database query
        console.error('Error fetching report:', error);
        return { message: 'Error fetching report', status: 500, error: error };
    }
};