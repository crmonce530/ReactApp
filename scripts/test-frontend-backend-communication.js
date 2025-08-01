const axios = require('axios');

async function testFrontendBackendCommunication() {
  console.log('🔍 Testing Frontend-Backend Communication...\n');

  // Test different endpoints to see if they're accessible
  const testEndpoints = [
    {
      name: 'Backend Health Check',
      url: 'http://localhost:5002/api/health',
      method: 'GET'
    },
    {
      name: 'Login API (Correct Credentials)',
      url: 'http://localhost:5002/api/auth/login',
      method: 'POST',
      data: {
        email: 'umamahesh@crmonce.in',
        password: 'Test@123455'
      }
    },
    {
      name: 'Login API (Wrong Credentials)',
      url: 'http://localhost:5002/api/auth/login',
      method: 'POST',
      data: {
        email: 'umamahesh@crmonce.in',
        password: 'WrongPassword'
      }
    }
  ];

  for (const endpoint of testEndpoints) {
    console.log(`📋 Testing: ${endpoint.name}`);
    console.log(`🔗 URL: ${endpoint.url}`);
    console.log(`📤 Method: ${endpoint.method}`);
    
    try {
      let response;
      if (endpoint.method === 'GET') {
        response = await axios.get(endpoint.url);
      } else if (endpoint.method === 'POST') {
        response = await axios.post(endpoint.url, endpoint.data, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }

      console.log(`✅ Status: ${response.status}`);
      if (response.data.success) {
        console.log(`📥 Success: ${response.data.message}`);
        if (response.data.data && response.data.data.user) {
          console.log(`👤 User: ${response.data.data.user.fullName}`);
          console.log(`🔐 Source: ${response.data.data.user.source}`);
        }
      } else {
        console.log(`📥 Response: ${JSON.stringify(response.data, null, 2)}`);
      }
      
    } catch (error) {
      if (error.response) {
        console.log(`❌ Status: ${error.response.status}`);
        console.log(`📥 Error: ${error.response.data.message || error.response.data}`);
      } else if (error.code === 'ECONNREFUSED') {
        console.log(`❌ Connection Refused: Backend not running on port 5002`);
      } else {
        console.log(`❌ Network Error: ${error.message}`);
      }
    }
    
    console.log('─'.repeat(60) + '\n');
  }

  // Test if frontend port is accessible
  console.log('📋 Testing Frontend Accessibility');
  try {
    const frontendResponse = await axios.get('http://localhost:5004', { timeout: 5000 });
    console.log(`✅ Frontend accessible on port 5004 (Status: ${frontendResponse.status})`);
  } catch (error) {
    console.log(`❌ Frontend not accessible on port 5004: ${error.message}`);
  }

  console.log('\n🎉 Frontend-Backend Communication Test Complete!');
}

// Run the test
testFrontendBackendCommunication().catch(console.error); 