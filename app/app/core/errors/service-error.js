
function ServiceError (errCode, status, err) {
  this.name = 'ServiceError'
  this.code = errCode
  this.status = status || 400
  this.message = `${this.name}: ${this.code}`
  const oriErr = err || Error(this.message)
  this.stack = oriErr.stack
}

ServiceError.prototype = Object.create(Error.prototype)
ServiceError.prototype.constructor = ServiceError

module.exports = ServiceError
