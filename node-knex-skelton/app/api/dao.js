
const db = require('../core/database')

function sample () {
  return db.select()
    .from('sample')
}

module.exports = {
  sample
}
