const axios = require('axios');

async function testLoginValidation() {
  console.log('🧪 Testing Login Validation...\n');

  const testCases = [
    {
      name: 'Empty email and password',
      data: { email: '', password: '' },
      expectedStatus: 400
    },
    {
      name: 'Empty email only',
      data: { email: '', password: 'TestPass123!' },
      expectedStatus: 400
    },
    {
      name: 'Empty password only',
      data: { email: 'test@example.com', password: '' },
      expectedStatus: 400
    },
    {
      name: 'Invalid email format',
      data: { email: 'invalid-email', password: 'TestPass123!' },
      expectedStatus: 400
    },
    {
      name: 'Valid credentials (should fail with user not found)',
      data: { email: 'nonexistent@example.com', password: 'TestPass123!' },
      expectedStatus: 401
    },
    {
      name: 'Valid email format with valid password',
      data: { email: 'test@example.com', password: 'TestPass123!' },
      expectedStatus: 401 // Should fail because user doesn't exist
    }
  ];

  for (const testCase of testCases) {
    console.log(`📋 Testing: ${testCase.name}`);
    console.log(`📤 Data:`, testCase.data);
    
    try {
      const response = await axios.post('http://localhost:5002/api/auth/login', testCase.data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log(`✅ Status: ${response.status}`);
      console.log(`📥 Response:`, response.data);
      
    } catch (error) {
      if (error.response) {
        console.log(`❌ Status: ${error.response.status}`);
        console.log(`📥 Response:`, error.response.data);
        
        if (error.response.status === testCase.expectedStatus) {
          console.log('✅ Expected error received');
        } else {
          console.log('❌ Unexpected status code');
        }
      } else {
        console.log('❌ Network error:', error.message);
      }
    }
    
    console.log('─'.repeat(50) + '\n');
  }
}

// Run the test
testLoginValidation(); 