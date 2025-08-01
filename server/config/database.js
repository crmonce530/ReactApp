const axios = require('axios');
const winston = require('winston');

class ValidationError extends Error {
  constructor(message, field = null, details = null) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
    this.details = details;
  }
}

class Dynamics365Connection {
  constructor() {
    // Use environment variables in production
    // this.baseUrl = process.env.D365_BASE_URL;
    // this.clientId = process.env.D365_CLIENT_ID;
    // this.clientSecret = process.env.D365_CLIENT_SECRET;
    // this.tenantId = process.env.D365_TENANT_ID;
    
    //this.baseUrl = 'https://crmonce.crm8.dynamics.com';
    //this.clientId = '03325407-0662-4bd0-b26a-d8e2af901616';
    //this.clientSecret = '';
    //this.tenantId = '9779951e-c823-4912-a9bd-6004a8467e81';

    this.accessToken = null;
    this.tokenExpiry = null;
  }

  async getAccessToken() {
    try {
      if (this.accessToken && this.tokenExpiry && new Date() < this.tokenExpiry) {
        return this.accessToken;
      }

      const tokenUrl = `https://login.microsoftonline.com/${this.tenantId}/oauth2/v2.0/token`;
      const params = new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: this.clientId,
        client_secret: this.clientSecret,
        scope: `${this.baseUrl}/.default`
      });

      console.log('🔐 Requesting token with:', {
        tokenUrl,
        client_id: this.clientId,
        tenant_id: this.tenantId,
        scope: `${this.baseUrl}/.default`
      });

      const response = await axios.post(tokenUrl, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });

      this.accessToken = response.data.access_token;
      this.tokenExpiry = new Date(Date.now() + 50 * 60 * 1000);

      winston.info('✅ Successfully obtained Dynamics 365 access token');
      return this.accessToken;

    } catch (error) {
      winston.error('❌ Error obtaining Dynamics 365 access token');
      if (error.response) {
        console.error('🔴 Azure AD Error Response:', {
          status: error.response.status,
          data: error.response.data
        });
      } else {
        console.error('🔴 Error Message:', error.message);
      }

      throw new Error('Failed to authenticate with Dynamics 365');
    }
  }

  async makeRequest(method, endpoint, data = null) {
    try {
      const token = await this.getAccessToken();
      const url = `${this.baseUrl}/api/data/v9.2/${endpoint}`;

      const config = {
        method,
        url,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'OData-MaxVersion': '4.0',
          'OData-Version': '4.0',
          'Prefer': 'return=representation' // This helps with getting response data
        }
      };

      if (data) {
        config.data = data;
      }

      const response = await axios(config);
      return response.data;
    } catch (error) {
      winston.error(`Dynamics 365 API error (${method} ${endpoint}):`, error.response?.data || error.message);
      
      // Enhanced error handling for Dynamics 365 validation errors
      if (error.response?.data) {
        const errorData = error.response.data;
        console.error('🔴 Full Dynamics 365 error details:', JSON.stringify(errorData, null, 2));
        
        // Parse Dynamics 365 specific error messages
        if (errorData.error) {
          const d365Error = errorData.error;
          let errorMessage = d365Error.message || 'Unknown Dynamics 365 error';
          
          // Check for field-specific validation errors
          if (d365Error.details && Array.isArray(d365Error.details)) {
            const fieldErrors = d365Error.details.map(detail => {
              return `Field: ${detail.target || 'unknown'} - ${detail.message || detail.code}`;
            });
            errorMessage += '\nField validation errors:\n' + fieldErrors.join('\n');
          }
          
          // Check for inner error details
          if (d365Error.innererror) {
            errorMessage += `\nInner error: ${d365Error.innererror.message}`;
          }
          
          throw new ValidationError(errorMessage, null, errorData);
        }
      }
      
      throw error;
    }
  }

  // Enhanced validation method with detailed field checking
  validateAndCleanData(data, requiredFields = [], fieldValidations = {}) {
    const cleanData = {};
    const validationErrors = [];
    
    // Check required fields first
    for (const field of requiredFields) {
      if (!data[field] || (typeof data[field] === 'string' && data[field].trim() === '')) {
        validationErrors.push(`Required field '${field}' is missing or empty`);
      }
    }

    // If required field validation fails, throw error immediately
    if (validationErrors.length > 0) {
      throw new ValidationError(
        `Validation failed for required fields:\n${validationErrors.join('\n')}`,
        requiredFields.find(field => !data[field] || (typeof data[field] === 'string' && data[field].trim() === '')),
        { requiredFields, providedFields: Object.keys(data) }
      );
    }

    // Clean and validate each field
    Object.keys(data).forEach(key => {
      const value = data[key];
      
      try {
        // Skip null, undefined values
        if (value === null || value === undefined) {
          return;
        }

        // Skip empty strings unless it's a required field
        if (value === '') {
          if (requiredFields.includes(key)) {
            validationErrors.push(`Required field '${key}' cannot be empty`);
          }
          return;
        }

        // Apply field-specific validations
        if (fieldValidations[key]) {
          const validation = fieldValidations[key];
          
          // Check data type
          if (validation.type && validation.type !== 'object' && typeof value !== validation.type) {
            validationErrors.push(`Field '${key}' must be of type ${validation.type}, got ${typeof value}`);
            return;
          }
          
          // Check if array is expected
          if (validation.isArray) {
            if (!Array.isArray(value) && typeof value !== 'string') {
              validationErrors.push(`Field '${key}' must be an array or string`);
              return;
            }
            // If it's an array, validate each element
            if (Array.isArray(value)) {
              for (let i = 0; i < value.length; i++) {
                if (typeof value[i] !== 'string') {
                  validationErrors.push(`Field '${key}' array element at index ${i} must be a string`);
                  return;
                }
              }
            }
          }
          
          // Check string length
          if (validation.maxLength && typeof value === 'string' && value.length > validation.maxLength) {
            validationErrors.push(`Field '${key}' exceeds maximum length of ${validation.maxLength} characters (current: ${value.length})`);
            return;
          }
          
          // Check email format
          if (validation.isEmail && typeof value === 'string') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
              validationErrors.push(`Field '${key}' must be a valid email address`);
              return;
            }
          }
          
          // Check phone format (basic)
          if (validation.isPhone && typeof value === 'string') {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            const cleanedPhone = value.replace(/[\s\-\(\)]/g, '');
            if (!phoneRegex.test(cleanedPhone)) {
              validationErrors.push(`Field '${key}' must be a valid phone number`);
              return;
            }
          }
          
          // Check date format
          if (validation.isDate && typeof value === 'string') {
            const date = new Date(value);
            if (isNaN(date.getTime())) {
              validationErrors.push(`Field '${key}' must be a valid date`);
              return;
            }
          }
        }

        // Handle different data types
        if (typeof value === 'string') {
          const trimmedValue = value.trim();
          if (trimmedValue.length > 0) {
            cleanData[key] = trimmedValue;
          }
        } else if (typeof value === 'number') {
          if (isNaN(value)) {
            validationErrors.push(`Field '${key}' contains invalid number`);
            return;
          }
          cleanData[key] = value;
        } else if (typeof value === 'boolean') {
          cleanData[key] = value;
        } else if (value instanceof Date) {
          cleanData[key] = value.toISOString();
        } else if (Array.isArray(value)) {
          // Validate array elements are strings for interests
          const invalidElements = value.filter(item => typeof item !== 'string');
          if (invalidElements.length > 0) {
            validationErrors.push(`Field '${key}' contains non-string elements: ${invalidElements.join(', ')}`);
            return;
          }
          cleanData[key] = value; // Keep as array for processing later
        } else {
          // Handle other object types
          cleanData[key] = value;
        }
      } catch (fieldError) {
        validationErrors.push(`Error processing field '${key}': ${fieldError.message}`);
      }
    });

    // Throw validation error if any field validations failed
    if (validationErrors.length > 0) {
      throw new ValidationError(
        `Field validation failed:\n${validationErrors.join('\n')}`,
        null,
        { errors: validationErrors, providedData: Object.keys(data) }
      );
    }

    return cleanData;
  }

  async createContact(contactData) {
    try {
      console.log('📥 Received contact data:', JSON.stringify(contactData, null, 2));
      
      // Define required fields and validations
      const requiredFields = ['firstName', 'lastName', 'email'];
      const fieldValidations = {
        firstName: { type: 'string', maxLength: 50 },
        lastName: { type: 'string', maxLength: 50 },
        email: { type: 'string', maxLength: 100, isEmail: true },
        phone: { type: 'string', maxLength: 50, isPhone: true },
        jobTitle: { type: 'string', maxLength: 100 },
        city: { type: 'string', maxLength: 80 },
        country: { type: 'string', maxLength: 80 },
        company: { type: 'string', maxLength: 160 },
        interests: { type: 'object', isArray: true }, // Can be array or string
        signupSource: { type: 'string', maxLength: 100 },
        websiteSignupDate: { type: 'string', isDate: true },
        new_password: { type: 'string', maxLength: 255 } // Add password field validation
      };

      // Validate input data first
      const validatedData = this.validateAndCleanData(contactData, requiredFields, fieldValidations);
      console.log('✅ Validation passed for contact data');
      
      const contactPayload = {
        firstname: validatedData.firstName,
        lastname: validatedData.lastName,
        emailaddress1: validatedData.email,
        ...(validatedData.phone && { telephone1: validatedData.phone }),
        ...(validatedData.jobTitle && { jobtitle: validatedData.jobTitle }),
        ...(validatedData.city && { address1_city: validatedData.city }),
        ...(validatedData.country && { address1_country: validatedData.country }),
        ...(validatedData.company && { 
          description: `Lead from CRMONCE website signup. Company: ${validatedData.company}${validatedData.jobTitle ? ', Job Title: ' + validatedData.jobTitle : ''}`
        }),
        // Set status - use standard Dynamics 365 fields
        statecode: 0, // Active
        statuscode: 1  // Active
      };

      // Add custom fields if they exist and are validated
      if (validatedData.interests) {
        contactPayload['new_interestareas'] = Array.isArray(validatedData.interests) 
          ? validatedData.interests.join(', ') 
          : validatedData.interests;
      }
      
      if (validatedData.websiteSignupDate) {
        contactPayload['new_websitesignupdate'] = validatedData.websiteSignupDate;
      } else {
        // Set current date if not provided
        contactPayload['new_websitesignupdate'] = new Date().toISOString();
      }
      
      if (validatedData.signupSource) {
        contactPayload['new_signupsource'] = validatedData.signupSource;
      } else {
        // Set default signup source
        contactPayload['new_signupsource'] = 'CRMONCE Website';
      }

      // Map new_password to password field if provided
      if (validatedData.new_password) {
        contactPayload['new_password'] = validatedData.new_password;
      }

      console.log('📤 Creating contact with payload:', JSON.stringify(contactPayload, null, 2));
      
      const result = await this.makeRequest('POST', 'contacts', contactPayload);
      winston.info(`✅ Contact created successfully: ${result.contactid}`);
      return result;
    } catch (error) {
      if (error instanceof ValidationError) {
        winston.error(`❌ Contact validation failed: ${error.message}`);
        console.error('🔴 Validation Error Details:', {
          field: error.field,
          details: error.details
        });
      } else {
        winston.error('❌ Error creating contact in Dynamics 365:', error.message);
      }
      throw error;
    }
  }

  async createLead(leadData) {
    try {
      console.log('📥 Received lead data:', JSON.stringify(leadData, null, 2));
      
      // Define required fields and validations
      const requiredFields = ['firstName', 'lastName', 'email'];
      const fieldValidations = {
        firstName: { type: 'string', maxLength: 50 },
        lastName: { type: 'string', maxLength: 50 },
        email: { type: 'string', maxLength: 100, isEmail: true },
        phone: { type: 'string', maxLength: 50, isPhone: true },
        jobTitle: { type: 'string', maxLength: 100 },
        company: { type: 'string', maxLength: 160 },
        interests: { type: 'object', isArray: true }, // Can be array or string
        signupSource: { type: 'string', maxLength: 100 },
        websiteSignupDate: { type: 'string', isDate: true },
        new_password: { type: 'string', maxLength: 255 } // Add password field validation
      };

      // Validate input data first
      const validatedData = this.validateAndCleanData(leadData, requiredFields, fieldValidations);
      console.log('✅ Validation passed for lead data');
      
      const leadPayload = {
        firstname: validatedData.firstName,
        lastname: validatedData.lastName,
        emailaddress1: validatedData.email,
        ...(validatedData.phone && { telephone1: validatedData.phone }),
        ...(validatedData.jobTitle && { jobtitle: validatedData.jobTitle }),
        ...(validatedData.company && { companyname: validatedData.company }),
        subject: `New Lead from CRMONCE Website${validatedData.company ? ' - ' + validatedData.company : ''}`,
        description: `Lead generated from CRMONCE website signup form.${validatedData.company ? ' Company: ' + validatedData.company : ''}${validatedData.jobTitle ? ', Job Title: ' + validatedData.jobTitle : ''}${validatedData.interests ? ', Interests: ' + (Array.isArray(validatedData.interests) ? validatedData.interests.join(', ') : validatedData.interests) : ''}`,
        // Set lead source - use standard option set values
        leadsourcecode: 1, // Web
        // Set status
        statecode: 0, // Open
        statuscode: 1  // New
      };

      // Add custom fields if they exist and are validated
      if (validatedData.interests) {
        leadPayload['new_interestareas'] = Array.isArray(validatedData.interests) 
          ? validatedData.interests.join(', ') 
          : validatedData.interests;
      }
      
      if (validatedData.websiteSignupDate) {
        leadPayload['new_websitesignupdate'] = validatedData.websiteSignupDate;
      } else {
        // Set current date if not provided
        leadPayload['new_websitesignupdate'] = new Date().toISOString();
      }
      
      if (validatedData.signupSource) {
        leadPayload['new_signupsource'] = validatedData.signupSource;
      } else {
        // Set default signup source
        leadPayload['new_signupsource'] = 'CRMONCE Website';
      }

      // Map new_password to password field if provided
      if (validatedData.new_password) {
        leadPayload['new_password'] = validatedData.new_password;
      }

      console.log('📤 Creating lead with payload:', JSON.stringify(leadPayload, null, 2));

      const result = await this.makeRequest('POST', 'leads', leadPayload);
      winston.info(`✅ Lead created successfully: ${result.leadid}`);
      return result;
    } catch (error) {
      if (error instanceof ValidationError) {
        winston.error(`❌ Lead validation failed: ${error.message}`);
        console.error('🔴 Validation Error Details:', {
          field: error.field,
          details: error.details
        });
      } else {
        winston.error('❌ Error creating lead in Dynamics 365:', error.message);
      }
      throw error;
    }
  }

  async getContactByEmail(email) {
    try {
      if (!email || typeof email !== 'string') {
        throw new ValidationError('Valid email address is required', 'email');
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new ValidationError('Invalid email format', 'email');
      }

      const filter = `emailaddress1 eq '${email.replace(/'/g, "''")}'`; // Escape single quotes
      const result = await this.makeRequest('GET', `contacts?$filter=${encodeURIComponent(filter)}`);
      return result.value && result.value.length > 0 ? result.value[0] : null;
    } catch (error) {
      if (error instanceof ValidationError) {
        winston.error(`❌ Email validation failed: ${error.message}`);
      } else {
        winston.error('❌ Error getting contact by email:', error.message);
      }
      throw error;
    }
  }

  async getContactDetailsByEmail(email) {
    try {
      if (!email || typeof email !== 'string') {
        throw new ValidationError('Valid email address is required', 'email');
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new ValidationError('Invalid email format', 'email');
      }

      console.log('🔍 Fetching contact details from D365 for email:', email);

      const filter = `emailaddress1 eq '${email.replace(/'/g, "''")}'`; // Escape single quotes
      const select = 'contactid,firstname,lastname,emailaddress1,new_password,telephone1,jobtitle,address1_city,address1_country,new_interestareas,new_websitesignupdate,new_signupsource';
      
      const result = await this.makeRequest('GET', `contacts?$filter=${encodeURIComponent(filter)}&$select=${encodeURIComponent(select)}`);
      
      if (result.value && result.value.length > 0) {
        const contact = result.value[0];
        console.log('✅ Contact found in D365:', {
          id: contact.contactid,
          firstName: contact.firstname,
          lastName: contact.lastname,
          email: contact.emailaddress1,
          hasPassword: !!contact.new_password,
          phone: contact.telephone1,
          jobTitle: contact.jobtitle,
          city: contact.address1_city,
          country: contact.address1_country,
          interests: contact.new_interestareas,
          signupDate: contact.new_websitesignupdate,
          signupSource: contact.new_signupsource
        });
        
        return {
          id: contact.contactid,
          firstName: contact.firstname,
          lastName: contact.lastname,
          fullName: `${contact.firstname || ''} ${contact.lastname || ''}`.trim(),
          email: contact.emailaddress1,
          password: contact.new_password,
          phone: contact.telephone1,
          jobTitle: contact.jobtitle,
          city: contact.address1_city,
          country: contact.address1_country,
          interests: contact.new_interestareas,
          signupDate: contact.new_websitesignupdate,
          signupSource: contact.new_signupsource
        };
      }
      
      console.log('❌ No contact found in D365 for email:', email);
      return null;
    } catch (error) {
      winston.error('❌ Error getting contact details from D365:', error.message);
      throw error;
    }
  }

  async updateContact(contactId, updateData) {
    try {
      if (!contactId) {
        throw new ValidationError('Contact ID is required', 'contactId');
      }

      console.log('📥 Received update data:', JSON.stringify(updateData, null, 2));

      // Define field validations for updates (no required fields for updates)
      const fieldValidations = {
        firstName: { type: 'string', maxLength: 50 },
        lastName: { type: 'string', maxLength: 50 },
        email: { type: 'string', maxLength: 100, isEmail: true },
        phone: { type: 'string', maxLength: 50, isPhone: true },
        jobTitle: { type: 'string', maxLength: 100 },
        city: { type: 'string', maxLength: 80 },
        country: { type: 'string', maxLength: 80 },
        company: { type: 'string', maxLength: 160 },
        interests: { type: 'object', isArray: true },
        signupSource: { type: 'string', maxLength: 100 }
        };

      // Clean the update data
      const cleanUpdateData = this.validateAndCleanData(updateData, [], fieldValidations);
      console.log('✅ Validation passed for update data');
      
      console.log('📤 Updating contact with payload:', JSON.stringify(cleanUpdateData, null, 2));

      const result = await this.makeRequest('PATCH', `contacts(${contactId})`, cleanUpdateData);
      winston.info(`✅ Contact updated successfully: ${contactId}`);
      return result;
    } catch (error) {
      if (error instanceof ValidationError) {
        winston.error(`❌ Contact update validation failed: ${error.message}`);
        console.error('🔴 Validation Error Details:', {
          field: error.field,
          details: error.details
        });
      } else {
        winston.error('❌ Error updating contact in Dynamics 365:', error.message);
      }
      throw error;
    }
  }

  async testConnection() {
    try {
      const result = await this.makeRequest('GET', 'WhoAmI');
      winston.info('✅ Dynamics 365 connection test successful');
      console.log('✅ Connection test result:', result);
      return true;
    } catch (error) {
      winston.error('❌ Dynamics 365 connection test failed:', error.message);
      return false;
    }
  }

  // Method to check what fields are available for an entity
  async getEntityMetadata(entityName) {
    try {
      const result = await this.makeRequest('GET', `EntityDefinitions(LogicalName='${entityName}')?$select=LogicalName&$expand=Attributes($select=LogicalName,AttributeType)`);
      console.log(`📊 Available fields for ${entityName}:`, result.Attributes.map(attr => attr.LogicalName));
      return result;
    } catch (error) {
      winston.error(`❌ Error getting metadata for ${entityName}:`, error.message);
      throw error;
    }
  }
}

// Create singleton instance
const dynamics365Connection = new Dynamics365Connection();

module.exports = { Dynamics365Connection, ValidationError, dynamics365Connection };