const { right } = require("../../core/Either");
const { AccountMongoRepo } = require("../repo/mongo")

async function DeleteAccountUseCase({ accountId }) {
  await AccountMongoRepo.delete(accountId);
  return right(null);
}

module.exports = {
  DeleteAccountUseCase
}
