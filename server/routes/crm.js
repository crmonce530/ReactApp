const express = require('express');
const winston = require('winston');

const router = express.Router();

// Import services and middleware
const dynamics365Connection = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

// @route   GET /api/crm/status
// @desc    Check Dynamics 365 connection status
// @access  Private
router.get('/status', authenticateToken, async (req, res) => {
  try {
    const isConnected = await dynamics365Connection.testConnection();
    
    res.json({
      success: true,
      data: {
        connected: isConnected,
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
      }
    });
  } catch (error) {
    winston.error('CRM status check error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to check CRM connection status',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   GET /api/crm/test-auth
// @desc    Test Dynamics 365 authentication (public endpoint for debugging)
// @access  Public
router.get('/test-auth', async (req, res) => {
  try {
    winston.info('Testing Dynamics 365 authentication...');
    
    // Test token generation
    const token = await dynamics365Connection.getAccessToken();
    
    // Test a simple API call
    const testResult = await dynamics365Connection.makeRequest('GET', 'WhoAmI');
    
    res.json({
      success: true,
      message: 'Dynamics 365 authentication successful',
      data: {
        hasToken: !!token,
        tokenLength: token ? token.length : 0,
        whoAmI: testResult
      }
    });
  } catch (error) {
    winston.error('Dynamics 365 authentication test failed:', error.message);
    res.status(500).json({
      success: false,
      message: 'Dynamics 365 authentication failed',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      details: process.env.NODE_ENV === 'development' ? error.response?.data : undefined
    });
  }
});

// @route   GET /api/crm/contacts
// @desc    Get contacts from Dynamics 365 (with pagination)
// @access  Private
router.get('/contacts', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const skip = (page - 1) * limit;
    
    let filter = '';
    if (search) {
      filter = `contains(firstname,'${search}') or contains(lastname,'${search}') or contains(emailaddress1,'${search}') or contains(companyname,'${search}')`;
    }
    
    const select = 'contactid,firstname,lastname,emailaddress1,telephone1,companyname,jobtitle,address1_city,address1_country,createdon,modifiedon';
    const orderBy = 'createdon desc';
    
    let url = `contacts?$select=${select}&$orderby=${orderBy}&$top=${limit}&$skip=${skip}`;
    if (filter) {
      url += `&$filter=${encodeURIComponent(filter)}`;
    }
    
    const result = await dynamics365Connection.makeRequest('GET', url);
    
    res.json({
      success: true,
      data: {
        contacts: result.value || [],
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: result['@odata.count'] || 0,
          pages: Math.ceil((result['@odata.count'] || 0) / limit)
        }
      }
    });
  } catch (error) {
    winston.error('Get contacts error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve contacts',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   GET /api/crm/contacts/:id
// @desc    Get specific contact from Dynamics 365
// @access  Private
router.get('/contacts/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const select = 'contactid,firstname,lastname,emailaddress1,telephone1,companyname,jobtitle,address1_city,address1_country,description,createdon,modifiedon,cr_website_signup_date,cr_signup_source,cr_interest_areas';
    
    const result = await dynamics365Connection.makeRequest('GET', `contacts(${id})?$select=${select}`);
    
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    winston.error('Get contact error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve contact',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   GET /api/crm/leads
// @desc    Get leads from Dynamics 365 (with pagination)
// @access  Private
router.get('/leads', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const skip = (page - 1) * limit;
    
    let filter = '';
    if (search) {
      filter = `contains(firstname,'${search}') or contains(lastname,'${search}') or contains(emailaddress1,'${search}') or contains(companyname,'${search}')`;
    }
    
    const select = 'leadid,firstname,lastname,emailaddress1,telephone1,companyname,jobtitle,subject,description,leadsourcecode,statecode,statuscode,createdon,modifiedon,cr_website_signup_date,cr_signup_source,cr_interest_areas';
    const orderBy = 'createdon desc';
    
    let url = `leads?$select=${select}&$orderby=${orderBy}&$top=${limit}&$skip=${skip}`;
    if (filter) {
      url += `&$filter=${encodeURIComponent(filter)}`;
    }
    
    const result = await dynamics365Connection.makeRequest('GET', url);
    
    res.json({
      success: true,
      data: {
        leads: result.value || [],
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: result['@odata.count'] || 0,
          pages: Math.ceil((result['@odata.count'] || 0) / limit)
        }
      }
    });
  } catch (error) {
    winston.error('Get leads error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve leads',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   GET /api/crm/leads/:id
// @desc    Get specific lead from Dynamics 365
// @access  Private
router.get('/leads/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const select = 'leadid,firstname,lastname,emailaddress1,telephone1,companyname,jobtitle,subject,description,leadsourcecode,statecode,statuscode,createdon,modifiedon,cr_website_signup_date,cr_signup_source,cr_interest_areas';
    
    const result = await dynamics365Connection.makeRequest('GET', `leads(${id})?$select=${select}`);
    
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    winston.error('Get lead error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve lead',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   GET /api/crm/stats
// @desc    Get CRM statistics and metrics
// @access  Private
router.get('/stats', authenticateToken, async (req, res) => {
  try {
    // Get total contacts count
    const contactsResult = await dynamics365Connection.makeRequest('GET', 'contacts?$count=true&$top=1');
    const totalContacts = contactsResult['@odata.count'] || 0;
    
    // Get total leads count
    const leadsResult = await dynamics365Connection.makeRequest('GET', 'leads?$count=true&$top=1');
    const totalLeads = leadsResult['@odata.count'] || 0;
    
    // Get recent contacts (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentContactsFilter = `createdon ge ${thirtyDaysAgo.toISOString()}`;
    const recentContactsResult = await dynamics365Connection.makeRequest('GET', `contacts?$filter=${encodeURIComponent(recentContactsFilter)}&$count=true&$top=1`);
    const recentContacts = recentContactsResult['@odata.count'] || 0;
    
    // Get recent leads (last 30 days)
    const recentLeadsResult = await dynamics365Connection.makeRequest('GET', `leads?$filter=${encodeURIComponent(recentContactsFilter)}&$count=true&$top=1`);
    const recentLeads = recentLeadsResult['@odata.count'] || 0;
    
    // Get leads by source
    const webLeadsFilter = `leadsourcecode eq 1`; // Web source
    const webLeadsResult = await dynamics365Connection.makeRequest('GET', `leads?$filter=${encodeURIComponent(webLeadsFilter)}&$count=true&$top=1`);
    const webLeads = webLeadsResult['@odata.count'] || 0;
    
    res.json({
      success: true,
      data: {
        totalContacts,
        totalLeads,
        recentContacts,
        recentLeads,
        webLeads,
        conversionRate: totalContacts > 0 ? ((webLeads / totalContacts) * 100).toFixed(2) : 0,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    winston.error('Get CRM stats error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve CRM statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   POST /api/crm/contacts/:id/convert
// @desc    Convert lead to contact in Dynamics 365
// @access  Private
router.post('/contacts/:id/convert', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { accountId, opportunityId } = req.body;
    
    // Prepare conversion data
    const conversionData = {
      LeadId: id,
      CreateAccount: accountId ? false : true,
      CreateContact: true,
      CreateOpportunity: opportunityId ? false : true,
      AccountId: accountId || null,
      OpportunityId: opportunityId || null
    };
    
    // Convert lead to contact
    const result = await dynamics365Connection.makeRequest('POST', 'ConvertLead', conversionData);
    
    winston.info(`Lead converted to contact: ${id}`);
    
    res.json({
      success: true,
      message: 'Lead converted successfully',
      data: result
    });
  } catch (error) {
    winston.error('Convert lead error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to convert lead',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   PUT /api/crm/leads/:id/status
// @desc    Update lead status in Dynamics 365
// @access  Private
router.put('/leads/:id/status', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { statecode, statuscode } = req.body;
    
    const updateData = {};
    if (statecode !== undefined) updateData.statecode = statecode;
    if (statuscode !== undefined) updateData.statuscode = statuscode;
    
    await dynamics365Connection.makeRequest('PATCH', `leads(${id})`, updateData);
    
    winston.info(`Lead status updated: ${id} - State: ${statecode}, Status: ${statuscode}`);
    
    res.json({
      success: true,
      message: 'Lead status updated successfully'
    });
  } catch (error) {
    winston.error('Update lead status error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to update lead status',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   GET /api/crm/export
// @desc    Export contacts/leads data from Dynamics 365
// @access  Private
router.get('/export', authenticateToken, async (req, res) => {
  try {
    const { type = 'contacts', format = 'json' } = req.query;
    
    if (!['contacts', 'leads'].includes(type)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid export type. Must be "contacts" or "leads"'
      });
    }
    
    if (!['json', 'csv'].includes(format)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid export format. Must be "json" or "csv"'
      });
    }
    
    // Get all records
    const select = type === 'contacts' 
      ? 'contactid,firstname,lastname,emailaddress1,telephone1,companyname,jobtitle,address1_city,address1_country,createdon,modifiedon'
      : 'leadid,firstname,lastname,emailaddress1,telephone1,companyname,jobtitle,subject,leadsourcecode,statecode,statuscode,createdon,modifiedon';
    
    const result = await dynamics365Connection.makeRequest('GET', `${type}?$select=${select}&$orderby=createdon desc`);
    
    if (format === 'csv') {
      // Convert to CSV format
      const records = result.value || [];
      if (records.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'No data to export'
        });
      }
      
      const headers = Object.keys(records[0]);
      const csvContent = [
        headers.join(','),
        ...records.map(record => 
          headers.map(header => {
            const value = record[header];
            return typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value;
          }).join(',')
        )
      ].join('\n');
      
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename="${type}_export_${new Date().toISOString().split('T')[0]}.csv"`);
      res.send(csvContent);
    } else {
      res.json({
        success: true,
        data: {
          type,
          count: result.value?.length || 0,
          records: result.value || [],
          exportedAt: new Date().toISOString()
        }
      });
    }
  } catch (error) {
    winston.error('Export data error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to export data',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router; 