const { Account } = require("../domain/Account");

function mapToDomain(rawData) {
  const { email, password, name, id } = rawData;
  const instance = Account.create({
    email,
    id,
    password,
    name
  }, rawData.id);
  return instance;
}

function mapToPersistence(account) {
  const { email, password, _name, id } = account;
  const output = {
    email,
    password,
    name: _name,
    _id: id
  }
  return output;
}

function mapToDTO(account) {
  const { email, _name, id } = account;
  const dto = {
    email,
    name: _name,
    id
  }
  return dto;
}

module.exports = {
  accountMapper: {
    mapToDTO,
    mapToPersistence,
    mapToDomain
  }
}
