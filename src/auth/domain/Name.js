const { left, right } = require("../../core/Either");

function validateName(val) {
  // Just check if is string and not empty
  // apply more validation on the future
  if (typeof val === 'string' && !!val)
    return right(val);
  return left(['Invalid account name']);
}

module.exports = {
  validateName,
}