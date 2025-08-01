const express = require('express');
const multer = require('multer');
const { body, validationResult } = require('express-validator');
const winston = require('winston');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Import services
const { dynamics365Connection } = require('../config/database');
const { sendLeadNotificationEmail, sendAppointmentConfirmationEmail } = require('../services/emailService');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads/virtual-agent');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 5 // Max 5 files
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/png',
      'image/jpeg',
      'image/jpg',
      'application/zip'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, DOC, DOCX, PNG, JPG, and ZIP files are allowed.'), false);
    }
  }
});

// Validation middleware
const validateLeadData = [
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters long'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('company').optional().trim().isLength({ min: 2 }).withMessage('Company name must be at least 2 characters long'),
  body('phone').optional().trim().isMobilePhone().withMessage('Valid phone number is required'),
  body('interest').trim().notEmpty().withMessage('Interest area is required'),
  body('budget').optional().trim().notEmpty().withMessage('Budget range is required'),
  body('timeline').optional().trim().notEmpty().withMessage('Project timeline is required'),
  body('requirements').optional().trim().isLength({ max: 1000 }).withMessage('Requirements must be less than 1000 characters')
];

const validateAppointmentData = [
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters long'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('date').isISO8601().withMessage('Valid date is required'),
  body('time').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Valid time format is required (HH:MM)'),
  body('timezone').trim().notEmpty().withMessage('Timezone is required'),
  body('type').trim().notEmpty().withMessage('Appointment type is required'),
  body('notes').optional().trim().isLength({ max: 500 }).withMessage('Notes must be less than 500 characters')
];

// @route   POST /api/virtual-agent/lead
// @desc    Create lead from virtual agent
// @access  Public
router.post('/lead', validateLeadData, async (req, res) => {
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
      name,
      email,
      company,
      phone,
      interest,
      budget,
      timeline,
      teamSize,
      requirements,
      source = 'Virtual Agent',
      language = 'en'
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
      firstName: name.split(' ')[0],
      lastName: name.split(' ').slice(1).join(' ') || '',
      email,
      phone,
      company,
      jobTitle: 'Virtual Agent Lead',
      interests: `${interest}${budget ? ` | Budget: ${budget}` : ''}${timeline ? ` | Timeline: ${timeline}` : ''}`,
      message: requirements || `Interested in ${interest}`,
      source: 'Virtual Agent',
      language,
      teamSize,
      budget,
      timeline
    };

    const dynamicsLead = await dynamics365Connection.createLead(leadData);

    // Send notification email
    try {
      await sendLeadNotificationEmail(email, name, company, interest, requirements);
    } catch (emailError) {
      winston.warn('Failed to send lead notification email:', emailError.message);
    }

    winston.info(`Virtual Agent Lead created: ${email} (Lead ID: ${dynamicsLead.leadid})`);

    res.status(201).json({
      success: true,
      message: 'Lead created successfully. We will contact you within 24 hours!',
      data: {
        lead: {
          id: dynamicsLead.leadid,
          name: dynamicsLead.firstname + ' ' + dynamicsLead.lastname,
          email: dynamicsLead.emailaddress1,
          company: dynamicsLead.companyname,
          interest
        }
      }
    });

  } catch (error) {
    winston.error('Virtual Agent Lead creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create lead. Please try again or contact us directly.'
    });
  }
});

// @route   POST /api/virtual-agent/appointment
// @desc    Schedule appointment from virtual agent
// @access  Public
router.post('/appointment', validateAppointmentData, async (req, res) => {
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
      name,
      email,
      date,
      time,
      timezone,
      type,
      notes,
      phone,
      company
    } = req.body;

    // Create appointment record in Dynamics 365
    const appointmentData = {
      subject: `${type} - ${name}`,
      startTime: new Date(`${date}T${time}`),
      endTime: new Date(`${date}T${time}`),
      description: notes || `Appointment scheduled via Virtual Agent`,
      attendeeEmail: email,
      attendeeName: name,
      attendeePhone: phone,
      company,
      timezone,
      appointmentType: type,
      source: 'Virtual Agent'
    };

    // Here you would integrate with your calendar system
    // For now, we'll simulate the appointment creation
    const appointmentId = Date.now().toString();

    // Send confirmation email
    try {
      await sendAppointmentConfirmationEmail(email, name, date, time, timezone, type);
    } catch (emailError) {
      winston.warn('Failed to send appointment confirmation email:', emailError.message);
    }

    winston.info(`Virtual Agent Appointment scheduled: ${email} (Appointment ID: ${appointmentId})`);

    res.status(201).json({
      success: true,
      message: 'Appointment scheduled successfully! You will receive a confirmation email shortly.',
      data: {
        appointment: {
          id: appointmentId,
          type,
          date,
          time,
          timezone
        }
      }
    });

  } catch (error) {
    winston.error('Virtual Agent Appointment scheduling error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to schedule appointment. Please try again or contact us directly.'
    });
  }
});

// @route   POST /api/virtual-agent/upload
// @desc    Upload files from virtual agent
// @access  Public
router.post('/upload', upload.array('files', 5), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files uploaded'
      });
    }

    const { leadId, email, name } = req.body;
    const uploadedFiles = req.files.map(file => ({
      originalName: file.originalname,
      filename: file.filename,
      path: file.path,
      size: file.size,
      mimetype: file.mimetype
    }));

    // Store file information in Dynamics 365 or database
    // Here you would create attachments in your CRM
    const fileRecords = uploadedFiles.map(file => ({
      fileName: file.originalName,
      filePath: file.path,
      fileSize: file.size,
      fileType: file.mimetype,
      uploadedBy: email,
      leadId: leadId || null,
      source: 'Virtual Agent'
    }));

    winston.info(`Virtual Agent Files uploaded: ${email} (${uploadedFiles.length} files)`);

    res.status(200).json({
      success: true,
      message: `${uploadedFiles.length} file(s) uploaded successfully`,
      data: {
        files: uploadedFiles.map(file => ({
          name: file.originalName,
          size: file.size,
          type: file.mimetype
        }))
      }
    });

  } catch (error) {
    winston.error('Virtual Agent File upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload files. Please try again.'
    });
  }
});

// @route   GET /api/virtual-agent/business-hours
// @desc    Get business hours for different timezones
// @access  Public
router.get('/business-hours', (req, res) => {
  const businessHours = {
    'UTC': '9:00 AM - 6:00 PM UTC',
    'EST': '9:00 AM - 6:00 PM EST',
    'PST': '9:00 AM - 6:00 PM PST',
    'CET': '9:00 AM - 6:00 PM CET',
    'IST': '9:00 AM - 6:00 PM IST',
    'JST': '9:00 AM - 6:00 PM JST',
    'AEST': '9:00 AM - 6:00 PM AEST'
  };

  res.json({
    success: true,
    data: businessHours
  });
});

// @route   GET /api/virtual-agent/languages
// @desc    Get supported languages
// @access  Public
router.get('/languages', (req, res) => {
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' }
  ];

  res.json({
    success: true,
    data: languages
  });
});

// @route   GET /api/virtual-agent/timezones
// @desc    Get supported timezones
// @access  Public
router.get('/timezones', (req, res) => {
  const timezones = [
    { value: 'UTC', label: 'UTC (Coordinated Universal Time)' },
    { value: 'EST', label: 'EST (Eastern Standard Time)' },
    { value: 'PST', label: 'PST (Pacific Standard Time)' },
    { value: 'CET', label: 'CET (Central European Time)' },
    { value: 'IST', label: 'IST (Indian Standard Time)' },
    { value: 'JST', label: 'JST (Japan Standard Time)' },
    { value: 'AEST', label: 'AEST (Australian Eastern Standard Time)' }
  ];

  res.json({
    success: true,
    data: timezones
  });
});

module.exports = router; 