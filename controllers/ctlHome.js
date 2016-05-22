var db = require('../helpers/mysql');
var logger = require('../helpers/logger');
var returnJson = require('../helpers/returnJson'); // Return status/message to users
var startsWith = require('../helpers/strings').startsWith;

// Sanitization modules
var sanitizeHtml = require('sanitize-html'); // Sanitize module
var defaultSanitizeOptions = require('../middlewares/sanitization').defaultSanitizeOptions; // Default sntz options

// GET /dashboard
exports.getDashboard = function (req, res) {
  return res.render('dashboard', {
    userInfo: req.session.user,
    isAdmin: !!parseInt(req.user.isAdmin)
  })
}

// GET /search
exports.getSearch = function (req, res) {
  var keyword = req.query.q;
  var sql;
  // Check if keyword is a tag
  if(startsWith(keyword, 'tag/')) {
    logger.debug('-- searching a tag')
    var searchKeyword = keyword.split('/')[1];
    sql = "SELECT posts.id,title,body,date,tags,username,firstname,lastname,avatar FROM posts "+
          "JOIN users ON posts.userId = users.id "+
          "WHERE posts.status = 'Published' "+
          "AND ("+
          "tags LIKE '%" +searchKeyword+ "%' "+
          ") "+
          "ORDER BY posts.date DESC";
  } 
  // Check if keyword is a user
  else if(startsWith(keyword, 'user/')) {
    logger.debug('-- searching a user')
    var searchKeyword = keyword.split('/')[1];
    sql = "SELECT posts.id,title,body,date,tags,username,firstname,lastname,avatar FROM posts "+
          "JOIN users ON posts.userId = users.id "+
          "WHERE posts.status = 'Published' "+
          "AND ("+
          "users.username LIKE '%" +searchKeyword+ "%' "+
          ") "+
          "ORDER BY posts.date DESC";
  } 
  // Search everywhere
  else {
    sql = "SELECT posts.id,title,body,date,tags,username,firstname,lastname,avatar FROM posts "+
          "JOIN users ON posts.userId = users.id "+
          "WHERE posts.status = 'Published' "+
          "AND ("+
          "users.username LIKE '%" +keyword+ "%' "+
          "OR users.firstname LIKE '%" +keyword+ "%' "+
          "OR users.lastname LIKE '%" +keyword+ "%' "+
          "OR title LIKE '%" +keyword+ "%' "+
          "OR body LIKE '%" +keyword+ "%' "+
          "OR tags LIKE '%" +keyword+ "%' "+
          ") "+
          "ORDER BY posts.date DESC";    
  }
  // For testing log the query
  // logger.debug(sql)

  db.query(sql, function(err, posts) {
    if(err)
      return res.send(
        returnJson('Error', err.message)
      )
    // Sanitize response
    // if(posts.length > 0) {
    //   posts.forEach(function(p) {
    //     p.body = sanitizeHtml(p.body, defaultSanitizeOptions),
    //     p.title = sanitizeHtml(p.title, defaultSanitizeOptions)
    //   })
    // }
    res.render('index', {
      search:keyword,
      posts:posts
    })
  })
}

// GET / => homepage
exports.getHome = function (req, res) {
  // --- start pagination. Only index so far
  var numRows; 
  var queryPagination;
  var numPerPage = 10;
  var page = parseInt(req.query.page, 10) || 0;
  var numPages;
  var skip = page * numPerPage;
  var limit = skip + ',' + (skip + numPerPage);
  var sqlCountPosts = "SELECT count(*) as numRows FROM posts";
  // --- end pagination

  db.query(sqlCountPosts, function(err, results) {
    if(err) {
      logger.error(err.message);
      return res.send(
        returnJson('Error', err.message)
      )
    }

    // --- start pagination
    numRows = results[0].numRows;
    numPages = Math.ceil(numRows / numPerPage);
    console.log('number of pages:', numPages + ' (selected page: '+page+')');
    if(page > numPages) {
      return res.send(
        returnJson('Error', '404 - Page not found')
      )
    }
    // --- end pagination

    var sql = "SELECT posts.id,title,body,date,tags,username,firstname,lastname,avatar FROM posts "+
              "JOIN users ON posts.userId = users.id "+
              "WHERE posts.status = 'Published' "+
              "ORDER BY posts.date DESC "+
              "LIMIT " + limit;
    // For testing log the query
    // logger.debug(sql)

    db.query(sql, function(err, posts) {
      if(err) {
        logger.error(err.message);
        return res.send(
          returnJson('Error', err.message)
        )
      }
      // No posts found
      if(posts.length === 0) {
        return res.send(
          returnJson('Error', '404 - Posts not found')
        )
      }

      // --- start pagination
      var pagination;
      if (page < numPages) {
        pagination = {
          current: page,
          perPage: numPerPage,
          previous: page > 0 ? page - 1 : undefined,
          next: page < numPages - 1 ? page + 1 : undefined,
          totalPages: numPages
        }
      }
      else {
        pagination = {
          err: 'queried page ' + page + ' is >= to maximum page number ' + numPages
        }
      }
      // --- end pagination

      // Sanitize response
      // posts.forEach(function(p) {
      //   p.body = sanitizeHtml(p.body, defaultSanitizeOptions),
      //   p.title = sanitizeHtml(p.title, defaultSanitizeOptions)
      // })

      res.render('index', {
        posts:posts,
        pagination:pagination
      })
    })
  })
}

// GET /gonzalo => user homepage
exports.getUserHomepage = function (req, res) {
  var userSql = "SELECT id,username,firstname,lastname,description,avatar FROM users "+
                "WHERE username = '" +req.params.username+ "'";

  var postsSql = "SELECT id,title,body,tags,date FROM posts "+
                 "WHERE posts.status = 'Published' "+
                 "AND userId = ? "+
                 "ORDER BY date DESC";

  db.query(userSql, function(err, user) {
    if(err) {
      return res.send(
        returnJson('Error', err.message)
      )      
    }
    // No user found
    if(user.length === 0) {
      return res.send(
        returnJson('Error', '404 - User not found')
      )
    }
    // User found! Now get posts for that user
    db.query(postsSql,[user[0].id], function(err, posts) {
      if(err) {
        logger.error(err.message);
        return res.send(
          returnJson('Error', err.message)
        )
      }
      // Sanitize response
      // posts.forEach(function(p) {
      //   p.body = sanitizeHtml(p.body, defaultSanitizeOptions),
      //   p.title = sanitizeHtml(p.title, defaultSanitizeOptions)
      // })
      res.render('homepage', {
        homeUser: user[0],
        posts: posts,
        title: user[0].firstname+' '+user[0].lastname
      })
    })
  })
}
