const { dynamics365Connection } = require('../server/config/database.js');

async function testPasswordMappingVerification() {
  console.log('🧪 Testing Password Field Mapping Verification...\n');

  const testData = {
    firstName: 'Test',
    lastName: 'PasswordVerification',
    email: `test-password-verification-${Date.now()}@example.com`,
    phone: '+1234567890',
    company: 'Test Company',
    jobTitle: 'Test Position',
    city: 'Test City',
    country: 'Test Country',
    interests: ['Testing', 'Password', 'Verification'],
    new_password: 'TestPassword123!' // This should be mapped correctly
  };

  console.log('📤 Testing contact creation with password mapping...');
  console.log('📝 Test data:', {
    ...testData,
    new_password: '[HIDDEN]'
  });

  try {
    // Test the createContact method directly
    const result = await dynamics365Connection.createContact(testData);
    
    console.log('✅ Contact created successfully!');
    console.log('📊 Result:', {
      contactId: result.contactid,
      firstName: result.firstname,
      lastName: result.lastname,
      email: result.emailaddress1
    });
    
    console.log('\n🔍 Password field should now be populated in Dynamics 365!');
    console.log('📝 Check the contact record in Dynamics 365 to verify the password field is not empty.');

  } catch (error) {
    console.log('❌ Contact creation failed:');
    console.log('Error:', error.message);
    
    if (error.details) {
      console.log('Details:', JSON.stringify(error.details, null, 2));
    }
  }
}

// Run the test
testPasswordMappingVerification().catch(console.error); 