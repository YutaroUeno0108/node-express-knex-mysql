
const path = require('path')
const winston = require('winston')
require('winston-daily-rotate-file')
const config = require('../../../config')

const enableConsole = config.environment === 'development' && config.logger.enableConsole
const folderPath = config.logger.folderPath || ''

// Configure the default logger
const defaultLogger = new winston.Logger({
  transports: [
    new winston.transports.File({
      level: 'error',
      filename: path.join(folderPath, 'error.log'),
      datePattern: 'yyyy-MM-dd',
      handleExceptions: true,
      prepend: true,
      json: true,
      colorize: true
    }),
    new winston.transports.DailyRotateFile({
      level: 'info',
      filename: path.join(folderPath, 'all.log'),
      datePattern: 'yyyy-MM-dd.',
      prepend: true,
      handleExceptions: true,
      json: true,
      colorize: false
    })
  ],
  exitOnError: false
})

// configure the logger for access
const accessLogger = new winston.Logger({
  transports: [
    new winston.transports.DailyRotateFile({
      level: 'info',
      filename: path.join(folderPath, 'access.log'),
      datePattern: 'yyyy-MM-dd.',
      json: true,
      colorize: false
    })
  ],
  exitOnError: false
})

// configure the logger for exception
const exceptionLogger = new winston.Logger({
  transports: [
    new winston.transports.File({
      level: 'error',
      filename: path.join(folderPath, 'exception.log'),
      handleExceptions: true,
      json: true,
      colorize: false,
      datePattern: 'yyyy-MM-dd.',
      prepend: true
    })
  ],
  exitOnError: false
})

if (enableConsole) {
  const consoleTransport = new winston.transports.Console({
    level: 'debug',
    handleExceptions: true,
    humanReadableUnhandledException: true,
    json: false,
    colorize: true
  })
  defaultLogger.add(consoleTransport, null, true)
  accessLogger.add(consoleTransport, null, true)
}

module.exports = {
  defaultLogger,
  accessLogger,
  exceptionLogger
}
