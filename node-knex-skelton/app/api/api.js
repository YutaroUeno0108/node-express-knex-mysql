
const errors = require('../core').errors
const message = require('../message').error
const apiRouter = require('./router')

module.exports = function (mainApp, express, passport) {

  const app = express()
  app.use('/',
    passport.authenticate('jwt', { session: false, failWithError: true })
      .unless({ useOriginalUrl: false, path: ['/sample'] }),
    apiRouter.getRouter(express, passport))

  app.use(errors.handlers.handleNotFoundJson(() => ({
    status: message.E00002.status,
    code: message.E00002.code
  })))

  app.use(errors.handlers.handleErrorJson((err) => {
    if (err instanceof errors.ServiceError) {
      return {
        status: err.status,
        code: err.code
      }
    }
    return {
      status: message.E00003.status,
      code: message.E00003.code
    }
  }))

  mainApp.use('/api', app)

  return mainApp
}
