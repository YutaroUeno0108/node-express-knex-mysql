/* eslint no-unused-vars: ["error", { "argsIgnorePattern": "next"}] */

const logger = require('../../logger')
const ServiceError = require('../service-error')

module.exports = function (
  /**
   function(err, req, res)
   return {
     status,
     page,
     data
   }
   */
  func
) {
  if (!(func instanceof Function)) {
    throw new Error('func need to be function(err, req, res)')
  }
  const defaultErrorStatus = 500
  const defaultErrorPage = 'error'
  return (err, req, res, next) => {
    const rst = func(err, req, res)
    if (err instanceof ServiceError) {
      logger.info(err)
    } else {
      logger.error(err)
    }
    res.status(rst.status || defaultErrorStatus).render(rst.page || defaultErrorPage, rst.data || {})
  }
}