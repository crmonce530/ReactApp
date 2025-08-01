const axios = require('axios');

async function testValidationExamples() {
  console.log('🧪 Testing Registration Validation Examples...\n');

  const testCases = [
    {
      name: '✅ Valid Complete Registration',
      data: {
        firstName: 'John',
        lastName: 'Doe',
        email: `test-${Date.now()}@example.com`,
        password: 'SecurePass123!',
        phone: '+1234567890',
        company: 'Acme Corporation',
        jobTitle: 'Software Engineer',
        city: 'New York',
        country: 'United States',
        interests: ['Technology', 'Innovation']
      },
      expectedResult: 'success'
    },
    {
      name: '✅ Valid Minimal Registration',
      data: {
        firstName: 'Jane',
        lastName: 'Smith',
        email: `jane-${Date.now()}@example.com`,
        password: 'SecurePass123!'
      },
      expectedResult: 'success'
    },
    {
      name: '❌ Invalid - Short Password',
      data: {
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        password: 'weak'
      },
      expectedResult: 'validation_error'
    },
    {
      name: '❌ Invalid - Missing Password Complexity',
      data: {
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        password: 'password123'
      },
      expectedResult: 'validation_error'
    },
    {
      name: '❌ Invalid - Invalid Email',
      data: {
        firstName: 'Test',
        lastName: 'User',
        email: 'invalid-email',
        password: 'SecurePass123!'
      },
      expectedResult: 'validation_error'
    },
    {
      name: '❌ Invalid - Short Names',
      data: {
        firstName: 'A',
        lastName: 'B',
        email: 'test@example.com',
        password: 'SecurePass123!'
      },
      expectedResult: 'validation_error'
    },
    {
      name: '❌ Invalid - Empty Required Fields',
      data: {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      },
      expectedResult: 'validation_error'
    }
  ];

  for (const testCase of testCases) {
    console.log(`\n${testCase.name}`);
    console.log('─'.repeat(50));
    
    try {
      const response = await axios.post('http://localhost:5002/api/auth/register', testCase.data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (testCase.expectedResult === 'success') {
        console.log('✅ SUCCESS - Registration completed');
        console.log('📋 Response:', {
          success: response.data.success,
          message: response.data.message,
          userId: response.data.data?.user?.id,
          contactId: response.data.data?.contact?.id
        });
      } else {
        console.log('❌ UNEXPECTED SUCCESS - Should have failed validation');
      }
      
    } catch (error) {
      if (error.response && testCase.expectedResult === 'validation_error') {
        console.log('✅ EXPECTED VALIDATION ERROR');
        console.log('📋 Status:', error.response.status);
        console.log('📋 Message:', error.response.data.message);
        console.log('📋 Errors:');
        error.response.data.errors.forEach((error, index) => {
          console.log(`   ${index + 1}. ${error}`);
        });
      } else {
        console.log('❌ UNEXPECTED ERROR');
        console.log('📋 Error:', error.message);
        if (error.response) {
          console.log('📋 Status:', error.response.status);
          console.log('📋 Data:', error.response.data);
        }
      }
    }
  }

  console.log('\n🎉 Validation testing completed!');
}

// Run the tests
testValidationExamples(); 