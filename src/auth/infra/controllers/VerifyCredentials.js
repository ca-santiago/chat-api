const { JsonResponse } = require("../../../shared/infra/HttpResponses");
const { VerifyCredentialsUseCase } = require("../../useCases/VerifyCredentials");
const { HandleLeftResult } = require("./ErrorHandler");


async function VerifyCredentialsController(req, res) {
  const { refreshToken, token } = req.body;

  const useCaseRes = await VerifyCredentialsUseCase({
    refreshToken, token
  });

  if (useCaseRes.label == 'left') {
    return HandleLeftResult(useCaseRes.value, res);
  } else {
    return JsonResponse(res, 200, useCaseRes.value);
  }
}

module.exports = {
  VerifyCredentialsController
}