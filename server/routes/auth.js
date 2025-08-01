const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const winston = require('winston');

const router = express.Router();

// Import services
const { dynamics365Connection } = require('../config/database');
const { sendWelcomeEmail } = require('../services/emailService');
const { createUser, findUserByEmail } = require('../services/userService');

// Validation middleware
const validateRegistration = [
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
  
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
  
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

const validateLogin = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 1 })
    .withMessage('Password cannot be empty')
];

// @route   POST /api/auth/register
// @desc    Register a new user and create contact in Dynamics 365
// @access  Public
router.post('/register', validateRegistration, async (req, res) => {
  try {
    console.log('🔍 Registration request received:', {
      body: req.body,
      headers: req.headers,
      timestamp: new Date().toISOString()
    });

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('❌ Validation errors:', errors.array());
      
      // Create user-friendly error messages
      const errorMessages = errors.array().map(error => {
        switch (error.path) {
          case 'firstName':
            return 'First name must be between 2-50 characters and contain only letters and spaces';
          case 'lastName':
            return 'Last name must be between 2-50 characters and contain only letters and spaces';
          case 'email':
            return 'Please provide a valid email address';
          case 'password':
            if (error.value && error.value.length < 8) {
              return 'Password must be at least 8 characters long';
            }
            return 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)';
          case 'phone':
            return 'Please provide a valid phone number (e.g., +1234567890)';
          case 'company':
            return 'Company name must be between 2-100 characters';
          case 'jobTitle':
            return 'Job title must be between 2-100 characters';
          case 'city':
            return 'City must be between 2-50 characters';
          case 'country':
            return 'Country must be between 2-50 characters';
          default:
            return error.msg;
        }
      });
      
      return res.status(400).json({
        success: false,
        message: 'Please fix the following errors:',
        errors: errorMessages,
        fieldErrors: errors.array()
      });
    }

    console.log('✅ Validation passed');

    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      company,
      jobTitle,
      city,
      country,
      interests
    } = req.body;

    // Check if user already exists
    console.log('🔍 Checking for existing user with email:', email);
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      console.log('❌ User already exists:', existingUser.email);
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }
    console.log('✅ No existing user found');

    // Check if contact already exists in Dynamics 365
    console.log('🔍 Checking for existing contact in Dynamics 365:', email);
    try {
      const existingContact = await dynamics365Connection.getContactByEmail(email);
      if (existingContact) {
        console.log('❌ Contact already exists in Dynamics 365:', existingContact.contactid);
        return res.status(400).json({
          success: false,
          message: 'Contact with this email already exists in our system'
        });
      }
      console.log('✅ No existing contact found in Dynamics 365');
    } catch (error) {
      console.log('⚠️ Error checking existing contact (continuing):', error.message);
    }

    // Hash password
    console.log('🔍 Hashing password...');
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log('✅ Password hashed successfully');

    // Create user in local database
    console.log('🔍 Creating user in local database...');
    const userData = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
      company,
      jobTitle,
      city,
      country,
      interests,
      isActive: true,
      emailVerified: false,
      createdAt: new Date()
    };

    console.log('📝 User data prepared:', { ...userData, password: '[HIDDEN]' });
    const newUser = await createUser(userData);
    console.log('✅ User created successfully:', newUser.id);

    // Create contact in Dynamics 365
    console.log('🔍 Creating contact in Dynamics 365...');
    const contactData = {
      firstName,
      lastName,
      email,
      phone,
      company,
      jobTitle,
      city,
      country,
      interests,
      new_password: password // Map password to new_password field
    };

    console.log('📝 Contact data prepared:', contactData);
    const dynamicsContact = await dynamics365Connection.createContact(contactData);
    console.log('✅ Contact created in Dynamics 365:', dynamicsContact.contactid);

    // Send welcome email
    console.log('🔍 Sending welcome email...');
    try {
      await sendWelcomeEmail(email, firstName, lastName);
      console.log('✅ Welcome email sent successfully');
    } catch (emailError) {
      console.log('⚠️ Failed to send welcome email:', emailError.message);
      winston.warn('Failed to send welcome email:', emailError.message);
      // Don't fail the registration if email fails
    }

    // Generate JWT token
    console.log('🔍 Generating JWT token...');
    const token = jwt.sign(
      { 
        userId: newUser.id,
        email: newUser.email,
        contactId: dynamicsContact.contactid
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    console.log('✅ JWT token generated successfully');

    // Log successful registration
    console.log('🎉 Registration completed successfully!');
    winston.info(`New user registered: ${email} (Contact ID: ${dynamicsContact.contactid})`);

    const responseData = {
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: newUser.id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          company: newUser.company,
          jobTitle: newUser.jobTitle
        },
        contact: {
          id: dynamicsContact.contactid,
          firstName: dynamicsContact.firstname,
          lastName: dynamicsContact.lastname,
          email: dynamicsContact.emailaddress1
        },
        token
      }
    };

    console.log('📤 Sending success response:', { ...responseData, data: { ...responseData.data, token: '[HIDDEN]' } });
    res.status(201).json(responseData);

  } catch (error) {
    console.log('❌ Registration error occurred:', error.message);
    console.log('🔍 Error stack:', error.stack);
    winston.error('Registration error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Internal server error during registration',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user and return JWT token
// @access  Public
router.post('/login', validateLogin, async (req, res) => {
  try {
    console.log('🔍 Login request received:', {
      email: req.body.email,
      timestamp: new Date().toISOString()
    });

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('❌ Login validation errors:', errors.array());
      
      // Create user-friendly error messages
      const errorMessages = errors.array().map(error => {
        switch (error.path) {
          case 'email':
            if (error.type === 'field') {
              return 'Email is required';
            }
            return 'Please provide a valid email address';
          case 'password':
            return 'Password is required';
          default:
            return error.msg;
        }
      });
      
      return res.status(400).json({
        success: false,
        message: 'Please fix the following errors:',
        errors: errorMessages,
        fieldErrors: errors.array()
      });
    }

    console.log('✅ Login validation passed');

    const { email, password } = req.body;

    // First, try to get contact details from Dynamics 365
    console.log('🔍 Looking up contact in Dynamics 365 with email:', email);
    let d365Contact = null;
    try {
      d365Contact = await dynamics365Connection.getContactDetailsByEmail(email);
    } catch (d365Error) {
      console.log('⚠️ Error fetching from D365 (continuing with local user):', d365Error.message);
    }

    // Find user by email in local database
    console.log('🔍 Looking up user in local database with email:', email);
    const user = await findUserByEmail(email);
    
    let authenticatedUser = null;
    let isPasswordValid = false;

    // If we have D365 contact with password, try to authenticate with that
    if (d365Contact && d365Contact.password) {
      console.log('🔍 Found contact in D365 with password, attempting D365 authentication');
      isPasswordValid = (d365Contact.password === password);
      
      if (isPasswordValid) {
        console.log('✅ Password verified successfully from D365');
        authenticatedUser = {
          id: d365Contact.id,
          firstName: d365Contact.firstName,
          lastName: d365Contact.lastName,
          fullName: d365Contact.fullName,
          email: d365Contact.email,
          phone: d365Contact.phone,
          jobTitle: d365Contact.jobTitle,
          city: d365Contact.city,
          country: d365Contact.country,
          interests: d365Contact.interests,
          signupDate: d365Contact.signupDate,
          signupSource: d365Contact.signupSource,
          source: 'D365'
        };
      } else {
        console.log('❌ D365 password verification failed');
      }
    }

    // If D365 authentication failed or no D365 contact, try local user
    if (!authenticatedUser && user) {
      console.log('🔍 Attempting local user authentication');
      
      // Check if user is active
      if (!user.isActive) {
        console.log('❌ User account is deactivated:', email);
        return res.status(401).json({
          success: false,
          message: 'Account is deactivated. Please contact support.',
          error: 'ACCOUNT_DEACTIVATED'
        });
      }
      console.log('✅ User account is active');

      // Verify password
      console.log('🔍 Verifying local user password...');
      isPasswordValid = await bcrypt.compare(password, user.password);
      
      if (isPasswordValid) {
        console.log('✅ Local user password verified successfully');
        authenticatedUser = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          fullName: `${user.firstName} ${user.lastName}`,
          email: user.email,
          phone: user.phone,
          company: user.company,
          jobTitle: user.jobTitle,
          city: user.city,
          country: user.country,
          interests: user.interests,
          lastLoginAt: user.lastLoginAt,
          source: 'LOCAL'
        };
      } else {
        console.log('❌ Local user password verification failed');
      }
    }

    // If neither D365 nor local authentication worked
    if (!authenticatedUser) {
      console.log('❌ Authentication failed for both D365 and local user:', email);
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
        error: 'AUTHENTICATION_FAILED'
      });
    }

    // Get contact ID (use D365 contact ID if available, otherwise use user ID)
    let contactId = authenticatedUser.source === 'D365' ? authenticatedUser.id : null;
    if (!contactId) {
      try {
        const contact = await dynamics365Connection.getContactByEmail(email);
        contactId = contact?.contactid;
      } catch (crmError) {
        winston.warn('Failed to get contact from Dynamics 365:', crmError.message);
        // Don't fail login if CRM is unavailable
      }
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: authenticatedUser.id,
        email: authenticatedUser.email,
        contactId,
        source: authenticatedUser.source
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Update last login for local users only
    if (authenticatedUser.source === 'LOCAL' && user && typeof user.save === 'function') {
      try {
        user.lastLoginAt = new Date();
        await user.save();
        console.log('✅ Updated last login time for local user');
      } catch (saveError) {
        console.log('⚠️ Failed to update last login time:', saveError.message);
        // Don't fail login if we can't update last login time
      }
    }

    // Log successful login
    console.log('🎉 Login successful for user:', email, `(Source: ${authenticatedUser.source})`);
    winston.info(`User logged in: ${email} (Source: ${authenticatedUser.source})`);

    const responseData = {
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: authenticatedUser.id,
          firstName: authenticatedUser.firstName,
          lastName: authenticatedUser.lastName,
          fullName: authenticatedUser.fullName,
          email: authenticatedUser.email,
          phone: authenticatedUser.phone,
          company: authenticatedUser.company,
          jobTitle: authenticatedUser.jobTitle,
          city: authenticatedUser.city,
          country: authenticatedUser.country,
          interests: authenticatedUser.interests,
          lastLoginAt: authenticatedUser.lastLoginAt,
          source: authenticatedUser.source
        },
        token
      }
    };

    console.log('📤 Sending login success response:', { 
      ...responseData, 
      data: { ...responseData.data, token: '[HIDDEN]' } 
    });
    res.json(responseData);

  } catch (error) {
    winston.error('Login error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Internal server error during login',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   POST /api/auth/forgot-password
// @desc    Send password reset email
// @access  Public
router.post('/forgot-password', [
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email address')
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

    const { email } = req.body;

    // Check if user exists
    const user = await findUserByEmail(email);
    if (!user) {
      // Don't reveal if user exists or not for security
      return res.json({
        success: true,
        message: 'If an account with this email exists, a password reset link has been sent.'
      });
    }

    // Generate password reset token
    const resetToken = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Store reset token in user record
    user.passwordResetToken = resetToken;
    user.passwordResetExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    await user.save();

    // Send password reset email
    try {
      await sendPasswordResetEmail(email, user.firstName, resetToken);
    } catch (emailError) {
      winston.error('Failed to send password reset email:', emailError.message);
      return res.status(500).json({
        success: false,
        message: 'Failed to send password reset email. Please try again later.'
      });
    }

    winston.info(`Password reset requested for: ${email}`);

    res.json({
      success: true,
      message: 'If an account with this email exists, a password reset link has been sent.'
    });

  } catch (error) {
    winston.error('Forgot password error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   POST /api/auth/reset-password
// @desc    Reset password with token
// @access  Public
router.post('/reset-password', [
  body('token').notEmpty().withMessage('Reset token is required'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')
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

    const { token, password } = req.body;

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find user
    const user = await findUserByEmail(decoded.email);
    if (!user || user.passwordResetToken !== token) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token'
      });
    }

    // Check if token is expired
    if (user.passwordResetExpires < new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Reset token has expired'
      });
    }

    // Hash new password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Update password and clear reset token
    user.password = hashedPassword;
    user.passwordResetToken = null;
    user.passwordResetExpires = null;
    await user.save();

    winston.info(`Password reset successful for: ${user.email}`);

    res.json({
      success: true,
      message: 'Password has been reset successfully'
    });

  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid reset token'
      });
    }

    winston.error('Reset password error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router; 