const express = require('express');
const { body, validationResult } = require('express-validator');
const d365Service = require('../config/d365');
const logger = require('../config/logger');

const router = express.Router();

// Middleware to check if D365 is configured
const checkD365Config = (req, res, next) => {
  if (!process.env.D365_CLIENT_ID || !process.env.D365_CLIENT_SECRET || !process.env.D365_TENANT_ID) {
    return res.status(500).json({
      success: false,
      message: 'Dynamics 365 configuration is missing. Please configure D365_CLIENT_ID, D365_CLIENT_SECRET, and D365_TENANT_ID environment variables.'
    });
  }
  next();
};

// Dashboard Data
router.get('/dashboard', checkD365Config, async (req, res) => {
  try {
    const dashboardData = await d365Service.getDashboardData();
    res.json({
      success: true,
      data: dashboardData
    });
  } catch (error) {
    logger.error('Error fetching dashboard data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard data from Dynamics 365',
      error: error.message
    });
  }
});

// Contact Routes
router.get('/contacts', checkD365Config, async (req, res) => {
  try {
    const { filter, select } = req.query;
    const contacts = await d365Service.getContacts(filter, select);
    res.json({
      success: true,
      data: contacts
    });
  } catch (error) {
    logger.error('Error fetching contacts:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contacts from Dynamics 365',
      error: error.message
    });
  }
});

router.get('/contacts/:id', checkD365Config, async (req, res) => {
  try {
    const contact = await d365Service.getContact(req.params.id);
    res.json({
      success: true,
      data: contact
    });
  } catch (error) {
    logger.error('Error fetching contact:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contact from Dynamics 365',
      error: error.message
    });
  }
});

router.post('/contacts', checkD365Config, [
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').optional().isMobilePhone().withMessage('Valid phone number is required'),
  body('jobTitle').optional().isString(),
  body('company').optional().isString()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const contact = await d365Service.createContact(req.body);
    res.status(201).json({
      success: true,
      data: contact,
      message: 'Contact created successfully in Dynamics 365'
    });
  } catch (error) {
    logger.error('Error creating contact:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create contact in Dynamics 365',
      error: error.message
    });
  }
});

router.put('/contacts/:id', checkD365Config, [
  body('firstName').optional().isString(),
  body('lastName').optional().isString(),
  body('email').optional().isEmail().withMessage('Valid email is required'),
  body('phone').optional().isMobilePhone().withMessage('Valid phone number is required'),
  body('jobTitle').optional().isString(),
  body('company').optional().isString()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    await d365Service.updateContact(req.params.id, req.body);
    res.json({
      success: true,
      message: 'Contact updated successfully in Dynamics 365'
    });
  } catch (error) {
    logger.error('Error updating contact:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update contact in Dynamics 365',
      error: error.message
    });
  }
});

// Account Routes
router.get('/accounts', checkD365Config, async (req, res) => {
  try {
    const { filter, select } = req.query;
    const accounts = await d365Service.getAccounts(filter, select);
    res.json({
      success: true,
      data: accounts
    });
  } catch (error) {
    logger.error('Error fetching accounts:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch accounts from Dynamics 365',
      error: error.message
    });
  }
});

router.get('/accounts/:id', checkD365Config, async (req, res) => {
  try {
    const account = await d365Service.getAccount(req.params.id);
    res.json({
      success: true,
      data: account
    });
  } catch (error) {
    logger.error('Error fetching account:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch account from Dynamics 365',
      error: error.message
    });
  }
});

router.post('/accounts', checkD365Config, [
  body('name').notEmpty().withMessage('Account name is required'),
  body('email').optional().isEmail().withMessage('Valid email is required'),
  body('phone').optional().isMobilePhone().withMessage('Valid phone number is required'),
  body('website').optional().isURL().withMessage('Valid website URL is required'),
  body('city').optional().isString(),
  body('country').optional().isString()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const account = await d365Service.createAccount(req.body);
    res.status(201).json({
      success: true,
      data: account,
      message: 'Account created successfully in Dynamics 365'
    });
  } catch (error) {
    logger.error('Error creating account:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create account in Dynamics 365',
      error: error.message
    });
  }
});

router.put('/accounts/:id', checkD365Config, [
  body('name').optional().isString(),
  body('email').optional().isEmail().withMessage('Valid email is required'),
  body('phone').optional().isMobilePhone().withMessage('Valid phone number is required'),
  body('website').optional().isURL().withMessage('Valid website URL is required'),
  body('city').optional().isString(),
  body('country').optional().isString()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    await d365Service.updateAccount(req.params.id, req.body);
    res.json({
      success: true,
      message: 'Account updated successfully in Dynamics 365'
    });
  } catch (error) {
    logger.error('Error updating account:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update account in Dynamics 365',
      error: error.message
    });
  }
});

// Lead Routes
router.get('/leads', checkD365Config, async (req, res) => {
  try {
    const { filter, select } = req.query;
    const leads = await d365Service.getLeads(filter, select);
    res.json({
      success: true,
      data: leads
    });
  } catch (error) {
    logger.error('Error fetching leads:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch leads from Dynamics 365',
      error: error.message
    });
  }
});

router.get('/leads/:id', checkD365Config, async (req, res) => {
  try {
    const lead = await d365Service.getLead(req.params.id);
    res.json({
      success: true,
      data: lead
    });
  } catch (error) {
    logger.error('Error fetching lead:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch lead from Dynamics 365',
      error: error.message
    });
  }
});

router.post('/leads', checkD365Config, [
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').optional().isMobilePhone().withMessage('Valid phone number is required'),
  body('company').notEmpty().withMessage('Company name is required'),
  body('subject').notEmpty().withMessage('Subject is required'),
  body('description').optional().isString()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const lead = await d365Service.createLead(req.body);
    res.status(201).json({
      success: true,
      data: lead,
      message: 'Lead created successfully in Dynamics 365'
    });
  } catch (error) {
    logger.error('Error creating lead:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create lead in Dynamics 365',
      error: error.message
    });
  }
});

router.put('/leads/:id', checkD365Config, [
  body('firstName').optional().isString(),
  body('lastName').optional().isString(),
  body('email').optional().isEmail().withMessage('Valid email is required'),
  body('phone').optional().isMobilePhone().withMessage('Valid phone number is required'),
  body('company').optional().isString(),
  body('subject').optional().isString(),
  body('description').optional().isString()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    await d365Service.updateLead(req.params.id, req.body);
    res.json({
      success: true,
      message: 'Lead updated successfully in Dynamics 365'
    });
  } catch (error) {
    logger.error('Error updating lead:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update lead in Dynamics 365',
      error: error.message
    });
  }
});

// Opportunity Routes
router.get('/opportunities', checkD365Config, async (req, res) => {
  try {
    const { filter, select } = req.query;
    const opportunities = await d365Service.getOpportunities(filter, select);
    res.json({
      success: true,
      data: opportunities
    });
  } catch (error) {
    logger.error('Error fetching opportunities:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch opportunities from Dynamics 365',
      error: error.message
    });
  }
});

router.get('/opportunities/:id', checkD365Config, async (req, res) => {
  try {
    const opportunity = await d365Service.getOpportunity(req.params.id);
    res.json({
      success: true,
      data: opportunity
    });
  } catch (error) {
    logger.error('Error fetching opportunity:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch opportunity from Dynamics 365',
      error: error.message
    });
  }
});

router.post('/opportunities', checkD365Config, [
  body('name').notEmpty().withMessage('Opportunity name is required'),
  body('estimatedValue').isNumeric().withMessage('Estimated value must be a number'),
  body('estimatedCloseDate').isISO8601().withMessage('Valid close date is required'),
  body('description').optional().isString(),
  body('stageName').optional().isString()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const opportunity = await d365Service.createOpportunity(req.body);
    res.status(201).json({
      success: true,
      data: opportunity,
      message: 'Opportunity created successfully in Dynamics 365'
    });
  } catch (error) {
    logger.error('Error creating opportunity:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create opportunity in Dynamics 365',
      error: error.message
    });
  }
});

router.put('/opportunities/:id', checkD365Config, [
  body('name').optional().isString(),
  body('estimatedValue').optional().isNumeric().withMessage('Estimated value must be a number'),
  body('estimatedCloseDate').optional().isISO8601().withMessage('Valid close date is required'),
  body('description').optional().isString(),
  body('stageName').optional().isString()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    await d365Service.updateOpportunity(req.params.id, req.body);
    res.json({
      success: true,
      message: 'Opportunity updated successfully in Dynamics 365'
    });
  } catch (error) {
    logger.error('Error updating opportunity:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update opportunity in Dynamics 365',
      error: error.message
    });
  }
});

// Health check for D365 connection
router.get('/health', checkD365Config, async (req, res) => {
  try {
    await d365Service.getAccessToken();
    res.json({
      success: true,
      message: 'Dynamics 365 connection is healthy',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    logger.error('D365 health check failed:', error);
    res.status(500).json({
      success: false,
      message: 'Dynamics 365 connection failed',
      error: error.message
    });
  }
});

module.exports = router; 