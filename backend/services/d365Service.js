const axios = require('axios');
const logger = require('../utils/logger');

class D365Service {
  constructor() {
    this.baseUrl = process.env.D365_BASE_URL;
    this.clientId = process.env.D365_CLIENT_ID;
    this.clientSecret = process.env.D365_CLIENT_SECRET;
    this.tenantId = process.env.D365_TENANT_ID;
    this.accessToken = null;
    this.tokenExpiry = null;
  }

  // Get access token for D365 API
  async getAccessToken() {
    try {
      // Check if we have a valid token
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

      const response = await axios.post(tokenUrl, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      this.accessToken = response.data.access_token;
      this.tokenExpiry = new Date(Date.now() + (response.data.expires_in * 1000));

      logger.info('D365 access token obtained successfully');
      return this.accessToken;

    } catch (error) {
      logger.error('Error getting D365 access token:', error);
      throw new Error('Failed to authenticate with Dynamics 365');
    }
  }

  // Create or update contact in D365
  async createOrUpdateContact(user) {
    try {
      const token = await this.getAccessToken();
      
      const contactData = {
        firstname: user.firstName,
        lastname: user.lastName,
        emailaddress1: user.email,
        telephone1: user.phone,
        jobtitle: this.mapRoleToJobTitle(user.role),
        // Add custom fields for CRMOnce integration
        'cr_companyname': user.company,
        'cr_crmonceuserid': user._id.toString(),
        'cr_syncstatus': 'synced',
        'cr_lastmodified': new Date().toISOString()
      };

      let response;
      
      if (user.d365ContactId) {
        // Update existing contact
        response = await axios.patch(
          `${this.baseUrl}/api/data/v9.2/contacts(${user.d365ContactId})`,
          contactData,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
              'If-Match': '*'
            }
          }
        );
        logger.info(`Updated D365 contact for user ${user._id}`);
      } else {
        // Create new contact
        response = await axios.post(
          `${this.baseUrl}/api/data/v9.2/contacts`,
          contactData,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        
        // Extract the new contact ID from the response
        const contactId = response.headers['odata-entityid']?.split('(')[1]?.split(')')[0];
        if (contactId) {
          user.d365ContactId = contactId;
          await user.save();
        }
        
        logger.info(`Created D365 contact for user ${user._id}`);
      }

      return response.data;

    } catch (error) {
      logger.error('Error creating/updating D365 contact:', error);
      throw new Error('Failed to sync contact with Dynamics 365');
    }
  }

  // Create or update account in D365
  async createOrUpdateAccount(user) {
    try {
      const token = await this.getAccessToken();
      
      const accountData = {
        name: user.company,
        telephone1: user.phone,
        emailaddress1: user.email,
        // Add custom fields for CRMOnce integration
        'cr_crmonceuserid': user._id.toString(),
        'cr_syncstatus': 'synced',
        'cr_lastmodified': new Date().toISOString()
      };

      let response;
      
      if (user.d365AccountId) {
        // Update existing account
        response = await axios.patch(
          `${this.baseUrl}/api/data/v9.2/accounts(${user.d365AccountId})`,
          accountData,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
              'If-Match': '*'
            }
          }
        );
        logger.info(`Updated D365 account for user ${user._id}`);
      } else {
        // Create new account
        response = await axios.post(
          `${this.baseUrl}/api/data/v9.2/accounts`,
          accountData,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        
        // Extract the new account ID from the response
        const accountId = response.headers['odata-entityid']?.split('(')[1]?.split(')')[0];
        if (accountId) {
          user.d365AccountId = accountId;
          await user.save();
        }
        
        logger.info(`Created D365 account for user ${user._id}`);
      }

      return response.data;

    } catch (error) {
      logger.error('Error creating/updating D365 account:', error);
      throw new Error('Failed to sync account with Dynamics 365');
    }
  }

  // Sync user to D365 (both contact and account)
  async syncUserToD365(user) {
    try {
      logger.info(`Starting D365 sync for user ${user._id}`);

      // Sync account first
      await this.createOrUpdateAccount(user);
      
      // Then sync contact
      await this.createOrUpdateContact(user);

      logger.info(`Completed D365 sync for user ${user._id}`);
      return true;

    } catch (error) {
      logger.error(`D365 sync failed for user ${user._id}:`, error);
      throw error;
    }
  }

  // Get contact from D365
  async getContact(contactId) {
    try {
      const token = await this.getAccessToken();
      
      const response = await axios.get(
        `${this.baseUrl}/api/data/v9.2/contacts(${contactId})`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data;

    } catch (error) {
      logger.error('Error getting D365 contact:', error);
      throw new Error('Failed to retrieve contact from Dynamics 365');
    }
  }

  // Get account from D365
  async getAccount(accountId) {
    try {
      const token = await this.getAccessToken();
      
      const response = await axios.get(
        `${this.baseUrl}/api/data/v9.2/accounts(${accountId})`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data;

    } catch (error) {
      logger.error('Error getting D365 account:', error);
      throw new Error('Failed to retrieve account from Dynamics 365');
    }
  }

  // Search contacts in D365
  async searchContacts(query) {
    try {
      const token = await this.getAccessToken();
      
      const response = await axios.get(
        `${this.baseUrl}/api/data/v9.2/contacts?$filter=contains(firstname,'${query}') or contains(lastname,'${query}') or contains(emailaddress1,'${query}')&$select=contactid,firstname,lastname,emailaddress1,telephone1`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data.value;

    } catch (error) {
      logger.error('Error searching D365 contacts:', error);
      throw new Error('Failed to search contacts in Dynamics 365');
    }
  }

  // Map CRMOnce role to D365 job title
  mapRoleToJobTitle(role) {
    const roleMapping = {
      'owner': 'Business Owner',
      'manager': 'Manager',
      'sales': 'Sales Representative',
      'marketing': 'Marketing Specialist',
      'admin': 'Administrator',
      'other': 'Other'
    };
    
    return roleMapping[role] || 'Other';
  }

  // Test D365 connection
  async testConnection() {
    try {
      const token = await this.getAccessToken();
      
      const response = await axios.get(
        `${this.baseUrl}/api/data/v9.2/WhoAmI`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      logger.info('D365 connection test successful');
      return response.data;

    } catch (error) {
      logger.error('D365 connection test failed:', error);
      throw new Error('Failed to connect to Dynamics 365');
    }
  }
}

// Create singleton instance
const d365Service = new D365Service();

// Export functions for use in routes
module.exports = {
  syncUserToD365: (user) => d365Service.syncUserToD365(user),
  getContact: (contactId) => d365Service.getContact(contactId),
  getAccount: (accountId) => d365Service.getAccount(accountId),
  searchContacts: (query) => d365Service.searchContacts(query),
  testConnection: () => d365Service.testConnection()
}; 