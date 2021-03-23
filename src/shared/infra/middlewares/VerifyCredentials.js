const { processTokens } = require("../../../auth/services/jwt");

function VerifyCredentials(req, res, next) {
  const { token, refreshToken } = req.body;

  const errors = [];
  if (!token)
    errors.push('Not token provided');
  if (!refreshToken)
    errors.push('Not refresh token provided');

  if (errors.length > 0)
    return res.status(401).end();


  const authResult = processTokens({ token, refreshToken });
  if (!authResult)
    return res.status(401).end();

  req.body.accountId = authResult.accountId;
  next();
}

module.exports = {
  VerifyCredentials
}
