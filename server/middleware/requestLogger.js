const winston = require('winston');

/**
 * Request logging middleware
 */
const requestLogger = (req, res, next) => {
  const start = Date.now();
  
  // Log request
  winston.info(`Request: ${req.method} ${req.url}`, {
    method: req.method,
    url: req.url,
    ip: req.ip || req.connection.remoteAddress,
    userAgent: req.get('User-Agent'),
    timestamp: new Date().toISOString()
  });

  // Log response
  res.on('finish', () => {
    const duration = Date.now() - start;
    const logLevel = res.statusCode >= 400 ? 'error' : 'info';
    
    winston.log(logLevel, `Response: ${req.method} ${req.url} - ${res.statusCode} (${duration}ms)`, {
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration,
      ip: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent'),
      timestamp: new Date().toISOString()
    });
  });

  next();
};

module.exports = { requestLogger }; 