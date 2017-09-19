

const LocalStrategy = require('passport-local')
const config = require('../../config')

const opts = {
  usernameFiled: config.auth.local.usernameField,
  passwordFiled: config.auth.local.passwordField,
  passReqToCallback: true,
  session: false
}

module.exports = new LocalStrategy(opts, (req, username, password, done) => {
  if (!(username && password)) {
    return done(new Error())
  }
  return done(null, username)
})
