const express = require('express');
const companyController = require('../controllers/companyController');

const router = express.Router();

// Get all company information
router.get('/', companyController.getCompanyInfo);

// Get contact information
router.get('/contact', companyController.getContactInfo);

// Get address information
router.get('/address', companyController.getAddressInfo);

// Get business hours
router.get('/business-hours', companyController.getBusinessHours);

// Get services
router.get('/services', companyController.getServices);

// Get payment methods
router.get('/payment', companyController.getPaymentMethods);

module.exports = router;
