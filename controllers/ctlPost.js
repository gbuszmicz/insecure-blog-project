var db = require('../helpers/mysql');
var logger = require('../helpers/logger');
var returnJson = require('../helpers/returnJson'); // Return status/message to users

// Sanitization modules
var sanitizeHtml = require('sanitize-html'); // Sanitize module
var defaultSanitizeOptions = require('../middlewares/sanitization').defaultSanitizeOptions; // Default sntz options

// POST /p/new
exports.postNew = function(req, res) {
  // var user = db.escape(req.body.username);
  // var pass = db.escape(req.body.password);
  // var sql  = "SELECT * FROM users WHERE username = " + user + " AND password = " + pass;
  var title = req.body.title;
  var body = req.body.body;
  var tags = req.body.tags;
  var sql  = "INSERT INTO posts (title, body, tags, userId, status) "+
             "VALUES ('"+title+"','"+body+"','"+tags+"','"+req.user.id+"','Published')";
  // For testing log the query
  // logger.debug(sql)

  db.query(sql, function(err, result) {
    if(err) {
      logger.error(err.message);
      return res.send(
        returnJson('Error', err.message)
      )
    }
    return res.send({status:'Success', redirect_to:'/'+req.user.username})
  })
}

// POST /p/5/delete
exports.getDelete = function(req, res) {
  var sql = "DELETE FROM posts "+
             "WHERE id = " +req.params.postid;
  // For testing log the query           
  // logger.debug(sql)

  db.query(sql, function(err, result) {
    if(err) {
      logger.error(err.message);
      return res.send(
        returnJson('Error', err.message)
      )
    }
    if(result.affectedRows === 0) {
      return res.send(
        returnJson('Error', '404 - Post not found to delete')
      )      
    }

    return res.send(
      returnJson('Success', 'Post deleted')
    )
  })
}

// GET /p/5/post-five-slug-title/edit
exports.getEdit = function(req, res) {
  var sql = "SELECT id,title,body,tags FROM posts "+
             "WHERE posts.id = " +req.params.postid;

  db.query(sql, function(err, post) {
    if(err) {
      logger.error(err.message);
      return res.send(
        returnJson('Error', err.message)
      )
    }
    if(post.length === 0) {
      return res.send(
        returnJson('Error', '404 - Post not found')
      )      
    }

    return res.render('edit-post', {
      post:post[0]
    })
  })
}

// POST /p/5/post-five-slug-title/edit
exports.postEdit = function(req, res) {
  var title = req.body.title;
  var body = req.body.body;
  var tags = req.body.tags;

  var sql  = "UPDATE posts SET title='" +title+ "', body='" +body+ "', tags='" +tags+ "' "+
             "WHERE id='" +req.params.postid+ "'";
  // For testing log the query
  // logger.debug(sql)

  db.query(sql, function(err, result) {
    if(err) {
      logger.error(err.message);
      return res.send(
        returnJson('Error', err.message)
      )
    }
    // No rows changed => something went wrong
    if(result.changedRows === 0) {
      return res.send(
        returnJson('Error', 'Unable to update the post. Try again')
      )      
    }

    return res.send({status:'Success', redirect_to:'/'+req.user.username})
  })
}

// TODO: if no slug in URL => redirect to /postid/slug (check HTML5 history.pushState)
// GET /p/5/post-five-slug-title
exports.getPostById = function(req, res) {
  // var postId = db.escape(req.params.postid);
  // var postId = parseInt(req.params.postid,10);
  var postId = req.params.postid;
  var sql = "SELECT posts.id,title,body,date,tags,username,firstname,lastname,avatar,status FROM posts "+
             "INNER JOIN users ON posts.userId = users.id "+
             "WHERE posts.id = " +postId;
  // For testing log the query
  if(!req.params.readtime) logger.debug(sql)

  db.query(sql, function(err, post) {
    if(err) {
      return res.send(
        returnJson('Error', err.message)
      )      
    }
    // No post found
    if(post.length === 0) {
      return res.send(
        returnJson('Error', '404 - Post not found')
      )
    }
    // Sanitize response
    // post.forEach(function(p) {
    //   p.body = sanitizeHtml(p.body, defaultSanitizeOptions),
    //   p.title = sanitizeHtml(p.title, defaultSanitizeOptions)
    // })
    // console.log(post[1])
    res.render('post', {
      posts:post
    })
  })
}