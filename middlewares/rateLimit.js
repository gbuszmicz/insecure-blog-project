// Rate limiter to protect the app against:
//  - brute force attacks
//  - dos/ddos
var RateLimit = require('express-rate-limit');

var limitHandler = function(req, res) {
  res.format({
    html: function(){
      res.status(rateLimitOptions.statusCode).end(rateLimitOptions.message);
    },
    json: function(){
      res.status(rateLimitOptions.statusCode).json({ message: rateLimitOptions.message });
    }
  });
}

var rateLimitOptions = {
  windowMs: 10*1000, // 1 minute = 1*60*1000
  delayAfter: 5,     // begin slowing down responses after the first request
  delayMs: 1*1000,   // slow down subsequent responses by 3 seconds per request
  max: 10,           // start blocking after 5 requests
  message: "Rate limit exceded. Try again later",
  statusCode: 429,   // status to return
  handler: limitHandler
}

exports.authLimiter = new RateLimit(rateLimitOptions);