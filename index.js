// Set environment. Default = dev
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var session = require('express-session'); // No need for cookie-parser since v1.5.0
var RedisStore = require('connect-redis')(session); // production only
var redis = require("redis");
var logger = require('./helpers/logger');
var errors = require('./helpers/nodeErrors');
var authLimiter = require('./middlewares/rateLimit').authLimiter; // Limit for auth routes
var ejs = require('ejs');
var app = express();

if(process.env.NODE_ENV === 'development') {
  logger.info('-------------------------------------------------------------');
  logger.info('----------------------|| DEVELOPMENT ||----------------------');
  logger.info('-------------------------------------------------------------');
}
if(process.env.NODE_ENV === 'production') {
  logger.info('-------------------------------------------------------------');
  logger.info('----------------------|| PRODUCTION ||-----------------------');
  logger.info('-------------------------------------------------------------');
}

app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.set('views', __dirname + '/views');
app.engine('.html', ejs.__express);
app.set('view engine', 'html');
app.use(express.static(__dirname + '/public', {maxAge: '1d'}));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set('json spaces', 2);
app.set('trust proxy', 1) // Trust first proxy

var config = require('./env/'+process.env.NODE_ENV+'.json') || {};
var redisClient = process.env.NODE_ENV == 'development' ? {} : redis.createClient(config.redis.url);
var redisOptions = {
  client: redisClient
}
var sessionStore = process.env.NODE_ENV == 'development' ? new session.MemoryStore() : new RedisStore(redisOptions);
app.use(session({
  store: sessionStore,
  secret: 'Super secret session',
  resave: true,
  saveUninitialized: true,
  cookie: { 
    maxAge: 1209600000, // (14*24*3600)(*1000) = 14 days
    httpOnly: false 
  }
}));

// Add values to req.user for auth users
app.use(function(req, res, next) {
  if(req.session && req.session.user) {
    req.user = req.session.user[0];
    req.user.isAuthenticated = true;
    delete req.user.password; // Delete the password from the session
    res.locals.user = req.user;
    // Finishing processing the middleware and run the route
    next();
  } else {
    next();
  }
});

// Error handler for express-validation
app.use(function(err, req, res, next){
  res.status(400).send(err);
});

// View helpers
require('./helpers/view')(app)

// Routes
var authRoutes = require('./routes/auth');    // login, logout
var homeRoutes = require('./routes/home');    // homepage (posts loop), dashboad (auth users), users
var postRoutes = require('./routes/post');    // single post view

app.use('/', homeRoutes);
// app.use('/auth', authLimiter, authRoutes);
app.use('/auth', authRoutes); 
app.use('/p', postRoutes);

var port = process.env.PORT || 8080;
app.listen(port);
logger.info('App ready, listening on port: '+port)
logger.info('App mode: '+process.env.NODE_ENV)
