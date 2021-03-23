function JsonResponse(res, code, data = {}) {
  return res.status(code).json(data).end();
}

function Forbidden(res) {
  return JsonResponse(res, 403);
}

function BadRequest(res, errors = []) {
  return JsonResponse(res, 400, { errors });
}

function NotFound(res) {
  return JsonResponse(res, 404);
}

function ServerError(res) {
  return JsonResponse(res, 500);
}

function Conflict(res, message) {
  return JsonResponse(res, 409, { message });
}

function Unauthenticated(res) {
  return JsonResponse(res, 401);
}

module.exports = {
  NotFound,
  Conflict,
  Forbidden,
  BadRequest,
  ServerError,
  Unauthenticated,
  JsonResponse
}