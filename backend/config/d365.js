const axios = require('axios');
const logger = require('./logger');

class Dynamics365Service {
  constructor() {
    this.baseUrl = process.env.D365_BASE_URL || 'https://your-org.crm.dynamics.com';
    this.clientId = process.env.D365_CLIENT_ID;
    this.clientSecret = process.env.D365_CLIENT_SECRET;
    this.tenantId = process.env.D365_TENANT_ID;
    this.accessToken = null;
    this.tokenExpiry = null;
  }

  async getAccessToken() {
    try {
      if (this.accessToken && this.tokenExpiry && Date.now() < this.tokenExpiry) {
        return this.accessToken;
      }

      const tokenUrl = `https://login.microsoftonline.com/${this.tenantId}/oauth2/token`;
      const params = new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: this.clientId,
        client_secret: this.clientSecret,
        resource: this.baseUrl
      });

      const response = await axios.post(tokenUrl, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      this.accessToken = response.data.access_token;
      this.tokenExpiry = Date.now() + (response.data.expires_in * 1000);

      logger.info('Dynamics 365 access token obtained successfully');
      return this.accessToken;
    } catch (error) {
      logger.error('Error obtaining Dynamics 365 access token:', error);
      throw new Error('Failed to authenticate with Dynamics 365');
    }
  }

  async makeRequest(endpoint, method = 'GET', data = null) {
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
          'OData-Version': '4.0'
        }
      };

      if (data) {
        config.data = data;
      }

      const response = await axios(config);
      return response.data;
    } catch (error) {
      logger.error(`Dynamics 365 API error (${endpoint}):`, error);
      throw error;
    }
  }

  // Contact Management
  async createContact(contactData) {
    const data = {
      firstname: contactData.firstName,
      lastname: contactData.lastName,
      emailaddress1: contactData.email,
      telephone1: contactData.phone,
      jobtitle: contactData.jobTitle,
      companyname: contactData.company
    };

    return await this.makeRequest('contacts', 'POST', data);
  }

  async updateContact(contactId, contactData) {
    const data = {
      firstname: contactData.firstName,
      lastname: contactData.lastName,
      emailaddress1: contactData.email,
      telephone1: contactData.phone,
      jobtitle: contactData.jobTitle,
      companyname: contactData.company
    };

    return await this.makeRequest(`contacts(${contactId})`, 'PATCH', data);
  }

  async getContact(contactId) {
    return await this.makeRequest(`contacts(${contactId})?$select=contactid,firstname,lastname,emailaddress1,telephone1,jobtitle,companyname`);
  }

  async getContacts(filter = '', select = 'contactid,firstname,lastname,emailaddress1,telephone1,jobtitle,companyname') {
    let endpoint = `contacts?$select=${select}`;
    if (filter) {
      endpoint += `&$filter=${filter}`;
    }
    return await this.makeRequest(endpoint);
  }

  // Account Management
  async createAccount(accountData) {
    const data = {
      name: accountData.name,
      telephone1: accountData.phone,
      emailaddress1: accountData.email,
      websiteurl: accountData.website,
      address1_city: accountData.city,
      address1_country: accountData.country
    };

    return await this.makeRequest('accounts', 'POST', data);
  }

  async updateAccount(accountId, accountData) {
    const data = {
      name: accountData.name,
      telephone1: accountData.phone,
      emailaddress1: accountData.email,
      websiteurl: accountData.website,
      address1_city: accountData.city,
      address1_country: accountData.country
    };

    return await this.makeRequest(`accounts(${accountId})`, 'PATCH', data);
  }

  async getAccount(accountId) {
    return await this.makeRequest(`accounts(${accountId})?$select=accountid,name,telephone1,emailaddress1,websiteurl,address1_city,address1_country`);
  }

  async getAccounts(filter = '', select = 'accountid,name,telephone1,emailaddress1,websiteurl,address1_city,address1_country') {
    let endpoint = `accounts?$select=${select}`;
    if (filter) {
      endpoint += `&$filter=${filter}`;
    }
    return await this.makeRequest(endpoint);
  }

  // Lead Management
  async createLead(leadData) {
    const data = {
      firstname: leadData.firstName,
      lastname: leadData.lastName,
      emailaddress1: leadData.email,
      telephone1: leadData.phone,
      companyname: leadData.company,
      subject: leadData.subject,
      description: leadData.description
    };

    return await this.makeRequest('leads', 'POST', data);
  }

  async updateLead(leadId, leadData) {
    const data = {
      firstname: leadData.firstName,
      lastname: leadData.lastName,
      emailaddress1: leadData.email,
      telephone1: leadData.phone,
      companyname: leadData.company,
      subject: leadData.subject,
      description: leadData.description
    };

    return await this.makeRequest(`leads(${leadId})`, 'PATCH', data);
  }

  async getLead(leadId) {
    return await this.makeRequest(`leads(${leadId})?$select=leadid,firstname,lastname,emailaddress1,telephone1,companyname,subject,description,statecode,statuscode`);
  }

  async getLeads(filter = '', select = 'leadid,firstname,lastname,emailaddress1,telephone1,companyname,subject,description,statecode,statuscode') {
    let endpoint = `leads?$select=${select}`;
    if (filter) {
      endpoint += `&$filter=${filter}`;
    }
    return await this.makeRequest(endpoint);
  }

  // Opportunity Management
  async createOpportunity(opportunityData) {
    const data = {
      name: opportunityData.name,
      estimatedvalue: opportunityData.estimatedValue,
      estimatedclosedate: opportunityData.estimatedCloseDate,
      description: opportunityData.description,
      stepname: opportunityData.stageName
    };

    return await this.makeRequest('opportunities', 'POST', data);
  }

  async updateOpportunity(opportunityId, opportunityData) {
    const data = {
      name: opportunityData.name,
      estimatedvalue: opportunityData.estimatedValue,
      estimatedclosedate: opportunityData.estimatedCloseDate,
      description: opportunityData.description,
      stepname: opportunityData.stageName
    };

    return await this.makeRequest(`opportunities(${opportunityId})`, 'PATCH', data);
  }

  async getOpportunity(opportunityId) {
    return await this.makeRequest(`opportunities(${opportunityId})?$select=opportunityid,name,estimatedvalue,estimatedclosedate,description,stepname,statecode,statuscode`);
  }

  async getOpportunities(filter = '', select = 'opportunityid,name,estimatedvalue,estimatedclosedate,description,stepname,statecode,statuscode') {
    let endpoint = `opportunities?$select=${select}`;
    if (filter) {
      endpoint += `&$filter=${filter}`;
    }
    return await this.makeRequest(endpoint);
  }

  // Dashboard Data
  async getDashboardData() {
    try {
      const [contacts, leads, opportunities] = await Promise.all([
        this.getContacts('', 'contactid'),
        this.getLeads('', 'leadid'),
        this.getOpportunities('', 'opportunityid,estimatedvalue')
      ]);

      const totalContacts = contacts.value?.length || 0;
      const totalLeads = leads.value?.length || 0;
      const totalOpportunities = opportunities.value?.length || 0;
      const totalValue = opportunities.value?.reduce((sum, opp) => sum + (opp.estimatedvalue || 0), 0) || 0;

      return {
        totalContacts,
        totalLeads,
        totalOpportunities,
        totalValue,
        recentActivities: await this.getRecentActivities()
      };
    } catch (error) {
      logger.error('Error getting dashboard data:', error);
      throw error;
    }
  }

  async getRecentActivities() {
    try {
      // Get recent contacts, leads, and opportunities
      const [recentContacts, recentLeads, recentOpportunities] = await Promise.all([
        this.getContacts('', 'contactid,firstname,lastname,createdon').then(data => data.value?.slice(0, 5) || []),
        this.getLeads('', 'leadid,firstname,lastname,companyname,createdon').then(data => data.value?.slice(0, 5) || []),
        this.getOpportunities('', 'opportunityid,name,estimatedvalue,createdon').then(data => data.value?.slice(0, 5) || [])
      ]);

      const activities = [];

      // Add recent contacts
      recentContacts.forEach(contact => {
        activities.push({
          id: contact.contactid,
          type: 'contact',
          title: `New Contact: ${contact.firstname} ${contact.lastname}`,
          description: `Contact created on ${new Date(contact.createdon).toLocaleDateString()}`,
          timestamp: new Date(contact.createdon),
          status: 'completed'
        });
      });

      // Add recent leads
      recentLeads.forEach(lead => {
        activities.push({
          id: lead.leadid,
          type: 'lead',
          title: `New Lead: ${lead.firstname} ${lead.lastname}`,
          description: `Lead from ${lead.companyname} created on ${new Date(lead.createdon).toLocaleDateString()}`,
          timestamp: new Date(lead.createdon),
          status: 'pending'
        });
      });

      // Add recent opportunities
      recentOpportunities.forEach(opp => {
        activities.push({
          id: opp.opportunityid,
          type: 'opportunity',
          title: `New Opportunity: ${opp.name}`,
          description: `Opportunity worth $${opp.estimatedvalue?.toLocaleString() || 0} created on ${new Date(opp.createdon).toLocaleDateString()}`,
          timestamp: new Date(opp.createdon),
          status: 'pending'
        });
      });

      // Sort by timestamp and return top 10
      return activities
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, 10);
    } catch (error) {
      logger.error('Error getting recent activities:', error);
      return [];
    }
  }
}

module.exports = new Dynamics365Service(); 