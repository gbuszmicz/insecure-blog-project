var logger = require('../helpers/logger');
var mysql = require('mysql');
var db_config = require('../configs/db.json') || {};
var mysqlData = {
  host     : db_config.mysql.host,
  user     : db_config.mysql.user,
  password : db_config.mysql.password,
  database : db_config.mysql.database  
}
var connection = mysql.createConnection(mysqlData);

connection.connect(function(err) {
    if(err) return logger.error('MySQL connected ended: ', {error:err.stack})
    return logger.info('MySQL connected successfully');
});

module.exports = connection;