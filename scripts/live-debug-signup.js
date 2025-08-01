const axios = require('axios');
const readline = require('readline');

class LiveSignupDebugger {
  constructor() {
    this.baseUrl = 'http://localhost:5002';
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  async testLiveRegistration() {
    console.log('🚀 Live Sign-up Debugger Started!\n');
    console.log('This will test the registration process in real-time.\n');

    const testData = {
      firstName: 'Live',
      lastName: 'Test',
      email: `live-test-${Date.now()}@example.com`,
      password: 'LiveTest123!',
      phone: '+1234567890',
      company: 'Live Test Company',
      jobTitle: 'Live Test Position',
      city: 'Live Test City',
      country: 'Live Test Country',
      interests: ['Live Testing', 'Real-time Debugging']
    };

    console.log('📝 Test Data:');
    console.log(JSON.stringify(testData, null, 2));
    console.log('\n' + '='.repeat(50));

    try {
      console.log('\n🔍 Step 1: Testing server connection...');
      const healthResponse = await axios.get(`${this.baseUrl}/api/health`);
      console.log('✅ Server is running:', healthResponse.data);

      console.log('\n🔍 Step 2: Sending registration request...');
      console.log('📤 Request URL:', `${this.baseUrl}/api/auth/register`);
      console.log('📤 Request Method: POST');
      console.log('📤 Request Headers:', { 'Content-Type': 'application/json' });

      const startTime = Date.now();
      const response = await axios.post(`${this.baseUrl}/api/auth/register`, testData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const endTime = Date.now();

      console.log('\n✅ Registration successful!');
      console.log('⏱️  Response time:', `${endTime - startTime}ms`);
      console.log('📊 Response status:', response.status);
      console.log('📊 Response data:', JSON.stringify(response.data, null, 2));

      if (response.data.success) {
        console.log('\n🎉 SUCCESS! Registration completed:');
        console.log('   ✅ User created in local database');
        console.log('   ✅ Contact created in Dynamics 365');
        console.log('   ✅ JWT token generated');
        console.log('   ✅ Welcome email sent (if configured)');
        
        console.log('\n📋 User Details:');
        console.log('   ID:', response.data.data.user.id);
        console.log('   Name:', `${response.data.data.user.firstName} ${response.data.data.user.lastName}`);
        console.log('   Email:', response.data.data.user.email);
        console.log('   Company:', response.data.data.user.company);
        
        console.log('\n📋 Contact Details:');
        console.log('   Contact ID:', response.data.data.contact.id);
        console.log('   Contact Name:', `${response.data.data.contact.firstName} ${response.data.data.contact.lastName}`);
        console.log('   Contact Email:', response.data.data.contact.email);
        
        console.log('\n🔐 JWT Token:', response.data.data.token.substring(0, 50) + '...');
      }

    } catch (error) {
      console.log('\n❌ Registration failed!');
      console.log('🔍 Error details:');
      
      if (error.response) {
        console.log('   Status:', error.response.status);
        console.log('   Status Text:', error.response.statusText);
        console.log('   Error Data:', JSON.stringify(error.response.data, null, 2));
        
        if (error.response.status === 400) {
          console.log('\n💡 This is a validation error. Check the error details above.');
        } else if (error.response.status === 500) {
          console.log('\n💡 This is a server error. Check the server logs for more details.');
        }
      } else if (error.request) {
        console.log('   Network Error:', error.message);
        console.log('   💡 Make sure the server is running on port 5002');
      } else {
        console.log('   Error:', error.message);
      }
    }

    console.log('\n' + '='.repeat(50));
    console.log('🔍 Live debugging completed!');
    
    this.rl.question('\nPress Enter to exit...', () => {
      this.rl.close();
      process.exit(0);
    });
  }

  async interactiveMode() {
    console.log('🚀 Interactive Live Sign-up Debugger\n');
    console.log('Commands:');
    console.log('  test    - Run a test registration');
    console.log('  health  - Check server health');
    console.log('  exit    - Exit the debugger\n');

    const askQuestion = () => {
      this.rl.question('Enter command (test/health/exit): ', async (answer) => {
        switch (answer.toLowerCase()) {
          case 'test':
            await this.testLiveRegistration();
            break;
          case 'health':
            try {
              const response = await axios.get(`${this.baseUrl}/api/health`);
              console.log('✅ Server health:', response.data);
            } catch (error) {
              console.log('❌ Server health check failed:', error.message);
            }
            askQuestion();
            break;
          case 'exit':
            console.log('👋 Goodbye!');
            this.rl.close();
            process.exit(0);
            break;
          default:
            console.log('❌ Unknown command. Try: test, health, or exit');
            askQuestion();
        }
      });
    };

    askQuestion();
  }
}

// Run the live debugger
if (require.main === module) {
  const liveDebugger = new LiveSignupDebugger();
  
  // Check if interactive mode is requested
  if (process.argv.includes('--interactive')) {
    liveDebugger.interactiveMode();
  } else {
    liveDebugger.testLiveRegistration();
  }
}

module.exports = { LiveSignupDebugger }; 