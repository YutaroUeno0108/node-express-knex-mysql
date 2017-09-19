'use strict'

const unless = require('express-unless')
const passLocalStrategy = require('./passport-local-strategy')
const passJwtStrategy = require('./passport-jwt-strategy')

module.exports.initPassport = function (passport) {
  const authenticate = passport.authenticate
  passport.authenticate = function (...args) {
    const middleware = authenticate.apply(this, args)
    if (!middleware.unless) {
      middleware.unless = unless
    }
    return middleware
  }
  passport.use(passLocalStrategy)
  passport.use(passJwtStrategy)
}
