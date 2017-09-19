
const path = require('path')
const cookieParser = require('cookie-parser')
const favicon = require('serve-favicon')
const serveStatic = require('serve-static')
const config = require('../../config')
const errors = require('../core').errors
const webRouter = require('./router')


module.exports = function (mainApp, express, passport) {
  const app = express()

  app.locals.pretty = true
  app.use(cookieParser())

  // Setting the favicon and static folder
  // app.use(favicon(path.join(config.root, 'public', 'favicon.ico')))
  app.use(serveStatic(path.join(config.root, 'public')))

  // Set views path, template engine and default layout
  app.set('views', path.join(__dirname, 'views'))
  app.set('view engine', 'ejs')

  app.use('/', webRouter.getRouter(express, passport))

  app.use(errors.handlers.handleNotFoundPage((req) => (
    {
      status: 404,
      page: 'notfound',
      data: {
        url: req.originalUrl,
        error: 'Not found'
      }
    }
  )))

  app.use(errors.handlers.handleErrorPage((err) => {
    if (err instanceof errors.ServiceError) {
      return {
        status: 400,
        page: 'error',
        data: {
          error: err.stack
        }
      }
    }
    return {
      status: 500,
      page: 'error',
      data: {
        error: err.stack
      }
    }
  }))

  mainApp.use('/web', app)
  return app
}
