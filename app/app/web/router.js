
const controller = require('./controller')

let router
module.exports.getRouter = function (express, passport) {
  if (router) {
    return router
  }
  router = express.Router()

  router.get('/sample', controller.sample)

  return router
}
