function _404(req, res, next) {
  res.status(404).end();
}

module.exports = {
  _404
}