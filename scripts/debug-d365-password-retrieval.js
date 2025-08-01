const { dynamics365Connection } = require('../server/config/database');

async function debugD365PasswordRetrieval() {
  console.log('🔍 Debugging D365 Password Retrieval...\n');

  // Test with known users
  const testUsers = [
    'umamahesh@crmonce.in',
    'john@company.com',
    'flow-test-1753886017857@example.com'
  ];

  for (const email of testUsers) {
    console.log(`📋 Testing D365 contact retrieval for: ${email}`);
    
    try {
      const contact = await dynamics365Connection.getContactDetailsByEmail(email);
      
      if (contact) {
        console.log('✅ Contact found in D365:');
        console.log('  📧 Email:', contact.email);
        console.log('  👤 Name:', contact.fullName);
        console.log('  🔑 Password field exists:', !!contact.password);
        console.log('  🔑 Password value:', contact.password ? `"${contact.password}"` : 'null/undefined');
        console.log('  🔑 Password length:', contact.password ? contact.password.length : 0);
        console.log('  📱 Phone:', contact.phone);
        console.log('  💼 Job Title:', contact.jobTitle);
        console.log('  🌍 City:', contact.city);
        console.log('  🌍 Country:', contact.country);
        console.log('  🎯 Interests:', contact.interests);
        console.log('  📅 Signup Date:', contact.signupDate);
        console.log('  📊 Signup Source:', contact.signupSource);
      } else {
        console.log('❌ No contact found in D365');
      }
    } catch (error) {
      console.log('❌ Error retrieving contact:', error.message);
    }
    
    console.log('─'.repeat(60) + '\n');
  }

  // Test with a non-existent user
  console.log('📋 Testing with non-existent user: nonexistent@example.com');
  try {
    const contact = await dynamics365Connection.getContactDetailsByEmail('nonexistent@example.com');
    if (contact) {
      console.log('❌ Unexpectedly found contact for non-existent user!');
    } else {
      console.log('✅ Correctly returned null for non-existent user');
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
  }

  console.log('\n🎉 D365 Password Retrieval Debug Complete!');
}

// Run the debug test
debugD365PasswordRetrieval().catch(console.error); 