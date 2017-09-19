
function NotFoundError (url, method, status, err) {
  this.name = 'NotFoundError'
  this.url = url
  this.method = method
  this.status = status || 400
  this.message = `${this.name}: ${this.url}`
  const oriErr = err || Error(this.message)
  this.stack = oriErr.stack
}
NotFoundError.prototype = Object.create(Error.prototype)
NotFoundError.prototype.constructor = NotFoundError

module.exports = NotFoundError
