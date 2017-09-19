
exports = module.exports

const NotFoundError = require('./not-found-error')
const ServiceError = require('./service-error')
const handleNotFoundJson = require('./handlers/not-found-json')
const handleErrorJson = require('./handlers/error-json')
const handleNotFoundPage = require('./handlers/not-found-page')
const handleErrorPage = require('./handlers/error-page')

exports.NotFoundError = NotFoundError
exports.ServiceError = ServiceError

exports.handlers = {
  handleNotFoundJson,
  handleErrorJson,
  handleNotFoundPage,
  handleErrorPage
}
