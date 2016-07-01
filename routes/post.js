var express = require('express');
var router = express.Router();
var isAuthenticated = require('../middlewares/security').isAuthenticated; // Auth middleware
var ctlPost = require('../controllers/ctlPost'); // Controller

// Validation modules
var validation = require('express-validation');        // Validation module
var validate = require('../middlewares/validations');  // Rules for validation module

router.get('/new', isAuthenticated, function(req, res) {
  res.render('new-post')
});

// router.post('/new', validation(validate.post), ctlPost.postNew); 
router.post('/new', ctlPost.postNew); 
router.get('/:postid/delete', isAuthenticated, ctlPost.getDelete);

router.get('/:postid/:slug/edit', isAuthenticated, ctlPost.getEdit);    // Render update post page
router.post('/:postid/:slug/edit', isAuthenticated, ctlPost.postEdit);  // Update a post

router.get('/:postid/:slug/:readtime', ctlPost.getPostById);
router.get('/:postid/:slug?', ctlPost.getPostById);

module.exports = router;