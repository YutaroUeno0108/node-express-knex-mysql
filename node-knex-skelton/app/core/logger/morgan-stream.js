

const logger = require('./loggers').accessLogger

module.exports = {
  write: (message) => logger.info(message)
}
