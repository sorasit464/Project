const companyInfo = require('../config/company');

// Get company information
const getCompanyInfo = async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Company information retrieved successfully',
      data: companyInfo,
    });
  } catch (error) {
    console.error('Get company info error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// Get contact information only
const getContactInfo = async (req, res) => {
  try {
    const { contact, address, businessHours } = companyInfo;
    
    res.json({
      success: true,
      message: 'Contact information retrieved successfully',
      data: {
        contact,
        address,
        businessHours,
      },
    });
  } catch (error) {
    console.error('Get contact info error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// Get address information only
const getAddressInfo = async (req, res) => {
  try {
    const { address } = companyInfo;
    
    res.json({
      success: true,
      message: 'Address information retrieved successfully',
      data: address,
    });
  } catch (error) {
    console.error('Get address info error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// Get business hours only
const getBusinessHours = async (req, res) => {
  try {
    const { businessHours } = companyInfo;
    
    res.json({
      success: true,
      message: 'Business hours retrieved successfully',
      data: businessHours,
    });
  } catch (error) {
    console.error('Get business hours error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// Get services information
const getServices = async (req, res) => {
  try {
    const { services } = companyInfo;
    
    res.json({
      success: true,
      message: 'Services information retrieved successfully',
      data: services,
    });
  } catch (error) {
    console.error('Get services error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// Get payment methods
const getPaymentMethods = async (req, res) => {
  try {
    const { payment } = companyInfo;
    
    res.json({
      success: true,
      message: 'Payment methods retrieved successfully',
      data: payment,
    });
  } catch (error) {
    console.error('Get payment methods error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

module.exports = {
  getCompanyInfo,
  getContactInfo,
  getAddressInfo,
  getBusinessHours,
  getServices,
  getPaymentMethods,
};
