const { left, right } = require("../../core/Either");


const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function validateEmail(value) {
  if (typeof value !== 'string')
    return left(['Email should be provided']);
  if (emailRegex.test(value) === false)
    return left(['Inválid email']);

  return right(value);
}

module.exports = {
  validateEmail
}
