const { JsonResponse } = require("../../../shared/infra/HttpResponses");
const { LoginUseCase } = require("../../useCases/Login");
const { HandleLeftResult } = require("./ErrorHandler");

async function LoginController(req, res) {
  const { email, password } = req.body;

  const dto = {
    email,
    password
  }
  const useCaseResult = await LoginUseCase(dto);
  if (useCaseResult.label == 'left')
    return HandleLeftResult(useCaseResult.value, res);
  else
    return JsonResponse(res, 200, useCaseResult.value);
}

module.exports = {
  LoginController
}