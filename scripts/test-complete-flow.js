const axios = require('axios');

const API_BASE_URL = 'http://localhost:5002/api/auth';

async function testCompleteFlow() {
  console.log('🧪 Testing Complete Registration and Login Flow...\n');

  // Generate unique email for this test
  const timestamp = Date.now();
  const testEmail = `flow-test-${timestamp}@example.com`;
  const testPassword = 'TestPass123!';

  try {
    // Step 1: Register a new user
    console.log('📋 Step 1: Registering new user...');
    const registrationData = {
      firstName: 'Flow',
      lastName: 'Test',
      email: testEmail,
      password: testPassword,
      phone: '+1234567890',
      company: 'Flow Test Company',
      jobTitle: 'Flow Test Position',
      city: 'Flow Test City',
      country: 'Flow Test Country',
      interests: ['Flow Testing', 'Integration']
    };

    console.log('📤 Registration data:', { ...registrationData, password: '[HIDDEN]' });
    
    const registrationResponse = await axios.post(`${API_BASE_URL}/register`, registrationData);
    
    if (registrationResponse.status === 201) {
      console.log('✅ Registration successful!');
      console.log('👤 User ID:', registrationResponse.data.data.user.id);
      console.log('🔗 Contact ID:', registrationResponse.data.data.contact.id);
      console.log('🔑 Registration Token:', registrationResponse.data.data.token.substring(0, 50) + '...');
    } else {
      console.log('❌ Registration failed:', registrationResponse.data);
      return;
    }

    console.log('\n' + '─'.repeat(50) + '\n');

    // Step 2: Login with the same credentials
    console.log('📋 Step 2: Logging in with registered credentials...');
    const loginData = {
      email: testEmail,
      password: testPassword
    };

    console.log('📤 Login data:', { ...loginData, password: '[HIDDEN]' });
    
    const loginResponse = await axios.post(`${API_BASE_URL}/login`, loginData);
    
    if (loginResponse.status === 200) {
      console.log('✅ Login successful!');
      console.log('👤 User:', loginResponse.data.data.user.fullName);
      console.log('📧 Email:', loginResponse.data.data.user.email);
      console.log('🔐 Source:', loginResponse.data.data.user.source);
      console.log('🔑 Login Token:', loginResponse.data.data.token.substring(0, 50) + '...');
      
      // Verify the user data matches
      if (loginResponse.data.data.user.email === testEmail) {
        console.log('✅ Email verification passed');
      } else {
        console.log('❌ Email verification failed');
      }
      
      if (loginResponse.data.data.user.source === 'D365') {
        console.log('✅ D365 authentication confirmed');
      } else {
        console.log('⚠️ User authenticated via local database instead of D365');
      }
    } else {
      console.log('❌ Login failed:', loginResponse.data);
      return;
    }

    console.log('\n' + '─'.repeat(50) + '\n');

    // Step 3: Try to login with wrong password
    console.log('📋 Step 3: Testing wrong password rejection...');
    const wrongLoginData = {
      email: testEmail,
      password: 'WrongPassword123!'
    };

    console.log('📤 Wrong password data:', { ...wrongLoginData, password: '[HIDDEN]' });
    
    try {
      const wrongLoginResponse = await axios.post(`${API_BASE_URL}/login`, wrongLoginData);
      console.log('❌ Wrong password login should have failed but succeeded:', wrongLoginResponse.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log('✅ Wrong password correctly rejected');
        console.log('📥 Error response:', error.response.data.message);
      } else {
        console.log('❌ Unexpected error with wrong password:', error.message);
      }
    }

    console.log('\n🎉 Complete flow test finished successfully!');

  } catch (error) {
    console.log('❌ Test failed:', error.message);
    if (error.response) {
      console.log('📥 Response data:', error.response.data);
    }
  }
}

// Run the test
testCompleteFlow(); 