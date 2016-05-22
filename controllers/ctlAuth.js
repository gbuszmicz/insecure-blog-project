var db = require('../helpers/mysql');
var logger = require('../helpers/logger');
var returnJson = require('../helpers/returnJson'); // Return status/message to users
var isAuthenticated = require('../middlewares/security').isAuthenticated;

// GET /auth/login
exports.getLogin = function(req, res) {
  if(req.user && req.user.isAuthenticated) return res.redirect('/dashboard');
  return res.render('login')
}

// POST /auth/login
exports.postLogin = function(req, res) {
  // var user = db.escape(req.body.username);
  // var pass = db.escape(req.body.password);
  // var sql  = "SELECT * FROM users WHERE username = " + user + " AND password = " + pass;
  var user = req.body.username;
  var pass = req.body.password;
  var sql  = "SELECT * FROM users WHERE username = '" + user + "' AND password = '" + pass + "'";
  
  logger.debug(sql)
  db.query(sql, function(err, user) {
    if(err) {
      logger.error(err.message);
      return res.send(
        returnJson('Error', err.message)
      )
    }
    // User not found
    if(user.length === 0) 
      return res.send(
        returnJson('Error', 'Username/password incorrect')
      )
    
    // User found!
    req.session.user = user;
    var redirect = { redirect_to:'/dashboard' }
    return res.send(
        returnJson('Success', null, redirect)
      )
  });
}

// GET /auth/logout
exports.getLogout = function(req, res) {
  req.session.destroy(function(err) {
    if(err) {
      logger.error(err);
      return res.redirect('/dashboard')
    }
    if(!err) res.redirect('/');
  })
}
