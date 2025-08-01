const express = require('express');
const { body, validationResult } = require('express-validator');
const winston = require('winston');

const router = express.Router();

// Import services and middleware
const dynamics365Connection = require('../config/database');
const { authenticateToken } = require('../middleware/auth');
const { findUserByEmail, updateUser } = require('../services/userService');
const emailService = require('../services/emailService');

// Validation middleware
const validateContactUpdate = [
  body('firstName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('First name can only contain letters and spaces'),
  
  body('lastName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Last name can only contain letters and spaces'),
  
  body('phone')
    .optional()
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Please provide a valid phone number'),
  
  body('company')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Company name must be between 2 and 100 characters'),
  
  body('jobTitle')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Job title must be between 2 and 100 characters'),
  
  body('city')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('City must be between 2 and 50 characters'),
  
  body('country')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Country must be between 2 and 50 characters'),
  
  body('interests')
    .optional()
    .isArray()
    .withMessage('Interests must be an array'),
  
  body('interests.*')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Each interest must be between 2 and 50 characters')
];

// @route   GET /api/contacts/profile
// @desc    Get current user's contact profile
// @access  Private
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await findUserByEmail(req.user.email);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Get contact from Dynamics 365
    let dynamicsContact = null;
    try {
      dynamicsContact = await dynamics365Connection.getContactByEmail(req.user.email);
    } catch (crmError) {
      winston.warn('Failed to get contact from Dynamics 365:', crmError.message);
      // Continue without CRM data
    }

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          company: user.company,
          jobTitle: user.jobTitle,
          city: user.city,
          country: user.country,
          interests: user.interests,
          isActive: user.isActive,
          emailVerified: user.emailVerified,
          createdAt: user.createdAt,
          lastLoginAt: user.lastLoginAt
        },
        contact: dynamicsContact ? {
          id: dynamicsContact.contactid,
          firstName: dynamicsContact.firstname,
          lastName: dynamicsContact.lastname,
          email: dynamicsContact.emailaddress1,
          phone: dynamicsContact.telephone1,
          company: dynamicsContact.companyname,
          jobTitle: dynamicsContact.jobtitle,
          city: dynamicsContact.address1_city,
          country: dynamicsContact.address1_country,
          description: dynamicsContact.description,
          createdOn: dynamicsContact.createdon,
          modifiedOn: dynamicsContact.modifiedon
        } : null
      }
    });

  } catch (error) {
    winston.error('Get profile error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   PUT /api/contacts/profile
// @desc    Update current user's contact profile
// @access  Private
router.put('/profile', authenticateToken, validateContactUpdate, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const user = await findUserByEmail(req.user.email);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Update user in local database
    const updateData = {};
    const fields = ['firstName', 'lastName', 'phone', 'company', 'jobTitle', 'city', 'country', 'interests'];
    
    fields.forEach(field => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    const updatedUser = await updateUser(user.id, updateData);

    // Update contact in Dynamics 365
    let dynamicsContact = null;
    try {
      const existingContact = await dynamics365Connection.getContactByEmail(req.user.email);
      if (existingContact) {
        const contactUpdateData = {};
        
        if (req.body.firstName) contactUpdateData.firstname = req.body.firstName;
        if (req.body.lastName) contactUpdateData.lastname = req.body.lastName;
        if (req.body.phone) contactUpdateData.telephone1 = req.body.phone;
        if (req.body.company) contactUpdateData.companyname = req.body.company;
        if (req.body.jobTitle) contactUpdateData.jobtitle = req.body.jobTitle;
        if (req.body.city) contactUpdateData.address1_city = req.body.city;
        if (req.body.country) contactUpdateData.address1_country = req.body.country;
        if (req.body.interests) {
          contactUpdateData['cr_interest_areas'] = req.body.interests.join(', ');
        }

        await dynamics365Connection.updateContact(existingContact.contactid, contactUpdateData);
        dynamicsContact = await dynamics365Connection.getContactByEmail(req.user.email);
      }
    } catch (crmError) {
      winston.error('Failed to update contact in Dynamics 365:', crmError.message);
      // Continue without CRM update
    }

    winston.info(`Profile updated for user: ${req.user.email}`);

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        user: {
          id: updatedUser.id,
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          email: updatedUser.email,
          phone: updatedUser.phone,
          company: updatedUser.company,
          jobTitle: updatedUser.jobTitle,
          city: updatedUser.city,
          country: updatedUser.country,
          interests: updatedUser.interests,
          isActive: updatedUser.isActive,
          emailVerified: updatedUser.emailVerified,
          createdAt: updatedUser.createdAt,
          lastLoginAt: updatedUser.lastLoginAt
        },
        contact: dynamicsContact ? {
          id: dynamicsContact.contactid,
          firstName: dynamicsContact.firstname,
          lastName: dynamicsContact.lastname,
          email: dynamicsContact.emailaddress1,
          phone: dynamicsContact.telephone1,
          company: dynamicsContact.companyname,
          jobTitle: dynamicsContact.jobtitle,
          city: dynamicsContact.address1_city,
          country: dynamicsContact.address1_country,
          description: dynamicsContact.description,
          createdOn: dynamicsContact.createdon,
          modifiedOn: dynamicsContact.modifiedon
        } : null
      }
    });

  } catch (error) {
    winston.error('Update profile error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   POST /api/contacts/lead
// @desc    Create a new lead from contact form
// @access  Public
router.post('/lead', [
  body('firstName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('First name can only contain letters and spaces'),
  
  body('lastName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Last name can only contain letters and spaces'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('phone')
    .optional()
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Please provide a valid phone number'),
  
  body('company')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Company name must be between 2 and 100 characters'),
  
  body('jobTitle')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Job title must be between 2 and 100 characters'),
  
  body('message')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Message must be less than 1000 characters'),
  
  body('interests')
    .optional()
    .isArray()
    .withMessage('Interests must be an array'),
  
  body('interests.*')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Each interest must be between 2 and 50 characters')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const {
      firstName,
      lastName,
      email,
      phone,
      company,
      jobTitle,
      message,
      interests
    } = req.body;

    // Check if contact already exists
    const existingContact = await dynamics365Connection.getContactByEmail(email);
    if (existingContact) {
      return res.status(400).json({
        success: false,
        message: 'Contact with this email already exists in our system'
      });
    }

    // Create lead in Dynamics 365
    const leadData = {
      firstName,
      lastName,
      email,
      phone,
      company,
      jobTitle,
      interests,
      message
    };

    const dynamicsLead = await dynamics365Connection.createLead(leadData);

    // Send notification email
    try {
      await emailService.sendLeadNotificationEmail(email, firstName, lastName, company, message);
    } catch (emailError) {
      winston.warn('Failed to send lead notification email:', emailError.message);
      // Don't fail the lead creation if email fails
    }

    winston.info(`New lead created: ${email} (Lead ID: ${dynamicsLead.leadid})`);

    res.status(201).json({
      success: true,
      message: 'Lead created successfully. We will contact you soon!',
      data: {
        lead: {
          id: dynamicsLead.leadid,
          firstName: dynamicsLead.firstname,
          lastName: dynamicsLead.lastname,
          email: dynamicsLead.emailaddress1,
          company: dynamicsLead.companyname
        }
      }
    });

  } catch (error) {
    winston.error('Create lead error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   GET /api/contacts/sync
// @desc    Sync user data with Dynamics 365
// @access  Private
router.get('/sync', authenticateToken, async (req, res) => {
  try {
    const user = await findUserByEmail(req.user.email);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Get contact from Dynamics 365
    let dynamicsContact = null;
    try {
      dynamicsContact = await dynamics365Connection.getContactByEmail(req.user.email);
      
      if (dynamicsContact) {
        // Update local user data with CRM data if needed
        const updateData = {};
        
        if (dynamicsContact.firstname && dynamicsContact.firstname !== user.firstName) {
          updateData.firstName = dynamicsContact.firstname;
        }
        if (dynamicsContact.lastname && dynamicsContact.lastname !== user.lastName) {
          updateData.lastName = dynamicsContact.lastname;
        }
        if (dynamicsContact.telephone1 && dynamicsContact.telephone1 !== user.phone) {
          updateData.phone = dynamicsContact.telephone1;
        }
        if (dynamicsContact.companyname && dynamicsContact.companyname !== user.company) {
          updateData.company = dynamicsContact.companyname;
        }
        if (dynamicsContact.jobtitle && dynamicsContact.jobtitle !== user.jobTitle) {
          updateData.jobTitle = dynamicsContact.jobtitle;
        }
        if (dynamicsContact.address1_city && dynamicsContact.address1_city !== user.city) {
          updateData.city = dynamicsContact.address1_city;
        }
        if (dynamicsContact.address1_country && dynamicsContact.address1_country !== user.country) {
          updateData.country = dynamicsContact.address1_country;
        }

        if (Object.keys(updateData).length > 0) {
          await updateUser(user.id, updateData);
          winston.info(`User data synced from Dynamics 365: ${req.user.email}`);
        }
      }
    } catch (crmError) {
      winston.error('Failed to sync with Dynamics 365:', crmError.message);
      return res.status(500).json({
        success: false,
        message: 'Failed to sync with Dynamics 365'
      });
    }

    res.json({
      success: true,
      message: 'Data synced successfully',
      data: {
        synced: !!dynamicsContact,
        contact: dynamicsContact ? {
          id: dynamicsContact.contactid,
          firstName: dynamicsContact.firstname,
          lastName: dynamicsContact.lastname,
          email: dynamicsContact.emailaddress1,
          phone: dynamicsContact.telephone1,
          company: dynamicsContact.companyname,
          jobTitle: dynamicsContact.jobtitle,
          city: dynamicsContact.address1_city,
          country: dynamicsContact.address1_country,
          modifiedOn: dynamicsContact.modifiedon
        } : null
      }
    });

  } catch (error) {
    winston.error('Sync error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Contact form submission
router.post('/contact', [
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('messageTo').notEmpty().withMessage('Recipient is required'),
  body('message').notEmpty().withMessage('Message is required'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      firstName,
      lastName,
      email,
      phone,
      company,
      service,
      messageTo,
      message
    } = req.body;

    // Determine recipient email based on service selection
    const getRecipientEmail = (service, messageTo) => {
      // Route based on service first
      switch (service) {
        case 'Dynamics 365 Implementation':
          return 'admin@crmonce.com';
        case 'Power Platform Development':
          return 'admin@crmonce.com';
        case 'Consulting Services':
          return 'admin@crmonce.com';
        case 'Professional Training':
          return 'admin@crmonce.com';
        case 'Custom Development':
          return 'admin@crmonce.com';
        case 'System Integration':
          return 'admin@crmonce.com';
        default:
          // Fall back to messageTo routing
          switch (messageTo) {
            case 'sales':
              return 'admin@crmonce.com';
            case 'support':
              return 'admin@crmonce.com';
            case 'consulting':
              return 'admin@crmonce.com';
            case 'training':
              return 'admin@crmonce.com';
            case 'general':
            default:
              return 'admin@crmonce.com';
          }
      }
    };

    const recipientEmail = getRecipientEmail(service, messageTo);

    // Log the message details
    console.log('Contact Form Submission:', {
      from: `${firstName} ${lastName} (${email})`,
      to: recipientEmail,
      recipientType: messageTo,
      company,
      service,
      message: message.substring(0, 100) + '...'
    });

    // For now, just return success (we'll add email service later)
    res.json({ 
      success: true, 
      message: 'Message sent successfully',
      recipient: recipientEmail 
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router; 