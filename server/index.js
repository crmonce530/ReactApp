const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const winston = require('winston');
const cron = require('node-cron');

// Import routes
const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contacts');
const crmRoutes = require('./routes/crm');
const virtualAgentRoutes = require('./routes/virtualAgent');

// Import middleware
const { errorHandler } = require('./middleware/errorHandler');
const { requestLogger } = require('./middleware/requestLogger');

// Load environment variables
dotenv.config();

const app = express();

// Increase header size limits to prevent 431 errors
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  maxAge: 86400 // 24 hours
}));

// Body parsing middleware (already configured above)

// Handle large headers gracefully
app.use((req, res, next) => {
  // Check header size
  const headerSize = JSON.stringify(req.headers).length;
  if (headerSize > 16384) { // 16KB limit
    return res.status(431).json({
      success: false,
      message: 'Request headers too large',
      error: 'Headers exceed maximum allowed size'
    });
  }
  next();
});

// Request logging
app.use(requestLogger);

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/crm', crmRoutes);
app.use('/api/virtual-agent', virtualAgentRoutes);
app.use('/api', blogRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});

const PORT = process.env.PORT || 5000;

// Create HTTP server with increased header size limits
const server = require('http').createServer({
  maxHeaderSize: 32768 // 32KB header size limit
}, app);

server.listen(PORT, () => {
  winston.info(`Server running on port ${PORT}`);
  winston.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
  winston.info(`Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
});

// Scheduled tasks
cron.schedule('0 9 * * *', () => {
  winston.info('Running daily maintenance tasks...');
  // Add your daily tasks here
});

cron.schedule('0 */6 * * *', () => {
  winston.info('Running periodic health checks...');
  // Add your periodic tasks here
});

module.exports = app; 