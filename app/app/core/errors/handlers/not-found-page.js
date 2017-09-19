/* eslint no-unused-vars: ["error", { "argsIgnorePattern": "next"}] */

const logger = require('../../logger')
const NotFoundError = require('../not-found-error')

module.exports = function (
  /**
   function(req, res)
   return {
     status,
     page,
     data
   }
   */
  func
) {
  if (!(func instanceof Function)) {
    throw new Error('func need to be function(req, res')
  }
  return (req, res, next) => {
    logger.info(new NotFoundError(req.originalUrl))
    const rst = func(req, res)
    res.status(rst.status || 404).render(rst.page, rst.data)
  }
}
