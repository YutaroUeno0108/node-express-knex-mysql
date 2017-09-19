/* eslint arrow-parens: [2, "always"] */

const jwt = require('jsonwebtoken')
const uuid = require('uuid')
const config = require('../../config')
const service = require('./service')


function sample (req, res, next) {
  const uid = uuid.v4()
  const token = jwt.sign({ uid }, config.auth.jwt.secret)
  service.sample()
    .then((data) => {
      const result = {
        data,
        jwt: token
      }
      res.json(result)
    })
    .catch((err) => next(err))
}

function login (req, res, next) {
  res.json({})
}

module.exports = {
  sample,
  login
}
