/* eslint no-unused-vars: ["error", { "argsIgnorePattern": "next"}] */

const logger = require('../../logger')
const NotFoundError = require('../not-found-error')

module.exports = function (
  /**
    function(req, res)
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
  const defaultStatus = 404
  const defaultErrorCode = 'E00002'
  return (req, res, next) => {
    const rst = func(req, res)
    logger.info(new NotFoundError(req.originalUrl, req.method))
    // System error code
    res.status(rst.status || defaultStatus).jsonFail(rst.code || defaultErrorCode)
  }
}
