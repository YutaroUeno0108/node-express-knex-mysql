
const Knex = require('knex')
const config = require('../../../config')

const settings = config.database


const singleton = (function () {
  let instance
  const createInstance = () => {
    const knex = Knex({
      client: settings.client,
      connection: {
        user: settings.user,
        password: settings.password,
        database: settings.database,
        port: settings.port
      },
      pool: {
        min: settings.pool.min,
        max: settings.pool.max
      },
      debug: settings.enableDebug
    })
    return knex
  }
  return {
    getInstance: () => {
      if (!instance) {
        instance = createInstance()
      }
      return instance
    }
  }
}())

module.exports = singleton.getInstance()
