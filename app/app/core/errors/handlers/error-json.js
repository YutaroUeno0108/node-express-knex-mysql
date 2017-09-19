/* eslint no-unused-vars: ["error", { "argsIgnorePattern": "next"}] */

const logger = require('../../logger')
const ServiceError = require('../service-error')

module.exports = function (
  /**
    function(err, req, res)
    return {
      status,
      code
    }
   */
  func
) {
  if (!(func instanceof Function)) {
    throw new Error('func need to be function')
  }
  const defaultStatus = 500
  const defaultErrorCode = 'E00001'
  return (err, req, res, next) => {
    const rst = func(err, req, res)
    if (err instanceof ServiceError) {
      logger.info(err)
    } else {
      logger.error(err)
    }
    // System error code
    res.status(rst.status || defaultStatus).jsonFail(rst.code || defaultErrorCode)
  }
}
