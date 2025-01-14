import rateLimit from 'express-rate-limit';

// Create a rate limiting middleware
const rateLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,  // 24 hours
  max: 50,                  // Limit each IP to 100 requests per 15 minutes
  message: 'Too many requests from this IP, please try again later.',
  headers: true,
});

export default rateLimiter;