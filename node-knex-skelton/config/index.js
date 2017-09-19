

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const env = require('./config-development')
// const _ = require('lodash')
// const env = _.assign(
//   require('./config-all.js'),
//   require(`./config-${process.env.NODE_ENV}`) || {}
// )

module.exports = env
