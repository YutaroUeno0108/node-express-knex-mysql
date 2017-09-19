
const path = require('path')

const rootPath = path.normalize(path.join(__dirname, '/..'))

module.exports = {
  port: 3000,
  root: rootPath,
  environment: process.env.NODE_ENV || 'development',
  database: {
    client: 'mysql',
    host: '127.0.0.1',
    user: 'skelton',
    password: 'skelton',
    database: 'skelton',
    port: 3306,
    pool: {
      min: 5,
      max: 50
    },
    enableDebug: true
  },
  logger: {
    folderPath: './logs',
    accesLogFormat: [
      ':remote-addr - ',
      ':remote-user ',
      '[:date[iso]] ',
      '":method :url HTTP/:http-version" ',
      ':status ',
      ':res[content-length] - ',
      ':response-time ms ',
      '":referrer" ',
      '":user-agent" '
    ].join(''),
    enableConsole: true
  },
  auth: {
    local: {
      usernameField: 'username',
      passwordField: 'password'
    },
    jwt: {
      secret: 'secret',
      headerKeyName: 'jwt',
      expire: 60 * 60
    }
  }
}
