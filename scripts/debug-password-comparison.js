const axios = require('axios');

const API_BASE_URL = 'http://localhost:5002/api/auth';

async function debugPasswordComparison() {
  console.log('🔍 Debugging Password Comparison Issue...\n');

  // Test with a known user that was just registered
  const testEmail = 'flow-test-1753885672754@example.com';
  const correctPassword = 'TestPass123!';
  const wrongPassword = 'WrongPassword123!';

  try {
    // Step 1: Try to login with correct password
    console.log('📋 Step 1: Testing login with correct password...');
    const correctLoginData = {
      email: testEmail,
      password: correctPassword
    };

    console.log('📤 Login data:', { ...correctLoginData, password: '[HIDDEN]' });
    
    try {
      const correctLoginResponse = await axios.post(`${API_BASE_URL}/login`, correctLoginData);
      console.log('✅ Correct password login successful!');
      console.log('🔐 Source:', correctLoginResponse.data.data.user.source);
      console.log('👤 User:', correctLoginResponse.data.data.user.fullName);
    } catch (error) {
      console.log('❌ Correct password login failed:', error.response?.data?.message || error.message);
    }

    console.log('\n' + '─'.repeat(50) + '\n');

    // Step 2: Try to login with wrong password
    console.log('📋 Step 2: Testing login with wrong password...');
    const wrongLoginData = {
      email: testEmail,
      password: wrongPassword
    };

    console.log('📤 Wrong password data:', { ...wrongLoginData, password: '[HIDDEN]' });
    
    try {
      const wrongLoginResponse = await axios.post(`${API_BASE_URL}/login`, wrongLoginData);
      console.log('❌ Wrong password login should have failed but succeeded!');
      console.log('🔐 Source:', wrongLoginResponse.data.data.user.source);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log('✅ Wrong password correctly rejected');
        console.log('📥 Error message:', error.response.data.message);
      } else {
        console.log('❌ Unexpected error with wrong password:', error.message);
      }
    }

    console.log('\n' + '─'.repeat(50) + '\n');

    // Step 3: Test with completely different password
    console.log('📋 Step 3: Testing with completely different password...');
    const differentPasswordData = {
      email: testEmail,
      password: 'CompletelyDifferent123!'
    };

    console.log('📤 Different password data:', { ...differentPasswordData, password: '[HIDDEN]' });
    
    try {
      const differentPasswordResponse = await axios.post(`${API_BASE_URL}/login`, differentPasswordData);
      console.log('❌ Different password login should have failed but succeeded!');
      console.log('🔐 Source:', differentPasswordResponse.data.data.user.source);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log('✅ Different password correctly rejected');
        console.log('📥 Error message:', error.response.data.message);
      } else {
        console.log('❌ Unexpected error with different password:', error.message);
      }
    }

    console.log('\n' + '─'.repeat(50) + '\n');

    // Step 4: Test with non-existent user
    console.log('📋 Step 4: Testing with non-existent user...');
    const nonExistentUserData = {
      email: 'nonexistent@example.com',
      password: correctPassword
    };

    console.log('📤 Non-existent user data:', { ...nonExistentUserData, password: '[HIDDEN]' });
    
    try {
      const nonExistentUserResponse = await axios.post(`${API_BASE_URL}/login`, nonExistentUserData);
      console.log('❌ Non-existent user login should have failed but succeeded!');
      console.log('🔐 Source:', nonExistentUserResponse.data.data.user.source);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log('✅ Non-existent user correctly rejected');
        console.log('📥 Error message:', error.response.data.message);
      } else {
        console.log('❌ Unexpected error with non-existent user:', error.message);
      }
    }

    console.log('\n🎉 Password comparison debug test completed!');

  } catch (error) {
    console.log('❌ Debug test failed:', error.message);
    if (error.response) {
      console.log('📥 Response data:', error.response.data);
    }
  }
}

// Run the debug test
debugPasswordComparison(); 