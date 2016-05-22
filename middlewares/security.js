// Check if user is authenticated
exports.isAuthenticated = function(req, res, next) {
  if (!req.user) {
    res.redirect('/auth/login');
  } else {
    next();
  }
};