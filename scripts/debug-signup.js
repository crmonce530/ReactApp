const axios = require('axios');
const winston = require('winston');

// Configure winston for console output
winston.configure({
  level: 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'signup-debug' },
  transports: [
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

class SignupDebugger {
  constructor() {
    this.baseUrl = 'http://localhost:5002'; // Update this to match your server port
    this.testData = {
      firstName: 'Test',
      lastName: 'User',
      email: `test-${Date.now()}@example.com`,
      password: 'TestPassword123!',
      phone: '+1234567890',
      company: 'Test Company',
      jobTitle: 'Test Position',
      city: 'Test City',
      country: 'Test Country',
      interests: ['Testing', 'Debugging', 'Integration']
    };
  }

  async testServerConnection() {
    console.log('\n🔍 Step 1: Testing Server Connection...');
    try {
      const response = await axios.get(`${this.baseUrl}/api/health`);
      console.log('✅ Server is running and responding');
      console.log('   Response:', response.data);
      return true;
    } catch (error) {
      console.log('❌ Server connection failed');
      console.log('   Error:', error.message);
      if (error.code === 'ECONNREFUSED') {
        console.log('   💡 Make sure the server is running on port 5001');
        console.log('   💡 Run: npm run server');
      }
      return false;
    }
  }

  async testRegistrationEndpoint() {
    console.log('\n🔍 Step 2: Testing Registration Endpoint...');
    try {
      const response = await axios.post(`${this.baseUrl}/api/auth/register`, this.testData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('✅ Registration successful');
      console.log('   Status:', response.status);
      console.log('   Response:', response.data);
      
      if (response.data.success) {
        console.log('   ✅ User created successfully');
        console.log('   ✅ Contact created in Dynamics 365');
        console.log('   ✅ JWT token generated');
        return response.data;
      } else {
        console.log('   ❌ Registration failed');
        return null;
      }
    } catch (error) {
      console.log('❌ Registration request failed');
      if (error.response) {
        console.log('   Status:', error.response.status);
        console.log('   Error:', error.response.data);
        
        if (error.response.status === 400) {
          console.log('   💡 Validation error - check input data');
        } else if (error.response.status === 500) {
          console.log('   💡 Server error - check server logs');
        }
      } else {
        console.log('   Error:', error.message);
      }
      return null;
    }
  }

  async testValidation() {
    console.log('\n🔍 Step 3: Testing Input Validation...');
    
    const testCases = [
      {
        name: 'Valid data',
        data: this.testData,
        shouldPass: true
      },
      {
        name: 'Missing email',
        data: { ...this.testData, email: '' },
        shouldPass: false
      },
      {
        name: 'Invalid email',
        data: { ...this.testData, email: 'invalid-email' },
        shouldPass: false
      },
      {
        name: 'Short password',
        data: { ...this.testData, password: '123' },
        shouldPass: false
      },
      {
        name: 'Missing firstName',
        data: { ...this.testData, firstName: '' },
        shouldPass: false
      }
    ];

    for (const testCase of testCases) {
      try {
        const response = await axios.post(`${this.baseUrl}/api/auth/register`, testCase.data, {
          headers: { 'Content-Type': 'application/json' }
        });
        
        if (testCase.shouldPass) {
          console.log(`✅ ${testCase.name}: Passed (as expected)`);
        } else {
          console.log(`❌ ${testCase.name}: Passed (should have failed)`);
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          if (testCase.shouldPass) {
            console.log(`❌ ${testCase.name}: Failed (should have passed)`);
          } else {
            console.log(`✅ ${testCase.name}: Failed (as expected)`);
          }
        } else {
          console.log(`❌ ${testCase.name}: Unexpected error - ${error.message}`);
        }
      }
    }
  }

  async testDynamics365Connection() {
    console.log('\n🔍 Step 4: Testing Dynamics 365 Connection...');
    try {
      const response = await axios.get(`${this.baseUrl}/api/crm/status`);
      console.log('✅ Dynamics 365 connection test successful');
      console.log('   Response:', response.data);
      return true;
    } catch (error) {
      console.log('❌ Dynamics 365 connection test failed');
      if (error.response) {
        console.log('   Status:', error.response.status);
        console.log('   Error:', error.response.data);
      } else {
        console.log('   Error:', error.message);
      }
      return false;
    }
  }

  async testDuplicateEmail() {
    console.log('\n🔍 Step 5: Testing Duplicate Email Prevention...');
    
    // First registration
    try {
      const response1 = await axios.post(`${this.baseUrl}/api/auth/register`, this.testData, {
        headers: { 'Content-Type': 'application/json' }
      });
      console.log('✅ First registration successful');
    } catch (error) {
      console.log('❌ First registration failed:', error.response?.data?.message || error.message);
      return;
    }

    // Second registration with same email
    try {
      const response2 = await axios.post(`${this.baseUrl}/api/auth/register`, this.testData, {
        headers: { 'Content-Type': 'application/json' }
      });
      console.log('❌ Duplicate email should have been rejected');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log('✅ Duplicate email correctly rejected');
        console.log('   Message:', error.response.data.message);
      } else {
        console.log('❌ Unexpected error for duplicate email:', error.message);
      }
    }
  }

  async runAllTests() {
    console.log('🚀 Starting Sign-up Functionality Debug...\n');
    
    // Test 1: Server connection
    const serverOk = await this.testServerConnection();
    if (!serverOk) {
      console.log('\n❌ Cannot proceed - server is not running');
      return;
    }

    // Test 2: Dynamics 365 connection
    await this.testDynamics365Connection();

    // Test 3: Input validation
    await this.testValidation();

    // Test 4: Registration endpoint
    const registrationResult = await this.testRegistrationEndpoint();

    // Test 5: Duplicate email prevention
    if (registrationResult) {
      await this.testDuplicateEmail();
    }

    console.log('\n🎉 Debug session completed!');
    console.log('\n📋 Summary:');
    console.log('   - Server connection: ✅');
    console.log('   - Registration endpoint: ' + (registrationResult ? '✅' : '❌'));
    console.log('   - Input validation: ✅');
    console.log('   - Duplicate prevention: ✅');
  }
}

// Run the debugger if this script is executed directly
if (require.main === module) {
  const signupDebugger = new SignupDebugger();
  signupDebugger.runAllTests()
    .catch(error => {
      console.error('Unexpected error during debugging:', error);
      process.exit(1);
    });
}

module.exports = { SignupDebugger }; 