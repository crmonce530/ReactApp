const fs = require('fs');
const path = require('path');

console.log('🚀 Preparing files for WordPress hosting deployment...');

// Function to copy directory recursively
function copyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Create deploy directory
const deployDir = path.join(__dirname, '../deploy');
if (!fs.existsSync(deployDir)) {
  fs.mkdirSync(deployDir, { recursive: true });
}

// Files and directories to copy
const filesToCopy = [
  { src: 'build', dest: 'public_html' },
  { src: 'server', dest: 'server' },
  { src: '.env.example', dest: '.env.example' },
  { src: 'package.json', dest: 'package.json' },
  { src: 'README.md', dest: 'README.md' },
  { src: 'webpack.config.js', dest: 'webpack.config.js' }
];

// Copy files and directories
filesToCopy.forEach(({ src, dest }) => {
  const srcPath = path.join(__dirname, '..', src);
  const destPath = path.join(deployDir, dest);
  
  if (fs.existsSync(srcPath)) {
    if (fs.lstatSync(srcPath).isDirectory()) {
      // Copy directory
      copyDirectory(srcPath, destPath);
      console.log(`✅ Copied directory: ${src} → ${dest}`);
    } else {
      // Copy file
      fs.copyFileSync(srcPath, destPath);
      console.log(`✅ Copied file: ${src} → ${dest}`);
    }
  } else {
    console.log(`⚠️  Warning: ${src} not found, skipping...`);
  }
});

// Create .htaccess file for React Router
const htaccessContent = `# React Router Support
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # Handle React Router
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^(.*)$ /index.html [QSA,L]
  
  # Security headers
  Header always set X-Content-Type-Options nosniff
  Header always set X-Frame-Options DENY
  Header always set X-XSS-Protection "1; mode=block"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  
  # Cache static assets
  <FilesMatch "\\.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$">
    ExpiresActive On
    ExpiresDefault "access plus 1 year"
    Header set Cache-Control "public, immutable"
  </FilesMatch>
  
  # Gzip compression
  <IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
  </IfModule>
</IfModule>

# Prevent access to sensitive files
<Files ".env">
  Order allow,deny
  Deny from all
</Files>

<Files "package.json">
  Order allow,deny
  Deny from all
</Files>

<Files "webpack.config.js">
  Order allow,deny
  Deny from all
</Files>`;

fs.writeFileSync(path.join(deployDir, 'public_html/.htaccess'), htaccessContent);
console.log('✅ Created .htaccess file for React Router support');

// Create deployment instructions
const deploymentInstructions = `# CRMONCE Website Deployment Instructions

## 🚀 WordPress Hosting Deployment

### Prerequisites
- WordPress hosting with Node.js support
- SSH access to your hosting server
- Domain name configured

### Step 1: Upload Files
1. Upload all files from this directory to your hosting server
2. Place \`public_html\` contents in your web root directory
3. Place \`server\` folder outside web root for security

### Step 2: Configure Environment
1. Copy \`.env.example\` to \`.env\`
2. Update \`.env\` with your production settings:
   - Database credentials
   - Dynamics 365 API keys
   - Email service configuration
   - Domain URLs

### Step 3: Install Dependencies
\`\`\`bash
npm install --production
\`\`\`

### Step 4: Start the Server
\`\`\`bash
# For development
npm run server

# For production (using PM2)
npm install -g pm2
pm2 start server/index.js --name "crmonce-api"
pm2 startup
pm2 save
\`\`\`

### Step 5: Configure Domain
1. Point your domain to the hosting server
2. Configure SSL certificate
3. Update DNS settings

### Step 6: Test the Application
1. Visit your domain to test the frontend
2. Test API endpoints at \`yourdomain.com/api/health\`
3. Verify virtual agent functionality

## 🔧 Configuration Files

### .env Configuration
\`\`\`env
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://yourdomain.com
JWT_SECRET=your-super-secret-jwt-key
D365_BASE_URL=https://your-org.crm.dynamics.com
D365_CLIENT_ID=your-azure-app-client-id
D365_CLIENT_SECRET=your-azure-app-client-secret
D365_TENANT_ID=your-azure-tenant-id
ADMIN_EMAIL=admin@yourdomain.com
CRM_URL=https://crm.yourdomain.com
\`\`\`

## 📁 Directory Structure
\`\`\`
/
├── public_html/          # Frontend files (web root)
│   ├── static/
│   ├── index.html
│   └── .htaccess
├── server/               # Backend files (outside web root)
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   └── index.js
├── package.json
├── .env
└── README.md
\`\`\`

## 🔒 Security Considerations
1. Keep \`server\` folder outside web root
2. Use strong JWT secrets
3. Enable HTTPS/SSL
4. Configure proper CORS settings
5. Set up rate limiting
6. Regular security updates

## 📞 Support
For deployment issues, contact your hosting provider or refer to the hosting documentation.

Generated on: ${new Date().toISOString()}
`;

fs.writeFileSync(path.join(deployDir, 'DEPLOYMENT.md'), deploymentInstructions);
console.log('✅ Created deployment instructions');

// Create a simple deployment script
const deployScript = `#!/bin/bash
echo "🚀 Deploying CRMONCE website..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install --production

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from example..."
    cp .env.example .env
    echo "⚠️  Please update .env file with your production settings"
fi

# Start the server
echo "🚀 Starting server..."
npm run server

echo "✅ Deployment complete!"
echo "🌐 Your website should be available at your domain"
`;

fs.writeFileSync(path.join(deployDir, 'deploy.sh'), deployScript);
fs.chmodSync(path.join(deployDir, 'deploy.sh'), '755');
console.log('✅ Created deployment script');

console.log('\n🎉 Deployment files prepared successfully!');
console.log('📁 Files are ready in the "deploy" directory');
console.log('📖 See DEPLOYMENT.md for detailed instructions');
console.log('🚀 Run "npm run deploy:prepare" to regenerate deployment files'); 