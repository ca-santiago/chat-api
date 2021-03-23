const { Router } = require("express");
const { AuthRouter } = require("../auth/infra/router");

const RouterV1 = Router();

RouterV1.use('/account', AuthRouter);

module.exports = RouterV1;
