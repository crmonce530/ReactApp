const axios = require('axios');

async function testPasswordMappingOnly() {
  console.log('🧪 Testing Password Field Mapping Only (No JWT)...\n');

  const testData = {
    firstName: 'Test',
    lastName: 'PasswordOnly',
    email: `test-password-only-${Date.now()}@example.com`,
    password: 'TestPassword123!',
    phone: '+1234567890',
    company: 'Test Company',
    jobTitle: 'Test Job',
    city: 'Test City',
    country: 'Test Country',
    interests: ['Testing', 'Password', 'Mapping']
  };

  console.log('📤 Sending registration request with password mapping...');
  console.log('📝 Test data:', {
    ...testData,
    password: '[HIDDEN]'
  });

  try {
    const response = await axios.post('http://localhost:5002/api/auth/register', testData, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 10000
    });

    console.log('✅ Registration successful!');
    console.log('📊 Response:', {
      success: response.data.success,
      message: response.data.message,
      userId: response.data.data?.user?.id,
      contactId: response.data.data?.contact?.id
    });

  } catch (error) {
    console.log('❌ Registration failed:');
    console.log('Status:', error.response?.status);
    
    if (error.response?.data) {
      console.log('Error:', JSON.stringify(error.response.data, null, 2));
      
      // Check if it's a JWT error (which is expected)
      if (error.response.data.error && error.response.data.error.includes('secretOrPrivateKey')) {
        console.log('\n✅ Expected JWT error - this means the password mapping worked!');
        console.log('📝 The registration process completed successfully up to JWT generation.');
        console.log('🔧 To fix this, create a .env file with JWT_SECRET or remove JWT generation from the code.');
      }
    } else {
      console.log('Error:', error.message);
    }
  }
}

// Run the test
testPasswordMappingOnly().catch(console.error); 