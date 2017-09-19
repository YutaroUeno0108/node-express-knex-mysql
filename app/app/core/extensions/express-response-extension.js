

const response = require('express').response

module.exports = function (options) {
  response.jsonSuccess = function jsonSuccess (/** Result: object */ obj) {
    const result = {
      status: 0,
      data: obj
    }
    this.json(result)
  }
  response.jsonFail = function jsonFail (/** ErrorCode: string */ errCd) {
    const result = {
      status: 1,
      errCd: errCd || 'E00001'
    }
    this.json(result)
  }
}
