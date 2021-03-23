const { getSalt, compareSync, hashSync, genSaltSync, compare } = require("bcryptjs");
const { left, right } = require("../../core/Either")

const minPasswordLengt = 4;

function validateNewPassword(val) {
  if (typeof val !== 'string')
    return left(['Password should be provided'])
  if (val.length <= minPasswordLengt)
    return left(['Password should be more than 4 chars'])

  return right(val);
}

function hashPassword(val) {
  return hashSync(val);
}

function comparePasswords(one, second) {
  return compareSync(one, second);
}

module.exports = {
  hashPassword,
  validateNewPassword,
  comparePasswords
}