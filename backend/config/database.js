const mongoose = require('mongoose');
const logger = require('./logger');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/crmonce');

    logger.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    logger.error('Error connecting to MongoDB:', error);
    
    // In development, we can continue without MongoDB for demo purposes
    if (process.env.NODE_ENV !== 'production') {
      logger.warn('Continuing in development mode without MongoDB. Some features may not work.');
      return;
    }
    
    // In production, exit if we can't connect to database
    process.exit(1);
  }
};

module.exports = connectDB; 