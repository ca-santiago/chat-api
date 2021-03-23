const { processTokens } = require("../services/jwt");
const { left, right } = require("../../core/Either");
const { AuthUseCasesErrors } = require("./Errors");

async function VerifyCredentialsUseCase({ refreshToken, token }) {
  const res = processTokens({ token, refreshToken });
  if (!res) return left(
    new AuthUseCasesErrors.Unauthenticated()
  );

  return right({
    token: res.token,
    refreshToken: res.refreshToken,
    acccountId: res.accountId,
  });
}

module.exports = {
  VerifyCredentialsUseCase
}
