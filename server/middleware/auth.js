const jwt = require('jsonwebtoken');
const winston = require('winston');

/**
 * Middleware to authenticate JWT token
 */
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access token is required'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    winston.warn(`Invalid token attempt: ${error.message}`);
    return res.status(403).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
};

/**
 * Middleware to authenticate admin users
 */
const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access token is required'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if user has admin role
    if (!decoded.isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Admin access required'
      });
    }
    
    req.user = decoded;
    next();
  } catch (error) {
    winston.warn(`Invalid admin token attempt: ${error.message}`);
    return res.status(403).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
};

/**
 * Optional authentication middleware (doesn't fail if no token)
 */
const optionalAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
    } catch (error) {
      winston.warn(`Invalid optional token: ${error.message}`);
      // Don't fail, just continue without user
    }
  }

  next();
};

/**
 * Rate limiting middleware for authentication endpoints
 */
const authRateLimit = (req, res, next) => {
  const clientIP = req.ip || req.connection.remoteAddress;
  const endpoint = req.path;
  
  // Simple in-memory rate limiting (in production, use Redis)
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxAttempts = {
    '/login': 5,
    '/register': 3,
    '/forgot-password': 3,
    '/reset-password': 3
  };

  const attempts = req.app.locals.authAttempts || {};
  const clientAttempts = attempts[clientIP] || {};
  const endpointAttempts = clientAttempts[endpoint] || { count: 0, resetTime: now + windowMs };

  // Reset if window has passed
  if (now > endpointAttempts.resetTime) {
    endpointAttempts.count = 0;
    endpointAttempts.resetTime = now + windowMs;
  }

  // Check if limit exceeded
  const maxAttemptsForEndpoint = maxAttempts[endpoint] || 10;
  if (endpointAttempts.count >= maxAttemptsForEndpoint) {
    return res.status(429).json({
      success: false,
      message: 'Too many authentication attempts. Please try again later.',
      retryAfter: Math.ceil((endpointAttempts.resetTime - now) / 1000)
    });
  }

  // Increment attempt count
  endpointAttempts.count++;
  clientAttempts[endpoint] = endpointAttempts;
  attempts[clientIP] = clientAttempts;
  req.app.locals.authAttempts = attempts;

  next();
};

/**
 * Logout middleware to invalidate token
 */
const logout = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (token) {
    // In a production environment, you would add the token to a blacklist
    // For now, we'll just log the logout
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      winston.info(`User logged out: ${decoded.email}`);
    } catch (error) {
      // Token might be expired, which is fine for logout
    }
  }

  next();
};

module.exports = {
  authenticateToken,
  authenticateAdmin,
  optionalAuth,
  authRateLimit,
  logout
}; 