exports.isAuthenticated = function(req, res, next) {
  if (!req.user) {
    res.redirect('/auth/login');
  } else {
    next();
  }
};