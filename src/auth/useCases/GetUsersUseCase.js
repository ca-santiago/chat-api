const { right } = require("../../core/Either");
const { accountMapper } = require("../mapper");
const { AccountMongoRepo } = require("../repo/mongo")


async function GetUsersUseCase({ offset = 0 }) {
  const accounts = await AccountMongoRepo.findPaginated(offset);

  const mapped = accounts.map(acc => {
    return accountMapper.mapToDTO(acc)
  })
  return right(mapped);
}

module.exports = {
  GetUsersUseCase
}