
class Either {
  constructor(label, value) {
    this.label = label;
    this.value = value;
  }
}

function left(value = []) {
  return new Either('left', value);
}

function right(value) {
  return new Either('right', value);
}

module.exports = {
  right,
  left,
  Either
}