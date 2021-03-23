const { AccountMongoRepo } = require("../repo/mongo");
const { left, right } = require("../../core/Either");
const { comparePasswords } = require("../domain/Password");
const { createAuthTokens } = require("../services/jwt");
const { AuthUseCasesErrors } = require("./Errors");

async function LoginUseCase({ password, email }) {

  const accountOrNull = await AccountMongoRepo.findByEmail(email);
  if (!accountOrNull)
    return left(
      new AuthUseCasesErrors.Forbidden()
    );

  const validCredentials = comparePasswords(password, accountOrNull.password);
  if (validCredentials == false)
    return left(
      new AuthUseCasesErrors.Forbidden()
    );

  const { refreshToken, token } = await createAuthTokens({ accountId: accountOrNull.id });

  return right({
    token, refreshToken,
    accountId: accountOrNull.id,
  });
}

module.exports = {
  LoginUseCase
}
