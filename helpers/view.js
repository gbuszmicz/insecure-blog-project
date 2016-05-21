var moment = require('moment');

// Helpers for EJS views
module.exports = function(app) {

  // For posts date
  app.locals.fromNow = function(date) {
    if(!date) return false;
    return moment(date).fromNow();
  }

  // Slug titles
  app.locals.slug = function(text) {
    if(!text) return false;
    return text.toString().toLowerCase().trim()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/&/g, '-and-')         // Replace & with 'and'
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-');        // Replace multiple - with single -
  }

  // Truncate long posts. Ejs already has a truncate filter. Overwrite it.
  app.locals.truncate = function(str, minLen, maxLen) {
    minLen = minLen || 300;
    maxLen = maxLen || 600;
    var len = parseInt(Math.random() * (maxLen - minLen) + minLen);
    return (typeof str === 'string' && str.length > maxLen ? str.substring(0,len)+"..." : str)
  }

    // Truncate long posts
  app.locals.stringToArray = function(str, minLen, maxLen) {
    minLen = minLen || 300;
    maxLen = maxLen || 600;
    var len = parseInt(Math.random() * (maxLen - minLen) + minLen);
    return (typeof str === 'string' && str.length > maxLen ? str.substring(0,len)+"..." : str)
  }
}