const axios = require('axios');

async function testD365Login() {
  console.log('🧪 Testing D365 Login Functionality...\n');

  // Test with a known contact from D365
  const testCases = [
    {
      name: 'Login with D365 contact credentials (Uma Dasari)',
      data: { 
        email: 'umamahesh@crmonce.in', 
        password: 'Test@123455' 
      },
      expectedStatus: 200
    },
    {
      name: 'Login with D365 contact credentials (John Doe)',
      data: { 
        email: 'john@company.com', 
        password: 'Test@12345' 
      },
      expectedStatus: 200
    },
    {
      name: 'Login with wrong password for D365 contact',
      data: { 
        email: 'umamahesh@crmonce.in', 
        password: 'WrongPassword123!' 
      },
      expectedStatus: 401
    },
    {
      name: 'Login with non-existent email',
      data: { 
        email: 'nonexistent@example.com', 
        password: 'TestPass123!' 
      },
      expectedStatus: 401
    },
    {
      name: 'Login with empty email',
      data: { 
        email: '', 
        password: 'TestPass123!' 
      },
      expectedStatus: 400
    },
    {
      name: 'Login with empty password',
      data: { 
        email: 'umamahesh@crmonce.in', 
        password: '' 
      },
      expectedStatus: 400
    }
  ];

  for (const testCase of testCases) {
    console.log(`📋 Testing: ${testCase.name}`);
    console.log(`📤 Data:`, { ...testCase.data, password: testCase.data.password ? '[HIDDEN]' : '' });
    
    try {
      const response = await axios.post('http://localhost:5002/api/auth/login', testCase.data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log(`✅ Status: ${response.status}`);
      if (response.data.success) {
        console.log(`📥 Login successful!`);
        console.log(`👤 User: ${response.data.data.user.fullName || response.data.data.user.firstName} ${response.data.data.user.lastName}`);
        console.log(`📧 Email: ${response.data.data.user.email}`);
        console.log(`🏢 Company: ${response.data.data.user.company || 'N/A'}`);
        console.log(`💼 Job Title: ${response.data.data.user.jobTitle || 'N/A'}`);
        console.log(`📱 Phone: ${response.data.data.user.phone || 'N/A'}`);
        console.log(`🌍 City: ${response.data.data.user.city || 'N/A'}`);
        console.log(`🌍 Country: ${response.data.data.user.country || 'N/A'}`);
        console.log(`🎯 Interests: ${response.data.data.user.interests || 'N/A'}`);
        console.log(`🔐 Source: ${response.data.data.user.source || 'N/A'}`);
        console.log(`🔑 Token: ${response.data.data.token ? '[HIDDEN]' : 'N/A'}`);
      } else {
        console.log(`📥 Response:`, response.data);
      }
      
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
testD365Login(); 