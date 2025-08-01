const axios = require('axios');

const API_BASE_URL = 'http://localhost:5002/api/auth';

async function testD365ValidationComprehensive() {
  console.log('🔍 Comprehensive D365 Validation Test...\n');

  // Test scenarios with known D365 contacts
  const testScenarios = [
    {
      name: '✅ CORRECT: Uma Dasari with correct password',
      email: 'umamahesh@crmonce.in',
      password: 'Test@123455',
      shouldSucceed: true,
      description: 'This should succeed - password matches D365'
    },
    {
      name: '✅ CORRECT: John Doe with correct password',
      email: 'john@company.com',
      password: 'Test@12345',
      shouldSucceed: true,
      description: 'This should succeed - password matches D365'
    },
    {
      name: '❌ WRONG: Uma Dasari with wrong password',
      email: 'umamahesh@crmonce.in',
      password: 'WrongPassword123!',
      shouldSucceed: false,
      description: 'This should fail - wrong password'
    },
    {
      name: '❌ WRONG: John Doe with wrong password',
      email: 'john@company.com',
      password: 'WrongPassword123!',
      shouldSucceed: false,
      description: 'This should fail - wrong password'
    },
    {
      name: '❌ WRONG: Uma Dasari with empty password',
      email: 'umamahesh@crmonce.in',
      password: '',
      shouldSucceed: false,
      description: 'This should fail - empty password'
    },
    {
      name: '❌ WRONG: Non-existent user',
      email: 'nonexistent@example.com',
      password: 'Test@123455',
      shouldSucceed: false,
      description: 'This should fail - user does not exist'
    },
    {
      name: '❌ WRONG: Empty email',
      email: '',
      password: 'Test@123455',
      shouldSucceed: false,
      description: 'This should fail - empty email'
    }
  ];

  let passedTests = 0;
  let totalTests = testScenarios.length;

  for (const scenario of testScenarios) {
    console.log(`📋 ${scenario.name}`);
    console.log(`📝 ${scenario.description}`);
    console.log(`📤 Email: ${scenario.email}`);
    console.log(`🔑 Password: ${scenario.password ? '[HIDDEN]' : '(empty)'}`);
    
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email: scenario.email,
        password: scenario.password
      });

      // If we get here, login succeeded
      if (scenario.shouldSucceed) {
        console.log('✅ SUCCESS: Login succeeded as expected');
        console.log(`👤 User: ${response.data.data.user.fullName}`);
        console.log(`🔐 Source: ${response.data.data.user.source}`);
        passedTests++;
      } else {
        console.log('❌ FAIL: Login succeeded when it should have failed');
        console.log(`👤 User: ${response.data.data.user.fullName}`);
        console.log(`🔐 Source: ${response.data.data.user.source}`);
      }
      
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data.message;
        
        if (!scenario.shouldSucceed) {
          console.log(`✅ SUCCESS: Login failed as expected (${status})`);
          console.log(`📥 Error: ${message}`);
          passedTests++;
        } else {
          console.log(`❌ FAIL: Login failed when it should have succeeded (${status})`);
          console.log(`📥 Error: ${message}`);
        }
      } else {
        console.log('❌ ERROR: Network error:', error.message);
      }
    }
    
    console.log('─'.repeat(80) + '\n');
  }

  // Summary
  console.log('📊 TEST SUMMARY');
  console.log(`✅ Passed: ${passedTests}/${totalTests}`);
  console.log(`❌ Failed: ${totalTests - passedTests}/${totalTests}`);
  console.log(`📈 Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`);

  if (passedTests === totalTests) {
    console.log('\n🎉 ALL TESTS PASSED! D365 validation is working correctly.');
  } else {
    console.log('\n⚠️ Some tests failed. D365 validation may have issues.');
  }

  // Additional verification
  console.log('\n🔍 D365 VALIDATION VERIFICATION:');
  console.log('1. ✅ Correct passwords for existing users should succeed');
  console.log('2. ✅ Wrong passwords for existing users should fail');
  console.log('3. ✅ Non-existent users should fail');
  console.log('4. ✅ Empty credentials should fail');
  console.log('5. ✅ All successful logins should show "Source: D365"');
}

// Run the comprehensive test
testD365ValidationComprehensive().catch(console.error); 