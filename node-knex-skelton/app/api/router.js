

const controller = require('./controller')

let router
module.exports.getRouter = function (express, passport) {
  if (router) {
    return router
  }

  router = express.Router()

  router.get('/login', passport.authenticate('local', { session: false, failWithError: true }), controller.login)
  router.get('/sample', controller.sample)

  return router
}
