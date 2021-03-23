const { JsonResponse } = require("../../../shared/infra/HttpResponses");
const { DeleteAccountUseCase } = require("../../useCases/DeleteAccount");
const { HandleLeftResult } = require("./ErrorHandler");

async function DeleteAccountController(req, res) {
  const { accountId } = req.body;

  const dto = { accountId };
  const useCaseResult = await DeleteAccountUseCase(dto);

  if (useCaseResult.tag == 'left')
    return HandleLeftResult(useCaseResult.value, res);
  else {
    return JsonResponse(res, 200);
  }
}

module.exports = {
  DeleteAccountController
}
