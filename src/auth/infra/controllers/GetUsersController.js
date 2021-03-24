const { JsonResponse } = require("../../../shared/infra/HttpResponses");
const { HandleLeftResult } = require("./ErrorHandler");
const { GetUsersUseCase } = require("../../useCases/GetUsersUseCase");

async function GetUsersController(req, res) {
  const { accountId } = req.body;

  let offset = undefined;

  if (req.query.offset) {
    let offset = parseInt(req.query.offset);
    console.log(offset)
    offset = Math.abs(offset);
    console.log(offset)

    if (!offset) {
      return JsonResponse(res, 404, { errors: ['Offset query should be integer'] });
    }
  }

  const useCaseResult = await GetUsersUseCase({
    offset
  });

  if (useCaseResult.tag == 'left')
    return HandleLeftResult(useCaseResult.value, res);
  else {
    const payload = {
      count: 10,
      offset: offset || 0,
      results: useCaseResult.value
    }
    return JsonResponse(res, 200, payload);
  }
}

module.exports = {
  GetUsersController
}