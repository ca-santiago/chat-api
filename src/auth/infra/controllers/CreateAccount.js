const { CreateAccountUseCase } = require("../../useCases/CreateAccount");
const { HandleLeftResult } = require("./ErrorHandler");

async function CreateAccountController(req, res) {
  const { email, password, name } = req.body;

  const useCaseRes = await CreateAccountUseCase({
    name,
    email,
    password
  });

  if (useCaseRes.label === 'left') {
    return HandleLeftResult(useCaseRes.value, res);
  } else {
    return res.status(201).end();
  }
}

module.exports = {
  CreateAccountController
}