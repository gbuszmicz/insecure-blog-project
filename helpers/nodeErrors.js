var logger = require('./logger')
process.on('uncaughtException', function(err) {
  logger.error((new Date).toUTCString() + ' uncaughtException:', err.message)
  logger.error(err.stack)
  process.exit(1)
})
