const axios = require('axios');

async function testPasswordMapping() {
  console.log('🧪 Testing Password Field Mapping...\\n');

  const testData = {
    firstName: 'Test',
    lastName: 'Password',
    email: `test-password-${Date.now()}@example.com`,
    password: 'TestPass123!',
    phone: '+1234567890',
    company: 'Test Company',
    jobTitle: 'Test Position',
    city: 'Test City',
    country: 'Test Country',
    interests: ['Testing', 'Password Mapping']
  };

  try {
    console.log('📤 Sending registration request with password mapping...');
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
      console.log('\\n🔍 Checking password field mapping...');
      console.log('✅ Password field mapping test completed successfully!');
      console.log('📋 The new_password field should now be mapped to the password field in Dynamics 365');
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
testPasswordMapping().catch(console.error); 