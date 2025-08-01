const dynamics365Connection = require('../server/config/database');
const winston = require('winston');

// Configure winston for console output
winston.configure({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'd365-fields-verify' },
  transports: [
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

async function verifyDynamics365Fields() {
  console.log('🔍 Verifying Dynamics 365 Custom Fields...\n');

  try {
    // Test 1: Check if environment variables are set
    console.log('1. Checking environment variables...');
    const requiredVars = ['D365_BASE_URL', 'D365_CLIENT_ID', 'D365_CLIENT_SECRET', 'D365_TENANT_ID'];
    const missingVars = requiredVars.filter(varName => !process.env[varName]);
    
    if (missingVars.length > 0) {
      console.log('❌ Missing environment variables:', missingVars.join(', '));
      console.log('Please check your .env file and ensure all Dynamics 365 variables are set.\n');
      return false;
    }
    console.log('✅ All environment variables are set\n');

    // Test 2: Test authentication
    console.log('2. Testing authentication...');
    const token = await dynamics365Connection.getAccessToken();
    if (token) {
      console.log('✅ Authentication successful\n');
    } else {
      console.log('❌ Authentication failed\n');
      return false;
    }

    // Test 3: Get Contact entity metadata
    console.log('3. Retrieving Contact entity metadata...');
    try {
      const metadata = await dynamics365Connection.makeRequest('GET', 'EntityDefinitions(LogicalName=\'contact\')/Attributes');
      console.log('✅ Contact entity metadata retrieved\n');
    } catch (error) {
      console.log('❌ Failed to retrieve Contact entity metadata');
      console.log(`   Error: ${error.message}\n`);
      return false;
    }

    // Test 4: Check for custom fields
    console.log('4. Checking for required custom fields...');
    const requiredFields = [
      'cr_website_signup_date',
      'cr_signup_source', 
      'cr_interest_areas'
    ];

    const fieldStatus = {};

    for (const fieldName of requiredFields) {
      try {
        const fieldMetadata = await dynamics365Connection.makeRequest('GET', `EntityDefinitions(LogicalName='contact')/Attributes(LogicalName='${fieldName}')`);
        fieldStatus[fieldName] = {
          exists: true,
          displayName: fieldMetadata.DisplayName?.UserLocalizedLabel?.Label || fieldName,
          dataType: fieldMetadata.AttributeType || 'Unknown'
        };
        console.log(`✅ Field "${fieldName}" exists (${fieldStatus[fieldName].displayName})`);
      } catch (error) {
        fieldStatus[fieldName] = {
          exists: false,
          error: error.message
        };
        console.log(`❌ Field "${fieldName}" not found`);
      }
    }

    console.log('\n5. Field Status Summary:');
    console.log('========================');
    
    const missingFields = [];
    for (const [fieldName, status] of Object.entries(fieldStatus)) {
      if (status.exists) {
        console.log(`✅ ${fieldName}: ${status.displayName} (${status.dataType})`);
      } else {
        console.log(`❌ ${fieldName}: Missing - ${status.error}`);
        missingFields.push(fieldName);
      }
    }

    if (missingFields.length > 0) {
      console.log(`\n⚠️  Missing fields: ${missingFields.join(', ')}`);
      console.log('Please create these fields in Dynamics 365 following the guide in D365_CUSTOM_FIELDS_GUIDE.md');
      return false;
    }

    // Test 5: Test contact creation with custom fields
    console.log('\n6. Testing contact creation with custom fields...');
    const testContactData = {
      firstName: 'Test',
      lastName: 'CustomFields',
      email: `test-fields-${Date.now()}@example.com`,
      phone: '+1234567890',
      company: 'Test Company',
      jobTitle: 'Test Position',
      city: 'Test City',
      country: 'Test Country',
      interests: ['Testing', 'Custom Fields', 'Integration']
    };

    try {
      const contact = await dynamics365Connection.createContact(testContactData);
      console.log('✅ Contact created successfully with custom fields');
      console.log(`   Contact ID: ${contact.contactid}`);
      console.log(`   Email: ${contact.emailaddress1}`);
      
      // Clean up - delete the test contact
      console.log('\n7. Cleaning up test contact...');
      try {
        await dynamics365Connection.makeRequest('DELETE', `contacts(${contact.contactid})`);
        console.log('✅ Test contact deleted successfully\n');
      } catch (deleteError) {
        console.log('⚠️  Could not delete test contact (this is normal if you don\'t have delete permissions)');
        console.log(`   You may need to manually delete contact: ${contact.contactid}\n`);
      }
    } catch (contactError) {
      console.log('❌ Contact creation failed');
      console.log(`   Error: ${contactError.message}\n`);
      return false;
    }

    console.log('🎉 All custom fields are properly configured and working!');
    console.log('✅ Dynamics 365 integration is ready for production use.');
    return true;

  } catch (error) {
    console.log('❌ Verification failed with error:', error.message);
    console.log('Stack trace:', error.stack);
    return false;
  }
}

// Run the verification if this script is executed directly
if (require.main === module) {
  // Load environment variables
  require('dotenv').config();
  
  verifyDynamics365Fields()
    .then(success => {
      process.exit(success ? 0 : 1);
    })
    .catch(error => {
      console.error('Unexpected error:', error);
      process.exit(1);
    });
}

module.exports = { verifyDynamics365Fields }; 