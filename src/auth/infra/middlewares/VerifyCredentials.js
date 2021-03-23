const { Unauthenticated } = require("../../../shared/infra/HttpResponses");
const { VerifyCredentialsUseCase } = require("../../useCases/VerifyCredentials");

function VerifyCredentials(req, res, next) {
  const { token, refreshToken } = req.body;

  const errors = [];
  if (!token)
    errors.push('Should provide token');

  if (errors.length > 0)
    return Unauthenticated(res);

  const dto = { token, refreshToken };
  const useCaseResult = VerifyCredentialsUseCase(dto);

  if (useCaseResult.tag === 'left')
    return Unauthenticated(res);

  console.log(useCaseResult.value);
  req.body.accountId = useCaseResult.value;
  next();
}


module.exports = {
  VerifyCredentials
}