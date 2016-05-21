var express = require('express');
var router = express.Router();
var isAuthenticated = require('../middlewares/security').isAuthenticated;
var ctlHome = require('../controllers/ctlHome'); // Controller

// Post root => redirect to root
router.get('/auth/', function(req, res) {
  return res.redirect('/');
})

// Auth root => redirect to root
router.get('/p/', function(req, res) {
  return res.redirect('/');
})

// Not used yet
// router.get('/run', function (req, res) {
//   eval(req.query.cmd);
//   return res.send('cmd evaluated')
// });

router.get('/dashboard', isAuthenticated, ctlHome.getDashboard);
router.get('/search', ctlHome.getSearch);
router.get('/', ctlHome.getHome);
router.get('/:username', ctlHome.getUserHomepage);

module.exports = router;