
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const config = require('../../config')
const ServiceError = require('../core').errors.ServiceError
const emessage = require('../message').error

const opts = {
  jwtFromRequest: ExtractJwt.fromHeader(config.auth.jwt.headerKeyName),
  secretOrKey: config.auth.jwt.secret,
  passReqToCallback: true
}

module.exports = new JwtStrategy(opts, (req, jwtPayload, done) => {
  if (!jwtPayload.uid) {    
    return done(null, /** data */{})
    // return done(new ServiceError(emessage.E00001.code, emessage.E00001.status), false)
  }
  return done(null, /** data */{})
})
