

const express = require('express')
require('./core/extensions/express-response-extension')()
const responseTime = require('response-time')
const methodOverride = require('method-override')
const compression = require('compression')
const morgan = require('morgan')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const passport = require('passport')
const config = require('../config')
const morganStream = require('./core').morganStream
const auth = require('./auth')

const app = express()
app.disable('x-powered-by')
app.set('showStackError', config.environment === 'development')
app.use(responseTime())
app.use(methodOverride())

app.use(morgan(config.logger.accesLogFormat || 'combined', {
  stream: morganStream
}))

app.use(helmet())

// should be placed before express.static
app.use(compression({
  filter: (req, res) => {
    // don't compress reponses with this request header
    if (req.get('x-no-compression')) {
      return false
    }
    // fallback to standard filter function
    return compression.filter(req, res)
  },
  level: 9
}))

// parse application/x-www-form-urlencodeed
app.use(bodyParser.urlencoded({
  extended: false
}))
// parse application/json
app.use(bodyParser.json())

app.use(passport.initialize())
auth.initPassport(passport)

require('./api')(app, express, passport)

require('./web')(app, express, passport)

module.exports = app
