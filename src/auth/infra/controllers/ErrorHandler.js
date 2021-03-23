const { AuthUseCasesErrors } = require("../../useCases/Errors");
const {
  Conflict,
  NotFound,
  Forbidden,
  BadRequest,
  ServerError,
  Unauthenticated
} = require("../../../shared/infra/HttpResponses");


function HandleLeftResult(result, res) {
  switch (result.constructor) {
    case AuthUseCasesErrors.AlreadyExist:
      Conflict(res, res.errors);
      break;
    case AuthUseCasesErrors.BadRequest:
      console.log('Acá')
      BadRequest(res, result.errors);
      break;
    case AuthUseCasesErrors.DoNotFound:
      NotFound(res);
      break;
    case AuthUseCasesErrors.Forbidden:
      Forbidden(res);
      break;
    case AuthUseCasesErrors.Unauthenticated:
      Unauthenticated(res);
      break;
    default:
      ServerError(res);
      break;
  }
  return;
}


module.exports = {
  HandleLeftResult
}