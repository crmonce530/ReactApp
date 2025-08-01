const axios = require('axios');

async function testRegistration() {
  console.log('🧪 Testing Registration Endpoint...\n');

  const testData = {
    firstName: 'Test',
    lastName: 'User',
    email: `test-${Date.now()}@example.com`,
    password: 'TestPass123!',
    phone: '+1234567890',
    company: 'Test Company',
    jobTitle: 'Test Position',
    city: 'Test City',
    country: 'Test Country',
    interests: ['Testing', 'Integration']
  };

  try {
    console.log('📤 Sending registration request with data:', testData);
    
    const response = await axios.post('http://localhost:5002/api/auth/register', testData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('✅ Registration successful!');
    console.log('Response:', response.data);
    
  } catch (error) {
    console.log('❌ Registration failed!');
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Error:', error.response.data);
    } else {
      console.log('Error:', error.message);
    }
  }
}

// Run the test
testRegistration(); 