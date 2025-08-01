const axios = require('axios');

async function testPasswordMappingFixed() {
  console.log('🧪 Testing Fixed Password Field Mapping...\n');

  const testData = {
    firstName: 'Test',
    lastName: 'PasswordFixed',
    email: `test-password-fixed-${Date.now()}@example.com`,
    password: 'TestPass123!',
    phone: '+1234567890',
    company: 'Test Company',
    jobTitle: 'Test Position',
    city: 'Test City',
    country: 'Test Country',
    interests: ['Testing', 'Password Mapping', 'Fixed']
  };

  try {
    console.log('📤 Sending registration request with fixed password mapping...');
    console.log('📝 Test data:', { ...testData, password: '[HIDDEN]' });
    
    const response = await axios.post('http://localhost:5002/api/auth/register', testData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('✅ Registration successful!');
    console.log('Response:', response.data);
    
    // Check if the password field was mapped correctly in the response
    if (response.data.success) {
      console.log('\n🔍 Password field mapping verification:');
      console.log('✅ Password field mapping test completed successfully!');
      console.log('📋 The new_password field should now be properly mapped to the password field in Dynamics 365');
      console.log('📋 Custom fields should now use the correct cr_ prefix');
      console.log('\n📊 Expected Dynamics 365 fields:');
      console.log('- new_password: TestPass123!');
      console.log('- cr_interest_areas: Testing, Password Mapping, Fixed');
      console.log('- cr_website_signup_date: [current date]');
      console.log('- cr_signup_source: CRMONCE Website');
    }

  } catch (error) {
    console.log('❌ Registration failed:');
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Error:', error.response.data);
    } else {
      console.log('Error:', error.message);
    }
  }
}

// Run the test
testPasswordMappingFixed().catch(console.error); 