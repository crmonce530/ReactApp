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
  defaultMeta: { service: 'd365-test' },
  transports: [
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

async function testDynamics365Connection() {
  console.log('🔍 Testing Dynamics 365 Connection...\n');

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

    // Test 3: Test API connection
    console.log('3. Testing API connection...');
    const connectionTest = await dynamics365Connection.testConnection();
    if (connectionTest) {
      console.log('✅ API connection successful\n');
    } else {
      console.log('❌ API connection failed\n');
      return false;
    }

    // Test 4: Test contact creation (optional)
    console.log('4. Testing contact creation...');
    const testContactData = {
      firstName: 'Test',
      lastName: 'User',
      email: `test-${Date.now()}@example.com`,
      phone: '+1234567890',
      company: 'Test Company',
      jobTitle: 'Test Position',
      city: 'Test City',
      country: 'Test Country',
      interests: ['Testing', 'Integration']
    };

    try {
      const contact = await dynamics365Connection.createContact(testContactData);
      console.log('✅ Contact created successfully');
      console.log(`   Contact ID: ${contact.contactid}`);
      console.log(`   Email: ${contact.emailaddress1}\n`);
      
      // Clean up - delete the test contact
      console.log('5. Cleaning up test contact...');
      try {
        await dynamics365Connection.makeRequest('DELETE', `contacts(${contact.contactid})`);
        console.log('✅ Test contact deleted successfully\n');
      } catch (deleteError) {
        console.log('⚠️  Could not delete test contact (this is normal if you don\'t have delete permissions)');
        console.log(`   You may need to manually delete contact: ${contact.contactid}\n`);
      }
    } catch (contactError) {
      console.log('❌ Contact creation failed');
      console.log('   This might be due to missing custom fields or permissions');
      console.log(`   Error: ${contactError.message}\n`);
    }

    console.log('🎉 Dynamics 365 integration test completed!');
    return true;

  } catch (error) {
    console.log('❌ Test failed with error:', error.message);
    console.log('Stack trace:', error.stack);
    return false;
  }
}

// Run the test if this script is executed directly
if (require.main === module) {
  // Load environment variables
  require('dotenv').config();
  
  testDynamics365Connection()
    .then(success => {
      process.exit(success ? 0 : 1);
    })
    .catch(error => {
      console.error('Unexpected error:', error);
      process.exit(1);
    });
}

module.exports = { testDynamics365Connection }; 